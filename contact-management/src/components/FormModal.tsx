import { Button, Modal, TextField, Typography } from "@mui/material";
import { useFormik } from "formik";
import { useState } from "react";
import * as Yup from "yup";
import Loader from "./Loader";
import { ContactForm } from "../@types/types";
import { useAtom } from "jotai";
import { contactsAtom } from "../stores/store";
import toast from "react-hot-toast";

type Props = {
  open: boolean;
  handleClose: () => void;
};

const validationSchema = Yup.object({
  firstName: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  lastName: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  email: Yup.string().email("Invalid email").required("Required"),
  phoneNumber: Yup.string()
    .matches(/^[0-9]+$/, "Phone number must only contain digits")
    .min(10, "Phone number must be at least 10 digits")
    .required("Required"),
  companyName: Yup.string().max(100, "Too Long!").required("Required"),
  jobTitle: Yup.string().max(100, "Too Long!").required("Required"),
});

function FormModal({ open, handleClose }: Props) {
  const [loading, setLoading] = useState(false);
  const [, setContacts] = useAtom(contactsAtom);

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      companyName: "",
      jobTitle: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values: ContactForm) => {
      addContact(values);
    },
  });

  async function addContact(formValues: ContactForm) {
    setLoading(true);
    try {
      const res = await fetch("/api/contacts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formValues),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message);
      }
      console.log(data);
      setContacts((list) => [...list, data]);
      handleClose();
      setLoading(false);
    } catch (e) {
      if (e instanceof Error) {
        toast.error(e.message);
      } else {
        toast.error("Something went wrong");
      }
      setLoading(false);
    }
  }

  return (
    <Modal open={open} onClose={handleClose}>
      <form
        onClick={(e) => e.stopPropagation()}
        className="w-4/5 sm:w-2/5 px-10 py-8 rounded-lg mx-auto flex flex-col items-start gap-4 bg-zinc-800 m-20"
      >
        <Typography variant="h5" align="left" fontWeight={500} gutterBottom>
          Enter the Contact Details
        </Typography>
        <div className="flex flex-row flex-wrap gap-3">
          <TextField
            fullWidth
            className=""
            id="filled-basic"
            label="First Name"
            variant="outlined"
            name="firstName"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.firstName && Boolean(formik.errors.firstName)}
            helperText={formik.touched.firstName && formik.errors.firstName}
          />
          <TextField
            fullWidth
            name="lastName"
            id="filled-basic"
            label="Last Name"
            variant="outlined"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.lastName && Boolean(formik.errors.lastName)}
            helperText={formik.touched.lastName && formik.errors.lastName}
          />
          <div className="flex items-center gap-2 w-full">
            <TextField
              className="w-1/2"
              name="email"
              id="filled-basic"
              label="Email"
              type="email"
              variant="outlined"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />
            <TextField
              className="w-1/2"
              id="filled-basic"
              name="phoneNumber"
              type="tel"
              label="Phone Number"
              variant="outlined"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.phoneNumber && Boolean(formik.errors.phoneNumber)
              }
              helperText={
                formik.touched.phoneNumber && formik.errors.phoneNumber
              }
            />
          </div>
          <div className="flex items-center gap-2 w-full">
            <TextField
              className="w-1/2"
              id="filled-basic"
              label="Company Name"
              name="companyName"
              variant="outlined"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.companyName && Boolean(formik.errors.companyName)
              }
              helperText={
                formik.touched.companyName && formik.errors.companyName
              }
            />
            <TextField
              className="w-1/2"
              id="filled-basic"
              type="text"
              label="Job Title"
              variant="outlined"
              name="jobTitle"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.jobTitle && Boolean(formik.errors.jobTitle)}
              helperText={formik.touched.jobTitle && formik.errors.jobTitle}
            />
          </div>
        </div>
        <Button
          onClick={formik.submitForm}
          variant="contained"
          className="flex items-center gap-2"
        >
          {loading ? "Adding" : "Add Contact"}
          {loading && <Loader size={15} />}
        </Button>
      </form>
    </Modal>
  );
}

export default FormModal;
