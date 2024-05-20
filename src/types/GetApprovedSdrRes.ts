import { ComponentDetails, EngineDetails, PartDetails } from "src/types/GetSdrEsfrRecordDetailsRes";

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
  ComponentDetails: ComponentDetails;
  CorrectiveAction: string;
  CreatedBy: string | null;
  CreatedbyFirstName: string;
  CreatedbyLastName: string;
  CreatedDate: string;
  EmployeeId: string | null;
  EmployeeName: string | null;
  EngineDetails: EngineDetails;
  HowDiscoveredId: number | null;
  IsExtracted: boolean;
  LogPageCreationDate: string;
  LogPageNumber: string;
  ModifiedbyFirstName: string;
  ModifiedbyLastName: string;
  NatureOfReportIds: number[];
  OperatorControlNumber: string;
  PartCondition: string;
  PartDescription: string;
  PartDetails: PartDetails;
  PartLocation: string;
  PartManufacturerSerialNumber: string;
  PartSerialNumber: string;
  PartTrackingNumber: string | null;
  PrecautionaryProcedureIds: number[];
  SdrId: number;
  SfrDetails: SfrDetails;
  SnapshotId: number;
  StageId: number | null;
  Station: string;
  Status: string;
  StatusId: number;
  IsMajorRepair: boolean;
  IsSdrDowngraded: boolean;
  IsSdrCompleted: boolean;
  IsSdrReportable: boolean;
  PartCycleSince: string;
  PartTimeSince: string;
  PartTotalCycles: string;
  PartTotalTime: string;
  PartManufacturerName: string | null;
  PartName: string | null;
  PartType: string | null;
}

export interface AircraftDetails {
  Manufacturer: string;
  Model: string;
  RegistryNNumber: string;
  SerialNumber: string;
  TotalCycles: string;
  TotalTime: string;
}

export interface SfrDetails {
  AtaCode: string;
  ButtlineFrom: string;
  ButtlineFromSide: string;
  ButtlineTo: string;
  ButtlineToSide: string;
  ComponentManufacturerName: string | null;
  ComponentName: string | null;
  CorrisionLevel: string;
  CrackLength: string | null;
  FAAReceivingRegionCode: string | null;
  FuselageFromSta: string;
  FuselageToSta: string;
  NumberOfCracks: number | null;
  OperatorDesignator: string;
  OperatorType: string;
  PartManufacturerName: string | null;
  PartModelNumber: string | null;
  PartName: string | null;
  PartNumber: string | null;
  ReceivingDistrictOffice: string;
  SnapshotId: string;
  StringerFrom: string;
  StringerFromSide: string;
  StringerTo: string;
  StringerToSide: string;
  StructuralOther: string | null;
  SubmitterDesignator: string | null;
  SubmitterType: string;
  WaterlineFrom: string;
  WaterlineTo: string;
  WingStationFrom: string;
  WingStationFromSide: string;
  WingStationTo: string;
  WingStationToSide: string;
}
