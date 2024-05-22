import { Box, Button, Grid } from "@mui/material";
import { Formik } from "formik";
import moment from "moment";
import { Dispatch, SetStateAction, useEffect, useMemo, useRef } from "react";
import { FlexColumn } from "src/commons/Box";
import ButtonGroup from "src/commons/ButtonGroup";
import ListItem from "src/commons/ListItem";
import { MultipleSelect, SimpleSingleSelect, SingleSelect } from "src/commons/Select";
import TextField from "src/commons/TextField";
import {
  ISaveSdrValues,
  PartTimeSinceCodeOptions,
  SdrEsfrRecordDetailsStateType,
  SelectedStatus,
} from "src/commons/types";
import { UseFormContext } from "src/components/createsdr/UseFormContext";
import {
  DATETIME_REQUEST,
  DATE_HTML_DISPLAY,
  formatFullName,
  handleFocus,
  handleScroll,
} from "src/helpers";
import { resetLogpageDataSuccess } from "src/redux/ducks/getSdrEsfrRecordDetails";
import { useAppDispatch, useAppSelector } from "src/redux/hooks";
import { Type } from "src/types/GetAllEsfrRecordsRes";
import ValidationSchema, {
  commonSchema,
  errMsg,
  removeNonAlphaNumeric,
  removeNonAlphaNumericHyphenSpace,
  removeNonAlphaNumericSpecial,
  removeNonAlphaNumericSpecialSpace,
  removeNonNumeric,
  removeNonNumericDecimal,
} from "src/validationSchema";
import { object, string } from "yup";
import "./createSdrData.css";

export interface ICreateSdrDataProps {
  createSdrFlag: string;
  handleFetchLogpageData: (a: string, b: boolean) => void;
  handleUpsertSdrSnapshot: (a: ISaveSdrValues) => void;
  logpageNumberValue: string;
  setCreateSdrFlag: Dispatch<SetStateAction<string>>;
  setFormTouched: Dispatch<SetStateAction<boolean>>;
  setLogpageNumberValue: Dispatch<SetStateAction<string>>;
}

