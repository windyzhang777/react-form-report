import { useEffect, useState} from "react";
import {DataGrid, GridCellParams, GridRowSelectionModel, GridColDef} from "@mui/x-data-grid";
import { Button,Grid, Link } from "@mui/material";
import moment from "moment";
import {
  CompDataGrid,
  ReportStatus,
  GridRow,
  NameValuesGetterParams,
  RowRowApi,
  RowApi, SdrRowApi, SdrStateType,
} from "src/commons/types";
import "../commondatagrid/commondatagrid.css";
import {useAppSelector} from "../../redux/hooks";

const CommonDataGrid = (props: CompDataGrid) => {
  const { reportStatus, reportIndex, setViewSdrFlag, setSelectedSdrId, updateOpenSdrCount } = props;
  const [rowData, setRowData] = useState<Array<GridRow>>([]);
  const [showCheckbox, setShowCheckbox] = useState<boolean>(false);
  const [selectedSdrsToExtract, setSelectedSdrsToExtract] = useState<
      GridRowSelectionModel
  >([]);
  const [isExtractDisabled, setIsExtractDisabled] = useState<boolean>(true);
  const newSdrs: SdrStateType = useAppSelector(state => state.newSdrs);
  const approvedSdrs: SdrStateType = useAppSelector(state => state.approvedSdrs);
  const flaggedSdrs: SdrStateType = useAppSelector(state => state.flaggedSdrs);

  const LinkCell = (rowApi: RowRowApi) => {
    let logPageNumber = rowApi?.rowApi?.row?.LogPageNumber;
    return (
      <Link
        sx={{ cursor: "pointer", color: "#6244BB" }}
        onClick={() => openLogPage(logPageNumber)}
      >
        {logPageNumber}
      </Link>
    );
  };

  const openLogPage = (url: string) => {
    window.open("www.google.com", "_blank", "referrer");
  };

  const highlightDate = (rowApi: RowApi) => {
    let data = rowApi?.row?.datetime;
    let current = moment().add(-2, "days").format("MM/DD/YYYY h:mm");
    if (moment(data).isBefore(current)) {
      return <p className="paragraph-text">{data}</p>;
    }
  };

  const columnDefs: GridColDef[] = [
    {
      field: "LogPageNumber",
      headerName: "Log Page Number",
      flex: 1,
      sortable: false,
      renderCell: (rowApi: RowApi) => <LinkCell rowApi={rowApi} />,
    },
    {
      field: "reportedby",
      headerName: "Reported By",
      flex: 1,
      sortable: false,
      valueGetter: (params: NameValuesGetterParams) =>
        `${params?.row?.FirstName} ${params?.row?.LastName} (${params?.row?.CreatedBy})`,
    },
    {
      field: "CreatedDate",
      headerName: "Date & Time",
      flex: 1,
      sortable: false,
      renderCell: (rowApi: RowApi) => highlightDate(rowApi),
    },
    {
      field: "LogPageStatus",
      headerName: "Log Page Status",
      flex: 1,
      sortable: false,
    },
    {
      field: "sfdr",
      headerName: "SDR/SFR",
      flex: 1,
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
    updateOpenSdrCount(0, newSdrs.sdrData.length);
    updateOpenSdrCount(1, flaggedSdrs.sdrData.length);
    updateOpenSdrCount(2, approvedSdrs.sdrData.length);
  });

  useEffect(() => {
    setShowCheckbox(reportIndex === ReportStatus.Approved);
  }, [reportIndex]);

  // useEffect(() => {
  //   if (selectedSdrsToExtract && selectedSdrsToExtract.length > 0) setIsExtractDisabled(false);
  //   else setIsExtractDisabled(true);
  // }, [selectedSdrsToExtract]);

  useEffect(() => {
    let sdrData: Array<SdrRowApi> = [];
    let sdrStatusText = "Open";
    let logpageStatusText = "Submitted";
    switch (reportIndex) {
      case 1:
        sdrData = flaggedSdrs.sdrData;
        sdrStatusText = "Approved with Follow Up";
        logpageStatusText = "Approved with follow up";
        break
      case 2:
        sdrData = approvedSdrs.sdrData;
        sdrStatusText = "Approved";
        logpageStatusText = "Approved";
        break;
      case 0:
      default:
        sdrData = newSdrs.sdrData;
        sdrStatusText = "Open";
        logpageStatusText = "Submitted";
        break;
    }

    let filteredSdrs:GridRow[] = [];

    Array.isArray(sdrData) && sdrData?.forEach((r:SdrRowApi) => {
      let row:GridRow = {
        SdrStatus: sdrStatusText,
        LogPageStatus: logpageStatusText,
        LogPageNumber: r.LogPageNumber,
        FirstName: r.FirstName,
        LastName: r.LastName,
        CreatedBy: r.CreatedBy,
        CreatedDate: moment(r.CreatedDate).format("MM/DD/YYYY hh:mm:ss A"),
        sfdr: r.SFdr,
        id: r.SdrNumber
      }
      filteredSdrs.push(row);
    })

    setRowData(filteredSdrs);
    updateOpenSdrCount(reportIndex, filteredSdrs.length);
  }, [reportStatus]);

  const onRowsSelectionHandler = (sdrIds: GridRowSelectionModel) => {
    setSelectedSdrsToExtract([...sdrIds]);
    if (sdrIds && sdrIds.length > 0) setIsExtractDisabled(false);
    else setIsExtractDisabled(true);
  };

  const setViewSdr = (sdrData: GridCellParams) => {
    setViewSdrFlag(true);
    setSelectedSdrId(sdrData?.row.id);
  };

  return (
      <Grid item md={12} sx={{ height: 700 }}>
        <DataGrid
          sx={{ border: "none" }}
          disableColumnMenu
          columns={columnDefs}
          rows={rowData}
          checkboxSelection={showCheckbox}
          hideFooter={true}
          onRowSelectionModelChange={(sdrIds: GridRowSelectionModel) =>
            onRowsSelectionHandler(sdrIds)
          }
          getRowClassName={(params) =>
            params.indexRelativeToCurrentPage % 2 === 0 ? "" : "Mui-odd"
          }
          disableRowSelectionOnClick
          onCellClick={(data: GridCellParams) => {
            if (data.field !== "__check__") {
              setViewSdr(data);
            }
          }}
        />
        {reportIndex === ReportStatus.Approved && (
          <Grid item sx={{ float: "right" }}>
            <Button
              variant="contained"
              disabled={isExtractDisabled}
              className="extract-button"
              sx={
                isExtractDisabled
                  ? {
                      background: "#999999",
                    }
                  : { background: "#6244BB" }
              }
            >
              Extract
            </Button>
          </Grid>
        )}
      </Grid>
  );
};

export default CommonDataGrid;
