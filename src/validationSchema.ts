import moment from "moment";
import { array, date, number, object, string } from "yup";

export const regex = {
  LogPageNumber: /^[0-9]{7}$/,
  LogPageNumberPartial: /^[0-9]{1,7}$/,
  Station: /^[a-zA-Z]{1,3}$/,
  AircraftNumber: /^[0-9]{4}$/,
  AtaCode: /^[a-zA-Z0-9]{1,4}$/,
  OperatorControlNumber: /^[a-zA-Z0-9]{0,20}$/,
  WorkCard: /^[a-zA-Z0-9]{2}-[a-zA-Z0-9]{4}-1-[a-zA-Z0-9]{4}/,
  FCD: /^[a-zA-Z0-9]{4}-[a-zA-Z0-9]{5}/,
  DIP: /^[a-zA-Z0-9]{7}/,
  Spec: /^[a-zA-Z0-9]{4}-[a-zA-Z0-9]{2}-[a-zA-Z0-9]{1}-[a-zA-Z0-9]{4}/,
  AMM: /^[a-zA-Z0-9]{2}-[a-zA-Z0-9]{2}-[a-zA-Z0-9]{2}/,
  EcraCode: /^[a-zA-Z0-9]{4}-[a-zA-Z0-9]{5}/,
  Fig: /^[a-zA-Z0-9]{3}/,
  // common
  number8D3: /^(0|[1-9]\d{0,7})(?:\.\d{1,3})?$/,
  numberD3: /^(0|[1-9]\d*)(?:\.\d{1,3})?$/,
  alphaNumeric: /^[a-zA-Z0-9]+$/,
  alphaNumericHyphen: /^[a-zA-Z0-9-]+$/,
  nonAlphaNumeric: /[^a-zA-Z0-9]/gi,
  nonAlphaNumericSpace: /[^a-zA-Z0-9\s]/gi,
  nonAlphaNumericHyphen: /[^a-zA-Z0-9-]/gi,
  nonNumeric: /[^0-9]/gi,
  nonNumericDecimal: /[^0-9.]/gi,
  nonAlphabetic: /[^a-zA-Z]/gi,
  hasValue: /^[a-zA-Z0-9]+$/,
  numOnly: /^([0-9]\d*)(?:\.\d{1,3})?$/,
  intOnly: /^([1-9]\d*)$/,
};

export const removeNonAlphaNumeric = (text: string) => text.replace(regex.nonAlphaNumeric, "");
export const removeNonAlphaNumericSpace = (text: string) =>
  text.replace(regex.nonAlphaNumericSpace, "");
export const removeNonAlphaNumericHyphen = (text: string) =>
  text.replace(regex.nonAlphaNumericHyphen, "");
export const removeNonNumeric = (text: string) => text.replace(regex.nonNumeric, "");
export const removeNonNumericDecimal = (text: string) => text.replace(regex.nonNumericDecimal, "");
export const removeNonAlphabet = (text: string) => text.replace(regex.nonAlphabetic, "");

export const errMsg = {
  alphaNumeric: "Alpha-numeric characters only",
  notValidValue: "Not a valid value",
  notValidNum: "Not a valid number",
  required: "Required field",
  posInt: "Positive integer only",
  noFuture: "Cannot use future date",
  upTo: (count: number) => "Up to " + count + " alpha-numeric characters",
  upToNum: (count: number) => "Up to " + count + " numbers",
};

export const commonSchema = {
  hasValue: string().matches(regex.hasValue, errMsg.notValidValue),
  hasValues: string().min(2, errMsg.required).matches(regex.hasValue, errMsg.notValidValue),
  numOnly: string().matches(regex.numOnly, errMsg.notValidNum),
  upTo: (count: number) => string().matches(regex.alphaNumeric, errMsg.upTo(count)),
  upToNum: (count: number) => string().matches(regex.numOnly, errMsg.upToNum(count)),
  number8D3: string().matches(regex.number8D3, errMsg.notValidNum),
  numberD3: string().matches(regex.numberD3, errMsg.notValidNum),
  intOnly: string().matches(regex.intOnly, errMsg.notValidNum),
  upTo255: number()
    .typeError(errMsg.posInt)
    .integer(errMsg.notValidValue)
    .min(0, errMsg.notValidValue)
    .max(255, errMsg.notValidValue),
};

