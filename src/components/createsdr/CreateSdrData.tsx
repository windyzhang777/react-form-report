import { Box, Button, Grid } from "@mui/material";
import { Formik } from "formik";
import moment from "moment";
import { Dispatch, SetStateAction, useEffect, useMemo, useRef } from "react";
import { FlexColumn } from "src/commons/Box";
import ButtonGroup from "src/commons/ButtonGroup";
import ListItem from "src/commons/ListItem";
import { MultipleSelect, SingleSelect } from "src/commons/Select";
import TextField from "src/commons/TextField";
import { ISaveSdrValues, SdrEsfrRecordDetailsStateType, SelectedStatus } from "src/commons/types";
import {
  DATETIME_REQUEST,
  DATE_HTML_DISPLAY,
  handleFocus,
  handleScroll,
  toFixed,
} from "src/helpers";
import { resetLogpageDataSuccess } from "src/redux/ducks/getSdrEsfrRecordDetails";
import { useAppDispatch, useAppSelector } from "src/redux/hooks";
import { Type } from "src/types/GetAllEsfrRecordsRes";
import ValidationSchema from "src/validationSchema";
import { object, string } from "yup";
import "./createSdrData.css";

export interface ICreateSdrDataProps {
  createSdrFlag: string;
  handleFetchLogpageData: (a: string) => void;
  handleUpsertSdrSnapshot: (a: ISaveSdrValues) => void;
  logpageNumberValue: string;
  setCreateSdrFlag: Dispatch<SetStateAction<string>>;
  setLogpageNumberValue: Dispatch<SetStateAction<string>>;
}

