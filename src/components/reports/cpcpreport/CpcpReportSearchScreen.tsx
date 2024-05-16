import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { Box, Divider, Grid } from "@mui/material";
import { useEffect, useState } from "react";
import { WarningBox } from "src/commons/Box";
import CommonLoader from "src/commons/CommonLoader";
import RouterLink from "src/commons/Link";
import Snackbar from "src/commons/Snackbar";
import { IViewSdrResult, SdrEsfrRecordDetailsStateType } from "src/commons/types";
import CommonDataGrid from "src/components/commondatagrid/commondatagrid";
import { cpcpReportSearchColumns } from "src/components/commondatagrid/cpcpReportSearchColumns";
import CpcpReportSearch from "src/components/reports/cpcpreport/CpcpReportSearch";
import ViewSdrData from "src/components/viewsdr/ViewSdrData";
import { getCpcpReport, resetCpcpReportSuccess } from "src/redux/ducks/getCpcpReport";
import {
  getSdrEsfrRecordDetails,
  getSfrMasterData,
  resetEsfrRecordDetailData,
  resetLogpageDataSuccess,
} from "src/redux/ducks/getSdrEsfrRecordDetails";
import { useAppDispatch, useAppSelector } from "src/redux/hooks";
import { GetCpcpReportReq } from "src/types/GetCpcpReportReq";

export interface ISearchScreenProps {}

const CpcpReportSearchScreen = () => {
  const dispatch = useAppDispatch();
  const {
    loading: loadingDetailsData,
    detailsData,
    masterData,
    logpageData,
    error: detailsDataError,
  }: SdrEsfrRecordDetailsStateType = useAppSelector((state) => state.sdrEsfrRecordDetails);

  const {
    loading: loadingCpcpReport,
    cpcpReport,
    error: cpcpReportError,
  } = useAppSelector((state) => state.cpcpReport);

  const [openSnackbar, setOpenSnackbar] = useState<number>(0);
  const [snackbarMessage, setSnackbarMessage] = useState<string>("");
  const [viewSdrFlag, setViewSdrFlag] = useState<boolean>(false);
  const [selectedSdr, setSelectedSdr] = useState<IViewSdrResult | null>(null);

  const handleSearchReport = (values: GetCpcpReportReq) => {
    if (values) {
      dispatch(getCpcpReport(values));
    }
  };

  useEffect(() => {
    setViewSdrFlag(false);
    setSelectedSdr(null);
    if (!masterData) {
      dispatch(getSfrMasterData());
    }
    return () => {
      dispatch(resetCpcpReportSuccess());
    };
  }, []);

  useEffect(() => {
    if (detailsDataError) {
      setOpenSnackbar(-1);
      setSnackbarMessage(detailsDataError);
    }
    if (cpcpReportError) {
      setOpenSnackbar(-1);
      setSnackbarMessage(cpcpReportError);
    }
  }, [cpcpReport, detailsData, logpageData]);

  useEffect(() => {
    if (selectedSdr) {
      dispatch(getSdrEsfrRecordDetails(selectedSdr));
    } else {
      dispatch(resetEsfrRecordDetailData());
      dispatch(resetLogpageDataSuccess());
    }
  }, [selectedSdr]);

  useEffect(() => {
    if (!viewSdrFlag) {
      setSelectedSdr(null);
    }
  }, [viewSdrFlag]);

  return (
    <>
      {(loadingDetailsData || loadingCpcpReport) && <CommonLoader />}
      <Grid container flex={1}>
        <Grid item md={viewSdrFlag ? 6 : 12} xs={12} className="flex !flex-col">
          {/* TITLE */}
          <Box mr={2} p={4} className="elevate-bottom flex flex-col md:flex-row items-center">
            <RouterLink to="/esfr" className="go-back flex items-center flex-1 mb-4 md:mb-0">
              <ChevronLeftIcon />
              <Box className="font-semibold">Back to SDR Web</Box>
            </RouterLink>
            <Box className="page-title">CPCP Report</Box>
            <Box className="flex-1 md:none" />
          </Box>
          {/* SEARCH */}
          <Box className="elevate-paper" m={2} p={2} flex={1}>
            <CpcpReportSearch handleSearchReport={handleSearchReport} viewSdrFlag={viewSdrFlag} />
            <Divider className="!mt-6 !mb-10" />
            {cpcpReport ? (
              cpcpReport.length > 0 ? (
                <CommonDataGrid
                  columns={cpcpReportSearchColumns()}
                  isReport={true}
                  sdrData={cpcpReport}
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

export default CpcpReportSearchScreen;
