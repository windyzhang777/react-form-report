export interface GetPartsReportRes {
    Timestamp: string;
    ResponseTime: number;
    Errors: any[];
    ErrorCode: null;
    Result: GetPartsReportResResult[];
  }
  
  export interface GetPartsReportResResult {
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
      DefectDescription: string;
      PartName: string;
      PartNumber: string;
      Pse: string;
      EcraNumber: string;
  }
  