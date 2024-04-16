import { Box, Grid } from "@mui/material";
import { Formik } from "formik";
import moment from "moment";
import ButtonGroup from "src/commons/ButtonGroup";
import ListItem from "src/commons/ListItem";
import { SimpleMultipleSelect, SingleSelect } from "src/commons/Select";
import TextField from "src/commons/TextField";
import { ICpcpReportSearchValues, SdrEsfrRecordDetailsStateType } from "src/commons/types";
import { DATE_HTML_DISPLAY, joinCodes } from "src/helpers";
import { useAppSelector } from "src/redux/hooks";
import { GetCpcpReportReq } from "src/types/GetCpcpReportReq";
import ValidationSchema from "src/validationSchema";
import { object } from "yup";

export interface ICpcpReportSearchProps {
  handleSearchReport: (a: GetCpcpReportReq) => void;
  viewSdrFlag: boolean;
}

const CpcpReportSearch = ({ handleSearchReport, viewSdrFlag }: ICpcpReportSearchProps) => {
  const { masterData }: SdrEsfrRecordDetailsStateType = useAppSelector(
    (state) => state.sdrEsfrRecordDetails
  );

  const initialValues: ICpcpReportSearchValues = {
    pageIndex: 0,
    pageSize: 10,
    dateFrom: "",
    dateTo: "",
    acNumber: "",
    station: "",
    corrosionLevel: "",
    fleet: "",
    fleetList: [],
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
          let { fleetList, fleet, ...rest } = values;
          (rest as any)["fleet"] = joinCodes(fleetList);
          handleSearchReport(rest as GetCpcpReportReq);
          setTimeout(() => {
            setSubmitting(false);
          }, 500);
        }}
        validationSchema={object().shape({
          ...ValidationSchema,
          acNumber: ValidationSchema.AircraftNumber,
          station: ValidationSchema.Station,
        })}
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
                      inputProps={{
                        max: moment(values?.dateTo).format(DATE_HTML_DISPLAY),
                      }}
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
                      inputProps={{
                        min: moment(values?.dateFrom).format(DATE_HTML_DISPLAY),
                      }}
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
              <Grid item lg={viewSdrFlag ? 6 : 2} md={viewSdrFlag ? 6 : 3} sm={6}>
                <ListItem className="mt-3">Corrosion Level</ListItem>
                <ListItem>
                  <SingleSelect
                    defaultValue="All"
                    name="corrosionLevel"
                    value={values.corrosionLevel}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={!!touched.corrosionLevel && !!errors.corrosionLevel}
                    helperText={!!touched.corrosionLevel && errors.corrosionLevel}
                    options={
                      masterData?.CorrosionLevels &&
                      [...masterData.CorrosionLevels]?.sort(
                        (a, b) => a.DisplayOrder - b.DisplayOrder
                      )
                    }
                    id="CorrosionLevel"
                    className="w-full"
                  />
                </ListItem>
              </Grid>
              <Grid item lg={viewSdrFlag ? 6 : 2} md={viewSdrFlag ? 6 : 3} sm={6}>
                <ListItem className="mt-3">Fleet</ListItem>
                <ListItem>
                  <SimpleMultipleSelect
                    name="fleetList"
                    value={values.fleetList || []}
                    onChange={(values) => {
                      setFieldValue("fleetList", values);
                    }}
                    onBlur={handleBlur}
                    error={!!touched.fleetList && !!errors.fleetList}
                    helperText={!!touched.fleetList && errors.fleetList}
                    options={
                      masterData?.Fleet &&
                      [...masterData.Fleet].sort((a, b) => a.DisplayOrder - b.DisplayOrder)
                    }
                    className={"sdr-status-edit"}
                    id="Fleet"
                  />
                </ListItem>
              </Grid>
              <Grid item lg={viewSdrFlag ? 6 : 2} md={viewSdrFlag ? 6 : 4} sm={6}>
                <ListItem className="mt-3">A/C Number</ListItem>
                <ListItem>
                  <TextField
                    name="acNumber"
                    value={values.acNumber || ""}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={!!touched.acNumber && !!errors.acNumber}
                    helperText={!!touched.acNumber && errors.acNumber}
                    className="w-full"
                    inputProps={{ maxLength: 4 }}
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
                    inputProps={{ maxLength: 3 }}
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

export default CpcpReportSearch;
