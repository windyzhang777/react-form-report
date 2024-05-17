import CloseIcon from "@mui/icons-material/Close";
import PrintIcon from "@mui/icons-material/Print";
import { Grid, IconButton } from "@mui/material";
import { Formik } from "formik";
import moment from "moment";
import { Dispatch, SetStateAction, useMemo } from "react";
import { FlexBetween, FlexColumn, FlexRow } from "src/commons/Box";
import ButtonGroup from "src/commons/ButtonGroup";
import ListItem from "src/commons/ListItem";
import { ArrowMenu } from "src/commons/Menu";
import { MultipleSelect, SimpleSingleSelect, SingleSelect } from "src/commons/Select";
import TextField from "src/commons/TextField";
import {
  IEditSdrValues,
  IViewSdrResult,
  PartTimeSinceCodeOptions,
  SdrEsfrRecordDetailsStateType,
  SelectedStatus,
  Sides,
  UserPermission,
} from "src/commons/types";
import {
  DATETIME_DISPLAY,
  DATE_DISPLAY,
  DATE_HTML_DISPLAY,
  formatFullName,
  printAsPage,
} from "src/helpers";
import { useAppSelector } from "src/redux/hooks";
import { Type } from "src/types/GetAllEsfrRecordsRes";
import ValidationSchema, {
  removeNonAlphaNumeric,
  removeNonAlphabet,
  removeNonNumeric,
  removeNonNumericDecimal,
} from "src/validationSchema";
import { object, string } from "yup";
import "./viewSdrData.css";

export interface IViewSnapshotDataProps {
  editable: boolean;
  handleUpsertSdrSnapshot?: (a: IEditSdrValues) => void;
  isSdr?: boolean;
  selectedSdr: IViewSdrResult;
  setEditable?: Dispatch<SetStateAction<boolean>>;
  setViewSdrFlag: Dispatch<SetStateAction<boolean>>;
  tabIndex?: number;
}

