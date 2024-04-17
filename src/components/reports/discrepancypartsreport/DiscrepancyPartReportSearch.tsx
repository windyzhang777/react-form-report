import { Box, Grid } from "@mui/material";
import { Formik } from "formik";
import moment from "moment";
import ButtonGroup from "src/commons/ButtonGroup";
import ListItem from "src/commons/ListItem";
import { SimpleMultipleSelect, SingleSelect } from "src/commons/Select";
import TextField from "src/commons/TextField";
import {
  IDiscrepancyPartsReportSearchValues,
  SdrEsfrRecordDetailsStateType,
} from "src/commons/types";
import { DATE_HTML_DISPLAY, joinCodes } from "src/helpers";
import { useAppSelector } from "src/redux/hooks";
import { GetDiscrepancyPartsReportReq } from "src/types/GetDiscrepancyPartsReportReq";
import ValidationSchema from "src/validationSchema";
import { object } from "yup";

export interface IDiscrepancyPartsReportSearchProps {
  handleSearchReport: (a: GetDiscrepancyPartsReportReq) => void;
  viewSdrFlag: boolean;
}

const DiscrepancyPartsReportSearch = ({
  handleSearchReport,
  viewSdrFlag,
}: IDiscrepancyPartsReportSearchProps) => {
  const initialValues: IDiscrepancyPartsReportSearchValues = {
    pageIndex: 0,
    pageSize: 10,
    fleet: "",
    discrepancyType: "",
    discrepancyParts: "",
    partNumber: "",
    dateFrom: "",
    dateTo: "",
    acNumber: "",
    station: "",
    ataCode: "",
    fleetList: [],
  };

  const { masterData }: SdrEsfrRecordDetailsStateType = useAppSelector(
    (state) => state.sdrEsfrRecordDetails
  );

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
          handleSearchReport(rest as GetDiscrepancyPartsReportReq);
          setTimeout(() => {
            setSubmitting(false);
          }, 500);
        }}
        validationSchema={object().shape({
          ...ValidationSchema,
          acNumber: ValidationSchema.AircraftNumber,
          station: ValidationSchema.Station,
          partNumber: ValidationSchema.PartNumber,
          ataCode: ValidationSchema.AtaCode,
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
              <Grid item lg={viewSdrFlag ? 6 : 2} md={viewSdrFlag ? 6 : 3} sm={6}>
                <ListItem className="mt-3">Discrepancy Type</ListItem>
                <ListItem>
                  <SingleSelect
                    defaultValue="All"
                    name="discrepancyTypes"
                    value={values.discrepancyType}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={!!touched.discrepancyType && !!errors.discrepancyType}
                    helperText={!!touched.discrepancyType && errors.discrepancyType}
                    options={
                      masterData?.DiscrepancyTypes &&
                      [...masterData.DiscrepancyTypes]?.sort(
                        (a, b) => a.DisplayOrder - b.DisplayOrder
                      )
                    }
                    id="DiscrepancyType"
                    className="w-full"
                  />
                </ListItem>
              </Grid>
              <Grid item lg={viewSdrFlag ? 6 : 2} md={viewSdrFlag ? 6 : 3} sm={6}>
                <ListItem className="mt-3">Discrepancy Parts</ListItem>
                <ListItem>
                  <SingleSelect
                    defaultValue="All"
                    name="discrepancyParts"
                    value={values.discrepancyParts}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={!!touched.discrepancyParts && !!errors.discrepancyParts}
                    helperText={!!touched.discrepancyParts && errors.discrepancyParts}
                    options={
                      masterData?.DiscrepancyParts &&
                      [...masterData.DiscrepancyParts]?.sort(
                        (a, b) => a.DisplayOrder - b.DisplayOrder
                      )
                    }
                    id="DiscrepancyParts"
                    className="w-full"
                  />
                </ListItem>
              </Grid>
              <Grid item lg={viewSdrFlag ? 6 : 2} md={viewSdrFlag ? 6 : 3} sm={6}>
                <ListItem className="mt-3">Part Number</ListItem>
                <ListItem>
                  <TextField
                    placeholder="All"
                    name="partNumber"
                    value={values.partNumber}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={!!touched.partNumber && !!errors.partNumber}
                    helperText={!!touched.partNumber && errors.partNumber}
                    multiline
                    maxRows={4}
                    className={"sdr-status-edit textareaAutosize w-full"}
                    inputProps={{ style: { resize: "both" } }}
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
                      placeholder="All"
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
                      placeholder="All"
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
              <Grid item lg={viewSdrFlag ? 6 : 2} md={viewSdrFlag ? 6 : 4} sm={6}>
                <ListItem className="mt-3">A/C Number</ListItem>
                <ListItem>
                  <TextField
                    placeholder="All"
                    name="acNumber"
                    value={values.acNumber}
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
                    placeholder="All"
                    name="station"
                    value={values.station}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={!!touched.station && !!errors.station}
                    helperText={!!touched.station && errors.station}
                    className="w-full"
                    inputProps={{ maxLength: 3 }}
                  />
                </ListItem>
              </Grid>
              <Grid item lg={viewSdrFlag ? 6 : 2} md={viewSdrFlag ? 6 : 4} sm={6}>
                <ListItem className="mt-3">ATA Code</ListItem>
                <ListItem>
                  <TextField
                    placeholder="All"
                    name="ataCode"
                    value={values.ataCode}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={!!touched.ataCode && !!errors.ataCode}
                    helperText={!!touched.ataCode && errors.ataCode}
                    className="w-full"
                    inputProps={{ maxLength: 4 }}
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

export default DiscrepancyPartsReportSearch;
