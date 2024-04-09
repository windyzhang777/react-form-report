export interface GetCtnRes {
  Timestamp: string;
  ResponseTime: number;
  Errors: any[];
  ErrorCode: null;
  Result: GetCtnResResult;
}

export interface GetCtnResResult {
  FleetMasterResponse: FleetMasterResponse[];
}

export interface FleetMasterResponse {
  Code: string;
  Description: string;
  DisplayOrder: number;
  Id: number;
}
