export interface DoesSDRExistsRes {
  Timestamp: Date;
  ResponseTime: number;
  Errors: any[];
  ErrorCode: null;
  Result: DoesSDRExistsResResult;
}

export interface DoesSDRExistsResResult {
  IsSdrExists: boolean;
}
