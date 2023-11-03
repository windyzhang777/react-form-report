import { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Button,Grid, Link } from "@mui/material";
import moment from "moment";
import {
  CompDataGrid,
  GridColDef,
  ReportStatus,
  gridRow,
} from "src/commons/types";
import "../commondatagrid/commondatagrid.css";

const CommonDataGrid = (props: CompDataGrid) => {
  const { reportStatus, reportIndex, setViewSdrFlag, setSelectedSdrId } = props;
  const [rowData, setRowData] = useState<Array<gridRow>>([]);
  const [showCheckbox, setShowCheckbox] = useState<boolean>(false);
  const [selectedSdrsToExtract, setSelectedSdrsToExtract] = useState<
    Array<string>
  >([]);
  const [isExtractDisabled, setIsExtractDisabled] = useState<boolean>(true);

  const LinkCell = (rowApi: any) => {
    let logPageNumber = rowApi?.rowApi?.row?.logpagenumber;
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

  const highlightDate = (rowApi: any) => {
    let data = rowApi?.row?.datetime;
    let current = moment().add(-2, "days").format("MM/DD/YYYY h:mm");
    if (moment(data).isBefore(current)) {
      return <p className="paragraph-text">{data}</p>;
    }
  };

  const columnDefs: GridColDef[] = [
    {
      field: "logpagenumber",
      headerName: "Log Page Number",
      flex: 1,
      sortable: false,
      renderCell: (rowApi: any) => <LinkCell rowApi={rowApi} />,
    },
    {
      field: "reportedby",
      headerName: "Reported By",
      flex: 1,
      sortable: false,
      valueGetter: (params: any) =>
        `${params?.row?.reportedby} (${params?.row?.reportedid})`,
    },
    {
      field: "datetime",
      headerName: "Date & Time",
      flex: 1,
      sortable: false,
      renderCell: (rowApi: any) => highlightDate(rowApi),
    },
    {
      field: "logpagestatus",
      headerName: "Log Page Status",
      flex: 1,
      sortable: false,
    },
    {
      field: "issdr",
      headerName: "SDR/SFR",
      flex: 1,
      sortable: false,
    },
    {
      field: "sdrstatus",
      headerName: "SDR Status",
      flex: 1,
      sortable: false,
    },
  ];

  const getAllSdrs = () => {};

  useEffect(() => {
    getAllSdrs();
  }, []);

  let dateFormat = "MM/DD/YYYY h:mm";
  let sdrData = [
    {
      id: 1,
      logpagenumber: "19865441",
      reportedby: "User 0",
      reportedid: "U87654",
      datetime: moment().format(dateFormat),
      logpagestatus: "Open",
      issdr: "SDR",
      sdrstatus: "Open",
    },
    {
      id: 2,
      logpagenumber: "234234234",
      reportedby: "User 1",
      reportedid: "U543211",
      datetime: moment().add(-3, "days").add(12, "seconds").format(dateFormat),
      logpagestatus: "Open",
      issdr: "SDR",
      sdrstatus: "Open",
    },
    {
      id: 3,
      logpagenumber: "56753423",
      reportedby: "User 2",
      reportedid: "U87654",
      datetime: moment().format(dateFormat),
      logpagestatus: "Open",
      issdr: "SFR",
      sdrstatus: "Open",
    },
    {
      id: 4,
      logpagenumber: "67563432",
      reportedby: "User 3",
      reportedid: "U187654",
      datetime: moment().add(-2, "days").format(dateFormat),
      logpagestatus: "FlaggedForFollowUp",
      issdr: "SDR",
      sdrstatus: "Sent to FAA",
    },
    {
      id: 5,
      logpagenumber: "87654342",
      reportedby: "User 4",
      reportedid: "U23423",
      datetime: moment().format(dateFormat),
      logpagestatus: "FlaggedForFollowUp",
      issdr: "SFR",
      sdrstatus: "Sent to FAA",
    },
    {
      id: 6,
      logpagenumber: "98765432",
      reportedby: "User 5",
      reportedid: "U685322",
      datetime: moment().add(-1, "days").format(dateFormat),
      logpagestatus: "FlaggedForFollowUp",
      issdr: "SDR",
      sdrstatus: "Sent to FAA",
    },
    {
      id: 7,
      logpagenumber: "876541134",
      reportedby: "User 6",
      reportedid: "U90433",
      datetime: moment().add(-3, "days").format(dateFormat),
      logpagestatus: "Approved",
      issdr: "SFR",
      sdrstatus: "Sent to FAA",
    },
    {
      id: 8,
      logpagenumber: "087654322",
      reportedby: "User 7",
      reportedid: "U56789",
      datetime: moment().add(-1, "days").format(dateFormat),
      logpagestatus: "Approved",
      issdr: "SDR",
      sdrstatus: "Sent to FAA",
    },
    {
      id: 9,
      logpagenumber: "876543212",
      reportedby: "User 8",
      reportedid: "U32146",
      datetime: moment().format(dateFormat),
      logpagestatus: "Approved",
      issdr: "SFR",
      sdrstatus: "Sent to FAA",
    },
  ];

  useEffect(() => {
    setShowCheckbox(reportIndex === ReportStatus.Approved);
  }, [reportIndex]);

  // useEffect(() => {
  //   if (selectedSdrsToExtract && selectedSdrsToExtract.length > 0) setIsExtractDisabled(false);
  //   else setIsExtractDisabled(true);
  // }, [selectedSdrsToExtract]);

  useEffect(() => {
    let filteredSdrs = sdrData?.filter((r) => r.logpagestatus === reportStatus);
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
