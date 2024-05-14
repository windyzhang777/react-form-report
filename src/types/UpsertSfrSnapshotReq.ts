export interface UpsertSfrSnapshotReq {
  AirCraftNumber: string | null;
  AtaCode: string | null;
  CreatedBy: string | null;
  CreatedbyFirstName: string | null;
  CreatedbyLastName: string | null;
  CreatedDate: string | null;
  DiscrepancyDetails: DiscrepancyDetails;
  FleetCode: string | null;
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
  OriginDetails: OriginDetails;
  RepairDetails: RepairDetails;
  SdrDetails: SDRDetails;
  SfrActivity: SfrActivity;
  Station: string | null;
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
  DiscrepancyPartComments: string | null;
  DiscrepancyPartDetails: DiscrepancyPartDetail[];
  DiscrepancyTypeComments: string | null;
  DiscrepancyTypeId: number | string | null;
  IsManufacturingLimitExceeded: boolean;
  IsSafeOperationEndangered: boolean;
  NumberOfCracks: number | null;
}

export interface DiscrepancyPartDetail {
  AtaCode: string | null;
  DiscrepancyPartInformationCode: number | null;
  PartDetails: string | null;
  PartNumber: string | null;
  Structure: string | null;
}

export interface LocationDetails {
  AdditionalLocationDetails: string | null;
  Comments: string | null;
  CoordinateLocationDetails: string | null;
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
  Surface: string | null;
  ToBL: string | null;
  ToBLLength: number | null;
  ToSide: string | null;
  ToSta: string | null;
  ToStr: string | null;
  ZoneId: number | null;
}

export interface OriginDetails {
  CalDocId: number | null;
  CalDocIdentifier: string | null;
  DetectionMethodComments: string | null;
  DetectionMethodId: number | null;
  InspectionType: number | null;
  IsScheduledInspection: boolean;
  MfrSourceComments: string | null;
  MfrSourceId: number | null;
  MfrSourceIdentifier: string | null;
  Op: string | null;
  Rev: string | null;
  SpecIdentifier: string | null;
  UnscheduledInspectionTypeComments: string | null;
  UnscheduledInspectionTypeId: string | number;
}

export interface RepairDetails {
  Comments: string | null;
  DamageStructureStatus: string | null;
  DipCode: string | null;
  EcraCode: string | null;
  IsDeferred: boolean;
  IsEcra: boolean;
  IsMajorRepair: boolean;
  IsOverWeight: boolean;
  IsRepairOrRework: boolean;
  IsSdrReportable: boolean;
  ManHoursRequired: number | null;
  MaterialsUtilized: string | null;
  RepairType: string | null;
  RepairTypes: RepairType[];
  Rev: string | null;
}

export interface RepairType {
  Code: string | null;
  Fig: string | null;
  Page: string | null;
}

export interface SDRDetails {
  AircraftNumber: string | null;
  CorrectiveAction: string | null;
  CreatedbyFirstName: string | null;
  CreatedbyLastName: string | null;
  CreatedDate: string | null;
  EmployeeId: string | null;
  EmployeeName: string | null;
  HowDiscoveredId: number | null;
  IsExtracted: boolean;
  IsMajorRepair: boolean;
  IsSdrCompleted: boolean;
  IsSdrDowngraded: boolean;
  IsSdrReportable: boolean;
  LogPageCreationDate: string | null;
  LogPageNumber: string | null;
  ModifiedbyFirstName: string | null;
  ModifiedbyLastName: string | null;
  NatureOfReportIds: number[];
  OperatorControlNumber: string | null;
  PartDetails: PartDetails;
  PrecautionaryProcedureIds: number[];
  StageId: number | null;
  Station: string | null;
  StatusId: number | null;
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
  PartTrackingNumber: string | null;
}

export interface SfrActivity {
  Comments: string | null;
  CreatedDate: string | null;
  EmployeeId: string | null;
  EmployeeName: string | null;
}
