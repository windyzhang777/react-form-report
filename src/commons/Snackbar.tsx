import { Alert, AlertColor, Snackbar } from "@mui/material";
import { ReactNode, SyntheticEvent, useState } from "react";

export interface ICommonSnackbarProps {
  children: string | ReactNode;
  onClose: () => void;
  severity: AlertColor;
}

const CommonSnackbar = ({ children, onClose, severity }: ICommonSnackbarProps) => {
  const [open, setOpen] = useState<boolean>(true);

  const handleClose = (event: SyntheticEvent | Event, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }
    onClose();
    setOpen(false);
  };

  return (
    <Snackbar
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
      autoHideDuration={2000}
      onClose={handleClose}
      open={open}
    >
      <Alert
        elevation={6}
        onClose={handleClose}
        severity={severity}
        variant="filled"
        sx={{ overflow: "unset", maxWidth: "400px" }}
      >
        {children}
      </Alert>
    </Snackbar>
  );
};

export default CommonSnackbar;