const CreateSdrData = ({
  createSdrFlag,
  handleFetchLogpageData,
  handleUpsertSdrSnapshot,
  logpageNumberValue,
  setCreateSdrFlag,
  setLogpageNumberValue,
}: ICreateSdrDataProps) => {
  const editable = true;
  const dispatch = useAppDispatch();
  const logPageNumberRef = useRef<HTMLInputElement>(null);
  const { profileData } = useAppSelector((state) => state.profile);
  const { detailsData, logpageData, masterData }: SdrEsfrRecordDetailsStateType = useAppSelector(
    (state) => state.sdrEsfrRecordDetails
  );

  const initialValues: ISaveSdrValues = useMemo(
    () => ({
      SdrId: 0,
      SnapshotId: "",
      Type: "",
      SfrAdditionalDetails: null,
      OperatorControlNumber: "",
      CreatedDate: moment().format(DATETIME_REQUEST),
      IsExtracted: false,
      LogPageCreationDate:
        moment(logpageData?.FleetInfo?.Date).format(DATETIME_REQUEST) ||
        moment().format(DATETIME_REQUEST),
      Station: logpageData?.FleetInfo?.Station || "",
      AircraftNumber: logpageData?.FleetInfo?.TailNumber || "",
      LogPageNumber: logpageNumberValue || "",
      PrecautionaryProcedureIds: [],
      NatureOfReportIds: [],
      StageId: 0,
      StatusId: SelectedStatus.Approved,
      HowDiscoveredId: 0,
      EmployeeId: `${profileData?.EmployeeId}`,
      EmployeeName: `${profileData?.FirstName} ${profileData?.LastName}`,
      PartDetails: {
        PartTrackingNumber: "",
        PartManufacturerSerialNumber: "",
        PartSerialNumber: "",
        PartLocation: "",
        PartCondition: "",
        PartDescription: "",
      },
      CreatedbyFirstName: `${profileData?.FirstName || ""}`,
      CreatedbyLastName: `${profileData?.LastName || ""}`,
      ModifiedbyFirstName: "",
      ModifiedbyLastName: "",
      AircraftDetails: {
        RegistryNNumber: logpageData?.FleetInfo?.LicenseNumber || "",
        Manufacturer: logpageData?.FleetInfo?.ManufacturedBy || "",
        Model: logpageData?.FleetInfo?.ManufacturerPartNumber || "",
        SerialNumber: logpageData?.FleetInfo?.ManufacturerSerialNumber || "",
        TotalTime: String(toFixed(logpageData?.FleetInfo?.TotalAircraftTime) || ""),
        TotalCycles: String(toFixed(logpageData?.FleetInfo?.TotalAircraftCycles) || ""),
      },
      Powerplant: {
        Manufacturer: "",
        Model: "",
        SerialNumber: "",
        TotalTime: "",
        TotalCycles: "",
      },
      AtaCode: logpageData?.FleetInfo?.ATACode || "",
      FlightNumber: "",
      CorrectiveAction: "",
    }),
    [detailsData, logpageData, profileData]
  );

  const onClickCancle = () => {
    setCreateSdrFlag("");
  };

  useEffect(() => {
    return () => {
      setLogpageNumberValue("");
      dispatch(resetLogpageDataSuccess());
    };
  }, []);

  useEffect(() => {
    handleScroll(logPageNumberRef);
    handleFocus(logPageNumberRef);
  }, [logPageNumberRef]);

  return (
    <FlexColumn className={"create-sdr h-full relative"}>
      <Box className={"subpage-title bottom-divider"} sx={{ pt: "1px", mb: 2 }}>
        <p>Create SDR</p>
      </Box>
      <Formik
        initialValues={initialValues}
        enableReinitialize
        onSubmit={(values, { resetForm }) => {
          handleUpsertSdrSnapshot(values);
          resetForm();
        }}
        validationSchema={object().shape({
          ...ValidationSchema,
          LogPageNumber: ValidationSchema.LogPageNumber.required(),
          AircraftNumber: string(),
        })}
      >
        {({
          errors,
          handleBlur,
          handleChange,
          handleSubmit,
          isSubmitting,
          setFieldValue,
          touched,
          values,
        }) => (
          <form onSubmit={handleSubmit} className="overflow-hidden mb-[4rem]">
            <div id="create-sdr-details" className="h-full overflow-y-auto">
            {/* Major Equipment Identity */}
            <Box
              className={"sdr-status-grid"}
              sx={{
                borderLeft: 1,
                borderRight: 1,
                borderBottom: 1,
                borderColor: "#E6E6E6",
              }}
            >
              <Box className={"sdr-status-title"}>Major Equipment Identity</Box>
              <Grid className={"sdr-status-item"} container spacing={3}>
                <Grid item xs={4}>
                  <ListItem required>Log Page Number</ListItem>
                </Grid>
              </Grid>
              <Grid className={"sdr-status-description flex items-center"} container spacing={3}>
                <Grid item xs={4}>
                  <ListItem>
                    {editable ? (
                      <TextField
                        name="LogPageNumber"
                        value={values.LogPageNumber || ""}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={!!touched.LogPageNumber && !!errors.LogPageNumber}
                        helperText={!!touched.LogPageNumber && errors.LogPageNumber}
                        className={"sdr-status-edit"}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            handleFetchLogpageData(values.LogPageNumber);
                          }
                        }}
                        inputProps={{ ref: logPageNumberRef }}
                        placeholder="Enter a Logpage Number"
                      />
                    ) : (
                      ""
                    )}
                  </ListItem>
                </Grid>
                <Grid item xs={8}>
                  <Button
                    disabled={!values.LogPageNumber}
                    onClick={() => handleFetchLogpageData(values.LogPageNumber)}
                    sx={{ paddingLeft: "20px", paddingRight: "20px" }}
                  >
                    Fetch Logpage Data
                  </Button>
                </Grid>
              </Grid>
              <Grid className={"sdr-status-section-title"} container spacing={3}>
                <Grid item xs={12}>
                  <ListItem>Aircraft</ListItem>
                </Grid>
              </Grid>
              <Grid className={"sdr-status-item"} container spacing={3}>
                <Grid item xs={4}>
                  <ListItem>Manufacturer</ListItem>
                </Grid>
                <Grid item xs={4}>
                  <ListItem>Model/Series</ListItem>
                </Grid>
                <Grid item xs={4}>
                  <ListItem>Serial Number</ListItem>
                </Grid>
              </Grid>
              <Grid className={"sdr-status-description"} container spacing={3}>
                <Grid item xs={4}>
                  <ListItem>
                    {editable ? (
                      <TextField
                        name="AircraftDetails.Manufacturer"
                        disabled={true}
                        value={values.AircraftDetails?.Manufacturer || ""}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={"sdr-status-edit"}
                      />
                    ) : (
                      ""
                    )}
                  </ListItem>
                </Grid>
                <Grid item xs={4}>
                  <ListItem>
                    {editable ? (
                      <TextField
                        name="AircraftDetails.Model"
                        disabled={true}
                        value={values.AircraftDetails?.Model || ""}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={"sdr-status-edit"}
                      />
                    ) : (
                      ""
                    )}
                  </ListItem>
                </Grid>
                <Grid item xs={4}>
                  <ListItem>
                    {editable ? (
                      <TextField
                        name="AircraftDetails.SerialNumber"
                        disabled={true}
                        value={values.AircraftDetails?.SerialNumber || ""}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={"sdr-status-edit"}
                      />
                    ) : (
                      ""
                    )}
                  </ListItem>
                </Grid>
              </Grid>
              <Grid className={"sdr-status-item"} container spacing={3}>
                <Grid item xs={4}>
                  <ListItem>Total Time</ListItem>
                </Grid>
                <Grid item xs={4}>
                  <ListItem>Total Cycles</ListItem>
                </Grid>
              </Grid>
              <Grid className={"sdr-status-description"} container spacing={3}>
                <Grid item xs={4}>
                  <ListItem>
                    {editable ? (
                      <TextField
                        name="AircraftDetails.TotalTime"
                        disabled={true}
                        value={values.AircraftDetails?.TotalTime || ""}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={"sdr-status-edit"}
                      />
                    ) : (
                      ""
                    )}
                  </ListItem>
                </Grid>
                <Grid item xs={4}>
                  <ListItem>
                    {editable ? (
                      <TextField
                        name="AircraftDetails.TotalCycles"
                        disabled={true}
                        value={values.AircraftDetails?.TotalCycles || ""}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={"sdr-status-edit"}
                      />
                    ) : (
                      ""
                    )}
                  </ListItem>
                </Grid>
              </Grid>
              <Grid className={"sdr-status-section-title"} container spacing={3}>
                <Grid item xs={12}>
                  <ListItem>Powerplant</ListItem>
                </Grid>
              </Grid>
              <Grid className={"sdr-status-item"} container spacing={3}>
                <Grid item xs={4}>
                  <ListItem>Manufacturer</ListItem>
                </Grid>
                <Grid item xs={4}>
                  <ListItem>Model/Series</ListItem>
                </Grid>
                <Grid item xs={4}>
                  <ListItem>Serial Number</ListItem>
                </Grid>
              </Grid>
              <Grid className={"sdr-status-description"} container spacing={3}>
                <Grid item xs={4}>
                  <ListItem>
                    {editable ? (
                      <TextField
                        name="Powerplant.Manufacturer"
                        disabled={true}
                        value={values.Powerplant?.Manufacturer || ""}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={"sdr-status-edit"}
                      />
                    ) : (
                      ""
                    )}
                  </ListItem>
                </Grid>
                <Grid item xs={4}>
                  <ListItem>
                    {editable ? (
                      <TextField
                        name="Powerplant.Model"
                        disabled={true}
                        value={values.Powerplant?.Model || ""}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={"sdr-status-edit"}
                      />
                    ) : (
                      ""
                    )}
                  </ListItem>
                </Grid>
                <Grid item xs={4}>
                  <ListItem>
                    {editable ? (
                      <TextField
                        name="Powerplant.SerialNumber"
                        disabled={true}
                        value={values.Powerplant?.SerialNumber || ""}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={"sdr-status-edit"}
                      />
                    ) : (
                      ""
                    )}
                  </ListItem>
                </Grid>
              </Grid>
              <Grid className={"sdr-status-item"} container spacing={3}>
                <Grid item xs={4}>
                  <ListItem>Total Time</ListItem>
                </Grid>
                <Grid item xs={4}>
                  <ListItem>Total Cycles</ListItem>
                </Grid>
              </Grid>
              <Grid className={"sdr-status-description"} container spacing={3}>
                <Grid item xs={4}>
                  <ListItem>
                    {editable ? (
                      <TextField
                        name="Powerplant.TotalTime"
                        disabled={true}
                        value={values.Powerplant?.TotalTime || ""}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={"sdr-status-edit"}
                      />
                    ) : (
                      ""
                    )}
                  </ListItem>
                </Grid>
                <Grid item xs={4}>
                  <ListItem>
                    {editable ? (
                      <TextField
                        name="Powerplant.TotalCycles"
                        disabled={true}
                        value={values.Powerplant?.TotalCycles || ""}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={"sdr-status-edit"}
                      />
                    ) : (
                      ""
                    )}
                  </ListItem>
                </Grid>
              </Grid>
            </Box>

            {/* Problem Description */}
            <Box
              className={"sdr-status-grid"}
              sx={{
                borderLeft: 1,
                borderRight: 1,
                borderBottom: 1,
                borderColor: "#E6E6E6",
              }}
            >
              <Box className={"sdr-status-title"}>Problem Description</Box>
              <Grid className={"sdr-status-item"} container spacing={3}>
                <Grid item xs={4}>
                  <ListItem>Date</ListItem>
                </Grid>
                <Grid item xs={4}>
                  <ListItem>Station</ListItem>
                </Grid>
                <Grid item xs={4}>
                  <ListItem>A/C Number</ListItem>
                </Grid>
              </Grid>
              <Grid className={"sdr-status-description"} container spacing={3}>
                <Grid item xs={4}>
                  <ListItem>
                    {editable ? (
                      <TextField
                        type="date"
                        name="LogPageCreationDate"
                        value={moment(values.LogPageCreationDate).format(DATE_HTML_DISPLAY)}
                        onChange={(e) => {
                          setFieldValue(
                            "LogPageCreationDate",
                            moment(e.target.value).format(DATE_HTML_DISPLAY)
                          );
                        }}
                        onBlur={handleBlur}
                        error={!!touched.LogPageCreationDate && !!errors.LogPageCreationDate}
                        helperText={!!touched.LogPageCreationDate && errors.LogPageCreationDate}
                        className={"sdr-status-edit"}
                      />
                    ) : (
                      ""
                    )}
                  </ListItem>
                </Grid>
                <Grid item xs={4}>
                  <ListItem>
                    {editable ? (
                      <TextField
                        name="Station"
                        value={values.Station || ""}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={!!touched.Station && !!errors.Station}
                        helperText={!!touched.Station && errors.Station}
                        className={"sdr-status-edit"}
                      />
                    ) : (
                      ""
                    )}
                  </ListItem>
                </Grid>
                <Grid item xs={4}>
                  <ListItem>
                    {editable ? (
                      <TextField
                        name="AircraftNumber"
                        value={values.AircraftNumber || ""}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={!!touched.AircraftNumber && !!errors.AircraftNumber}
                        helperText={!!touched.AircraftNumber && errors.AircraftNumber}
                        className={"sdr-status-edit"}
                      />
                    ) : (
                      ""
                    )}
                  </ListItem>
                </Grid>
              </Grid>
              <Grid className={"sdr-status-item"} container spacing={3}>
                <Grid item xs={4}>
                  <ListItem>N-Number</ListItem>
                </Grid>
                <Grid item xs={4}>
                  <ListItem>ATA Code</ListItem>
                </Grid>
                <Grid item xs={4}>
                  <ListItem>Flight Number</ListItem>
                </Grid>
              </Grid>
              <Grid className={"sdr-status-description"} container spacing={3}>
                <Grid item xs={4}>
                  <ListItem>
                    {editable ? (
                      <TextField
                        name="AircraftDetails.RegistryNNumber"
                        value={values?.AircraftDetails?.RegistryNNumber || ""}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={
                          !!touched?.AircraftDetails?.RegistryNNumber &&
                          !!errors?.AircraftDetails?.RegistryNNumber
                        }
                        helperText={
                          !!touched?.AircraftDetails?.RegistryNNumber &&
                          errors?.AircraftDetails?.RegistryNNumber
                        }
                        className={"sdr-status-edit"}
                      />
                    ) : (
                      ""
                    )}
                  </ListItem>
                </Grid>
                <Grid item xs={4}>
                  <ListItem>
                    {editable ? (
                      <TextField
                        name="AtaCode"
                        value={values.AtaCode || ""}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={!!touched.AtaCode && !!errors.AtaCode}
                        helperText={!!touched.AtaCode && errors.AtaCode}
                        className={"sdr-status-edit"}
                      />
                    ) : (
                      ""
                    )}
                  </ListItem>
                </Grid>
                <Grid item xs={4}>
                  <ListItem>
                    {editable ? (
                      <TextField
                        name="FlightNumber"
                        value={values.FlightNumber || ""}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={!!touched.FlightNumber && !!errors.FlightNumber}
                        helperText={!!touched.FlightNumber && errors.FlightNumber}
                        className={"sdr-status-edit"}
                      />
                    ) : (
                      ""
                    )}
                  </ListItem>
                </Grid>
              </Grid>
              <Grid className={"sdr-status-item"} container spacing={3}>
                <Grid item xs={4}>
                  <ListItem required>Precautionary Procedures</ListItem>
                </Grid>
                <Grid item xs={4}>
                  <ListItem required>Nature of Report</ListItem>
                </Grid>
                <Grid item xs={4}>
                  <ListItem required>Stage at which discovered</ListItem>
                </Grid>
              </Grid>
              <Grid className={"sdr-status-description"} container spacing={3}>
                <Grid item xs={4}>
                  <ListItem>
                    {editable ? (
                      <MultipleSelect
                        name="PrecautionaryProcedureIds"
                        value={values.PrecautionaryProcedureIds || []}
                        onChange={(values) => {
                          setFieldValue("PrecautionaryProcedureIds", values);
                        }}
                        onBlur={handleBlur}
                        error={
                          !!touched.PrecautionaryProcedureIds &&
                          !!errors.PrecautionaryProcedureIds
                        }
                        helperText={
                          !!touched.PrecautionaryProcedureIds && errors.PrecautionaryProcedureIds
                        }
                        options={masterData?.PrecautionaryProcedures?.sort(
                          (a, b) => a.DisplayOrder - b.DisplayOrder
                        )}
                        className={"sdr-status-edit"}
                        id="PrecautionaryProcedures"
                        maxAllowed={4}
                      />
                    ) : (
                      ""
                    )}
                  </ListItem>
                </Grid>
                <Grid item xs={4}>
                  <ListItem>
                    {editable ? (
                      <MultipleSelect
                        name="NatureOfReportIds"
                        value={values.NatureOfReportIds || []}
                        onChange={(values) => {
                          setFieldValue("NatureOfReportIds", values);
                        }}
                        onBlur={handleBlur}
                        error={!!touched.NatureOfReportIds && !!errors.NatureOfReportIds}
                        helperText={!!touched.NatureOfReportIds && errors.NatureOfReportIds}
                        options={masterData?.NatureofReports?.sort(
                          (a, b) => a.DisplayOrder - b.DisplayOrder
                        )}
                        className={"sdr-status-edit"}
                        id="NatureofReports"
                        maxAllowed={3}
                      />
                    ) : (
                      ""
                    )}
                  </ListItem>
                </Grid>
                <Grid item xs={4}>
                  <ListItem>
                    {editable ? (
                      <SingleSelect
                        name="StageId"
                        value={values.StageId || ""}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={!!touched.StageId && !!errors.StageId}
                        helperText={!!touched.StageId && errors.StageId}
                        options={masterData?.Stage?.sort(
                          (a, b) => a.DisplayOrder - b.DisplayOrder
                        )}
                        className={"sdr-status-edit"}
                        id="StageId"
                      />
                    ) : (
                      ""
                    )}
                  </ListItem>
                </Grid>
              </Grid>

              <Grid className={"sdr-status-item"} container spacing={3}>
                <Grid item xs={4}>
                  <ListItem required>How Discovered</ListItem>
                </Grid>
                <Grid item xs={4}>
                  <ListItem>Discrepancy/Corrective Action</ListItem>
                </Grid>
              </Grid>
              <Grid className={"sdr-status-description"} container spacing={3}>
                <Grid item xs={4}>
                  <ListItem>
                    {editable ? (
                      <SingleSelect
                        name="HowDiscoveredId"
                        value={values.HowDiscoveredId || ""}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={!!touched.HowDiscoveredId && !!errors.HowDiscoveredId}
                        helperText={!!touched.HowDiscoveredId && errors.HowDiscoveredId}
                        options={masterData?.HowDiscovered?.sort(
                          (a, b) => a.DisplayOrder - b.DisplayOrder
                        )}
                        className={"sdr-status-edit"}
                        id="HowDiscovered"
                      />
                    ) : (
                      ""
                    )}
                  </ListItem>
                </Grid>
                <Grid item xs={8}>
                  <ListItem>
                    {editable ? (
                      <TextField
                        name="CorrectiveAction"
                        value={values.CorrectiveAction || ""}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={!!touched.CorrectiveAction && !!errors.CorrectiveAction}
                        helperText={!!touched.CorrectiveAction && errors.CorrectiveAction}
                        multiline
                        maxRows={4}
                        className={"sdr-status-edit textareaAutosize"}
                        inputProps={{ style: { resize: "both" } }}
                      />
                    ) : (
                      ""
                    )}
                  </ListItem>
                </Grid>
              </Grid>
            </Box>

            {/* Specific Part Causing Problem */}
            <Box
              className={"sdr-status-grid"}
              sx={{
                borderLeft: 1,
                borderRight: 1,
                borderBottom: 1,
                borderColor: "#E6E6E6",
              }}
            >
              <Box className={"sdr-status-title"}>Specific Part Causing Problem</Box>
              <Grid className={"sdr-status-item"} container spacing={3}>
                <Grid item xs={4}>
                  <ListItem>MFG Part Number</ListItem>
                </Grid>
                <Grid item xs={4}>
                  <ListItem>MFG Serial Number</ListItem>
                </Grid>
                <Grid item xs={4}>
                  <ListItem>Keyword Description</ListItem>
                </Grid>
              </Grid>
              <Grid className={"sdr-status-description"} container spacing={3}>
                <Grid item xs={4}>
                  <ListItem>
                    {editable ? (
                      <TextField
                        name="PartDetails.PartSerialNumber"
                        value={values.PartDetails?.PartSerialNumber || ""}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={
                          !!touched.PartDetails?.PartSerialNumber &&
                          !!errors.PartDetails?.PartSerialNumber
                        }
                        helperText={
                          !!touched.PartDetails?.PartSerialNumber &&
                          errors.PartDetails?.PartSerialNumber
                        }
                        className={"sdr-status-edit"}
                      />
                    ) : (
                      ""
                    )}
                  </ListItem>
                </Grid>
                <Grid item xs={4}>
                  <ListItem>
                    {editable ? (
                      <TextField
                        name="PartDetails.PartManufacturerSerialNumber"
                        value={values.PartDetails?.PartManufacturerSerialNumber || ""}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={
                          !!touched.PartDetails?.PartManufacturerSerialNumber &&
                          !!errors.PartDetails?.PartManufacturerSerialNumber
                        }
                        helperText={
                          !!touched.PartDetails?.PartManufacturerSerialNumber &&
                          errors.PartDetails?.PartManufacturerSerialNumber
                        }
                        className={"sdr-status-edit"}
                      />
                    ) : (
                      ""
                    )}
                  </ListItem>
                </Grid>
                <Grid item xs={4}>
                  <ListItem>
                    {editable ? (
                      <TextField
                        name="PartDetails.PartDescription"
                        value={values.PartDetails?.PartDescription || ""}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={
                          !!touched.PartDetails?.PartDescription &&
                          !!errors.PartDetails?.PartDescription
                        }
                        helperText={
                          !!touched.PartDetails?.PartDescription &&
                          errors.PartDetails?.PartDescription
                        }
                        className={"sdr-status-edit"}
                      />
                    ) : (
                      ""
                    )}
                  </ListItem>
                </Grid>
              </Grid>
              <Grid className={"sdr-status-item"} container spacing={3}>
                <Grid item xs={4}>
                  <ListItem>Part Condition</ListItem>
                </Grid>
                <Grid item xs={4}>
                  <ListItem>Part Location</ListItem>
                </Grid>
              </Grid>
              <Grid className={"sdr-status-description"} container spacing={3}>
                <Grid item xs={4}>
                  <ListItem>
                    {editable ? (
                      <TextField
                        name="PartDetails.PartCondition"
                        value={values.PartDetails?.PartCondition || ""}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={
                          !!touched.PartDetails?.PartCondition &&
                          !!errors.PartDetails?.PartCondition
                        }
                        helperText={
                          !!touched.PartDetails?.PartCondition &&
                          errors.PartDetails?.PartCondition
                        }
                        className={"sdr-status-edit"}
                      />
                    ) : (
                      ""
                    )}
                  </ListItem>
                </Grid>
                <Grid item xs={4}>
                  <ListItem>
                    {editable ? (
                      <TextField
                        name="PartDetails.PartLocation"
                        value={values.PartDetails?.PartLocation || ""}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={
                          !!touched.PartDetails?.PartLocation &&
                          !!errors.PartDetails?.PartLocation
                        }
                        helperText={
                          !!touched.PartDetails?.PartLocation && errors.PartDetails?.PartLocation
                        }
                        className={"sdr-status-edit"}
                      />
                    ) : (
                      ""
                    )}
                  </ListItem>
                </Grid>
              </Grid>
            </Box>
            </div>

            <ButtonGroup
              className="bottom-button justify-end"
              primaryDisabled={isSubmitting}
              primaryLabel={`Submit ${createSdrFlag === Type.SDR ? Type.SDR : Type.SFR}`}
              primaryOnClick={handleSubmit}
              secondaryLabel={editable ? "Cancel" : "Edit"}
              secondaryOnClick={onClickCancle}
            />
          </form>
        )}
      </Formik>
    </FlexColumn>
  );
};

export default CreateSdrData;
