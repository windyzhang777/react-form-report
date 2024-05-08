export interface GetLocationStaDataRes {
  Timestamp: string;
  ResponseTime: number;
  Errors: any[];
  ErrorCode: null;
  Result: GetLocationStaDataResResult;
}

export interface GetLocationStaDataResResult {
  StaDataResponse: StaDataResponse;
}

export interface StaDataResponse {
  DamageProximities: DamageProximity[];
  Sta: DamageProximity[];
  Types: DamageProximity[];
}

export interface DamageProximity {
  Code: string;
  Description: string;
  DisplayOrder: number;
  Id: number;
}
