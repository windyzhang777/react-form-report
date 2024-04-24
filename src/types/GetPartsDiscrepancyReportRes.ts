import { MajorRepair } from "src/types/GetCpcpReportRes";
import { OptionDocument } from "src/types/GetSfrMasterDataRes";

export interface GetPartsDiscrepancyReportRes {
  Timestamp: string;
  ResponseTime: number;
  Errors: any[];
  ErrorCode: null;
  Result: GetPartsDiscrepancyReportResResult[];
}

export interface GetPartsDiscrepancyReportResResult {
  AircraftNumber: null | string;
  AtaCode: null | string;
  CorrosionLevel: OptionDocument[] | null;
  DateCreated: string;
  DefectDescription: OptionDocument[] | null;
  ECRANumber: string;
  Fleet: null | string;
  Id: number;
  LogpageNumber: string;
  MajorRepair: MajorRepair;
  OperatorControlNumber: null | string;
  PartName: null | string;
  PartNumber: null | string;
  PSE: MajorRepair;
  RepairDocNumber: null | string;
  Station: string;
}
