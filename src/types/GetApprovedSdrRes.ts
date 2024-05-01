export interface GetApprovedSDRRes {
  Timestamp: string;
  ResponseTime: number;
  Errors: any[];
  ErrorCode: null;
  Result: GetApprovedSDRResResult;
}

export interface GetApprovedSDRResResult {
  AircraftDetails: AircraftDetails;
  AircraftNumber: string;
  CorrectiveAction: string;
  CreatedbyFirstName: string;
  CreatedbyLastName: string;
  CreatedDate: string;
  EmployeeId: string | null;
  EmployeeName: string | null;
  HowDiscoveredId: number;
  IsExtracted: boolean;
  LogPageCreationDate: string;
  LogPageNumber: string;
  ModifiedbyFirstName: string;
  ModifiedbyLastName: string;
  NatureOfReportIds: number[];
  OperatorControlNumber: string;
  PartCondition: string;
  PartDescription: string;
  PartDetails: PartDetails | null;
  PartLocation: string;
  PartManufacturerSerialNumber: string;
  PartSerialNumber: string;
  PartTrackingNumber: string;
  PrecautionaryProcedureIds: number[];
  SdrId: number;
  SfrDetails: SfrDetails;
  SnapshotId: number;
  StageId: number;
  Station: string;
  Status: string;
  StatusId: number;
  IsMajorRepair: boolean;
  IsSdrDowngraded: boolean;
  IsSdrCompleted: boolean;
  IsSdrReportable: boolean;
}

export interface AircraftDetails {
  Manufacturer: string;
  Model: string;
  RegistryNNumber: string;
  SerialNumber: string;
  TotalCycles: string;
  TotalTime: string;
}

export interface PartDetails {
  PartTrackingNumber: string;
  PartManufacturerSerialNumber: string;
  PartSerialNumber: string;
  PartLocation: string;
  PartCondition: string;
  PartDescription: string;
  PartTotalTime: string;
  PartTotalCycles: string;
  PartTimeSince: string;
  PartCycleSince: string;
}

export interface SfrDetails {
  AtaCode: string;
  ButtlineFrom: string;
  ButtlineFromSide: string;
  ButtlineTo: string;
  ButtlineToSide: string;
  ComponentManufacturerName: string;
  ComponentName: string;
  CorrisionLevel: string;
  CrackLength: string | null;
  FAAReceivingRegionCode: string;
  FuselageFromSta: string;
  FuselageToSta: string;
  NumberOfCracks: number;
  OperatorDesignator: string;
  OperatorType: string;
  PartManufacturerName: string;
  PartModelNumber: string;
  PartName: string;
  PartNumber: string;
  ReceivingDistrictOffice: string;
  SnapshotId: string;
  StringerFrom: string;
  StringerFromSide: string;
  StringerTo: string;
  StringerToSide: string;
  StructuralOther: string;
  SubmitterDesignator: string;
  SubmitterType: string;
  WaterlineFrom: string;
  WaterlineTo: string;
  WingStationFrom: string;
  WingStationFromSide: string;
  WingStationTo: string;
  WingStationToSide: string;
}
