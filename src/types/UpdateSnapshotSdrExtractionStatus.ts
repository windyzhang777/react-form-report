export interface UpdateSnapshotSDRExtractionStatusRes {
  Timestamp: string;
  ResponseTime: number;
  Errors: any[];
  ErrorCode: null;
  Result: UpdateSnapshotSDRExtractionStatusResResult;
}

export interface UpdateSnapshotSDRExtractionStatusResResult {
  ErrorMessage: null;
  IsSuccess: boolean;
}
