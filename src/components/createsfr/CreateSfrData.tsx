import { Box, Tab, Tabs } from "@mui/material";
import { Formik } from "formik";
import moment from "moment";
import { Dispatch, SetStateAction, SyntheticEvent, useEffect, useMemo, useState } from "react";
import { FlexColumn } from "src/commons/Box";
import ButtonGroup from "src/commons/ButtonGroup";
import { TabLabel, a11yProps } from "src/commons/TabPanel";
import { ISaveSfrValues, SdrEsfrRecordDetailsStateType, SelectedStatus } from "src/commons/types";
import { DiscrepancyTab } from "src/components/createsfr/DiscrepancyTab";
import { LocationTab } from "src/components/createsfr/LocationTab";
import { OriginTab } from "src/components/createsfr/OriginTab";
import { RepairTab } from "src/components/createsfr/RepairTab";
import { DATETIME_REQUEST, transformCreateSfrValues } from "src/helpers";
import { resetLogpageDataSuccess } from "src/redux/ducks/getSdrEsfrRecordDetails";
import { useAppDispatch, useAppSelector } from "src/redux/hooks";
import { CreateSfrReq } from "src/types/CreateSfrReq";
import { Type } from "src/types/GetAllEsfrRecordsRes";
import ValidationSchema, { ValidationSchemaSFR, errMsg } from "src/validationSchema";
import { array, number, object } from "yup";
import "./createSfrData.css";

export interface ICreateSfrDataProps {
  createSdrFlag: string;
  handleCreateSFR: (a: CreateSfrReq, b: boolean) => void;
  handleFetchLogpageData: (a: string) => void;
  logpageNumberValue: string;
  setCreateSdrFlag: Dispatch<SetStateAction<string>>;
  setLogpageNumberValue: Dispatch<SetStateAction<string>>;
}

