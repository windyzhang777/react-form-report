import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
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
    secondary: {
      main: "#6244BB",
    },
    info: { main: "#fff" },
    error: {
      main: "#D50032",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: ({ ownerState, theme }) => ({
          minWidth: "10rem",
          minHeight: "2.5rem",
          textTransform: "capitalize",
          padding: "0.3% 0.6%",
          fontSize: "16px",
          textAlign: "center",
          borderRadius: "4px",
          ...(ownerState.color === "secondary"
            ? {
                color: theme.palette.secondary.main,
                border: "1px solid " + theme.palette.secondary.main,
                backgroundColor: "#FFF",
                "&:hover": {
                  backgroundColor: "#EAEAF3",
                  border: "1px solid " + theme.palette.secondary.main,
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
                color: theme.palette.secondary.main,
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
                backgroundColor: theme.palette.secondary.main,
                "&:hover": {
                  backgroundColor: "#8972CC",
                  border: "none",
                },
                "&:active": {
                  backgroundColor: "#49328C",
                },
                "&:focus": {
                  backgroundColor: theme.palette.secondary.main,
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
    MuiButtonBase: {
      styleOverrides: {
        root: ({ theme }) => ({
          "&.Mui-checked": {
            color: theme.palette.secondary.main + "!important",
          },
        }),
      },
    },
    MuiCircularProgress: {
      styleOverrides: {
        svg: ({ theme }) => ({
          color: theme.palette.secondary.main,
        }),
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: ({ theme }) => ({
          ".MuiInputBase-input.MuiSelect-select": {
            padding: "8.5px 30px 8.5px 14px !important",
          },
          ".MuiSvgIcon-root": {
            color: theme.palette.secondary.main,
          },
          "&.Mui-focused fieldset": {
            borderColor: theme.palette.secondary.main + " !important",
          },
        }),
      },
    },
    MuiSelect: {
      defaultProps: {
        IconComponent: ExpandMoreIcon,
      },
      styleOverrides: {
        root: ({ theme }) => ({
          ".MuiInputBase-input.MuiSelect-select": {
            padding: "8.5px 14px !important",
          },
          ".MuiSvgIcon-root": {
            color: theme.palette.secondary.main,
          },
        }),
      },
    },
    MuiFormHelperText: {
      styleOverrides: {
        root: {
          marginLeft: 0,
          marginRight: 0,
          marginBottom: 2,
          lineHeight: "15px",
        },
      },
    },
    MuiGrid: {
      styleOverrides: {
        root: {
          marginTop: 0,
          marginLeft: 0,
          ".MuiGrid-item": {
            paddingTop: 0,
            paddingLeft: 0,
          },
        },
        container: {
          width: "100%",
        },
        item: {
          ".MuiListItem-root": {
            paddingLeft: 0,
            paddingBottom: 0,
          },
        },
      },
    },
    MuiLink: {
      styleOverrides: {
        root: {
          textDecoration: "none",
        },
      },
    },
    MuiListItem: {
      styleOverrides: {
        root: ({ theme }) => ({
          display: "inline-block",
          ".required": {
            color: theme.palette.error.main,
          },
        }),
      },
    },
    MuiMenu: {
      styleOverrides: {
        paper: {
          // width
          "&::-webkit-scrollbar": {
            width: "10px",
          },
          // Handle
          "&::-webkit-scrollbar-thumb": {
            background: "#6244bb",
            borderRadius: "12px",
            cursor: "pointer",
          },
          // Handle on hover
          "&::-webkit-scrollbar-thumb:hover": {
            background: "#30118a",
          },
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          "&:hover": {
            backgroundColor: "#eaeaf3",
          },
        },
      },
    },
  },
});
