export interface GetCpcpReportReq {
  DateFrom: string;
  DateTo: string;
  CorrosionLevel: string;
  Fleet: string;
  AcNumber: string;
  Station: string;
  PageIndex: number;
  PageSize: number;
}
