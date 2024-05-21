import CloseIcon from "@mui/icons-material/Close";
import PrintIcon from "@mui/icons-material/Print";
import { Box, Checkbox, Grid, IconButton } from "@mui/material";
import { Formik } from "formik";
import { cloneDeep } from "lodash";
import moment from "moment";
import { Dispatch, SetStateAction, useEffect, useMemo, useState } from "react";
import { FlexBetween, FlexColumn, FlexRow } from "src/commons/Box";
import ButtonGroup from "src/commons/ButtonGroup";
import ListItem from "src/commons/ListItem";
import { ArrowMenu } from "src/commons/Menu";
import {
  IEditSdrValues,
  IViewSdrResult,
  SdrEsfrRecordDetailsStateType,
  SelectedStatus,
  SelectedTab,
  UserPermission,
} from "src/commons/types";
import {
  DATETIME_DISPLAY,
  DATE_DISPLAY,
  formatFullName,
  printAsPage,
  transformUpsertSfrValues,
} from "src/helpers";
import { useAppSelector } from "src/redux/hooks";
import { Type } from "src/types/GetAllEsfrRecordsRes";
import { GetSDREsfrRecordDetailsResResult } from "src/types/GetSdrEsfrRecordDetailsRes";
import "./viewSdrData.css";

export interface IViewSdrDataProps {
  editable: boolean;
  handleUpsertSdrSnapshot?: (a: IEditSdrValues, b: SelectedStatus) => void;
  handleUpsertSfrSnapshot?: (a: any, b: SelectedStatus) => void;
  selectedSdr: IViewSdrResult;
  setViewSdrFlag: Dispatch<SetStateAction<boolean>>;
  tabIndex: number;
}

