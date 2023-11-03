import { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Button, Link } from '@mui/material'
import { Grid } from "@mui/material";
import moment from "moment";
import { CompDataGrid, GridColDef, gridRow } from "src/commons/types";
import "../commondatagrid/commondatagrid.css";

const CommonDataGrid = (props: CompDataGrid) => {
    const { reportStatus, reportIndex, setViewSdrFlag, setSelectedSdrId } = props;
    const [rowData, setRowData] = useState<Array<gridRow>>([]);
    const [showCheckbox, setShowCheckbox] = useState<boolean>(false);
    const [selectedSdrsToExtract, setSelectedSdrsToExtract] = useState<Array<number>>([]);

    const LinkCell = (rowApi: any) => {
        let logPageNumber = rowApi?.rowApi?.row?.logpagenumber;
        return (
            <Link sx={{ cursor: "pointer", color: "#6244BB" }} onClick={() => openLogPage(logPageNumber)}>{logPageNumber}</Link>
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
        { field: 'logpagenumber', headerName: 'Log Page Number', flex: 1, sortable: false, renderCell: (rowApi: any) => <LinkCell rowApi={rowApi} /> },
        { field: 'reportedby', headerName: 'Reported By', flex: 1, sortable: false, valueGetter: (params: any) => `${params?.row?.reportedby} (${params?.row?.reportedid})`},
        { field: 'datetime', headerName: 'Date & Time', flex: 1, sortable: false, renderCell: (rowApi: any) => highlightDate(rowApi) },
        { field: 'logpagestatus', headerName: 'Log Page Status', flex: 1, sortable: false },
        { field: 'sdrreportableitem', headerName: 'SDR Reportable Item', flex: 1, sortable: false }
    ];

    let dateFormat = 'MM/DD/YYYY h:mm';
    let sdrData = [{ id: 1, logpagenumber: '19865441', reportedby: 'User 0', reportedid: 'U87654', datetime: moment().format(dateFormat), logpagestatus: 'Open', sdrreportableitem: 'Yes' },
    { id: 2, logpagenumber: '234234234', reportedby: 'User 1', reportedid: 'U543211', datetime: moment().add(-3, 'days').add(12, 'seconds').format(dateFormat), logpagestatus: 'Open', sdrreportableitem: 'No' },
    { id: 3, logpagenumber: '56753423', reportedby: 'User 2', reportedid: 'U87654', datetime: moment().format(dateFormat), logpagestatus: 'Open', sdrreportableitem: 'Yes' },
    { id: 4, logpagenumber: '67563432', reportedby: 'User 3', reportedid: 'U187654', datetime: moment().add(-2, 'days').format(dateFormat), logpagestatus: 'FlaggedForFollowUp', sdrreportableitem: 'Yes' },
    { id: 5, logpagenumber: '87654342', reportedby: 'User 4', reportedid: 'U23423', datetime: moment().format(dateFormat), logpagestatus: 'FlaggedForFollowUp', sdrreportableitem: 'No' },
    { id: 6, logpagenumber: '98765432', reportedby: 'User 5', reportedid: 'U685322', datetime: moment().add(-1, 'days').format(dateFormat), logpagestatus: 'FlaggedForFollowUp', sdrreportableitem: 'Yes' },
    { id: 7, logpagenumber: '876541134', reportedby: 'User 6', reportedid: 'U90433', datetime: moment().add(-3, 'days').format(dateFormat), logpagestatus: 'Approved', sdrreportableitem: 'No' },
    { id: 8, logpagenumber: '087654322', reportedby: 'User 7', reportedid: 'U56789', datetime: moment().add(-1, 'days').format(dateFormat), logpagestatus: 'Approved', sdrreportableitem: 'No' },
    { id: 9, logpagenumber: '876543212', reportedby: 'User 8', reportedid: 'U32146', datetime: moment().format(dateFormat), logpagestatus: 'Approved', sdrreportableitem: 'Yes' },
    ];

    useEffect(() => {
        setShowCheckbox(reportIndex === 2);
    }, [reportIndex]);

    useEffect(() => {
        let filteredSdrs = sdrData?.filter((r) => r.logpagestatus === reportStatus);
        setRowData(filteredSdrs);
        props.updateOpenSdrCount(reportIndex, filteredSdrs.length);
    }, [reportStatus]);

    // const onRowsSelectionHandler = (ids: any) => {
    //   const selectedRowsData = ids.map((id: string) =>
    //     rowData?.find((row) => row.id.toString() === id.toString())
    //   );
    //   console.log(selectedRowsData);
    // };

    const setViewSdr = (sdrData: any) => {
        setViewSdrFlag(true);
        setSelectedSdrId(sdrData?.row?.id);
    };

    return (
      <Grid item md={12} sx={{ height: 700 }}>
        <DataGrid
          disableColumnMenu
          columns={columnDefs}
          rows={rowData}
          checkboxSelection={showCheckbox}
          hideFooter={true}
          //   onRowSelectionModelChange={(ids: any) => onRowsSelectionHandler(ids)}
          getRowClassName={(params) =>
            params.indexRelativeToCurrentPage % 2 === 0 ? "Mui-even" : "Mui-odd"
          }
          disableRowSelectionOnClick
          onCellClick={(data) => {
            if (data.field === "__check__") {
              setSelectedSdrsToExtract([
                ...selectedSdrsToExtract,
                data?.row?.id,
              ]);
            } else {
              setViewSdr(data);
            }
          }}
        />
        <Grid item>
          <Button variant="contained" disabled>Extract</Button>
        </Grid>
      </Grid>
    );
};

export default CommonDataGrid;