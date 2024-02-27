import { Grid, Link } from "@mui/material";
import { GridCellParams, GridColDef, GridRowSelectionModel, GridValidRowModel } from "@mui/x-data-grid";
import moment from "moment";
import { useEffect, useState } from "react";
import StyledButton from "src/commons/Button";
import StyledDataGrid from "src/commons/DataGrid";
import {
  CommonDataGridProps,
  GridRow,
  SdrRowApi,
  SdrStateType,
  SelectedTab
} from "src/commons/types";
import { useAppSelector } from "src/redux/hooks";
import config from "src/utils/env.config";
import "./commondatagrid.css";

const CommonDataGrid = ({
  setSelectedIndex,
  setSelectedSdrId,
  setSelectedType,
  setViewSdrFlag,
  tabIndex,
  tabValue,
  updateSdrCount,
}: CommonDataGridProps) => {
  const [rowData, setRowData] = useState<Array<GridRow>>([]);
  const [showCheckbox, setShowCheckbox] = useState<boolean>(false);
  const [selectedSdrsToExtract, setSelectedSdrsToExtract] = useState<GridRowSelectionModel>([]);
  const [isExtractDisabled, setIsExtractDisabled] = useState<boolean>(true);
  const [viewSdrId, setViewSdrId] = useState("");
  const newSdrs: SdrStateType = useAppSelector(state => state.newSdrs);
  const approvedSdrs: SdrStateType = useAppSelector(state => state.approvedSdrs);
  const flaggedSdrs: SdrStateType = useAppSelector(state => state.flaggedSdrs);
  const currentDateTime = moment().add(-2, "days");

  const openLogPage = (logpageNumber: string) => {
    let width = window.innerWidth;
    let url = `${config.webTechApiBaseUrl}${config.URL_LOGPAGE_SEARCH}?logPageNumber=${logpageNumber}&fleetCode=null&role=${sessionStorage.getItem("jobRole")}`;
    window.open(url, "_blank", "width=" + (width - 450) / 2 + ",height=" + (window.innerHeight - 320) + ",left=" + ((width / 2) - 50) + ",top=450");
  };

  const columnDefs: GridColDef[] = [
    {
      field: "LogpageNumber",
      headerName: "Log Page Number",
      sortable: false,
      minWidth: 100,
      renderCell: ({ row }) => (
        <Link onClick={() => openLogPage(row?.LogpageNumber)} sx={{ cursor: "pointer", color: "#6244BB" }}>{row?.LogpageNumber}</Link>
      ),
    },
    {
      field: "reportedby",
      headerName: "Reported By",
      sortable: false,
      minWidth: 120,
      valueGetter: ({ row }) =>
          `${row?.CreatedbyFirstName || ""} ${row?.CreatebyLastName || ""} (${row?.CreatedBy || ""})`,
    },
    {
      field: "CreatedDate",
      headerName: "Date & Time",
      minWidth: 180,
      sortable: false,
      renderCell: ({ row }) => 
        <p className={moment(row?.CreatedDate).isBefore(currentDateTime) ? "paragraph-text" : ""}>{row?.CreatedDate}</p>,
    },
    {
      field: "LogpageStatus",
      headerName: "Log Page Status",
      minWidth: 150,
      sortable: false,
    },
    {
      field: "Type",
      headerName: "SDR/SFR",
      sortable: false,
    },
    {
      field: "SdrStatus",
      headerName: "SDR Status",
      flex: 1,
      sortable: false,
    },
  ];

  useEffect(() => {
    updateSdrCount(0, newSdrs.sdrData?.length);
    updateSdrCount(1, flaggedSdrs.sdrData?.length);
    updateSdrCount(2, approvedSdrs.sdrData?.length);
  });

  useEffect(() => {
    setShowCheckbox(tabIndex === SelectedTab.Approved);
  }, [tabIndex]);

  useEffect(() => {
    let sdrData: Array<SdrRowApi> = [];
    let sdrStatusText = "Open";
    switch (tabIndex) {
      case 1:
        sdrData = flaggedSdrs.sdrData;
        sdrStatusText = "Approved with Follow Up";
        break
      case 2:
        sdrData = approvedSdrs.sdrData;
        sdrStatusText = "Approved";
        break;
      case 0:
      default:
        sdrData = newSdrs.sdrData;
        sdrStatusText = "Open";
        break;
    }

    let filteredSdrs: GridRow[] = [];

    Array.isArray(sdrData) && sdrData?.forEach((r: SdrRowApi) => {
      let row: GridRow = {
        SdrStatus: sdrStatusText,
        Id: r.Id,
        LogpageNumber: r.LogpageNumber,
        LogpageStatus: r.LogpageStatus,
        CreatedBy: r.CreatedBy,
        CreatedbyFirstName: r.CreatedbyFirstName,
        CreatebyLastName: r.CreatebyLastName,
        CreatedDate: moment(r.CreatedDate).format("MM/DD/YYYY hh:mm:ss A"),
        Type: r.Type,
      }
      filteredSdrs.push(row);
    })

    setRowData(filteredSdrs);
    updateSdrCount(tabIndex, filteredSdrs.length);
  }, [tabValue]);

  const onRowsSelectionHandler = (sdrIds: GridRowSelectionModel) => {
    setSelectedSdrsToExtract([...sdrIds]);
    console.log(selectedSdrsToExtract);
    if (sdrIds && sdrIds.length > 0) setIsExtractDisabled(false);
    else setIsExtractDisabled(true);
  };

  const setViewSdr = (sdrData: GridCellParams) => {
    setViewSdrFlag(true);
    setSelectedSdrId(sdrData?.row.Id);
    setSelectedType(sdrData?.row.Type);
    setViewSdrId(sdrData?.row.Id + "-" + sdrData?.row.Type);
    setSelectedIndex(tabIndex);
  };

  const getRowId = (row: GridValidRowModel) => {
    return row.Id + "-" + row.Type;
  }

  return (
      <Grid item md={12}>
        <StyledDataGrid
          disableColumnMenu
          columns={columnDefs}
          rows={rowData}
          getRowId={getRowId}
          checkboxSelection={showCheckbox}
          hideFooter={true}
          onRowSelectionModelChange={(sdrIds: GridRowSelectionModel) =>
            onRowsSelectionHandler(sdrIds)
          }
          getRowClassName={(params) => {
            let rowStyles = "";
            rowStyles += params.id === viewSdrId ? "Mui-selection " : "";
            rowStyles += params.indexRelativeToCurrentPage % 2 === 0 ? "Mui-even" : "Mui-odd";
            return rowStyles;
          }}
          disableRowSelectionOnClick
          onCellClick={(data: GridCellParams) => {
            if (data.field !== "__check__") {
              setViewSdr(data);
            }
          }}
        />
        {tabIndex === SelectedTab.Approved && (
        <Grid item sx={{ marginTop: "2rem", display: "flex", justifyContent: "flex-end" }}>
          <StyledButton
            className="extract-button"
            disabled={isExtractDisabled}
            // onClick={handleExtract}
          >
            Extract
          </StyledButton>
        </Grid>
        )}
      </Grid>
  );
};

export default CommonDataGrid;
