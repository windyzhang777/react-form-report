export interface GetSDREsfrRecordDetailsRes {
  Timestamp: string;
  ResponseTime: number;
  Errors: any[];
  ErrorCode: null;
  Result: GetSDREsfrRecordDetailsResResult;
}

export interface GetSDREsfrRecordDetailsResResult {
  AirCraftNumber: null | string;
  AtaCode: null | string;
  CreatedBy: null | string;
  CreatedbyFirstName: null | string;
  CreatedbyLastName: null | string;
  CreatedDate: string;
  DiscrepancyDetails: DiscrepancyDetails | null;
  FleetCode: null | string;
  FleetInfo: FleetInfo;
  LocationDetails: LocationDetails | null;
  LogPageCreatedBy: null | string;
  LogPageCreatedDate: string;
  LogPageNumber: null | string;
  ModifiedBy: null | string;
  ModifiedbyFirstName: null | string;
  ModifiedbyLastName: null | string;
  ModifiedDate: string;
  OperatorControlNumber: null;
  OriginDetails: OriginDetails | null;
  RepairDetails: RepairDetails | null;
  SdrDetails: SDRDetails | null;
  SfrActivity: null;
  SfrId: number;
  Station: null | string;
  Status: string;
  StatusId: number;
  Type: null;
  IsMajorRepair?: boolean;
  IsSfrDowngraded?: boolean;
}

export interface DiscrepancyDetails {
  AreMultipleCracksInTheSameLocation: boolean;
  CorrosionCauseComments: null;
  CorrosionCauseId: number | null;
  CorrosionExtentId: number | null;
  CorrosionLevelId: number | null;
  CrackDepth: number | null;
  CrackLength: number | null;
  CrackWidth: number | null;
  DiscrepancyPartComments: null;
  DiscrepancyPartDetails: DiscrepancyPartDetail[];
  DiscrepancyTypeComments: null;
  DiscrepancyTypeId: number;
  IsManufacturingLimitExceeded: boolean;
  IsSafeOperationEndangered: boolean;
  NumberOfCracks: number | null;
}

export interface DiscrepancyPartDetail {
  AtaCode: string;
  DiscrepancyPartInformationCode: number;
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
  FlightNumber?: string;
}

export interface LocationDetails {
  AdditionalLocationDetails: null;
  Comments: null;
  CoordinateLocationDetails: string;
  DamageProximityId: number | null;
  DefectLocationId: number;
  DefectLocationIdentifier: string;
  ElevatorTab: null | string;
  FromBL: null;
  FromBLLength: number | null;
  FromSide: null | string;
  FromSta: null | string;
  FromStr: null | string;
  Fuselage: null | string;
  LocationType: null;
  Other: null;
  Side: null | string;
  Specifics: null;
  SpecificsLocation: null;
  StaType: null;
  StaTypeId: number | null;
  Surface: null | string;
  ToBL: null;
  ToBLLength: number | null;
  ToSide: null | string;
  ToSta: null | string;
  ToStr: null | string;
  ZoneId: number;
}

export interface OriginDetails {
  CalDocId: number | null;
  CalDocIdentifier: null;
  DetectionMethodComments: null | string;
  DetectionMethodId: number;
  InspectionType: null;
  IsScheduledInspection: boolean;
  MfrSourceComments: null;
  MfrSourceId: number | null;
  MfrSourceIdentifier: null;
  Op: null;
  Rev: null;
  SpecIdentifier: null;
  UnscheduledInspectionTypeComments: null | string;
  UnscheduledInspectionTypeId: number;
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
  AircraftNumber: string;
  CorrectiveAction: string;
  CreatedBy: string;
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
  OperatorControlNumber: null | string;
  PartDetails: PartDetails;
  PrecautionaryProcedureIds: number[];
  sdrNumber: string;
  StageId: number;
  Station: string;
  Status: string;
  StatusId: number;
  submittedDate: string;
  IsMajorRepair?: boolean;
  IsSdrDowngraded?: boolean;
}

export interface PartDetails {
  PartCondition: string;
  PartDescription: string;
  PartLocation: string;
  PartManufacturerSerialNumber: string;
  PartSerialNumber: string;
  PartTrackingNumber: null;
}