export const ValidationSchema = {
  LogPageNumber: string().matches(regex.LogPageNumber, "Not a valid Logpage Number"),
  LogPageNumberPartial: string().matches(regex.LogPageNumberPartial, errMsg.upToNum(7)),
  LogPageCreationDate: date().max(moment().endOf("day"), errMsg.noFuture),
  Station: string().matches(regex.Station, "Not a valid Station"),
  AircraftNumber: string().matches(regex.AircraftNumber, "Not a valid Aircraft Number"),
  AtaCode: string().matches(regex.AtaCode, "Not a valid ATA Code"),
  OperatorControlNumber: string().matches(regex.OperatorControlNumber, errMsg.upTo(20)),

  // view, update, createSdr
  PrecautionaryProcedureIds: array().min(1, errMsg.required).max(4),
  NatureOfReportIds: array().min(1, errMsg.required).max(3),
  StageId: number().min(1, errMsg.required),
  HowDiscoveredId: number().min(1, errMsg.required),
  SubmitterDesignator: string().max(10, errMsg.upTo(10)),
  EngineDetails: object().shape({
    EngineTotalTime: commonSchema.number8D3,
    EngineTotalCycles: commonSchema.intOnly,
  }),
  ComponentDetails: object().shape({
    ComponentName: string().ensure(),
    ManufacturerName: string().when("ComponentName", {
      is: (v: string) => !!v && v.trim().length > 0,
      then: (schema) => schema.required(errMsg.required),
    }),
    PartNumber: string().when("ComponentName", {
      is: (v: string) => !!v && v.trim().length > 0,
      then: (schema) => schema.required(errMsg.required),
    }),
    SerialNumber: string().when("ComponentName", {
      is: (v: string) => !!v && v.trim().length > 0,
      then: (schema) => schema.required(errMsg.required),
    }),
    ModelNumber: string().when("ComponentName", {
      is: (v: string) => !!v && v.trim().length > 0,
      then: (schema) => schema.required(errMsg.required),
    }),
    ComponentLocation: string().when("ComponentName", {
      is: (v: string) => !!v && v.trim().length > 0,
      then: (schema) => schema.required(errMsg.required),
    }),
    ComponentTotalTime: string().when("ComponentName", {
      is: (v: string) => !!v && v.trim().length > 0,
      then: () => commonSchema.number8D3.required(errMsg.required),
      otherwise: () => commonSchema.number8D3,
    }),
    ComponentTotalCycles: string().when("ComponentName", {
      is: (v: string) => !!v && v.trim().length > 0,
      then: () => commonSchema.number8D3.required(errMsg.required),
      otherwise: () => commonSchema.number8D3,
    }),
    ComponentTimeSince: string().when("ComponentName", {
      is: (v: string) => !!v && v.trim().length > 0,
      then: () => commonSchema.number8D3.required(errMsg.required),
      otherwise: () => commonSchema.number8D3,
    }),
    ComponentTimeSinceCode: string().when("ComponentName", {
      is: (v: string) => !!v && v.trim().length > 0,
      then: (schema) => schema.required(errMsg.required),
    }),
  }),
  PartDetails: object().shape({
    PartTotalTime: commonSchema.number8D3,
    PartTotalCycles: commonSchema.number8D3,
    PartTimeSince: commonSchema.number8D3,
  }),
  SfrAdditionalDetails: object().shape({
    NumberOfCracks: commonSchema.intOnly,
    CrackLength: commonSchema.number8D3,
    OperatorType: string().trim().matches(regex.hasValue, errMsg.notValidNum),
    SubmitterType: string().trim().matches(regex.hasValue, errMsg.notValidValue),
  }),
};

