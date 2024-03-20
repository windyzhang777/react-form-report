export interface ViewLogpageRes {
  Timestamp: string;
  ResponseTime: number;
  Errors: any[];
  ErrorCode: null;
  Result: ViewLogpageResResult;
}

export interface ViewLogpageResResult {
  FleetInfo: FleetInfo;
  MasterData: MasterData;
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

export interface MasterData {
  Fuselagestations: Fuselagestation[];
  StaTypes: Fuselagestation[];
  Stringer: Fuselagestation[];
  Zones: Fuselagestation[];
}

export interface Fuselagestation {
  Description: string;
  DisplayOrder: number;
  Id: number;
}
