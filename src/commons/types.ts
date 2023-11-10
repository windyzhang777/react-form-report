// enum to hold the report statuses

import {ReactElement} from "react";

export enum ReportStatus {
  Open = 0,
  FlaggedForFollowUp = 1,
  Approved = 2,
}

// common data grid
export interface CompDataGrid {
  reportStatus: string;
  reportIndex: number;
  updateOpenSdrCount: (a: number, b: number) => void;
  setViewSdrFlag: (a: boolean) => void;
  setSelectedSdrId: (a: number) => void;
}

// grid col definition
export interface GridColDef {
  headerName: string;
  field: string;
  flex?: number;
  valueGetter?: (params: NameValuesGetterParams) => void;
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

export interface NameValuesGetterParams {
  row: {
    FirstName: string;
    LastName: string;
    CreatedBy: string;
  }
}

export interface RowRowApi {
  rowApi: {
    row: {
      LogPageNumber: string;
      datetime: string;
    }
  }
}

export interface RowApi {
  row: {
    LogPageNumber: string;
    datetime: string;
  }
}
