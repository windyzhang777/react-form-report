import { SelectedStatus } from "src/commons/types";

export interface GetAllEsfrRecordsRes {
  Timestamp: string;
  ResponseTime: number;
  Errors: any[];
  ErrorCode: null;
  Result: GetAllEsfrRecordsResResult[];
}

export interface GetAllEsfrRecordsResResult {
  AircraftNumber: string;
  CreatebyLastName: null | string;
  CreatedBy: string;
  CreatedbyFirstName: null | string;
  CreatedDate: string;
  Id: number;
  IsOlderThan72Hours: boolean;
  LogpageNumber: string;
  LogpageStatus: LogpageStatus | null;
  OperatorControlNumber: string;
  Station: string;
  Status: Status;
  StatusId: SelectedStatus;
  Type: Type;
}

export enum LogpageStatus {
  "Carry" = "CARRY",
  "Cleared" = "Cleared",
  "Defer" = "Defer",
  "OpenD" = "OPEN-D",
  "OpenO" = "OPEN-O",
  "OpenTa" = "OPEN-TA",
  "OpenTp" = "OPEN-TP",
  "Voided" = "Voided",
}

export enum Status {
  "All" = "All",
  "Draft" = "Draft",
  "Open" = "Open",
  "ApprovedWithFollowUp" = "Approved with Follow Up",
  "Approved" = "Approved",
  "SentToFAA" = "Sent to FAA",
}

export enum Type {
  "Both" = "Both",
  "SDR" = "SDR",
  "SFR" = "SFR",
}
