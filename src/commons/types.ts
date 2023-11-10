// enum to hold the report statuses

export enum ReportStatus {
  Open = 0,
  FlaggedForFollowUp = 1,
  Approved = 2,
}

// common data grid
export interface CompDataGrid {
  reportStatus: string;
  reportIndex: number;
  updateOpenSdrCount: any;
  setViewSdrFlag: any;
  setSelectedSdrId: any;
}

// grid col definition
export interface GridColDef {
  headerName: string;
  field: string;
  flex?: number;
  valueGetter?: any;
  renderCell?: any;
  sortable: boolean;
}

// grid row
export interface gridRow {
  id: number;
  SdrStatus: string;
  LogPageStatus: string;
  LogPageNumber: string;
  FirstName: string;
  LastName: string;
  CreatedBy: string;
  CreatedDate: string;
}

export interface TabPanelProps {
  children?: React.ReactNode;
  index?: number;
  value: number;
}

export interface ViewSdrDataProps {
  selectedSdrId: number;
}

export interface NewSdrsDataResponse {
  newSdrsData: Array<any>;
}

export interface ApprovedSdrsDataResponse {
  approvedSdrsData: Array<any>;
}

export interface FlaggedSdrsDataResponse {
  flaggedSdrsData: Array<any>;
}
