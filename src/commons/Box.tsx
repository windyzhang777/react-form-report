import { Box, styled } from "@mui/material";

export interface IFlexRowProps {
  placeEnd?: boolean;
}

export const FlexRow = styled(Box, {
  shouldForwardProp: (prop) => prop !== "placeEnd",
})(({ placeEnd }: IFlexRowProps) => ({
  display: "flex",
  gap: "10px",
  justifyContent: placeEnd ? "flex-end" : "unset",
  alignItems: "center",
}));

export const FlexColumn = styled(Box)({
  display: "flex",
  flexDirection: "column",
  gap: "10px",
});
