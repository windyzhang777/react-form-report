import { Box, styled } from "@mui/material";

export const FlexRow = styled(Box)({
  display: "flex",
  alignItems: "center",
});

export const FlexCenter = styled(Box)({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});

export const FlexBetween = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
});

export const FlexColumn = styled(Box)({
  display: "flex",
  flexDirection: "column",
});
