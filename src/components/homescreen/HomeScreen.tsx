import { Box, Grid, Tab, Tabs, Typography } from "@mui/material";
import { SyntheticEvent, useEffect, useMemo, useState } from "react";
import ButtonGroup from "src/commons/ButtonGroup";
import CommonLoader from "src/commons/CommonLoader";
import Modal from "src/commons/Modal";
import Snackbar from "src/commons/Snackbar";
import TabPanel from "src/commons/TabPanel";
import {
  IEditSdrValues,
  ISaveSdrValues,
  SdrEsfrRecordDetailsStateType,
  SelectedStatus,
  SelectedTab,
  TransformedSdrDataType,
} from "src/commons/types";
import CommonDataGrid from "src/components/commondatagrid/commondatagrid";
import ViewSdrData from "src/components/viewsdr/ViewSdrData";
import { isSame, saveTextAsFile } from "src/helpers";
import { getAllSdrs } from "src/redux/ducks/getAllSdrs";
import {
  InsertSnapshotSdrFilename,
  fetchFailure,
  fetchSuccess,
  updateExtractionStatus,
} from "src/redux/ducks/getFlatFile";
import {
  fetchLogpageDataSuccess,
  getApprovedSdr,
  getSdrEsfrRecordDetails,
  getSfrMasterData,
} from "src/redux/ducks/getSdrEsfrRecordDetails";
import { useAppDispatch, useAppSelector } from "src/redux/hooks";
import axiosInstance from "src/utils/axiosInstance";
import config from "src/utils/env.config";
import CreateSdrData from "../createsdr/CreateSdrData";
import ViewSnapshotData from "../viewsdr/ViewSnapshotData";
import "./homescreen.css";

const sxBox = {
  borderBottom: 1,
  borderColor: "divider",
};

function a11yProps(index: number) {
  return {
    id: `esfr-tabs-${index}`,
    "aria-controls": `esfr-tabpanels-${index}`,
    sx: {
      color: "#666666",
      fontWeight: 500,
      fontSize: "16px",
      textTransform: "capitalize",
      minWidth: "20%",
      width: "25%",
      // whiteSpace: "nowrap",
    },
  };
}

