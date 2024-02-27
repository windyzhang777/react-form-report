import { Box, styled } from "@mui/material";

export interface IFlexRow {
    end?: boolean;
}

export const FlexRow = styled(Box)(({ end }: IFlexRow) => ({
    display: "flex",
    gap: "10px",
    width: end ? "100%" : "unset",
    justifyContent: end ? "flex-end" : "unset",
}));

export const FlexColumn = styled(Box)({
    display: "flex",
    flexDirection: "column",
    gap: "10px",
});
