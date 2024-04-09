export interface GetDiscrepancyPartsReportReq {
    pageIndex: number;
    pageSize: number;
    fleet: string;
    discrepancyType: string;
    discrepancyParts: string;
    partNumber: string;
    dateFrom: string;
    dateTo: string;
    acNumber: string;
    station: string;
    ataCode: string;
  }