const CreateSfrData = ({
  createSdrFlag,
  handleCreateSFR,
  handleFetchLogpageData,
  logpageNumberValue,
  setCreateSdrFlag,
  setLogpageNumberValue,
}: ICreateSfrDataProps) => {
  const editable = true;
  const dispatch = useAppDispatch();
  const { profileData } = useAppSelector((state) => state.profile);
  const { logpageData }: SdrEsfrRecordDetailsStateType = useAppSelector(
    (state) => state.sdrEsfrRecordDetails
  );
  const [tabIndex, setTabIndex] = useState<number>(0);
  const [sdrRequired, setSdrRequired] = useState<boolean>(false);

  const initialValues: ISaveSfrValues = useMemo(
    () => ({
      Type: "0",
      StatusId: SelectedStatus.Approved,
      LogPageNumber: logpageNumberValue || "",
      Station: logpageData?.FleetInfo?.Station || "",
      CreatedDate: moment().format(DATETIME_REQUEST),
      LogPageCreatedDate: logpageData?.FleetInfo?.Date || "",
      LogPageCreatedBy: "",
      ModifiedDate: moment().format(DATETIME_REQUEST),
      CreatedBy: profileData?.EmployeeId || "",
      ModifiedBy: "",
      AirCraftNumber: logpageData?.FleetInfo?.TailNumber || "",
      OriginDetails: {
        IsScheduledInspection: true,
        CalDocId: 1,
        InspectionType: 0,
        CalDocIdentifier: "",
        SpecIdentifier: "",
        MfrSourceComments: "",
        DetectionMethodId: 0,
        MfrSourceIdentifier: "",
        MfrSourceId: 0,
        Rev: "",
        Op: "",
        DetectionMethodComments: "",
        UnscheduledInspectionTypeId: "",
        UnscheduledInspectionTypeComments: "",
      },
      LocationDetails: {
        ZoneId: 0,
        DefectLocationId: 0,
        Comments: "",
        Surface: "",
        Side: "",
        Specifics: "",
        CoordinateLocationDetails: "",
        LocationType: "",
        FromSta: "",
        ToSta: "",
        FromBL: "",
        ToBL: "",
        FromBLLength: 0,
        ToBLLength: 0,
        SpecificsLocation: "",
        DefectLocationIdentifier: "",
        ToSide: "",
        FromSide: "",
        StaTypeId: 0,
        StaType: "",
        FromStr: "",
        ToStr: "",
        DamageProximityId: 0,
        ElevatorTab: "",
        Fuselage: "",
        Other: "",
        AdditionalLocationDetails: "",
      },
      RepairDetails: {
        IsDeferred: true,
        IsMajorRepair: false,
        IsSdrReportable: true,
        DamageStructureStatus: "",
        IsOverWeight: false,
        IsEcra: true,
        EcraCode: "",
        Comments: "",
        ManHoursRequired: 0,
        MaterialsUtilized: "",
        Rev: "",
        DipCode: "",
        IsRepairOrRework: false,
        RepairType: "",
        RepairTypes: [{ Code: "", Page: "", Fig: "" }],
      },
      DiscrepancyDetails: {
        IsManufacturingLimitExceeded: true,
        DiscrepancyTypeId: "",
        CorrosionLevelId: "",
        CorrosionCauseId: "",
        CorrosionExtentId: "",
        CorrosionCauseComments: "",
        AreMultipleCracksInTheSameLocation: false,
        NumberOfCracks: 0,
        CrackLength: "",
        CrackWidth: "",
        CrackDepth: "",
        DiscrepancyTypeComments: "",
        IsSafeOperationEndangered: false,
        DiscrepancyPartComments: "",
        DiscrepancyPartDetails: [
          {
            AtaCode: "",
            PartNumber: "",
            Structure: "",
            PartDetails: "",
            DiscrepancyPartInformationCode: "",
          },
        ],
      },
      SfrActivity: {
        Comments: "",
        CreatedDate: moment().format(DATETIME_REQUEST),
        EmployeeId: profileData?.EmployeeId || "",
        EmployeeName: profileData?.FirstName + " " + profileData?.LastName || "",
      },
      SdrDetails: {
        LogPageCreationDate: logpageData?.FleetInfo?.Date || "",
        Station: logpageData?.FleetInfo?.Station || "",
        LogPageNumber: logpageNumberValue || "",
        AircraftNumber: logpageData?.FleetInfo?.TailNumber || "",
        PrecautionaryProcedureIds: [],
        NatureOfReportIds: [],
        StageId: 0,
        StatusId: SelectedStatus.Approved,
        HowDiscoveredId: 0,
        EmployeeId: profileData?.EmployeeId || "",
        EmployeeName: profileData?.FirstName + " " + profileData?.LastName || "",
        PartDetails: {
          PartTrackingNumber: "",
          PartManufacturerSerialNumber: "",
          PartSerialNumber: "",
          PartLocation: "",
          PartCondition: "",
          PartDescription: "",
        },
        CreatedbyFirstName: profileData?.FirstName || "",
        CreatedbyLastName: profileData?.LastName || "",
        ModifiedbyFirstName: "",
        ModifiedbyLastName: "",
        CreatedDate: moment().format(DATETIME_REQUEST),
        CorrectiveAction: logpageData?.FleetInfo?.CorrectiveActions || "",
        OperatorControlNumber: "",
        IsExtracted: false,
      },
      CreatedbyFirstName: profileData?.FirstName || "",
      CreatedbyLastName: profileData?.LastName || "",
      ModifiedbyFirstName: "",
      ModifiedbyLastName: "",
      FleetCode: logpageData?.FleetInfo?.FleetCode || "",
      AtaCode: logpageData?.FleetInfo?.ATACode || "",

      searchDescription: "",
      ATAChapter: "",
      ATASubChapter: "",
      PartNumber: "",
      Structure: "",
      DocumentType: [],
      SpecIdentifier1: "",
      SpecIdentifier2: "",
      SpecIdentifier3: "",
      SpecIdentifier4: "",
      CalDocIdentifier1: "",
      CalDocIdentifier2: "",
      CalDocIdentifier3: "1",
      CalDocIdentifier4: "",
      SRM1: "",
      SRM11: "",
      SRM12: "",
      SRM13: "",
      SRM2: "",
      SRM21: "",
      SRM22: "",
      SRM23: "",
      SRM3: "",
      SRM31: "",
      SRM32: "",
      SRM33: "",
      SRMPage: "",
      SRMFig: "",
      AMM1: "",
      AMM11: "",
      AMM12: "",
      AMM13: "",
      AMM2: "",
      AMM21: "",
      AMM22: "",
      AMM23: "",
      AMM3: "",
      AMM31: "",
      AMM32: "",
      AMM33: "",
      AMMPage: "",
      AMMFig: "",
      CMM1: "",
      CMM11: "",
      CMM12: "",
      CMM13: "",
      CMM2: "",
      CMM21: "",
      CMM22: "",
      CMM23: "",
      CMM3: "",
      CMM31: "",
      CMM32: "",
      CMM33: "",
      CMMPage: "",
      CMMFig: "",
      RepairECRA1: "",
      RepairECRA2: "",
    }),
    [logpageData, profileData]
  );

  const handleTabChange = (event: SyntheticEvent, tab: number) => {
    setTabIndex(tab);
  };

  const onClickCancle = () => {
    setCreateSdrFlag("");
  };

  useEffect(() => {
    return () => {
      setLogpageNumberValue("");
      dispatch(resetLogpageDataSuccess());
    };
  }, []);

  return (
    <FlexColumn className={"create-sfr h-full relative"}>
      <Box className={"subpage-title bottom-divider"} sx={{ pt: "1px", mx: "20px", mb: 2 }}>
        <p>Create SFR</p>
      </Box>
      <Formik
        initialValues={initialValues}
        enableReinitialize
        onSubmit={(values, { setSubmitting }) => {
          handleCreateSFR(transformCreateSfrValues(values), sdrRequired);
          setTimeout(() => {
            setSubmitting(false);
          }, 500);
        }}
        validationSchema={object().shape({
          ...ValidationSchemaSFR,
          LogPageNumber: ValidationSchema.LogPageNumber.required(errMsg.required),
          SdrDetails: object().shape({
            PrecautionaryProcedureIds: sdrRequired
              ? ValidationSchema.PrecautionaryProcedureIds
              : array(),
            NatureOfReportIds: sdrRequired ? ValidationSchema.NatureOfReportIds : array(),
            StageId: sdrRequired ? ValidationSchema.StageId : number(),
            HowDiscoveredId: sdrRequired ? ValidationSchema.HowDiscoveredId : number(),
          }),
        })}
      >
        {({ errors, handleSubmit, isSubmitting, touched }) => (
          <form onSubmit={handleSubmit} className="overflow-hidden mb-[4rem] grow">
            <div id="create-sdr-details" className="h-full overflow-y-auto">
              <FlexColumn className="h-full w-full flex !flex-col">
                <Tabs
                  className="bottom-divider"
                  value={tabIndex}
                  onChange={handleTabChange}
                  aria-label="createSfrTabs"
                >
                  <Tab
                    {...a11yProps("sfr", 0)}
                    label={
                      <TabLabel
                        label="Origin"
                        hasError={!!touched["OriginDetails"] && !!errors["OriginDetails"]}
                      />
                    }
                    id="SfrOriginTab"
                  />
                  <Tab
                    {...a11yProps("sfr", 1)}
                    label={
                      <TabLabel
                        label="Discrepancy"
                        hasError={!!touched["DiscrepancyDetails"] && !!errors["DiscrepancyDetails"]}
                      />
                    }
                    id="SfrDiscrepancyTab"
                    disabled={!logpageData}
                  />
                  <Tab
                    {...a11yProps("sfr", 2)}
                    label={
                      <TabLabel
                        label="Location"
                        hasError={!!touched["LocationDetails"] && !!errors["LocationDetails"]}
                      />
                    }
                    id="SfrLocationTab"
                    disabled={!logpageData}
                  />
                  <Tab
                    {...a11yProps("sfr", 3)}
                    label={
                      <TabLabel
                        label="Repair"
                        hasError={
                          (!!touched["RepairDetails"] && !!errors["RepairDetails"]) ||
                          !!errors["SdrDetails"]
                        }
                      />
                    }
                    id="SfrRepairTab"
                    disabled={!logpageData}
                  />
                </Tabs>

                {/* Origin */}
                <OriginTab
                  editable={editable}
                  tabIndex={tabIndex}
                  handleFetchLogpageData={handleFetchLogpageData}
                />

                {/* Discrepancy */}
                <DiscrepancyTab editable={editable} tabIndex={tabIndex} />

                {/* Location */}
                <LocationTab editable={editable} tabIndex={tabIndex} />

                {/* Repair */}
                <RepairTab
                  editable={editable}
                  tabIndex={tabIndex}
                  sdrRequired={sdrRequired}
                  setSdrRequired={setSdrRequired}
                />
              </FlexColumn>
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

export default CreateSfrData;
