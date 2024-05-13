import { Link } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import moment from "moment";
import { DATETIME_DISPLAY, openLogPage } from "src/helpers";
import { GetEsfrReportResResult } from "src/types/GetEsfrReportRes";

export const eSfrReportSearchColumns = (): GridColDef<GetEsfrReportResResult>[] => [
  {
    field: "ReportType",
    headerName: "Report Type",
    sortable: false,
    minWidth: 100,
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
    field: "ReportedById",
    headerName: "Reported By",
    sortable: false,
    minWidth: 300,
    renderCell: ({ row }) =>
      `${row?.ReportedByFirstName || ""} ${row?.ReportedByLastName || ""}${
        row?.ReportedById ? ` (${row.ReportedById})` : ""
      }`,
    valueGetter: ({ row }) =>
      `${row?.ReportedByFirstName || ""} ${row?.ReportedByLastName || ""}${
        row?.ReportedById ? ` (${row.ReportedById})` : ""
      }`,
  },
  {
    field: "ApprovedById",
    headerName: "Approved By",
    sortable: false,
    minWidth: 300,
    renderCell: ({ row }) =>
      `${row?.ApprovedByFirstName || ""} ${row?.ApprovedByLastName || ""}${
        row?.ApprovedById ? ` (${row.ApprovedById})` : ""
      }`,
    valueGetter: ({ row }) =>
      `${row?.ApprovedByFirstName || ""} ${row?.ApprovedByLastName || ""}${
        row?.ApprovedById ? ` (${row.ApprovedById})` : ""
      }`,
  },
  {
    field: "DateReported",
    headerName: "Date Reported",
    minWidth: 180,
    type: "dateTime",
    sortable: false,
    sortingOrder: ["desc", "asc"],
    valueFormatter: ({ value }) => moment(value).format(DATETIME_DISPLAY),
    renderCell: ({ row }) => moment(row?.DateReported).format(DATETIME_DISPLAY),
  },
  {
    field: "Status",
    headerName: "Report Status",
    sortable: false,
    minWidth: 220,
  },
];
