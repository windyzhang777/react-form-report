export interface GetSfrMasterDataRes {
  Timestamp: string;
  ResponseTime: number;
  Errors: any[];
  ErrorCode: null;
  Result: GetSfrMasterDataResResult;
}

export interface GetSfrMasterDataResResult {
  CalDocuments: OptionDocument[];
  CorrosionCauses: OptionDocument[];
  CorrosionExtent: OptionDocument[];
  CorrosionLevels: OptionDocument[];
  DefectLocations: OptionDocument[];
  DetectionMethods: OptionDocument[];
  DiscrepancyParts: OptionDocument[];
  DiscrepancyTypes: OptionDocument[];
  HowDiscovered: OptionDocument[];
  MfrSources: OptionDocument[];
  NatureofReports: OptionDocument[];
  PrecautionaryProcedures: OptionDocument[];
  ReportableItems: string;
  Stage: OptionDocument[];
}

export interface OptionDocument {
  Description: string;
  DisplayOrder: number;
  Id: number;
}
