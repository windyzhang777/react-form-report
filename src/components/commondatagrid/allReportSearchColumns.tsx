import { Link } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import moment from "moment";
import { ReportStatus } from "src/commons/types";
import { DATETIME_DISPLAY } from "src/helpers";
import { GetEsfrReportResResult } from "src/types/GetEsfrReportRes";
import config from "src/utils/env.config";

export const allReportSearchColumns = (
  reportStatus: number
): GridColDef<GetEsfrReportResResult>[] => {
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
      field: "ReportType",
      headerName: "Report Type",
      sortable: false,
      minWidth: 120,
    },
    {
      field: "OperatorControlNumber",
      headerName: "Audit Number",
      sortable: false,
      minWidth: 120,
    },
    {
      field: "LogpageNumber",
      headerName: "Log Page Time",
      sortable: true,
      minWidth: 150,
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
      field: "ReportedById",
      headerName: "Reported By Status",
      sortable: false,
      minWidth: 250,
      renderCell: ({ row }) =>
        `${row?.ReportedByFirstName || ""} ${row?.ReportedByLastName || ""}${
          row?.ReportedById ? ` (${row.ReportedById})` : ""
        }`,
    },
    {
      field: "ApprovedById",
      headerName: "Approved By",
      sortable: false,
      minWidth: 250,
      renderCell: ({ row }) =>
        `${row?.ApprovedByFirstName || ""} ${row?.ApprovedByLastName || ""}${
          row?.ApprovedById ? ` (${row.ApprovedById})` : ""
        }`,
    },
    {
      field: "DateReported",
      headerName: "Date Reported",
      minWidth: 180,
      type: "dateTime",
      sortable: true,
      sortingOrder: ["desc", "asc"],
      valueFormatter: ({ value }) => new Date(value),
      renderCell: ({ row }) => moment(row?.DateReported).format(DATETIME_DISPLAY),
    },
    {
      field: "AircraftNumber",
      headerName: "Report Status",
      sortable: false,
      minWidth: 120,
      renderCell: () => ReportStatus.find((r) => r.Id === reportStatus)?.Description,
    },
  ];
};
