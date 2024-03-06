// enum to hold the report statuses
export enum SelectedTab {
    Open = 0,
    FlaggedForFollowUp = 1,
    Approved = 2,
}

// common data grid
export interface CommonDataGridProps {
    setSelectedIndex: (a: number) => void;
    setSelectedSdrId: (a: number) => void;
    setSelectedType: (a: string) => void;
    setViewSdrFlag: (a: boolean) => void;
    tabIndex: number;
    tabValue: string;
    updateSdrCount: (a: number, b: number) => void;
}

export interface CommonGridRow {
	Id: number;
    LogpageNumber: string;
    LogpageStatus: LogpageStatus | null;
    CreatedBy: string;
    CreatedbyFirstName: null | string;
    CreatebyLastName: null | string;
    CreatedDate: string;
    Type: Type;
}

// grid row
export interface GridRow extends CommonGridRow {
    SdrStatus: string;
}

export interface SdrRowApi extends CommonGridRow {
    StatusId: number;
}

export enum LogpageStatus {
    OpenD = "OPEN-D",
    OpenO = "OPEN-O",
}

export enum Type {
    Both = "Both",
    SDR = "SDR",
    Sfr = "SFR",
}

export interface TabPanelProps {
    children?: React.ReactNode;
    index?: number;
    value: number;
}

export interface ViewSdrDataProps {
    handleApprove: (a: boolean) => void;
    selectedIndex: number;
    selectedSdrId: number;
    selectedType: string;
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

export type StatusId = 2 | 3 | 4;

type FleetInfoType = {
    AtaCode: string,
    CorrectiveActions: string,
    LicenseNumber: string,
    ManufacturedBy: string,
    ManufacturerPartNumber: string,
    ManufacturerSerialNumber: string,
    TotalAircraftTime: number,
    TotalAircraftCycles: number,
    TailNumber: string
};

type OriginDetailsType = {
    InspectionType: number,
    CalDoc: string,
    MfrSource: string,
    SpecIdentifier: string,
    DetectionMethod: string
};

type DiscrepancyDetailsType = {
    IsManufacturingLimitExceeded: boolean,
    DiscrepancyType: string,
    DiscrepancyPartComments: string
};

type LocationDetailsType = {
    Zone: string,
    DefectLocation: string,
    CoordinateLocationDetails: string
};

type PartDetailsType = {
    PartDescription: string,
    PartSerialNumber: string,
    PartTrackingNumber: string,
    PartManufacturerSerialNumber: string,
    PartCondition: string,
    PartLocation: string
};

type SdrDetailsType = {
    NatureofReports: string[],
    PrecautionaryProcedures: string[],
    Stage: string,
    HowDicovered: string,
    PartDetails: PartDetailsType,
};

// TODO: define specific data type according to api response 
export type ProfileDataType = {}
export type SdrDataType = SdrRowApi[]
export type EsfrRecordDetailDataType = {
    OperatorControlNumber: string,
    CreatedDate: string,
    LogPageNumber: string,
    Station: string,
    FleetInfo: FleetInfoType,
    OriginDetails: OriginDetailsType,
    DiscrepancyDetails: DiscrepancyDetailsType,
    LocationDetails: LocationDetailsType,
    SdrDetails: SdrDetailsType
}

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
export type SdrActionType =
    FETCH_NEW_SDRS
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
export type EsfrRecordDetailActionType = FETCH_ESFR_DETAIL | FETCH_ESFR_DETAIL_SUCCESS | FETCH_ESFR_DETAIL_FAILURE;

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

export interface EsfrRecordDetailFuncType {
    type: EsfrRecordDetailActionType;
    data?: EsfrRecordDetailDataType;
    message?: string;
}


export interface EsfrRecordDetailReducerAcition {
    type: EsfrRecordDetailActionType;
    data: EsfrRecordDetailDataType;
    message: string;
}

export type ReducerAction = ProfileReducerAction | SdrReducerAction | EsfrRecordDetailReducerAcition

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

export type EsfrRecordDetailStateType = {
    loading: boolean;
    esfrRecordDetailData: EsfrRecordDetailDataType | null;
    error: string;
}

export interface EnvironmentConfig {
    URL_ESFR_APPROVE: string;
    apiBaseAddress: string;
    URL_GET_PROFILE: string;
    URL_GET_ALL_SDRS: string;
    URL_GET_ESFR_RECORD_DETAILS: string;
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

export const InspectionType = new Map<number, string>([
        [1, "Pre-Flight/Walk Around"],
        [2, "Line MX Discovery"],
        [3, "Special Inspection"],
        [4, "Accident Investigation"],
        [5, "OTHER"]
    ]
)
