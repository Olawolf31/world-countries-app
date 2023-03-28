import React from "react";
import Index from "./routes/Index";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useAppSelector } from "../src/app/hooks";
import Paper from "@mui/material/Paper";

function App() {
  const isDarkMode = useAppSelector((state) => state.theme.isDarkMode);

  const theme = createTheme({
    palette: {
      mode: isDarkMode ? "dark" : "light",
    },
    typography: {
      fontFamily: "Nunito Sans",
      fontSize: 16,
      h1: {
        fontSize: "2.5rem",
      },
      h2: {
        fontSize: "2rem",
      },
      body1: {
        fontSize: "1.2rem",
      },
    },
  });

  return (
    <div>
      <ThemeProvider theme={theme}>
        <Paper style={{ minHeight: "100vh" }}>
          <Index />
        </Paper>
      </ThemeProvider>
    </div>
  );
}

export default App;
