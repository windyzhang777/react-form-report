export interface GetSDREsfrRecordDetailsRes {
  Timestamp: string;
  ResponseTime: number;
  Errors: any[];
  ErrorCode: null;
  Result: GetSDREsfrRecordDetailsResResult;
}

export interface GetSDREsfrRecordDetailsResResult {
  AirCraftNumber: string | null;
  AtaCode: string | null;
  CreatedBy: string | null;
  CreatedbyFirstName: string | null;
  CreatedbyLastName: string | null;
  CreatedDate: string | null;
  DiscrepancyDetails: DiscrepancyDetails;
  FleetCode: string | null;
  FleetInfo: FleetInfo;
  IsSfrCompleted: boolean;
  IsSfrDowngraded: boolean;
  LocationDetails: LocationDetails;
  LogPageCreatedBy: string | null;
  LogPageCreatedDate: string | null;
  LogPageNumber: string;
  ModifiedBy: string | null;
  ModifiedbyFirstName: string | null;
  ModifiedbyLastName: string | null;
  ModifiedDate: string | null;
  OperatorControlNumber: string | null;
  OriginDetails: OriginDetails;
  RepairDetails: RepairDetails;
  SdrDetails: SDRDetails;
  SfrActivity: null;
  SfrId: number;
  Station: string | null;
  Status: string;
  StatusId: number;
  Type: string | null;
}

export interface DiscrepancyDetails {
  AreMultipleCracksInTheSameLocation: boolean;
  CorrosionCauseComments: string | null;
  CorrosionCauseId: number | null;
  CorrosionExtentId: number | null;
  CorrosionLevelId: number | null;
  CrackDepth: number | null;
  CrackLength: number | null;
  CrackWidth: number | null;
  DiscrepancyPartComments: null;
  DiscrepancyPartDetails: DiscrepancyPartDetail[];
  DiscrepancyTypeComments: null;
  DiscrepancyTypeId: number | null;
  IsManufacturingLimitExceeded: boolean;
  IsSafeOperationEndangered: boolean;
  NumberOfCracks: number | null;
}

export interface DiscrepancyPartDetail {
  AtaCode: string;
  DiscrepancyPartInformationCode: number | null;
  PartDetails: string | null;
  PartNumber: string | null;
  Structure: string | null;
}

export interface FleetInfo {
  ATACode: string;
  CorrectiveActions: string;
  Date: string;
  FleetCode: string;
  FlightNumber: string;
  LicenseNumber: string;
  ManufacturedBy: ManufacturedBy;
  ManufacturerPartNumber: string;
  ManufacturerSerialNumber: string;
  SceptreCode: string;
  Station: string;
  TailNumber: string;
  TotalAircraftCycles: number;
  TotalAircraftTime: number;
}

export enum ManufacturedBy {
  Airbus = "AIRBUS",
  Bac = "BAC",
  Boeing = "BOEING",
}

export interface LocationDetails {
  AdditionalLocationDetails: null;
  Comments: null;
  CoordinateLocationDetails: string;
  DamageProximityId: number | null;
  DefectLocationId: number | null;
  DefectLocationIdentifier: string | null;
  ElevatorTab: string | null;
  FromBL: string | null;
  FromBLLength: number | null;
  FromSide: string | null;
  FromSta: string | null;
  FromStr: string | null;
  Fuselage: string | null;
  LocationType: string | null;
  Other: string | null;
  Side: string | null;
  Specifics: string | null;
  SpecificsLocation: string | null;
  StaType: string | null;
  StaTypeId: number | null;
  Surface: null;
  ToBL: null;
  ToBLLength: number | null;
  ToSide: string | null;
  ToSta: string | null;
  ToStr: string | null;
  ZoneId: number | null;
}

export interface OriginDetails {
  CalDocId: number;
  CalDocIdentifier: string | null;
  DetectionMethodComments: string | null;
  DetectionMethodId: number | null;
  InspectionType: null;
  IsScheduledInspection: boolean;
  MfrSourceComments: null;
  MfrSourceId: number | null;
  MfrSourceIdentifier: null;
  Op: null;
  Rev: null;
  SpecIdentifier: string | null;
  UnscheduledInspectionTypeComments: null;
  UnscheduledInspectionTypeId: number | null;
}

export interface RepairDetails {
  Comments: string;
  DamageStructureStatus: string;
  DipCode: null;
  EcraCode: string;
  IsDeferred: boolean;
  IsEcra: boolean;
  IsMajorRepair: boolean;
  IsOverWeight: boolean;
  IsRepairOrRework: boolean;
  IsSdrReportable: boolean;
  ManHoursRequired: number | null;
  MaterialsUtilized: string;
  RepairType: string | null;
  RepairTypes: RepairType[];
  Rev: string;
}

export interface RepairType {
  Code: string;
  Fig: string;
  Page: string;
}

export interface SDRDetails {
  AircraftNumber: string | null;
  CorrectiveAction: string;
  CreatedBy: string;
  CreatedbyFirstName: string;
  CreatedbyLastName: string;
  createdDate: string;
  CreatedDate: string;
  EmployeeId: string | null;
  EmployeeName: string | null;
  FleetInfo: null;
  HowDiscoveredId: number | null;
  IsExtracted: boolean;
  IsMajorRepair: boolean;
  IsSdrCompleted: boolean;
  IsSdrDowngraded: boolean;
  IsSdrReportable: boolean;
  LogPageCreationDate: string;
  LogPageNumber: string;
  ModifiedbyFirstName: string;
  ModifiedbyLastName: string;
  NatureOfReportIds: number[];
  OperatorControlNumber: null;
  PartDetails: PartDetails;
  PrecautionaryProcedureIds: number[];
  sdrNumber: string;
  StageId: number | null;
  Station: string;
  Status: string;
  StatusId: number;
  submittedDate: string;
}

export interface PartDetails {
  PartCondition: string | null;
  PartCycleSince: string | null;
  PartDescription: string | null;
  PartLocation: string | null;
  PartManufacturerSerialNumber: string | null;
  PartSerialNumber: string | null;
  PartTimeSince: string | null;
  PartTotalCycles: string | null;
  PartTotalTime: string | null;
  PartTrackingNumber: null;
}
