import moment from "moment";
import { RefObject, useEffect, useRef } from "react";
import { StatusId, TransformedSdrDataType } from "./commons/types";
import { GetAllEsfrRecordsResResult } from "./types/GetAllEsfrRecordsRes";

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

export const usePrevious = (value: any) => {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  }, [value]);

  return ref.current;
};
