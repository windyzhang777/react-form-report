export interface GetSDREsfrRecordDetailsRes {
  Timestamp: string;
  ResponseTime: number;
  Errors: any[];
  ErrorCode: null;
  Result: GetSDREsfrRecordDetailsResResult;
}

export interface GetSDREsfrRecordDetailsResResult {
  AirCraftNumber: string | null;
  CreatedBy: string;
  CreatedbyFirstName: string;
  CreatedbyLastName: string;
  CreatedDate: string;
  DiscrepancyDetails: DiscrepancyDetails;
  FleetInfo: FleetInfo;
  LocationDetails: LocationDetails;
  LogPageCreatedBy: string | null;
  LogPageCreatedDate: string;
  LogPageNumber: string;
  ModifiedBy: null;
  ModifiedbyFirstName: string;
  ModifiedbyLastName: string;
  ModifiedDate: string;
  OperatorControlNumber: null;
  OriginDetails: OriginDetails;
  RepairDetails: RepairDetails | null;
  SdrDetails: SDRDetails | null;
  SfrActivity: null;
  SfrId: number;
  Station: string;
  Status: string;
  StatusId: number;
  Type: string | null;
}

export interface DiscrepancyDetails {
  AreMultipleCracksInTheSameLocation: boolean;
  CorrosionCauseComments: string | null;
  CorrosionCauseId: number;
  CorrosionExtentId: number;
  CorrosionLevelId: number;
  CrackDepth: number;
  CrackLength: number;
  CrackWidth: number;
  DiscrepancyPartComments: null;
  DiscrepancyPartDetails: DiscrepancyPartDetail[];
  DiscrepancyTypeComments: null;
  DiscrepancyTypeId: number;
  IsManufacturingLimitExceeded: boolean;
  IsSafeOperationEndangered: boolean;
  NumberOfCracks: number;
}

export interface DiscrepancyPartDetail {
  AtaCode: string;
  PartDetails: string;
  PartNumber: string;
  Structure: string;
}

export interface FleetInfo {
  ATACode: string;
  CorrectiveActions: string;
  Date: string;
  FleetCode: string;
  LicenseNumber: string;
  ManufacturedBy: string;
  ManufacturerPartNumber: string;
  ManufacturerSerialNumber: string;
  SceptreCode: string;
  Station: string;
  TailNumber: string;
  TotalAircraftCycles: number;
  TotalAircraftTime: number;
}

export interface LocationDetails {
  AdditionalLocationDetails: null;
  Comments: null;
  CoordinateLocationDetails: null;
  DamageProximityId: number;
  DefectLocationId: number;
  DefectLocationIdentifier: string;
  ElevatorTab: null;
  FromBLLength: number;
  FromSide: string | null;
  FromSta: string | null;
  FromStr: null;
  Fuselage: null;
  LocationType: null;
  Other: null;
  Side: string | null;
  Specifics: string | null;
  SpecificsLocation: null;
  StaType: null;
  StaTypeId: number;
  Surface: null;
  ToBLLength: number;
  ToSide: string | null;
  ToSta: string | null;
  ToStr: null;
  ZoneId: number;
}

export interface OriginDetails {
  CalDocId: number;
  CalDocIdentifier: string | null;
  DetectionMethodComments: string | null;
  DetectionMethodId: number;
  InspectionType: number;
  IsScheduledInspection: boolean;
  MfrSourceComments: null;
  MfrSourceId: number;
  MfrSourceIdentifier: string | null;
  Op: null;
  Rev: null;
  SpecIdentifier: string | null;
}

export interface RepairDetails {
  Comments: string;
  DamageStructureStatus: string;
  DipCode: string;
  EcraCode: string;
  IsDeferred: boolean;
  IsEcra: boolean;
  IsMajorRepair: boolean;
  IsOverWeight: boolean;
  IsRepairOrRework: boolean;
  IsSdrReportable: boolean;
  ManHoursRequired: number;
  MaterialsUtilized: string;
  RepairType: string;
  RepairTypes: RepairType[];
  Rev: string;
}

export interface RepairType {
  Code: string;
  Fig: string;
  Page: string;
}

export interface SDRDetails {
  AircraftNumber: null;
  CorrectiveAction: null;
  CreatedBy: null;
  CreatedbyFirstName: string;
  CreatedbyLastName: string;
  createdDate: string;
  CreatedDate: string;
  EmployeeId: null;
  EmployeeName: null;
  FleetInfo: null;
  HowDiscoveredId: number;
  IsExtracted: boolean;
  LogPageCreationDate: string;
  LogPageNumber: string;
  ModifiedbyFirstName: string;
  ModifiedbyLastName: string;
  NatureOfReportIds: number[];
  OperatorControlNumber: null;
  PartDetails: PartDetails;
  PrecautionaryProcedureIds: number[];
  sdrNumber: string;
  StageId: number;
  Station: string;
  Status: string;
  StatusId: number;
  submittedDate: string;
}

export interface PartDetails {
  PartCondition: string;
  PartDescription: string;
  PartLocation: string;
  PartManufacturerSerialNumber: string;
  PartSerialNumber: string;
  PartTrackingNumber: null;
}
