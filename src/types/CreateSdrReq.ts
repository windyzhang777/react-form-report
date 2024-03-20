export interface CreateSDRReq {
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
}

export interface PartDetails {
  PartTrackingNumber: string;
  PartManufacturerSerialNumber: string;
  PartSerialNumber: string;
  PartLocation: string;
  PartCondition: string;
  PartDescription: string;
}
