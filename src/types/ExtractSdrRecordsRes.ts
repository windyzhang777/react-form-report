export interface ExtractSDRRecordsRes {
  Timestamp: string;
  ResponseTime: number;
  Errors: any[];
  ErrorCode: null;
  Result: ExtractSDRRecordsResResult;
}

export interface ExtractSDRRecordsResResult {
  ErrorMessage: null;
  FileName: string;
  IsSuccess: boolean;
  SdrRecords: string[];
}
