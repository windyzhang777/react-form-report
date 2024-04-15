import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { Box, Divider, Grid } from "@mui/material";
import { useEffect, useState } from "react";
import { WarningBox } from "src/commons/Box";
import CommonLoader from "src/commons/CommonLoader";
import RouterLink from "src/commons/Link";
import Snackbar from "src/commons/Snackbar";
import {
  IViewSdrResult,
  PartsReportStateType,
  SdrEsfrRecordDetailsStateType,
} from "src/commons/types";
import CommonDataGrid from "src/components/commondatagrid/commondatagrid";
import { partsReportSearchColumns } from "src/components/commondatagrid/partsReportSearchColumns";
import DiscrepancyPartsReportSearch from "src/components/reports/discrepancypartsreport/DiscrepancyPartReportSearch";
import ViewSdrData from "src/components/viewsdr/ViewSdrData";
import { getPartsReport, resetPartsReportSuccess } from "src/redux/ducks/getPartsReport";
import {
  getSdrEsfrRecordDetails,
  getSfrMasterData,
  resetEsfrRecordDetailData,
  resetLogpageDataSuccess,
} from "src/redux/ducks/getSdrEsfrRecordDetails";
import { useAppDispatch, useAppSelector } from "src/redux/hooks";
import { Type } from "src/types/GetAllEsfrRecordsRes";
import { GetDiscrepancyPartsReportReq } from "src/types/GetDiscrepancyPartsReportReq";

export interface ISearchScreenProps {}

const DiscrepancyPartsReportSearchScreen = () => {
  const dispatch = useAppDispatch();
  const {
    loading: loadingDetailsData,
    detailsData,
    masterData,
    logpageData,
    error: detailsDataError,
  }: SdrEsfrRecordDetailsStateType = useAppSelector((state) => state.sdrEsfrRecordDetails);

  const {
    loading: loadingPartsReport,
    partsReport,
    error: partsReportError,
  }: PartsReportStateType = useAppSelector((state) => state.partsReport);

  const [openSnackbar, setOpenSnackbar] = useState<number>(0);
  const [snackbarMessage, setSnackbarMessage] = useState<string>("");
  const [viewSdrFlag, setViewSdrFlag] = useState<boolean>(false);
  const [selectedSdr, setSelectedSdr] = useState<IViewSdrResult | null>(null);

  const handleSearchReport = (values: GetDiscrepancyPartsReportReq) => {
    if (values) {
      dispatch(getPartsReport(values));
    }
  };

  useEffect(() => {
    setViewSdrFlag(false);
    setSelectedSdr(null);
    if (!masterData) {
      dispatch(getSfrMasterData());
    }
    return () => {
      dispatch(resetPartsReportSuccess());
    };
  }, []);

  useEffect(() => {
    if (detailsDataError) {
      setOpenSnackbar(-1);
      setSnackbarMessage(detailsDataError);
    }
    if (partsReportError) {
      setOpenSnackbar(-1);
      setSnackbarMessage(partsReportError);
    }
  }, [partsReport, detailsData, logpageData]);

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
      setSelectedSdr(null);
    }
  }, [viewSdrFlag]);

  return (
    <>
      {(loadingDetailsData || loadingPartsReport) && <CommonLoader />}
      <Grid container flex={1}>
        <Grid item md={viewSdrFlag ? 6 : 12} xs={12} className="flex !flex-col">
          {/* TITLE */}
          <Box mr={2} p={4} className="elevate-bottom flex flex-col md:flex-row items-center">
            <RouterLink to="/esfr" className="go-back flex items-center flex-1 mb-4 md:mb-0">
              <ChevronLeftIcon />
              <Box className="font-semibold">Back to SDR Web</Box>
            </RouterLink>
            <Box className="page-title">Discrepancy Parts Report</Box>
            <Box className="flex-1 md:none" />
          </Box>
          {/* SEARCH */}
          <Box className="elevate-paper" m={2} p={2} flex={1}>
            <DiscrepancyPartsReportSearch
              handleSearchReport={handleSearchReport}
              viewSdrFlag={viewSdrFlag}
            />
            <Divider className="!mt-6 !mb-10" />
            {partsReport ? (
              partsReport.length > 0 ? (
                <CommonDataGrid
                  columns={partsReportSearchColumns()}
                  handleExtractSdrRecords={() => {}}
                  isReport={true}
                  sdrData={partsReport}
                  selectedSdr={selectedSdr}
                  setCreateSdrFlag={() => {}}
                  setSelectedSdr={setSelectedSdr}
                  setViewSdrFlag={setViewSdrFlag}
                  viewSdrFlag={viewSdrFlag}
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
              isSdr={selectedSdr.ReportType === Type.SDR}
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

export default DiscrepancyPartsReportSearchScreen;
