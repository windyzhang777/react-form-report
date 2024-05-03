import { Link } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import moment from "moment";
import { DATETIME_DISPLAY } from "src/helpers";
import { GetPartsDiscrepancyReportResResult } from "src/types/GetPartsDiscrepancyReportRes";
import config from "src/utils/env.config";

export const partsReportSearchColumns = (): GridColDef<GetPartsDiscrepancyReportResResult>[] => {
  const openLogPage = (logpageNumber: string) => {
    let width = window.innerWidth;
    let url = `${config.webTechApiBaseUrl}${
      config.URL_LOGPAGE_SEARCH
    }?logPageNumber=${logpageNumber}&fleetCode=null&role=${sessionStorage.getItem("jobRole")}`;
    window.open(
      url,
      "_blank",
      "width=" +
        (width - 450) / 2 +
        ",height=" +
        (window.innerHeight - 320) +
        ",left=" +
        (width / 2 - 50) +
        ",top=450"
    );
  };

  return [
    {
      field: "Fleet",
      headerName: "Fleet",
      sortable: false,
      minWidth: 100,
    },
    {
      field: "AircraftNumber",
      headerName: "A/C Number",
      sortable: false,
      minWidth: 100,
      renderCell: ({ row }) => row?.AircraftNumber,
      valueGetter: ({ value }) => (value ? `=TEXT(${value},"0000")` : value),
    },
    {
      field: "DateCreated",
      headerName: "Date Created",
      minWidth: 180,
      type: "dateTime",
      sortable: false,
      sortingOrder: ["desc", "asc"],
      valueFormatter: ({ value }) => moment(value).format(DATETIME_DISPLAY),
      renderCell: ({ row }) => moment(row?.DateCreated).format(DATETIME_DISPLAY),
    },
    {
      field: "OperatorControlNumber",
      headerName: "Operator Control Number",
      sortable: false,
      minWidth: 200,
    },
    {
      field: "LogpageNumber",
      headerName: "Log Page Number",
      sortable: false,
      minWidth: 100,
      renderCell: ({ row }) => (
        <Link
          onClick={() => openLogPage(row?.LogpageNumber)}
          sx={{ cursor: "pointer", color: "#6244BB" }}
        >
          {row?.LogpageNumber}
        </Link>
      ),
    },
    {
      field: "Station",
      headerName: "Station",
      sortable: false,
      minWidth: 100,
    },
    {
      field: "AtaCode",
      headerName: "ATA Code",
      sortable: false,
      minWidth: 100,
      renderCell: ({ row }) => row?.AtaCode,
      valueGetter: ({ value }) => (value ? `=TEXT(${value},"0000")` : value),
    },
    {
      field: "DefectDescription",
      headerName: "Defect Description",
      sortable: false,
      minWidth: 120,
    },
    {
      field: "CorrosionLevel",
      headerName: "Corrosion Level",
      sortable: false,
      minWidth: 200,
    },
    {
      field: "PartName",
      headerName: "Part Name",
      sortable: false,
      minWidth: 120,
    },
    {
      field: "PartNumber",
      headerName: "Part Number",
      sortable: false,
      minWidth: 120,
    },
    {
      field: "MajorRepair",
      headerName: "Major Repair",
      sortable: false,
      minWidth: 100,
    },
    {
      field: "Pse",
      headerName: "PSE",
      sortable: false,
      minWidth: 120,
    },
    {
      field: "EcraNumber",
      headerName: "ECRA Number",
      sortable: false,
      minWidth: 120,
    },
    {
      field: "RepairDocNumber",
      headerName: "Repair Doc#",
      sortable: false,
      minWidth: 400,
    },
  ];
};
