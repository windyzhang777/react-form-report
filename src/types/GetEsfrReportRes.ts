import { Status, Type } from "src/types/GetAllEsfrRecordsRes";

export interface GetEsfrReportRes {
  Timestamp: string;
  ResponseTime: number;
  Errors: any[];
  ErrorCode: null;
  Result: GetEsfrReportResResult[];
}

export interface GetEsfrReportResResult {
  AircraftNumber: null | string;
  ApprovedByFirstName: null | string;
  ApprovedById: null | string;
  ApprovedByLastName: null | string;
  DateReported: string;
  Id: number;
  LogpageCreationDate: string;
  LogpageNumber: string;
  OperatorControlNumber: null | string;
  ReportedByFirstName: string;
  ReportedById: string;
  ReportedByLastName: string;
  ReportType: Type;
  Station: string;
  Status: Status;
}
