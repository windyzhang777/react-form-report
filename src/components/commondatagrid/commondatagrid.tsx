import { Grid, Link, Typography } from "@mui/material";
import { GridCellParams, GridColDef, GridRowSelectionModel } from "@mui/x-data-grid";
import moment from "moment";
import { useEffect, useState } from "react";
import { FlexRow } from "src/commons/Box";
import StyledButton from "src/commons/Button";
import CommonButtonGroup from "src/commons/ButtonGroup";
import StyledDataGrid from "src/commons/DataGrid";
import CommonModal from "src/commons/Modal";
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
  const [confirmExtract, setConfirmExtract] = useState<boolean>(false);

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
      minWidth: 150,
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
      minWidth: 200,
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

  const setViewSdr = (sdrData: GridCellParams) => {
    setViewSdrFlag(true);
    setSelectedSdrId(sdrData?.row.Id);
    setSelectedType(sdrData?.row.Type);
    setViewSdrId(sdrData?.row.Id);
    setSelectedIndex(tabIndex);
  };

  const handleConfirmExtract = () => {
    setConfirmExtract(false);
    console.log("selectedSdrsToExtract :", selectedSdrsToExtract);
    // TODO: [TASK 1227082] eSFR Flat file creation for sending to external system
    // const found = approvedSdrs.sdrData.find(s=>s.Id===selectedSdrsToExtract[0])
    // Type
    // moment(CreatedDate).format("yyyymmdd")
  };

  return (
      <Grid item md={12}>
        {confirmExtract && (
          <CommonModal
            name="confirm-extract"
            onClose={() => setConfirmExtract(false)}
            open={confirmExtract}
          >
            <Typography id="confirm-extract-modal-title" variant="h6" mb={2} fontWeight={600}>Extract Confirmation</Typography>
            <Typography id="confirm-extract-modal-description" variant="body1" mb={6}>Please confirm that you would like to extract the selected reports</Typography>
            <CommonButtonGroup
              labelPrimary="Confirm"
              labelSecondary="Cancel"
              onClickPrimary={handleConfirmExtract}
              onClickSecondary={() => setConfirmExtract(false)}
              placeEnd
            />
          </CommonModal>
        )}
        <StyledDataGrid
          disableColumnMenu
          columns={columnDefs}
          rows={rowData}
          getRowId={(row) => row.Id}
          checkboxSelection={showCheckbox}
          hideFooter={true}
          onRowSelectionModelChange={(sdrIds) => {
            setSelectedSdrsToExtract([...sdrIds]);
            if (sdrIds && sdrIds.length > 0) setIsExtractDisabled(false);
            else setIsExtractDisabled(true);
          }}
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
        <FlexRow placeEnd mt={2}>
          <StyledButton
            className="extract-button"
            disabled={isExtractDisabled}
            onClick={() => setConfirmExtract(true)}
          >
            Extract
          </StyledButton>
        </FlexRow>
        )}
      </Grid>
  );
};

export default CommonDataGrid;
