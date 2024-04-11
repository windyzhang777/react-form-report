import { CreateSfrReq } from "src/types/CreateSfrReq";
import { ExtractSDRRecordsResResult } from "src/types/ExtractSdrRecordsRes";
import { GetAllEsfrRecordsResResult, Status } from "src/types/GetAllEsfrRecordsRes";
import { AircraftDetails, GetApprovedSDRResResult } from "src/types/GetApprovedSdrRes";
import { GetCpcpReportReq } from "src/types/GetCpcpReportReq";
import { GetCpcpReportResResult } from "src/types/GetCpcpReportRes";
import { GetCtnResResult } from "src/types/GetCtnRes";
import { GetDiscrepancyPartsReportReq } from "src/types/GetDiscrepancyPartsReportReq";
import { GetPartsReportResResult } from "src/types/GetDiscrepancyPartsReportRes";
import { GetEsfrReportReq } from "src/types/GetEsfrReportReq";
import { GetEsfrReportResResult } from "src/types/GetEsfrReportRes";
import { Employee, GetProfileResResult } from "src/types/GetProfilerRes";
import { GetSDREsfrRecordDetailsResResult } from "src/types/GetSdrEsfrRecordDetailsRes";
import { GetSfrMasterDataResResult, OptionDocument } from "src/types/GetSfrMasterDataRes";
import { PartDetails, UpsertSDRSnapshotReq } from "src/types/UpsertSdrSnapshotReq";
import { ViewLogpageResResult } from "src/types/ViewLogpageRes";
import config from "src/utils/env.config";

export enum UserPermission {
  Invalid = 0,
  R = 1,
  CRU = 2,
}

export enum SelectedTab {
  Open = 0,
  FlaggedForFollowUp = 1,
  Approved = 2,
}

export enum SelectedSfrTab {
  Origin = 0,
  Discrepancy = 1,
  Location = 2,
  Repair = 3,
}

export enum SelectedStatus {
  Draft = 1,
  Open = 2,
  ApprovedWithFollowUp = 3,
  Approved = 4,
}

export enum RadioType {
  Yes = "Yes",
  No = "No",
}

export interface ICreateSfrReqNoSdr extends Omit<CreateSfrReq, "SdrDetails"> {}

export interface ISaveSfrValues extends CreateSfrReq {
  searchDescription: String;
  ATAChapter: string;
  ATASubChapter: string;
  PartNumber: string;
  Structure: string;
  DiscrepancyPartInformationCode: number;
  DocumentType: number[];
  SpecIdentifier1: string;
  SpecIdentifier2: string;
  SpecIdentifier3: string;
  SpecIdentifier4: string;
  CalDocIdentifier1: string;
  CalDocIdentifier2: string;
  CalDocIdentifier3: string;
  CalDocIdentifier4: string;
  SRM1: string;
  SRM11: string;
  SRM12: string;
  SRM13: string;
  SRM2: string;
  SRM21: string;
  SRM22: string;
  SRM23: string;
  SRM3: string;
  SRM31: string;
  SRM32: string;
  SRM33: string;
  SRMPage: string;
  SRMFig: string;
  AMM1: string;
  AMM11: string;
  AMM12: string;
  AMM13: string;
  AMM2: string;
  AMM21: string;
  AMM22: string;
  AMM23: string;
  AMM3: string;
  AMM31: string;
  AMM32: string;
  AMM33: string;
  AMMPage: string;
  AMMFig: string;
  CMM1: string;
  CMM11: string;
  CMM12: string;
  CMM13: string;
  CMM2: string;
  CMM21: string;
  CMM22: string;
  CMM23: string;
  CMM3: string;
  CMM31: string;
  CMM32: string;
  CMM33: string;
  CMMPage: string;
  CMMFig: string;
  RepairECRA1: string;
  RepairECRA2: string;
}

export interface IReportSearchValues extends GetEsfrReportReq {}

export interface ICpcpReportSearchValues extends GetCpcpReportReq {
  fleetList: string[];
}

export interface IDiscrepancyPartsReportSearchValues extends GetDiscrepancyPartsReportReq {
  fleetList: string[];
}

export interface ISaveSdrValues extends Omit<UpsertSDRSnapshotReq, "SfrAdditionalDetails"> {
  Powerplant: Omit<AircraftDetails, "RegistryNNumber">;
  AtaCode: string;
  FlightNumber: string;
}

