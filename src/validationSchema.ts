import { array, number, object, string } from "yup";

export const ValidationSchema = {
  LogPageNumber: string().matches(/^[0-9]{7}$/, "Not a valid Logpage Number"),
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
  StructureCausingDifficulty: object().shape({
    CrackLength: number().test("len", "up to 5 digits", (val) =>
      val ? val.toString().length <= 5 : true
    ),
    NumberofCracks: number().test("len", "up to 3 digits", (val) =>
      val ? val.toString().length <= 3 : true
    ),
  }),
  PartDetails: object().shape({
    PartLocation: string().test("len", "Not a valid value", (val) =>
      val ? val.toString().trim().length >= 0 : true
    ),
    PartCondition: string().test("len", "Not a valid value", (val) =>
      val ? val.toString().trim().length >= 0 : true
    ),
    PartManufacturerSerialNumber: string().test("len", "Not a valid value", (val) =>
      val ? val.toString().trim().length >= 0 : true
    ),
    PartSerialNumber: string().test("len", "Not a valid value", (val) =>
      val ? val.toString().trim().length >= 0 : true
    ),
    PartDescription: string().test("len", "Not a valid value", (val) =>
      val ? val.toString().trim().length >= 0 : true
    ),
  }),
  OperatorControlNumber: string().max(20, "Up to 20 characters"),
  ReportedBy: string().max(30, "Up to 30 characters"),
  Keyword: string().max(30, "Up to 30 characters"),
  SfrAdditionalDetails: object().shape({
    NumberOfCracks: number().min(0, "Not a valid value").max(255),
    CrackLength: number().test("digits", "Not a valid value", (val) =>
      val ? /^[1-9]\d{0,7}(?:\.\d{1,3})?$/.test(val.toString()) : true
    ),
  }),
  Comments: string().max(250, "Up to 250 characters"),
  Specify: string().max(100, "Up to 100 characters"),
  PartNumber: string().max(30, "Up to 30 characters"),
};

export default ValidationSchema;
