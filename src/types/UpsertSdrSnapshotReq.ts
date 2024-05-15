export interface UpsertSDRSnapshotReq {
  SdrId: number;
  SnapshotId: string | number;
  Type: string | null;
  SfrAdditionalDetails: SfrAdditionalDetails;
  AircraftDetails: AircraftDetails;
  LogPageCreationDate: string | null;
  Station: string | null;
  LogPageNumber: string;
  AircraftNumber: string | null;
  PrecautionaryProcedureIds: number[];
  NatureOfReportIds: number[];
  StageId: number;
  StatusId: number;
  HowDiscoveredId: number;
  EmployeeId: string | null;
  EmployeeName: string | null;
  PartDetails: PartDetails;
  createdBy?: string | null;
  CreatedbyFirstName: string | null;
  CreatedbyLastName: string | null;
  ModifiedbyFirstName: string | null;
  ModifiedbyLastName: string | null;
  CreatedDate: string | null;
  CorrectiveAction: string | null;
  OperatorControlNumber: string | null;
  IsExtracted: boolean;
  IsSdrDowngraded?: boolean;
  IsMajorRepair: boolean;
  IsSdrCompleted?: boolean;
  IsSdrReportable: boolean;
}

export interface AircraftDetails {
  RegistryNNumber: string | null;
  Manufacturer: string | null;
  Model: string | null;
  SerialNumber: string | null;
  TotalTime: string | number;
  TotalCycles: string | number;
}

export interface PartDetails {
  PartTrackingNumber: string | null;
  PartManufacturerSerialNumber: string | null;
  PartSerialNumber: string | null;
  PartLocation: string | null;
  PartCondition: string | null;
  PartDescription: string | null;
  PartTotalTime: string | null;
  PartTotalCycles: string | null;
  PartTimeSince: string | null;
  PartCycleSince: string | null;
}

export interface SfrAdditionalDetails {
  SnapshotId: string | null;
  SubmitterDesignator: string | null;
  SubmitterType: string | null;
  OperatorDesignator: string | null;
  OperatorType: string | null;
  AtaCode: string | null;
  FAAReceivingRegionCode: string | null;
  ReceivingDistrictOffice: string | null;
  PartName: string | null;
  PartManufacturerName: string | null;
  PartNumber: string | null;
  ComponentName: string | null;
  ComponentManufacturerName: string | null;
  PartModelNumber: string | null;
  FuselageFromSta: string | null;
  FuselageToSta: string | null;
  CorrisionLevel: string | null;
  CrackLength: number | string;
  NumberOfCracks: number | string;
  WaterlineFrom: string | null;
  WaterlineTo: string | null;
  StringerFrom: string | null;
  StringerFromSide: string | null;
  StringerTo: string | null;
  StringerToSide: string | null;
  ButtlineFrom: number | string;
  ButtlineFromSide: string | null;
  ButtlineTo: number | string;
  ButtlineToSide: string | null;
  WingStationFrom: string | null;
  WingStationFromSide: string | null;
  WingStationTo: string | null;
  WingStationToSide: string | null;
  StructuralOther: string | null;
}