export interface IEditSdrValues extends Omit<UpsertSDRSnapshotReq, "PartDetails"> {
  LocationDetails: ILocationDetails;
  ComponentDetails: IComponentDetails & AdditionalPartValues;
  PartDetails: PartDetails & AdditionalPartValues;
  CCCorrosionLevel: string;
  CCCrackLength: string;
  CCNumberofCracks: number;
}

export interface AdditionalPartValues {
  PartTotalTime: string;
  PartTotalCycles: string;
  PartTimeSince: string;
  PartTimeSinceCode: string;
}

export interface IComponentDetails {
  ComponentName: string;
  ComponentManufactureName: string;
  ComponentPartNumber: string;
  ComponentPartSerialNumber: string;
  ComponentPartModelNumber: string;
  ComponentLocation: string;
}

export interface IStructureCausingDifficulty {
  FuselageFromSta: string;
  FuselageToSta: string;
  CorrisionLevel: string;
  CrackLength: number;
  NumberofCracks: number;
  CCCorrisionLevel: string;
  CCCrackLength: number;
  CCNumberofCracks: number;
  WaterlineFrom: string;
  WaterlineAt: string;
  StringerFrom: string;
  StringerFromSide: string;
  StringerAt: string;
  StringerAtSide: string;
  ButtlineFrom: string;
  ButtlineFromSide: string;
  ButtlineAt: string;
  ButtlineAtSide: string;
  WingStationFrom: string;
  WingStationFromSide: string;
  WingStationTo: string;
  WingStationToSide: string;
  StructuralOther: string;
}

export interface ILocationDetails {
  ZoneId: number;
  DefectLocationIdentifier: string;
  CoordinateLocationDetails: string;
}

export enum ProfileActionType {
  FETCH_PROFILE = "FETCH_PROFILE",
  FETCH_PROFILE_SUCCESS = "FETCH_PROFILE_SUCCESS",
  FETCH_PROFILE_FAILURE = "FETCH_PROFILE_FAILURE",
}

export enum SdrActionType {
  FETCH_NEW_SDRS = "FETCH_NEW_SDRS",
  FETCH_APPROVED_SDRS = "FETCH_APPROVED_SDRS",
  FETCH_FLAGGED_SDRS = "FETCH_FLAGGED_SDRS",
  FETCH_NEW_SUCCESS = "FETCH_NEW_SUCCESS",
  FETCH_APPROVED_SUCCESS = "FETCH_APPROVED_SUCCESS",
  FETCH_FLAGGED_SUCCESS = "FETCH_FLAGGED_SUCCESS",
  FETCH_NEW_FAILURE = "FETCH_NEW_FAILURE",
  FETCH_APPROVED_FAILURE = "FETCH_APPROVED_FAILURE",
  FETCH_FLAGGED_FAILURE = "FETCH_FLAGGED_FAILURE",
}

export enum SdrEsfrRecordDetailsActionType {
  FETCH_DETAILS = "FETCH_DETAILS",
  FETCH_ESFR_DETAIL_SUCCESS = "FETCH_ESFR_DETAIL_SUCCESS",
  FETCH_ESFR_DETAIL_FAILURE = "FETCH_ESFR_DETAIL_FAILURE",
  FETCH_APPROVED_SDR_SUCCESS = "FETCH_APPROVED_SDR_SUCCESS",
  FETCH_APPROVED_SDR_FAILURE = "FETCH_APPROVED_SDR_FAILURE",
  FETCH_SFR_MATER_DATA_SUCCESS = "FETCH_SFR_MATER_DATA_SUCCESS",
  FETCH_SFR_MATER_DATA_FAILURE = "FETCH_SFR_MATER_DATA_FAILURE",
  FETCH_LOGPAGE_DATA_SUCCESS = "FETCH_LOGPAGE_DATA_SUCCESS",
  FETCH_LOGPAGE_DATA_FAILURE = "FETCH_LOGPAGE_DATA_FAILURE",
  FETCH_CTN_DATA_SUCCESS = "FETCH_CTN_DATA_SUCCESS",
  FETCH_CTN_DATA_FAILURE = "FETCH_CTN_DATA_FAILURE",
  FETCH_SET_DETAILS_LOADER_OFF = "FETCH_SET_DETAILS_LOADER_OFF",
}

