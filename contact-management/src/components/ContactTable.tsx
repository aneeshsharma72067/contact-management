import { Box, Button } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useEffect } from "react";
import { contactsAtom } from "../stores/store";
import { useAtom } from "jotai";
import toast from "react-hot-toast";
import { Contact } from "../@types/types";

function ContactTable() {
  const [contacts, setContacts] = useAtom(contactsAtom);
  const columns: GridColDef[] = [
    {
      field: "firstName",
      headerName: "First Name",
      width: 150,
      editable: true,
    },
    {
      field: "lastName",
      headerName: "Last Name",
      width: 150,
      editable: true,
    },
    {
      field: "email",
      headerName: "Email",
      type: "string",
      width: 200,
      editable: true,
    },
    {
      field: "phoneNumber",
      headerName: "Phone Number",
      type: "string",
      width: 150,
      editable: true,
    },
    {
      field: "companyName",
      headerName: "Company",
      width: 180,
      editable: true,
    },
    {
      field: "jobTitle",
      headerName: "Job Title",
      width: 180,
      editable: true,
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 150,
      sortable: false,
      renderCell: (params) => (
        <Button
          onClick={() => handleDelete(params.row._id)}
          variant="contained"
          color="error"
        >
          Delete
        </Button>
      ),
    },
  ];
  async function getContacts() {
    const res = await fetch("/api/contacts", {
      method: "GET",
    });
    const data = await res.json();
    if (res.ok) {
      setContacts(() => data);
    } else {
      switch (res.status) {
        case 500:
          toast.error("Internal Server Error");
          break;
        case 400:
          toast.error("Unauthorized request");
          break;
        default:
          toast.error("Something Went Wrong");
      }
      console.log("error : ", data.error);
    }
  }
  async function handleProcessRowUpdate(newRow: Contact) {
    try {
      console.log("editing row : ", newRow.firstName);

      const response = await fetch(`/api/contacts/${newRow._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newRow),
      });

      const updatedRow = await response.json();
      setContacts((prevRows) =>
        prevRows.map((row) => (row._id === updatedRow._id ? updatedRow : row))
      );

      return updatedRow;
    } catch (error) {
      toast.error("Error in updating cell");
      console.error("Failed to update row:", error);
      throw new Error("Could not save changes to the server.");
    }
  }
  async function handleDelete(id: string) {
    try {
      await fetch(`/api/contacts/${id}`, {
        method: "DELETE",
      });
      setContacts((prevRows) => prevRows.filter((row) => row._id !== id));
      toast.success("Contact deleted successfully!");
    } catch (error) {
      console.error("Failed to delete contact:", error);
      alert("Failed to delete contact!");
    }
  }
  useEffect(() => {
    getContacts();
  }, []);
  return (
    <Box sx={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={contacts}
        columns={columns}
        processRowUpdate={handleProcessRowUpdate}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        getRowId={(row) => row._id}
        pageSizeOptions={[5]}
        checkboxSelection
        disableRowSelectionOnClick
      />
    </Box>
  );
}

export default ContactTable;
