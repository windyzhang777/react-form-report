import { Grid, Tab, Tabs, Typography } from "@mui/material";
import { SyntheticEvent, useEffect, useMemo, useState } from "react";
import ButtonGroup from "src/commons/ButtonGroup";
import CommonLoader from "src/commons/CommonLoader";
import Modal from "src/commons/Modal";
import Snackbar from "src/commons/Snackbar";
import TabPanel, { a11yProps } from "src/commons/TabPanel";
import {
  IEditSdrValues,
  ISaveSdrValues,
  ISaveSfrValues,
  SdrEsfrRecordDetailsStateType,
  SelectedStatus,
  SelectedTab,
  TransformedSdrDataType,
} from "src/commons/types";
import { allEsfrRecordsColumns } from "src/components/commondatagrid/allEsfrRecordsColumns";
import CommonDataGrid from "src/components/commondatagrid/commondatagrid";
import CreateSdrData from "src/components/createsdr/CreateSdrData";
import CreateSfrData from "src/components/createsfr/CreateSfrData";
import ViewSdrData from "src/components/viewsdr/ViewSdrData";
import ViewSnapshotData from "src/components/viewsdr/ViewSnapshotData";
import { saveTextAsFile } from "src/helpers";
import { getAllSdrs } from "src/redux/ducks/getAllSdrs";
import {
  InsertSnapshotSdrFilename,
  fetchFailure,
  fetchSuccess,
  updateExtractionStatus,
} from "src/redux/ducks/getFlatFile";
import {
  getApprovedSdr,
  getSdrEsfrRecordDetails,
  getSfrMasterData,
  setDetailsLoaderOff,
  viewLogPageDetails,
} from "src/redux/ducks/getSdrEsfrRecordDetails";
import { useAppDispatch, useAppSelector } from "src/redux/hooks";
import { Type } from "src/types/GetAllEsfrRecordsRes";
import axiosInstance from "src/utils/axiosInstance";
import config from "src/utils/env.config";
import "./homescreen.css";

