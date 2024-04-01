import { CreateSDRReq } from "src/types/CreateSdrReq";
import { ExtractSDRRecordsResResult } from "src/types/ExtractSdrRecordsRes";
import { GetAllEsfrRecordsResResult } from "src/types/GetAllEsfrRecordsRes";
import { GetApprovedSDRResResult } from "src/types/GetApprovedSdrRes";
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

export enum SelectedStatus {
  Draft = 1,
  Open = 2,
  ApprovedwithFollowup = 3,
  Approved = 4,
}

export interface ISaveSdrValues extends CreateSDRReq {
  Aircraft: MajorEquipmentIdentity;
  Powerplant: MajorEquipmentIdentity;
  NNumber: string;
  AtaCode: string;
  FlightNumber: string;
  CorrectiveAction: string;
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

export interface MajorEquipmentIdentity {
  Manufacturer: string;
  Model: string;
  SerialNumber: string;
  TotalTime: number;
  TotalCycles: number;
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

export interface SdrEsfrRecordDetailsReducerAcition {
  type: SdrEsfrRecordDetailsActionType;
  data:
    | GetSDREsfrRecordDetailsResResult
    | GetApprovedSDRResResult
    | GetSfrMasterDataResResult
    | ViewLogpageResResult;
  message: string;
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
  | SdrEsfrRecordDetailsReducerAcition
  | FlatFileReducerAction;

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
  error: string;
};

export type FlatFileStateType = {
  loading: boolean;
  fileData: ExtractSDRRecordsResResult | null;
  error: string;
};

export interface EnvironmentConfig {
  apiBaseAddress?: string;
  webTechApiBaseUrl?: string;
  REACT_APP_ENVIRONMENT: string;
  PUBLIC_URL: string;
  REACT_APP_APPLICATION_NAME: string;
  REACT_APP_APPLICATION_KEY: string;
  URL_GET_PROFILE: string;
  URL_GET_ALL_SDRS: string;
  URL_GET_SDR_ESFR_RECORD_DETAILS: string;
  URL_GET_APPROVED_SDR: string;
  // URL_ESFR_APPROVE: string;
  URL_LOGPAGE_SEARCH: string;
  URL_GET_SFR_MASTER_DATA: string;
  // URL_ADD_SDR: string;
  URL_CREATE_SDR: string;
  URL_VIEW_LOGPAGE: string;
  URL_EXTRACT_SDR_RECORDS: string;
  URL_UPDATE_SNAPSHOT_SDR_EXTRACTION_STATUS: string;
  URL_INSERT_SNAPSHOT_SDR_FILENAME: string;
  URL_UPSERT_SDR_SNAPSHOT: string;
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
