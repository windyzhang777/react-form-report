import { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Button,Grid, Link } from "@mui/material";
import moment from "moment";
import {
  CompDataGrid,
  GridColDef,
  ReportStatus,
  gridRow,
  NewSdrsDataResponse,
  ApprovedSdrsDataResponse,
  FlaggedSdrsDataResponse,
  NameValuesGetterParams,
  RowRowApi,
  RowApi,
} from "src/commons/types";
import "../commondatagrid/commondatagrid.css";
import {useAppSelector} from "../../redux/hooks";

const CommonDataGrid = (props: CompDataGrid) => {
  const { reportStatus, reportIndex, setViewSdrFlag, setSelectedSdrId } = props;
  const [rowData, setRowData] = useState<Array<gridRow>>([]);
  const [showCheckbox, setShowCheckbox] = useState<boolean>(false);
  const [selectedSdrsToExtract, setSelectedSdrsToExtract] = useState<
    Array<string>
  >([]);
  const [isExtractDisabled, setIsExtractDisabled] = useState<boolean>(true);
  const newSdrs: NewSdrsDataResponse = useAppSelector(state => state.newSdrs);
  const approvedSdrs: ApprovedSdrsDataResponse = useAppSelector(state => state.approvedSdrs);
  const flaggedSdrs: FlaggedSdrsDataResponse = useAppSelector(state => state.flaggedSdrs);

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
      field: "SdrStatus",
      headerName: "SDR Status",
      flex: 1,
      sortable: false,
    },
  ];

  useEffect(() => {
    props.updateOpenSdrCount(0, newSdrs.newSdrsData.length);
    props.updateOpenSdrCount(1, flaggedSdrs.flaggedSdrsData.length);
    props.updateOpenSdrCount(2, approvedSdrs.approvedSdrsData.length);
  })

  useEffect(() => {
    setShowCheckbox(reportIndex === ReportStatus.Approved);
  }, [reportIndex]);

  // useEffect(() => {
  //   if (selectedSdrsToExtract && selectedSdrsToExtract.length > 0) setIsExtractDisabled(false);
  //   else setIsExtractDisabled(true);
  // }, [selectedSdrsToExtract]);

  useEffect(() => {
    let sdrData: Array<any> = [];
    let sdrStatusText = "Open";
    let logpageStatusText = "Submitted";
    switch (reportIndex) {
      case 1:
        sdrData = flaggedSdrs.flaggedSdrsData;
        sdrStatusText = "Approved with Follow Up";
        logpageStatusText = "Approved with follow up";
        break
      case 2:
        sdrData = approvedSdrs.approvedSdrsData;
        sdrStatusText = "Approved";
        logpageStatusText = "Approved";
        break;
      case 0:
      default:
        sdrData = newSdrs.newSdrsData;
        sdrStatusText = "Open";
        logpageStatusText = "Submitted";
        break;
    }

    let filteredSdrs:any[] = [];

    Array.isArray(sdrData) && sdrData?.forEach((r:any) => {
      let row:any = {};
      row.SdrStatus = sdrStatusText;
      row.LogPageStatus = logpageStatusText;
      row.LogPageNumber = r.LogPageNumber;
      row.FirstName = r.FirstName;
      row.LastName = r.LastName;
      row.CreatedBy = r.CreatedBy;
      row.CreatedDate = moment(r.CreatedDate).format("MM/DD/YYYY hh:mm:ss A");
      row.id = r.SdrNumber;
      filteredSdrs.push(row);
    })

    setRowData(filteredSdrs);
    props.updateOpenSdrCount(reportIndex, filteredSdrs.length);
  }, [reportStatus]);

  const onRowsSelectionHandler = (sdrIds: Array<string>) => {
    setSelectedSdrsToExtract([...sdrIds]);
    if (sdrIds && sdrIds.length > 0) setIsExtractDisabled(false);
    else setIsExtractDisabled(true);
  };

  const setViewSdr = (sdrData: any) => {
    setViewSdrFlag(true);
    setSelectedSdrId(sdrData?.row?.id);
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
          onRowSelectionModelChange={(sdrIds: any) =>
            onRowsSelectionHandler(sdrIds)
          }
          getRowClassName={(params) =>
            params.indexRelativeToCurrentPage % 2 === 0 ? "" : "Mui-odd"
          }
          disableRowSelectionOnClick
          onCellClick={(data) => {
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
