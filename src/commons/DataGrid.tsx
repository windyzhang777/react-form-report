import { styled } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { theme } from "src/theme";

const StyledDataGrid = styled(DataGrid)(() => ({
  "& .MuiDataGrid-columnHeaders": {
    backgroundColor: theme.palette.primary.main,
  },
  "& .MuiDataGrid-columnHeaderTitle": {
    color: theme.palette.primary.contrastText,
  },
  // TODO: wrap table header
  // "& .MuiDataGrid-columnHeaderTitle": {
  //   lineHeight: 1,
  //   overflowWrap: "break-word",
  //   whiteSpace: "break-spaces",
  // },
  "& .MuiDataGrid-row": {
    cursor: "pointer",
  },
  "& .MuiDataGrid-virtualScroller::-webkit-scrollbar": {
    display: "none",
  },
}));

export default StyledDataGrid;
