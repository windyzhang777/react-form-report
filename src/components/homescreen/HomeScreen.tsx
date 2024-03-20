import { Box, Grid, Tab, Tabs } from "@mui/material";
import { SyntheticEvent, useEffect, useMemo, useState } from "react";
import CommonLoader from "src/commons/CommonLoader";
import Snackbar from "src/commons/Snackbar";
import TabPanel from "src/commons/TabPanel";
import {
  EsfrRecordDetailStateType,
  ISaveSdrValues,
  SdrStatus,
  TransformedSdrDataType,
} from "src/commons/types";
import CommonDataGrid from "src/components/commondatagrid/commondatagrid";
import ViewSdrData from "src/components/viewsdr/ViewSdrData";
import { getAllSdrs } from "src/redux/ducks/getAllSdrs";
import {
  fetchLogpageDataSuccess,
  getEsfrRecordDetails,
  getSfrMasterData,
} from "src/redux/ducks/getEsfrRecordDetails";
import { useAppDispatch, useAppSelector } from "src/redux/hooks";
import axiosInstance from "src/utils/axiosInstance";
import config from "src/utils/env.config";
import CreateSdrData from "../createsdr/CreateSdrData";
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
  const { sdrData: newSdrData, loading: loadingSdrData } = useAppSelector((state) => state.newSdrs);
  const { sdrData: approvedSdrData } = useAppSelector((state) => state.approvedSdrs);
  const { sdrData: flaggedSdrData } = useAppSelector((state) => state.flaggedSdrs);
  const {
    loading: loadingEsfrRecordDetail,
    esfrRecordDetailData,
    sfrMasterData,
    error,
  }: EsfrRecordDetailStateType = useAppSelector((state) => state.esfrRecordDetail);
  const dispatch = useAppDispatch();
  const [tabIndex, setTabIndex] = useState<number>(0);
  const [viewSdrFlag, setViewSdrFlag] = useState<boolean>(false);
  const [createSdrFlag, setCreateSdrFlag] = useState<string>("");
  const [selectedSdr, setSelectedSdr] = useState<TransformedSdrDataType | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [openSnackbar, setOpenSnackbar] = useState<number>(0);
  const [snackbarMessage, setSnackbarMessage] = useState<string>("");
  const [logpageNumberValue, setLogpageNumberValue] = useState<string>("");
  const [editable, setEditable] = useState(false);
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
    if (!newSdrData && !approvedSdrData && !flaggedSdrData && !loadingSdrData) {
      dispatch(getAllSdrs(SdrStatus.New));
      dispatch(getAllSdrs(SdrStatus.Flagged));
      dispatch(getAllSdrs(SdrStatus.Approved));
    }
    if (!sfrMasterData) {
      dispatch(getSfrMasterData());
    }
    if (window) {
      window.scrollTo(0, 0);
    }
  };

  const handleTabChange = (event: SyntheticEvent, tab: number) => {
    setTabIndex(tab);
    setViewSdrFlag(false);
    setSelectedSdr(null);
  };

  const handleApprove = (flag: boolean) => {
    setIsLoading(true);
    axiosInstance
      .post(`${config.apiBaseAddress}${config.URL_ESFR_APPROVE}`, {
        id: selectedSdr?.Id,
        recordType: selectedSdr?.Type,
        statusId: flag ? SdrStatus.Flagged : SdrStatus.Approved,
      })
      .then((res) => {
        setIsLoading(false);
        if (res && res.status === 200) {
          setOpenSnackbar(1);
          flag
            ? setSnackbarMessage("SDR approved with flagged for follow-up")
            : setSnackbarMessage("SDR approved");
          setViewSdrFlag(false);
          setSelectedSdr(null);
          setTimeout(() => {
            resetSdrs();
          }, 500);
        } else {
          setOpenSnackbar(-1);
          setSnackbarMessage("Fail to Approve");
        }
      })
      .catch(() => {
        setIsLoading(false);
        setOpenSnackbar(-1);
        setSnackbarMessage("Fail to Approve");
      });
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

  useEffect(() => {
    if (error) {
      setViewSdrFlag(true); // TODO: hide view sdr when fetch detail failed
      setOpenSnackbar(-1);
      setSnackbarMessage(error);
    } else if (esfrRecordDetailData) {
      setViewSdrFlag(true);
    }
  }, [error, esfrRecordDetailData]);

  useEffect(() => {
    setEditable(false);
    if (selectedSdr?.LogpageNumber) {
      dispatch(getEsfrRecordDetails(selectedSdr.LogpageNumber));
    }
  }, [selectedSdr]);

  useEffect(() => {
    setOpenSnackbar(0);
  }, [editable, selectedSdr, tabIndex]);

  useEffect(() => {
    resetSdrs();
  }, []);

  return (
    <Grid container>
      {!!openSnackbar && (
        <Snackbar
          onClose={() => setOpenSnackbar(0)}
          severity={openSnackbar > 0 ? "success" : "error"}
        >
          {snackbarMessage}
        </Snackbar>
      )}
      {(isLoading || loadingSdrData || loadingEsfrRecordDetail) && <CommonLoader />}
      <>
        <Grid item lg={6} md={12}>
          <Box sx={{ ...sxBox }}>
            <Tabs value={tabIndex} onChange={handleTabChange} aria-label="homeScreenSdrTabs">
              <Tab
                {...a11yProps(0)}
                label={`New SDR/SFRs (${newSdrData?.length || 0})`}
                id="NewsdrTab"
              />
              <Tab
                {...a11yProps(1)}
                label={`Flagged for Follow up (${approvedSdrData?.length || 0})`}
                id="Flaggedforfollowup"
              />
              <Tab
                {...a11yProps(2)}
                label={`Approved SDRs (${flaggedSdrData?.length || 0})`}
                id="Approvedsdr"
              />
            </Tabs>
          </Box>
          <TabPanel value={tabIndex}>
            {sdrData && (
              <CommonDataGrid
                createSdrFlag={createSdrFlag}
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
        <Grid item lg={6} md={12}>
          {createSdrFlag === "SDR" ? (
            <CreateSdrData
              createSdrFlag={createSdrFlag}
              editable={editable}
              handleFetchLogpageData={handleFetchLogpageData}
              handleSaveSDR={handleSaveSDR}
              logpageNumberValue={logpageNumberValue}
              setCreateSdrFlag={setCreateSdrFlag}
              setEditable={setEditable}
              setLogpageNumberValue={setLogpageNumberValue}
            />
          ) : viewSdrFlag && selectedSdr?.LogpageNumber ? (
            <ViewSdrData
              editable={editable}
              handleApprove={handleApprove}
              handleSaveSDR={handleSaveSDR}
              isSdr={isSdr}
              selectedSdr={selectedSdr}
              setEditable={setEditable}
              tabIndex={tabIndex}
            />
          ) : (
            <Grid
              container
              spacing={0}
              direction="column"
              alignItems="center"
              justifyContent="center"
              sx={{ minHeight: "85vh" }}
            >
              <p className="sdrDefaultMsg">Please select an SDR to view it.</p>
            </Grid>
          )}
        </Grid>
      </>
    </Grid>
  );
};

export default HomeScreen;
