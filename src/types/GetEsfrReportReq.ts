export interface GetEsfrReportReq {
  pageIndex: number;
  pageSize: number;
  reportStatus: number;
  reportType: string;
  logPageNumber: string;
  aircraftNumber: string;
  auditNumber: string;
  station: string;
  dateFrom: string;
  dateTo: string;
  reportBy: string;
  keyword: string;
}
