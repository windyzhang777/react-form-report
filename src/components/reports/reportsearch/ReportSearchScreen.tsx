import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { Box, Divider, Grid } from "@mui/material";
import { useEffect, useState } from "react";
import { WarningBox } from "src/commons/Box";
import CommonLoader from "src/commons/CommonLoader";
import RouterLink from "src/commons/Link";
import Snackbar from "src/commons/Snackbar";
import {
  IReportSearchValues,
  IViewSdrResult,
  SdrEsfrRecordDetailsStateType,
} from "src/commons/types";
import CommonDataGrid from "src/components/commondatagrid/commondatagrid";
import { eSfrReportSearchColumns } from "src/components/commondatagrid/esfrReportSearchColumns";
import ReportSearch from "src/components/reports/reportsearch/ReportSearch";
import ViewSdrData from "src/components/viewsdr/ViewSdrData";
import { getEsfrReport, resetEsfrReportSuccess } from "src/redux/ducks/getEsfrReport";
import {
  getSdrEsfrRecordDetails,
  getSfrMasterData,
  resetEsfrRecordDetailData,
  resetLogpageDataSuccess,
} from "src/redux/ducks/getSdrEsfrRecordDetails";
import { useAppDispatch, useAppSelector } from "src/redux/hooks";

export interface ISearchScreenProps {}

const ReportSearchScreen = () => {
  const dispatch = useAppDispatch();
  const {
    loading: loadingDetailsData,
    detailsData,
    logpageData,
    masterData,
    error: detailsDataError,
  }: SdrEsfrRecordDetailsStateType = useAppSelector((state) => state.sdrEsfrRecordDetails);
  const {
    loading: loadingEsfrReport,
    esfrReport,
    error: esfrReportError,
  } = useAppSelector((state) => state.esfrReport);
  const [openSnackbar, setOpenSnackbar] = useState<number>(0);
  const [snackbarMessage, setSnackbarMessage] = useState<string>("");
  const [viewSdrFlag, setViewSdrFlag] = useState<boolean>(false);
  const [selectedSdr, setSelectedSdr] = useState<IViewSdrResult | null>(null);

  const handleSearchReport = (values: IReportSearchValues) => {
    if (values) {
      dispatch(getEsfrReport(values));
    }
  };

  useEffect(() => {
    setViewSdrFlag(false);
    setSelectedSdr(null);
    setOpenSnackbar(0);
    setSnackbarMessage("");
    if (!masterData) {
      dispatch(getSfrMasterData());
    }
    return () => {
      dispatch(resetEsfrReportSuccess());
    };
  }, []);

  useEffect(() => {
    if (detailsDataError) {
      setOpenSnackbar(-1);
      setSnackbarMessage(detailsDataError);
    }
    if (esfrReportError) {
      setOpenSnackbar(-1);
      setSnackbarMessage(esfrReportError);
    }
  }, [esfrReport, detailsData, logpageData]);

  useEffect(() => {
    if (selectedSdr) {
      dispatch(getSdrEsfrRecordDetails(selectedSdr.LogpageNumber));
    } else {
      dispatch(resetEsfrRecordDetailData());
      dispatch(resetLogpageDataSuccess());
    }
  }, [selectedSdr]);

  useEffect(() => {
    if (!viewSdrFlag) {
      setOpenSnackbar(0);
      setSnackbarMessage("");
    }
  }, [selectedSdr, viewSdrFlag]);

  useEffect(() => {
    if (!viewSdrFlag) {
      setSelectedSdr(null);
    }
  }, [viewSdrFlag]);

  return (
    <>
      {(loadingDetailsData || loadingEsfrReport) && <CommonLoader />}
      <Grid container flex={1}>
        <Grid item md={viewSdrFlag ? 6 : 12} xs={12} className="flex !flex-col">
          {/* TITLE */}
          <Box mr={2} p={4} className="elevate-bottom flex flex-col md:flex-row items-center">
            <RouterLink to="/esfr" className="go-back flex items-center flex-1 mb-4 md:mb-0">
              <ChevronLeftIcon />
              <Box className="font-semibold">Back to SDR Web</Box>
            </RouterLink>
            <Box className="page-title">Report Search</Box>
            <Box className="flex-1 md:none" />
          </Box>
          {/* SEARCH */}
          <Box className="elevate-paper" m={2} p={2} flex={1}>
            <ReportSearch handleSearchReport={handleSearchReport} viewSdrFlag={viewSdrFlag} />
            <Divider className="!mt-6 !mb-10" />
            {esfrReport ? (
              esfrReport.length > 0 ? (
                <CommonDataGrid
                  columns={eSfrReportSearchColumns()}
                  isReport={true}
                  sdrData={esfrReport}
                  selectedSdr={selectedSdr}
                  setSelectedSdr={setSelectedSdr}
                  setViewSdrFlag={setViewSdrFlag}
                />
              ) : (
                <WarningBox>No records found for the search criteria</WarningBox>
              )
            ) : (
              <b>Please search for SDRs using the above criteria to view the results</b>
            )}
          </Box>
        </Grid>
        {viewSdrFlag && selectedSdr && (
          <Grid item md={6} xs={12}>
            <ViewSdrData
              editable={false}
              handleUpsertSdrSnapshot={() => {}}
              selectedSdr={selectedSdr}
              setViewSdrFlag={setViewSdrFlag}
              tabIndex={3}
            />
          </Grid>
        )}
      </Grid>
      {!!openSnackbar && (
        <Snackbar
          onClose={() => setOpenSnackbar(0)}
          severity={openSnackbar > 0 ? "success" : "error"}
        >
          {snackbarMessage}
        </Snackbar>
      )}
    </>
  );
};

export default ReportSearchScreen;
