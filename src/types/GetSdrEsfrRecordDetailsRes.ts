export interface GetSDREsfrRecordDetailsRes {
  Timestamp: string;
  ResponseTime: number;
  Errors: any[];
  ErrorCode: null;
  Result: GetSDREsfrRecordDetailsResResult;
}

export interface GetSDREsfrRecordDetailsResResult {
  AirCraftNumber: null;
  CreatedBy: string;
  CreatedbyFirstName: string;
  CreatedbyLastName: string;
  CreatedDate: string;
  DiscrepancyDetails: DiscrepancyDetails;
  FleetInfo: FleetInfo;
  LocationDetails: LocationDetails;
  LogPageCreatedBy: string;
  LogPageCreatedDate: string;
  LogPageNumber: string;
  ModifiedBy: null;
  ModifiedbyFirstName: string;
  ModifiedbyLastName: string;
  ModifiedDate: string;
  OperatorControlNumber: null;
  OriginDetails: OriginDetails;
  RepairDetails: RepairDetails;
  SdrDetails: SDRDetails;
  SfrActivity: null;
  SfrId: number;
  Station: string;
  StatusId: number;
  Type: string;
}

export interface DiscrepancyDetails {
  AreMultipleCracksInTheSameLocation: boolean;
  CorrosionCauseComments: null;
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
  FromSide: null;
  FromSta: null;
  FromStr: null;
  Fuselage: null;
  LocationType: null;
  Other: null;
  Side: string;
  Specifics: string;
  SpecificsLocation: null;
  StaType: null;
  StaTypeId: number;
  Surface: null;
  ToBLLength: number;
  ToSide: null;
  ToSta: null;
  ToStr: null;
  ZoneId: number;
}

export interface OriginDetails {
  CalDocId: number;
  CalDocIdentifier: string;
  DetectionMethodComments: string;
  DetectionMethodId: number;
  InspectionType: number;
  IsScheduledInspection: boolean;
  MfrSourceComments: null;
  MfrSourceId: number;
  MfrSourceIdentifier: string;
  Op: null;
  Rev: null;
  SpecIdentifier: string;
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
  RepairTypes: any[];
  Rev: string;
}

export interface SDRDetails {
  CreatedBy: null;
  CreatedbyFirstName: string;
  CreatedbyLastName: string;
  createdDate: string;
  EmployeeId: null;
  EmployeeName: null;
  HowDiscoveredId: number;
  LogPageCreationDate: string;
  LogPageNumber: string;
  ModifiedbyFirstName: string;
  ModifiedbyLastName: string;
  NatureOfReportIds: number[];
  PartDetails: PartDetails;
  PrecautionaryProcedureIds: number[];
  sdrNumber: string;
  StageId: number;
  Station: string;
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