const HomeScreen = () => {
  const { profileData } = useAppSelector((state) => state.profile);
  const { sdrData: newSdrData } = useAppSelector((state) => state.newSdrs);
  const { loading: loadingSdrs, sdrData: approvedSdrData } = useAppSelector(
    (state) => state.approvedSdrs
  );
  const { sdrData: flaggedSdrData } = useAppSelector((state) => state.flaggedSdrs);
  const {
    loading: loadingDetailsData,
    detailsData,
    snapshotData,
    masterData,
    logpageData,
    error,
  }: SdrEsfrRecordDetailsStateType = useAppSelector((state) => state.sdrEsfrRecordDetails);
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
  const [openConfirmSaved, setOpenConfirmSaved] = useState<boolean>(false);
  const isSdr = useMemo(() => selectedSdr?.Type === Type.SDR, [selectedSdr]);
  const sdrData = useMemo(() => {
    switch (tabIndex) {
      case SelectedTab.FlaggedForFollowUp:
        return flaggedSdrData;
      case SelectedTab.Approved:
        return approvedSdrData;
      case SelectedTab.Open:
      default:
        return newSdrData;
    }
  }, [approvedSdrData, flaggedSdrData, newSdrData, tabIndex]);

  const resetSdrs = () => {
    setViewSdrFlag(false);
    setSelectedSdr(null);
    dispatch(getAllSdrs(SelectedStatus.Open));
    dispatch(getAllSdrs(SelectedStatus.ApprovedWithFollowUp));
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
    setLogpageNumberValue(logpageNumber);
    dispatch(viewLogPageDetails(logpageNumber));
  };

  const handleUpsertSdrSnapshot = (
    values: IEditSdrValues | ISaveSdrValues,
    status: SelectedStatus = SelectedStatus.Approved
  ) => {
    const actionType = status === SelectedStatus.Approved ? "Update" : "Approve";
    setIsLoading(true);
    axiosInstance
      .post(`${config.apiBaseAddress}${config.URL_UPSERT_SDR_SNAPSHOT}`, values)
      .then((res) => {
        if (res?.data?.Result?.IsSuccess) {
          setOpenSnackbar(1);
          setSnackbarMessage(
            `${actionType} SDR successful${
              status === SelectedStatus.ApprovedWithFollowUp ? " with flagged for follow-up" : ""
            }`
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

  const handleCreateSFR = (values: ISaveSfrValues) => {
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
  };

  const handleConfirmFileSaved = () => {
    setOpenConfirmSaved(false);
    setTimeout(() => {
      resetSdrs();
    }, 500);
  };

  useEffect(() => {
    if (error) {
      setOpenSnackbar(-1);
      setSnackbarMessage(error);
    } else if (detailsData || snapshotData) {
      setViewSdrFlag(true);
    }
  }, [error, detailsData, snapshotData]);

  useEffect(() => {
    setEditable(false);
    if (selectedSdr) {
      handleFetchLogpageData(selectedSdr.LogpageNumber);
      if (selectedSdr.StatusId === SelectedStatus.Approved && selectedSdr.OperatorControlNumber) {
        dispatch(getApprovedSdr(selectedSdr.OperatorControlNumber));
      } else {
        dispatch(getSdrEsfrRecordDetails(selectedSdr.LogpageNumber));
      }
    }
  }, [selectedSdr]);

  useEffect(() => {
    if (detailsData && logpageData) {
      dispatch(setDetailsLoaderOff());
    }
  }, [detailsData, logpageData]);

  useEffect(() => {
    setSelectedSdr(null);
    setViewSdrFlag(false);
  }, [tabIndex]);

  useEffect(() => {
    if (!newSdrData && !approvedSdrData && !flaggedSdrData) {
      resetSdrs();
    }
    if (!masterData) {
      dispatch(getSfrMasterData());
    }
  }, []);

  useEffect(() => {
    if (!viewSdrFlag) {
      setSelectedSdr(null);
    }
  }, [viewSdrFlag]);

  return (
    <>
      {(isLoading || loadingSdrs || loadingDetailsData) && <CommonLoader />}
      <Grid container className="grow overflow-auto md:overflow-y-hidden">
        <Grid item md={6} sm={12} className="h-full w-full flex !flex-col !px-[20px]">
          <Tabs
            className="bottom-divider"
            value={tabIndex}
            onChange={handleTabChange}
            aria-label="homeScreenSdrTabs"
          >
            <Tab
              {...a11yProps("home", 0)}
              label={`New SDR/SFRs (${(Array.isArray(newSdrData) && newSdrData.length) || 0})`}
              id="NewsdrTab"
            />
            <Tab
              {...a11yProps("home", 1)}
              label={`Flagged for Follow up (${
                (Array.isArray(flaggedSdrData) && flaggedSdrData.length) || 0
              })`}
              id="Flaggedforfollowup"
            />
            <Tab
              {...a11yProps("home", 2)}
              label={`Approved SDRs (${
                (Array.isArray(approvedSdrData) && approvedSdrData.length) || 0
              })`}
              id="Approvedsdr"
            />
          </Tabs>
          <TabPanel value={tabIndex} index={tabIndex}>
            {sdrData && (
              <CommonDataGrid
                columns={allEsfrRecordsColumns()}
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
          {createSdrFlag === Type.SDR ? (
            <CreateSdrData
              createSdrFlag={createSdrFlag}
              handleFetchLogpageData={handleFetchLogpageData}
              handleUpsertSdrSnapshot={handleUpsertSdrSnapshot}
              logpageNumberValue={logpageNumberValue}
              setCreateSdrFlag={setCreateSdrFlag}
              setLogpageNumberValue={setLogpageNumberValue}
            />
          ) : createSdrFlag === Type.SFR ? (
            <CreateSfrData
              createSdrFlag={createSdrFlag}
              handleCreateSFR={handleCreateSFR}
              handleFetchLogpageData={handleFetchLogpageData}
              logpageNumberValue={logpageNumberValue}
              setCreateSdrFlag={setCreateSdrFlag}
              setLogpageNumberValue={setLogpageNumberValue}
            />
          ) : null}
          {viewSdrFlag && selectedSdr?.LogpageNumber ? (
            tabIndex === SelectedTab.Approved ? (
              <ViewSnapshotData
                editable={editable}
                handleUpsertSdrSnapshot={handleUpsertSdrSnapshot}
                isSdr={isSdr}
                selectedSdr={selectedSdr}
                setEditable={setEditable}
                setViewSdrFlag={setViewSdrFlag}
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
