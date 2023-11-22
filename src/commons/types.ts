// enum to hold the report statuses
export enum SelectedTab {
  Open = 0,
  FlaggedForFollowUp = 1,
  Approved = 2,
}

// common data grid
export interface CompDataGrid {
  reportStatus: string;
  reportIndex: number;
  updateSdrCount: (a: number, b: number) => void;
  setViewSdrFlag: (a: boolean) => void;
  setSelectedSdrId: (a: number) => void;
  setSelectedIndex: (a: number) => void;
  selectedSdrId: number;
}

// grid row
export interface GridRow {
  id: string;
  SdrStatus: string;
  LogPageStatus: string;
  LogPageNumber: string;
  FirstName: string;
  LastName: string;
  CreatedBy: string;
  CreatedDate: string;
  sfdr: string;
}

export interface SdrRowApi {
  LogPageNumber: string;
  FirstName: string;
  LastName: string;
  CreatedBy: string;
  CreatedDate: string;
  SdrNumber: string;
  SFdr: string;
}

export interface TabPanelProps {
  children?: React.ReactNode;
  index?: number;
  value: number;
}

export interface ViewSdrDataProps {
  selectedSdrId: number;
  selectedIndex: number
}

export interface NewSdrsDataResponse {
  newSdrsData: Array<SdrRowApi>;
}

export interface ApprovedSdrsDataResponse {
  approvedSdrsData: Array<SdrRowApi>;
}

export interface FlaggedSdrsDataResponse {
  flaggedSdrsData: Array<SdrRowApi>;
}

export interface NameValuesGetterParams {
  row: {
    FirstName: string;
    LastName: string;
    CreatedBy: string;
  }
}

export interface RowRowApi {
  rowApi: {
    row: {
      LogPageNumber: string;
      datetime: string;
    }
  }
}

export interface RowApi {
  row: {
    LogPageNumber: string;
    datetime: string;
  }
}

export type StatusId = 2 | 3 | 4

// TODO: define specific data type according to api response 
export type ProfileDataType = {}
export type SdrDataType = SdrRowApi[]

export type FETCH_PROFILE = "FETCH_PROFILE"
export type FETCH_SUCCESS = "FETCH_SUCCESS"
export type FETCH_FAILURE = "FETCH_FAILURE"
export type ProfileActionType = FETCH_PROFILE | FETCH_SUCCESS | FETCH_FAILURE;

export type FETCH_NEW_SDRS = "FETCH_NEW_SDRS"
export type FETCH_APPROVED_SDRS = "FETCH_APPROVED_SDRS"
export type FETCH_FLAGGED_SDRS = "FETCH_FLAGGED_SDRS"
export type FETCH_NEW_SUCCESS = "FETCH_NEW_SUCCESS"
export type FETCH_APPROVED_SUCCESS = "FETCH_APPROVED_SUCCESS"
export type FETCH_FLAGGED_SUCCESS = "FETCH_FLAGGED_SUCCESS"
export type FETCH_NEW_FAILURE = "FETCH_NEW_FAILURE"
export type FETCH_APPROVED_FAILURE = "FETCH_APPROVED_FAILURE"
export type FETCH_FLAGGED_FAILURE = "FETCH_FLAGGED_FAILURE"
export type SdrActionType = FETCH_NEW_SDRS | FETCH_APPROVED_SDRS | FETCH_FLAGGED_SDRS | FETCH_NEW_SUCCESS | FETCH_APPROVED_SUCCESS | FETCH_FLAGGED_SUCCESS | FETCH_NEW_FAILURE | FETCH_APPROVED_FAILURE | FETCH_FLAGGED_FAILURE;

export interface ProfileDispatchFuncType {
  type: ProfileActionType;
  data?: ProfileDataType;
  message?: string;
}

export interface ProfileReducerAction {
  type: ProfileActionType;
  data: ProfileDataType;
  message: string;
}

export interface SdrDispatchFuncType {
  type: SdrActionType;
  data?: SdrDataType;
  message?: string;
}

export interface SdrReducerAction {
  type: SdrActionType;
  data: SdrDataType;
  message: string;
}

export type ReducerAction = ProfileReducerAction | SdrReducerAction

export type ProfileStateType = {
  loading: boolean;
  profileData: ProfileDataType | null;
  error: string;
}

export type SdrStateType = {
  loading: boolean;
  sdrData: SdrDataType;
  error: string;
}

export interface EnvironmentConfig {
  apiBaseAddress?: string;
  URL_GET_PROFILE?: string;
  URL_GET_ALL_SDRS?: string;
  webTechApiBaseUrl: string;
  URL_LOGPAGE_SEARCH: string;
}

export type AppConfig = {
  [key in keyof typeof process.env.REACT_APP_ENVIRONMENT]: EnvironmentConfig
}

export enum SdrStatus {
  New = 2,
  Approved = 3,
  Flagged = 4
}