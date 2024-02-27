import { Button, styled } from "@mui/material";

export interface IStyledButton {
  secondary?: boolean;
  tertiary?: boolean;
}

const StyledButton = styled(Button)(
  ({ secondary, tertiary }: IStyledButton) => {
    return {
      fontFamily: "Open Sans",
      minWidth: "10em",
      minHeight: "2.5em",
      color: tertiary || secondary ? "#6244BB" : "#FFF",
      textTransform: "capitalize",
      padding: "0.3% 0.6%",
      fontSize: "16px",
      textAlign: "center",
      borderRadius: "4px",
      border: secondary ? "1px solid #6244BB" : "none",
      backgroundColor: tertiary || secondary ? "#FFF" : "#6244BB",
      "&:hover": {
        backgroundColor: tertiary || secondary ? "#EAEAF3" : "#8972CC",
        border: secondary ? "1px solid #6244BB" : "none",
      },
      "&:active": {
        backgroundColor: tertiary || secondary ? "#B6B8DC" : "#49328C",
      },
      "&:focus": {
        backgroundColor: tertiary || secondary ? "#FFF" : "#6244BB",
        outline: "4px solid #B6B8DC !important",
      },
      "&.Mui-disabled": {
        backgroundColor: tertiary || secondary ? "#E6E6E6" : "#999",
        border: secondary ? "1px solid #666" : "none",
        color: tertiary || secondary ? "#666" : "#FFF",
      },
    };
  }
);

export default StyledButton;