const CreateSdrData = ({
  createSdrFlag,
  handleFetchLogpageData,
  handleUpsertSdrSnapshot,
  logpageNumberValue,
  setCreateSdrFlag,
  setFormTouched,
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
      SfrAdditionalDetails: {
        SnapshotId: "",
        AtaCode: logpageData?.FleetInfo?.ATACode || "",
        SubmitterDesignator: "CALA",
        SubmitterType: "A",
        OperatorDesignator: "CALA",
        OperatorType: "A",
        FAAReceivingRegionCode: "GL",
        ReceivingDistrictOffice: "33",
        PartName: "",
        PartManufacturerName: "",
        PartNumber: "",
        ComponentName: "",
        ComponentManufacturerName: "",
        PartModelNumber: "",
        FuselageFromSta: "",
        FuselageToSta: "",
        CorrisionLevel: "",
        CrackLength: "",
        NumberOfCracks: 0,
        WaterlineFrom: "",
        WaterlineTo: "",
        StringerFrom: "",
        StringerFromSide: "",
        StringerTo: "",
        StringerToSide: "",
        ButtlineFrom: "",
        ButtlineFromSide: "",
        ButtlineTo: "",
        ButtlineToSide: "",
        WingStationFrom: "",
        WingStationFromSide: "",
        WingStationTo: "",
        WingStationToSide: "",
        StructuralOther: "",
      },
      AircraftDetails: {
        RegistryNNumber: logpageData?.FleetInfo?.LicenseNumber || "",
        Manufacturer: logpageData?.FleetInfo?.ManufacturedBy || "",
        Model: logpageData?.FleetInfo?.ManufacturerPartNumber || "",
        SerialNumber: logpageData?.FleetInfo?.ManufacturerSerialNumber || "",
        TotalTime: String(logpageData?.FleetInfo?.TotalAircraftTime || ""),
        TotalCycles: logpageData?.FleetInfo?.TotalAircraftCycles || "",
      },
      EngineDetails: {
        EngineManufacturerName: "",
        EngineModel: "",
        EngineSerialNumber: "",
        EngineTotalCycles: "",
        EngineTotalTime: "",
      },
      LogPageCreationDate: logpageData?.FleetInfo?.Date || "",
      OperatorControlNumber: "",
      CreatedDate: moment().format(DATETIME_REQUEST),
      IsExtracted: false,
      Station: logpageData?.FleetInfo?.Station || "",
      AircraftNumber: logpageData?.FleetInfo?.TailNumber || "",
      LogPageNumber: logpageNumberValue || "",
      PrecautionaryProcedureIds: [],
      NatureOfReportIds: [],
      StageId: 0,
      StatusId: SelectedStatus.Approved,
      HowDiscoveredId: 0,
      EmployeeId: profileData?.EmployeeId || "",
      EmployeeName: formatFullName(profileData?.FirstName, profileData?.LastName),
      PartDetails: {
        PartCondition: "",
        PartCycleSince: "",
        PartDescription: "",
        PartLocation: "",
        PartManufacturerName: "",
        PartManufacturerPartNumber: "",
        PartManufacturerSerialNumber: "",
        PartName: "",
        PartSerialNumber: "",
        PartTimeSince: "",
        PartTotalCycles: "",
        PartTotalTime: "",
        PartTrackingNumber: "",
        PartType: "",
      },
      CreatedBy: profileData?.EmployeeId || "",
      CreatedbyFirstName: profileData?.FirstName || "",
      CreatedbyLastName: profileData?.LastName || "",
      ModifiedbyFirstName: profileData?.FirstName || "",
      ModifiedbyLastName: profileData?.LastName || "",
      ComponentDetails: {
        ComponentName: "",
        ManufacturerName: "",
        PartNumber: "",
        SerialNumber: "",
        ModelNumber: "",
        ComponentLocation: "",
        ComponentTotalTime: "",
        ComponentTotalCycles: "",
        ComponentTimeSince: "",
        ComponentTimeSinceCode: "",
      },
      AtaCode: logpageData?.FleetInfo?.ATACode || "",
      FlightNumber: logpageData?.FleetInfo?.FlightNumber || "",
      CorrectiveAction: logpageData?.FleetInfo?.CorrectiveActions || "",
      IsMajorRepair: false,
      IsSdrReportable: false,
      IsSdrDowngraded: false,
      IsSdrCompleted: false,
    }),
    [detailsData, logpageData, logpageNumberValue, profileData]
  );

  const onClickCancle = () => {
    setCreateSdrFlag("");
  };

  useEffect(() => {
    setLogpageNumberValue("");
    dispatch(resetLogpageDataSuccess());
    return () => {
      setFormTouched(false);
    };
  }, []);

  useEffect(() => {
    handleScroll(logPageNumberRef);
    handleFocus(logPageNumberRef);
  }, [logPageNumberRef, logpageNumberValue]);

  return (
    <FlexColumn className={"create-sdr h-full relative"}>
      <Box className={"subpage-title bottom-divider"} sx={{ pt: "1px", mb: 2 }}>
        <p>Create SDR</p>
      </Box>
      <Formik
        initialValues={initialValues}
        enableReinitialize
        onSubmit={(values, { setSubmitting }) => {
          handleUpsertSdrSnapshot(values);
          setTimeout(() => {
            setSubmitting(false);
          }, 500);
        }}
        validationSchema={object().shape({
          ...ValidationSchema,
          LogPageNumber: ValidationSchema.LogPageNumber.required(errMsg.required).test(
            (value, { createError }) => {
              return !logpageData
                ? createError({ message: "Fetch Log Page Data" })
                : logpageNumberValue && value !== logpageNumberValue
                ? createError({
                    message: "Re-fetch Log Page Data",
                  })
                : true;
            }
          ),
          CreatedDate: ValidationSchema.CreatedDate.required(errMsg.required),
          PartDetails: object().shape({
            PartManufacturerSerialNumber: string().required(errMsg.required),
            PartManufacturerName: string().required(errMsg.required),
            PartCondition: string().required(errMsg.required),
            PartLocation: string().required(errMsg.required),
            PartTotalTime: commonSchema.number8D3,
            PartTotalCycles: commonSchema.number8D3,
            PartTimeSince: commonSchema.number8D3,
          }),
          AircraftNumber: string(),
          SfrAdditionalDetails: object().nullable(),
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
            <UseFormContext setFormTouched={setFormTouched} />
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
                          autoFocus
                          name="LogPageNumber"
                          value={values.LogPageNumber || ""}
                          onChange={(e) =>
                            setFieldValue("LogPageNumber", removeNonNumeric(e.target.value))
                          }
                          onBlur={handleBlur}
                          error={!!touched.LogPageNumber && !!errors.LogPageNumber}
                          helperText={!!touched.LogPageNumber && errors.LogPageNumber}
                          className={"sdr-status-edit"}
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              handleFetchLogpageData(values.LogPageNumber, true);
                            }
                          }}
                          inputProps={{ ref: logPageNumberRef, maxLength: 7 }}
                          placeholder="xxxxxxx"
                        />
                      ) : (
                        ""
                      )}
                    </ListItem>
                  </Grid>
                  <Grid item xs={8}>
                    <Button
                      disabled={!values.LogPageNumber}
                      onClick={() => handleFetchLogpageData(values.LogPageNumber, true)}
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
                    <ListItem disabled>Manufacturer</ListItem>
                  </Grid>
                  <Grid item xs={4}>
                    <ListItem disabled>Model/Series</ListItem>
                  </Grid>
                  <Grid item xs={4}>
                    <ListItem disabled>Serial Number</ListItem>
                  </Grid>
                </Grid>
                <Grid className={"sdr-status-description"} container spacing={3}>
                  <Grid item xs={4}>
                    <ListItem>
                      {editable ? (
                        <TextField
                          name="AircraftDetails.Manufacturer"
                          disabled
                          value={values.AircraftDetails?.Manufacturer || ""}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={
                            !!touched?.AircraftDetails?.Manufacturer &&
                            !!errors?.AircraftDetails?.Manufacturer
                          }
                          helperText={
                            !!touched?.AircraftDetails?.Manufacturer &&
                            errors?.AircraftDetails?.Manufacturer
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
                          name="AircraftDetails.Model"
                          disabled
                          value={values.AircraftDetails?.Model || ""}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={
                            !!touched?.AircraftDetails?.Model && !!errors?.AircraftDetails?.Model
                          }
                          helperText={
                            !!touched?.AircraftDetails?.Model && errors?.AircraftDetails?.Model
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
                          name="AircraftDetails.SerialNumber"
                          disabled
                          value={values.AircraftDetails?.SerialNumber || ""}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={
                            !!touched?.AircraftDetails?.SerialNumber &&
                            !!errors?.AircraftDetails?.SerialNumber
                          }
                          helperText={
                            !!touched?.AircraftDetails?.SerialNumber &&
                            errors?.AircraftDetails?.SerialNumber
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
                    <ListItem disabled>Total Time</ListItem>
                  </Grid>
                  <Grid item xs={4}>
                    <ListItem disabled>Total Cycles</ListItem>
                  </Grid>
                </Grid>
                <Grid className={"sdr-status-description"} container spacing={3}>
                  <Grid item xs={4}>
                    <ListItem>
                      {editable ? (
                        <TextField
                          name="AircraftDetails.TotalTime"
                          disabled
                          value={values.AircraftDetails?.TotalTime || ""}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={
                            !!touched?.AircraftDetails?.TotalTime &&
                            !!errors?.AircraftDetails?.TotalTime
                          }
                          helperText={
                            !!touched?.AircraftDetails?.TotalTime &&
                            errors?.AircraftDetails?.TotalTime
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
                          name="AircraftDetails.TotalCycles"
                          disabled
                          value={values.AircraftDetails?.TotalCycles || ""}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={
                            !!touched?.AircraftDetails?.TotalCycles &&
                            !!errors?.AircraftDetails?.TotalCycles
                          }
                          helperText={
                            !!touched?.AircraftDetails?.TotalCycles &&
                            errors?.AircraftDetails?.TotalCycles
                          }
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
                    <ListItem>Engine</ListItem>
                  </Grid>
                </Grid>
                <Grid className={"sdr-status-item"} container spacing={3}>
                  <Grid item xs={4}>
                    <ListItem>Manufacturer Name</ListItem>
                  </Grid>
                  <Grid item xs={4}>
                    <ListItem>Model</ListItem>
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
                          name="EngineDetails.EngineManufacturerName"
                          value={values?.EngineDetails?.EngineManufacturerName || ""}
                          onChange={(e) =>
                            setFieldValue(
                              "EngineDetails.EngineManufacturerName",
                              removeNonAlphaNumericHyphenSpace(e.target.value)
                            )
                          }
                          onBlur={handleBlur}
                          error={
                            !!touched?.EngineDetails?.EngineManufacturerName &&
                            !!errors?.EngineDetails?.EngineManufacturerName
                          }
                          helperText={
                            !!touched?.EngineDetails?.EngineManufacturerName &&
                            errors?.EngineDetails?.EngineManufacturerName
                          }
                          className={"sdr-status-edit"}
                          inputProps={{ maxLength: 15 }}
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
                          name="EngineDetails.EngineModel"
                          value={values?.EngineDetails?.EngineModel || ""}
                          onChange={(e) =>
                            setFieldValue(
                              "EngineDetails.EngineModel",
                              removeNonAlphaNumeric(e.target.value)
                            )
                          }
                          onBlur={handleBlur}
                          error={
                            !!touched?.EngineDetails?.EngineModel &&
                            !!errors?.EngineDetails?.EngineModel
                          }
                          helperText={
                            !!touched?.EngineDetails?.EngineModel &&
                            errors?.EngineDetails?.EngineModel
                          }
                          className={"sdr-status-edit"}
                          inputProps={{ maxLength: 20 }}
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
                          name="EngineDetails.EngineSerialNumber"
                          value={values?.EngineDetails?.EngineSerialNumber || ""}
                          onChange={(e) =>
                            setFieldValue(
                              "EngineDetails.EngineSerialNumber",
                              removeNonAlphaNumericSpecial(e.target.value)
                            )
                          }
                          onBlur={handleBlur}
                          error={
                            !!touched?.EngineDetails?.EngineSerialNumber &&
                            !!errors?.EngineDetails?.EngineSerialNumber
                          }
                          helperText={
                            !!touched?.EngineDetails?.EngineSerialNumber &&
                            errors?.EngineDetails?.EngineSerialNumber
                          }
                          className={"sdr-status-edit"}
                          inputProps={{ maxLength: 12 }}
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
                          name="EngineDetails.EngineTotalTime"
                          value={values?.EngineDetails?.EngineTotalTime || ""}
                          onChange={(e) =>
                            setFieldValue(
                              "EngineDetails.EngineTotalTime",
                              removeNonNumericDecimal(e.target.value)
                            )
                          }
                          onBlur={handleBlur}
                          error={
                            !!touched?.EngineDetails?.EngineTotalTime &&
                            !!errors?.EngineDetails?.EngineTotalTime
                          }
                          helperText={
                            !!touched?.EngineDetails?.EngineTotalTime &&
                            errors?.EngineDetails?.EngineTotalTime
                          }
                          className={"sdr-status-edit"}
                          placeholder="Up to 3 decimals"
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
                          name="EngineDetails.EngineTotalCycles"
                          value={values?.EngineDetails?.EngineTotalCycles || ""}
                          onChange={(e) =>
                            setFieldValue(
                              "EngineDetails.EngineTotalCycles",
                              removeNonNumeric(e.target.value)
                            )
                          }
                          onBlur={handleBlur}
                          error={
                            !!touched?.EngineDetails?.EngineTotalCycles &&
                            !!errors?.EngineDetails?.EngineTotalCycles
                          }
                          helperText={
                            !!touched?.EngineDetails?.EngineTotalCycles &&
                            errors?.EngineDetails?.EngineTotalCycles
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
                    <ListItem required>Date</ListItem>
                  </Grid>
                  <Grid item xs={4}>
                    <ListItem disabled>Station</ListItem>
                  </Grid>
                  <Grid item xs={4}>
                    <ListItem disabled>A/C Number</ListItem>
                  </Grid>
                </Grid>
                <Grid className={"sdr-status-description"} container spacing={3}>
                  <Grid item xs={4}>
                    <ListItem>
                      {editable ? (
                        <TextField
                          type="date"
                          name="CreatedDate"
                          value={moment(values.CreatedDate).format(DATE_HTML_DISPLAY)}
                          onChange={(e) => {
                            setFieldValue(
                              "CreatedDate",
                              moment(e.target.value).isValid()
                                ? moment(e.target.value).format(DATE_HTML_DISPLAY)
                                : ""
                            );
                          }}
                          onBlur={handleBlur}
                          error={!!touched.CreatedDate && !!errors.CreatedDate}
                          helperText={!!touched.CreatedDate && errors.CreatedDate}
                          className={"sdr-status-edit"}
                          inputProps={{ max: moment().format(DATE_HTML_DISPLAY) }}
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
                          disabled
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
                          disabled
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
                    <ListItem disabled>N-Number</ListItem>
                  </Grid>
                  <Grid item xs={4}>
                    <ListItem disabled>ATA Code</ListItem>
                  </Grid>
                  <Grid item xs={4}>
                    <ListItem disabled>Flight Number</ListItem>
                  </Grid>
                </Grid>
                <Grid className={"sdr-status-description"} container spacing={3}>
                  <Grid item xs={4}>
                    <ListItem>
                      {editable ? (
                        <TextField
                          disabled
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
                          disabled
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
                          disabled
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
                          options={
                            masterData?.PrecautionaryProcedures &&
                            [...masterData.PrecautionaryProcedures].sort(
                              (a, b) => a.DisplayOrder - b.DisplayOrder
                            )
                          }
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
                          options={
                            masterData?.NatureofReports &&
                            [...masterData.NatureofReports].sort(
                              (a, b) => a.DisplayOrder - b.DisplayOrder
                            )
                          }
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
                          options={
                            masterData?.Stage &&
                            [...masterData.Stage].sort((a, b) => a.DisplayOrder - b.DisplayOrder)
                          }
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
                          options={
                            masterData?.HowDiscovered &&
                            [...masterData.HowDiscovered].sort(
                              (a, b) => a.DisplayOrder - b.DisplayOrder
                            )
                          }
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
                    <ListItem required>MFG Part Number</ListItem>
                  </Grid>
                  <Grid item xs={4}>
                    <ListItem>MFG Serial Number</ListItem>
                  </Grid>
                  <Grid item xs={4}>
                    <ListItem required>Part Name</ListItem>
                  </Grid>
                </Grid>
                <Grid className={"sdr-status-description"} container spacing={3}>
                  <Grid item xs={4}>
                    <ListItem>
                      {editable ? (
                        <TextField
                          name="PartDetails.PartManufacturerSerialNumber"
                          value={values.PartDetails?.PartManufacturerSerialNumber || ""}
                          onChange={(e) =>
                            setFieldValue(
                              "PartDetails.PartManufacturerSerialNumber",
                              removeNonAlphaNumericSpecial(e.target.value)
                            )
                          }
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
                          name="PartDetails.PartSerialNumber"
                          value={values.PartDetails?.PartSerialNumber || ""}
                          onChange={(e) =>
                            setFieldValue(
                              "PartDetails.PartSerialNumber",
                              removeNonAlphaNumericSpecial(e.target.value)
                            )
                          }
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
                          inputProps={{ maxLength: 12 }}
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
                          name="PartDetails.PartName"
                          value={values.PartDetails?.PartName || ""}
                          onChange={(e) => {
                            setFieldValue(
                              "PartDetails.PartName",
                              removeNonAlphaNumericHyphenSpace(e.target.value)
                            );
                            setFieldValue(
                              "PartName",
                              removeNonAlphaNumericHyphenSpace(e.target.value)
                            );
                          }}
                          onBlur={handleBlur}
                          error={!!touched.PartDetails?.PartName && !!errors.PartDetails?.PartName}
                          helperText={
                            !!touched.PartDetails?.PartName && errors.PartDetails?.PartName
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
                    <ListItem required>{"Manufacturer's Name"}</ListItem>
                  </Grid>
                  <Grid item xs={4}>
                    <ListItem required>Part Condition</ListItem>
                  </Grid>
                  <Grid item xs={4}>
                    <ListItem required>Part/Defect Location</ListItem>
                  </Grid>
                </Grid>
                <Grid className={"sdr-status-description"} container spacing={3}>
                  <Grid item xs={4}>
                    <ListItem>
                      {editable ? (
                        <TextField
                          name="PartDetails.PartManufacturerName"
                          value={values?.PartDetails?.PartManufacturerName}
                          onChange={(e) => {
                            setFieldValue(
                              "PartDetails.PartManufacturerName",
                              removeNonAlphaNumericHyphenSpace(e.target.value)
                            );
                          }}
                          onBlur={handleBlur}
                          error={
                            !!touched.PartDetails?.PartManufacturerName &&
                            !!errors.PartDetails?.PartManufacturerName
                          }
                          helperText={
                            !!touched.PartDetails?.PartManufacturerName &&
                            errors.PartDetails?.PartManufacturerName
                          }
                          className={"sdr-status-edit"}
                          inputProps={{ maxLength: 15 }}
                        />
                      ) : (
                        values?.PartDetails?.PartManufacturerName || "--"
                      )}
                    </ListItem>
                  </Grid>
                  <Grid item xs={4}>
                    <ListItem>
                      {editable ? (
                        <TextField
                          name="PartDetails.PartCondition"
                          value={values.PartDetails?.PartCondition || ""}
                          onChange={(e) =>
                            setFieldValue(
                              "PartDetails.PartCondition",
                              removeNonAlphaNumericSpecialSpace(e.target.value)
                            )
                          }
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
                          onChange={(e) =>
                            setFieldValue(
                              "PartDetails.PartLocation",
                              removeNonAlphaNumericSpecialSpace(e.target.value)
                            )
                          }
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
                <Grid className={"sdr-status-item"} container spacing={3}>
                  <Grid item xs={4}>
                    <ListItem>Part Total Time (hours)</ListItem>
                  </Grid>
                  <Grid item xs={4}>
                    <ListItem>Part Total Cycles</ListItem>
                  </Grid>
                  <Grid item xs={4}>
                    <ListItem>Part Time Since Code</ListItem>
                  </Grid>
                </Grid>
                <Grid className={"sdr-status-description"} container spacing={3}>
                  <Grid item xs={4}>
                    <ListItem>
                      {editable ? (
                        <TextField
                          name="PartDetails.PartTotalTime"
                          value={values?.PartDetails?.PartTotalTime}
                          onChange={(e) =>
                            setFieldValue(
                              "PartDetails.PartTotalTime",
                              removeNonNumericDecimal(e.target.value)
                            )
                          }
                          onBlur={handleBlur}
                          error={
                            !!touched.PartDetails?.PartTotalTime &&
                            !!errors.PartDetails?.PartTotalTime
                          }
                          helperText={
                            !!touched.PartDetails?.PartTotalTime &&
                            errors.PartDetails?.PartTotalTime
                          }
                          className={"sdr-status-edit"}
                          placeholder="Up to 3 decimals"
                        />
                      ) : (
                        values?.PartDetails?.PartTotalTime
                      )}
                    </ListItem>
                  </Grid>
                  <Grid item xs={4}>
                    <ListItem>
                      {editable ? (
                        <TextField
                          name="PartDetails.PartTotalCycles"
                          value={values?.PartDetails?.PartTotalCycles}
                          onChange={(e) =>
                            setFieldValue(
                              "PartDetails.PartTotalCycles",
                              removeNonNumericDecimal(e.target.value)
                            )
                          }
                          onBlur={handleBlur}
                          error={
                            !!touched.PartDetails?.PartTotalCycles &&
                            !!errors.PartDetails?.PartTotalCycles
                          }
                          helperText={
                            !!touched.PartDetails?.PartTotalCycles &&
                            errors.PartDetails?.PartTotalCycles
                          }
                          className={"sdr-status-edit"}
                          placeholder="Up to 3 decimals"
                        />
                      ) : (
                        values?.PartDetails?.PartTotalCycles
                      )}
                    </ListItem>
                  </Grid>
                  <Grid item xs={4}>
                    <ListItem>
                      {editable ? (
                        <SimpleSingleSelect
                          name="PartDetails.PartCycleSince"
                          value={values?.PartDetails?.PartCycleSince || ""}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={
                            !!touched?.PartDetails?.PartCycleSince &&
                            !!errors?.PartDetails?.PartCycleSince
                          }
                          helperText={
                            !!touched?.PartDetails?.PartCycleSince &&
                            errors?.PartDetails?.PartCycleSince
                          }
                          options={PartTimeSinceCodeOptions.sort(
                            (a, b) => a.DisplayOrder - b.DisplayOrder
                          ).map((r) => r.Description)}
                          id="PartDetails.PartCycleSince"
                        />
                      ) : (
                        values?.PartDetails?.PartCycleSince
                      )}
                    </ListItem>
                  </Grid>
                </Grid>
                <Grid className={"sdr-status-item"} container spacing={3}>
                  <Grid item xs={4}>
                    <ListItem>Part Time Since (hours)</ListItem>
                  </Grid>
                </Grid>
                <Grid className={"sdr-status-description"} container spacing={3}>
                  <Grid item xs={4}>
                    <ListItem>
                      {editable ? (
                        <TextField
                          name="PartDetails.PartTimeSince"
                          value={values?.PartDetails?.PartTimeSince}
                          onChange={(e) =>
                            setFieldValue(
                              "PartDetails.PartTimeSince",
                              removeNonNumericDecimal(e.target.value)
                            )
                          }
                          onBlur={handleBlur}
                          error={
                            !!touched.PartDetails?.PartTimeSince &&
                            !!errors.PartDetails?.PartTimeSince
                          }
                          helperText={
                            !!touched.PartDetails?.PartTimeSince &&
                            errors.PartDetails?.PartTimeSince
                          }
                          className={"sdr-status-edit"}
                          placeholder="Up to 3 decimals"
                        />
                      ) : (
                        values?.PartDetails?.PartTimeSince
                      )}
                    </ListItem>
                  </Grid>
                </Grid>
              </Box>

              {/* Component/Assembly That Includes Defective Part */}
              <Grid
                className={"sdr-status-grid"}
                sx={{
                  borderLeft: 1,
                  borderRight: 1,
                  borderBottom: 1,
                  borderColor: "#E6E6E6",
                }}
              >
                <Grid className={"sdr-status-title"}>
                  Component/Assembly That Includes Defective Part
                </Grid>
                <Grid className={"sdr-status-item"} container spacing={3}>
                  <Grid item xs={4}>
                    <ListItem>Component Name</ListItem>
                  </Grid>
                  <Grid item xs={4}>
                    <ListItem required={!!values.ComponentDetails.ComponentName}>
                      {"Manufacturer's Name"}
                    </ListItem>
                  </Grid>
                  <Grid item xs={4}>
                    <ListItem required={!!values.ComponentDetails.ComponentName}>
                      Manufacturer Part Number
                    </ListItem>
                  </Grid>
                </Grid>
                <Grid className={"sdr-status-description"} container spacing={3}>
                  <Grid item xs={4}>
                    <ListItem>
                      {editable ? (
                        <TextField
                          name="ComponentDetails.ComponentName"
                          value={values?.ComponentDetails?.ComponentName}
                          onChange={(e) => {
                            setFieldValue(
                              "ComponentDetails.ComponentName",
                              removeNonAlphaNumericHyphenSpace(e.target.value)
                            );
                          }}
                          onBlur={handleBlur}
                          error={
                            !!touched.ComponentDetails?.ComponentName &&
                            !!errors.ComponentDetails?.ComponentName
                          }
                          helperText={
                            !!touched.ComponentDetails?.ComponentName &&
                            errors.ComponentDetails?.ComponentName
                          }
                          className={"sdr-status-edit"}
                        />
                      ) : (
                        values?.ComponentDetails.ComponentName || "--"
                      )}
                    </ListItem>
                  </Grid>
                  <Grid item xs={4}>
                    <ListItem>
                      {editable ? (
                        <TextField
                          name="ComponentDetails.ManufacturerName"
                          value={values?.ComponentDetails?.ManufacturerName}
                          onChange={(e) => {
                            setFieldValue(
                              "ComponentDetails.ManufacturerName",
                              removeNonAlphaNumericHyphenSpace(e.target.value)
                            );
                          }}
                          onBlur={handleBlur}
                          error={
                            !!touched.ComponentDetails?.ManufacturerName &&
                            !!errors.ComponentDetails?.ManufacturerName
                          }
                          helperText={
                            !!touched.ComponentDetails?.ManufacturerName &&
                            errors.ComponentDetails?.ManufacturerName
                          }
                          className={"sdr-status-edit"}
                        />
                      ) : (
                        values?.ComponentDetails?.ManufacturerName || "--"
                      )}
                    </ListItem>
                  </Grid>
                  <Grid item xs={4}>
                    <ListItem>
                      {editable ? (
                        <TextField
                          name="ComponentDetails.PartNumber"
                          value={values?.ComponentDetails?.PartNumber}
                          onChange={(e) => {
                            setFieldValue(
                              "ComponentDetails.PartNumber",
                              removeNonAlphaNumericSpecial(e.target.value)
                            );
                          }}
                          onBlur={handleBlur}
                          error={
                            !!touched.ComponentDetails?.PartNumber &&
                            !!errors.ComponentDetails?.PartNumber
                          }
                          helperText={
                            !!touched.ComponentDetails?.PartNumber &&
                            errors.ComponentDetails?.PartNumber
                          }
                          className={"sdr-status-edit"}
                        />
                      ) : (
                        values?.ComponentDetails?.PartNumber || "--"
                      )}
                    </ListItem>
                  </Grid>
                </Grid>
                <Grid className={"sdr-status-item"} container spacing={3}>
                  <Grid item xs={4}>
                    <ListItem required={!!values.ComponentDetails.ComponentName}>
                      Manufacturer Serial Number
                    </ListItem>
                  </Grid>
                  <Grid item xs={4}>
                    <ListItem required={!!values.ComponentDetails.ComponentName}>
                      Model Number
                    </ListItem>
                  </Grid>
                  <Grid item xs={4}>
                    <ListItem required={!!values.ComponentDetails.ComponentName}>Location</ListItem>
                  </Grid>
                </Grid>
                <Grid className={"sdr-status-description"} container spacing={3}>
                  <Grid item xs={4}>
                    <ListItem>
                      {editable ? (
                        <TextField
                          name="ComponentDetails.SerialNumber"
                          value={values?.ComponentDetails?.SerialNumber}
                          onChange={(e) => {
                            setFieldValue(
                              "ComponentDetails.SerialNumber",
                              removeNonAlphaNumericSpecial(e.target.value)
                            );
                          }}
                          onBlur={handleBlur}
                          error={
                            !!touched.ComponentDetails?.SerialNumber &&
                            !!errors.ComponentDetails?.SerialNumber
                          }
                          helperText={
                            !!touched.ComponentDetails?.SerialNumber &&
                            errors.ComponentDetails?.SerialNumber
                          }
                          className={"sdr-status-edit"}
                        />
                      ) : (
                        values?.ComponentDetails?.SerialNumber || "--"
                      )}
                    </ListItem>
                  </Grid>
                  <Grid item xs={4}>
                    <ListItem>
                      {editable ? (
                        <TextField
                          name="ComponentDetails.ModelNumber"
                          value={values?.ComponentDetails?.ModelNumber}
                          onChange={(e) => {
                            setFieldValue(
                              "ComponentDetails.ModelNumber",
                              removeNonAlphaNumeric(e.target.value)
                            );
                          }}
                          onBlur={handleBlur}
                          error={
                            !!touched.ComponentDetails?.ModelNumber &&
                            !!errors.ComponentDetails?.ModelNumber
                          }
                          helperText={
                            !!touched.ComponentDetails?.ModelNumber &&
                            errors.ComponentDetails?.ModelNumber
                          }
                          className={"sdr-status-edit"}
                          inputProps={{ maxLength: 20 }}
                        />
                      ) : (
                        values?.ComponentDetails?.ModelNumber || "--"
                      )}
                    </ListItem>
                  </Grid>
                  <Grid item xs={4}>
                    <ListItem>
                      {editable ? (
                        <TextField
                          name="ComponentDetails.ComponentLocation"
                          value={values?.ComponentDetails?.ComponentLocation}
                          onChange={(e) => {
                            setFieldValue(
                              "ComponentDetails.ComponentLocation",
                              removeNonAlphaNumericSpecialSpace(e.target.value)
                            );
                          }}
                          onBlur={handleBlur}
                          error={
                            !!touched.ComponentDetails?.ComponentLocation &&
                            !!errors.ComponentDetails?.ComponentLocation
                          }
                          helperText={
                            !!touched.ComponentDetails?.ComponentLocation &&
                            errors.ComponentDetails?.ComponentLocation
                          }
                          multiline
                          maxRows={4}
                          className={"sdr-status-edit textareaAutosize"}
                          inputProps={{ maxLength: 50 }}
                        />
                      ) : (
                        values?.ComponentDetails?.ComponentLocation || "--"
                      )}
                    </ListItem>
                  </Grid>
                </Grid>
                <Grid className={"sdr-status-item"} container spacing={3}>
                  <Grid item xs={4}>
                    <ListItem required={!!values.ComponentDetails.ComponentName}>
                      Part Total Time (hours)
                    </ListItem>
                  </Grid>
                  <Grid item xs={4}>
                    <ListItem required={!!values.ComponentDetails.ComponentName}>
                      Part Total Cycles
                    </ListItem>
                  </Grid>
                  <Grid item xs={4}>
                    <ListItem required={!!values.ComponentDetails.ComponentName}>
                      Part Time Since Code
                    </ListItem>
                  </Grid>
                </Grid>
                <Grid className={"sdr-status-description"} container spacing={3}>
                  <Grid item xs={4}>
                    <ListItem>
                      {editable ? (
                        <TextField
                          name="ComponentDetails.ComponentTotalTime"
                          value={values?.ComponentDetails?.ComponentTotalTime}
                          onChange={(e) =>
                            setFieldValue(
                              "ComponentDetails.ComponentTotalTime",
                              removeNonNumericDecimal(e.target.value)
                            )
                          }
                          onBlur={handleBlur}
                          error={
                            !!touched.ComponentDetails?.ComponentTotalTime &&
                            !!errors.ComponentDetails?.ComponentTotalTime
                          }
                          helperText={
                            !!touched.ComponentDetails?.ComponentTotalTime &&
                            errors.ComponentDetails?.ComponentTotalTime
                          }
                          className={"sdr-status-edit"}
                          placeholder="Up to 3 decimals"
                        />
                      ) : (
                        values?.ComponentDetails?.ComponentTotalTime || "--"
                      )}
                    </ListItem>
                  </Grid>
                  <Grid item xs={4}>
                    <ListItem>
                      {editable ? (
                        <TextField
                          name="ComponentDetails.ComponentTotalCycles"
                          value={values?.ComponentDetails?.ComponentTotalCycles}
                          onChange={(e) =>
                            setFieldValue(
                              "ComponentDetails.ComponentTotalCycles",
                              removeNonNumericDecimal(e.target.value)
                            )
                          }
                          onBlur={handleBlur}
                          error={
                            !!touched.ComponentDetails?.ComponentTotalCycles &&
                            !!errors.ComponentDetails?.ComponentTotalCycles
                          }
                          helperText={
                            !!touched.ComponentDetails?.ComponentTotalCycles &&
                            errors.ComponentDetails?.ComponentTotalCycles
                          }
                          className={"sdr-status-edit"}
                          placeholder="Up to 3 decimals"
                        />
                      ) : (
                        values?.ComponentDetails?.ComponentTotalCycles || "--"
                      )}
                    </ListItem>
                  </Grid>
                  <Grid item xs={4}>
                    <ListItem>
                      {editable ? (
                        <SimpleSingleSelect
                          name="ComponentDetails.ComponentTimeSinceCode"
                          value={values?.ComponentDetails?.ComponentTimeSinceCode || ""}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={
                            !!touched?.ComponentDetails?.ComponentTimeSinceCode &&
                            !!errors?.ComponentDetails?.ComponentTimeSinceCode
                          }
                          helperText={
                            !!touched?.ComponentDetails?.ComponentTimeSinceCode &&
                            errors?.ComponentDetails?.ComponentTimeSinceCode
                          }
                          options={PartTimeSinceCodeOptions.sort(
                            (a, b) => a.DisplayOrder - b.DisplayOrder
                          ).map((r) => r.Description)}
                          id="ComponentDetails.ComponentTimeSinceCode"
                        />
                      ) : (
                        values?.ComponentDetails?.ComponentTimeSinceCode || "--"
                      )}
                    </ListItem>
                  </Grid>
                </Grid>
                <Grid className={"sdr-status-item"} container spacing={3}>
                  <Grid item xs={4}>
                    <ListItem required={!!values.ComponentDetails.ComponentName}>
                      Part Time Since (hours)
                    </ListItem>
                  </Grid>
                </Grid>
                <Grid className={"sdr-status-description"} container spacing={3}>
                  <Grid item xs={4}>
                    <ListItem>
                      {editable ? (
                        <TextField
                          name="ComponentDetails.ComponentTimeSince"
                          value={values?.ComponentDetails?.ComponentTimeSince}
                          onChange={(e) =>
                            setFieldValue(
                              "ComponentDetails.ComponentTimeSince",
                              removeNonNumericDecimal(e.target.value)
                            )
                          }
                          onBlur={handleBlur}
                          error={
                            !!touched.ComponentDetails?.ComponentTimeSince &&
                            !!errors.ComponentDetails?.ComponentTimeSince
                          }
                          helperText={
                            !!touched.ComponentDetails?.ComponentTimeSince &&
                            errors.ComponentDetails?.ComponentTimeSince
                          }
                          className={"sdr-status-edit"}
                          placeholder="Up to 3 decimals"
                        />
                      ) : (
                        values?.ComponentDetails?.ComponentTimeSince || "--"
                      )}
                    </ListItem>
                  </Grid>
                </Grid>
              </Grid>
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
