import { CreateSDRReq, PartDetails } from "src/types/CreateSdrReq";
import { GetAllEsfrRecordsResResult } from "src/types/GetAllEsfrRecordsRes";
import { Employee } from "src/types/GetProfilerRes";
import { GetSDREsfrRecordDetailsResResult } from "src/types/GetSdrEsfrRecordDetailsRes";
import { GetSfrMasterDataResResult, OptionDocument } from "src/types/GetSfrMasterDataRes";
import { ViewLogpageResResult } from "src/types/ViewLogpageRes";

export enum SdrStatus {
  New = 2,
  Approved = 3,
  Flagged = 4,
}

export enum SelectedTab {
  Open = 0,
  FlaggedForFollowUp = 1,
  Approved = 2,
}

export enum SelectedStatus {
  Draft = 1,
  Submitted = 2,
  Approved = 3,
  ApprovedwithFollowup = 4,
}

export interface ISaveSdrValues extends CreateSDRReq {
  Aircraft: MajorEquipmentIdentity;
  Powerplant: MajorEquipmentIdentity;
  NNumber: string;
  AtaCode: string;
  FlightNumber: string;
  CorrectiveAction: string;
}

export interface IEditSdrValues extends Omit<CreateSDRReq, "PartDetails"> {
  AtaCode: string;
  CorrectiveActions: string;
  SubmitterDesignator: string;
  SubmitterType: string;
  OperatorDesignator: string;
  OperatorType: string;
  FAAReceivingRegionCode: string;
  ReceivingDistrictOffice: string;
  PartManufacturerName: string;
  LocationDetails: ILocationDetails;
  ComponentDetails: IComponentDetails & AdditionalPartValues;
  StructureCausingDifficulty: IStructureCausingDifficulty;
  PartDetails: PartDetails & AdditionalPartValues;
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
  FuselageFromSTA: string;
  FuselageToSTA: string;
  CorrosionLevel: string;
  CrackLength: number;
  NumberofCracks: number;
  CCCorrosionLevel: string;
  CCCrackLength: number;
  CCNumberofCracks: number;
  WaterLineFrom: string;
  WaterLineAt: string;
  StringerFrom: string;
  StringerFromSide: string;
  StringerAt: string;
  StringerAtSide: string;
  ButtLineFrom: string;
  ButtLineFromSide: string;
  ButtLineAt: string;
  ButtLineAtSide: string;
  WingStationFromSTA: string;
  WingStationFromSide: string;
  WingStationToSTA: string;
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

export type StatusId = 2 | 3 | 4;

export type FETCH_PROFILE = "FETCH_PROFILE";
export type FETCH_SUCCESS = "FETCH_SUCCESS";
export type FETCH_FAILURE = "FETCH_FAILURE";
export type ProfileActionType = FETCH_PROFILE | FETCH_SUCCESS | FETCH_FAILURE;

export type FETCH_NEW_SDRS = "FETCH_NEW_SDRS";
export type FETCH_APPROVED_SDRS = "FETCH_APPROVED_SDRS";
export type FETCH_FLAGGED_SDRS = "FETCH_FLAGGED_SDRS";
export type FETCH_NEW_SUCCESS = "FETCH_NEW_SUCCESS";
export type FETCH_APPROVED_SUCCESS = "FETCH_APPROVED_SUCCESS";
export type FETCH_FLAGGED_SUCCESS = "FETCH_FLAGGED_SUCCESS";
export type FETCH_NEW_FAILURE = "FETCH_NEW_FAILURE";
export type FETCH_APPROVED_FAILURE = "FETCH_APPROVED_FAILURE";
export type FETCH_FLAGGED_FAILURE = "FETCH_FLAGGED_FAILURE";
export type SdrActionType =
  | FETCH_NEW_SDRS
  | FETCH_APPROVED_SDRS
  | FETCH_FLAGGED_SDRS
  | FETCH_NEW_SUCCESS
  | FETCH_APPROVED_SUCCESS
  | FETCH_FLAGGED_SUCCESS
  | FETCH_NEW_FAILURE
  | FETCH_APPROVED_FAILURE
  | FETCH_FLAGGED_FAILURE;

export type FETCH_ESFR_DETAIL = "FETCH_ESFR_DETAIL";
export type FETCH_ESFR_DETAIL_SUCCESS = "FETCH_ESFR_DETAIL_SUCCESS";
export type FETCH_ESFR_DETAIL_FAILURE = "FETCH_ESFR_DETAIL_FAILURE";
export type FETCH_SDR_MATER_DATA_SUCCESS = "FETCH_SDR_MATER_DATA_SUCCESS";
export type FETCH_SDR_MATER_DATA_FAILURE = "FETCH_SDR_MATER_DATA_FAILURE";
export type FETCH_LOGPAGE_DATA_SUCCESS = "FETCH_LOGPAGE_DATA_SUCCESS";
export type FETCH_LOGPAGE_DATA_FAILURE = "FETCH_LOGPAGE_DATA_FAILURE";
export type EsfrRecordDetailActionType =
  | FETCH_ESFR_DETAIL
  | FETCH_ESFR_DETAIL_SUCCESS
  | FETCH_ESFR_DETAIL_FAILURE
  | FETCH_SDR_MATER_DATA_SUCCESS
  | FETCH_SDR_MATER_DATA_FAILURE
  | FETCH_LOGPAGE_DATA_SUCCESS
  | FETCH_LOGPAGE_DATA_FAILURE;

export interface ProfileDispatchFuncType {
  type: ProfileActionType;
  data?: Employee;
  message?: string;
}

export interface ProfileReducerAction {
  type: ProfileActionType;
  data: Employee;
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

export interface EsfrRecordDetailFuncType {
  type: EsfrRecordDetailActionType;
  data?: GetSDREsfrRecordDetailsResResult;
  message?: string;
}

export interface SfrMasterDataFuncType {
  type: EsfrRecordDetailActionType;
  data?: GetSfrMasterDataResResult;
  message?: string;
}

export interface EsfrRecordDetailReducerAcition {
  type: EsfrRecordDetailActionType;
  data: GetSDREsfrRecordDetailsResResult;
  message: string;
}

export type TransformedSdrDataType = GetAllEsfrRecordsResResult & { SdrStatus: string };

export type ReducerAction =
  | ProfileReducerAction
  | SdrReducerAction
  | EsfrRecordDetailReducerAcition;

export type ProfileStateType = {
  loading: boolean;
  profileData: Employee | null;
  error: string;
};

export type SdrStateType = {
  loading: boolean;
  sdrData: TransformedSdrDataType[] | null;
  error: string;
};

export type EsfrRecordDetailStateType = {
  loading: boolean;
  esfrRecordDetailData: GetSDREsfrRecordDetailsResResult | null;
  sfrMasterData: GetSfrMasterDataResResult | null;
  logpageData: ViewLogpageResResult | null;
  error: string;
};

export interface EnvironmentConfig {
  URL_ESFR_APPROVE: string;
  apiBaseAddress: string;
  REACT_APP_ENVIRONMENT: string;
  PUBLIC_URL: string;
  REACT_APP_APPLICATION_NAME: string;
  REACT_APP_APPLICATION_KEY: string;
  URL_GET_PROFILE: string;
  URL_GET_ALL_SDRS: string;
  URL_GET_ESFR_RECORD_DETAILS: string;
  webTechApiBaseUrl: string;
  URL_LOGPAGE_SEARCH: string;
  URL_GET_SFR_MASTER_DATA: string;
  URL_ADD_SDR: string;
  URL_CREATE_SDR: string;
  URL_VIEW_LOGPAGE: string;
}

export type AppConfig = {
  [key in keyof typeof process.env.REACT_APP_ENVIRONMENT]: EnvironmentConfig;
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
