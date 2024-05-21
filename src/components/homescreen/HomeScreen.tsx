import { Grid, Tab, Tabs, Typography } from "@mui/material";
import { SyntheticEvent, useEffect, useMemo, useState } from "react";
import ButtonGroup from "src/commons/ButtonGroup";
import CommonLoader from "src/commons/CommonLoader";
import Modal from "src/commons/Modal";
import Snackbar from "src/commons/Snackbar";
import TabPanel, { a11yProps } from "src/commons/TabPanel";
import {
  ICreateSfrReqNoSdr,
  IEditSdrValues,
  ISaveSdrValues,
  IViewSdrResult,
  SdrEsfrRecordDetailsStateType,
  SelectedStatus,
  SelectedTab,
} from "src/commons/types";
import { allEsfrRecordsColumns } from "src/components/commondatagrid/allEsfrRecordsColumns";
import CommonDataGrid from "src/components/commondatagrid/commondatagrid";
import CreateSdrData from "src/components/createsdr/CreateSdrData";
import CreateSfrData from "src/components/createsfr/CreateSfrData";
import ViewSdrData from "src/components/viewsdr/ViewSdrData";
import ViewSnapshotData from "src/components/viewsdr/ViewSnapshotData";
import { filterSdrData, saveTextAsFileAsync } from "src/helpers";
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
  resetEsfrRecordDetailData,
  resetLogpageDataSuccess,
  viewLogPageDetails,
} from "src/redux/ducks/getSdrEsfrRecordDetails";
import { useAppDispatch, useAppSelector } from "src/redux/hooks";
import { CreateSfrReq } from "src/types/CreateSfrReq";
import { LogpageStatus, Type } from "src/types/GetAllEsfrRecordsRes";
import axiosInstance from "src/utils/axiosInstance";
import config from "src/utils/env.config";
import "./homescreen.css";

