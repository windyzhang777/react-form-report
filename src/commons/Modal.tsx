import { Box, Modal, SxProps } from "@mui/material";
import { ReactNode } from "react";

export interface ICommonModalProps {
  children: ReactNode;
  className?: string;
  name: string;
  onClose: () => void;
  open: boolean;
  sx?: SxProps;
}

const CommonModal = ({
  children,
  className,
  name,
  onClose,
  open,
  sx,
  ...props
}: ICommonModalProps) => {
  return (
    <Modal
      disableEscapeKeyDown
      open={open}
      onClose={(e, reason) => {
        if (reason !== "backdropClick" && reason !== "escapeKeyDown") {
          onClose();
        }
      }}
      aria-labelledby={`${name}-modal-title`}
      aria-describedby={`${name}-modal-description`}
      {...props}
    >
      <Box
        sx={{
          padding: 3,
          width: 500,
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          bgcolor: "background.paper",
          boxShadow: 24,
          ...sx,
        }}
        className={className}
      >
        {children}
      </Box>
    </Modal>
  );
};

export default CommonModal;
