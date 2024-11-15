import "./App.css";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { useState } from "react";
import { Box, Button, Container, Typography } from "@mui/material";
import FormModal from "./components/FormModal";
import ContactTable from "./components/ContactTable";
import { Toaster } from "react-hot-toast";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

function App() {
  const [open, setOpen] = useState(false);

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline enableColorScheme />
      <Toaster />
      <Container className="min-h-screen m-4 bg-zinc-900 py-10 rounded-lg">
        <Typography fontWeight={500} variant="h4" align="left" marginBottom={1}>
          Contact Manager
        </Typography>
        <Typography
          align="left"
          fontSize={16}
          color="#ddd"
          gutterBottom
          marginBottom={4}
        >
          Streamline your contacts and stay organized with ease.
        </Typography>
        <FormModal open={open} handleClose={() => setOpen(false)} />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-end",
            gap: "1rem",
          }}
        >
          <ContactTable />
          <Button
            className="w-40 h-12 "
            onClick={() => setOpen(true)}
            variant="contained"
          >
            Add Contact
          </Button>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default App;
