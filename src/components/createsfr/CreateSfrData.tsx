import { Box, Tab, Tabs } from "@mui/material";
import { Formik } from "formik";
import moment from "moment";
import { Dispatch, SetStateAction, SyntheticEvent, useEffect, useMemo, useState } from "react";
import { FlexColumn } from "src/commons/Box";
import ButtonGroup from "src/commons/ButtonGroup";
import { a11yProps } from "src/commons/TabPanel";
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
import ValidationSchema from "src/validationSchema";
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
      ModifiedDate: "",
      CreatedBy: profileData?.EmployeeId || "",
      ModifiedBy: "",
      AirCraftNumber: logpageData?.FleetInfo?.TailNumber || "",
      OriginDetails: {
        IsScheduledInspection: true,
        CalDocId: 0,
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
        IsMajorRepair: true,
        IsSdrReportable: true,
        DamageStructureStatus: "",
        IsOverWeight: true,
        IsEcra: true,
        EcraCode: "",
        Comments: "",
        ManHoursRequired: 0,
        MaterialsUtilized: "",
        Rev: "",
        DipCode: "",
        IsRepairOrRework: true,
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
        CrackLength: 0,
        CrackWidth: 0,
        CrackDepth: 0,
        DiscrepancyTypeComments: "",
        IsSafeOperationEndangered: true,
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
        CreatedDate: "",
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
      DiscrepancyPartInformationCode: 0,
      DocumentType: [],
      SpecIdentifier1: "",
      SpecIdentifier2: "",
      SpecIdentifier3: "1",
      SpecIdentifier4: "",
      CalDocIdentifier1: "",
      CalDocIdentifier2: "",
      CalDocIdentifier3: "",
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
        onSubmit={(values, { resetForm }) => {
          handleCreateSFR(transformCreateSfrValues(values), sdrRequired);
          // resetForm();
        }}
        validationSchema={object().shape({
          LogPageNumber: ValidationSchema.LogPageNumber.required(),
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
        {({ handleSubmit, isSubmitting }) => (
          <form onSubmit={handleSubmit} className="overflow-hidden mb-[4rem] grow">
            <div id="create-sdr-details" className="h-full overflow-y-auto">
              <FlexColumn className="h-full w-full flex !flex-col">
                <Tabs
                  className="bottom-divider"
                  value={tabIndex}
                  onChange={handleTabChange}
                  aria-label="createSfrTabs"
                >
                  <Tab {...a11yProps("sfr", 0)} label="Origin" id="SfrOriginTab" />
                  <Tab {...a11yProps("sfr", 1)} label="Discrepancy" id="SfrDiscrepancyTab" />
                  <Tab {...a11yProps("sfr", 2)} label="Location" id="SfrLocationTab" />
                  <Tab {...a11yProps("sfr", 3)} label="Repair" id="SfrRepairTab" />
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
