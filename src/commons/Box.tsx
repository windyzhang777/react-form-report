import { Box, styled } from "@mui/material";
import { ReactNode } from "react";
import AlertIcon from "src/icons/Alert.svg";
import AlertRedIcon from "src/icons/AlertRed.svg";

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

export interface IInfoBoxProps {
  children: ReactNode;
  className?: string;
}

export const InfoBox = ({ children, ...props }: IInfoBoxProps) => (
  <FlexRow
    sx={{
      width: "fit-content",
      gap: "8px",
      height: "40px",
      padding: "12px",
      borderRadius: "4px",
      bgcolor: "#ddd",
    }}
    {...props}
  >
    <FlexCenter>{children}</FlexCenter>
  </FlexRow>
);

export const WarningBox = ({ children }: IInfoBoxProps) => (
  <FlexRow
    sx={{
      width: "fit-content",
      gap: "8px",
      height: "40px",
      padding: "12px",
      border: "1px solid #EDB72B",
      borderLeftWidth: "4px",
      borderRadius: "4px",
    }}
  >
    <img src={AlertIcon} alt="Alert" title="Alert" style={{ display: "inline" }} />
    <FlexCenter>{children}</FlexCenter>
  </FlexRow>
);

export const ErrorBox = ({ children }: IInfoBoxProps) => (
  <FlexRow
    sx={{
      width: "fit-content",
      gap: "8px",
      height: "40px",
      padding: "12px",
      border: "1px solid #D50032",
      borderLeftWidth: "4px",
      borderRadius: "4px",
    }}
  >
    <img src={AlertRedIcon} alt="Alert" title="Alert" style={{ display: "inline" }} />
    <FlexCenter>{children}</FlexCenter>
  </FlexRow>
);
