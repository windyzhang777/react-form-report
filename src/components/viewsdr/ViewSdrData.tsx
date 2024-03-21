import { Box, Checkbox, Grid } from "@mui/material";
import { Formik } from "formik";
import moment from "moment";
import { Dispatch, SetStateAction, useEffect, useMemo, useState } from "react";
import { FlexRow } from "src/commons/Box";
import ButtonGroup from "src/commons/ButtonGroup";
import ListItem from "src/commons/ListItem";
import { ArrowMenu } from "src/commons/Menu";
import { MultipleSelect, SingleSelect } from "src/commons/Select";
import TextField from "src/commons/TextField";
import {
  EsfrRecordDetailStateType,
  IEditSdrValues,
  ISaveSdrValues,
  Sides,
  TransformedSdrDataType,
} from "src/commons/types";
import { useAppSelector } from "src/redux/hooks";
import ValidationSchema from "src/validationSchema";
import { array, number, object } from "yup";
import "./viewSdrData.css";

export interface IViewSdrDataProps {
  editable: boolean;
  handleApprove: (a: boolean) => void;
  handleSaveSDR: (a: Partial<ISaveSdrValues>) => void;
  isSdr: boolean;
  selectedSdr: TransformedSdrDataType;
  setEditable: Dispatch<SetStateAction<boolean>>;
  tabIndex: number;
}