export enum FlatFileActionType {
  FETCH_FLAT_FILE = "FETCH_FLAT_FILE",
  FETCH_FLAT_FILE_SUCCESS = "FETCH_FLAT_FILE_SUCCESS",
  FETCH_FLAT_FILE_FAILURE = "FETCH_FLAT_FILE_FAILURE",
  UPDATE_SNAPSHOT_SDR_EXTRACTION_STATUS_SUCCESS = "UPDATE_SNAPSHOT_SDR_EXTRACTION_STATUS_SUCCESS",
  UPDATE_SNAPSHOT_SDR_EXTRACTION_STATUS_FAILURE = "UPDATE_SNAPSHOT_SDR_EXTRACTION_STATUS_FAILURE",
  INSERT_SNAPSHOT_SDR_FILENAME_SUCCESS = "INSERT_SNAPSHOT_SDR_FILENAME_SUCCESS",
  INSERT_SNAPSHOT_SDR_FILENAME_FAILURE = "INSERT_SNAPSHOT_SDR_FILENAME_FAILURE",
}

export enum EsfrReportActionType {
  FETCH_ESFR_REPORT = "FETCH_ESFR_REPORT",
  FETCH_ESFR_REPORT_SUCCESS = "FETCH_ESFR_REPORT_SUCCESS",
  FETCH_ESFR_REPORT_FAILURE = "FETCH_ESFR_REPORT_FAILURE",
}

export enum CpcpReportActionType {
  FETCH_CPCP_REPORT = "FETCH_CPCP_REPORT",
  FETCH_CPCP_REPORT_SUCCESS = "FETCH_CPCP_REPORT_SUCCESS",
  FETCH_CPCP_REPORT_FAILURE = "FETCH_CPCP_REPORT_FAILURE",
}

export enum PartsReportActionType {
  FETCH_PARTS_REPORT = "FETCH_PARTS_REPORT",
  FETCH_PARTS_REPORT_SUCCESS = "FETCH_PARTS_REPORT_SUCCESS",
  FETCH_PARTS_REPORT_FAILURE = "FETCH_PARTS_REPORT_FAILURE",
}
export interface ProfileDispatchFuncType {
  type: ProfileActionType;
  data?: GetProfileResResult;
  message?: string;
}

export interface ProfileReducerAction {
  type: ProfileActionType;
  data: GetProfileResResult;
  message: string;
}

export interface SdrDispatchFuncType {
  type: SdrActionType;
  data?: TransformedSdrDataType[];
  message?: string;
}

export interface SdrReducerAction {
  type: SdrActionType;
  data: TransformedSdrDataType[];
  message: string;
}

export interface SdrEsfrRecordDetailsFuncType {
  type: SdrEsfrRecordDetailsActionType;
  data?: GetSDREsfrRecordDetailsResResult;
  message?: string;
}

export interface ViewLogPageDetailsFuncType {
  type: SdrEsfrRecordDetailsActionType;
  data?: ViewLogpageResResult;
  message?: string;
}

export interface ApprovedSdrFuncType {
  type: SdrEsfrRecordDetailsActionType;
  data?: GetApprovedSDRResResult;
  message?: string;
}

export interface SfrMasterDataFuncType {
  type: SdrEsfrRecordDetailsActionType;
  data?: GetSfrMasterDataResResult;
  message?: string;
}

export interface CtnDataFuncType {
  type: SdrEsfrRecordDetailsActionType;
  data?: GetCtnResResult;
  message?: string;
}

export interface EsfrReportDispatchFuncType {
  type: EsfrReportActionType;
  data?: GetEsfrReportResResult[];
  message?: string;
}

export interface CpcpReportDispatchFuncType {
  type: CpcpReportActionType;
  data?: GetCpcpReportResResult[];
  message?: string;
}

export interface PartsReportDispatchFuncType {
  type: PartsReportActionType;
  data?: GetPartsReportResResult[];
  message?: string;
}

export type TransformedSdrDataType = GetAllEsfrRecordsResResult & { SdrStatus: string };

export interface FlatFileDispatchFuncType {
  type: FlatFileActionType;
  data?: ExtractSDRRecordsResResult;
  message?: string;
}

export interface FlatFileReducerAction {
  type: FlatFileActionType;
  data: ExtractSDRRecordsResResult;
  message: string;
}

export type ReducerAction =
  | ProfileReducerAction
  | SdrReducerAction
  | SdrEsfrRecordDetailsReducerAction
  | FlatFileReducerAction;

export interface SdrEsfrRecordDetailsReducerAction {
  type: SdrEsfrRecordDetailsActionType;
  data:
    | GetSDREsfrRecordDetailsResResult
    | GetApprovedSDRResResult
    | GetSfrMasterDataResResult
    | ViewLogpageResResult
    | GetCtnResResult;
  message: string;
}

