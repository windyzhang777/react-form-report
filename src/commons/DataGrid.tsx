import { Box, Button, styled } from "@mui/material";
import { DataGrid, GridFooterContainer, GridPagination, useGridApiContext } from "@mui/x-data-grid";
import moment from "moment";
import { DATE_HTML_DISPLAY } from "src/helpers";
import { theme } from "src/theme";

const StyledDataGrid = styled(DataGrid)(() => ({
  "& .MuiDataGrid-columnHeaders": {
    backgroundColor: theme.palette.primary.main,
    minHeight: "4rem !important",
  },
  "& .MuiDataGrid-columnHeaderTitle": {
    color: theme.palette.primary.contrastText,
    lineHeight: 1.2,
    overflowWrap: "break-word",
    whiteSpace: "break-spaces",
  },
  "& .MuiDataGrid-row": {
    cursor: "pointer",
  },
  "& .MuiDataGrid-virtualScroller::-webkit-scrollbar": {
    display: "none",
  },
}));

export const ScrollableDataGrid = styled(DataGrid)(() => ({
  "& .MuiDataGrid-columnHeaders": {
    backgroundColor: theme.palette.primary.main,
  },
  "& .MuiDataGrid-columnHeaderTitle": {
    color: theme.palette.primary.contrastText,
  },
  "& .MuiDataGrid-row": {
    cursor: "pointer",
  },
}));

export const CommonDataGridFooter = () => (
  <GridFooterContainer>
    <Box />
    <GridPagination />
  </GridFooterContainer>
);

export const ReportDataGridFooter = () => {
  const apiRef = useGridApiContext();
  const handleExport = () =>
    apiRef.current.exportDataAsCsv({
      fileName: `eSFR-Report-${moment().format(DATE_HTML_DISPLAY)}`,
    });

  return (
    <GridFooterContainer
      sx={{
        margin: "-10px -10px 0",
        padding: "20px 11px",
        backgroundColor: "#fff",
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      <Button color="secondary" onClick={handleExport}>
        Export Results
      </Button>
      <GridPagination />
    </GridFooterContainer>
  );
};

export default StyledDataGrid;
