export interface GetCpcpReportReq {
    pageIndex: number;
    pageSize: number;
    corrosionLevel: string;
    fleet: string;
    acNumber: string;
    station: string;
    dateFrom: string;
    dateTo: string;
  }