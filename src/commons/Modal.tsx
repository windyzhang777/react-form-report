import { Box, Modal, SxProps } from "@mui/material";
import { ReactNode } from "react";

export interface ICommonModalProps {
  children: ReactNode;
  name: string;
  onClose: () => void;
  open: boolean;
  sx?: SxProps;
}

const CommonModal = ({
  children,
  name,
  onClose,
  open,
  sx,
  ...props
}: ICommonModalProps) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
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
      >
        {children}
      </Box>
    </Modal>
  );
};

export default CommonModal;