const ViewSdrData = ({
  editable,
  handleApprove,
  handleSaveSDR,
  isSdr,
  selectedSdr,
  setEditable,
  tabIndex,
}: IViewSdrDataProps) => {
  const { profileData } = useAppSelector((state) => state.profile);
  const { esfrRecordDetailData, sfrMasterData }: EsfrRecordDetailStateType = useAppSelector(
    (state) => state.esfrRecordDetail
  );
  const [flagFollowUp, setFlagFollowUp] = useState<boolean>(tabIndex === 1);

  const initialValues: IEditSdrValues = useMemo(
    () => ({
      LogPageCreationDate:
        (isSdr
          ? esfrRecordDetailData?.SdrDetails?.createdDate
          : esfrRecordDetailData?.CreatedDate) || moment().toISOString(),
      Station: esfrRecordDetailData?.SdrDetails?.Station || `${profileData?.Station}`,
      LogPageNumber:
        esfrRecordDetailData?.SdrDetails?.LogPageNumber || selectedSdr.LogpageNumber || "",
      AircraftNumber: esfrRecordDetailData?.AirCraftNumber || "",
      PrecautionaryProcedureIds: esfrRecordDetailData?.SdrDetails?.PrecautionaryProcedureIds || [],
      NatureOfReportIds: esfrRecordDetailData?.SdrDetails?.NatureOfReportIds || [],
      StageId: esfrRecordDetailData?.SdrDetails?.StageId || 0,
      StatusId:
        (isSdr ? esfrRecordDetailData?.SdrDetails?.StatusId : esfrRecordDetailData?.StatusId) || 2,
      HowDiscoveredId: esfrRecordDetailData?.SdrDetails?.HowDiscoveredId || 0,
      EmployeeId: `${profileData?.EmployeeId}`,
      EmployeeName: `${profileData?.FirstName} ${profileData?.LastName}`,
      PartDetails: {
        PartTrackingNumber: "",
        PartManufacturerSerialNumber:
          esfrRecordDetailData?.SdrDetails?.PartDetails?.PartManufacturerSerialNumber || "",
        PartSerialNumber: esfrRecordDetailData?.SdrDetails?.PartDetails?.PartSerialNumber || "",
        PartLocation: esfrRecordDetailData?.SdrDetails?.PartDetails?.PartLocation || "",
        PartCondition: esfrRecordDetailData?.SdrDetails?.PartDetails?.PartCondition || "",
        PartDescription: esfrRecordDetailData?.SdrDetails?.PartDetails?.PartDescription || "",
        PartTotalTime: "",
        PartTotalCycles: "",
        PartTimeSince: "",
        PartTimeSinceCode: "",
      },
      PartManufacturerName: "",
      ComponentDetails: {
        ComponentName: "",
        ComponentManufactureName: "",
        ComponentPartNumber: "",
        ComponentPartSerialNumber: "",
        ComponentPartModelNumber: "",
        ComponentLocation: "",
        PartTotalTime: "",
        PartTotalCycles: "",
        PartTimeSince: "",
        PartTimeSinceCode: "",
      },
      CreatedbyFirstName:
        (isSdr
          ? esfrRecordDetailData?.SdrDetails?.CreatedbyFirstName
          : esfrRecordDetailData?.CreatedbyFirstName) || "",
      CreatedbyLastName:
        (isSdr
          ? esfrRecordDetailData?.SdrDetails?.CreatedbyLastName
          : esfrRecordDetailData?.CreatedbyLastName) || "",
      ModifiedbyFirstName: `${profileData?.FirstName}`,
      ModifiedbyLastName: `${profileData?.LastName}`,
      AtaCode: esfrRecordDetailData?.FleetInfo?.ATACode || "",
      SubmitterDesignator: "",
      SubmitterType: "",
      OperatorDesignator: "CALA",
      OperatorType: selectedSdr.Type || "",
      FAAReceivingRegionCode: "GL",
      ReceivingDistrictOffice: "33",
      StructureCausingDifficulty: {
        FuselageFromSTA: esfrRecordDetailData?.LocationDetails?.FromSta || "",
        FuselageToSTA: esfrRecordDetailData?.LocationDetails?.ToSta || "",
        CorrosionLevel:
          sfrMasterData?.CorrosionLevels.find(
            (option) => option.Id === esfrRecordDetailData?.DiscrepancyDetails?.CorrosionLevelId
          )?.Description || "",
        CrackLength: esfrRecordDetailData?.DiscrepancyDetails?.CrackLength || 0,
        NumberofCracks: esfrRecordDetailData?.DiscrepancyDetails?.NumberOfCracks || 0,
        CCCorrosionLevel:
          sfrMasterData?.CorrosionLevels.find(
            (option) => option.Id === esfrRecordDetailData?.DiscrepancyDetails?.CorrosionLevelId
          )?.Description || "",
        CCCrackLength: esfrRecordDetailData?.DiscrepancyDetails?.CrackLength || 0,
        CCNumberofCracks: 0,
        WaterLineFrom: "",
        WaterLineAt: "",
        StringerFrom: "",
        StringerFromSide: esfrRecordDetailData?.LocationDetails?.FromSide || "",
        StringerAt: "",
        StringerAtSide: "",
        ButtLineFrom: "",
        ButtLineFromSide: esfrRecordDetailData?.LocationDetails?.FromSide || "",
        ButtLineAt: "",
        ButtLineAtSide: "",
        WingStationFromSTA: "",
        WingStationFromSide: "",
        WingStationToSTA: "",
        WingStationToSide: "",
        StructuralOther: "",
      },
      CorrectiveActions: esfrRecordDetailData?.FleetInfo?.CorrectiveActions || "",
      LocationDetails: {
        ZoneId: esfrRecordDetailData?.LocationDetails?.ZoneId || 0,
        DefectLocationIdentifier:
          esfrRecordDetailData?.LocationDetails?.DefectLocationIdentifier || "",
        CoordinateLocationDetails:
          esfrRecordDetailData?.LocationDetails?.CoordinateLocationDetails || "",
      },
    }),
    [esfrRecordDetailData, isSdr, profileData, selectedSdr]
  );

  useEffect(() => {
    setFlagFollowUp(tabIndex === 1);
  }, [selectedSdr]);

  const onClickEdit = () => {
    setEditable(!editable);
  };

  const onClickApprove = () => {
    handleApprove(flagFollowUp);
  };

  return (
    <>
      <Grid className={"view-sdr"} item md={12} mb={2}>
        <Box className={"subpage-title bottom-divider"} sx={{ pt: "1px" }}>
          <p>Service Difficulty Report - #{selectedSdr.Id}</p>
        </Box>
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
            <ListItem>{esfrRecordDetailData?.OperatorControlNumber}</ListItem>
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
                  <ListItem>{esfrRecordDetailData?.FleetInfo?.LicenseNumber}</ListItem>
                </Grid>
              </Grid>
              <Grid className={"view-details-dropdown"} container spacing={2}>
                <Grid className={"view-details-left"} item xs={6}>
                  <ListItem>A/C Manufacturer</ListItem>
                </Grid>
                <Grid className={"view-details-right"} item>
                  <ListItem>{esfrRecordDetailData?.FleetInfo?.ManufacturedBy}</ListItem>
                </Grid>
              </Grid>
              <Grid className={"view-details-dropdown"} container spacing={2}>
                <Grid className={"view-details-left"} item xs={6}>
                  <ListItem>A/C Model</ListItem>
                </Grid>
                <Grid className={"view-details-right"} item>
                  <ListItem>{esfrRecordDetailData?.FleetInfo?.ManufacturerPartNumber}</ListItem>
                </Grid>
              </Grid>
              <Grid className={"view-details-dropdown"} container spacing={2}>
                <Grid className={"view-details-left"} item xs={6}>
                  <ListItem>A/C Serial Number</ListItem>
                </Grid>
                <Grid className={"view-details-right"} item>
                  <ListItem>{esfrRecordDetailData?.FleetInfo?.ManufacturerSerialNumber}</ListItem>
                </Grid>
              </Grid>
              <Grid className={"view-details-dropdown"} container spacing={2}>
                <Grid className={"view-details-left"} item xs={6}>
                  <ListItem>A/C Total Time</ListItem>
                </Grid>
                <Grid className={"view-details-right"} item>
                  <ListItem>{esfrRecordDetailData?.FleetInfo?.TotalAircraftTime}</ListItem>
                </Grid>
              </Grid>
              <Grid className={"view-details-dropdown"} container spacing={2}>
                <Grid className={"view-details-left"} item xs={6}>
                  <ListItem>A/C Total Cycles</ListItem>
                </Grid>
                <Grid className={"view-details-right"} item>
                  <ListItem>{esfrRecordDetailData?.FleetInfo?.TotalAircraftCycles}</ListItem>
                </Grid>
              </Grid>
              <Grid className={"view-details-dropdown"} container spacing={2}>
                <Grid className={"view-details-left"} item xs={6}>
                  <ListItem>Flight #</ListItem>
                </Grid>
                <Grid className={"view-details-right"} item>
                  <ListItem>{esfrRecordDetailData?.FleetInfo?.TailNumber}</ListItem>
                </Grid>
              </Grid>
            </ArrowMenu>
          </Grid>
        </Grid>

        <Formik
          initialValues={initialValues}
          enableReinitialize
          onSubmit={(values, { resetForm }) => {
            handleSaveSDR(values);
            resetForm();
          }}
          validationSchema={object().shape({
            ...ValidationSchema,
            PrecautionaryProcedureIds: array(),
            NatureOfReportIds: array(),
            StageId: number(),
            HowDiscoveredId: number(),
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
              <div id="view-sdr-details" className="h-[70vh] overflow-y-auto pb-0 md:pb-[4rem] sm:pb-[10rem]">
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
                          moment(
                            esfrRecordDetailData?.SdrDetails?.createdDate ||
                              esfrRecordDetailData?.CreatedDate
                          ).format("MM/DD/YYYY")
                        )}
                      </ListItem>
                    </Grid>
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
                          />
                        ) : (
                          esfrRecordDetailData?.SdrDetails?.LogPageNumber ||
                          selectedSdr.LogpageNumber
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
                          esfrRecordDetailData?.SdrDetails?.Station
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
                            name="SubmitterDesignator"
                            value={values.SubmitterDesignator || ""}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={!!touched.SubmitterDesignator && !!errors.SubmitterDesignator}
                            helperText={!!touched.SubmitterDesignator && errors.SubmitterDesignator}
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
                            name="SubmitterType"
                            value={values.SubmitterType || ""}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={!!touched.SubmitterType && !!errors.SubmitterType}
                            helperText={!!touched.SubmitterType && errors.SubmitterType}
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
                            name="OperatorDesignator"
                            value={values.OperatorDesignator || ""}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={!!touched.OperatorDesignator && !!errors.OperatorDesignator}
                            helperText={!!touched.OperatorDesignator && errors.OperatorDesignator}
                            className={"sdr-status-edit"}
                            disabled
                          />
                        ) : (
                          "CALA"
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
                            name="OperatorType"
                            value={values.OperatorType || ""}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={!!touched.OperatorType && !!errors.OperatorType}
                            helperText={!!touched.OperatorType && errors.OperatorType}
                            className={"sdr-status-edit"}
                          />
                        ) : (
                          selectedSdr.Type
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
                          esfrRecordDetailData?.FleetInfo?.ATACode
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
                          esfrRecordDetailData?.SdrDetails?.NatureOfReportIds.reduce(
                            (acc, cur) =>
                              (acc += `${acc && ", "}${
                                sfrMasterData?.NatureofReports?.find((option) => option.Id === cur)
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
                              !!touched.PrecautionaryProcedureIds &&
                              errors.PrecautionaryProcedureIds
                            }
                            options={sfrMasterData?.PrecautionaryProcedures?.sort(
                              (a, b) => a.DisplayOrder - b.DisplayOrder
                            )}
                            className={"sdr-status-edit"}
                            id="PrecautionaryProcedures"
                            maxAllowed={4}
                          />
                        ) : (
                          esfrRecordDetailData?.SdrDetails?.PrecautionaryProcedureIds.reduce(
                            (acc, cur) =>
                              (acc += `${acc && ", "}${
                                sfrMasterData?.PrecautionaryProcedures?.find(
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
                          sfrMasterData?.Stage.find(
                            (option) => option.Id === esfrRecordDetailData?.SdrDetails?.StageId
                          )?.Description
                        )}
                      </ListItem>
                    </Grid>
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
                          sfrMasterData?.HowDiscovered.find(
                            (option) =>
                              option.Id === esfrRecordDetailData?.SdrDetails?.HowDiscoveredId
                          )?.Description
                        )}
                      </ListItem>
                    </Grid>
                  </Grid>
                  <Grid className={"sdr-status-item"} container spacing={1}>
                    <Grid item xs={12}>
                      <ListItem>Discrepancy/Corrective Action Summary</ListItem>
                    </Grid>
                  </Grid>
                  <Grid className={"sdr-status-description"} container spacing={1}>
                    <Grid item xs={12}>
                      <ListItem>
                        {editable ? (
                          <TextField
                            name="CorrectiveActions"
                            value={values.CorrectiveActions || ""}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={!!touched.CorrectiveActions && !!errors.CorrectiveActions}
                            helperText={!!touched.CorrectiveActions && errors.CorrectiveActions}
                            multiline
                            maxRows={4}
                            className={"sdr-status-edit textareaAutosize"}
                            inputProps={{ style: { resize: "both" } }}
                          />
                        ) : (
                          esfrRecordDetailData?.FleetInfo?.CorrectiveActions
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
                  </Grid>
                  <Grid className={"sdr-status-description"} container spacing={1}>
                    <Grid item xs={4}>
                      <ListItem>
                        {editable ? (
                          <TextField
                            name="FAAReceivingRegionCode"
                            value={values.FAAReceivingRegionCode || ""}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={
                              !!touched.FAAReceivingRegionCode && !!errors.FAAReceivingRegionCode
                            }
                            helperText={
                              !!touched.FAAReceivingRegionCode && errors.FAAReceivingRegionCode
                            }
                            className={"sdr-status-edit"}
                          />
                        ) : (
                          "GL"
                        )}
                      </ListItem>
                    </Grid>
                    <Grid item xs={4}>
                      <ListItem>
                        {editable ? (
                          <TextField
                            name="ReceivingDistrictOffice"
                            value={values.ReceivingDistrictOffice || ""}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={
                              !!touched.ReceivingDistrictOffice && !!errors.ReceivingDistrictOffice
                            }
                            helperText={
                              !!touched.ReceivingDistrictOffice && errors.ReceivingDistrictOffice
                            }
                            className={"sdr-status-edit"}
                          />
                        ) : (
                          "33"
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
                          esfrRecordDetailData?.SdrDetails?.PartDetails?.PartDescription
                        )}
                      </ListItem>
                    </Grid>
                    <Grid item xs={4}>
                      <ListItem>
                        {editable ? (
                          <TextField
                            name="PartManufacturerName"
                            value={values.PartManufacturerName || ""}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={!!touched.PartManufacturerName && !!errors.PartManufacturerName}
                            helperText={
                              !!touched.PartManufacturerName && errors.PartManufacturerName
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
                          esfrRecordDetailData?.SdrDetails?.PartDetails
                            ?.PartManufacturerSerialNumber
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
                          esfrRecordDetailData?.SdrDetails?.PartDetails?.PartSerialNumber
                        )}
                      </ListItem>
                    </Grid>
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
                          esfrRecordDetailData?.SdrDetails?.PartDetails?.PartCondition
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
                              !!touched.PartDetails?.PartLocation &&
                              errors.PartDetails?.PartLocation
                            }
                            className={"sdr-status-edit"}
                          />
                        ) : (
                          esfrRecordDetailData?.SdrDetails?.PartDetails?.PartLocation
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
                            value={values.PartDetails?.PartTotalTime || ""}
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
                            name="PartDetails.PartTotalCycles"
                            value={values.PartDetails?.PartTotalCycles || ""}
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
                            name="PartDetails.PartTimeSince"
                            value={values.PartDetails?.PartTimeSince || ""}
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
                          />
                        ) : (
                          ""
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
                          <TextField
                            name="PartDetails.PartTimeSinceCode"
                            value={values.PartDetails?.PartTimeSinceCode || ""}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={
                              !!touched.PartDetails?.PartTimeSinceCode &&
                              !!errors.PartDetails?.PartTimeSinceCode
                            }
                            helperText={
                              !!touched.PartDetails?.PartTimeSinceCode &&
                              errors.PartDetails?.PartTimeSinceCode
                            }
                            className={"sdr-status-edit"}
                          />
                        ) : (
                          ""
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
                      <ListItem required={!!values.ComponentDetails.ComponentName}>
                        {"Manufacturer's Name"}
                      </ListItem>
                    </Grid>
                    <Grid item xs={4}>
                      <ListItem required={!!values.ComponentDetails.ComponentName}>
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
                            value={values.ComponentDetails?.ComponentName || ""}
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
                          "--"
                        )}
                      </ListItem>
                    </Grid>
                    <Grid item xs={4}>
                      <ListItem>
                        {editable ? (
                          <TextField
                            name="ComponentDetails.ComponentManufactureName"
                            value={values.ComponentDetails?.ComponentManufactureName || ""}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={
                              !!touched.ComponentDetails?.ComponentManufactureName &&
                              !!errors.ComponentDetails?.ComponentManufactureName
                            }
                            helperText={
                              !!touched.ComponentDetails?.ComponentManufactureName &&
                              errors.ComponentDetails?.ComponentManufactureName
                            }
                            className={"sdr-status-edit"}
                          />
                        ) : (
                          "--"
                        )}
                      </ListItem>
                    </Grid>
                    <Grid item xs={4}>
                      <ListItem>
                        {editable ? (
                          <TextField
                            name="ComponentDetails.ComponentPartNumber"
                            value={values.ComponentDetails?.ComponentPartNumber || ""}
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
                          "--"
                        )}
                      </ListItem>
                    </Grid>
                  </Grid>
                  <Grid className={"sdr-status-item"} container spacing={3}>
                    <Grid item xs={4}>
                      <ListItem required={!!values.ComponentDetails.ComponentName}>
                        Part Serial Number
                      </ListItem>
                    </Grid>
                    <Grid item xs={4}>
                      <ListItem required={!!values.ComponentDetails.ComponentName}>
                        Part Model Number
                      </ListItem>
                    </Grid>
                    <Grid item xs={4}>
                      <ListItem required={!!values.ComponentDetails.ComponentName}>
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
                            value={values.ComponentDetails?.ComponentPartSerialNumber || ""}
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
                          "--"
                        )}
                      </ListItem>
                    </Grid>
                    <Grid item xs={4}>
                      <ListItem>
                        {editable ? (
                          <TextField
                            name="ComponentDetails.ComponentPartModelNumber"
                            value={values.ComponentDetails?.ComponentPartModelNumber || ""}
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
                          "--"
                        )}
                      </ListItem>
                    </Grid>
                    <Grid item xs={4}>
                      <ListItem>
                        {editable ? (
                          <TextField
                            name="ComponentDetails.ComponentLocation"
                            value={values.ComponentDetails?.ComponentLocation || ""}
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
                          "--"
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
                            value={values.ComponentDetails?.PartTotalTime || ""}
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
                          />
                        ) : (
                          "--"
                        )}
                      </ListItem>
                    </Grid>
                    <Grid item xs={4}>
                      <ListItem>
                        {editable ? (
                          <TextField
                            name="ComponentDetails.PartTotalCycles"
                            value={values.ComponentDetails?.PartTotalCycles || ""}
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
                          />
                        ) : (
                          "--"
                        )}
                      </ListItem>
                    </Grid>
                    <Grid item xs={4}>
                      <ListItem>
                        {editable ? (
                          <TextField
                            name="ComponentDetails.PartTimeSince"
                            value={values.ComponentDetails?.PartTimeSince || ""}
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
                          />
                        ) : (
                          "--"
                        )}
                      </ListItem>
                    </Grid>
                  </Grid>
                  <Grid className={"sdr-status-item"} container spacing={3}>
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
                            name="ComponentDetails.PartTimeSinceCode"
                            value={values.ComponentDetails?.PartTimeSinceCode || ""}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={
                              !!touched.ComponentDetails?.PartTimeSinceCode &&
                              !!errors.ComponentDetails?.PartTimeSinceCode
                            }
                            helperText={
                              !!touched.ComponentDetails?.PartTimeSinceCode &&
                              errors.ComponentDetails?.PartTimeSinceCode
                            }
                            className={"sdr-status-edit"}
                          />
                        ) : (
                          "--"
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
                            name="StructureCausingDifficulty.FuselageFromSTA"
                            value={values.StructureCausingDifficulty?.FuselageFromSTA || ""}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={
                              !!touched.StructureCausingDifficulty?.FuselageFromSTA &&
                              !!errors.StructureCausingDifficulty?.FuselageFromSTA
                            }
                            helperText={
                              !!touched.StructureCausingDifficulty?.FuselageFromSTA &&
                              errors.StructureCausingDifficulty?.FuselageFromSTA
                            }
                            className={"sdr-status-edit"}
                          />
                        ) : (
                          esfrRecordDetailData?.LocationDetails?.FromSta || "--"
                        )}
                      </ListItem>
                    </Grid>
                    <Grid item xs={4}>
                      <ListItem>
                        {editable ? (
                          <TextField
                            name="StructureCausingDifficulty.FuselageToSTA"
                            value={values.StructureCausingDifficulty?.FuselageToSTA || ""}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={
                              !!touched.StructureCausingDifficulty?.FuselageToSTA &&
                              !!errors.StructureCausingDifficulty?.FuselageToSTA
                            }
                            helperText={
                              !!touched.StructureCausingDifficulty?.FuselageToSTA &&
                              errors.StructureCausingDifficulty?.FuselageToSTA
                            }
                            className={"sdr-status-edit"}
                          />
                        ) : (
                          esfrRecordDetailData?.LocationDetails?.ToSta || "--"
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
                            name="StructureCausingDifficulty.CorrosionLevel"
                            value={values.StructureCausingDifficulty?.CorrosionLevel || ""}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={
                              !!touched.StructureCausingDifficulty?.CorrosionLevel &&
                              !!errors.StructureCausingDifficulty?.CorrosionLevel
                            }
                            helperText={
                              !!touched.StructureCausingDifficulty?.CorrosionLevel &&
                              errors.StructureCausingDifficulty?.CorrosionLevel
                            }
                            options={sfrMasterData?.CorrosionLevels?.sort(
                              (a, b) => a.DisplayOrder - b.DisplayOrder
                            )}
                            className={"sdr-status-edit"}
                            id="StructureCausingDifficulty.CorrosionLevel"
                          />
                        ) : (
                          "--"
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
                            type="number"
                            name="StructureCausingDifficulty.CrackLength"
                            value={values.StructureCausingDifficulty?.CrackLength || ""}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={
                              !!touched.StructureCausingDifficulty?.CrackLength &&
                              !!errors.StructureCausingDifficulty?.CrackLength
                            }
                            helperText={
                              !!touched.StructureCausingDifficulty?.CrackLength &&
                              errors.StructureCausingDifficulty?.CrackLength
                            }
                            className={"sdr-status-edit"}
                          />
                        ) : (
                          "--"
                        )}
                      </ListItem>
                    </Grid>
                    <Grid item xs={4}>
                      <ListItem>
                        {editable ? (
                          <TextField
                            type="number"
                            name="StructureCausingDifficulty.NumberofCracks"
                            value={values.StructureCausingDifficulty?.NumberofCracks || ""}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={
                              !!touched.StructureCausingDifficulty?.NumberofCracks &&
                              !!errors.StructureCausingDifficulty?.NumberofCracks
                            }
                            helperText={
                              !!touched.StructureCausingDifficulty?.NumberofCracks &&
                              errors.StructureCausingDifficulty?.NumberofCracks
                            }
                            className={"sdr-status-edit"}
                          />
                        ) : (
                          "--"
                        )}
                      </ListItem>
                    </Grid>
                  </Grid>
                  <Grid className={"sdr-status-section-title"} container spacing={3}>
                    <Grid item xs={12}>
                      <ListItem>Corrosion and Crack</ListItem>
                    </Grid>
                  </Grid>
                  <Grid className={"sdr-status-item"} container spacing={3}>
                    <Grid item xs={4}>
                      <ListItem>Corrosion Level</ListItem>
                    </Grid>
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
                          <SingleSelect
                            name="StructureCausingDifficulty.CCCorrosionLevel"
                            value={values.StructureCausingDifficulty?.CCCorrosionLevel || ""}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={
                              !!touched.StructureCausingDifficulty?.CCCorrosionLevel &&
                              !!errors.StructureCausingDifficulty?.CCCorrosionLevel
                            }
                            helperText={
                              !!touched.StructureCausingDifficulty?.CCCorrosionLevel &&
                              errors.StructureCausingDifficulty?.CCCorrosionLevel
                            }
                            options={sfrMasterData?.CorrosionLevels?.sort(
                              (a, b) => a.DisplayOrder - b.DisplayOrder
                            )}
                            className={"sdr-status-edit"}
                            id="StructureCausingDifficulty.CCCorrosionLevel"
                          />
                        ) : (
                          "--"
                        )}
                      </ListItem>
                    </Grid>
                    <Grid item xs={4}>
                      <ListItem>
                        {editable ? (
                          <TextField
                            type="number"
                            name="StructureCausingDifficulty.CCCrackLength"
                            value={values.StructureCausingDifficulty?.CCCrackLength || ""}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={
                              !!touched.StructureCausingDifficulty?.CCCrackLength &&
                              !!errors.StructureCausingDifficulty?.CCCrackLength
                            }
                            helperText={
                              !!touched.StructureCausingDifficulty?.CCCrackLength &&
                              errors.StructureCausingDifficulty?.CCCrackLength
                            }
                            className={"sdr-status-edit"}
                          />
                        ) : (
                          "--"
                        )}
                      </ListItem>
                    </Grid>
                    <Grid item xs={4}>
                      <ListItem>
                        {editable ? (
                          <TextField
                            type="number"
                            name="StructureCausingDifficulty.CCNumberofCracks"
                            value={values.StructureCausingDifficulty?.CCNumberofCracks || ""}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={
                              !!touched.StructureCausingDifficulty?.CCNumberofCracks &&
                              !!errors.StructureCausingDifficulty?.CCNumberofCracks
                            }
                            helperText={
                              !!touched.StructureCausingDifficulty?.CCNumberofCracks &&
                              errors.StructureCausingDifficulty?.CCNumberofCracks
                            }
                            className={"sdr-status-edit"}
                          />
                        ) : (
                          "--"
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
                            name="StructureCausingDifficulty.WaterLineFrom"
                            value={values.StructureCausingDifficulty?.WaterLineFrom || ""}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={
                              !!touched.StructureCausingDifficulty?.WaterLineFrom &&
                              !!errors.StructureCausingDifficulty?.WaterLineFrom
                            }
                            helperText={
                              !!touched.StructureCausingDifficulty?.WaterLineFrom &&
                              errors.StructureCausingDifficulty?.WaterLineFrom
                            }
                            className={"sdr-status-edit"}
                          />
                        ) : (
                          "--"
                        )}
                      </ListItem>
                    </Grid>
                    <Grid item xs={4}>
                      <ListItem>
                        {editable ? (
                          <TextField
                            name="StructureCausingDifficulty.WaterLineAt"
                            value={values.StructureCausingDifficulty?.WaterLineAt || ""}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={
                              !!touched.StructureCausingDifficulty?.WaterLineAt &&
                              !!errors.StructureCausingDifficulty?.WaterLineAt
                            }
                            helperText={
                              !!touched.StructureCausingDifficulty?.WaterLineAt &&
                              errors.StructureCausingDifficulty?.WaterLineAt
                            }
                            className={"sdr-status-edit"}
                          />
                        ) : (
                          "--"
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
                            name="StructureCausingDifficulty.StringerFrom"
                            value={values.StructureCausingDifficulty?.StringerFrom || ""}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={
                              !!touched.StructureCausingDifficulty?.StringerFrom &&
                              !!errors.StructureCausingDifficulty?.StringerFrom
                            }
                            helperText={
                              !!touched.StructureCausingDifficulty?.StringerFrom &&
                              errors.StructureCausingDifficulty?.StringerFrom
                            }
                            className={"sdr-status-edit"}
                          />
                        ) : (
                          "--"
                        )}
                      </ListItem>
                    </Grid>
                    <Grid item xs={4}>
                      <ListItem>
                        {editable ? (
                          <SingleSelect
                            name="StructureCausingDifficulty.StringerFromSide"
                            value={values.StructureCausingDifficulty?.StringerFromSide || ""}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={
                              !!touched.StructureCausingDifficulty?.StringerFromSide &&
                              !!errors.StructureCausingDifficulty?.StringerFromSide
                            }
                            helperText={
                              !!touched.StructureCausingDifficulty?.StringerFromSide &&
                              errors.StructureCausingDifficulty?.StringerFromSide
                            }
                            options={Sides.sort((a, b) => a.DisplayOrder - b.DisplayOrder)}
                            className={"sdr-status-edit"}
                            id="StructureCausingDifficulty.StringerFromSide"
                          />
                        ) : (
                          "--"
                        )}
                      </ListItem>
                    </Grid>
                    <Grid item xs={4}>
                      <ListItem>
                        {editable ? (
                          <TextField
                            name="StructureCausingDifficulty.StringerAt"
                            value={values.StructureCausingDifficulty?.StringerAt || ""}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={
                              !!touched.StructureCausingDifficulty?.StringerAt &&
                              !!errors.StructureCausingDifficulty?.StringerAt
                            }
                            helperText={
                              !!touched.StructureCausingDifficulty?.StringerAt &&
                              errors.StructureCausingDifficulty?.StringerAt
                            }
                            className={"sdr-status-edit"}
                          />
                        ) : (
                          "--"
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
                          <SingleSelect
                            name="StructureCausingDifficulty.StringerAtSide"
                            value={values.StructureCausingDifficulty?.StringerAtSide || ""}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={
                              !!touched.StructureCausingDifficulty?.StringerAtSide &&
                              !!errors.StructureCausingDifficulty?.StringerAtSide
                            }
                            helperText={
                              !!touched.StructureCausingDifficulty?.StringerAtSide &&
                              errors.StructureCausingDifficulty?.StringerAtSide
                            }
                            options={Sides.sort((a, b) => a.DisplayOrder - b.DisplayOrder)}
                            className={"sdr-status-edit"}
                            id="StructureCausingDifficulty.StringerAtSide"
                          />
                        ) : (
                          "--"
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
                            name="StructureCausingDifficulty.ButtLineFrom"
                            value={values.StructureCausingDifficulty?.ButtLineFrom || ""}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={
                              !!touched.StructureCausingDifficulty?.ButtLineFrom &&
                              !!errors.StructureCausingDifficulty?.ButtLineFrom
                            }
                            helperText={
                              !!touched.StructureCausingDifficulty?.ButtLineFrom &&
                              errors.StructureCausingDifficulty?.ButtLineFrom
                            }
                            className={"sdr-status-edit"}
                          />
                        ) : (
                          "--"
                        )}
                      </ListItem>
                    </Grid>
                    <Grid item xs={4}>
                      <ListItem>
                        {editable ? (
                          <SingleSelect
                            name="StructureCausingDifficulty.ButtLineFromSide"
                            value={values.StructureCausingDifficulty?.ButtLineFromSide || ""}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={
                              !!touched.StructureCausingDifficulty?.ButtLineFromSide &&
                              !!errors.StructureCausingDifficulty?.ButtLineFromSide
                            }
                            helperText={
                              !!touched.StructureCausingDifficulty?.ButtLineFromSide &&
                              errors.StructureCausingDifficulty?.ButtLineFromSide
                            }
                            options={Sides.sort((a, b) => a.DisplayOrder - b.DisplayOrder)}
                            className={"sdr-status-edit"}
                            id="StructureCausingDifficulty.ButtLineFromSide"
                          />
                        ) : (
                          "--"
                        )}
                      </ListItem>
                    </Grid>
                    <Grid item xs={4}>
                      <ListItem>
                        {editable ? (
                          <TextField
                            name="StructureCausingDifficulty.ButtLineAt"
                            value={values.StructureCausingDifficulty?.ButtLineAt || ""}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={
                              !!touched.StructureCausingDifficulty?.ButtLineAt &&
                              !!errors.StructureCausingDifficulty?.ButtLineAt
                            }
                            helperText={
                              !!touched.StructureCausingDifficulty?.ButtLineAt &&
                              errors.StructureCausingDifficulty?.ButtLineAt
                            }
                            className={"sdr-status-edit"}
                          />
                        ) : (
                          "--"
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
                          <SingleSelect
                            name="StructureCausingDifficulty.ButtLineAtSide"
                            value={values.StructureCausingDifficulty?.ButtLineAtSide || ""}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={
                              !!touched.StructureCausingDifficulty?.ButtLineAtSide &&
                              !!errors.StructureCausingDifficulty?.ButtLineAtSide
                            }
                            helperText={
                              !!touched.StructureCausingDifficulty?.ButtLineAtSide &&
                              errors.StructureCausingDifficulty?.ButtLineAtSide
                            }
                            options={Sides.sort((a, b) => a.DisplayOrder - b.DisplayOrder)}
                            className={"sdr-status-edit"}
                            id="StructureCausingDifficulty.ButtLineAtSide"
                          />
                        ) : (
                          "--"
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
                            name="StructureCausingDifficulty.WingStationFromSTA"
                            value={values.StructureCausingDifficulty?.WingStationFromSTA || ""}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={
                              !!touched.StructureCausingDifficulty?.WingStationFromSTA &&
                              !!errors.StructureCausingDifficulty?.WingStationFromSTA
                            }
                            helperText={
                              !!touched.StructureCausingDifficulty?.WingStationFromSTA &&
                              errors.StructureCausingDifficulty?.WingStationFromSTA
                            }
                            className={"sdr-status-edit"}
                          />
                        ) : (
                          "--"
                        )}
                      </ListItem>
                    </Grid>
                    <Grid item xs={4}>
                      <ListItem>
                        {editable ? (
                          <SingleSelect
                            name="StructureCausingDifficulty.WingStationFromSide"
                            value={values.StructureCausingDifficulty?.WingStationFromSide || ""}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={
                              !!touched.StructureCausingDifficulty?.WingStationFromSide &&
                              !!errors.StructureCausingDifficulty?.WingStationFromSide
                            }
                            helperText={
                              !!touched.StructureCausingDifficulty?.WingStationFromSide &&
                              errors.StructureCausingDifficulty?.WingStationFromSide
                            }
                            options={Sides.sort((a, b) => a.DisplayOrder - b.DisplayOrder)}
                            className={"sdr-status-edit"}
                            id="StructureCausingDifficulty.WingStationFromSide"
                          />
                        ) : (
                          "--"
                        )}
                      </ListItem>
                    </Grid>
                    <Grid item xs={4}>
                      <ListItem>
                        {editable ? (
                          <TextField
                            name="StructureCausingDifficulty.WingStationToSTA"
                            value={values.StructureCausingDifficulty?.WingStationToSTA || ""}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={
                              !!touched.StructureCausingDifficulty?.WingStationToSTA &&
                              !!errors.StructureCausingDifficulty?.WingStationToSTA
                            }
                            helperText={
                              !!touched.StructureCausingDifficulty?.WingStationToSTA &&
                              errors.StructureCausingDifficulty?.WingStationToSTA
                            }
                            className={"sdr-status-edit"}
                          />
                        ) : (
                          "--"
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
                          <SingleSelect
                            name="StructureCausingDifficulty.WingStationToSide"
                            value={values.StructureCausingDifficulty?.WingStationToSide || ""}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={
                              !!touched.StructureCausingDifficulty?.WingStationToSide &&
                              !!errors.StructureCausingDifficulty?.WingStationToSide
                            }
                            helperText={
                              !!touched.StructureCausingDifficulty?.WingStationToSide &&
                              errors.StructureCausingDifficulty?.WingStationToSide
                            }
                            options={Sides.sort((a, b) => a.DisplayOrder - b.DisplayOrder)}
                            className={"sdr-status-edit"}
                            id="StructureCausingDifficulty.WingStationToSide"
                          />
                        ) : (
                          "--"
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
                            name="StructureCausingDifficulty.StructuralOther"
                            value={values.StructureCausingDifficulty?.StructuralOther || ""}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={
                              !!touched.StructureCausingDifficulty?.StructuralOther &&
                              !!errors.StructureCausingDifficulty?.StructuralOther
                            }
                            helperText={
                              !!touched.StructureCausingDifficulty?.StructuralOther &&
                              errors.StructureCausingDifficulty?.StructuralOther
                            }
                            className={"sdr-status-edit"}
                          />
                        ) : (
                          "--"
                        )}
                      </ListItem>
                    </Grid>
                  </Grid>
                </Grid>

                <Box
                  my={2}
                  sx={{
                    borderBottom: 1,
                    borderColor: tabIndex !== 2 ? "divider" : "transparent",
                    fontWeight: "600",
                  }}
                />

                {/* Flag for follow up */}
                {tabIndex !== 2 && (
                  <FlexRow mb={2}>
                    <Checkbox
                      sx={{
                        marginLeft: "5px",
                        color: "#6244BB",
                        "&.Mui-checked": {
                          color: "#6244BB",
                        },
                      }}
                      checked={flagFollowUp}
                      onChange={() => setFlagFollowUp(!flagFollowUp)}
                    />
                    Flag for follow up
                  </FlexRow>
                )}
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
                  paddingTop: "10px",
                  textTransform: "none",
                  position: "sticky",
                  bottom: 0,
                  backgroundColor: "#fff",
                }}
              >
                <ButtonGroup
                  className="justify-end"
                  primarydisabled={isSubmitting}
                  primaryLabel={editable ? "Save" : tabIndex !== 2 ? "Approve" : ""}
                  primaryOnClick={editable ? handleSubmit : onClickApprove}
                  secondaryLabel={editable ? "Cancel" : tabIndex === 2 ? "Edit" : ""}
                  secondaryOnClick={onClickEdit}
                />
              </Grid>
            </form>
          )}
        </Formik>
      </Grid>
    </>
  );
};

export default ViewSdrData;
