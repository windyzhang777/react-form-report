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
import { DATETIME_REQUEST } from "src/helpers";
import { resetLogpageDataSuccess } from "src/redux/ducks/getSdrEsfrRecordDetails";
import { useAppDispatch, useAppSelector } from "src/redux/hooks";
import { Type } from "src/types/GetAllEsfrRecordsRes";
import "./createSfrData.css";

export interface ICreateSfrDataProps {
  createSdrFlag: string;
  handleCreateSFR: (values: ISaveSfrValues) => void;
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
  const { detailsData }: SdrEsfrRecordDetailsStateType = useAppSelector(
    (state) => state.sdrEsfrRecordDetails
  );
  const [tabIndex, setTabIndex] = useState<number>(0);
  const initialValues: ISaveSfrValues = useMemo(
    () => ({
      SdrId: 0,
      OperatorControlNumber: "",
      SnapshotId: 0,
      Type: 0,
      IsExtracted: false,
      SfrAdditionalDetails: {
        SnapshotId: "",
        SubmitterDesignator: "",
        SubmitterType: "",
        OperatorDesignator: "",
        OperatorType: "",
        AtaCode: "",
        FAAReceivingRegionCode: "",
        ReceivingDistrictOffice: "",
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
        RegistryNNumber: "",
        Manufacturer: "",
        Model: "",
        SerialNumber: "",
        TotalTime: "",
        TotalCycles: "",
      },
      LogPageCreationDate: moment().format(DATETIME_REQUEST),
      Station: "",
      LogPageNumber: logpageNumberValue || "",
      AircraftNumber: "",
      PrecautionaryProcedureIds: [0],
      NatureOfReportIds: [0],
      StageId: 0,
      HowDiscoveredId: 0,
      StatusId: SelectedStatus.Approved,
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
      CreatedDate: moment().format(DATETIME_REQUEST),
      CorrectiveAction: "",
      ScheduledInspection: "Yes",
      DetectionMethod: 0,
      Comments: "",
      Specify: "",
      OtherComments: "",
      CALDocument: 0,
      MFRSource: 0,
      Spec: "",
      WorkCard1: "",
      WorkCard2: "",
      WorkCard3: "",
      WorkCard4: "",
      Spec1: "",
      Spec2: "",
      Spec3: "",
      Spec4: "",
      FCD1: "",
      FCD2: "",
      DIP: "",
      REV: "",
      OP: "",
      MFRSourceCTN: "",
      MFRSourceSSI: "",
      MFRSourceSID: "",
      MFRSourceSSID: "",
      searchDescription: "",
      ExceedLimits: "Yes",
      DiscrepancyType: 0,
      DiscrepancyPartInfo: 0,
      CorrosionExtent: 0,
      CorrosionCause: 0,
      MultipleCracks: "Yes",
      DamageLength: 0,
      DamageWidth: 0,
      DamageDepth: 0,
      OtherStructuralDefectSpecify: "",
      ATAChapter: "",
      ATASubChapter: "",
      Structure: "",
      DiscrepancyComments: "",
      OtherSpecify: "",
      Zone: "",
      LocationDetails: "",
      DefectLocation: 0,
      AileronSide: 0,
      AileronSurface: 0,
      FromBL: 0,
      FromBLText: "",
      ToBL: 0,
      ToBLText: "",
      DamageProximity: 0,
      ElevatorTab: 0,
      Fuselage: 0,
      LEFlap: 0,
      TEFlap: 0,
      Slat: 0,
      Spoiler: 0,
      TEFlapOther: 0,
      Specifics: 0,
      SpecifyDefectLocation: "",
      FromSTR: "",
      ToSTR: "",
      RepairDeferred: "No",
      MajorRepair: "No",
      SDRReportable: "No",
      DamagedStructure: "Replaced",
      WeightIncreaseOver5Lbs: "No",
      PreviousRepairsOrRework: "No",
      DocumentType: [],
      MaterialUtilizedForRepairs: "",
      ManHoursToCompeterRepairs: 0,
      SRM11: "",
      SRM12: "",
      SRM13: "",
      SRM21: "",
      SRM22: "",
      SRM23: "",
      SRM31: "",
      SRM32: "",
      SRM33: "",
      SRMPage: "",
      SRMFig: "",
      RepairREV: "",
      RepairOther: "",
    }),
    [detailsData, profileData]
  );

  const handleTabChange = (event: SyntheticEvent, tab: number) => {
    setTabIndex(tab);
    // setViewSdrFlag(false);
    // setSelectedSdr(null);
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

  useEffect(() => {}, []);

  return (
    <FlexColumn className={"create-sfr h-full relative"}>
      <Box className={"subpage-title bottom-divider"} sx={{ pt: "1px", mx: "20px", mb: 2 }}>
        <p>Create SFR</p>
      </Box>
      <Formik
        initialValues={initialValues}
        enableReinitialize
        onSubmit={(values, { resetForm }) => {
          handleCreateSFR(values);
          resetForm();
        }}
        // validationSchema={object().shape({
        //   ...ValidationSchema,
        //   LogPageNumber: ValidationSchema.LogPageNumber.required(),
        //   AircraftNumber: string(),
        // })}
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
                <OriginTab editable={editable} tabIndex={tabIndex} />

                {/* Discrepancy */}
                <DiscrepancyTab editable={editable} tabIndex={tabIndex} />

                {/* Location */}
                <LocationTab editable={editable} tabIndex={tabIndex} />

                {/* Repair */}
                <RepairTab editable={editable} tabIndex={tabIndex} />
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
