import moment from "moment";
import { RefObject } from "react";
import {
  ISaveSfrValues,
  SelectedStatus,
  TransformedSdrDataType,
  UserPermission,
} from "src/commons/types";
import { GetAllEsfrRecordsResResult, LogpageStatus, Status } from "src/types/GetAllEsfrRecordsRes";
import { EsfrUserPolicy } from "src/types/GetProfilerRes";

export const DATETIME_REQUEST = "YYYY-MM-DDTHH:mm:ss";
export const DATETIME_REFRESH = "MM/DD/YYYY@HH:mm";
export const DATETIME_DISPLAY = "MM/DD/YYYY HH:mm:ss";
export const DATE_DISPLAY = "MM/DD/YYYY";
export const DATE_HTML_DISPLAY = "YYYY-MM-DD";

export const handleScroll = (ref: RefObject<any> | null) => {
  if (ref?.current) {
    ref.current.scrollTo({ top: 0, left: 0 });
  }
  if (window) {
    window.scrollTo(0, 0);
  }
};

export const handleFocus = (ref: RefObject<HTMLDivElement> | null) => {
  if (ref?.current) {
    ref.current.focus();
  }
};

export const transformSdrData = (
  sdrData: GetAllEsfrRecordsResResult[],
  statusId: SelectedStatus
): TransformedSdrDataType[] => {
  let sdrStatusText = Status.Open;
  switch (statusId) {
    case 4:
      sdrStatusText = Status.Approved;
      break;
    case 3:
      sdrStatusText = Status.ApprovedWithFollowUp;
      break;
    case 2:
    default:
      sdrStatusText = Status.Open;
      break;
  }
  return sdrData
    .map((data) => ({
      ...data,
      SdrStatus: sdrStatusText,
    }))
    .sort((a, b) => +moment(b.CreatedDate) - +moment(a.CreatedDate));
};

export const filterSdrData = (
  sdrData: TransformedSdrDataType[],
  filters: LogpageStatus[]
): TransformedSdrDataType[] =>
  sdrData
    ? sdrData.filter((sdr) => sdr.LogpageStatus && filters.includes(sdr.LogpageStatus))
    : sdrData;

export const transformCreateSfrValues = (values: ISaveSfrValues) => {
  let { searchDescription, ATAChapter, ATASubChapter, PartNumber, Structure, DiscrepancyPartInformationCode, DocumentType, SpecIdentifier1, SpecIdentifier2, SpecIdentifier3, SpecIdentifier4, CalDocIdentifier1, CalDocIdentifier2, CalDocIdentifier3, CalDocIdentifier4, SRM1, SRM11, SRM12, SRM13, SRM2, SRM21, SRM22, SRM23, SRM3, SRM31, SRM32, SRM33, SRMPage, SRMFig, AMM1, AMM11, AMM12, AMM13, AMM2, AMM21, AMM22, AMM23, AMM3, AMM31, AMM32, AMM33, AMMPage, AMMFig, CMM1, CMM11, CMM12, CMM13, CMM2, CMM21, CMM22, CMM23, CMM3, CMM31, CMM32, CMM33, CMMPage, CMMFig, RepairECRA1, RepairECRA2, ...rest} = values;
  return rest;
};

export const formatCodes = (arr: string[]) => {
  if (!arr) return "";
  let res = "";
  for (const a of arr) {
    if (!a) {
      break;
    } else {
      res += "-" + a;
    }
  }
  return res.slice(1);
};

export const joinCodes = (arr: string[]) => {
  if (!arr) return "";
  let res = "";
  for (const a of arr) {
    if (!a) {
      break;
    } else {
      res += ", " + a;
    }
  }
  return res.slice(2);
};

export const saveTextAsFile = (textToWrite: string, fileNameToSaveAs: string) => {
  let textFileAsBlob = new Blob([textToWrite], { type: "text/plain" });
  let downloadLink = document.createElement("a");
  downloadLink.download = fileNameToSaveAs;
  downloadLink.innerHTML = "Download File";
  let blobUrl;
  if (window.webkitURL != null) {
    blobUrl = window.webkitURL.createObjectURL(textFileAsBlob);
  } else {
    blobUrl = window.URL.createObjectURL(textFileAsBlob);
  }
  downloadLink.href = blobUrl;
  downloadLink.click();
  if (window.webkitURL != null) {
    window.webkitURL.revokeObjectURL(blobUrl);
  } else {
    window.URL.revokeObjectURL(blobUrl);
  }
};

export const getUserPermission = (EsfrUserPolicies: EsfrUserPolicy[]): UserPermission => {
  const dict: { [key: string]: UserPermission } = {
    IsReliability: UserPermission.CRU,
    IsTomC: UserPermission.CRU,
    IsEngineering: UserPermission.R,
    IsRecords: UserPermission.R,
    IsQualityControl: UserPermission.R,
  };
  const permission = EsfrUserPolicies.reduce(
    (acc, cur) => (dict[cur.PolicyName] > acc ? dict[cur.PolicyName] : acc),
    UserPermission.Invalid
  );
  return permission;
};

export const clearLocalStorage = () => {
  let storage: any = {};
  Object.keys(window.localStorage).filter((key) => {
    if (key && key.indexOf("user_") > -1) {
      let data = window.localStorage.getItem(key);
      if (data) {
        storage[key] = JSON.parse(data);
      }
    }
  });
  // clear the localStorage
  window.localStorage.clear();
  // add the user preferences back to localStorage
  Object.entries(storage).map(([key, value]) => {
    window.localStorage.setItem(key, JSON.stringify(value));
  });
};

export const toFixed = (a: number | string | undefined) => {
  return !!a && !!Number(a) ? Number(a).toFixed(2) : 0;
};
