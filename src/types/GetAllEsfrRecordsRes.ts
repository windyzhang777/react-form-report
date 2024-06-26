import { SelectedStatus } from "src/commons/types";

export interface GetAllEsfrRecordsRes {
  Timestamp: string;
  ResponseTime: number;
  Errors: any[];
  ErrorCode: null;
  Result: GetAllEsfrRecordsResResult[];
}

export interface GetAllEsfrRecordsResResult {
  AircraftNumber: null | string;
  CreatebyLastName: null | string;
  CreatedBy: string;
  CreatedbyFirstName: null | string;
  CreatedDate: string;
  Id: number;
  IsOlderThan72Hours: boolean;
  LogpageCreationDate: string;
  LogpageNumber: string;
  LogpageStatus: LogpageStatus | null;
  OperatorControlNumber: null | string;
  Station: string;
  Status: Status;
  StatusId: SelectedStatus;
  Type: Type;
}

export enum LogpageStatus {
  Carry = "CARRY",
  Cleared = "Cleared",
  Defer = "DEFER",
  OpenO = "OPEN-O",
  OpenTP = "Open-TP",
  OpenTA = "Open-TA",
  OpenIA = "Open-IA",
  OpenIR = "Open-IR",
  Voided = "Voided",
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
