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
  OperatorControlNumber: string;
  LogpageNumber: string;
  LogpageStatus: LogpageStatus | null;
  Status: Status;
  StatusId: StatusId;
  Type: Type;
}

export enum LogpageStatus {
  "Cleared" = "Cleared",
  "OpenO" = "OPEN-O",
}

export enum Status {
  "Approved" = "Approved",
  "ApprovedWithFollowUp" = "Approved with Follow Up",
  "Open" = "Open",
}

export enum StatusId {
  New = 2,
  Approved = 3,
  Flagged = 4,
}

export enum Type {
  "Both" = "Both",
  "SDR" = "SDR",
  "SFR" = "SFR",
}
