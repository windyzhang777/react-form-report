import { SelectedStatus } from "src/commons/types";

export interface GetAllEsfrRecordsRes {
  Timestamp: string;
  ResponseTime: number;
  Errors: any[];
  ErrorCode: null;
  Result: GetAllEsfrRecordsResResult[];
}

export interface GetAllEsfrRecordsResResult {
  CreatebyLastName: null | string;
  CreatedBy: string;
  CreatedbyFirstName: null | string;
  CreatedDate: string;
  Id: number;
  IsOlderThan72Hours: boolean;
  LogpageNumber: string;
  LogpageStatus: LogpageStatus | null;
  OperatorControlNumber: string | null;
  Status: Status;
  StatusId: SelectedStatus;
  Type: Type;
}

export enum LogpageStatus {
  "Carry" = "CARRY",
  "Cleared" = "Cleared",
  "OPEND" = "OPEN-D",
  "OPENO" = "OPEN-O",
  "Voided" = "Voided",
}

export enum Status {
  "All" = "All",
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
