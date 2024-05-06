import CloseIcon from "@mui/icons-material/Close";
import { Grid, IconButton } from "@mui/material";
import { Formik } from "formik";
import moment from "moment";
import { Dispatch, SetStateAction, useMemo } from "react";
import { FlexBetween, FlexColumn } from "src/commons/Box";
import ButtonGroup from "src/commons/ButtonGroup";
import ListItem from "src/commons/ListItem";
import { ArrowMenu } from "src/commons/Menu";
import { MultipleSelect, SimpleSingleSelect, SingleSelect } from "src/commons/Select";
import TextField from "src/commons/TextField";
import {
  IEditSdrValues,
  PartTimeSinceCodeOptions,
  SdrEsfrRecordDetailsStateType,
  SelectedStatus,
  Sides,
  TransformedSdrDataType,
  UserPermission,
} from "src/commons/types";
import { DATE_DISPLAY, DATE_HTML_DISPLAY } from "src/helpers";
import { useAppSelector } from "src/redux/hooks";
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
  handleUpsertSdrSnapshot: (a: IEditSdrValues) => void;
  isSdr: boolean;
  selectedSdr: TransformedSdrDataType;
  setEditable: Dispatch<SetStateAction<boolean>>;
  setViewSdrFlag: Dispatch<SetStateAction<boolean>>;
}