export interface EsfrReportReducerAction {
  type: EsfrReportActionType;
  data: GetEsfrReportResResult[];
  message: string;
}

export interface CpcpReportReducerAction {
  type: CpcpReportActionType;
  data: GetCpcpReportResResult[];
  message: string;
}

export interface PartsReportReducerAction {
  type: PartsReportActionType;
  data: GetPartsReportResResult[];
  message: string;
}

export type ProfileStateType = {
  loading: boolean;
  profileData: Employee | null;
  auth: UserPermission;
  error: string;
};

export type SdrStateType = {
  loading: boolean;
  sdrData: TransformedSdrDataType[] | null;
  error: string;
};

export type SdrEsfrRecordDetailsStateType = {
  loading: boolean;
  detailsData: GetSDREsfrRecordDetailsResResult | null;
  snapshotData: GetApprovedSDRResResult | null;
  masterData: GetSfrMasterDataResResult | null;
  logpageData: ViewLogpageResResult | null;
  ctnData: GetCtnResResult | null;
  error: string;
};

export type FlatFileStateType = {
  loading: boolean;
  fileData: ExtractSDRRecordsResResult | null;
  error: string;
};

export type EsfrReportStateType = {
  loading: boolean;
  esfrReport: GetEsfrReportResResult[] | null;
  error: string;
};

export type CpcpReportStateType = {
  loading: boolean;
  cpcpReport: GetCpcpReportResResult[] | null;
  error: string;
};

export type PartsReportStateType = {
  loading: boolean;
  partsReport: GetPartsReportResResult[] | null;
  error: string;
};

export interface EnvironmentConfig {
  apiBaseAddress?: string;
  webTechApiBaseUrl?: string;
  REACT_APP_ENVIRONMENT: string;
  PUBLIC_URL: string;
  REACT_APP_APPLICATION_NAME: string;
  REACT_APP_APPLICATION_KEY: string;
  REACT_APP_URL_AMT_BASE: string;
  REACT_APP_AWS_URL: string;
  REACT_APP_AWS_CLIENT_ID: string;
  REACT_APP_REDIRECT_URI: string;
  REACT_APP_LOGOUT_URL: string;
  URL_GET_PROFILE: string;
  URL_GET_ALL_SDRS: string;
  URL_GET_SDR_ESFR_RECORD_DETAILS: string;
  URL_GET_APPROVED_SDR: string;
  // URL_ESFR_APPROVE: string;
  URL_LOGPAGE_SEARCH: string;
  URL_GET_SFR_MASTER_DATA: string;
  // URL_ADD_SDR: string;
  URL_CREATE_SDR: string;
  URL_CREATE_SFR: string;
  URL_VIEW_LOGPAGE: string;
  URL_EXTRACT_SDR_RECORDS: string;
  URL_UPDATE_SNAPSHOT_SDR_EXTRACTION_STATUS: string;
  URL_INSERT_SNAPSHOT_SDR_FILENAME: string;
  URL_UPSERT_SDR_SNAPSHOT: string;
  URL_GET_ESFR_REPORT: string;
  URL_GET_CPCP_REPORT: string;
  URL_GET_CTN: string;
  URL_GET_SID: string;
  URL_GET_PARTS_REPORT: string;
}

export type EnvTypes = "localhost" | "development" | "qa" | "stage" | "production";

export type AppConfig = {
  [key in keyof typeof config.REACT_APP_ENVIRONMENT]: EnvironmentConfig;
};

export const InspectionType = new Map<number, string>([
  [1, "Pre-Flight/Walk Around"],
  [2, "Line MX Discovery"],
  [3, "Special Inspection"],
  [4, "Accident Investigation"],
  [5, "OTHER"],
]);

export const Sides: OptionDocument[] = [
  {
    Description: "Left",
    DisplayOrder: 1,
    Id: 1,
  },
  {
    Description: "Right",
    DisplayOrder: 2,
    Id: 2,
  },
];

export const SurfaceOptions: OptionDocument[] = [
  {
    Description: "Upper",
    DisplayOrder: 1,
    Id: 1,
  },
  {
    Description: "Lower",
    DisplayOrder: 2,
    Id: 2,
  },
  {
    Description: "Other",
    DisplayOrder: 3,
    Id: 3,
  },
];

export const BLOptions: OptionDocument[] = [
  {
    Description: "Left",
    DisplayOrder: 1,
    Id: 1,
  },
  {
    Description: "Right",
    DisplayOrder: 2,
    Id: 2,
  },
  {
    Description: "BL0",
    DisplayOrder: 3,
    Id: 3,
  },
];