const ViewSnapshotData = ({
  editable,
  handleUpsertSdrSnapshot,
  isSdr,
  selectedSdr,
  setEditable,
  setViewSdrFlag,
  tabIndex,
}: IViewSnapshotDataProps) => {
  const { profileData, auth } = useAppSelector((state) => state.profile);
  const { snapshotData, masterData, logpageData }: SdrEsfrRecordDetailsStateType = useAppSelector(
    (state) => state.sdrEsfrRecordDetails
  );
  const isReport: boolean = useMemo(() => (tabIndex ? true : false), [tabIndex]);

  const initialValues: IEditSdrValues = useMemo(
    () => ({
      SdrId: snapshotData?.SdrId || 0,
      SnapshotId:
        (isSdr ? "" + snapshotData?.SnapshotId : snapshotData?.SfrDetails?.SnapshotId) || "",
      Type: selectedSdr.Type,
      SfrAdditionalDetails: {
        SnapshotId: "",
        AtaCode: snapshotData?.SfrDetails?.AtaCode || "",
        SubmitterDesignator: snapshotData?.SfrDetails?.SubmitterDesignator || "CALA",
        SubmitterType: snapshotData?.SfrDetails?.SubmitterType || "A",
        OperatorDesignator: snapshotData?.SfrDetails?.OperatorDesignator || "CALA",
        OperatorType: snapshotData?.SfrDetails?.OperatorType || "",
        FAAReceivingRegionCode: snapshotData?.SfrDetails?.FAAReceivingRegionCode || "GL",
        ReceivingDistrictOffice: snapshotData?.SfrDetails?.ReceivingDistrictOffice || "33",
        PartName: snapshotData?.SfrDetails?.PartName || "",
        PartManufacturerName: snapshotData?.SfrDetails?.PartManufacturerName || "",
        PartNumber: snapshotData?.PartManufacturerSerialNumber || "",
        ComponentName: snapshotData?.SfrDetails?.ComponentName || "",
        ComponentManufacturerName: snapshotData?.SfrDetails?.ComponentManufacturerName || "",
        PartModelNumber: snapshotData?.SfrDetails?.PartModelNumber || "",
        FuselageFromSta: snapshotData?.SfrDetails?.FuselageFromSta || "",
        FuselageToSta: snapshotData?.SfrDetails?.FuselageToSta || "",
        CorrisionLevel: snapshotData?.SfrDetails?.CorrisionLevel || "",
        CrackLength: snapshotData?.SfrDetails?.CrackLength || "",
        NumberOfCracks: snapshotData?.SfrDetails?.NumberOfCracks ?? 0,
        WaterlineFrom: snapshotData?.SfrDetails?.WaterlineFrom || "",
        WaterlineTo: snapshotData?.SfrDetails?.WaterlineTo || "",
        StringerFrom: snapshotData?.SfrDetails?.StringerFrom || "",
        StringerFromSide: snapshotData?.SfrDetails?.StringerFromSide || "",
        StringerTo: snapshotData?.SfrDetails?.StringerTo || "",
        StringerToSide: snapshotData?.SfrDetails?.StringerToSide || "",
        ButtlineFrom: snapshotData?.SfrDetails?.ButtlineFrom || "",
        ButtlineFromSide: snapshotData?.SfrDetails?.ButtlineFromSide || "",
        ButtlineTo: snapshotData?.SfrDetails?.ButtlineTo || "",
        ButtlineToSide: snapshotData?.SfrDetails?.ButtlineToSide || "",
        WingStationFrom: snapshotData?.SfrDetails?.WingStationFrom || "",
        WingStationFromSide: snapshotData?.SfrDetails?.WingStationFromSide || "",
        WingStationTo: snapshotData?.SfrDetails?.WingStationTo || "",
        WingStationToSide: snapshotData?.SfrDetails?.WingStationToSide || "",
        StructuralOther: snapshotData?.SfrDetails?.StructuralOther || "",
      },
      AircraftDetails: {
        RegistryNNumber: snapshotData?.AircraftDetails?.RegistryNNumber || "",
        Manufacturer: snapshotData?.AircraftDetails?.Manufacturer || "",
        Model: snapshotData?.AircraftDetails?.Model || "",
        SerialNumber: snapshotData?.AircraftDetails?.SerialNumber || "",
        TotalTime: String(snapshotData?.AircraftDetails?.TotalTime || ""),
        TotalCycles: snapshotData?.AircraftDetails?.TotalCycles || "",
      },
      EngineDetails: {
        EngineManufacturerName: snapshotData?.EngineDetails?.EngineManufacturerName || "",
        EngineModel: snapshotData?.EngineDetails?.EngineModel || "",
        EngineSerialNumber: snapshotData?.EngineDetails?.EngineSerialNumber || "",
        EngineTotalCycles: snapshotData?.EngineDetails?.EngineTotalCycles || "",
        EngineTotalTime: snapshotData?.EngineDetails?.EngineTotalTime || "",
      },
      LogPageCreationDate: snapshotData?.LogPageCreationDate || "",
      Station: snapshotData?.Station || "",
      LogPageNumber: snapshotData?.LogPageNumber || selectedSdr?.LogpageNumber || "",
      AircraftNumber: snapshotData?.AircraftNumber || "",
      PrecautionaryProcedureIds: snapshotData?.PrecautionaryProcedureIds || [],
      NatureOfReportIds: snapshotData?.NatureOfReportIds || [],
      StageId: snapshotData?.StageId || 0,
      StatusId: snapshotData?.StatusId || SelectedStatus.Approved,
      HowDiscoveredId: snapshotData?.HowDiscoveredId || 0,
      EmployeeId: profileData?.EmployeeId || "",
      EmployeeName: formatFullName(profileData?.FirstName, profileData?.LastName),
      PartDetails: {
        PartTrackingNumber: snapshotData?.PartDetails?.PartTrackingNumber || "",
        PartManufacturerSerialNumber: snapshotData?.PartDetails?.PartManufacturerSerialNumber || "",
        PartSerialNumber: snapshotData?.PartDetails?.PartSerialNumber || "",
        PartLocation: snapshotData?.PartDetails?.PartLocation || "",
        PartCondition: snapshotData?.PartDetails?.PartCondition || "",
        PartDescription: snapshotData?.PartDetails?.PartDescription || "",
        PartTotalTime: snapshotData?.PartDetails?.PartTotalTime || "",
        PartTotalCycles: snapshotData?.PartDetails?.PartTotalCycles || "",
        PartTimeSince: snapshotData?.PartDetails?.PartTimeSince || "",
        PartCycleSince: snapshotData?.PartDetails?.PartCycleSince || "",
        PartManufacturerName: snapshotData?.PartDetails?.PartManufacturerName || "",
        PartManufacturerPartNumber: snapshotData?.PartDetails?.PartManufacturerPartNumber || "",
        PartName: snapshotData?.PartDetails?.PartName || "",
        PartType: snapshotData?.PartDetails?.PartType || "",
      },
      CreatedBy: snapshotData?.CreatedBy || "",
      CreatedbyFirstName: snapshotData?.CreatedbyFirstName || "",
      CreatedbyLastName: snapshotData?.CreatedbyLastName || "",
      ModifiedbyFirstName: profileData?.FirstName || "",
      ModifiedbyLastName: profileData?.LastName || "",
      CreatedDate: snapshotData?.CreatedDate || "",
      CorrectiveAction: snapshotData?.CorrectiveAction || "",
      OperatorControlNumber: snapshotData?.OperatorControlNumber || "",
      IsExtracted: snapshotData?.IsExtracted || false,
      ComponentDetails: {
        ComponentName: snapshotData?.ComponentDetails?.ComponentName || "",
        ManufacturerName: snapshotData?.ComponentDetails?.ManufacturerName || "",
        PartNumber: snapshotData?.ComponentDetails?.PartNumber || "",
        SerialNumber: snapshotData?.ComponentDetails?.SerialNumber || "",
        ModelNumber: snapshotData?.ComponentDetails?.ModelNumber || "",
        ComponentLocation: snapshotData?.ComponentDetails?.ComponentLocation || "",
        ComponentTotalTime: snapshotData?.ComponentDetails?.ComponentTotalTime || "",
        ComponentTotalCycles: snapshotData?.ComponentDetails?.ComponentTotalCycles || "",
        ComponentTimeSince: snapshotData?.ComponentDetails?.ComponentTimeSince || "",
        ComponentTimeSinceCode: snapshotData?.ComponentDetails?.ComponentTimeSinceCode || "",
      },
      LocationDetails: {
        ZoneId: 0,
        DefectLocationIdentifier: "",
        CoordinateLocationDetails: "",
      },
      FlightNumber: logpageData?.FleetInfo?.FlightNumber || "",
      IsMajorRepair: snapshotData?.IsMajorRepair || false,
      IsSdrReportable: snapshotData?.IsSdrReportable || false,
    }),
    [snapshotData, isSdr, logpageData, profileData, selectedSdr]
  );

  const onClickEdit = () => {
    setEditable && setEditable(!editable);
  };

  return (
    <>
      <FlexColumn id="print-sdr" className={"view-sdr h-full relative"}>
        <FlexBetween className={"subpage-title bottom-divider"} sx={{ pt: "1px" }}>
          <FlexRow>
            {`${
              selectedSdr?.ReportType === Type.SDR ? "Service Difficulty" : "Significant Findings"
            }
            Report - #${selectedSdr?.Id}`}
            {isReport && (
              <IconButton
                id="print-details-btn"
                onClick={() =>
                  printAsPage(
                    [
                      `${initialValues?.AircraftNumber}`,
                      `${initialValues?.AircraftDetails?.Manufacturer}`,
                      `${initialValues?.AircraftDetails?.Model}`,
                      `${initialValues?.AircraftDetails?.SerialNumber}`,
                      `${initialValues?.AircraftDetails?.TotalTime}`,
                      `${initialValues?.AircraftDetails?.TotalCycles}`,
                      `${initialValues?.FlightNumber}`,
                    ],
                    [
                      `${snapshotData?.CreatedbyFirstName || ""} ${
                        snapshotData?.CreatedbyLastName || ""
                      }`,
                      `${snapshotData?.CreatedBy || snapshotData?.EmployeeId || ""}`,
                      `${moment(snapshotData?.CreatedDate).format(DATETIME_DISPLAY) || ""}`,
                    ]
                  )
                }
              >
                <PrintIcon />
              </IconButton>
            )}
          </FlexRow>
          <IconButton
            onClick={() => {
              setViewSdrFlag(false);
            }}
          >
            <CloseIcon />
          </IconButton>
        </FlexBetween>
        <Grid
          className={"sdr-status-item"}
          container
          spacing={2}
          sx={{ marginTop: "10px", color: "#666666", fontWeight: 400 }}
        >
          <Grid item xs={4}>
            <ListItem>Operator Control Number</ListItem>
          </Grid>
          <Grid item>
            <ListItem>A/C Information</ListItem>
          </Grid>
        </Grid>
        <Grid className={"sdr-status-description"} container spacing={2} pb={2}>
          <Grid item xs={4}>
            <ListItem>{initialValues?.OperatorControlNumber}</ListItem>
          </Grid>
          <Grid item>
            <ArrowMenu
              button={
                <ListItem>
                  <u className={"view-details-text"}>View Details</u>
                </ListItem>
              }
              id="view-details"
            >
              <Grid className={"view-details-dropdown"} container spacing={2}>
                <Grid className={"view-details-left"} item xs={6}>
                  <ListItem>A/C Number</ListItem>
                </Grid>
                <Grid className={"view-details-right"} item>
                  <ListItem>{initialValues?.AircraftNumber}</ListItem>
                </Grid>
              </Grid>
              <Grid className={"view-details-dropdown"} container spacing={2}>
                <Grid className={"view-details-left"} item xs={6}>
                  <ListItem>A/C Manufacturer</ListItem>
                </Grid>
                <Grid className={"view-details-right"} item>
                  <ListItem>{initialValues?.AircraftDetails?.Manufacturer}</ListItem>
                </Grid>
              </Grid>
              <Grid className={"view-details-dropdown"} container spacing={2}>
                <Grid className={"view-details-left"} item xs={6}>
                  <ListItem>A/C Model</ListItem>
                </Grid>
                <Grid className={"view-details-right"} item>
                  <ListItem>{initialValues?.AircraftDetails?.Model}</ListItem>
                </Grid>
              </Grid>
              <Grid className={"view-details-dropdown"} container spacing={2}>
                <Grid className={"view-details-left"} item xs={6}>
                  <ListItem>A/C Serial Number</ListItem>
                </Grid>
                <Grid className={"view-details-right"} item>
                  <ListItem>{initialValues?.AircraftDetails?.SerialNumber}</ListItem>
                </Grid>
              </Grid>
              <Grid className={"view-details-dropdown"} container spacing={2}>
                <Grid className={"view-details-left"} item xs={6}>
                  <ListItem>A/C Total Time</ListItem>
                </Grid>
                <Grid className={"view-details-right"} item>
                  <ListItem>{initialValues?.AircraftDetails?.TotalTime}</ListItem>
                </Grid>
              </Grid>
              <Grid className={"view-details-dropdown"} container spacing={2}>
                <Grid className={"view-details-left"} item xs={6}>
                  <ListItem>A/C Total Cycles</ListItem>
                </Grid>
                <Grid className={"view-details-right"} item>
                  <ListItem>{initialValues?.AircraftDetails?.TotalCycles}</ListItem>
                </Grid>
              </Grid>
              <Grid className={"view-details-dropdown"} container spacing={2}>
                <Grid className={"view-details-left"} item xs={6}>
                  <ListItem>Flight #</ListItem>
                </Grid>
                <Grid className={"view-details-right"} item>
                  <ListItem>{initialValues?.FlightNumber}</ListItem>
                </Grid>
              </Grid>
            </ArrowMenu>
          </Grid>
        </Grid>

        <Formik
          initialValues={initialValues}
          enableReinitialize
          onSubmit={(values, { setSubmitting }) => {
            handleUpsertSdrSnapshot && handleUpsertSdrSnapshot(values);
            setTimeout(() => {
              setSubmitting(false);
            }, 500);
          }}
          validationSchema={object().shape({
            ...ValidationSchema,
            LogPageNumber: ValidationSchema.LogPageNumber,
            CorrectiveAction: string().required("Required field"),
          })}
        >
          {({
            errors,
            handleBlur,
            handleChange,
            handleSubmit,
            isSubmitting,
            setFieldValue,
            resetForm,
            touched,
            values,
          }) => (
            <form
              onSubmit={handleSubmit}
              className={`overflow-hidden mb-[4rem] ${isReport && "max-h-[210vh]"}`}
            >
              <div
                id={`view-${isReport ? "report" : "snapshot"}-details`}
                className="h-full overflow-y-auto"
              >
                {/* Problem Description */}
                <Grid
                  className={"sdr-status-grid"}
                  sx={{
                    borderLeft: 1,
                    borderRight: 1,
                    borderBottom: 1,
                    borderColor: "#E6E6E6",
                  }}
                >
                  <Grid className={"sdr-status-title"}>Problem Description</Grid>
                  <Grid className={"sdr-status-item"} container spacing={3}>
                    <Grid item xs={4}>
                      <ListItem>Difficulty Date</ListItem>
                    </Grid>
                    <Grid item xs={4}>
                      <ListItem disabled={editable}>Log Page Number</ListItem>
                    </Grid>
                    <Grid item xs={4}>
                      <ListItem disabled={editable}>Station</ListItem>
                    </Grid>
                  </Grid>
                  <Grid className={"sdr-status-description"} container spacing={3}>
                    <Grid item xs={4}>
                      <ListItem>
                        {editable ? (
                          <TextField
                            type="date"
                            inputProps={{
                              max: moment().format(DATE_HTML_DISPLAY),
                            }}
                            name="CreatedDate"
                            value={moment(values?.CreatedDate).format(DATE_HTML_DISPLAY)}
                            onChange={(e) => {
                              setFieldValue(
                                "CreatedDate",
                                moment(e.target.value).isValid()
                                  ? moment(e.target.value).format(DATE_HTML_DISPLAY)
                                  : ""
                              );
                            }}
                            onBlur={handleBlur}
                            error={!!touched?.CreatedDate && !!errors?.CreatedDate}
                            helperText={!!touched?.CreatedDate && errors?.CreatedDate}
                            className={"sdr-status-edit"}
                          />
                        ) : moment(values?.CreatedDate).isValid() ? (
                          moment(values?.CreatedDate).format(DATE_DISPLAY)
                        ) : (
                          ""
                        )}
                      </ListItem>
                    </Grid>
                    <Grid item xs={4}>
                      <ListItem>
                        {editable ? (
                          <TextField
                            name="LogPageNumber"
                            value={values?.LogPageNumber}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={!!touched?.LogPageNumber && !!errors?.LogPageNumber}
                            helperText={!!touched?.LogPageNumber && errors?.LogPageNumber}
                            className={"sdr-status-edit"}
                            disabled
                          />
                        ) : (
                          values?.LogPageNumber
                        )}
                      </ListItem>
                    </Grid>
                    <Grid item xs={4}>
                      <ListItem>
                        {editable ? (
                          <TextField
                            name="Station"
                            value={values?.Station}
                            onChange={(e) =>
                              setFieldValue("Station", removeNonAlphabet(e.target.value))
                            }
                            onBlur={handleBlur}
                            error={!!touched?.Station && !!errors?.Station}
                            helperText={!!touched?.Station && errors?.Station}
                            className={"sdr-status-edit"}
                            inputProps={{ maxLength: 3 }}
                            disabled
                          />
                        ) : (
                          values?.Station
                        )}
                      </ListItem>
                    </Grid>
                  </Grid>
                  <Grid className={"sdr-status-item"} container spacing={3}>
                    <Grid item xs={4}>
                      <ListItem disabled={editable}>Submitter Designator</ListItem>
                    </Grid>
                    <Grid item xs={4}>
                      <ListItem disabled={editable}>Submitter Type</ListItem>
                    </Grid>
                    <Grid item xs={4}>
                      <ListItem disabled={editable}>Operator Designator</ListItem>
                    </Grid>
                  </Grid>
                  <Grid className={"sdr-status-description"} container spacing={3}>
                    <Grid item xs={4}>
                      <ListItem>
                        {editable ? (
                          <TextField
                            name="SfrAdditionalDetails.SubmitterDesignator"
                            value={values?.SfrAdditionalDetails?.SubmitterDesignator}
                            onChange={(e) =>
                              setFieldValue(
                                "SfrAdditionalDetails.SubmitterDesignator",
                                removeNonAlphaNumeric(e.target.value)
                              )
                            }
                            onBlur={handleBlur}
                            error={
                              !!touched?.SfrAdditionalDetails?.SubmitterDesignator &&
                              !!errors?.SfrAdditionalDetails?.SubmitterDesignator
                            }
                            helperText={
                              !!touched?.SfrAdditionalDetails?.SubmitterDesignator &&
                              errors?.SfrAdditionalDetails?.SubmitterDesignator
                            }
                            className={"sdr-status-edit"}
                            inputProps={{ maxLength: 4 }}
                            disabled
                          />
                        ) : (
                          values?.SfrAdditionalDetails?.SubmitterDesignator
                        )}
                      </ListItem>
                    </Grid>
                    <Grid item xs={4}>
                      <ListItem>
                        {editable ? (
                          <TextField
                            name="SfrAdditionalDetails.SubmitterType"
                            value={values?.SfrAdditionalDetails?.SubmitterType}
                            onChange={(e) =>
                              setFieldValue(
                                "SfrAdditionalDetails.SubmitterType",
                                removeNonAlphaNumeric(e.target.value)
                              )
                            }
                            onBlur={handleBlur}
                            error={
                              !!touched?.SfrAdditionalDetails?.SubmitterType &&
                              !!errors?.SfrAdditionalDetails?.SubmitterType
                            }
                            helperText={
                              !!touched?.SfrAdditionalDetails?.SubmitterType &&
                              errors?.SfrAdditionalDetails?.SubmitterType
                            }
                            className={"sdr-status-edit"}
                            placeholder="x"
                            inputProps={{ maxLength: 1 }}
                            disabled
                          />
                        ) : (
                          values?.SfrAdditionalDetails?.SubmitterType
                        )}
                      </ListItem>
                    </Grid>
                    <Grid item xs={4}>
                      <ListItem>
                        {editable ? (
                          <TextField
                            name="SfrAdditionalDetails.OperatorDesignator"
                            value={values?.SfrAdditionalDetails?.OperatorDesignator}
                            onChange={(e) =>
                              setFieldValue(
                                "SfrAdditionalDetails.OperatorDesignator",
                                removeNonAlphaNumeric(e.target.value)
                              )
                            }
                            onBlur={handleBlur}
                            error={
                              !!touched?.SfrAdditionalDetails?.OperatorDesignator &&
                              !!errors?.SfrAdditionalDetails?.OperatorDesignator
                            }
                            helperText={
                              !!touched?.SfrAdditionalDetails?.OperatorDesignator &&
                              errors?.SfrAdditionalDetails?.OperatorDesignator
                            }
                            className={"sdr-status-edit"}
                            inputProps={{ maxLength: 4 }}
                            disabled
                          />
                        ) : (
                          values?.SfrAdditionalDetails?.OperatorDesignator
                        )}
                      </ListItem>
                    </Grid>
                  </Grid>
                  <Grid className={"sdr-status-item"} container spacing={3}>
                    <Grid item xs={4}>
                      <ListItem disabled={editable}>Operator Type</ListItem>
                    </Grid>
                    <Grid item xs={4}>
                      <ListItem disabled={editable}>ATA Code</ListItem>
                    </Grid>
                    <Grid item xs={4}>
                      <ListItem required={editable}>Nature of Condition</ListItem>
                    </Grid>
                  </Grid>
                  <Grid className={"sdr-status-description"} container spacing={3}>
                    <Grid item xs={4}>
                      <ListItem>
                        {editable ? (
                          <TextField
                            name="SfrAdditionalDetails.OperatorType"
                            value={values?.SfrAdditionalDetails?.OperatorType}
                            onChange={(e) =>
                              setFieldValue(
                                "SfrAdditionalDetails.OperatorType",
                                removeNonAlphaNumeric(e.target.value)
                              )
                            }
                            onBlur={handleBlur}
                            error={
                              !!touched?.SfrAdditionalDetails?.OperatorType &&
                              !!errors?.SfrAdditionalDetails?.OperatorType
                            }
                            helperText={
                              !!touched?.SfrAdditionalDetails?.OperatorType &&
                              errors?.SfrAdditionalDetails?.OperatorType
                            }
                            className={"sdr-status-edit"}
                            placeholder="x"
                            inputProps={{ maxLength: 1 }}
                            disabled
                          />
                        ) : (
                          values?.SfrAdditionalDetails?.OperatorType
                        )}
                      </ListItem>
                    </Grid>
                    <Grid item xs={4}>
                      <ListItem>
                        {editable ? (
                          <TextField
                            name="SfrAdditionalDetails.AtaCode"
                            value={values?.SfrAdditionalDetails?.AtaCode}
                            onChange={(e) =>
                              setFieldValue(
                                "SfrAdditionalDetails.AtaCode",
                                removeNonAlphaNumeric(e.target.value)
                              )
                            }
                            onBlur={handleBlur}
                            error={
                              !!touched?.SfrAdditionalDetails?.AtaCode &&
                              !!errors?.SfrAdditionalDetails?.AtaCode
                            }
                            helperText={
                              !!touched?.SfrAdditionalDetails?.AtaCode &&
                              errors?.SfrAdditionalDetails?.AtaCode
                            }
                            className={"sdr-status-edit"}
                            inputProps={{ maxLength: 8 }}
                            disabled
                          />
                        ) : (
                          values?.SfrAdditionalDetails?.AtaCode
                        )}
                      </ListItem>
                    </Grid>
                    <Grid item xs={4}>
                      <ListItem>
                        {editable ? (
                          <MultipleSelect
                            name="NatureOfReportIds"
                            value={values?.NatureOfReportIds || []}
                            onChange={(values) => {
                              setFieldValue("NatureOfReportIds", values);
                            }}
                            onBlur={handleBlur}
                            error={!!touched?.NatureOfReportIds && !!errors?.NatureOfReportIds}
                            helperText={!!touched?.NatureOfReportIds && errors?.NatureOfReportIds}
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
                          values?.NatureOfReportIds?.reduce(
                            (acc, cur) =>
                              (acc += `${acc && ", "}${
                                masterData?.NatureofReports?.find((option) => option.Id === cur)
                                  ?.Description
                              }`),
                            ""
                          )
                        )}
                      </ListItem>
                    </Grid>
                  </Grid>
                  <Grid className={"sdr-status-item"} container spacing={3}>
                    <Grid item xs={4}>
                      <ListItem required={editable}>Precautionary Procedure</ListItem>
                    </Grid>
                    <Grid item xs={4}>
                      <ListItem required={editable}>Stage of Operation</ListItem>
                    </Grid>
                    <Grid item xs={4}>
                      <ListItem required={editable}>How Discovered</ListItem>
                    </Grid>
                  </Grid>
                  <Grid className={"sdr-status-description"} container spacing={3}>
                    <Grid item xs={4}>
                      <ListItem>
                        {editable ? (
                          <MultipleSelect
                            name="PrecautionaryProcedureIds"
                            value={values?.PrecautionaryProcedureIds || []}
                            onChange={(values) => {
                              setFieldValue("PrecautionaryProcedureIds", values);
                            }}
                            onBlur={handleBlur}
                            error={
                              !!touched.PrecautionaryProcedureIds &&
                              !!errors.PrecautionaryProcedureIds
                            }
                            helperText={
                              !!touched.PrecautionaryProcedureIds &&
                              errors.PrecautionaryProcedureIds
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
                          values?.PrecautionaryProcedureIds?.reduce(
                            (acc, cur) =>
                              (acc += `${acc && ", "}${
                                masterData?.PrecautionaryProcedures?.find(
                                  (option) => option.Id === cur
                                )?.Description
                              }`),
                            ""
                          )
                        )}
                      </ListItem>
                    </Grid>
                    <Grid item xs={4}>
                      <ListItem>
                        {editable ? (
                          <SingleSelect
                            name="StageId"
                            value={values?.StageId || ""}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={!!touched?.StageId && !!errors?.StageId}
                            helperText={!!touched?.StageId && errors?.StageId}
                            options={
                              masterData?.Stage &&
                              [...masterData.Stage].sort((a, b) => a.DisplayOrder - b.DisplayOrder)
                            }
                            id="StageId"
                          />
                        ) : (
                          masterData?.Stage.find((option) => option.Id === values?.StageId)
                            ?.Description || ""
                        )}
                      </ListItem>
                    </Grid>
                    <Grid item xs={4}>
                      <ListItem>
                        {editable ? (
                          <SingleSelect
                            name="HowDiscoveredId"
                            value={values?.HowDiscoveredId || ""}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={!!touched?.HowDiscoveredId && !!errors?.HowDiscoveredId}
                            helperText={!!touched?.HowDiscoveredId && errors?.HowDiscoveredId}
                            options={
                              masterData?.HowDiscovered &&
                              [...masterData.HowDiscovered].sort(
                                (a, b) => a.DisplayOrder - b.DisplayOrder
                              )
                            }
                            id="HowDiscovered"
                          />
                        ) : (
                          masterData?.HowDiscovered.find(
                            (option) => option.Id === values?.HowDiscoveredId
                          )?.Description || ""
                        )}
                      </ListItem>
                    </Grid>
                  </Grid>
                  <Grid className={"sdr-status-item CorrectiveAction"} container spacing={1}>
                    <Grid item xs={12}>
                      <ListItem required={editable}>Discrepancy/Corrective Action Summary</ListItem>
                    </Grid>
                  </Grid>
                  <Grid className={"sdr-status-description CorrectiveAction"} container spacing={1}>
                    <Grid item xs={12}>
                      <ListItem>
                        {editable ? (
                          <TextField
                            name="CorrectiveAction"
                            value={values?.CorrectiveAction}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={!!touched?.CorrectiveAction && !!errors?.CorrectiveAction}
                            helperText={!!touched?.CorrectiveAction && errors?.CorrectiveAction}
                            multiline
                            maxRows={4}
                            className={"sdr-status-edit textareaAutosize"}
                          />
                        ) : (
                          values?.CorrectiveAction
                        )}
                      </ListItem>
                    </Grid>
                  </Grid>
                  <Grid className={"sdr-status-item"} container spacing={1}>
                    <Grid item xs={4}>
                      <ListItem>FAA Receiving Region Code</ListItem>
                    </Grid>
                    <Grid item xs={4}>
                      <ListItem>Receiving District Office</ListItem>
                    </Grid>
                    <Grid item xs={4}>
                      <ListItem disabled={editable}>Major Repair</ListItem>
                    </Grid>
                  </Grid>
                  <Grid className={"sdr-status-description"} container spacing={1}>
                    <Grid item xs={4}>
                      <ListItem>
                        {editable ? (
                          <TextField
                            name="SfrAdditionalDetails.FAAReceivingRegionCode"
                            value={values?.SfrAdditionalDetails?.FAAReceivingRegionCode}
                            onChange={(e) =>
                              setFieldValue(
                                "SfrAdditionalDetails.FAAReceivingRegionCode",
                                removeNonAlphaNumeric(e.target.value)
                              )
                            }
                            onBlur={handleBlur}
                            error={
                              !!touched?.SfrAdditionalDetails?.FAAReceivingRegionCode &&
                              !!errors?.SfrAdditionalDetails?.FAAReceivingRegionCode
                            }
                            helperText={
                              !!touched?.SfrAdditionalDetails?.FAAReceivingRegionCode &&
                              errors?.SfrAdditionalDetails?.FAAReceivingRegionCode
                            }
                            className={"sdr-status-edit"}
                            inputProps={{ maxLength: 2 }}
                          />
                        ) : (
                          values?.SfrAdditionalDetails?.FAAReceivingRegionCode
                        )}
                      </ListItem>
                    </Grid>
                    <Grid item xs={4}>
                      <ListItem>
                        {editable ? (
                          <TextField
                            name="SfrAdditionalDetails.ReceivingDistrictOffice"
                            value={values?.SfrAdditionalDetails?.ReceivingDistrictOffice}
                            onChange={(e) =>
                              setFieldValue(
                                "SfrAdditionalDetails.ReceivingDistrictOffice",
                                removeNonAlphaNumeric(e.target.value)
                              )
                            }
                            onBlur={handleBlur}
                            error={
                              !!touched?.SfrAdditionalDetails?.ReceivingDistrictOffice &&
                              !!errors?.SfrAdditionalDetails?.ReceivingDistrictOffice
                            }
                            helperText={
                              !!touched?.SfrAdditionalDetails?.ReceivingDistrictOffice &&
                              errors?.SfrAdditionalDetails?.ReceivingDistrictOffice
                            }
                            className={"sdr-status-edit"}
                            inputProps={{ maxLength: 2 }}
                          />
                        ) : (
                          values?.SfrAdditionalDetails?.ReceivingDistrictOffice
                        )}
                      </ListItem>
                    </Grid>
                    <Grid item xs={4}>
                      <ListItem>
                        {editable ? (
                          <TextField
                            disabled
                            name="IsMajorRepair"
                            value={values.IsMajorRepair ? "Y" : "N"}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={!!touched.IsMajorRepair && !!errors.IsMajorRepair}
                            helperText={!!touched.IsMajorRepair && errors.IsMajorRepair}
                            className={"sdr-status-edit"}
                          />
                        ) : values.IsMajorRepair ? (
                          "Y"
                        ) : (
                          "N"
                        )}
                      </ListItem>
                    </Grid>
                  </Grid>
                  <Grid className={"sdr-status-item"} container spacing={1}>
                    <Grid item xs={4}>
                      <ListItem disabled={editable}>SDR Reportable</ListItem>
                    </Grid>
                  </Grid>
                  <Grid className={"sdr-status-description"} container spacing={1}>
                    <Grid item xs={4}>
                      <ListItem>
                        {editable ? (
                          <TextField
                            disabled
                            name="IsSdrReportable"
                            value={values.IsSdrReportable ? "Y" : "N"}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={!!touched.IsSdrReportable && !!errors.IsSdrReportable}
                            helperText={!!touched.IsSdrReportable && errors.IsSdrReportable}
                            className={"sdr-status-edit"}
                          />
                        ) : values.IsSdrReportable ? (
                          "Y"
                        ) : (
                          "N"
                        )}
                      </ListItem>
                    </Grid>
                  </Grid>
                </Grid>

                {/* Part or Structure Causing Difficulty */}
                <Grid
                  className={"sdr-status-grid"}
                  sx={{
                    borderLeft: 1,
                    borderRight: 1,
                    borderBottom: 1,
                    borderColor: "#E6E6E6",
                  }}
                >
                  <Grid className={"sdr-status-title"}>Part or Structure Causing Difficulty</Grid>
                  <Grid className={"sdr-status-item"} container spacing={3}>
                    <Grid item xs={4}>
                      <ListItem>Part Name</ListItem>
                    </Grid>
                    <Grid item xs={4}>
                      <ListItem>{"Manufacturer's Name"}</ListItem>
                    </Grid>
                    <Grid item xs={4}>
                      <ListItem>Part Number</ListItem>
                    </Grid>
                  </Grid>
                  <Grid className={"sdr-status-description"} container spacing={3}>
                    <Grid item xs={4}>
                      <ListItem>
                        {editable ? (
                          <TextField
                            name="PartDetails.PartName"
                            value={values?.PartDetails?.PartName}
                            onChange={(e) =>
                              setFieldValue(
                                "PartDetails.PartName",
                                removeNonAlphaNumeric(e.target.value)
                              )
                            }
                            onBlur={handleBlur}
                            error={
                              !!touched.PartDetails?.PartName && !!errors.PartDetails?.PartName
                            }
                            helperText={
                              !!touched.PartDetails?.PartName && errors.PartDetails?.PartName
                            }
                            className={"sdr-status-edit"}
                            inputProps={{ maxLength: 24 }}
                          />
                        ) : (
                          values?.PartDetails?.PartName
                        )}
                      </ListItem>
                    </Grid>
                    <Grid item xs={4}>
                      <ListItem>
                        {editable ? (
                          <TextField
                            name="PartDetails.PartManufacturerName"
                            value={values?.PartDetails?.PartManufacturerName}
                            onChange={(e) =>
                              setFieldValue(
                                "PartDetails.PartManufacturerName",
                                removeNonAlphaNumeric(e.target.value)
                              )
                            }
                            onBlur={handleBlur}
                            error={
                              !!touched?.PartDetails?.PartManufacturerName &&
                              !!errors?.PartDetails?.PartManufacturerName
                            }
                            helperText={
                              !!touched?.PartDetails?.PartManufacturerName &&
                              errors?.PartDetails?.PartManufacturerName
                            }
                            className={"sdr-status-edit"}
                            inputProps={{ maxLength: 15 }}
                          />
                        ) : (
                          values?.PartDetails?.PartManufacturerName
                        )}
                      </ListItem>
                    </Grid>
                    <Grid item xs={4}>
                      <ListItem>
                        {editable ? (
                          <TextField
                            name="PartDetails.PartManufacturerSerialNumber"
                            value={values?.PartDetails?.PartManufacturerSerialNumber}
                            onChange={(e) =>
                              setFieldValue(
                                "PartDetails.PartManufacturerSerialNumber",
                                removeNonAlphaNumeric(e.target.value)
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
                            inputProps={{ maxLength: 24 }}
                          />
                        ) : (
                          values?.PartDetails?.PartManufacturerSerialNumber
                        )}
                      </ListItem>
                    </Grid>
                  </Grid>
                  <Grid className={"sdr-status-item"} container spacing={3}>
                    <Grid item xs={4}>
                      <ListItem>Part Serial number</ListItem>
                    </Grid>
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
                            name="PartDetails.PartSerialNumber"
                            value={values?.PartDetails?.PartSerialNumber}
                            onChange={(e) =>
                              setFieldValue(
                                "PartDetails.PartSerialNumber",
                                removeNonAlphaNumeric(e.target.value)
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
                            inputProps={{ maxLength: 15 }}
                          />
                        ) : (
                          values?.PartDetails?.PartSerialNumber
                        )}
                      </ListItem>
                    </Grid>
                    <Grid item xs={4}>
                      <ListItem>
                        {editable ? (
                          <TextField
                            name="PartDetails.PartCondition"
                            value={values?.PartDetails?.PartCondition}
                            onChange={(e) =>
                              setFieldValue(
                                "PartDetails.PartCondition",
                                removeNonAlphaNumeric(e.target.value)
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
                            inputProps={{ maxLength: 20 }}
                          />
                        ) : (
                          values?.PartDetails?.PartCondition
                        )}
                      </ListItem>
                    </Grid>
                    <Grid item xs={4}>
                      <ListItem>
                        {editable ? (
                          <TextField
                            name="PartDetails.PartLocation"
                            value={values?.PartDetails?.PartLocation}
                            onChange={(e) =>
                              setFieldValue(
                                "PartDetails.PartLocation",
                                removeNonAlphaNumeric(e.target.value)
                              )
                            }
                            onBlur={handleBlur}
                            error={
                              !!touched.PartDetails?.PartLocation &&
                              !!errors.PartDetails?.PartLocation
                            }
                            helperText={
                              !!touched.PartDetails?.PartLocation &&
                              errors.PartDetails?.PartLocation
                            }
                            className={"sdr-status-edit"}
                            inputProps={{ maxLength: 20 }}
                          />
                        ) : (
                          values?.PartDetails?.PartLocation
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
                      <ListItem>Part Time Since (hours)</ListItem>
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
                  <Grid className={"sdr-status-item"} container spacing={3}>
                    <Grid item xs={4}>
                      <ListItem>Part Time Since Code</ListItem>
                    </Grid>
                  </Grid>
                  <Grid className={"sdr-status-description"} container spacing={3}>
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
                </Grid>

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
                      <ListItem required={editable && !!values?.ComponentDetails?.ComponentName}>
                        {"Manufacturer's Name"}
                      </ListItem>
                    </Grid>
                    <Grid item xs={4}>
                      <ListItem required={editable && !!values?.ComponentDetails?.ComponentName}>
                        Part Number
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
                              setFieldValue("ComponentDetails.ComponentName", e.target.value);
                              setFieldValue("SfrAdditionalDetails.ComponentName", e.target.value);
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
                            inputProps={{ maxLength: 50 }}
                          />
                        ) : (
                          values?.ComponentDetails?.ComponentName || "--"
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
                              setFieldValue("ComponentDetails.ManufacturerName", e.target.value);
                              setFieldValue(
                                "SfrAdditionalDetails.ComponentManufacturerName",
                                e.target.value
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
                            inputProps={{ maxLength: 50 }}
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
                            onChange={handleChange}
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
                      <ListItem required={editable && !!values?.ComponentDetails?.ComponentName}>
                        Part Serial Number
                      </ListItem>
                    </Grid>
                    <Grid item xs={4}>
                      <ListItem required={editable && !!values?.ComponentDetails?.ComponentName}>
                        Part Model Number
                      </ListItem>
                    </Grid>
                    <Grid item xs={4}>
                      <ListItem required={editable && !!values?.ComponentDetails?.ComponentName}>
                        Location
                      </ListItem>
                    </Grid>
                  </Grid>
                  <Grid className={"sdr-status-description"} container spacing={3}>
                    <Grid item xs={4}>
                      <ListItem>
                        {editable ? (
                          <TextField
                            name="ComponentDetails.SerialNumber"
                            value={values?.ComponentDetails?.SerialNumber}
                            onChange={handleChange}
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
                              setFieldValue("ComponentDetails.ModelNumber", e.target.value);
                              setFieldValue("SfrAdditionalDetails.PartModelNumber", e.target.value);
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
                            inputProps={{ maxLength: 50 }}
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
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={
                              !!touched.ComponentDetails?.ComponentLocation &&
                              !!errors.ComponentDetails?.ComponentLocation
                            }
                            helperText={
                              !!touched.ComponentDetails?.ComponentLocation &&
                              errors.ComponentDetails?.ComponentLocation
                            }
                            className={"sdr-status-edit"}
                          />
                        ) : (
                          values?.ComponentDetails?.ComponentLocation || "--"
                        )}
                      </ListItem>
                    </Grid>
                  </Grid>
                  <Grid className={"sdr-status-item"} container spacing={3}>
                    <Grid item xs={4}>
                      <ListItem required={editable && !!values?.ComponentDetails?.ComponentName}>
                        Part Total Time (hours)
                      </ListItem>
                    </Grid>
                    <Grid item xs={4}>
                      <ListItem required={editable && !!values?.ComponentDetails?.ComponentName}>
                        Part Total Cycles
                      </ListItem>
                    </Grid>
                    <Grid item xs={4}>
                      <ListItem required={editable && !!values?.ComponentDetails?.ComponentName}>
                        Part Time Since (hours)
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
                  <Grid className={"sdr-status-item"} container spacing={3}>
                    <Grid item xs={4}>
                      <ListItem required={editable && !!values?.ComponentDetails?.ComponentName}>
                        Part Time Since Code
                      </ListItem>
                    </Grid>
                  </Grid>
                  <Grid className={"sdr-status-description"} container spacing={3}>
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
                </Grid>

                {/* Structure Causing Difficulty */}
                <Grid
                  className={"sdr-status-grid"}
                  sx={{
                    borderLeft: 1,
                    borderRight: 1,
                    borderBottom: 1,
                    borderColor: "#E6E6E6",
                  }}
                >
                  <Grid className={"sdr-status-title"}>Structure Causing Difficulty</Grid>
                  <Grid className={"sdr-status-section-title"} container spacing={3}>
                    <Grid item xs={12}>
                      <ListItem>Body or Fuselage Station</ListItem>
                    </Grid>
                  </Grid>
                  <Grid className={"sdr-status-item"} container spacing={3}>
                    <Grid item xs={4}>
                      <ListItem>From STA</ListItem>
                    </Grid>
                    <Grid item xs={4}>
                      <ListItem>To STA</ListItem>
                    </Grid>
                  </Grid>
                  <Grid className={"sdr-status-description"} container spacing={3}>
                    <Grid item xs={4}>
                      <ListItem>
                        {editable ? (
                          <TextField
                            name="SfrAdditionalDetails.FuselageFromSta"
                            value={values?.SfrAdditionalDetails?.FuselageFromSta}
                            onChange={(e) =>
                              setFieldValue(
                                "SfrAdditionalDetails.FuselageFromSta",
                                removeNonAlphaNumeric(e.target.value)
                              )
                            }
                            onBlur={handleBlur}
                            error={
                              !!touched?.SfrAdditionalDetails?.FuselageFromSta &&
                              !!errors?.SfrAdditionalDetails?.FuselageFromSta
                            }
                            helperText={
                              !!touched?.SfrAdditionalDetails?.FuselageFromSta &&
                              errors?.SfrAdditionalDetails?.FuselageFromSta
                            }
                            className={"sdr-status-edit"}
                            inputProps={{ maxLength: 15 }}
                          />
                        ) : (
                          values?.SfrAdditionalDetails?.FuselageFromSta || "--"
                        )}
                      </ListItem>
                    </Grid>
                    <Grid item xs={4}>
                      <ListItem>
                        {editable ? (
                          <TextField
                            name="SfrAdditionalDetails.FuselageToSta"
                            value={values?.SfrAdditionalDetails?.FuselageToSta}
                            onChange={(e) =>
                              setFieldValue(
                                "SfrAdditionalDetails.FuselageToSta",
                                removeNonAlphaNumeric(e.target.value)
                              )
                            }
                            onBlur={handleBlur}
                            error={
                              !!touched?.SfrAdditionalDetails?.FuselageToSta &&
                              !!errors?.SfrAdditionalDetails?.FuselageToSta
                            }
                            helperText={
                              !!touched?.SfrAdditionalDetails?.FuselageToSta &&
                              errors?.SfrAdditionalDetails?.FuselageToSta
                            }
                            className={"sdr-status-edit"}
                            inputProps={{ maxLength: 15 }}
                          />
                        ) : (
                          values?.SfrAdditionalDetails?.FuselageToSta || "--"
                        )}
                      </ListItem>
                    </Grid>
                  </Grid>
                  <Grid className={"sdr-status-section-title"} container spacing={3}>
                    <Grid item xs={12}>
                      <ListItem>Corrosion</ListItem>
                    </Grid>
                  </Grid>
                  <Grid className={"sdr-status-item"} container spacing={3}>
                    <Grid item xs={4}>
                      <ListItem>Corrosion Level</ListItem>
                    </Grid>
                  </Grid>
                  <Grid className={"sdr-status-description"} container spacing={3}>
                    <Grid item xs={4}>
                      <ListItem>
                        {editable ? (
                          <SimpleSingleSelect
                            name="SfrAdditionalDetails.CorrisionLevel"
                            value={values?.SfrAdditionalDetails?.CorrisionLevel || ""}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={
                              !!touched?.SfrAdditionalDetails?.CorrisionLevel &&
                              !!errors?.SfrAdditionalDetails?.CorrisionLevel
                            }
                            helperText={
                              !!touched?.SfrAdditionalDetails?.CorrisionLevel &&
                              errors?.SfrAdditionalDetails?.CorrisionLevel
                            }
                            options={
                              masterData?.CorrosionLevels &&
                              [...masterData.CorrosionLevels]
                                .sort((a, b) => a.DisplayOrder - b.DisplayOrder)
                                .map((o) => o.Description)
                            }
                            id="SfrAdditionalDetails.CorrisionLevel"
                          />
                        ) : (
                          values?.SfrAdditionalDetails?.CorrisionLevel || "--"
                        )}
                      </ListItem>
                    </Grid>
                  </Grid>
                  <Grid className={"sdr-status-section-title"} container spacing={3}>
                    <Grid item xs={12}>
                      <ListItem>Crack</ListItem>
                    </Grid>
                  </Grid>
                  <Grid className={"sdr-status-item"} container spacing={3}>
                    <Grid item xs={4}>
                      <ListItem>Crack Length (Inches)</ListItem>
                    </Grid>
                    <Grid item xs={4}>
                      <ListItem>Number of Cracks</ListItem>
                    </Grid>
                  </Grid>
                  <Grid className={"sdr-status-description"} container spacing={3}>
                    <Grid item xs={4}>
                      <ListItem>
                        {editable ? (
                          <TextField
                            name="SfrAdditionalDetails.CrackLength"
                            value={values?.SfrAdditionalDetails?.CrackLength}
                            onChange={(e) =>
                              setFieldValue(
                                "SfrAdditionalDetails.CrackLength",
                                removeNonNumericDecimal(e.target.value)
                              )
                            }
                            onBlur={handleBlur}
                            error={
                              !!touched?.SfrAdditionalDetails?.CrackLength &&
                              !!errors?.SfrAdditionalDetails?.CrackLength
                            }
                            helperText={
                              !!touched?.SfrAdditionalDetails?.CrackLength &&
                              errors?.SfrAdditionalDetails?.CrackLength
                            }
                            className={"sdr-status-edit"}
                          />
                        ) : (
                          values?.SfrAdditionalDetails?.CrackLength || "--"
                        )}
                      </ListItem>
                    </Grid>
                    <Grid item xs={4}>
                      <ListItem>
                        {editable ? (
                          <TextField
                            name="SfrAdditionalDetails.NumberOfCracks"
                            value={values?.SfrAdditionalDetails?.NumberOfCracks || ""}
                            onChange={(e) =>
                              setFieldValue(
                                "SfrAdditionalDetails.NumberOfCracks",
                                removeNonNumeric(e.target.value)
                              )
                            }
                            onBlur={handleBlur}
                            error={
                              !!touched?.SfrAdditionalDetails?.NumberOfCracks &&
                              !!errors?.SfrAdditionalDetails?.NumberOfCracks
                            }
                            helperText={
                              !!touched?.SfrAdditionalDetails?.NumberOfCracks &&
                              errors?.SfrAdditionalDetails?.NumberOfCracks
                            }
                            className={"sdr-status-edit"}
                          />
                        ) : (
                          values?.SfrAdditionalDetails?.NumberOfCracks || "--"
                        )}
                      </ListItem>
                    </Grid>
                  </Grid>
                  <Grid className={"sdr-status-section-title"} container spacing={3}>
                    <Grid item xs={12}>
                      <ListItem>Water Line</ListItem>
                    </Grid>
                  </Grid>
                  <Grid className={"sdr-status-item"} container spacing={3}>
                    <Grid item xs={4}>
                      <ListItem>From/At</ListItem>
                    </Grid>
                    <Grid item xs={4}>
                      <ListItem>To</ListItem>
                    </Grid>
                  </Grid>
                  <Grid className={"sdr-status-description"} container spacing={3}>
                    <Grid item xs={4}>
                      <ListItem>
                        {editable ? (
                          <TextField
                            name="SfrAdditionalDetails.WaterlineFrom"
                            value={values?.SfrAdditionalDetails?.WaterlineFrom}
                            onChange={(e) =>
                              setFieldValue(
                                "SfrAdditionalDetails.WaterlineFrom",
                                removeNonAlphaNumeric(e.target.value)
                              )
                            }
                            onBlur={handleBlur}
                            error={
                              !!touched?.SfrAdditionalDetails?.WaterlineFrom &&
                              !!errors?.SfrAdditionalDetails?.WaterlineFrom
                            }
                            helperText={
                              !!touched?.SfrAdditionalDetails?.WaterlineFrom &&
                              errors?.SfrAdditionalDetails?.WaterlineFrom
                            }
                            className={"sdr-status-edit"}
                            inputProps={{ maxLength: 20 }}
                          />
                        ) : (
                          values?.SfrAdditionalDetails?.WaterlineFrom || "--"
                        )}
                      </ListItem>
                    </Grid>
                    <Grid item xs={4}>
                      <ListItem>
                        {editable ? (
                          <TextField
                            name="SfrAdditionalDetails.WaterlineTo"
                            value={values?.SfrAdditionalDetails?.WaterlineTo}
                            onChange={(e) =>
                              setFieldValue(
                                "SfrAdditionalDetails.WaterlineTo",
                                removeNonAlphaNumeric(e.target.value)
                              )
                            }
                            onBlur={handleBlur}
                            error={
                              !!touched?.SfrAdditionalDetails?.WaterlineTo &&
                              !!errors?.SfrAdditionalDetails?.WaterlineTo
                            }
                            helperText={
                              !!touched?.SfrAdditionalDetails?.WaterlineTo &&
                              errors?.SfrAdditionalDetails?.WaterlineTo
                            }
                            className={"sdr-status-edit"}
                            inputProps={{ maxLength: 20 }}
                          />
                        ) : (
                          values?.SfrAdditionalDetails?.WaterlineTo || "--"
                        )}
                      </ListItem>
                    </Grid>
                  </Grid>
                  <Grid className={"sdr-status-section-title"} container spacing={3}>
                    <Grid item xs={12}>
                      <ListItem>Stringer</ListItem>
                    </Grid>
                  </Grid>
                  <Grid className={"sdr-status-item"} container spacing={3}>
                    <Grid item xs={4}>
                      <ListItem>From/At</ListItem>
                    </Grid>
                    <Grid item xs={4}>
                      <ListItem>From Side</ListItem>
                    </Grid>
                    <Grid item xs={4}>
                      <ListItem>To</ListItem>
                    </Grid>
                  </Grid>
                  <Grid className={"sdr-status-description"} container spacing={3}>
                    <Grid item xs={4}>
                      <ListItem>
                        {editable ? (
                          <TextField
                            name="SfrAdditionalDetails.StringerFrom"
                            value={values?.SfrAdditionalDetails?.StringerFrom}
                            onChange={(e) =>
                              setFieldValue(
                                "SfrAdditionalDetails.StringerFrom",
                                removeNonAlphaNumeric(e.target.value)
                              )
                            }
                            onBlur={handleBlur}
                            error={
                              !!touched?.SfrAdditionalDetails?.StringerFrom &&
                              !!errors?.SfrAdditionalDetails?.StringerFrom
                            }
                            helperText={
                              !!touched?.SfrAdditionalDetails?.StringerFrom &&
                              errors?.SfrAdditionalDetails?.StringerFrom
                            }
                            className={"sdr-status-edit"}
                            inputProps={{ maxLength: 15 }}
                          />
                        ) : (
                          values?.SfrAdditionalDetails?.StringerFrom || "--"
                        )}
                      </ListItem>
                    </Grid>
                    <Grid item xs={4}>
                      <ListItem>
                        {editable ? (
                          <SimpleSingleSelect
                            name="SfrAdditionalDetails.StringerFromSide"
                            value={values?.SfrAdditionalDetails?.StringerFromSide || ""}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={
                              !!touched?.SfrAdditionalDetails?.StringerFromSide &&
                              !!errors?.SfrAdditionalDetails?.StringerFromSide
                            }
                            helperText={
                              !!touched?.SfrAdditionalDetails?.StringerFromSide &&
                              errors?.SfrAdditionalDetails?.StringerFromSide
                            }
                            options={Sides.sort((a, b) => a.DisplayOrder - b.DisplayOrder).map(
                              (r) => r.Description
                            )}
                            id="SfrAdditionalDetails.StringerFromSide"
                          />
                        ) : (
                          Sides.find(
                            (option) =>
                              "" + option.Id === values?.SfrAdditionalDetails?.StringerFromSide
                          )?.Description || ""
                        )}
                      </ListItem>
                    </Grid>
                    <Grid item xs={4}>
                      <ListItem>
                        {editable ? (
                          <TextField
                            name="SfrAdditionalDetails.StringerTo"
                            value={values?.SfrAdditionalDetails?.StringerTo}
                            onChange={(e) =>
                              setFieldValue(
                                "SfrAdditionalDetails.StringerTo",
                                removeNonAlphaNumeric(e.target.value)
                              )
                            }
                            onBlur={handleBlur}
                            error={
                              !!touched?.SfrAdditionalDetails?.StringerTo &&
                              !!errors?.SfrAdditionalDetails?.StringerTo
                            }
                            helperText={
                              !!touched?.SfrAdditionalDetails?.StringerTo &&
                              errors?.SfrAdditionalDetails?.StringerTo
                            }
                            className={"sdr-status-edit"}
                            inputProps={{ maxLength: 15 }}
                          />
                        ) : (
                          values?.SfrAdditionalDetails?.StringerTo || "--"
                        )}
                      </ListItem>
                    </Grid>
                  </Grid>
                  <Grid className={"sdr-status-item"} container spacing={3}>
                    <Grid item xs={4}>
                      <ListItem>To Side</ListItem>
                    </Grid>
                  </Grid>
                  <Grid className={"sdr-status-description"} container spacing={3}>
                    <Grid item xs={4}>
                      <ListItem>
                        {editable ? (
                          <SimpleSingleSelect
                            name="SfrAdditionalDetails.StringerToSide"
                            value={values?.SfrAdditionalDetails?.StringerToSide || ""}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={
                              !!touched?.SfrAdditionalDetails?.StringerToSide &&
                              !!errors?.SfrAdditionalDetails?.StringerToSide
                            }
                            helperText={
                              !!touched?.SfrAdditionalDetails?.StringerToSide &&
                              errors?.SfrAdditionalDetails?.StringerToSide
                            }
                            options={Sides.sort((a, b) => a.DisplayOrder - b.DisplayOrder).map(
                              (r) => r.Description
                            )}
                            id="SfrAdditionalDetails.StringerToSide"
                          />
                        ) : (
                          Sides.find(
                            (option) =>
                              "" + option.Id === values?.SfrAdditionalDetails?.StringerToSide
                          )?.Description || ""
                        )}
                      </ListItem>
                    </Grid>
                  </Grid>
                  <Grid className={"sdr-status-section-title"} container spacing={3}>
                    <Grid item xs={12}>
                      <ListItem>Butt Line</ListItem>
                    </Grid>
                  </Grid>
                  <Grid className={"sdr-status-item"} container spacing={3}>
                    <Grid item xs={4}>
                      <ListItem>From/At</ListItem>
                    </Grid>
                    <Grid item xs={4}>
                      <ListItem>From Side</ListItem>
                    </Grid>
                    <Grid item xs={4}>
                      <ListItem>To</ListItem>
                    </Grid>
                  </Grid>
                  <Grid className={"sdr-status-description"} container spacing={3}>
                    <Grid item xs={4}>
                      <ListItem>
                        {editable ? (
                          <TextField
                            name="SfrAdditionalDetails.ButtlineFrom"
                            value={values?.SfrAdditionalDetails?.ButtlineFrom}
                            onChange={(e) =>
                              setFieldValue(
                                "SfrAdditionalDetails.ButtlineFrom",
                                removeNonAlphaNumeric(e.target.value)
                              )
                            }
                            onBlur={handleBlur}
                            error={
                              !!touched?.SfrAdditionalDetails?.ButtlineFrom &&
                              !!errors?.SfrAdditionalDetails?.ButtlineFrom
                            }
                            helperText={
                              !!touched?.SfrAdditionalDetails?.ButtlineFrom &&
                              errors?.SfrAdditionalDetails?.ButtlineFrom
                            }
                            className={"sdr-status-edit"}
                            inputProps={{ maxLength: 15 }}
                          />
                        ) : (
                          values?.SfrAdditionalDetails?.ButtlineFrom || "--"
                        )}
                      </ListItem>
                    </Grid>
                    <Grid item xs={4}>
                      <ListItem>
                        {editable ? (
                          <SimpleSingleSelect
                            name="SfrAdditionalDetails.ButtlineFromSide"
                            value={values?.SfrAdditionalDetails?.ButtlineFromSide || ""}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={
                              !!touched?.SfrAdditionalDetails?.ButtlineFromSide &&
                              !!errors?.SfrAdditionalDetails?.ButtlineFromSide
                            }
                            helperText={
                              !!touched?.SfrAdditionalDetails?.ButtlineFromSide &&
                              errors?.SfrAdditionalDetails?.ButtlineFromSide
                            }
                            options={Sides.sort((a, b) => a.DisplayOrder - b.DisplayOrder).map(
                              (r) => r.Description
                            )}
                            id="SfrAdditionalDetails.ButtlineFromSide"
                          />
                        ) : (
                          Sides.find(
                            (option) =>
                              "" + option.Id === values?.SfrAdditionalDetails?.ButtlineFromSide
                          )?.Description || ""
                        )}
                      </ListItem>
                    </Grid>
                    <Grid item xs={4}>
                      <ListItem>
                        {editable ? (
                          <TextField
                            name="SfrAdditionalDetails.ButtlineTo"
                            value={values?.SfrAdditionalDetails?.ButtlineTo}
                            onChange={(e) =>
                              setFieldValue(
                                "SfrAdditionalDetails.ButtlineTo",
                                removeNonAlphaNumeric(e.target.value)
                              )
                            }
                            onBlur={handleBlur}
                            error={
                              !!touched?.SfrAdditionalDetails?.ButtlineTo &&
                              !!errors?.SfrAdditionalDetails?.ButtlineTo
                            }
                            helperText={
                              !!touched?.SfrAdditionalDetails?.ButtlineTo &&
                              errors?.SfrAdditionalDetails?.ButtlineTo
                            }
                            className={"sdr-status-edit"}
                            inputProps={{ maxLength: 15 }}
                          />
                        ) : (
                          values?.SfrAdditionalDetails?.ButtlineTo || "--"
                        )}
                      </ListItem>
                    </Grid>
                  </Grid>
                  <Grid className={"sdr-status-item"} container spacing={3}>
                    <Grid item xs={4}>
                      <ListItem>To Side</ListItem>
                    </Grid>
                  </Grid>
                  <Grid className={"sdr-status-description"} container spacing={3}>
                    <Grid item xs={4}>
                      <ListItem>
                        {editable ? (
                          <SimpleSingleSelect
                            name="SfrAdditionalDetails.ButtlineToSide"
                            value={values?.SfrAdditionalDetails?.ButtlineToSide || ""}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={
                              !!touched?.SfrAdditionalDetails?.ButtlineToSide &&
                              !!errors?.SfrAdditionalDetails?.ButtlineToSide
                            }
                            helperText={
                              !!touched?.SfrAdditionalDetails?.ButtlineToSide &&
                              errors?.SfrAdditionalDetails?.ButtlineToSide
                            }
                            options={Sides.sort((a, b) => a.DisplayOrder - b.DisplayOrder).map(
                              (r) => r.Description
                            )}
                            id="SfrAdditionalDetails.ButtlineToSide"
                          />
                        ) : (
                          Sides.find(
                            (option) =>
                              "" + option.Id === values?.SfrAdditionalDetails?.ButtlineToSide
                          )?.Description || ""
                        )}
                      </ListItem>
                    </Grid>
                  </Grid>
                  <Grid className={"sdr-status-section-title"} container spacing={3}>
                    <Grid item xs={12}>
                      <ListItem>Wing Station</ListItem>
                    </Grid>
                  </Grid>
                  <Grid className={"sdr-status-item"} container spacing={3}>
                    <Grid item xs={4}>
                      <ListItem>From STA</ListItem>
                    </Grid>
                    <Grid item xs={4}>
                      <ListItem>From Side</ListItem>
                    </Grid>
                    <Grid item xs={4}>
                      <ListItem>To STA</ListItem>
                    </Grid>
                  </Grid>
                  <Grid className={"sdr-status-description"} container spacing={3}>
                    <Grid item xs={4}>
                      <ListItem>
                        {editable ? (
                          <TextField
                            name="SfrAdditionalDetails.WingStationFrom"
                            value={values?.SfrAdditionalDetails?.WingStationFrom}
                            onChange={(e) =>
                              setFieldValue(
                                "SfrAdditionalDetails.WingStationFrom",
                                removeNonAlphaNumeric(e.target.value)
                              )
                            }
                            onBlur={handleBlur}
                            error={
                              !!touched?.SfrAdditionalDetails?.WingStationFrom &&
                              !!errors?.SfrAdditionalDetails?.WingStationFrom
                            }
                            helperText={
                              !!touched?.SfrAdditionalDetails?.WingStationFrom &&
                              errors?.SfrAdditionalDetails?.WingStationFrom
                            }
                            className={"sdr-status-edit"}
                            inputProps={{ maxLength: 15 }}
                          />
                        ) : (
                          values?.SfrAdditionalDetails?.WingStationFrom || "--"
                        )}
                      </ListItem>
                    </Grid>
                    <Grid item xs={4}>
                      <ListItem>
                        {editable ? (
                          <SimpleSingleSelect
                            name="SfrAdditionalDetails.WingStationFromSide"
                            value={values?.SfrAdditionalDetails?.WingStationFromSide || ""}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={
                              !!touched?.SfrAdditionalDetails?.WingStationFromSide &&
                              !!errors?.SfrAdditionalDetails?.WingStationFromSide
                            }
                            helperText={
                              !!touched?.SfrAdditionalDetails?.WingStationFromSide &&
                              errors?.SfrAdditionalDetails?.WingStationFromSide
                            }
                            options={Sides.sort((a, b) => a.DisplayOrder - b.DisplayOrder).map(
                              (r) => r.Description
                            )}
                            id="SfrAdditionalDetails.WingStationFromSide"
                          />
                        ) : (
                          Sides.find(
                            (option) =>
                              "" + option.Id === values?.SfrAdditionalDetails?.WingStationFromSide
                          )?.Description || ""
                        )}
                      </ListItem>
                    </Grid>
                    <Grid item xs={4}>
                      <ListItem>
                        {editable ? (
                          <TextField
                            name="SfrAdditionalDetails.WingStationTo"
                            value={values?.SfrAdditionalDetails?.WingStationTo}
                            onChange={(e) =>
                              setFieldValue(
                                "SfrAdditionalDetails.WingStationTo",
                                removeNonAlphaNumeric(e.target.value)
                              )
                            }
                            onBlur={handleBlur}
                            error={
                              !!touched?.SfrAdditionalDetails?.WingStationTo &&
                              !!errors?.SfrAdditionalDetails?.WingStationTo
                            }
                            helperText={
                              !!touched?.SfrAdditionalDetails?.WingStationTo &&
                              errors?.SfrAdditionalDetails?.WingStationTo
                            }
                            className={"sdr-status-edit"}
                            inputProps={{ maxLength: 15 }}
                          />
                        ) : (
                          values?.SfrAdditionalDetails?.WingStationTo || "--"
                        )}
                      </ListItem>
                    </Grid>
                  </Grid>
                  <Grid className={"sdr-status-item"} container spacing={3}>
                    <Grid item xs={4}>
                      <ListItem>To Side</ListItem>
                    </Grid>
                  </Grid>
                  <Grid className={"sdr-status-description"} container spacing={3}>
                    <Grid item xs={4}>
                      <ListItem>
                        {editable ? (
                          <SimpleSingleSelect
                            name="SfrAdditionalDetails.WingStationToSide"
                            value={values?.SfrAdditionalDetails?.WingStationToSide || ""}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={
                              !!touched?.SfrAdditionalDetails?.WingStationToSide &&
                              !!errors?.SfrAdditionalDetails?.WingStationToSide
                            }
                            helperText={
                              !!touched?.SfrAdditionalDetails?.WingStationToSide &&
                              errors?.SfrAdditionalDetails?.WingStationToSide
                            }
                            options={Sides.sort((a, b) => a.DisplayOrder - b.DisplayOrder).map(
                              (r) => r.Description
                            )}
                            id="SfrAdditionalDetails.WingStationToSide"
                          />
                        ) : (
                          Sides.find(
                            (option) =>
                              "" + option.Id === values?.SfrAdditionalDetails?.WingStationToSide
                          )?.Description || ""
                        )}
                      </ListItem>
                    </Grid>
                  </Grid>
                  <Grid className={"sdr-status-item"} container spacing={3}>
                    <Grid item xs={4}>
                      <ListItem>Structural Other</ListItem>
                    </Grid>
                  </Grid>
                  <Grid className={"sdr-status-description"} container spacing={3}>
                    <Grid item xs={4}>
                      <ListItem>
                        {editable ? (
                          <TextField
                            name="SfrAdditionalDetails.StructuralOther"
                            value={values?.SfrAdditionalDetails?.StructuralOther}
                            onChange={(e) =>
                              setFieldValue(
                                "SfrAdditionalDetails.StructuralOther",
                                removeNonAlphaNumeric(e.target.value)
                              )
                            }
                            onBlur={handleBlur}
                            error={
                              !!touched?.SfrAdditionalDetails?.StructuralOther &&
                              !!errors?.SfrAdditionalDetails?.StructuralOther
                            }
                            helperText={
                              !!touched?.SfrAdditionalDetails?.StructuralOther &&
                              errors?.SfrAdditionalDetails?.StructuralOther
                            }
                            className={"sdr-status-edit"}
                            inputProps={{ maxLength: 25 }}
                          />
                        ) : (
                          values?.SfrAdditionalDetails?.StructuralOther || "--"
                        )}
                      </ListItem>
                    </Grid>
                  </Grid>
                </Grid>

                <div id="signature" />
              </div>

              {auth === UserPermission.CRU && !tabIndex && (
                <ButtonGroup
                  className="bottom-button justify-end"
                  primaryDisabled={isSubmitting}
                  primaryLabel={editable ? "Save" : ""}
                  primaryOnClick={handleSubmit}
                  secondaryLabel={editable ? "Cancel" : "Edit"}
                  secondaryOnClick={() => {
                    resetForm();
                    onClickEdit();
                  }}
                />
              )}
            </form>
          )}
        </Formik>
      </FlexColumn>
    </>
  );
};

export default ViewSnapshotData;