const ViewSdrData = ({
  editable,
  handleUpsertSdrSnapshot,
  handleUpsertSfrSnapshot,
  selectedSdr,
  setViewSdrFlag,
  tabIndex,
}: IViewSdrDataProps) => {
  const { profileData, auth } = useAppSelector((state) => state.profile);
  const { detailsData, masterData }: SdrEsfrRecordDetailsStateType = useAppSelector(
    (state) => state.sdrEsfrRecordDetails
  );
  const [followUpFlag, setFollowUpFlag] = useState<boolean>(
    tabIndex === SelectedTab.FlaggedForFollowUp
  );
  const isReport: boolean = useMemo(() => tabIndex > SelectedTab.Approved, [tabIndex]);
  const isSdr: boolean = useMemo(() => selectedSdr?.Type === Type.SDR, [selectedSdr]);

  const handleSubmit = (values: IEditSdrValues) => {
    if (isSdr) {
      handleUpsertSdrSnapshot &&
        handleUpsertSdrSnapshot(
          values,
          followUpFlag ? SelectedStatus.ApprovedWithFollowUp : SelectedStatus.Approved
        );
    } else {
      if (detailsData) {
        const payload: GetSDREsfrRecordDetailsResResult = cloneDeep(detailsData);
        payload["StatusId"] = followUpFlag
          ? SelectedStatus.ApprovedWithFollowUp
          : SelectedStatus.Approved;
        payload["SdrDetails"]["StatusId"] = followUpFlag
          ? SelectedStatus.ApprovedWithFollowUp
          : SelectedStatus.Approved;
        payload["SdrDetails"]["EmployeeId"] = profileData?.EmployeeId || "";
        payload["SdrDetails"]["EmployeeName"] = formatFullName(
          profileData?.FirstName,
          profileData?.LastName
        );
        payload["SdrDetails"]["ModifiedbyFirstName"] = profileData?.FirstName || "";
        payload["SdrDetails"]["ModifiedbyLastName"] = profileData?.LastName || "";
        payload["ModifiedBy"] = profileData?.EmployeeId || "";
        payload["ModifiedbyFirstName"] = profileData?.FirstName || "";
        payload["ModifiedbyLastName"] = profileData?.LastName || "";
        handleUpsertSfrSnapshot &&
          handleUpsertSfrSnapshot(
            transformUpsertSfrValues({ ...values, ...payload }),
            followUpFlag ? SelectedStatus.ApprovedWithFollowUp : SelectedStatus.Approved
          );
      }
    }
  };

  const initialValues: IEditSdrValues = useMemo(
    () => ({
      SdrId: detailsData?.SdrDetails?.sdrNumber ? +detailsData.SdrDetails?.sdrNumber : 0,
      SnapshotId: "",
      Type: selectedSdr?.Type || selectedSdr?.ReportType || "",
      SfrAdditionalDetails: {
        SnapshotId: "",
        AtaCode: detailsData?.AtaCode || detailsData?.FleetInfo?.ATACode || "",
        SubmitterDesignator: "CALA",
        SubmitterType: "A",
        OperatorDesignator: "CALA",
        OperatorType: "A",
        FAAReceivingRegionCode: "GL",
        ReceivingDistrictOffice: "33",
        PartName: detailsData?.SdrDetails?.PartDetails?.PartName || "",
        PartManufacturerName: detailsData?.SdrDetails?.PartDetails?.PartManufacturerName || "",
        PartNumber: detailsData?.SdrDetails?.PartDetails?.PartManufacturerSerialNumber || "",
        ComponentName: detailsData?.SdrDetails?.ComponentDetails?.ComponentName || "",
        ComponentManufacturerName:
          detailsData?.SdrDetails?.ComponentDetails?.ManufacturerName || "",
        PartModelNumber: detailsData?.SdrDetails?.ComponentDetails?.ModelNumber || "",
        FuselageFromSta:
          detailsData?.LocationDetails?.DefectLocationId === 8
            ? detailsData?.LocationDetails?.FromSta || ""
            : "",
        FuselageToSta:
          detailsData?.LocationDetails?.DefectLocationId === 8
            ? detailsData?.LocationDetails?.ToSta || ""
            : "",
        CorrisionLevel:
          detailsData?.DiscrepancyDetails?.DiscrepancyTypeId === 4 ||
          detailsData?.DiscrepancyDetails?.DiscrepancyTypeId === 6
            ? masterData?.CorrosionLevels.find(
                (o) => o.Id === detailsData.DiscrepancyDetails?.CorrosionLevelId
              )?.Description || ""
            : "",
        CrackLength:
          detailsData?.DiscrepancyDetails?.DiscrepancyTypeId === 5 ||
          detailsData?.DiscrepancyDetails?.DiscrepancyTypeId === 6
            ? detailsData.DiscrepancyDetails?.CrackLength || ""
            : "",
        NumberOfCracks:
          detailsData?.DiscrepancyDetails?.DiscrepancyTypeId === 5 ||
          detailsData?.DiscrepancyDetails?.DiscrepancyTypeId === 6
            ? detailsData?.DiscrepancyDetails?.NumberOfCracks ?? 0
            : "",
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
        RegistryNNumber: detailsData?.FleetInfo?.LicenseNumber || "",
        Manufacturer: detailsData?.FleetInfo?.ManufacturedBy || "",
        Model: detailsData?.FleetInfo?.ManufacturerPartNumber || "",
        SerialNumber: detailsData?.FleetInfo?.ManufacturerSerialNumber || "",
        TotalTime: String(detailsData?.FleetInfo?.TotalAircraftTime || ""),
        TotalCycles: detailsData?.FleetInfo?.TotalAircraftCycles || "",
      },
      EngineDetails: {
        EngineManufacturerName:
          detailsData?.SdrDetails?.EngineDetails?.EngineManufacturerName || "",
        EngineModel: detailsData?.SdrDetails?.EngineDetails?.EngineModel || "",
        EngineSerialNumber: detailsData?.SdrDetails?.EngineDetails?.EngineSerialNumber || "",
        EngineTotalCycles: detailsData?.SdrDetails?.EngineDetails?.EngineTotalCycles || "",
        EngineTotalTime: detailsData?.SdrDetails?.EngineDetails?.EngineTotalTime || "",
      },
      LogPageCreationDate:
        detailsData?.SdrDetails?.LogPageCreationDate || detailsData?.LogPageCreatedDate || "",
      Station: (isSdr ? detailsData?.SdrDetails?.Station : detailsData?.Station) || "",
      LogPageNumber: detailsData?.LogPageNumber || selectedSdr?.LogpageNumber || "",
      AircraftNumber: detailsData?.FleetInfo?.TailNumber || "",
      PrecautionaryProcedureIds: detailsData?.SdrDetails?.PrecautionaryProcedureIds || [],
      NatureOfReportIds: detailsData?.SdrDetails?.NatureOfReportIds || [],
      StageId: detailsData?.SdrDetails?.StageId || 0,
      StatusId: followUpFlag ? SelectedStatus.ApprovedWithFollowUp : SelectedStatus.Approved,
      HowDiscoveredId: detailsData?.SdrDetails?.HowDiscoveredId || 0,
      EmployeeId: profileData?.EmployeeId || "",
      EmployeeName: formatFullName(profileData?.FirstName, profileData?.LastName),
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
        PartManufacturerName: detailsData?.SdrDetails?.PartDetails?.PartManufacturerName || "",
        PartManufacturerPartNumber:
          detailsData?.SdrDetails?.PartDetails?.PartManufacturerPartNumber || "",
        PartName: detailsData?.SdrDetails?.PartDetails?.PartName || "",
        PartType: detailsData?.SdrDetails?.PartDetails?.PartType || "",
      },
      CreatedBy: (isSdr ? detailsData?.SdrDetails?.CreatedBy : detailsData?.CreatedBy) || "",
      CreatedbyFirstName:
        (isSdr ? detailsData?.SdrDetails?.CreatedbyFirstName : detailsData?.CreatedbyFirstName) ||
        "",
      CreatedbyLastName:
        (isSdr ? detailsData?.SdrDetails?.CreatedbyLastName : detailsData?.CreatedbyLastName) || "",
      ModifiedbyFirstName: profileData?.FirstName || "",
      ModifiedbyLastName: profileData?.LastName || "",
      CreatedDate: detailsData?.SdrDetails?.CreatedDate || detailsData?.CreatedDate || "",
      CorrectiveAction: detailsData?.FleetInfo?.CorrectiveActions || "",
      OperatorControlNumber:
        detailsData?.OperatorControlNumber || detailsData?.SdrDetails?.OperatorControlNumber || "",
      IsExtracted: detailsData?.SdrDetails?.IsExtracted || false,
      ComponentDetails: {
        ComponentName: detailsData?.SdrDetails?.ComponentDetails?.ComponentName || "",
        ManufacturerName: detailsData?.SdrDetails?.ComponentDetails?.ManufacturerName || "",
        PartNumber: detailsData?.SdrDetails?.ComponentDetails?.PartNumber || "",
        SerialNumber: detailsData?.SdrDetails?.ComponentDetails?.SerialNumber || "",
        ModelNumber: detailsData?.SdrDetails?.ComponentDetails?.ModelNumber || "",
        ComponentLocation: detailsData?.SdrDetails?.ComponentDetails?.ComponentLocation || "",
        ComponentTotalTime: detailsData?.SdrDetails?.ComponentDetails?.ComponentTotalTime || "",
        ComponentTotalCycles: detailsData?.SdrDetails?.ComponentDetails?.ComponentTotalCycles || "",
        ComponentTimeSince: detailsData?.SdrDetails?.ComponentDetails?.ComponentTimeSince || "",
        ComponentTimeSinceCode:
          detailsData?.SdrDetails?.ComponentDetails?.ComponentTimeSinceCode || "",
      },
      LocationDetails: {
        ZoneId: detailsData?.LocationDetails?.ZoneId || 0,
        DefectLocationIdentifier: "",
        CoordinateLocationDetails: detailsData?.LocationDetails?.CoordinateLocationDetails || "",
      },
      FlightNumber: detailsData?.FleetInfo?.FlightNumber || "",
      IsMajorRepair:
        (isSdr
          ? detailsData?.SdrDetails?.IsMajorRepair
          : detailsData?.RepairDetails?.IsMajorRepair) || false,
      IsSdrReportable:
        (isSdr
          ? detailsData?.SdrDetails?.IsSdrReportable
          : detailsData?.RepairDetails?.IsSdrReportable) || false,
    }),
    [detailsData, followUpFlag, profileData, selectedSdr]
  );

  useEffect(() => {
    setFollowUpFlag(tabIndex === SelectedTab.FlaggedForFollowUp);
  }, [selectedSdr]);

  return (
    <>
      <FlexColumn id="print-sdr" className={"view-sdr h-full relative"}>
        <FlexBetween className={"subpage-title bottom-divider"} sx={{ pt: "1px" }}>
          <FlexRow>
            {`${
              selectedSdr?.ReportType === Type.SDR ? "Significant Findings" : "Service Difficulty"
            } Report - #${selectedSdr?.Id}`}
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
                      `${
                        detailsData?.SdrDetails?.CreatedbyFirstName ||
                        detailsData?.CreatedbyFirstName ||
                        ""
                      } ${
                        detailsData?.SdrDetails?.CreatedbyLastName ||
                        detailsData?.CreatedbyLastName ||
                        ""
                      }`,
                      `${detailsData?.CreatedBy || detailsData?.SdrDetails?.CreatedBy || ""}`,
                      `${
                        moment(detailsData?.SdrDetails?.CreatedDate).format(DATETIME_DISPLAY) || ""
                      }`,
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
            handleSubmit(values);
            setTimeout(() => {
              setSubmitting(false);
            }, 500);
          }}
        >
          {({ handleSubmit, isSubmitting, values }) => (
            <form
              onSubmit={handleSubmit}
              className={`overflow-hidden mb-[4rem] ${isReport && "max-h-[310vh]"}`}
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
                        {moment(values?.CreatedDate).isValid()
                          ? moment(values?.CreatedDate).format(DATE_DISPLAY)
                          : ""}
                      </ListItem>
                    </Grid>
                    <Grid item xs={4}>
                      <ListItem>{values?.LogPageNumber}</ListItem>
                    </Grid>
                    <Grid item xs={4}>
                      <ListItem>{values?.Station}</ListItem>
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
                      <ListItem>{values?.SfrAdditionalDetails?.SubmitterDesignator}</ListItem>
                    </Grid>
                    <Grid item xs={4}>
                      <ListItem>{values?.SfrAdditionalDetails?.SubmitterType}</ListItem>
                    </Grid>
                    <Grid item xs={4}>
                      <ListItem>{values?.SfrAdditionalDetails?.OperatorDesignator}</ListItem>
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
                      <ListItem>{values?.SfrAdditionalDetails?.OperatorType}</ListItem>
                    </Grid>
                    <Grid item xs={4}>
                      <ListItem>{values?.SfrAdditionalDetails?.AtaCode}</ListItem>
                    </Grid>
                    <Grid item xs={4}>
                      <ListItem>
                        {values?.NatureOfReportIds.reduce(
                          (acc, cur) =>
                            (acc += `${acc && ", "}${
                              masterData?.NatureofReports?.find((option) => option.Id === cur)
                                ?.Description
                            }`),
                          ""
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
                        {values?.PrecautionaryProcedureIds.reduce(
                          (acc, cur) =>
                            (acc += `${acc && ", "}${
                              masterData?.PrecautionaryProcedures?.find(
                                (option) => option.Id === cur
                              )?.Description
                            }`),
                          ""
                        )}
                      </ListItem>
                    </Grid>
                    <Grid item xs={4}>
                      <ListItem>
                        {masterData?.Stage.find((option) => option.Id === values?.StageId)
                          ?.Description || ""}
                      </ListItem>
                    </Grid>
                    <Grid item xs={4}>
                      <ListItem>
                        {masterData?.HowDiscovered.find(
                          (option) => option.Id === values?.HowDiscoveredId
                        )?.Description || ""}
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
                      <ListItem>{values?.CorrectiveAction}</ListItem>
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
                      <ListItem>{values?.SfrAdditionalDetails?.FAAReceivingRegionCode}</ListItem>
                    </Grid>
                    <Grid item xs={4}>
                      <ListItem>{values?.SfrAdditionalDetails?.ReceivingDistrictOffice}</ListItem>
                    </Grid>
                    <Grid item xs={4}>
                      <ListItem>{values.IsMajorRepair ? "Y" : "N"}</ListItem>
                    </Grid>
                  </Grid>
                  <Grid className={"sdr-status-item"} container spacing={1}>
                    <Grid item xs={4}>
                      <ListItem>SDR Reportable</ListItem>
                    </Grid>
                  </Grid>
                  <Grid className={"sdr-status-description"} container spacing={1}>
                    <Grid item xs={4}>
                      <ListItem>{values.IsSdrReportable ? "Y" : "N"}</ListItem>
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
                      <ListItem>{values?.PartDetails?.PartName}</ListItem>
                    </Grid>
                    <Grid item xs={4}>
                      <ListItem>{values?.PartDetails?.PartManufacturerName}</ListItem>
                    </Grid>
                    <Grid item xs={4}>
                      <ListItem>{values?.PartDetails?.PartManufacturerSerialNumber}</ListItem>
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
                      <ListItem>{values?.PartDetails?.PartSerialNumber}</ListItem>
                    </Grid>
                    <Grid item xs={4}>
                      <ListItem>{values?.PartDetails?.PartCondition}</ListItem>
                    </Grid>
                    <Grid item xs={4}>
                      <ListItem>{values?.PartDetails?.PartLocation}</ListItem>
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
                      <ListItem>{values?.PartDetails?.PartTotalTime}</ListItem>
                    </Grid>
                    <Grid item xs={4}>
                      <ListItem>{values?.PartDetails?.PartTotalCycles}</ListItem>
                    </Grid>
                    <Grid item xs={4}>
                      <ListItem>{values?.PartDetails?.PartTimeSince}</ListItem>
                    </Grid>
                  </Grid>
                  <Grid className={"sdr-status-item"} container spacing={3}>
                    <Grid item xs={4}>
                      <ListItem>Part Time Since Code</ListItem>
                    </Grid>
                  </Grid>
                  <Grid className={"sdr-status-description"} container spacing={3}>
                    <Grid item xs={4}>
                      <ListItem>{values?.PartDetails?.PartCycleSince}</ListItem>
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
                      <ListItem>{values?.ComponentDetails.ComponentName || "--"}</ListItem>
                    </Grid>
                    <Grid item xs={4}>
                      <ListItem>{values?.ComponentDetails?.ManufacturerName || "--"}</ListItem>
                    </Grid>
                    <Grid item xs={4}>
                      <ListItem>{values?.ComponentDetails?.PartNumber || "--"}</ListItem>
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
                      <ListItem>{values?.ComponentDetails?.SerialNumber || "--"}</ListItem>
                    </Grid>
                    <Grid item xs={4}>
                      <ListItem>{values?.ComponentDetails?.ModelNumber || "--"}</ListItem>
                    </Grid>
                    <Grid item xs={4}>
                      <ListItem>{values?.ComponentDetails?.ComponentLocation || "--"}</ListItem>
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
                      <ListItem>{values?.ComponentDetails?.ComponentTotalTime || "--"}</ListItem>
                    </Grid>
                    <Grid item xs={4}>
                      <ListItem>{values?.ComponentDetails?.ComponentTotalCycles || "--"}</ListItem>
                    </Grid>
                    <Grid item xs={4}>
                      <ListItem>{values?.ComponentDetails?.ComponentTimeSince || "--"}</ListItem>
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
                        {values?.ComponentDetails?.ComponentTimeSinceCode || "--"}
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
                      <ListItem>{values?.SfrAdditionalDetails?.FuselageFromSta || "--"}</ListItem>
                    </Grid>
                    <Grid item xs={4}>
                      <ListItem>{values?.SfrAdditionalDetails?.FuselageToSta || "--"}</ListItem>
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
                      <ListItem>{values?.SfrAdditionalDetails?.CorrisionLevel || "--"}</ListItem>
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
                      <ListItem>{values?.SfrAdditionalDetails?.CrackLength || "--"}</ListItem>
                    </Grid>
                    <Grid item xs={4}>
                      <ListItem>{values?.SfrAdditionalDetails?.NumberOfCracks || "--"}</ListItem>
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
                      <ListItem>{values?.SfrAdditionalDetails?.WaterlineFrom || "--"}</ListItem>
                    </Grid>
                    <Grid item xs={4}>
                      <ListItem>{values?.SfrAdditionalDetails?.WaterlineTo || "--"}</ListItem>
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
                      <ListItem>{values?.SfrAdditionalDetails?.StringerFrom || "--"}</ListItem>
                    </Grid>
                    <Grid item xs={4}>
                      <ListItem>{values?.SfrAdditionalDetails?.StringerFromSide || "--"}</ListItem>
                    </Grid>
                    <Grid item xs={4}>
                      <ListItem>{values?.SfrAdditionalDetails?.StringerTo || "--"}</ListItem>
                    </Grid>
                  </Grid>
                  <Grid className={"sdr-status-item"} container spacing={3}>
                    <Grid item xs={4}>
                      <ListItem>To Side</ListItem>
                    </Grid>
                  </Grid>
                  <Grid className={"sdr-status-description"} container spacing={3}>
                    <Grid item xs={4}>
                      <ListItem>{values?.SfrAdditionalDetails?.StringerToSide || "--"}</ListItem>
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
                      <ListItem>From BL Side</ListItem>
                    </Grid>
                    <Grid item xs={4}>
                      <ListItem>To</ListItem>
                    </Grid>
                  </Grid>
                  <Grid className={"sdr-status-description"} container spacing={3}>
                    <Grid item xs={4}>
                      <ListItem>{values?.SfrAdditionalDetails?.ButtlineFrom || "--"}</ListItem>
                    </Grid>
                    <Grid item xs={4}>
                      <ListItem>{values?.SfrAdditionalDetails?.ButtlineFromSide || "--"}</ListItem>
                    </Grid>
                    <Grid item xs={4}>
                      <ListItem>{values?.SfrAdditionalDetails?.ButtlineTo || "--"}</ListItem>
                    </Grid>
                  </Grid>
                  <Grid className={"sdr-status-item"} container spacing={3}>
                    <Grid item xs={4}>
                      <ListItem>To BL Side</ListItem>
                    </Grid>
                  </Grid>
                  <Grid className={"sdr-status-description"} container spacing={3}>
                    <Grid item xs={4}>
                      <ListItem>{values?.SfrAdditionalDetails?.ButtlineToSide || "--"}</ListItem>
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
                      <ListItem>{values?.SfrAdditionalDetails?.WingStationFrom || "--"}</ListItem>
                    </Grid>
                    <Grid item xs={4}>
                      <ListItem>
                        {values?.SfrAdditionalDetails?.WingStationFromSide || "--"}
                      </ListItem>
                    </Grid>
                    <Grid item xs={4}>
                      <ListItem>{values?.SfrAdditionalDetails?.WingStationTo || "--"}</ListItem>
                    </Grid>
                  </Grid>
                  <Grid className={"sdr-status-item"} container spacing={3}>
                    <Grid item xs={4}>
                      <ListItem>To Side</ListItem>
                    </Grid>
                  </Grid>
                  <Grid className={"sdr-status-description"} container spacing={3}>
                    <Grid item xs={4}>
                      <ListItem>{values?.SfrAdditionalDetails?.WingStationToSide || "--"}</ListItem>
                    </Grid>
                  </Grid>
                  <Grid className={"sdr-status-item"} container spacing={3}>
                    <Grid item xs={4}>
                      <ListItem>Structural Other</ListItem>
                    </Grid>
                  </Grid>
                  <Grid className={"sdr-status-description"} container spacing={3}>
                    <Grid item xs={4}>
                      <ListItem>{values?.SfrAdditionalDetails?.StructuralOther || "--"}</ListItem>
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
