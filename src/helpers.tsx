import moment from "moment";
import { RefObject } from "react";
import { SelectedStatus, TransformedSdrDataType, UserPermission } from "src/commons/types";
import { GetAllEsfrRecordsResResult, Status } from "src/types/GetAllEsfrRecordsRes";
import { EsfrUserPolicy } from "src/types/GetProfilerRes";

export const DATETIME_REQUEST = "YYYY-MM-DDTHH:mm:ss";
export const DATETIME_REFRESH = "MM/DD/YYYY@HH:mm";
export const DATETIME_DISPLAY = "MM/DD/YYYY HH:mm:ss";
export const DATE_HTML_DISPLAY = "YYYY-MM-DD";

export const handleScroll = (ref: RefObject<HTMLDivElement> | null) => {
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

export const isSame = (arr1: any[], arr2: any[]) => {
  if (!arr1 || !arr2) return false;
  if (arr1.length === 0 && arr2.length === 0) return true;
  if (arr1.length === 0 || arr2.length === 0) return false;
  return arr1.sort().join("") === arr2.sort().join("");
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
