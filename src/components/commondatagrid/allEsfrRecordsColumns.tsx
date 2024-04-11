import { Link } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import moment from "moment";
import { TransformedSdrDataType } from "src/commons/types";
import { DATETIME_DISPLAY } from "src/helpers";
import config from "src/utils/env.config";

export const allEsfrRecordsColumns = (): GridColDef<TransformedSdrDataType>[] => {
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
      field: "AircraftNumber",
      headerName: "Aircraft Number",
      minWidth: 100,
      sortable: false,
    },
    {
      field: "Station",
      headerName: "Station",
      minWidth: 60,
      sortable: false,
    },
    {
      field: "ReportedBy",
      headerName: "Reported By",
      sortable: false,
      minWidth: 150,
      renderCell: ({ row }) =>
        `${row?.CreatedbyFirstName || ""} ${row?.CreatebyLastName || ""}${
          row?.CreatedBy ? ` (${row.CreatedBy})` : ""
        }`,
    },
    {
      field: "CreatedDate",
      headerName: "Date & Time",
      minWidth: 180,
      type: "dateTime",
      sortable: false,
      sortingOrder: ["desc", "asc"],
      valueFormatter: ({ value }) => new Date(value),
      renderCell: ({ row }) => (
        <p className={row.IsOlderThan72Hours ? "paragraph-text" : ""}>
          {moment(row?.CreatedDate).format(DATETIME_DISPLAY)}
        </p>
      ),
    },
    {
      field: "LogpageStatus",
      headerName: "Log Page Status",
      minWidth: 100,
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
};
