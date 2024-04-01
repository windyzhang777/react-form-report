import moment from "moment";
import { RefObject } from "react";
import { TransformedSdrDataType, UserPermission } from "src/commons/types";
import { GetAllEsfrRecordsResResult, StatusId } from "src/types/GetAllEsfrRecordsRes";
import { EsfrUserPolicy } from "src/types/GetProfilerRes";

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
  statusId: StatusId
): TransformedSdrDataType[] => {
  let sdrStatusText = "Open";
  switch (statusId) {
    case 4:
      sdrStatusText = "Approved with Follow Up";
      break;
    case 3:
      sdrStatusText = "Approved";
      break;
    case 2:
    default:
      sdrStatusText = "Open";
      break;
  }
  return sdrData.map((data) => ({
    ...data,
    CreatedDate: moment(data.CreatedDate).format("MM/DD/YYYY hh:mm:ss A"),
    SdrStatus: sdrStatusText,
  }));
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
