// import { DataGrid } from "@mui/x-data-grid";
import { Grid } from "@mui/material";
import { AgGridReact } from 'ag-grid-react';
import React, {
    useCallback,
    useMemo,
    useRef,
    useState,
    StrictMode,
  } from 'react';
import "../homescreen/homescreen.css";


const CommonDataGrid = () => {
    const gridRef = useRef();

    

    interface gridColumn{
        headerName: string,
        field: string
    }

    interface gridRow{
        id: Int32Array,
        logpagenumber: string,
        reportedby: string,
        datetime: Date,
        logpagestatus: string,
        sdrreportableitem: boolean
    }


    const [gridColumns]:Array<gridColumn> = [{field: 'logpagenumber', headerName: 'Log Page Number'},
                                             {field: 'reportedby', headerName: 'Reported By'}, 
                                             {field: 'datetime', headerName: 'Date & Time'},
                                             {field: 'logpagestatus', headerName: 'Log Page Status'}, 
                                             {field: 'sdrreportableitem', headerName: 'SDR Reportable Item'} 
                                            ];
    const [gridRows]:Array<gridRow> = [ ];


    const containerStyle = useMemo(() => ({ width: '100%', height: '100%' }), []);
  const gridStyle = useMemo(() => ({ height: '100%', width: '100%' }), []);
  const [rowData, setRowData] = useState();
  const [columnDefs, setColumnDefs] = useState([
    { field: 'athlete', minWidth: 150 },
    { field: 'age', maxWidth: 90 },
    { field: 'country', minWidth: 150 },
    { field: 'year', maxWidth: 90 },
    { field: 'date', minWidth: 150 },
    { field: 'sport', minWidth: 150 },
    { field: 'gold' },
    { field: 'silver' },
    { field: 'bronze' },
    { field: 'total' },
  ]);
  const defaultColDef = useMemo(() => {
    return {
      flex: 1,
      minWidth: 100,
    };
  }, []);

  const onGridReady = useCallback((params : any) => {
    fetch('https://www.ag-grid.com/example-assets/olympic-winners.json')
      .then((resp) => resp.json())
      .then((data) => setRowData(data));
  }, []);

  const onSelectionChanged = useCallback(() => {
    // const selectedRows = gridRef.current.api.getSelectedRows();
    //     document.querySelector('#selectedRows').innerHTML =
    //   selectedRows.length === 1 ? selectedRows[0].athlete : '';
  }, []);
    

    return (
        <Grid container md={12} sx={{height: 700}}>
            {/* <DataGrid 
                columns={[{field: 'logpagenumber', headerName: 'Log Page Number'},
                {field: 'reportedby', headerName: 'Reported By'}, 
                {field: 'datetime', headerName: 'Date & Time'},
                {field: 'logpagestatus', headerName: 'Log Page Status'}, 
                {field: 'sdrreportableitem', headerName: 'SDR Reportable Item'} 
               ]}
                rows={[{id:123, }]}
            /> */}

            <AgGridReact
                // ref={gridRef}
                rowData={rowData}
                columnDefs={columnDefs}
                // defaultColDef={defaultColDef}
                // rowSelection={'single'}
                // onGridReady={onGridReady}
                // onSelectionChanged={onSelectionChanged}
            />
        </Grid>
    );

};

export default CommonDataGrid;