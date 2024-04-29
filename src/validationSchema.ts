import moment from "moment";
import { array, date, number, object, string } from "yup";

export const ValidationSchema = {
  LogPageNumber: string().matches(/^[0-9]{7}$/, "Not a valid Logpage Number"),
  LogPageCreationDate: date().max(moment().endOf("day"), "Cannot use future date"),
  Station: string().matches(/^[a-zA-Z]{1,3}$/, "Not a valid Station"),
  AircraftNumber: string().matches(/^[0-9]{4}$/, "Not a valid Aircraft Number"),
  AtaCode: string().matches(/^[a-zA-Z0-9]{1,4}$/, "Not a valid ATA Code"),
  PrecautionaryProcedureIds: array().min(1, "Required field").max(4),
  NatureOfReportIds: array().min(1, "Required field").max(3),
  StageId: number().min(1, "Required field"),
  HowDiscoveredId: number().min(1, "Required field"),
  SubmitterDesignator: string().max(10, "Up to 10 characters"),
  ComponentDetails: object().shape({
    ComponentName: string().ensure(),
    ComponentManufactureName: string().when("ComponentName", {
      is: (v: string) => !!v && v.trim().length > 0,
      then(schema) {
        return schema.required("Required field");
      },
    }),
    ComponentPartNumber: string().when("ComponentName", {
      is: (v: string) => !!v && v.trim().length > 0,
      then(schema) {
        return schema.required("Required field");
      },
    }),
    ComponentPartSerialNumber: string().when("ComponentName", {
      is: (v: string) => !!v && v.trim().length > 0,
      then(schema) {
        return schema.required("Required field");
      },
    }),
    ComponentPartModelNumber: string().when("ComponentName", {
      is: (v: string) => !!v && v.trim().length > 0,
      then(schema) {
        return schema.required("Required field");
      },
    }),
    ComponentLocation: string().when("ComponentName", {
      is: (v: string) => !!v && v.trim().length > 0,
      then(schema) {
        return schema.required("Required field");
      },
    }),
    PartTotalTime: string().when("ComponentName", {
      is: (v: string) => !!v && v.trim().length > 0,
      then(schema) {
        return schema.required("Required field");
      },
    }),
    PartTotalCycles: string().when("ComponentName", {
      is: (v: string) => !!v && v.trim().length > 0,
      then(schema) {
        return schema.required("Required field");
      },
    }),
    PartTimeSince: string().when("ComponentName", {
      is: (v: string) => !!v && v.trim().length > 0,
      then(schema) {
        return schema.required("Required field");
      },
    }),
    PartTimeSinceCode: string().when("ComponentName", {
      is: (v: string) => !!v && v.trim().length > 0,
      then(schema) {
        return schema.required("Required field");
      },
    }),
  }),
  OperatorControlNumber: string().max(20, "Up to 20 characters"),
  ReportedBy: string().max(30, "Up to 30 characters"),
  Keyword: string().max(30, "Up to 30 characters"),
  SfrAdditionalDetails: object().shape({
    NumberOfCracks: number()
      .integer("Not a valid value")
      .min(0, "Not a valid value")
      .max(255, "Not a valid value"),
    CrackLength: string().matches(/^[1-9]\d{0,7}(?:\.\d{1,3})?$/, "Not a valid value"),
    OperatorType: string()
      .trim()
      .matches(/^[a-zA-Z0-9]+$/, "Not a valid value"),
    SubmitterType: string()
      .trim()
      .matches(/^[a-zA-Z0-9]+$/, "Not a valid value"),
  }),
  PartNumber: string().max(30, "Up to 30 characters"),
  upTo250: string().max(250, "Up to 250 characters"),
  upTo200: string().max(200, "Up to 200 characters"),
  upTo100: string().max(100, "Up to 100 characters"),
  upTo50: string().max(50, "Up to 50 characters"),
  upTo10: string().matches(/^[a-zA-Z0-9]{0,10}$/, "Up to 10 characters"),
  upTo7: string().matches(/^[a-zA-Z0-9]{0,7}$/, "Up to 7 characters"),
  upTo4: string().matches(/^[a-zA-Z0-9]{0,4}$/, "Up to 4 characters"),
  hasValue: string().matches(/^[a-zA-Z0-9]+$/, "Not a valid value"),
  hasValues: string()
    .min(2, "Required field")
    .matches(/^[a-zA-Z0-9]+$/, "Not a valid value"),
  maxInt99999: number()
    .integer("Not a valid value")
    .min(0, "Not a valid value")
    .max(99999, "Not a valid value"),
  maxInt999: number()
    .integer("Not a valid value")
    .min(0, "Not a valid value")
    .max(999, "Not a valid value"),
};

export const validationRegex = {
  WorkCard: /^[a-zA-Z1-9]{2}-[a-zA-Z1-9]{4}-1-[a-zA-Z1-9]{4}/,
  FCD: /^[a-zA-Z1-9]{4}-[a-zA-Z1-9]{5}/,
  DIP: /^[a-zA-Z1-9]{7}/,
  Spec: /^[a-zA-Z1-9]{4}-[a-zA-Z1-9]{2}-[a-zA-Z1-9]{1}-[a-zA-Z1-9]{4}/,
  AMM: /^[a-zA-Z1-9]{2}-[a-zA-Z1-9]{2}-[a-zA-Z1-9]{2}/,
  RepairECRA: /^[a-zA-Z1-9]{4}-[a-zA-Z1-9]{5}/,
  Fig: /^[a-zA-Z1-9]{3}/,
};

export default ValidationSchema;
