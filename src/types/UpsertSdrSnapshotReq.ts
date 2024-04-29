export interface UpsertSDRSnapshotReq {
  SdrId: number;
  SnapshotId: string | number;
  Type: string;
  SfrAdditionalDetails: SfrAdditionalDetails;
  AircraftDetails: AircraftDetails;
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
}

export interface AircraftDetails {
  RegistryNNumber: string;
  Manufacturer: string;
  Model: string;
  SerialNumber: string;
  TotalTime: string | number;
  TotalCycles: string | number;
}

export interface PartDetails {
  PartTrackingNumber: string;
  PartManufacturerSerialNumber: string;
  PartSerialNumber: string;
  PartLocation: string;
  PartCondition: string;
  PartDescription: string;
}

export interface SfrAdditionalDetails {
  SnapshotId: string;
  SubmitterDesignator: string;
  SubmitterType: string;
  OperatorDesignator: string;
  OperatorType: string;
  AtaCode: string;
  FAAReceivingRegionCode: string;
  ReceivingDistrictOffice: string;
  PartName: string;
  PartManufacturerName: string;
  PartNumber: string;
  ComponentName: string;
  ComponentManufacturerName: string;
  PartModelNumber: string;
  FuselageFromSta: string;
  FuselageToSta: string;
  CorrisionLevel: string;
  CrackLength: string;
  NumberOfCracks: number;
  WaterlineFrom: string;
  WaterlineTo: string;
  StringerFrom: string;
  StringerFromSide: string;
  StringerTo: string;
  StringerToSide: string;
  ButtlineFrom: string;
  ButtlineFromSide: string;
  ButtlineTo: string;
  ButtlineToSide: string;
  WingStationFrom: string;
  WingStationFromSide: string;
  WingStationTo: string;
  WingStationToSide: string;
  StructuralOther: string;
}
