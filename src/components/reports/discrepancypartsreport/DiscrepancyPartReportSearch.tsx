import { Box, Grid } from "@mui/material";
import { Formik } from "formik";
import moment from "moment";
import { useEffect, useState } from "react";
import ButtonGroup from "src/commons/ButtonGroup";
import ListItem from "src/commons/ListItem";
import { SingleSelect } from "src/commons/Select";
import TextField from "src/commons/TextField";
import { IDiscrepancyPartsReportSearchValues, SdrEsfrRecordDetailsStateType } from "src/commons/types";
import { DATE_HTML_DISPLAY } from "src/helpers";
import { useAppSelector } from "src/redux/hooks";
import { OptionDocument } from "src/types/GetSfrMasterDataRes";
import ValidationSchema from "src/validationSchema";
import { object } from "yup";

export interface IDiscrepancyPartsReportSearchProps {
  handleSearchReport: (a: IDiscrepancyPartsReportSearchValues | null) => void;
  viewSdrFlag: boolean;
}

const DiscrepancyPartsReportSearch = ({ handleSearchReport, viewSdrFlag }: IDiscrepancyPartsReportSearchProps) => {
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
    ataCode: ""
  };

  const { masterData }: SdrEsfrRecordDetailsStateType = useAppSelector(
    (state) => state.sdrEsfrRecordDetails
  );

  const [discrepancyTypes, setDiscrepancyTypes] = useState<OptionDocument[]>([]);
  const [discrepancyParts, setDiscrepancyParts] = useState<OptionDocument[]>([]);
  const [fleetCodes, setFleetCodes] = useState<OptionDocument[]>([]);

  useEffect(() => {
    let dTypes = masterData?.DiscrepancyTypes?.sort(
      (a, b) => a.DisplayOrder - b.DisplayOrder
    );
    if (dTypes?.findIndex((item) => item.Description === "All") === -1) {
        dTypes?.unshift({
        Description: "All",
        DisplayOrder: 0,
        Id: 0,
      });
    }
    setDiscrepancyTypes(dTypes || []);

    let dParts = masterData?.DiscrepancyParts?.sort(
        (a, b) => a.DisplayOrder - b.DisplayOrder
      );
      if (dParts?.findIndex((item) => item.Description === "All") === -1) {
        dParts?.unshift({
          Description: "All",
          DisplayOrder: 0,
          Id: 0,
        });
      }
      setDiscrepancyParts(dParts || []);

      let fleets = masterData?.Fleet
      if (fleets?.findIndex((item) => item.Description === "All") === -1) {
        fleets?.unshift({
          Description: "All",
          DisplayOrder: 0,
          Id: 0,
        });
      }
      setFleetCodes(fleets || []);
  }, [masterData]);

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
              <Grid
                item
                lg={viewSdrFlag ? 6 : 2}
                md={viewSdrFlag ? 6 : 3}
                sm={6}
              >
                <ListItem className="mt-3">Fleet</ListItem>
                <ListItem>
                  <SingleSelect
                    name="fleet"
                    value={values.fleet || ""}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={!!touched.fleet && !!errors.fleet}
                    helperText={!!touched.fleet && errors.fleet}
                    options={fleetCodes}
                    id="Fleet"
                    className="w-full"
                  />
                </ListItem>
              </Grid>
              <Grid
                item
                lg={viewSdrFlag ? 6 : 2}
                md={viewSdrFlag ? 6 : 3}
                sm={6}
              >
                <ListItem className="mt-3">Discrepancy Type</ListItem>
                <ListItem>
                  <SingleSelect
                    name="discrepancyTypes"
                    value={values.discrepancyType || ""}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={
                      !!touched.discrepancyType && !!errors.discrepancyType
                    }
                    helperText={
                      !!touched.discrepancyType && errors.discrepancyType
                    }
                    options={discrepancyTypes}
                    id="DiscrepancyType"
                    className="w-full"
                  />
                </ListItem>
              </Grid>
              <Grid
                item
                lg={viewSdrFlag ? 6 : 2}
                md={viewSdrFlag ? 6 : 3}
                sm={6}
              >
                <ListItem className="mt-3">Discrepancy Parts</ListItem>
                <ListItem>
                  <SingleSelect
                    name="discrepancyParts"
                    value={values.discrepancyParts || ""}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={
                      !!touched.discrepancyParts && !!errors.discrepancyParts
                    }
                    helperText={
                      !!touched.discrepancyParts && errors.discrepancyParts
                    }
                    options={discrepancyParts}
                    id="DiscrepancyParts"
                    className="w-full"
                  />
                </ListItem>
              </Grid>
              <Grid
                item
                lg={viewSdrFlag ? 6 : 2}
                md={viewSdrFlag ? 6 : 3}
                sm={6}
              >
                <ListItem className="mt-3">Part Number</ListItem>
                <ListItem>
                  <TextField
                    name="partNumber"
                    value={values.partNumber || ""}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={!!touched.partNumber && !!errors.partNumber}
                    helperText={!!touched.partNumber && errors.partNumber}
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
              <Grid
                item
                lg={viewSdrFlag ? 6 : 2}
                md={viewSdrFlag ? 6 : 4}
                sm={6}
              >
                <ListItem className="mt-3">A/c Number</ListItem>
                <ListItem>
                  <TextField
                    name="acNumber"
                    value={values.acNumber || ""}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={!!touched.acNumber && !!errors.acNumber}
                    helperText={!!touched.acNumber && errors.acNumber}
                    className="w-full"
                  />
                </ListItem>
              </Grid>
              <Grid
                item
                lg={viewSdrFlag ? 6 : 2}
                md={viewSdrFlag ? 6 : 4}
                sm={6}
              >
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
              <Grid
                item
                lg={viewSdrFlag ? 6 : 2}
                md={viewSdrFlag ? 6 : 4}
                sm={6}
              >
                <ListItem className="mt-3">ATA Code</ListItem>
                <ListItem>
                  <TextField
                    name="ataCode"
                    value={values.ataCode || ""}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={!!touched.ataCode && !!errors.ataCode}
                    helperText={!!touched.ataCode && errors.ataCode}
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

export default DiscrepancyPartsReportSearch;
