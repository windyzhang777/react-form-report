import CloseIcon from "@mui/icons-material/Close";
import PrintIcon from "@mui/icons-material/Print";
import { Box, Checkbox, Grid, IconButton } from "@mui/material";
import { Formik } from "formik";
import moment from "moment";
import { Dispatch, SetStateAction, useEffect, useMemo, useState } from "react";
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
  SelectedTab,
  Sides,
  UserPermission,
} from "src/commons/types";
import { DATETIME_REQUEST, DATE_DISPLAY, DATE_HTML_DISPLAY, printAsPage } from "src/helpers";
import { useAppSelector } from "src/redux/hooks";
import "./viewSdrData.css";

export interface IViewSdrDataProps {
  editable: boolean;
  handleUpsertSdrSnapshot: (a: IEditSdrValues, b: SelectedStatus) => void;
  selectedSdr: IViewSdrResult;
  setViewSdrFlag: Dispatch<SetStateAction<boolean>>;
  tabIndex: number;
}

const ViewSdrData = ({
  editable,
  handleUpsertSdrSnapshot,
  selectedSdr,
  setViewSdrFlag,
  tabIndex,
}: IViewSdrDataProps) => {
  const { profileData, auth } = useAppSelector((state) => state.profile);
  const { detailsData, logpageData, masterData }: SdrEsfrRecordDetailsStateType = useAppSelector(
    (state) => state.sdrEsfrRecordDetails
  );
  const [followUpFlag, setFollowUpFlag] = useState<boolean>(
    tabIndex === SelectedTab.FlaggedForFollowUp
  );
  const isReport: boolean = useMemo(() => tabIndex > SelectedTab.Approved, [tabIndex]);

  const initialValues: IEditSdrValues = useMemo(
    () => ({
      SdrId: detailsData?.SdrDetails?.sdrNumber ? +detailsData.SdrDetails.sdrNumber : 0,
      SnapshotId: "",
      Type: selectedSdr?.Type || selectedSdr?.ReportType || "",
      SfrAdditionalDetails: {
        SnapshotId: "",
        AtaCode: detailsData?.AtaCode || detailsData?.FleetInfo?.ATACode || "",
        SubmitterDesignator: "CALA",
        SubmitterType: "A",
        OperatorDesignator: "CALA",
        OperatorType: "G",
        FAAReceivingRegionCode: "GL",
        ReceivingDistrictOffice: "33",
        PartName: detailsData?.SdrDetails?.PartDetails?.PartDescription || "",
        PartManufacturerName: "",
        PartNumber: detailsData?.SdrDetails?.PartDetails?.PartManufacturerSerialNumber || "",
        ComponentName: "",
        ComponentManufacturerName: "",
        PartModelNumber: "",
        FuselageFromSta:
          detailsData?.LocationDetails?.DefectLocationId === 8
            ? detailsData?.LocationDetails?.FromSta || ""
            : "",
        FuselageToSta:
          detailsData?.LocationDetails?.DefectLocationId === 8
            ? detailsData?.LocationDetails?.ToSta || ""
            : "",
        CorrisionLevel:
          detailsData?.DiscrepancyDetails?.DiscrepancyTypeId === 4
            ? masterData?.CorrosionLevels.find(
                (o) => o.Id === detailsData.DiscrepancyDetails?.CorrosionLevelId
              )?.Description || ""
            : "",
        CrackLength:
          detailsData?.DiscrepancyDetails?.DiscrepancyTypeId === 5
            ? detailsData.DiscrepancyDetails?.CrackLength || ""
            : "",
        NumberOfCracks: detailsData?.DiscrepancyDetails?.NumberOfCracks ?? 0,
        WaterlineFrom: "",
        WaterlineTo: "",
        StringerFrom:
          detailsData?.LocationDetails?.DefectLocationId === 8
            ? detailsData.LocationDetails?.FromStr || ""
            : "",
        StringerFromSide:
          detailsData?.LocationDetails?.DefectLocationId === 8
            ? detailsData.LocationDetails?.FromSide || ""
            : "",
        StringerTo:
          detailsData?.LocationDetails?.DefectLocationId === 8
            ? detailsData.LocationDetails?.ToStr || ""
            : "",
        StringerToSide:
          detailsData?.LocationDetails?.DefectLocationId === 8
            ? detailsData.LocationDetails?.ToSide || ""
            : "",
        ButtlineFrom:
          detailsData?.LocationDetails?.DefectLocationId === 4 ||
          detailsData?.LocationDetails?.DefectLocationId === 5
            ? detailsData?.LocationDetails?.FromBLLength || ""
            : "",
        ButtlineFromSide:
          detailsData?.LocationDetails?.DefectLocationId === 4 ||
          detailsData?.LocationDetails?.DefectLocationId === 5
            ? detailsData?.LocationDetails?.FromBL || ""
            : "",
        ButtlineTo:
          detailsData?.LocationDetails?.DefectLocationId === 4 ||
          detailsData?.LocationDetails?.DefectLocationId === 5
            ? detailsData?.LocationDetails?.ToBLLength || ""
            : "",
        ButtlineToSide:
          detailsData?.LocationDetails?.DefectLocationId === 4 ||
          detailsData?.LocationDetails?.DefectLocationId === 5
            ? detailsData?.LocationDetails?.ToBL || ""
            : "",
        WingStationFrom:
          detailsData?.LocationDetails?.DefectLocationId === 19
            ? detailsData?.LocationDetails?.FromSta || ""
            : "",
        WingStationFromSide:
          detailsData?.LocationDetails?.DefectLocationId === 19
            ? detailsData?.LocationDetails?.Side || ""
            : "",
        WingStationTo:
          detailsData?.LocationDetails?.DefectLocationId === 19
            ? detailsData?.LocationDetails?.ToSta || ""
            : "",
        WingStationToSide:
          detailsData?.LocationDetails?.DefectLocationId === 19
            ? detailsData?.LocationDetails?.Side || ""
            : "",
        StructuralOther: detailsData?.DiscrepancyDetails?.DiscrepancyTypeComments || "",
      },
      AircraftDetails: {
        RegistryNNumber: logpageData?.FleetInfo?.LicenseNumber || "",
        Manufacturer: logpageData?.FleetInfo?.ManufacturedBy || "",
        Model: logpageData?.FleetInfo?.ManufacturerPartNumber || "",
        SerialNumber: logpageData?.FleetInfo?.ManufacturerSerialNumber || "",
        TotalTime: String(logpageData?.FleetInfo?.TotalAircraftTime || ""),
        TotalCycles: logpageData?.FleetInfo?.TotalAircraftCycles || "",
      },
      LogPageCreationDate: detailsData?.SdrDetails?.LogPageCreationDate || "",
      Station: detailsData?.Station || logpageData?.FleetInfo?.Station || "",
      LogPageNumber: detailsData?.LogPageNumber || selectedSdr?.LogpageNumber || "",
      AircraftNumber: logpageData?.FleetInfo?.TailNumber || "",
      PrecautionaryProcedureIds: detailsData?.SdrDetails?.PrecautionaryProcedureIds || [],
      NatureOfReportIds: detailsData?.SdrDetails?.NatureOfReportIds || [],
      StageId: detailsData?.SdrDetails?.StageId || 0,
      StatusId: followUpFlag ? SelectedStatus.ApprovedWithFollowUp : SelectedStatus.Approved,
      HowDiscoveredId: detailsData?.SdrDetails?.HowDiscoveredId || 0,
      EmployeeId: `${profileData?.EmployeeId}`,
      EmployeeName: `${profileData?.FirstName} ${profileData?.LastName}`,
      PartDetails: {
        PartTrackingNumber: detailsData?.SdrDetails?.PartDetails?.PartTrackingNumber || "",
        PartManufacturerSerialNumber:
          detailsData?.SdrDetails?.PartDetails?.PartManufacturerSerialNumber || "",
        PartSerialNumber: detailsData?.SdrDetails?.PartDetails?.PartSerialNumber || "",
        PartLocation: detailsData?.SdrDetails?.PartDetails?.PartLocation || "",
        PartCondition: detailsData?.SdrDetails?.PartDetails?.PartCondition || "",
        PartDescription: detailsData?.SdrDetails?.PartDetails?.PartDescription || "",
        PartTotalTime: detailsData?.SdrDetails?.PartDetails?.PartTotalTime || "",
        PartTotalCycles: detailsData?.SdrDetails?.PartDetails?.PartTotalCycles || "",
        PartTimeSince: detailsData?.SdrDetails?.PartDetails?.PartTimeSince || "",
        PartCycleSince: detailsData?.SdrDetails?.PartDetails?.PartCycleSince || "",
      },
      CreatedbyFirstName: detailsData?.CreatedbyFirstName || "",
      CreatedbyLastName: detailsData?.CreatedbyLastName || "",
      ModifiedbyFirstName: `${profileData?.FirstName}`,
      ModifiedbyLastName: `${profileData?.LastName}`,
      CreatedDate: moment(detailsData?.CreatedDate).format(DATETIME_REQUEST) || "",
      CorrectiveAction: detailsData?.FleetInfo?.CorrectiveActions || "",
      OperatorControlNumber:
        detailsData?.OperatorControlNumber || detailsData?.SdrDetails?.OperatorControlNumber || "",
      IsExtracted: false,
      ComponentDetails: {
        ComponentName: "",
        ComponentManufacturerName: "",
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
        ZoneId: detailsData?.LocationDetails?.ZoneId || 0,
        DefectLocationIdentifier: "",
        CoordinateLocationDetails: detailsData?.LocationDetails?.CoordinateLocationDetails || "",
      },
      FlightNumber: logpageData?.FleetInfo?.FlightNumber || "",
      IsMajorRepair: detailsData?.SdrDetails?.IsMajorRepair || false,
      IsSdrReportable: detailsData?.SdrDetails?.IsSdrReportable || false,
    }),
    [detailsData, followUpFlag, logpageData, profileData, selectedSdr]
  );

  useEffect(() => {
    setFollowUpFlag(tabIndex === SelectedTab.FlaggedForFollowUp);
  }, [selectedSdr]);

  return (
    <>
      <FlexColumn id="view-sdr" className={"view-sdr h-full relative"}>
        <FlexBetween className={"subpage-title bottom-divider"} sx={{ pt: "1px" }}>
          <FlexRow>
            Service Difficulty Report - #{selectedSdr?.Id}
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
                      `${initialValues?.EmployeeName}`,
                      `${initialValues?.EmployeeId}`,
                      `${initialValues?.CreatedDate}`,
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
            handleUpsertSdrSnapshot(
              values,
              followUpFlag ? SelectedStatus.ApprovedWithFollowUp : SelectedStatus.Approved
            );
            setTimeout(() => {
              setSubmitting(false);
            }, 500);
          }}
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
            <form
              onSubmit={handleSubmit}
              className={`overflow-hidden mb-[4rem] ${isReport && "max-h-[210vh]"}`}
            >
              <div
                id={`view-${isReport ? "report" : "sdr"}-details`}
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
                      <ListItem>Log Page Number</ListItem>
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
                            // InputProps={{
                            //   endAdornment: (
                            //     <InputAdornment position="end">
                            //       <CalendarMonthIcon />
                            //     </InputAdornment>
                            //   ),
                            // }}
                            name="LogPageCreationDate"
                            value={moment(values.LogPageCreationDate).format(DATE_HTML_DISPLAY)}
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
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={!!touched?.Station && !!errors?.Station}
                            helperText={!!touched?.Station && errors?.Station}
                            className={"sdr-status-edit"}
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
                      <ListItem>Operator Designator</ListItem>
                    </Grid>
                  </Grid>
                  <Grid className={"sdr-status-description"} container spacing={3}>
                    <Grid item xs={4}>
                      <ListItem>
                        {editable ? (
                          <TextField
                            name="SfrAdditionalDetails.SubmitterDesignator"
                            value={values?.SfrAdditionalDetails?.SubmitterDesignator}
                            onChange={handleChange}
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
                            onChange={handleChange}
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
                            onChange={handleChange}
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
                      <ListItem>ATA Code</ListItem>
                    </Grid>
                    <Grid item xs={4}>
                      <ListItem>Nature of Condition</ListItem>
                    </Grid>
                  </Grid>
                  <Grid className={"sdr-status-description"} container spacing={3}>
                    <Grid item xs={4}>
                      <ListItem>
                        {editable ? (
                          <TextField
                            name="SfrAdditionalDetails.OperatorType"
                            value={values?.SfrAdditionalDetails?.OperatorType}
                            onChange={handleChange}
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
                            onChange={handleChange}
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
                          values?.NatureOfReportIds.reduce(
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
                      <ListItem>Precautionary Procedure</ListItem>
                    </Grid>
                    <Grid item xs={4}>
                      <ListItem>Stage of Operation</ListItem>
                    </Grid>
                    <Grid item xs={4}>
                      <ListItem>How Discovered</ListItem>
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
                          values?.PrecautionaryProcedureIds.reduce(
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
                      <ListItem>Discrepancy/Corrective Action Summary</ListItem>
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
                      <ListItem>Major Repair</ListItem>
                    </Grid>
                  </Grid>
                  <Grid className={"sdr-status-description"} container spacing={1}>
                    <Grid item xs={4}>
                      <ListItem>
                        {editable ? (
                          <TextField
                            name="SfrAdditionalDetails.FAAReceivingRegionCode"
                            value={values?.SfrAdditionalDetails?.FAAReceivingRegionCode}
                            onChange={handleChange}
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
                            onChange={handleChange}
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
                      <ListItem>SDR Reportable</ListItem>
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
                            onChange={handleChange}
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
                            onChange={handleChange}
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
                            onChange={handleChange}
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
                            onChange={handleChange}
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
                            onChange={handleChange}
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
                            onChange={handleChange}
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
                            onChange={handleChange}
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
                      <ListItem required={editable && !!values.ComponentDetails.ComponentName}>
                        {"Manufacturer's Name"}
                      </ListItem>
                    </Grid>
                    <Grid item xs={4}>
                      <ListItem required={editable && !!values.ComponentDetails.ComponentName}>
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
                            onChange={handleChange}
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
                            name="ComponentDetails.ComponentManufacturerName"
                            value={values?.ComponentDetails?.ComponentManufacturerName}
                            onChange={handleChange}
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
                      <ListItem required={editable && !!values.ComponentDetails.ComponentName}>
                        Part Serial Number
                      </ListItem>
                    </Grid>
                    <Grid item xs={4}>
                      <ListItem required={editable && !!values.ComponentDetails.ComponentName}>
                        Part Model Number
                      </ListItem>
                    </Grid>
                    <Grid item xs={4}>
                      <ListItem required={editable && !!values.ComponentDetails.ComponentName}>
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
                            onChange={handleChange}
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
                      <ListItem required={editable && !!values.ComponentDetails.ComponentName}>
                        Part Total Time (hours)
                      </ListItem>
                    </Grid>
                    <Grid item xs={4}>
                      <ListItem required={editable && !!values.ComponentDetails.ComponentName}>
                        Part Total Cycles
                      </ListItem>
                    </Grid>
                    <Grid item xs={4}>
                      <ListItem required={editable && !!values.ComponentDetails.ComponentName}>
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
                            onChange={handleChange}
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
                            onChange={handleChange}
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
                            onChange={handleChange}
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
                      <ListItem required={editable && !!values.ComponentDetails.ComponentName}>
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
                            onChange={handleChange}
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
                            onChange={handleChange}
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
                    <Grid item xs={12}>
                      <ListItem>Corrosion Level</ListItem>
                    </Grid>
                  </Grid>
                  <Grid className={"sdr-status-description"} container spacing={3}>
                    <Grid item xs={12}>
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
                            onChange={handleChange}
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
                            value={values?.SfrAdditionalDetails?.NumberOfCracks}
                            onChange={handleChange}
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
                            onChange={handleChange}
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
                            onChange={handleChange}
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
                            onChange={handleChange}
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
                          values?.SfrAdditionalDetails?.StringerFromSide || "--"
                        )}
                      </ListItem>
                    </Grid>
                    <Grid item xs={4}>
                      <ListItem>
                        {editable ? (
                          <TextField
                            name="SfrAdditionalDetails.StringerTo"
                            value={values?.SfrAdditionalDetails?.StringerTo}
                            onChange={handleChange}
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
                          values?.SfrAdditionalDetails?.StringerToSide || "--"
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
                            onChange={handleChange}
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
                          values?.SfrAdditionalDetails?.ButtlineFromSide || "--"
                        )}
                      </ListItem>
                    </Grid>
                    <Grid item xs={4}>
                      <ListItem>
                        {editable ? (
                          <TextField
                            name="SfrAdditionalDetails.ButtlineTo"
                            value={values?.SfrAdditionalDetails?.ButtlineTo}
                            onChange={handleChange}
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
                          values?.SfrAdditionalDetails?.ButtlineToSide || "--"
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
                            onChange={handleChange}
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
                          values?.SfrAdditionalDetails?.WingStationFromSide || "--"
                        )}
                      </ListItem>
                    </Grid>
                    <Grid item xs={4}>
                      <ListItem>
                        {editable ? (
                          <TextField
                            name="SfrAdditionalDetails.WingStationTo"
                            value={values?.SfrAdditionalDetails?.WingStationTo}
                            onChange={handleChange}
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
                          values?.SfrAdditionalDetails?.WingStationToSide || "--"
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
                            onChange={handleChange}
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
                          />
                        ) : (
                          values?.SfrAdditionalDetails?.StructuralOther || "--"
                        )}
                      </ListItem>
                    </Grid>
                  </Grid>
                </Grid>

                <div id="signature" />

                {auth === UserPermission.CRU && tabIndex < SelectedTab.Approved && (
                  <Box
                    my={2}
                    sx={{
                      borderBottom: 1,
                      borderColor: tabIndex < SelectedTab.Approved ? "divider" : "transparent",
                      fontWeight: "600",
                    }}
                  />
                )}

                {/* Flag for follow up */}
                {auth === UserPermission.CRU && tabIndex < SelectedTab.Approved && (
                  <FlexRow mb={2}>
                    <Checkbox
                      sx={{
                        marginLeft: "5px",
                        color: "#6244BB",
                        "&.Mui-checked": {
                          color: "#6244BB",
                        },
                      }}
                      checked={followUpFlag}
                      onChange={() => setFollowUpFlag(!followUpFlag)}
                    />
                    Flag for follow up
                  </FlexRow>
                )}
              </div>

              {auth === UserPermission.CRU && tabIndex < SelectedTab.Approved && (
                <ButtonGroup
                  className="bottom-button justify-end"
                  primaryDisabled={isSubmitting}
                  primaryLabel={"Approve"}
                  primaryOnClick={handleSubmit}
                />
              )}
            </form>
          )}
        </Formik>
      </FlexColumn>
    </>
  );
};

export default ViewSdrData;