const HomeScreen = () => {
  const { profileData } = useAppSelector((state) => state.profile);
  const { sdrData: newSdrData } = useAppSelector((state) => state.newSdrs);
  const { sdrData: approvedSdrData } = useAppSelector((state) => state.approvedSdrs);
  const { sdrData: flaggedSdrData } = useAppSelector((state) => state.flaggedSdrs);
  const { loading, detailsData, snapshotData, masterData, error }: SdrEsfrRecordDetailsStateType =
    useAppSelector((state) => state.sdrEsfrRecordDetails);
  const { fileData } = useAppSelector((state) => state.flatFile);
  const dispatch = useAppDispatch();
  const [tabIndex, setTabIndex] = useState<number>(0);
  const [viewSdrFlag, setViewSdrFlag] = useState<boolean>(false);
  const [createSdrFlag, setCreateSdrFlag] = useState<string>("");
  const [selectedSdr, setSelectedSdr] = useState<TransformedSdrDataType | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [openSnackbar, setOpenSnackbar] = useState<number>(0);
  const [snackbarMessage, setSnackbarMessage] = useState<string>("");
  const [logpageNumberValue, setLogpageNumberValue] = useState<string>("");
  const [editable, setEditable] = useState<boolean>(false);
  const [extractedIds, setExtractedIds] = useState<number[]>([]);
  const [openConfirmSaved, setOpenConfirmSaved] = useState<boolean>(false);
  const isSdr = useMemo(() => selectedSdr?.Type === "SDR", [selectedSdr]);
  const sdrData = useMemo(() => {
    switch (tabIndex) {
      case 1:
        return flaggedSdrData;
      case 2:
        return approvedSdrData;
      case 0:
      default:
        return newSdrData;
    }
  }, [approvedSdrData, flaggedSdrData, newSdrData, tabIndex]);

  const resetSdrs = () => {
    // setTabIndex(0); // TODO: reset to tab 1
    setViewSdrFlag(false);
    setCreateSdrFlag("");
    setOpenSnackbar(0);
    setSelectedSdr(null);
    dispatch(getAllSdrs(SelectedStatus.Open));
    dispatch(getAllSdrs(SelectedStatus.ApprovedwithFollowup));
    dispatch(getAllSdrs(SelectedStatus.Approved));
    if (window) {
      window.scrollTo(0, 0);
    }
  };

  const handleTabChange = (event: SyntheticEvent, tab: number) => {
    setTabIndex(tab);
    setViewSdrFlag(false);
    setSelectedSdr(null);
  };

  const handleFetchLogpageData = (logpageNumber: string) => {
    if (logpageNumberValue !== logpageNumber) {
      setLogpageNumberValue(logpageNumber);
      setIsLoading(true);
      axiosInstance
        .get(`${config.apiBaseAddress}${config.URL_VIEW_LOGPAGE}?logPageNumber=${logpageNumber}`)
        .then((res) => {
          if (res?.status === 200) {
            setOpenSnackbar(1);
            setSnackbarMessage("Get Logpage data successful");
            dispatch(fetchLogpageDataSuccess(res?.data?.Result));
          }
        })
        .catch(() => {
          setOpenSnackbar(-1);
          setSnackbarMessage("Fail to get Logpage data");
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  };

  const handleUpsertSdrSnapshot = (values: IEditSdrValues, followUpFlag: boolean = false) => {
    const actionType = tabIndex === SelectedTab.Approved ? "Approve" : "Update";
    setIsLoading(true);
    axiosInstance
      .post(`${config.apiBaseAddress}${config.URL_UPSERT_SDR_SNAPSHOT}`, values)
      .then((res) => {
        if (res?.data?.Result?.IsSuccess) {
          setOpenSnackbar(1);
          setSnackbarMessage(
            `${actionType} SDR successful${followUpFlag ? " with flagged for follow-up" : ""}`
          );
          setCreateSdrFlag("");
          setViewSdrFlag(false);
          setSelectedSdr(null);
          setTimeout(() => {
            resetSdrs();
          }, 500);
        } else {
          setOpenSnackbar(-1);
          setSnackbarMessage(`Fail to ${actionType} SDR`);
        }
      })
      .catch(() => {
        setOpenSnackbar(-1);
        setSnackbarMessage(`Fail to ${actionType} SDR`);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleSaveSDR = (values: Partial<ISaveSdrValues>) => {
    setIsLoading(true);
    axiosInstance
      .post(`${config.apiBaseAddress}${config.URL_CREATE_SDR}`, values)
      .then((res) => {
        if (res?.data?.Result?.IsSuccess) {
          setOpenSnackbar(1);
          setSnackbarMessage("Save SDR successful");
          setCreateSdrFlag("");
          setViewSdrFlag(false);
          setSelectedSdr(null);
          setTimeout(() => {
            resetSdrs();
          }, 500);
        } else {
          setOpenSnackbar(-1);
          setSnackbarMessage("Fail to Save SDR");
        }
      })
      .catch(() => {
        setOpenSnackbar(-1);
        setSnackbarMessage("Fail to Save SDR");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleExtractSdrRecords = (ids: number[]) => {
    setExtractedIds(ids);
    if (!isSame(ids, extractedIds) || !fileData) {
      setIsLoading(true);
      axiosInstance
        .post(`${config.apiBaseAddress}${config.URL_EXTRACT_SDR_RECORDS}`, ids)
        .then((res) => {
          setIsLoading(false);
          if (res?.data?.Result?.IsSuccess) {
            const fileData_ = res.data.Result;
            if (fileData_ && profileData) {
              dispatch(fetchSuccess(res.data.Result));
              setOpenSnackbar(1);
              setSnackbarMessage("Extract SDR Records successful");
              saveTextAsFile(fileData_?.SdrRecords?.join("\n"), fileData_?.FileName);
              dispatch(updateExtractionStatus(ids));
              dispatch(
                InsertSnapshotSdrFilename({
                  NewFilename: fileData_?.FileName,
                  CreatedBy: profileData?.EmployeeId,
                  CreatedByLastName: profileData?.LastName,
                  CreatedByFirstName: profileData?.FirstName,
                })
              );
              setTimeout(() => {
                setOpenConfirmSaved(true);
              }, 500);
            }
          } else {
            setOpenSnackbar(-1);
            setSnackbarMessage("Fail to Extract SDR Records");
          }
        })
        .catch((error) => {
          setIsLoading(false);
          dispatch(fetchFailure(error));
          setOpenSnackbar(-1);
          setSnackbarMessage("Fail to Extract SDR Records");
        });
    } else {
      if (fileData) {
        saveTextAsFile(fileData.SdrRecords?.join("\n"), fileData.FileName);
        setTimeout(() => {
          setOpenConfirmSaved(true);
        }, 5000);
      }
    }
  };

  const handleConfirmFileSaved = () => {
    setOpenConfirmSaved(false);
    setTimeout(() => {
      resetSdrs();
    }, 500);
  };

  useEffect(() => {
    if (error) {
      setViewSdrFlag(true); // TODO: hide view sdr when fetch detail failed
      setOpenSnackbar(-1);
      setSnackbarMessage(error);
    } else if (detailsData || snapshotData) {
      setViewSdrFlag(true);
    }
  }, [error, detailsData, snapshotData]);

  useEffect(() => {
    setEditable(false);
    if (selectedSdr && selectedSdr.LogpageNumber !== detailsData?.LogPageNumber) {
      if (selectedSdr.StatusId === SelectedStatus.Approved && selectedSdr.OperatorControlNumber) {
        dispatch(getApprovedSdr(selectedSdr.OperatorControlNumber));
      } else {
        dispatch(getSdrEsfrRecordDetails(selectedSdr.LogpageNumber));
      }
    }
  }, [selectedSdr]);

  useEffect(() => {
    setOpenSnackbar(0);
  }, [editable, selectedSdr, tabIndex]);

  useEffect(() => {
    if (!viewSdrFlag) {
      setOpenSnackbar(0);
    }
  }, [viewSdrFlag]);

  useEffect(() => {
    if (!newSdrData && !approvedSdrData && !flaggedSdrData) {
      resetSdrs();
    }
    if (!masterData) {
      dispatch(getSfrMasterData());
    }
  }, []);

  return (
    <>
      {(isLoading || loading) && <CommonLoader />}
      <Grid container className="grow overflow-auto md:overflow-y-hidden">
        <Grid item md={6} sm={12} className="h-full w-full flex !flex-col">
          <Box sx={{ ...sxBox }}>
            <Tabs value={tabIndex} onChange={handleTabChange} aria-label="homeScreenSdrTabs">
              <Tab
                {...a11yProps(0)}
                label={`New SDR/SFRs (${newSdrData?.length || 0})`}
                id="NewsdrTab"
              />
              <Tab
                {...a11yProps(1)}
                label={`Flagged for Follow up (${flaggedSdrData?.length || 0})`}
                id="Flaggedforfollowup"
              />
              <Tab
                {...a11yProps(2)}
                label={`Approved SDRs (${approvedSdrData?.length || 0})`}
                id="Approvedsdr"
              />
            </Tabs>
          </Box>
          <TabPanel value={tabIndex} className="pt-[30px] h-[90%] grow flex flex-col">
            {sdrData && (
              <CommonDataGrid
                createSdrFlag={createSdrFlag}
                handleExtractSdrRecords={handleExtractSdrRecords}
                sdrData={sdrData}
                selectedSdr={selectedSdr}
                setCreateSdrFlag={setCreateSdrFlag}
                setSelectedSdr={setSelectedSdr}
                setViewSdrFlag={setViewSdrFlag}
                tabIndex={tabIndex}
                viewSdrFlag={viewSdrFlag}
              />
            )}
          </TabPanel>
        </Grid>
        <Grid item md={6} sm={12} className="h-full w-full relative">
          {createSdrFlag === "SDR" ? (
            <CreateSdrData
              createSdrFlag={createSdrFlag}
              handleFetchLogpageData={handleFetchLogpageData}
              handleSaveSDR={handleSaveSDR}
              logpageNumberValue={logpageNumberValue}
              setCreateSdrFlag={setCreateSdrFlag}
              setLogpageNumberValue={setLogpageNumberValue}
            />
          ) : viewSdrFlag && selectedSdr?.LogpageNumber ? (
            tabIndex === SelectedTab.Approved ? (
              <ViewSnapshotData
                editable={editable}
                handleUpsertSdrSnapshot={handleUpsertSdrSnapshot}
                isSdr={isSdr}
                selectedSdr={selectedSdr}
                setEditable={setEditable}
                setViewSdrFlag={setViewSdrFlag}
                tabIndex={tabIndex}
              />
            ) : (
              <ViewSdrData
                editable={editable}
                handleUpsertSdrSnapshot={handleUpsertSdrSnapshot}
                isSdr={isSdr}
                selectedSdr={selectedSdr}
                setViewSdrFlag={setViewSdrFlag}
                tabIndex={tabIndex}
              />
            )
          ) : (
            <Grid
              container
              spacing={0}
              direction="column"
              alignItems="center"
              justifyContent="center"
              sx={{ minHeight: "100%" }}
            >
              <p className="sdrDefaultMsg">Please select an SDR to view it.</p>
            </Grid>
          )}
        </Grid>
      </Grid>
      {!!openSnackbar && (
        <Snackbar
          onClose={() => setOpenSnackbar(0)}
          severity={openSnackbar > 0 ? "success" : "error"}
        >
          {snackbarMessage}
        </Snackbar>
      )}
      {openConfirmSaved && (
        <Modal
          name="confirm save"
          open={openConfirmSaved}
          onClose={() => setOpenConfirmSaved(false)}
        >
          <Typography id="confirm-extract-modal-title" variant="h6" mb={2} fontWeight={600}>
            Save Confirmation
          </Typography>
          <Typography id="confirm-extract-modal-description" variant="body1" mb={6}>
            Please confirm that extracted SDR reports have been saved to your local, as
            re-extraction is not available after this point.
          </Typography>
          <ButtonGroup
            className="justify-end"
            primaryLabel="Continue"
            primaryOnClick={handleConfirmFileSaved}
            secondaryLabel="Save"
            secondaryOnClick={() => {
              if (fileData) {
                saveTextAsFile(fileData.SdrRecords?.join("\n"), fileData.FileName);
              }
            }}
          />
        </Modal>
      )}
    </>
  );
};

export default HomeScreen;
