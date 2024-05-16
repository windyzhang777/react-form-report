import { OptionDocument } from "src/types/GetSfrMasterDataRes";

export interface GetCpcpReportRes {
  Timestamp: string;
  ResponseTime: number;
  Errors: any[];
  ErrorCode: null;
  Result: GetCpcpReportResResult[];
}

export interface GetCpcpReportResResult {
  AircraftNumber: null | string;
  AtaCode: null | string;
  CorrosionLevel: OptionDocument[] | null;
  CtnNumber: null | string;
  DateCreated: string;
  Fleet: null | string;
  Id: number;
  LogpageCreationDate: string;
  LogpageNumber: string;
  MajorRepair: YON;
  OperatorControlNumber: null | string;
  RepairDocNumber: null | string;
  Station: string;
}

export enum YON {
  N = "N",
  Y = "Y",
}
