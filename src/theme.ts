import { createTheme } from "@mui/material";

export const theme = createTheme({
  typography: {
    fontFamily: ["Open Sans", "sans-serif"].join(","),
  },
  palette: {
    primary: {
      main: "#002244",
      contrastText: "#fff",
    },
  },
});
