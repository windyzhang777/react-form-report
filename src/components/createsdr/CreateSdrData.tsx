import { Box, Button, Grid } from "@mui/material";
import { Formik } from "formik";
import moment from "moment";
import { Dispatch, SetStateAction, useEffect, useMemo, useRef } from "react";
import { FlexRow } from "src/commons/Box";
import ListItem from "src/commons/ListItem";
import { MultipleSelect, SingleSelect } from "src/commons/Select";
import TextField from "src/commons/TextField";
import { EsfrRecordDetailStateType, ISaveSdrValues, SelectedStatus } from "src/commons/types";
import { handleFocus, handleScroll } from "src/helpers";
import { resetLogpageDataSuccess } from "src/redux/ducks/getEsfrRecordDetails";
import { useAppDispatch, useAppSelector } from "src/redux/hooks";
import ValidationSchema from "src/validationSchema";
import { object, string } from "yup";
import "./createSdrData.css";

export interface ICreateSdrDataProps {
  createSdrFlag: string;
  editable: boolean;
  handleFetchLogpageData: (a: string) => void;
  handleSaveSDR: (a: ISaveSdrValues) => void;
  logpageNumberValue: string;
  setCreateSdrFlag: Dispatch<SetStateAction<string>>;
  setEditable: Dispatch<SetStateAction<boolean>>;
  setLogpageNumberValue: Dispatch<SetStateAction<string>>;
}

const CreateSdrData = ({
  createSdrFlag,
  editable,
  handleFetchLogpageData,
  handleSaveSDR,
  logpageNumberValue,
  setCreateSdrFlag,
  setEditable,
  setLogpageNumberValue,
}: ICreateSdrDataProps) => {
  const dispatch = useAppDispatch();
  const logPageNumberRef = useRef<HTMLInputElement>(null);
  const { profileData } = useAppSelector((state) => state.profile);
  const { esfrRecordDetailData, logpageData, sfrMasterData }: EsfrRecordDetailStateType =
    useAppSelector((state) => state.esfrRecordDetail);

  const initialValues: ISaveSdrValues = useMemo(
    () => ({
      LogPageCreationDate:
        moment(logpageData?.FleetInfo?.Date).toISOString() || moment().toISOString(),
      Station: logpageData?.FleetInfo?.Station || "",
      AircraftNumber: logpageData?.FleetInfo.TailNumber || "",
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
      Aircraft: {
        Manufacturer: logpageData?.FleetInfo?.ManufacturerPartNumber || "",
        Model: logpageData?.FleetInfo?.ManufacturerSerialNumber || "",
        SerialNumber: "",
        TotalTime: logpageData?.FleetInfo?.TotalAircraftTime || 0,
        TotalCycles: logpageData?.FleetInfo?.TotalAircraftCycles || 0,
      },
      Powerplant: {
        Manufacturer: "",
        Model: "",
        SerialNumber: "",
        TotalTime: 0,
        TotalCycles: 0,
      },
      NNumber: logpageData?.FleetInfo?.LicenseNumber || "",
      AtaCode: logpageData?.FleetInfo?.ATACode || "",
      FlightNumber: "",
      CorrectiveAction: "",
    }),
    [esfrRecordDetailData, logpageData, profileData]
  );

  const onClickCancle = () => {
    setCreateSdrFlag("");
  };

  useEffect(() => {
    setEditable(true);
    return () => {
      setLogpageNumberValue("");
      setEditable(false);
      dispatch(resetLogpageDataSuccess());
    };
  }, []);

  useEffect(() => {
    handleScroll(logPageNumberRef);
    handleFocus(logPageNumberRef);
  }, [logPageNumberRef]);

  return (
    <Grid className={"create-sdr"} item md={12} mb={6}>
      <Box className={"subpage-title bottom-divider"} sx={{ pt: "1px", mb: 2 }}>
        <p>Create SDR</p>
      </Box>
      <Formik
        initialValues={initialValues}
        enableReinitialize
        onSubmit={(values, { resetForm }) => {
          handleSaveSDR(values);
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
          <form onSubmit={handleSubmit}>
            <div id="create-sdr-details" className="h-[80vh] overflow-y-auto pb-[6rem]">
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
                        name="Aircraft.Manufacturer"
                        disabled={true}
                        value={values.Aircraft?.Manufacturer || ""}
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
                        name="Aircraft.Model"
                        disabled={true}
                        value={values.Aircraft?.Model || ""}
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
                        name="Aircraft.SerialNumber"
                        disabled={true}
                        value={values.Aircraft?.SerialNumber || ""}
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
                        name="Aircraft.TotalTime"
                        disabled={true}
                        value={values.Aircraft?.TotalTime || ""}
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
                        name="Aircraft.TotalCycles"
                        disabled={true}
                        value={values.Aircraft?.TotalCycles || ""}
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
                        // InputProps={{
                        //   endAdornment: (
                        //     <InputAdornment position="end">
                        //       <CalendarMonthIcon />
                        //     </InputAdornment>
                        //   ),
                        // }}
                        name="LogPageCreationDate"
                        value={moment(values.LogPageCreationDate).format("YYYY-MM-DD")}
                        onChange={(e) => {
                          setFieldValue(
                            "LogPageCreationDate",
                            moment(e.target.value).toISOString()
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
                        name="NNumber"
                        value={values.NNumber || ""}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={!!touched.NNumber && !!errors.NNumber}
                        helperText={!!touched.NNumber && errors.NNumber}
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
                          !!touched.PrecautionaryProcedureIds && !!errors.PrecautionaryProcedureIds
                        }
                        helperText={
                          !!touched.PrecautionaryProcedureIds && errors.PrecautionaryProcedureIds
                        }
                        options={sfrMasterData?.PrecautionaryProcedures?.sort(
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
                        options={sfrMasterData?.NatureofReports?.sort(
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
                        options={sfrMasterData?.Stage?.sort(
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
                        options={sfrMasterData?.HowDiscovered?.sort(
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
                          !!touched.PartDetails?.PartCondition && errors.PartDetails?.PartCondition
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
                          !!touched.PartDetails?.PartLocation && !!errors.PartDetails?.PartLocation
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

            <Grid
              sx={{
                marginLeft: "-20px",
                marginRight: "-20px",
                borderLeft: 1,
                borderRight: 1,
                border: "none",
                borderBottom: "1px solid #E6E6E6",
                boxShadow: "0px -4px 8px 0px rgba(51, 51, 51, 0.12)",
                paddingTop: "1px",
                position: "sticky",
                bottom: 0,
                backgroundColor: "#fff",
              }}
            >
              <FlexRow mx={2} my={2} sx={{ justifyContent: "flex-end", gap: "10px" }}>
                <Button
                  className="cancel-button"
                  color="secondary"
                  onClick={onClickCancle}
                  type="button"
                >
                  {editable ? "Cancel" : "Edit"}
                </Button>
                <Button
                  className={`submit-${createSdrFlag === "SDR" ? "SDR" : "SFR"}-button`}
                  disabled={isSubmitting}
                  onClick={handleSubmit as any}
                  type="submit"
                >
                  Submit {createSdrFlag === "SDR" ? "SDR" : "SFR"}
                </Button>
              </FlexRow>
            </Grid>
          </form>
        )}
      </Formik>
    </Grid>
  );
};

export default CreateSdrData;
