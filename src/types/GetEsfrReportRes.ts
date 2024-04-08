import { Type } from "src/types/GetAllEsfrRecordsRes";

export interface GetEsfrReportRes {
  Timestamp: string;
  ResponseTime: number;
  Errors: any[];
  ErrorCode: null;
  Result: GetEsfrReportResResult[];
}

export interface GetEsfrReportResResult {
  AircraftNumber: string;
  ApprovedByFirstName: string;
  ApprovedById: string;
  ApprovedByLastName: string;
  DateReported: string;
  Id: number;
  LogpageNumber: string;
  OperatorControlNumber: string;
  ReportedByFirstName: string;
  ReportedById: string;
  ReportedByLastName: string;
  ReportType: Type;
}