const ViewSnapshotData = ({
  editable,
  handleUpsertSdrSnapshot,
  isSdr,
  selectedSdr,
  setEditable,
  setViewSdrFlag,
}: IViewSnapshotDataProps) => {
  const { profileData, auth } = useAppSelector((state) => state.profile);
  const { snapshotData, masterData, logpageData }: SdrEsfrRecordDetailsStateType = useAppSelector(
    (state) => state.sdrEsfrRecordDetails
  );

  const initialValues: IEditSdrValues = useMemo(
    () => ({
      SdrId: snapshotData?.SdrId || 0,
      SnapshotId:
        (isSdr ? "" + snapshotData?.SnapshotId : snapshotData?.SfrDetails?.SnapshotId) || "",
      Type: selectedSdr.Type,
      SfrAdditionalDetails: {
        SnapshotId: "",
        AtaCode: snapshotData?.SfrDetails?.AtaCode || logpageData?.FleetInfo?.ATACode || "",
        SubmitterDesignator: snapshotData?.SfrDetails?.SubmitterDesignator || "CALA",
        SubmitterType: snapshotData?.SfrDetails?.SubmitterType || "A",
        OperatorDesignator: snapshotData?.SfrDetails?.OperatorDesignator || "CALA",
        OperatorType: snapshotData?.SfrDetails?.OperatorType || "",
        FAAReceivingRegionCode: "GL",
        ReceivingDistrictOffice: "33",
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
        RegistryNNumber: logpageData?.FleetInfo?.LicenseNumber || "",
        Manufacturer: logpageData?.FleetInfo?.ManufacturedBy || "",
        Model: logpageData?.FleetInfo?.ManufacturerPartNumber || "",
        SerialNumber: logpageData?.FleetInfo?.ManufacturerSerialNumber || "",
        TotalTime: String(logpageData?.FleetInfo?.TotalAircraftTime || ""),
        TotalCycles: logpageData?.FleetInfo?.TotalAircraftCycles || "",
      },
      LogPageCreationDate: snapshotData?.CreatedDate || "",
      Station: snapshotData?.Station || logpageData?.FleetInfo?.Station || "",
      LogPageNumber: snapshotData?.LogPageNumber || selectedSdr?.LogpageNumber || "",
      AircraftNumber: logpageData?.FleetInfo?.TailNumber || "",
      PrecautionaryProcedureIds: snapshotData?.PrecautionaryProcedureIds || [],
      NatureOfReportIds: snapshotData?.NatureOfReportIds || [],
      StageId: snapshotData?.StageId || 0,
      StatusId: snapshotData?.StatusId || SelectedStatus.Approved,
      HowDiscoveredId: snapshotData?.HowDiscoveredId || 0,
      EmployeeId: `${profileData?.EmployeeId}`,
      EmployeeName: `${profileData?.FirstName} ${profileData?.LastName}`,
      PartDetails: {
        PartTrackingNumber: snapshotData?.PartTrackingNumber || "",
        PartManufacturerSerialNumber: snapshotData?.PartManufacturerSerialNumber || "",
        PartSerialNumber: snapshotData?.PartSerialNumber || "",
        PartLocation: snapshotData?.PartLocation || "",
        PartCondition: snapshotData?.PartCondition || "",
        PartDescription: snapshotData?.PartDescription || "",
        PartTotalTime: snapshotData?.PartTotalTime || "",
        PartTotalCycles: snapshotData?.PartTotalCycles || "",
        PartTimeSince: snapshotData?.PartTimeSince || "",
        PartCycleSince: snapshotData?.PartCycleSince || "",
      },
      CreatedbyFirstName:
        (isSdr ? snapshotData?.CreatedbyFirstName : snapshotData?.CreatedbyFirstName) || "",
      CreatedbyLastName:
        (isSdr ? snapshotData?.CreatedbyLastName : snapshotData?.CreatedbyLastName) || "",
      ModifiedbyFirstName: `${profileData?.FirstName}`,
      ModifiedbyLastName: `${profileData?.LastName}`,
      CreatedDate: snapshotData?.CreatedDate || "",
      CorrectiveAction: snapshotData?.CorrectiveAction || "",
      OperatorControlNumber: snapshotData?.OperatorControlNumber || "",
      IsExtracted: false,
      ComponentDetails: {
        ComponentName: snapshotData?.SfrDetails?.ComponentName || "",
        ComponentManufacturerName: snapshotData?.SfrDetails?.ComponentManufacturerName || "",
        ComponentPartNumber: "",
        ComponentPartSerialNumber: "",
        ComponentPartModelNumber: "",
        ComponentLocation: "",
        PartTotalTime: "",
        PartTotalCycles: "",
        PartTimeSince: "",
        PartTimeSinceCode: "",
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
    [snapshotData, logpageData, isSdr, profileData, selectedSdr]
  );

  const onClickEdit = () => {
    setEditable(!editable);
  };

  return (
    <>
      <FlexColumn className={"view-sdr h-full relative"}>
        <FlexBetween className={"subpage-title bottom-divider"} sx={{ pt: "1px" }}>
          <p>Service Difficulty Report - #{selectedSdr?.Id}</p>
          <IconButton
            onClick={() => {
              setViewSdrFlag(false);
            }}
          >
            <CloseIcon />
          </IconButton>
        </FlexBetween>
        <Grid container spacing={2} sx={{ marginTop: "10px", color: "#666666", fontWeight: 400 }}>
          <Grid item xs={4}>
            <ListItem>Operator Control Number</ListItem>
          </Grid>
          <Grid item>
            <ListItem>A/C Information</ListItem>
          </Grid>
        </Grid>
        <Grid container spacing={2} pb={2}>
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
            handleUpsertSdrSnapshot(values);
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
            <form onSubmit={handleSubmit} className="overflow-hidden mb-[4rem]">
              <div id="view-sdr-details" className="h-full overflow-y-auto">
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
                      <ListItem>Station</ListItem>
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
                            name="LogPageCreationDate"
                            value={moment(values?.LogPageCreationDate).format(DATE_HTML_DISPLAY)}
                            onChange={(e) => {
                              setFieldValue(
                                "LogPageCreationDate",
                                moment(e.target.value).isValid()
                                  ? moment(e.target.value).format(DATE_HTML_DISPLAY)
                                  : ""
                              );
                            }}
                            onBlur={handleBlur}
                            error={!!touched?.LogPageCreationDate && !!errors?.LogPageCreationDate}
                            helperText={
                              !!touched?.LogPageCreationDate && errors?.LogPageCreationDate
                            }
                            className={"sdr-status-edit"}
                          />
                        ) : moment(values?.LogPageCreationDate).isValid() ? (
                          moment(values?.LogPageCreationDate).format(DATE_DISPLAY)
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
                          />
                        ) : (
                          values?.Station
                        )}
                      </ListItem>
                    </Grid>
                  </Grid>
                  <Grid className={"sdr-status-item"} container spacing={3}>
                    <Grid item xs={4}>
                      <ListItem>Submitter Designator</ListItem>
                    </Grid>
                    <Grid item xs={4}>
                      <ListItem>Submitter Type</ListItem>
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
                      <ListItem>Operator Type</ListItem>
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
                  <Grid className={"sdr-status-item"} container spacing={1}>
                    <Grid item xs={12}>
                      <ListItem required={editable}>Discrepancy/Corrective Action Summary</ListItem>
                    </Grid>
                  </Grid>
                  <Grid className={"sdr-status-description"} container spacing={1}>
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
                            name="SfrAdditionalDetails.PartName"
                            value={values?.SfrAdditionalDetails?.PartName}
                            onChange={(e) =>
                              setFieldValue(
                                "SfrAdditionalDetails.PartName",
                                removeNonAlphaNumeric(e.target.value)
                              )
                            }
                            onBlur={handleBlur}
                            error={
                              !!touched.SfrAdditionalDetails?.PartName &&
                              !!errors.SfrAdditionalDetails?.PartName
                            }
                            helperText={
                              !!touched.SfrAdditionalDetails?.PartName &&
                              errors.SfrAdditionalDetails?.PartName
                            }
                            className={"sdr-status-edit"}
                            inputProps={{ maxLength: 24 }}
                          />
                        ) : (
                          values?.SfrAdditionalDetails?.PartName
                        )}
                      </ListItem>
                    </Grid>
                    <Grid item xs={4}>
                      <ListItem>
                        {editable ? (
                          <TextField
                            name="SfrAdditionalDetails.PartManufacturerName"
                            value={values?.SfrAdditionalDetails?.PartManufacturerName}
                            onChange={(e) =>
                              setFieldValue(
                                "SfrAdditionalDetails.PartManufacturerName",
                                removeNonAlphaNumeric(e.target.value)
                              )
                            }
                            onBlur={handleBlur}
                            error={
                              !!touched?.SfrAdditionalDetails?.PartManufacturerName &&
                              !!errors?.SfrAdditionalDetails?.PartManufacturerName
                            }
                            helperText={
                              !!touched?.SfrAdditionalDetails?.PartManufacturerName &&
                              errors?.SfrAdditionalDetails?.PartManufacturerName
                            }
                            className={"sdr-status-edit"}
                            inputProps={{ maxLength: 15 }}
                          />
                        ) : (
                          values?.SfrAdditionalDetails?.PartManufacturerName
                        )}
                      </ListItem>
                    </Grid>
                    <Grid item xs={4}>
                      <ListItem>
                        {editable ? (
                          <TextField
                            name="SfrAdditionalDetails.PartNumber"
                            value={values?.SfrAdditionalDetails?.PartNumber}
                            onChange={(e) =>
                              setFieldValue(
                                "SfrAdditionalDetails.PartNumber",
                                removeNonAlphaNumeric(e.target.value)
                              )
                            }
                            onBlur={handleBlur}
                            error={
                              !!touched.SfrAdditionalDetails?.PartNumber &&
                              !!errors.SfrAdditionalDetails?.PartNumber
                            }
                            helperText={
                              !!touched.SfrAdditionalDetails?.PartNumber &&
                              errors.SfrAdditionalDetails?.PartNumber
                            }
                            className={"sdr-status-edit"}
                            inputProps={{ maxLength: 24 }}
                          />
                        ) : (
                          values?.SfrAdditionalDetails?.PartNumber
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
                            type="number"
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
                            type="number"
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
                            type="number"
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
                            name="ComponentDetails.ComponentManufacturerName"
                            value={values?.ComponentDetails?.ComponentManufacturerName}
                            onChange={(e) => {
                              setFieldValue(
                                "ComponentDetails.ComponentManufacturerName",
                                e.target.value
                              );
                              setFieldValue(
                                "SfrAdditionalDetails.ComponentManufacturerName",
                                e.target.value
                              );
                            }}
                            onBlur={handleBlur}
                            error={
                              !!touched.ComponentDetails?.ComponentManufacturerName &&
                              !!errors.ComponentDetails?.ComponentManufacturerName
                            }
                            helperText={
                              !!touched.ComponentDetails?.ComponentManufacturerName &&
                              errors.ComponentDetails?.ComponentManufacturerName
                            }
                            className={"sdr-status-edit"}
                            inputProps={{ maxLength: 50 }}
                          />
                        ) : (
                          values?.ComponentDetails?.ComponentManufacturerName || "--"
                        )}
                      </ListItem>
                    </Grid>
                    <Grid item xs={4}>
                      <ListItem>
                        {editable ? (
                          <TextField
                            name="ComponentDetails.ComponentPartNumber"
                            value={values?.ComponentDetails?.ComponentPartNumber}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={
                              !!touched.ComponentDetails?.ComponentPartNumber &&
                              !!errors.ComponentDetails?.ComponentPartNumber
                            }
                            helperText={
                              !!touched.ComponentDetails?.ComponentPartNumber &&
                              errors.ComponentDetails?.ComponentPartNumber
                            }
                            className={"sdr-status-edit"}
                          />
                        ) : (
                          values?.ComponentDetails?.ComponentPartNumber || "--"
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
                            name="ComponentDetails.ComponentPartSerialNumber"
                            value={values?.ComponentDetails?.ComponentPartSerialNumber}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={
                              !!touched.ComponentDetails?.ComponentPartSerialNumber &&
                              !!errors.ComponentDetails?.ComponentPartSerialNumber
                            }
                            helperText={
                              !!touched.ComponentDetails?.ComponentPartSerialNumber &&
                              errors.ComponentDetails?.ComponentPartSerialNumber
                            }
                            className={"sdr-status-edit"}
                          />
                        ) : (
                          values?.ComponentDetails?.ComponentPartSerialNumber || "--"
                        )}
                      </ListItem>
                    </Grid>
                    <Grid item xs={4}>
                      <ListItem>
                        {editable ? (
                          <TextField
                            name="ComponentDetails.ComponentPartModelNumber"
                            value={values?.ComponentDetails?.ComponentPartModelNumber}
                            onChange={(e) => {
                              setFieldValue(
                                "ComponentDetails.ComponentPartModelNumber",
                                e.target.value
                              );
                              setFieldValue("SfrAdditionalDetails.PartModelNumber", e.target.value);
                            }}
                            onBlur={handleBlur}
                            error={
                              !!touched.ComponentDetails?.ComponentPartModelNumber &&
                              !!errors.ComponentDetails?.ComponentPartModelNumber
                            }
                            helperText={
                              !!touched.ComponentDetails?.ComponentPartModelNumber &&
                              errors.ComponentDetails?.ComponentPartModelNumber
                            }
                            className={"sdr-status-edit"}
                            inputProps={{ maxLength: 50 }}
                          />
                        ) : (
                          values?.ComponentDetails?.ComponentPartModelNumber || "--"
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
                            name="ComponentDetails.PartTotalTime"
                            type="number"
                            value={values?.ComponentDetails?.PartTotalTime}
                            onChange={(e) =>
                              setFieldValue(
                                "ComponentDetails.PartTotalTime",
                                removeNonNumericDecimal(e.target.value)
                              )
                            }
                            onBlur={handleBlur}
                            error={
                              !!touched.ComponentDetails?.PartTotalTime &&
                              !!errors.ComponentDetails?.PartTotalTime
                            }
                            helperText={
                              !!touched.ComponentDetails?.PartTotalTime &&
                              errors.ComponentDetails?.PartTotalTime
                            }
                            className={"sdr-status-edit"}
                            placeholder="Up to 3 decimals"
                          />
                        ) : (
                          values?.ComponentDetails?.PartTotalTime || "--"
                        )}
                      </ListItem>
                    </Grid>
                    <Grid item xs={4}>
                      <ListItem>
                        {editable ? (
                          <TextField
                            name="ComponentDetails.PartTotalCycles"
                            type="number"
                            value={values?.ComponentDetails?.PartTotalCycles}
                            onChange={(e) =>
                              setFieldValue(
                                "ComponentDetails.PartTotalCycles",
                                removeNonNumericDecimal(e.target.value)
                              )
                            }
                            onBlur={handleBlur}
                            error={
                              !!touched.ComponentDetails?.PartTotalCycles &&
                              !!errors.ComponentDetails?.PartTotalCycles
                            }
                            helperText={
                              !!touched.ComponentDetails?.PartTotalCycles &&
                              errors.ComponentDetails?.PartTotalCycles
                            }
                            className={"sdr-status-edit"}
                            placeholder="Up to 3 decimals"
                          />
                        ) : (
                          values?.ComponentDetails?.PartTotalCycles || "--"
                        )}
                      </ListItem>
                    </Grid>
                    <Grid item xs={4}>
                      <ListItem>
                        {editable ? (
                          <TextField
                            name="ComponentDetails.PartTimeSince"
                            type="number"
                            value={values?.ComponentDetails?.PartTimeSince}
                            onChange={(e) =>
                              setFieldValue(
                                "ComponentDetails.PartTimeSince",
                                removeNonNumericDecimal(e.target.value)
                              )
                            }
                            onBlur={handleBlur}
                            error={
                              !!touched.ComponentDetails?.PartTimeSince &&
                              !!errors.ComponentDetails?.PartTimeSince
                            }
                            helperText={
                              !!touched.ComponentDetails?.PartTimeSince &&
                              errors.ComponentDetails?.PartTimeSince
                            }
                            className={"sdr-status-edit"}
                            placeholder="Up to 3 decimals"
                          />
                        ) : (
                          values?.ComponentDetails?.PartTimeSince || "--"
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
                            name="ComponentDetails.PartTimeSinceCode"
                            value={values?.ComponentDetails?.PartTimeSinceCode || ""}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={
                              !!touched?.ComponentDetails?.PartTimeSinceCode &&
                              !!errors?.ComponentDetails?.PartTimeSinceCode
                            }
                            helperText={
                              !!touched?.ComponentDetails?.PartTimeSinceCode &&
                              errors?.ComponentDetails?.PartTimeSinceCode
                            }
                            options={PartTimeSinceCodeOptions.sort(
                              (a, b) => a.DisplayOrder - b.DisplayOrder
                            ).map((r) => r.Description)}
                            id="ComponentDetails.PartTimeSinceCode"
                          />
                        ) : (
                          values?.ComponentDetails?.PartTimeSinceCode || "--"
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
                          <SingleSelect
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
                              [...masterData.CorrosionLevels].sort(
                                (a, b) => a.DisplayOrder - b.DisplayOrder
                              )
                            }
                            id="SfrAdditionalDetails.CorrisionLevel"
                          />
                        ) : (
                          masterData?.CorrosionLevels.find(
                            (c) => "" + c.Id === values?.SfrAdditionalDetails?.CorrisionLevel
                          )?.Description || "--"
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
              </div>

              {auth === UserPermission.CRU && (
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
