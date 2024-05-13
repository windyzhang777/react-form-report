import FilterAltIcon from "@mui/icons-material/FilterAlt";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import { Button, Checkbox, FormControlLabel, FormGroup, IconButton, Link } from "@mui/material";
import { GridColDef, GridColumnHeaderTitle } from "@mui/x-data-grid";
import moment from "moment";
import { Dispatch, SetStateAction } from "react";
import { FlexColumn, FlexRow } from "src/commons/Box";
import { ArrowMenu } from "src/commons/Menu";
import { TransformedSdrDataType } from "src/commons/types";
import { DATETIME_DISPLAY, openLogPage } from "src/helpers";
import { LogpageStatus } from "src/types/GetAllEsfrRecordsRes";

export const allEsfrRecordsColumns = (
  filters: LogpageStatus[],
  setFilter: Dispatch<SetStateAction<LogpageStatus[]>>,
  showFilter?: boolean
): GridColDef<TransformedSdrDataType>[] => [
  {
    field: "LogpageNumber",
    headerName: "Log Page Number",
    sortable: true,
    minWidth: 120,
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
    headerName: "A/C Number",
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
    valueFormatter: ({ value }) => moment(value).format(DATETIME_DISPLAY),
    renderCell: ({ row }) => (
      <p className={row.IsOlderThan72Hours ? "paragraph-text" : ""}>
        {moment(row?.CreatedDate).format(DATETIME_DISPLAY)}
      </p>
    ),
  },
  {
    field: "LogpageStatus",
    headerName: "Log Page Status",
    minWidth: 130,
    sortable: false,
    renderHeader: () => (
      <FlexRow>
        <GridColumnHeaderTitle label="Log Page Status" columnWidth={130} />
        {showFilter && (
          <ArrowMenu
            id="filter-logpage-status"
            width="14rem"
            button={
              <IconButton aria-label="header-filter" color="info">
                {filters.length ? (
                  <FilterAltIcon fontSize="small" />
                ) : (
                  <FilterAltOutlinedIcon fontSize="small" />
                )}
              </IconButton>
            }
          >
            <FlexColumn sx={{ margin: "1rem", fontSize: "18px", gap: "10px" }}>
              <FormGroup>
                {Object.values(LogpageStatus).map((status) => (
                  <FormControlLabel
                    key={status}
                    control={
                      <Checkbox
                        checked={filters.includes(status)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setFilter((prev) => {
                              window.localStorage.setItem(
                                "sdr_filter",
                                JSON.stringify([...prev, status])
                              );
                              return [...prev, status];
                            });
                          } else {
                            setFilter((prev) => {
                              const updated = [...prev].filter((u) => u !== status);
                              window.localStorage.setItem("sdr_filter", JSON.stringify(updated));
                              return updated;
                            });
                          }
                        }}
                      />
                    }
                    label={status}
                  />
                ))}
              </FormGroup>
              <Button
                onClick={() => {
                  window.localStorage.setItem("sdr_filter", JSON.stringify([]));
                  setFilter([]);
                }}
              >
                Clear All Filters
              </Button>
            </FlexColumn>
          </ArrowMenu>
        )}
      </FlexRow>
    ),
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
