export interface GetCpcpReportRes {
  Timestamp: string;
  ResponseTime: number;
  Errors: any[];
  ErrorCode: null;
  Result: GetCpcpReportResResult[];
}

export interface GetCpcpReportResResult {
    Id: number;
    OperatorControlNumber: string;
    LogpageNumber: string;
    DateCreated: string;
    AircraftNumber: string;
    Fleet: string;
    Station: string;
    AtaCode: string;
    CtnNumber: string;
    MajorRepair: string;
    CorrosionLevel: string;
    RepairDocNumber: string;
}
