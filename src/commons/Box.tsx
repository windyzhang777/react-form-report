import { Box, styled } from "@mui/material";

export interface IFlexRowProps {
  placeEnd?: boolean;
}

export const FlexRow = styled(Box)(({ placeEnd }: IFlexRowProps) => ({
  display: "flex",
  gap: "10px",
  width: placeEnd ? "100%" : "unset",
  justifyContent: placeEnd ? "flex-end" : "unset",
}));

export const FlexColumn = styled(Box)({
  display: "flex",
  flexDirection: "column",
  gap: "10px",
});
