import { useEffect, useState } from "react";
import { Box, Grid } from "@mui/material";
import { Formik } from "formik";
import moment from "moment";
import ButtonGroup from "src/commons/ButtonGroup";
import ListItem from "src/commons/ListItem";
import { SingleSelect } from "src/commons/Select";
import TextField from "src/commons/TextField";
import { ICpcpReportSearchValues, SdrEsfrRecordDetailsStateType } from "src/commons/types";
import { DATE_HTML_DISPLAY } from "src/helpers";
import { useAppSelector } from "src/redux/hooks";
import ValidationSchema from "src/validationSchema";
import { object } from "yup";
import { OptionDocument } from "src/types/GetSfrMasterDataRes";

export interface ICpcpReportSearchProps {
  handleSearchReport: (a: ICpcpReportSearchValues | null) => void;
  viewSdrFlag: boolean;
}

const CpcpReportSearch = ({ handleSearchReport, viewSdrFlag }: ICpcpReportSearchProps) => {
  const initialValues: ICpcpReportSearchValues = {
    pageIndex: 0,
    pageSize: 10,
    dateFrom: "",
    dateTo: "",
    acNumber: "",
    station: "",
    corrosionLevel: "",
    fleet: ""
  };

  const { masterData }: SdrEsfrRecordDetailsStateType = useAppSelector(
    (state) => state.sdrEsfrRecordDetails
  );

  const [corrosionLevels, setCorrosionLevels] = useState<OptionDocument[]>([]);
  const [fleetCodes, setFleetCodes] = useState<OptionDocument[]>([]);

  useEffect(() => {
    let cLevels = masterData?.CorrosionLevels?.sort(
      (a, b) => a.DisplayOrder - b.DisplayOrder
    );
    if (cLevels?.findIndex((item) => item.Description === "All") === -1) {
      cLevels?.unshift({
        Description: "All",
        DisplayOrder: 0,
        Id: 0,
      });
    }
    setCorrosionLevels(cLevels || []);

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
                            moment(e.target.value).format(DATE_HTML_DISPLAY)
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
                          setFieldValue("dateTo", moment(e.target.value).format(DATE_HTML_DISPLAY));
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
                    name="corrosionLevel"
                    value={values.corrosionLevel}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={!!touched.corrosionLevel && !!errors.corrosionLevel}
                    helperText={!!touched.corrosionLevel && errors.corrosionLevel}
                    options={corrosionLevels}
                    id="CorrosionLevel"
                    className="w-full"
                  />
                </ListItem>
              </Grid>
              <Grid item lg={viewSdrFlag ? 6 : 2} md={viewSdrFlag ? 6 : 3} sm={6}>
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
              <Grid item lg={viewSdrFlag ? 6 : 2} md={viewSdrFlag ? 6 : 4} sm={6}>
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
