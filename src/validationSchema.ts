import { array, number, object, string } from "yup";

export const ValidationSchema = {
  LogPageNumber: string().test("len", "Not valid Logpage Number", (val) =>
    val ? val.toString().trim().length === 7 : true
  ),
  Station: string().matches(/^[a-zA-Z]{3}$/, "Not a valid Station"),
  AircraftNumber: number().test("len", "Not a valid Aircraft Number", (val) =>
    val ? val.toString().trim().length === 4 : true
  ),
  PrecautionaryProcedureIds: array().min(1, "Required field").max(4),
  NatureOfReportIds: array().min(1, "Required field").max(3),
  StageId: number().min(1, "Required field"),
  HowDiscoveredId: number().min(1, "Required field"),
  SubmitterDesignator: string().length(10, "Up to 10 characters"),
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
  }),
  StructureCausingDifficulty: object().shape({
    CrackLength: number().test("len", "up to 5 digits", (val) =>
      val ? val.toString().length <= 5 : true
    ),
    NumberofCracks: number().test("len", "up to 3 digits", (val) =>
      val ? val.toString().length <= 3 : true
    ),
    CCCrackLength: number().test("len", "up to 5 digits", (val) =>
      val ? val.toString().length <= 5 : true
    ),
    CCNumberofCracks: number().test("len", "3 digits", (val) =>
      val ? val.toString().length === 3 : true
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
};

export default ValidationSchema;