export const ValidationSchemaSFR = {
  OriginDetails: object().shape({
    MfrSourceId: number(),
    MfrSourceIdentifier: string().when("MfrSourceId", ([MfrSourceId], schema) =>
      !MfrSourceId || MfrSourceId === 6
        ? schema
        : MfrSourceId === 1 || MfrSourceId === 3
        ? schema.required(errMsg.required)
        : schema.matches(regex.alphaNumericHyphen, errMsg.alphaNumeric).required(errMsg.required)
    ),
    MfrSourceComments: string().when("MfrSourceId", {
      is: (v: number) => v === 4,
      then: () => commonSchema.upTo(200),
      otherwise: () => commonSchema.upTo(100),
    }),
    UnscheduledInspectionTypeId: number(),
    UnscheduledInspectionTypeComments: string().when("UnscheduledInspectionTypeId", {
      is: (v: number) => v === 3,
      then: () => commonSchema.upTo(250),
      otherwise: () => commonSchema.upTo(100),
    }),
    CalDocId: number(),
    CalDocIdentifier: string().test(
      "textGroup",
      errMsg.notValidValue,
      (value, validationContext) => {
        const {
          parent: { CalDocId },
        } = validationContext;
        if (!value) return true;
        if (CalDocId === 1) {
          if (value !== "1") {
            return regex.WorkCard.test(value);
          }
        } else if (CalDocId === 2 || CalDocId === 3) {
          return regex.FCD.test(value);
        } else if (CalDocId === 4 || CalDocId === 5) {
          return regex.DIP.test(value);
        }
        return true;
      }
    ),
    // .when("CalDocId", {
    //   is: (v: number) => v === 4 || v === 5,
    //   then: () => commonSchema.upTo(7),
    // }),
    SpecIdentifier: string().test("textGroup", errMsg.notValidValue, (value) =>
      value ? regex.Spec.test(value) : true
    ),
    DetectionMethodId: number().min(1, errMsg.required).required(errMsg.required),
    DetectionMethodComments: commonSchema.upTo(100),
  }),
  DiscrepancyDetails: object().shape({
    DiscrepancyTypeId: number().min(1, errMsg.required).required(errMsg.required),
    CrackLength: commonSchema.numberD3,
    CrackWidth: commonSchema.numberD3,
    CrackDepth: commonSchema.numberD3,
    NumberOfCracks: commonSchema.intOnly,
    DiscrepancyTypeComments: commonSchema.upTo(100),
    DiscrepancyPartDetails: array().of(
      object({
        PartNumber: commonSchema.upTo(20),
        DiscrepancyPartInformationCode: number(),
      })
    ),
    DiscrepancyPartComments: commonSchema.upTo(20).test((value, { createError, parent }) => {
      if (!value && parent.DiscrepancyPartDetails[0].DiscrepancyPartInformationCode === 28) {
        return createError({ message: errMsg.required });
      }
      return true;
    }),
  }),
  LocationDetails: object().shape({
    DefectLocationId: number().min(1, errMsg.required).required(errMsg.required),
    ZoneId: number().min(1, errMsg.required).required(errMsg.required),
    AdditionalLocationDetails: commonSchema.upTo(100),
    CoordinateLocationDetails: commonSchema.upTo(100),
    SpecificsLocation: commonSchema.upTo(100),
    // FromStr: commonSchema.upTo(50),
    // ToStr: commonSchema.upTo(50),
    FromSta: commonSchema.upTo(50),
    ToSta: commonSchema.upTo(50),
    FromBL: commonSchema.upTo(10),
    ToBL: commonSchema.upTo(10),
  }),
  SRM1: string().test("textGroup", errMsg.notValidValue, (value) => {
    if (!value) return true;
    return regex.AMM.test(value);
  }),
  SRM2: string().test("textGroup", errMsg.notValidValue, (value) => {
    if (!value) return true;
    return regex.AMM.test(value);
  }),
  SRM3: string().test("textGroup", errMsg.notValidValue, (value) => {
    if (!value) return true;
    return regex.AMM.test(value);
  }),
  SRMPage: string().test("textGroup", errMsg.notValidValue, (value) => {
    if (!value) return true;
    return regex.Fig.test(value);
  }),
  SRMFig: string().test("textGroup", errMsg.notValidValue, (value) => {
    if (!value) return true;
    return regex.Fig.test(value);
  }),
  AMM1: string().test("textGroup", errMsg.notValidValue, (value) => {
    if (!value) return true;
    return regex.AMM.test(value);
  }),
  AMM2: string().test("textGroup", errMsg.notValidValue, (value) => {
    if (!value) return true;
    return regex.AMM.test(value);
  }),
  AMM3: string().test("textGroup", errMsg.notValidValue, (value) => {
    if (!value) return true;
    return regex.AMM.test(value);
  }),
  AMMPage: string().test("textGroup", errMsg.notValidValue, (value) => {
    if (!value) return true;
    return regex.Fig.test(value);
  }),
  AMMFig: string().test("textGroup", errMsg.notValidValue, (value) => {
    if (!value) return true;
    return regex.Fig.test(value);
  }),
  CMM1: string().test("textGroup", errMsg.notValidValue, (value) => {
    if (!value) return true;
    return regex.AMM.test(value);
  }),
  CMM2: string().test("textGroup", errMsg.notValidValue, (value) => {
    if (!value) return true;
    return regex.AMM.test(value);
  }),
  CMM3: string().test("textGroup", errMsg.notValidValue, (value) => {
    if (!value) return true;
    return regex.AMM.test(value);
  }),
  CMMPage: string().test("textGroup", errMsg.notValidValue, (value) => {
    if (!value) return true;
    return regex.Fig.test(value);
  }),
  CMMFig: string().test("textGroup", errMsg.notValidValue, (value) => {
    if (!value) return true;
    return regex.Fig.test(value);
  }),
  RepairDetails: object().shape({
    Rev: commonSchema.hasValue,
    DipCode: commonSchema.upTo(7),
    Comments: commonSchema.upTo(100),
    MaterialsUtilized: commonSchema.upTo(200),
    ManHoursRequired: commonSchema.upTo(4),
    EcraCode: string().test("textGroup", errMsg.notValidValue, (value) => {
      if (!value) return true;
      return regex.EcraCode.test(value);
    }),
  }),
};

export default ValidationSchema;