export const SpecificsOptions: OptionDocument[] = [
  {
    Description: "Inboard",
    DisplayOrder: 1,
    Id: 1,
  },
  {
    Description: "Outboard",
    DisplayOrder: 2,
    Id: 2,
  },
];

export const RudderDamageProximityOptions: OptionDocument[] = [
  {
    Description: "LE",
    DisplayOrder: 1,
    Id: 1,
  },
  {
    Description: "TE",
    DisplayOrder: 2,
    Id: 2,
  },
  {
    Description: "Middle",
    DisplayOrder: 3,
    Id: 3,
  },
];

export const StabDamageProximityOptions: OptionDocument[] = [
  {
    Description: "Front Spar",
    DisplayOrder: 1,
    Id: 1,
  },
  {
    Description: "LE",
    DisplayOrder: 2,
    Id: 2,
  },
  {
    Description: "Rear Spar",
    DisplayOrder: 3,
    Id: 3,
  },
  {
    Description: "STR",
    DisplayOrder: 4,
    Id: 4,
  },
  {
    Description: "TE",
    DisplayOrder: 5,
    Id: 5,
  },
];

export const WingDamageProximityOptions: OptionDocument[] = [
  {
    Description: "Front Spar Spar",
    DisplayOrder: 1,
    Id: 1,
  },
  {
    Description: "LE",
    DisplayOrder: 2,
    Id: 2,
  },
  {
    Description: "Rear Spar Spar",
    DisplayOrder: 3,
    Id: 3,
  },
  {
    Description: "STR",
    DisplayOrder: 4,
    Id: 4,
  },
  {
    Description: "TE",
    DisplayOrder: 5,
    Id: 5,
  },
  {
    Description: "Middle",
    DisplayOrder: 6,
    Id: 6,
  },
];

export const OtherOptions: OptionDocument[] = [
  {
    Description: "Main",
    DisplayOrder: 1,
    Id: 1,
  },
  {
    Description: "Fwd",
    DisplayOrder: 2,
    Id: 2,
  },
  {
    Description: "Mid",
    DisplayOrder: 3,
    Id: 3,
  },
  {
    Description: "Aft",
    DisplayOrder: 4,
    Id: 4,
  },
];

export const ReportStatus: OptionDocument[] = [
  {
    Description: Status.All,
    DisplayOrder: 1,
    Id: 0,
  },
  {
    Description: Status.Draft,
    DisplayOrder: 2,
    Id: 1,
  },
  {
    Description: Status.Open,
    DisplayOrder: 3,
    Id: 2,
  },
  {
    Description: Status.ApprovedWithFollowUp,
    DisplayOrder: 4,
    Id: 3,
  },
  {
    Description: Status.Approved,
    DisplayOrder: 5,
    Id: 4,
  },
  {
    Description: Status.SentToFAA,
    DisplayOrder: 6,
    Id: 5,
  },
];

export const ReportType: OptionDocument[] = [
  {
    Description: "SDR",
    DisplayOrder: 1,
    Id: 1,
  },
  {
    Description: "SFR",
    DisplayOrder: 2,
    Id: 2,
  },
];

export const TypeOptions: OptionDocument[] = [
  {
    Description: "Pre-Flight/Walk Around",
    DisplayOrder: 1,
    Id: 1,
  },
  {
    Description: "Line MX Discovery",
    DisplayOrder: 2,
    Id: 2,
  },
  {
    Description: "Special Inspection",
    DisplayOrder: 3,
    Id: 3,
  },
  {
    Description: "Accident investigation",
    DisplayOrder: 4,
    Id: 4,
  },
  {
    Description: "Other",
    DisplayOrder: 5,
    Id: 5,
  },
];

export const DocumentTypeOptions: OptionDocument[] = [
  {
    Description: "SRM",
    DisplayOrder: 1,
    Id: 1,
  },
  {
    Description: "AMM",
    DisplayOrder: 2,
    Id: 2,
  },
  {
    Description: "CMM",
    DisplayOrder: 3,
    Id: 3,
  },
  {
    Description: "Repair ECRA",
    DisplayOrder: 4,
    Id: 4,
  },
  {
    Description: "Other",
    DisplayOrder: 5,
    Id: 5,
  },
];

export const ZoneOptions: OptionDocument[] = [
  {
    Description: "1",
    DisplayOrder: 1,
    Id: 1,
  },
];
