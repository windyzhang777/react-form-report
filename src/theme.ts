import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  typography: {
    fontFamily: ["Open Sans", "sans-serif"].join(","),
  },
  palette: {
    primary: {
      main: "#002244",
      contrastText: "#fff",
    },
    info: {
      main: "#334E69",
      contrastText: "#fff",
    },
    error: {
      main: "#D50032",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: ({ ownerState }) => ({
          minWidth: "10em",
          minHeight: "2.5em",
          textTransform: "capitalize",
          padding: "0.3% 0.6%",
          fontSize: "16px",
          textAlign: "center",
          borderRadius: "4px",
          ...(ownerState.color === "secondary"
            ? {
                color: "#6244BB",
                border: "1px solid #6244BB",
                backgroundColor: "#FFF",
                "&:hover": {
                  backgroundColor: "#EAEAF3",
                  border: "1px solid #6244BB",
                },
                "&:active": {
                  backgroundColor: "#B6B8DC",
                },
                "&:focus": {
                  backgroundColor: "#FFF",
                  outline: "4px solid #B6B8DC !important",
                },
                "&.Mui-disabled": {
                  backgroundColor: "#E6E6E6",
                  border: "1px solid #666",
                  color: "#666",
                },
              }
            : ownerState.color === "info"
            ? {
                color: "#6244BB",
                border: "none",
                backgroundColor: "#FFF",
                "&:hover": {
                  backgroundColor: "#EAEAF3",
                  border: "none",
                },
                "&:active": {
                  backgroundColor: "#B6B8DC",
                },
                "&:focus": {
                  backgroundColor: "#FFF",
                  outline: "4px solid #B6B8DC !important",
                },
                "&.Mui-disabled": {
                  backgroundColor: "#E6E6E6",
                  border: "none",
                  color: "#666",
                },
              }
            : {
                color: "#FFF",
                border: "none",
                backgroundColor: "#6244BB",
                "&:hover": {
                  backgroundColor: "#8972CC",
                  border: "none",
                },
                "&:active": {
                  backgroundColor: "#49328C",
                },
                "&:focus": {
                  backgroundColor: "#6244BB",
                  outline: "4px solid #B6B8DC !important",
                },
                "&.Mui-disabled": {
                  backgroundColor: "#999",
                  border: "none",
                  color: "#FFF",
                },
              }),
        }),
      },
    },
  },
});
