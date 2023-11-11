// enum to hold the report statuses

import {ReactElement} from "react";
import moment from "moment/moment";
import defaultConfig from "../utils/default.config";

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
export interface GridRow {
  id: string;
  SdrStatus: string;
  LogPageStatus: string;
  LogPageNumber: string;
  FirstName: string;
  LastName: string;
  CreatedBy: string;
  CreatedDate: string;
}

export interface SdrRowApi {
  LogPageNumber: string;
  FirstName: string;
  LastName: string;
  CreatedBy: string;
  CreatedDate: string;
  SdrNumber: string;
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
  newSdrsData: Array<SdrRowApi>;
}

export interface ApprovedSdrsDataResponse {
  approvedSdrsData: Array<SdrRowApi>;
}

export interface FlaggedSdrsDataResponse {
  flaggedSdrsData: Array<SdrRowApi>;
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

export interface ReducerAction {
  type: string;
  data: object;
  message: string;
}