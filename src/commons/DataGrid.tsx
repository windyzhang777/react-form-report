import { styled } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

const StyledDataGrid = styled(DataGrid)(() => {
  return {
    // "& .MuiDataGrid-columnHeaderTitle": {
    //   lineHeight: 1,
    //   overflowWrap: "break-word",
    //   whiteSpace: "break-spaces",
    // },
    "& .MuiDataGrid-row": {
      cursor: "pointer",
    },
  };
});

export default StyledDataGrid;
