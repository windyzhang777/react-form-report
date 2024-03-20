export interface UpdateLogPageWithOilandMaterialLaborReq {
  LogpageStatus: string;
  UserInformation: UserInformation;
  LogPageTransactionData: { [key: string]: string };
  OilSvcRequest: { [key: string]: string };
  MLRequest: MLRequest;
  Dash8Request: Dash8Request;
  PartsUsedDataSaveToOffHostRequest: PartsUsedDataSaveToOffHostRequest;
  Token: string;
  LTerm: string;
  TailNumber: string;
  LogpageNumber: string;
  EmployeeID: string;
  CreateSdr: CreateSDR;
  CreateSfr: CreateSFR;
  SaveSeatsRequest: SaveSeatsRequest;
}

export interface CreateSDR {
  LogPageCreationDate: string;
  Station: string;
  LogPageNumber: string;
  PrecautionaryProcedureIds: number[];
  NatureOfReportIds: number[];
  StageId: number;
  StatusId: number;
  HowDiscoveredId: number;
  EmployeeId: string;
  EmployeeName: string;
  PartDetails: PartDetails;
  CreatedbyFirstName: string | null;
  CreatedbyLastName: string | null;
  ModifiedbyFirstName: string | null;
  ModifiedbyLastName: string | null;
}

export interface PartDetails {
  PartTrackingNumber: string;
  PartManufacturerSerialNumber: string;
  PartSerialNumber: string;
  PartLocation: string;
  PartCondition: string;
  PartDescription: string;
}

export interface CreateSFR {
  Type: string;
  StatusId: number;
  LogPageNumber: string;
  Station: string;
  CreatedDate: string;
  LogPageCreatedDate: string;
  LogPageCreatedBy: string;
  ModifiedDate: string;
  CreatedBy: string;
  ModifiedBy: string;
  AirCraftNumber: string;
  OriginDetails: OriginDetails;
  LocationDetails: LocationDetails;
  RepairDetails: RepairDetails;
  DiscrepancyDetails: DiscrepancyDetails;
  SfrActivity: SfrActivity;
  SdrDetails: CreateSDR;
  CreatedbyFirstName: string;
  CreatedbyLastName: string;
  ModifiedbyFirstName: string;
  ModifiedbyLastName: string;
}

export interface DiscrepancyDetails {
  IsManufacturingLimitExceeded: boolean;
  DiscrepancyTypeId: number;
  CorrosionLevelId: number;
  CorrosionCauseId: number;
  CorrosionExtentId: number;
  CorrosionCauseComments: string;
  AreMultipleCracksInTheSameLocation: boolean;
  CrackLength: number;
  CrackWidth: number;
  CrackDepth: number;
  DiscrepancyTypeComments: string;
  IsSafeOperationEndangered: boolean;
  DiscrepancyPartComments: string;
  DiscrepancyPartDetails: DiscrepancyPartDetail[];
}

export interface DiscrepancyPartDetail {
  AtaCode: string;
  PartNumber: string;
  Structure: string;
  PartDetails: string;
}

export interface LocationDetails {
  ZoneId: number;
  DefectLocationId: number;
  Comments: string;
  Surface: string;
  Side: string;
  Specifics: string;
  CoordinateLocationDetails: string;
  LocationType: string;
  FromSta: string;
  ToSta: string;
  FromBLLength: number;
  ToBLLength: number;
  SpecificsLocation: string;
  DefectLocationIdentifier: string;
  ToSide: string;
  FromSide: string;
  StaTypeId: number;
  StaType: string;
  FromStr: string;
  ToStr: string;
  DamageProximityId: number;
}

export interface OriginDetails {
  IsScheduledInspection: boolean;
  CalDocId: number;
  InspectionType: number;
  CalDocIdentifier: string;
  SpecIdentifier: string;
  MfrSourceComments: string;
  DetectionMethodId: number;
  MfrSourceIdentifier: string;
  MfrSourceId: number;
  Rev: string;
  Op: string;
  DetectionMethodComments: string;
}

export interface RepairDetails {
  IsDeferred: boolean;
  IsMajorRepair: boolean;
  IsSdrReportable: boolean;
  DamageStructureStatus: string;
  IsOverWeight: boolean;
  IsEcra: boolean;
  EcraCode: string;
  Comments: string;
  ManHoursRequired: number;
  MaterialsUtilized: string;
  Rev: string;
  DipCode: string;
  IsRepairOrRework: boolean;
  RepairType: string;
  RepairTypes: RepairType[];
}

export interface RepairType {
  Code: string;
  Page: string;
  Fig: string;
}

export interface SfrActivity {
  Comments: string;
  CreatedDate: string;
  EmployeeId: string;
  EmployeeName: string;
}

export interface Dash8Request {
  AssignedStation: string;
  FlightNumber: string;
  ScheduledArrivalDate: string;
  LTerm: string;
  EmployeeID: string;
  InspectedAircraftNumber: string;
  Dash8s: Dash8[];
}

export interface Dash8 {
  InspectionPartNumber: string;
  SerialNumber: string;
  ForeCastType: string;
  WorkControlNumber: string;
  ForecastDescription: string;
  ForecastPosition: string;
  CardDetails: CardDetail[];
}

export interface CardDetail {
  CardNumber: string;
  MasterId: number;
  Dash1Status: string;
  OptimizedReason: string;
  OptimizedVersion: string;
  OptimizedGroupId: string;
}

export interface MLRequest {
  LaborHours: string;
  GroundTime: string;
  RepetitiveLaborHours: string;
  RepetitiveGroundTime: string;
  TerminatingLaborHours: string;
  TerminatingGroundTime: string;
  MaterialLaborDetails: MaterialLaborDetail[];
}

export interface MaterialLaborDetail {
  Quantity: string;
  UnitOfIssue: string;
  IPRefence: string;
  PartNumber: string;
  Description: string;
  Comment: string;
}

export interface PartsUsedDataSaveToOffHostRequest {
  LogPageNumber: string;
  AircraftNum: string;
  StationCode: string;
  TailNumber: string;
  PartsUsedDataDetailList: PartsUsedDataDetailList[];
}

export interface PartsUsedDataDetailList {
  Id: number;
  MfgPartNumber: string;
  ItemDescription: string;
  MNENumber: string;
  QuantityUsed: number;
  CreatedBy: string;
  IsDeleted: boolean;
  IsPlannedParts: boolean;
}

export interface SaveSeatsRequest {
  MelCode: string;
  Seats: Seat[];
  LicenseNumber: string;
  FleetCode: string;
  SubFleetCode: string;
}

export interface Seat {
  SeatNumber: string;
  ActionType: number;
  NumberOfHoursToBlock: number;
}

export interface UserInformation {
  EmployeeId: string;
  FirstName: string;
  LastName: string;
  Station: string;
  JobRole: string;
}
