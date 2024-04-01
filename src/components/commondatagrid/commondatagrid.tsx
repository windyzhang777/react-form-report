import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Button, Link, Typography } from "@mui/material";
import {
  GridCellParams,
  GridColDef,
  GridRowSelectionModel,
  GridValidRowModel,
} from "@mui/x-data-grid";
import moment from "moment";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { FlexRow } from "src/commons/Box";
import ButtonGroup from "src/commons/ButtonGroup";
import DataGrid from "src/commons/DataGrid";
import Menu from "src/commons/Menu";
import Modal from "src/commons/Modal";
import {
  SdrEsfrRecordDetailsStateType,
  SelectedTab,
  TransformedSdrDataType,
  UserPermission,
} from "src/commons/types";
import { useAppSelector } from "src/redux/hooks";
import config from "src/utils/env.config";
import "./commondatagrid.css";

export interface CommonDataGridProps {
  autoPageSize?: boolean;
  createSdrFlag?: string;
  handleExtractSdrRecords?: (a: number[]) => void;
  sdrData: TransformedSdrDataType[];
  selectedSdr: TransformedSdrDataType | null;
  setCreateSdrFlag?: Dispatch<SetStateAction<string>>;
  setSelectedSdr: Dispatch<SetStateAction<TransformedSdrDataType | null>>;
  setViewSdrFlag: Dispatch<SetStateAction<boolean>>;
  tabIndex?: number;
  viewSdrFlag: boolean;
}

const CommonDataGrid = ({
  autoPageSize = true,
  createSdrFlag,
  handleExtractSdrRecords,
  sdrData,
  selectedSdr,
  setCreateSdrFlag,
  setSelectedSdr,
  setViewSdrFlag,
  tabIndex,
  viewSdrFlag,
}: CommonDataGridProps) => {
  const { auth } = useAppSelector((state) => state.profile);
  const { loading } = useAppSelector((state) => state.approvedSdrs);
  const { masterData }: SdrEsfrRecordDetailsStateType = useAppSelector(
    (state) => state.sdrEsfrRecordDetails
  );
  const [showCheckbox, setShowCheckbox] = useState<boolean>(false);
  const [selectedSdrsToExtract, setSelectedSdrsToExtract] = useState<GridRowSelectionModel>([]);
  const [isExtractDisabled, setIsExtractDisabled] = useState<boolean>(true);
  const [confirmExtract, setConfirmExtract] = useState<boolean>(false);

  const handleCreateSDR = (type: string) => {
    // if (!viewSdrFlag) { // TODO: not allow creating sdr while editing sdr
    setCreateSdrFlag && setCreateSdrFlag(type);
    // }
  };

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

  const columnDefs: GridColDef<TransformedSdrDataType>[] = [
    {
      field: "LogpageNumber",
      headerName: "Log Page Number",
      sortable: false,
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
      field: "ReportedBy",
      headerName: "Reported By",
      sortable: false,
      minWidth: 150,
      renderCell: ({ row }) =>
        `${row?.CreatedbyFirstName || ""} ${row?.CreatebyLastName || ""} (${row?.CreatedBy || ""})`,
    },
    {
      field: "CreatedDate",
      headerName: "Date & Time",
      minWidth: 180,
      type: "dateTime",
      sortable: true,
      sortingOrder: ["desc", "asc"],
      valueFormatter: ({ value }) => new Date(value),
      renderCell: ({ row }) => (
        <p className={row.IsOlderThan72Hours ? "paragraph-text" : ""}>
          {moment(row?.CreatedDate).format("MM/DD/YYYY hh:mm:ss")}
        </p>
      ),
    },
    {
      field: "LogpageStatus",
      headerName: "Log Page Status",
      minWidth: 150,
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

  useEffect(() => {
    setShowCheckbox(tabIndex === SelectedTab.Approved);
  }, [tabIndex]);

  const handleConfirmExtract = () => {
    setConfirmExtract(false);
    handleExtractSdrRecords && handleExtractSdrRecords(selectedSdrsToExtract as number[]);
  };

  return (
    <>
      <DataGrid
        autoPageSize={autoPageSize}
        loading={loading}
        disableColumnMenu
        columns={columnDefs as GridColDef<GridValidRowModel>[]}
        rows={sdrData}
        getRowId={(row) => row.Id}
        checkboxSelection={showCheckbox}
        // hideFooter={true}
        rowSelectionModel={selectedSdrsToExtract}
        onRowSelectionModelChange={(sdrIds) => {
          setSelectedSdrsToExtract([...sdrIds]);
          if (sdrIds && sdrIds.length > 0) setIsExtractDisabled(false);
          else setIsExtractDisabled(true);
          if (loading) setSelectedSdrsToExtract([]);
        }}
        getRowClassName={(params) => {
          let rowStyles = "";
          rowStyles += params.id === selectedSdr?.Id ? "Mui-selection " : "";
          rowStyles += params.indexRelativeToCurrentPage % 2 === 0 ? "Mui-even" : "Mui-odd";
          return rowStyles;
        }}
        disableRowSelectionOnClick
        onCellClick={(data: GridCellParams) => {
          // setViewSdrFlag(false);
          if (data.field !== "__check__") {
            if (!createSdrFlag) {
              // TODO: not allow viewing a new sdr while creating a new sdr
              setSelectedSdr(data?.row);
              if (selectedSdr?.Id === data?.row?.Id) {
                setViewSdrFlag(true);
              }
            }
          }
        }}
      />
      {tabIndex === SelectedTab.Approved && auth === UserPermission.CRU && (
        <FlexRow mx={2} my={4} sx={{ justifyContent: "flex-end", gap: "10px" }}>
          <Button
            className="extract-button"
            disabled={isExtractDisabled}
            onClick={() => setConfirmExtract(true)}
            color="secondary"
          >
            Extract
          </Button>
          <Menu
            id="create-sdr/sfr"
            button={
              <Button
                id={"create-sdr/sfr-button"}
                disabled={!masterData}
                endIcon={<div style={{ marginLeft: "1.5rem" }} />}
              >
                Create
              </Button>
            }
            endIcon={
              <ExpandMoreIcon
                className="create-button-icon"
                sx={{
                  position: "absolute",
                  top: 0,
                  right: 0,
                  height: "2.5rem",
                  width: "2.5rem",
                  color: "#fff",
                  fontWeight: 400,
                }}
              />
            }
            shouldCloseMenu
          >
            <div onClick={() => handleCreateSDR("SDR")} style={{ width: "100%" }}>
              SDR
            </div>
            <div onClick={() => handleCreateSDR("SFR")} style={{ width: "100%" }}>
              SFR
            </div>
          </Menu>
        </FlexRow>
      )}
      {confirmExtract && (
        <Modal
          name="confirm-extract"
          onClose={() => setConfirmExtract(false)}
          open={confirmExtract}
        >
          <Typography id="confirm-extract-modal-title" variant="h6" mb={2} fontWeight={600}>
            Extract Confirmation
          </Typography>
          <Typography id="confirm-extract-modal-description" variant="body1" mb={6}>
            Please confirm that you would like to extract the selected reports
          </Typography>
          <ButtonGroup
            className="justify-end"
            primaryLabel="Confirm"
            secondaryLabel="Cancel"
            primaryOnClick={handleConfirmExtract}
            secondaryOnClick={() => setConfirmExtract(false)}
          />
        </Modal>
      )}
    </>
  );
};

export default CommonDataGrid;