const HomeScreen = () => {
  const { profileData } = useAppSelector((state) => state.profile);
  const { loading: loadingSdrs, sdrData: newSdrData } = useAppSelector((state) => state.newSdrs);
  const { sdrData: approvedSdrData } = useAppSelector((state) => state.approvedSdrs);
  const { sdrData: flaggedSdrData } = useAppSelector((state) => state.flaggedSdrs);
  const {
    loading: loadingDetailsData,
    detailsData,
    snapshotData,
    masterData,
    error,
  }: SdrEsfrRecordDetailsStateType = useAppSelector((state) => state.sdrEsfrRecordDetails);
  const { fileData } = useAppSelector((state) => state.flatFile);
  const dispatch = useAppDispatch();
  const [tabIndex, setTabIndex] = useState<number>(0);
  const [viewSdrFlag, setViewSdrFlag] = useState<boolean>(false);
  const [createSdrFlag, setCreateSdrFlag] = useState<string>("");
  const [selectedSdr, setSelectedSdr] = useState<IViewSdrResult | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [openSnackbar, setOpenSnackbar] = useState<number>(0);
  const [snackbarMessage, setSnackbarMessage] = useState<string>("");
  const [logpageNumberValue, setLogpageNumberValue] = useState<string>("");
  const [editable, setEditable] = useState<boolean>(false);
  const [openConfirmSaved, setOpenConfirmSaved] = useState<boolean>(false);
  const [filters, setFilters] = useState<LogpageStatus[]>([]);
  const [formTouched, setFormTouched] = useState<boolean>(false);
  const [confirmCloseCreate, setConfirmCloseCreate] = useState<boolean>(false);
  const [selectedTab, setSelectedTab] = useState<number>(0);
  const isSdr = useMemo(() => selectedSdr?.Type === Type.SDR, [selectedSdr]);
  const sdrData = useMemo(() => {
    switch (tabIndex) {
      case SelectedTab.FlaggedForFollowUp:
        return flaggedSdrData;
      case SelectedTab.Approved:
        return approvedSdrData;
      case SelectedTab.Open:
      default:
        return newSdrData && filters.length > 0 ? filterSdrData(newSdrData, filters) : newSdrData;
    }
  }, [approvedSdrData, flaggedSdrData, newSdrData, tabIndex, filters]);

  const resetSdrs = () => {
    setViewSdrFlag(false);
    setSelectedSdr(null);
    dispatch(getAllSdrs());
    if (window) {
      window.scrollTo(0, 0);
    }
  };

  const toggleCreateSDR = (type: string) => {
    if (!createSdrFlag) {
      setSelectedSdr(null);
      setViewSdrFlag(false);
    }
    setLogpageNumberValue("");
    setFormTouched(false);
    setCreateSdrFlag(type);
  };

  const toggleConfirmCloseCreate = () => {
    setConfirmCloseCreate(false);
    setCreateSdrFlag("");
    if (selectedSdr) {
      setViewSdrFlag(true);
    } else {
      setTabIndex(selectedTab);
      handleFilterInit(selectedTab);
      setViewSdrFlag(false);
      setSelectedSdr(null);
    }
  };

  const toggleCancelCloseCreate = () => {
    setConfirmCloseCreate(false);
    setSelectedTab(tabIndex);
  };

  const handleFilterInit = (tab: number = tabIndex) => {
    if (tab === SelectedTab.Open) {
      const stored = window.localStorage.getItem("sdr_filter");
      setFilters(
        stored
          ? JSON.parse(stored)
          : [LogpageStatus.Carry, LogpageStatus.Defer, LogpageStatus.Cleared]
      );
    } else {
      setFilters([]);
    }
  };

  const toggleTabChange = (event: SyntheticEvent, tab: number) => {
    setSelectedTab(tab);
    if (createSdrFlag) {
      if (formTouched) {
        setConfirmCloseCreate && setConfirmCloseCreate(true);
      } else {
        toggleCreateSDR && toggleCreateSDR("");
        setTabIndex(tab);
        handleFilterInit(tab);
        setViewSdrFlag(false);
        setSelectedSdr(null);
      }
    } else {
      setTabIndex(tab);
      handleFilterInit(tab);
      setViewSdrFlag(false);
      setSelectedSdr(null);
    }
  };

  const handleFetchLogpageData = (logpageNumber: string, checkSdr: boolean = false) => {
    setLogpageNumberValue(logpageNumber);
    dispatch(viewLogPageDetails(logpageNumber, checkSdr));
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

  const handleUpsertSfrSnapshot = (
    values: any,
    status: SelectedStatus = SelectedStatus.Approved
  ) => {
    setIsLoading(true);
    axiosInstance
      .post(`${config.apiBaseAddress}${config.URL_UPSERT_SFR_SNAPSHOT}`, values)
      .then((res) => {
        if (res?.data?.Result?.IsSuccess) {
          setOpenSnackbar(1);
          setSnackbarMessage(
            `Approve SFR successful${
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
          setSnackbarMessage(`Fail to Approve SFR`);
        }
      })
      .catch(() => {
        setOpenSnackbar(-1);
        setSnackbarMessage(`Fail to Approve SFR`);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleCreateSFR = (values: CreateSfrReq, sdrRequired: boolean) => {
    let { SdrDetails, ...rest } = values;
    let updated: CreateSfrReq | ICreateSfrReqNoSdr = { ...values };
    if (!sdrRequired) {
      updated = rest;
    }
    setIsLoading(true);
    axiosInstance
      .post(`${config.apiBaseAddress}${config.URL_CREATE_SFR}`, updated)
      .then((res) => {
        if (res?.data?.Result?.IsSuccess) {
          setOpenSnackbar(1);
          setSnackbarMessage("Save SFR successful");
          setCreateSdrFlag("");
          setViewSdrFlag(false);
          setSelectedSdr(null);
          setTimeout(() => {
            resetSdrs();
          }, 500);
        } else {
          setOpenSnackbar(-1);
          setSnackbarMessage("Fail to Save SFR");
        }
      })
      .catch(() => {
        setOpenSnackbar(-1);
        setSnackbarMessage("Fail to Save SFR");
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
            saveTextAsFileAsync(fileData_?.SdrRecords?.join("\n"), fileData_?.FileName);
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

  const toggleConfirmFileSaved = () => {
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
      if (!createSdrFlag) {
        if (selectedSdr.StatusId === SelectedStatus.Approved && selectedSdr.OperatorControlNumber) {
          dispatch(getApprovedSdr(selectedSdr.LogpageNumber, selectedSdr.OperatorControlNumber));
        } else {
          dispatch(getSdrEsfrRecordDetails(selectedSdr));
        }
      }
    } else {
      dispatch(resetEsfrRecordDetailData());
      dispatch(resetLogpageDataSuccess());
    }
  }, [createSdrFlag, selectedSdr]);

  useEffect(() => {
    resetSdrs();
    if (!masterData) {
      dispatch(getSfrMasterData());
    }
    handleFilterInit();
  }, []);

  useEffect(() => {
    if (!viewSdrFlag && !createSdrFlag) {
      setSelectedSdr(null);
    }
  }, [viewSdrFlag, createSdrFlag]);

  return (
    <>
      {(isLoading || loadingSdrs || loadingDetailsData) && <CommonLoader />}
      <Grid container className="grow overflow-auto md:overflow-y-hidden">
        <Grid item md={6} sm={12} className="h-full w-full flex !flex-col !px-[20px]">
          <Tabs
            className="bottom-divider"
            value={tabIndex}
            onChange={toggleTabChange}
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
                columns={allEsfrRecordsColumns(filters, setFilters, tabIndex === SelectedTab.Open)}
                createSdrFlag={createSdrFlag}
                formTouched={formTouched}
                handleExtractSdrRecords={handleExtractSdrRecords}
                sdrData={sdrData}
                selectedSdr={selectedSdr}
                setConfirmCloseCreate={setConfirmCloseCreate}
                setSelectedSdr={setSelectedSdr}
                setViewSdrFlag={setViewSdrFlag}
                tabIndex={tabIndex}
                toggleCreateSDR={toggleCreateSDR}
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
              setFormTouched={setFormTouched}
              setLogpageNumberValue={setLogpageNumberValue}
            />
          ) : createSdrFlag === Type.SFR ? (
            <CreateSfrData
              createSdrFlag={createSdrFlag}
              handleCreateSFR={handleCreateSFR}
              handleFetchLogpageData={handleFetchLogpageData}
              logpageNumberValue={logpageNumberValue}
              setCreateSdrFlag={setCreateSdrFlag}
              setFormTouched={setFormTouched}
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
                handleUpsertSfrSnapshot={handleUpsertSfrSnapshot}
                selectedSdr={selectedSdr}
                setViewSdrFlag={setViewSdrFlag}
                tabIndex={tabIndex}
              />
            )
          ) : null}
          {!viewSdrFlag && !createSdrFlag && (
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
            primaryOnClick={toggleConfirmFileSaved}
            secondaryLabel="Save"
            secondaryOnClick={() => {
              if (fileData) {
                saveTextAsFileAsync(fileData.SdrRecords?.join("\n"), fileData.FileName);
              }
            }}
          />
        </Modal>
      )}
      {confirmCloseCreate && (
        <Modal
          name="confirm-extract"
          onClose={() => setConfirmCloseCreate(false)}
          open={confirmCloseCreate}
        >
          <Typography id="confirm-extract-modal-title" variant="h6" mb={2} fontWeight={600}>
            United Airlines
          </Typography>
          <Typography id="confirm-extract-modal-description" variant="body1" mb={6}>
            You have unsaved changes in SDR. Your changes will be lost. Do you still want to exit?
          </Typography>
          <ButtonGroup
            className="justify-end"
            primaryLabel="Proceed"
            secondaryLabel="Cancel"
            primaryOnClick={toggleConfirmCloseCreate}
            secondaryOnClick={toggleCancelCloseCreate}
          />
        </Modal>
      )}
    </>
  );
};

export default HomeScreen;
