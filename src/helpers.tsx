import moment from "moment";
import { RefObject } from "react";
import {
  IApproveSfrValues,
  ISaveSfrValues,
  SelectedStatus,
  TransformedSdrDataType,
  UserPermission,
} from "src/commons/types";
import {
  reportCSS,
  transformACInfo,
  transformLogInfo,
  transformLogo,
} from "src/components/reports/printOptions";
import ESFRLogo from "src/icons/logo-esfr.png";
import { GetAllEsfrRecordsResResult, LogpageStatus, Status } from "src/types/GetAllEsfrRecordsRes";
import { UserPolicy } from "src/types/GetProfilerRes";
import config from "src/utils/env.config";

export const DATETIME_REQUEST = "YYYY-MM-DDTHH:mm:ss";
export const DATETIME_REFRESH = "MM/DD/YYYY HH:mm";
export const DATETIME_DISPLAY = "MM/DD/YYYY HH:mm:ss";
export const DATE_DISPLAY = "MM/DD/YYYY";
export const DATE_HTML_DISPLAY = "YYYY-MM-DD";

export const openLogPage = (logpageNumber: string) => {
  let width = window.innerWidth;
  let url = `${config.webTechApiBaseUrl}${config.URL_LOGPAGE_SEARCH}?logPageNumber=${logpageNumber}`;
  window.open(
    url,
    "_blank",
    "width=" +
      (width - 450) / 2 +
      ",height=" +
      (window.innerHeight - 320) +
      ",left=" +
      (width / 2 - 50) +
      ",top=450"
  );
};

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
  let { searchDescription, ATAChapter, ATASubChapter, DocumentType, SpecIdentifier1, SpecIdentifier2, SpecIdentifier3, SpecIdentifier4, CalDocIdentifier1, CalDocIdentifier2, CalDocIdentifier3, CalDocIdentifier4, SRM1, SRM11, SRM12, SRM13, SRM2, SRM21, SRM22, SRM23, SRM3, SRM31, SRM32, SRM33, SRMPage, SRMFig, AMM1, AMM11, AMM12, AMM13, AMM2, AMM21, AMM22, AMM23, AMM3, AMM31, AMM32, AMM33, AMMPage, AMMFig, CMM1, CMM11, CMM12, CMM13, CMM2, CMM21, CMM22, CMM23, CMM3, CMM31, CMM32, CMM33, CMMPage, CMMFig, EcraCode1, EcraCode2, ...rest} = values;
  return rest;
};

export const transformUpsertSfrValues = (values: IApproveSfrValues) => {
  let { SdrId, SnapshotId, SfrAdditionalDetails, AircraftDetails, LogPageCreationDate, AircraftNumber, PrecautionaryProcedureIds, NatureOfReportIds, StageId, HowDiscoveredId, EmployeeId, EmployeeName, PartDetails, CorrectiveAction, OperatorControlNumber, IsExtracted, IsSdrDowngraded, IsMajorRepair, IsSdrCompleted, IsSdrReportable, ...rest} = values;
  return rest;
};

export const formatCodes = (arr: string[]) => {
  if (!arr) return "";
  let res = "";
  for (const a of arr) {
    if (!a) {
      continue;
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

export const saveTextAsFileAsync = async (textToWrite: string, fileNameToSaveAs: string) => {
  const filename = fileNameToSaveAs || "FAA-" + moment().format("MMDDYYYY") + "0002";
  const content = textToWrite;
  let textFileAsBlob = new Blob([content], { type: "text/plain" });
  if (window.showSaveFilePicker) {
    const options = {
      suggestedName: filename,
      types: [
        {
          description: "Text file",
          accept: {
            "text/plain": [".txt"] as `.${string}`[],
          },
        },
      ],
    };
    const handle = await window.showSaveFilePicker(options);
    const writable = await handle.createWritable();
    await writable.write(textFileAsBlob);
    await writable.close();
  } else {
    let downloadLink = document.createElement("a");
    downloadLink.download = filename;
    downloadLink.innerHTML = "Download File";
    let blobUrl;
    if (window.webkitURL) {
      blobUrl = window.webkitURL.createObjectURL(textFileAsBlob);
    } else {
      blobUrl = window.URL.createObjectURL(textFileAsBlob);
    }
    downloadLink.href = blobUrl;
    downloadLink.click();
    if (window.webkitURL) {
      window.webkitURL.revokeObjectURL(blobUrl);
    } else {
      window.URL.revokeObjectURL(blobUrl);
    }
  }
};

export const getUserPermission = (UserPolicies: UserPolicy[]): UserPermission => {
  const dict: { [key: string]: UserPermission } = {
    IsReliability: UserPermission.CRU,
    IsTomC: UserPermission.CRU,
    IsEngineering: UserPermission.R,
    IsRecords: UserPermission.R,
    IsQualityControl: UserPermission.CRU,
  };
  const permission = UserPolicies.reduce(
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

export const toFixed = (a: number | string | undefined, maxAllowedDecimal: number = 2) => {
  return !!a && !!Number(a)
    ? Number(a) > Math.floor(Number(a))
      ? Number(a).toFixed(maxAllowedDecimal)
      : Number(a)
    : 0;
};

export const trimMultipleSelected = (arr: string | string[]) => {
  return Array.isArray(arr) ? (arr.length ? (arr.indexOf("") > -1 ? [] : arr) : arr) : arr;
};

export const printAsPage = (acInfo: string[], logInfo: string[]) => {
  const content = document.getElementById("print-sdr");
  let menu = document.createElement("div");
  menu.innerHTML = transformACInfo(acInfo);
  const a = window.open("", "", "height=1000, width=1000");
  if (content && a) {
    a.document.write(`
    <html><head><style>
    ${reportCSS}
    </style></head>
    `);
    a.document.write("<body><div class='print'>");
    a.document.write(transformLogo(ESFRLogo));
    a.document.write(content.innerHTML);
    const button = a.document.getElementById("view-details-arrow-menu-button");
    if (button && button.parentNode) {
      button.parentNode.replaceChild(menu, button);
    }
    const signature = a.document.getElementById("signature");
    if (signature) {
      signature.innerHTML += transformLogInfo(logInfo);
    }
    a.document.write("</div></body></html>");
    a.document.close();
    a.print();
  }
};
