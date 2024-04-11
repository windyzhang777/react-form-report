import { Box, Grid } from "@mui/material";
import { Formik } from "formik";
import moment from "moment";
import ButtonGroup from "src/commons/ButtonGroup";
import ListItem from "src/commons/ListItem";
import { SimpleSingleSelect, SingleSelect } from "src/commons/Select";
import TextField from "src/commons/TextField";
import { IReportSearchValues, ReportStatus, ReportType } from "src/commons/types";
import { DATE_HTML_DISPLAY } from "src/helpers";
import ValidationSchema from "src/validationSchema";
import { object } from "yup";

export interface IReportSearchProps {
  handleSearchReport: (a: IReportSearchValues) => void;
  viewSdrFlag: boolean;
}

const ReportSearch = ({ handleSearchReport, viewSdrFlag }: IReportSearchProps) => {
  const initialValues: IReportSearchValues = {
    pageIndex: 0,
    pageSize: 10,
    reportStatus: 0,
    reportType: "",
    dateFrom: "",
    dateTo: "",
    logPageNumber: "",
    auditNumber: "",
    aircraftNumber: "",
    station: "",
    reportBy: "",
    keyword: "",
  };

  return (
    <>
      <Box
        pb={2}
        sx={{
          fontSize: "20px",
          fontWeight: 600,
          borderBottom: "1px solid #999",
        }}
      >
        Search Criteria
      </Box>
      <Formik
        initialValues={initialValues}
        onSubmit={(values, { setSubmitting }) => {
          handleSearchReport(values);
          setTimeout(() => {
            setSubmitting(false);
          }, 500);
        }}
        validationSchema={object().shape({ ...ValidationSchema })}
      >
        {({
          errors,
          handleBlur,
          handleChange,
          handleSubmit,
          isSubmitting,
          resetForm,
          setFieldValue,
          touched,
          values,
        }) => (
          <form onSubmit={handleSubmit}>
            <Grid className={"search-sdr [&>.MuiGrid-item]:grow"} container>
              <Grid item lg={viewSdrFlag ? 6 : 2} md={viewSdrFlag ? 6 : 3} sm={6}>
                <ListItem className="mt-3">Report Status</ListItem>
                <ListItem>
                  <SingleSelect
                    name="reportStatus"
                    value={values.reportStatus}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={!!touched.reportStatus && !!errors.reportStatus}
                    helperText={!!touched.reportStatus && errors.reportStatus}
                    options={ReportStatus.sort((a, b) => a.DisplayOrder - b.DisplayOrder)}
                    id="ReportStatus"
                    className="w-full"
                  />
                </ListItem>
              </Grid>
              <Grid item lg={viewSdrFlag ? 6 : 2} md={viewSdrFlag ? 6 : 3} sm={6}>
                <ListItem className="mt-3">Report Type</ListItem>
                <ListItem>
                  <SimpleSingleSelect
                    name="reportType"
                    value={values.reportType || ""}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={!!touched.reportType && !!errors.reportType}
                    helperText={!!touched.reportType && errors.reportType}
                    options={ReportType.sort((a, b) => a.DisplayOrder - b.DisplayOrder).map(
                      (r) => r.Description
                    )}
                    id="ReportType"
                    className="w-full"
                  />
                </ListItem>
              </Grid>
              <Grid
                item
                lg={viewSdrFlag ? 8 : 4}
                md={viewSdrFlag ? 12 : 6}
                sm={12}
                className="inline-flex flex-wrap"
              >
                <Grid item xs={6} mr={"-1px"}>
                  <ListItem className="mt-3 !pr-0">From</ListItem>
                  <ListItem className="!flex items-center !pr-0">
                    <TextField
                      type="date"
                      inputProps={{ max: moment(values?.dateTo).format(DATE_HTML_DISPLAY) }}
                      name="dateFrom"
                      value={moment(values.dateFrom).format(DATE_HTML_DISPLAY) || ""}
                      onChange={(e) => {
                        if (moment(values.dateFrom).isAfter(values.dateTo)) {
                          setFieldValue(
                            "dateFrom",
                            moment(values.dateTo).format(DATE_HTML_DISPLAY)
                          );
                        } else {
                          setFieldValue(
                            "dateFrom",
                            moment(e.target.value).isValid()
                              ? moment(e.target.value).format(DATE_HTML_DISPLAY)
                              : ""
                          );
                        }
                      }}
                      onBlur={handleBlur}
                      error={!!touched.dateFrom && !!errors.dateFrom}
                      helperText={!!touched.dateFrom && errors.dateFrom}
                      className={`w-full [&>.MuiInputBase-root]:rounded-r-none ${
                        values.dateFrom ? "unset" : "[&>.MuiInputBase-root]:text-black/40"
                      }`}
                    />
                  </ListItem>
                </Grid>
                <Grid item xs={6}>
                  <ListItem className="mt-3">To</ListItem>
                  <ListItem className="!flex items-center">
                    <TextField
                      type="date"
                      inputProps={{ min: moment(values?.dateFrom).format(DATE_HTML_DISPLAY) }}
                      name="dateTo"
                      value={moment(values.dateTo).format(DATE_HTML_DISPLAY) || ""}
                      onChange={(e) => {
                        if (moment(values.dateTo).isBefore(values.dateFrom)) {
                          setFieldValue(
                            "dateTo",
                            moment(values.dateFrom).format(DATE_HTML_DISPLAY)
                          );
                        } else {
                          setFieldValue(
                            "dateTo",
                            moment(e.target.value).isValid()
                              ? moment(e.target.value).format(DATE_HTML_DISPLAY)
                              : ""
                          );
                        }
                      }}
                      onBlur={handleBlur}
                      error={!!touched?.dateTo && !!errors?.dateTo}
                      helperText={!!touched?.dateTo && errors?.dateTo}
                      className={`w-full [&>.MuiInputBase-root]:rounded-l-none ${
                        values.dateTo ? "unset" : "[&>.MuiInputBase-root]:text-black/40"
                      }`}
                    />
                  </ListItem>
                </Grid>
              </Grid>
              <Grid item lg={viewSdrFlag ? 4 : 2} md={viewSdrFlag ? 6 : 4} sm={6}>
                <ListItem className="mt-3 whitespace-nowrap">Log Page Number</ListItem>
                <ListItem>
                  <TextField
                    name="logPageNumber"
                    value={values.logPageNumber || ""}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={!!touched.logPageNumber && !!errors.logPageNumber}
                    helperText={!!touched.logPageNumber && errors.logPageNumber}
                    className="w-full"
                  />
                </ListItem>
              </Grid>
              <Grid item lg={viewSdrFlag ? 6 : 2} md={viewSdrFlag ? 6 : 4} sm={6}>
                <ListItem className="mt-3 whitespace-nowrap">Operator Control Number</ListItem>
                <ListItem>
                  <TextField
                    name="operatorControlNumber"
                    value={values.auditNumber || ""}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={!!touched.auditNumber && !!errors.auditNumber}
                    helperText={!!touched.auditNumber && errors.auditNumber}
                    className="w-full"
                  />
                </ListItem>
              </Grid>
              <Grid item lg={viewSdrFlag ? 6 : 2} md={viewSdrFlag ? 6 : 4} sm={6}>
                <ListItem className="mt-3">AC Number</ListItem>
                <ListItem>
                  <TextField
                    name="aircraftNumber"
                    value={values.aircraftNumber || ""}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={!!touched.aircraftNumber && !!errors.aircraftNumber}
                    helperText={!!touched.aircraftNumber && errors.aircraftNumber}
                    className="w-full"
                  />
                </ListItem>
              </Grid>
              <Grid item lg={viewSdrFlag ? 6 : 2} md={viewSdrFlag ? 6 : 4} sm={6}>
                <ListItem className="mt-3">Station</ListItem>
                <ListItem>
                  <TextField
                    name="station"
                    value={values.station || ""}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={!!touched.station && !!errors.station}
                    helperText={!!touched.station && errors.station}
                    className="w-full"
                  />
                </ListItem>
              </Grid>
              <Grid item md={viewSdrFlag ? 6 : 3} sm={12}>
                <ListItem className="mt-3">Reported By</ListItem>
                <ListItem>
                  <TextField
                    name="reportBy"
                    value={values.reportBy || ""}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={!!touched.reportBy && !!errors.reportBy}
                    helperText={!!touched.reportBy && errors.reportBy}
                    className="w-full"
                  />
                </ListItem>
              </Grid>
              <Grid item md={viewSdrFlag ? 6 : 3} sm={12}>
                <ListItem className="mt-3">Keyword</ListItem>
                <ListItem>
                  <TextField
                    name="keyword"
                    value={values.keyword || ""}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={!!touched.keyword && !!errors.keyword}
                    helperText={!!touched.keyword && errors.keyword}
                    className="w-full"
                  />
                </ListItem>
              </Grid>
              <Grid item xs={12}>
                <ButtonGroup
                  className="mt-6 gap-4 justify-end"
                  primaryDisabled={isSubmitting}
                  primaryLabel={"Search"}
                  primaryOnClick={handleSubmit}
                  secondaryLabel={"Reset"}
                  secondaryOnClick={resetForm}
                />
              </Grid>
            </Grid>
          </form>
        )}
      </Formik>
    </>
  );
};

export default ReportSearch;
