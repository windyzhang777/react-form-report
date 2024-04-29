export interface ViewLogpageRes {
  Timestamp: string;
  ResponseTime: number;
  Errors: any[];
  ErrorCode: null;
  Result: ViewLogpageResResult;
  TailNumber?: string;
  LogpageNumber?: string;
  Station?: string;
  WorkloadRequest?: WorkloadRequest;
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
  FlightNumber: string;
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

export interface WorkloadRequest {
  TailNumber: string;
  Station: string;
  FlightNumber: string;
  NextFlightNumber: string;
  ArrivalDate: string;
  ScheduledArrivalDate: string;
  BestArrivalDate: string;
  EstimatedDepartureDate: string;
  EstimatedArrivalDate: string;
  DepartureDate: string;
  NextScheduledDepDate: string;
  IsThruFlight: boolean;
  IsEtops: boolean;
  LocalDate: string;
  EmployeeId: string;
  IsModernized: boolean;
  IsVisitSchedule: boolean;
  ShiftNumber: number;
  IsLineAircraft: boolean;
  LineStation: string;
  BaseStation: string;
  IsEtaskV3: boolean;
  IsSetUpStandaAlone: boolean;
  IsBaseCrew: boolean;
  ActualInductionDate: string;
  PlannedETRDate: string;
  IsInducted: boolean;
  IsLastSevenDaysSearch: boolean;
}
