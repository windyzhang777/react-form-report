export interface CreateSfrReq {
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
  SdrDetails: SDRDetails;
  CreatedbyFirstName: string;
  CreatedbyLastName: string;
  ModifiedbyFirstName: string;
  ModifiedbyLastName: string;
  FleetCode: string;
  AtaCode: string;
  IsSfrDowngraded?: boolean;
  IsMajorRepair?: boolean;
  IsSfrCompleted?: boolean;
}

export interface DiscrepancyDetails {
  IsManufacturingLimitExceeded: boolean;
  DiscrepancyTypeId: string | number;
  CorrosionLevelId: string | number;
  CorrosionCauseId: string | number;
  CorrosionExtentId: string | number;
  CorrosionCauseComments: string;
  AreMultipleCracksInTheSameLocation: boolean;
  NumberOfCracks: number;
  CrackLength: string;
  CrackWidth: string;
  CrackDepth: string;
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
  DiscrepancyPartInformationCode: string | number;
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
  FromBL: string;
  ToBL: string;
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
  ElevatorTab: string;
  Fuselage: string;
  Other: string;
  AdditionalLocationDetails: string;
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
  UnscheduledInspectionTypeId: string | number;
  UnscheduledInspectionTypeComments: string;
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

export interface SDRDetails {
  LogPageCreationDate: string;
  Station: string;
  LogPageNumber: string;
  AircraftNumber: string;
  PrecautionaryProcedureIds: number[];
  NatureOfReportIds: number[];
  StageId: number;
  StatusId: number;
  HowDiscoveredId: number;
  EmployeeId: string;
  EmployeeName: string;
  PartDetails: PartDetails;
  CreatedbyFirstName: string;
  CreatedbyLastName: string;
  ModifiedbyFirstName: string;
  ModifiedbyLastName: string;
  CreatedDate: string;
  CorrectiveAction: string;
  OperatorControlNumber: string;
  IsExtracted: boolean;
  IsSdrDowngraded?: boolean;
  IsMajorRepair?: boolean;
  IsSdrCompleted?: boolean;
}

export interface PartDetails {
  PartTrackingNumber: string;
  PartManufacturerSerialNumber: string;
  PartSerialNumber: string;
  PartLocation: string;
  PartCondition: string;
  PartDescription: string;
}

export interface SfrActivity {
  Comments: string;
  CreatedDate: string;
  EmployeeId: string;
  EmployeeName: string;
}
