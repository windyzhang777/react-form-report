import { useFormikContext } from "formik";
import { useEffect } from "react";
import { ISaveSfrValues } from "src/commons/types";
import { formatCodes, joinCodes } from "src/helpers";

export const useFormCreateSfrData = () => {
  const { setFieldError, setFieldTouched, setFieldValue, values } =
    useFormikContext<ISaveSfrValues>();

  // Origin Tab
  useEffect(() => {
    setFieldValue(
      "OriginDetails.SpecIdentifier",
      formatCodes([
        values.SpecIdentifier1,
        values.SpecIdentifier2,
        values.SpecIdentifier3,
        values.SpecIdentifier4,
      ])
    );
  }, [
    values.SpecIdentifier1,
    values.SpecIdentifier2,
    values.SpecIdentifier3,
    values.SpecIdentifier4,
  ]);

  useEffect(() => {
    setFieldValue("OriginDetails.DetectionMethodId", "");
    setFieldValue("OriginDetails.MfrSourceComments", "");
    setFieldValue("OriginDetails.DetectionMethodComments", "");
    setFieldValue("OriginDetails.UnscheduledInspectionTypeComments", "");
    setFieldValue("OriginDetails.UnscheduledInspectionTypeId", "");
    setFieldValue("OriginDetails.CalDocId", 0);
    setFieldValue("OriginDetails.MfrSourceId", 0);
    setFieldTouched("OriginDetails.MfrSourceIdentifier", false);
    setFieldError("OriginDetails.MfrSourceIdentifier", "");
    setFieldTouched("OriginDetails.CalDocIdentifier", false);
    setFieldError("OriginDetails.CalDocIdentifier", "");
  }, [values?.OriginDetails?.IsScheduledInspection]);

  useEffect(() => {
    setFieldValue("OriginDetails.MfrSourceIdentifier", "");
    setFieldValue("OriginDetails.MfrSourceComments", "");
  }, [values?.OriginDetails?.MfrSourceId]);

  useEffect(() => {
    setFieldValue("OriginDetails.UnscheduledInspectionTypeComments", "");
  }, [values?.OriginDetails?.UnscheduledInspectionTypeId]);

  useEffect(() => {
    setFieldValue("OriginDetails.CalDocIdentifier", "");
    setFieldValue("CalDocIdentifier1", "");
    setFieldValue("CalDocIdentifier2", "");
    setFieldValue("CalDocIdentifier3", "");
    setFieldValue("CalDocIdentifier4", "");
    setFieldTouched("CalDocIdentifier1", false);
    setFieldTouched("CalDocIdentifier2", false);
    setFieldTouched("CalDocIdentifier3", false);
    setFieldTouched("CalDocIdentifier4", false);
    setFieldError("OriginDetails.CalDocIdentifier", "");
    if (values?.OriginDetails?.CalDocId === 1) {
      setFieldValue("CalDocIdentifier3", "1");
      setFieldValue("OriginDetails.CalDocIdentifier", "1");
    }
  }, [values?.OriginDetails?.CalDocId]);

  useEffect(() => {
    setFieldValue(
      "OriginDetails.CalDocIdentifier",
      formatCodes([
        values?.CalDocIdentifier1,
        values?.CalDocIdentifier2,
        values?.CalDocIdentifier3,
        values?.CalDocIdentifier4,
      ])
    );
  }, [
    values?.CalDocIdentifier1,
    values?.CalDocIdentifier2,
    values?.CalDocIdentifier3,
    values?.CalDocIdentifier4,
  ]);

  // Discrepancy Tab
  useEffect(() => {
    setFieldValue("DiscrepancyDetails.CorrosionLevelId", "");
    setFieldValue("DiscrepancyDetails.CorrosionExtentId", "");
    setFieldValue("DiscrepancyDetails.CorrosionCauseId", "");
    setFieldValue("DiscrepancyDetails.CrackLength", "");
    setFieldValue("DiscrepancyDetails.CrackWidth", "");
    setFieldValue("DiscrepancyDetails.CrackDepth", "");
    setFieldTouched("DiscrepancyDetails.CrackLength", false);
    setFieldTouched("DiscrepancyDetails.CrackWidth", false);
    setFieldTouched("DiscrepancyDetails.CrackDepth", false);
    setFieldError("DiscrepancyDetails.CrackLength", "");
    setFieldError("DiscrepancyDetails.CrackWidth", "");
    setFieldError("DiscrepancyDetails.CrackDepth", "");
    setFieldValue("DiscrepancyDetails.AreMultipleCracksInTheSameLocation", false);
    setFieldValue("DiscrepancyDetails.NumberOfCracks", 0);
    setFieldValue("DiscrepancyDetails.DiscrepancyTypeComments", "");
  }, [values?.DiscrepancyDetails?.DiscrepancyTypeId]);

  useEffect(() => {
    setFieldValue("DiscrepancyDetails.NumberOfCracks", 0);
    setFieldTouched("DiscrepancyDetails.NumberOfCracks", false);
    setFieldError("DiscrepancyDetails.NumberOfCracks", "");
  }, [values?.DiscrepancyDetails?.AreMultipleCracksInTheSameLocation]);

  useEffect(() => {
    setFieldValue("PartNumber", "");
    setFieldValue("Structure", "");
    setFieldValue("DiscrepancyDetails.DiscrepancyPartDetails[0].PartNumber", "");
    setFieldValue("DiscrepancyDetails.DiscrepancyPartDetails[0].Structure", "");
    setFieldValue("DiscrepancyDetails.DiscrepancyPartComments", "");
  }, [values?.DiscrepancyDetails?.DiscrepancyPartDetails?.[0]?.DiscrepancyPartInformationCode]);

  // Location Tab
  useEffect(() => {
    setFieldValue("LocationDetails.Side", "");
    setFieldValue("LocationDetails.Surface", "");
    setFieldValue("LocationDetails.FromSta", "");
    setFieldValue("LocationDetails.ToSta", "");
    setFieldValue("LocationDetails.FromBLLength", 0);
    setFieldValue("LocationDetails.FromBL", "");
    setFieldValue("LocationDetails.ToBLLength", 0);
    setFieldValue("LocationDetails.ToBL", "");
    setFieldValue("LocationDetails.StaTypeId", 0);
    setFieldValue("LocationDetails.DamageProximityId", 0);
    setFieldValue("LocationDetails.FromStr", "");
    setFieldValue("LocationDetails.FromSide", "");
    setFieldValue("LocationDetails.ToStr", "");
    setFieldValue("LocationDetails.ToSide", "");
    setFieldValue("LocationDetails.ElevatorTab", "");
    setFieldValue("LocationDetails.Fuselage", "");
    setFieldValue("LocationDetails.LocationType", "");
    setFieldValue("LocationDetails.Specifics", "");
    setFieldValue("LocationDetails.Other", "");
    setFieldValue("LocationDetails.AdditionalLocationDetails", "");
    setFieldValue("LocationDetails.SpecificsLocation", "");
  }, [values?.LocationDetails?.DefectLocationId]);

  // Repair Tab
  useEffect(() => {
    setFieldValue("SRM1", "");
    setFieldValue("SRM11", "");
    setFieldValue("SRM12", "");
    setFieldValue("SRM13", "");
    setFieldValue("SRM2", "");
    setFieldValue("SRM21", "");
    setFieldValue("SRM22", "");
    setFieldValue("SRM23", "");
    setFieldValue("SRM3", "");
    setFieldValue("SRM31", "");
    setFieldValue("SRM32", "");
    setFieldValue("SRM33", "");
    setFieldValue("SRMPage", "");
    setFieldValue("SRMFig", "");
    setFieldValue("AMM1", "");
    setFieldValue("AMM11", "");
    setFieldValue("AMM12", "");
    setFieldValue("AMM13", "");
    setFieldValue("AMM2", "");
    setFieldValue("AMM21", "");
    setFieldValue("AMM22", "");
    setFieldValue("AMM23", "");
    setFieldValue("AMM3", "");
    setFieldValue("AMM31", "");
    setFieldValue("AMM32", "");
    setFieldValue("AMM33", "");
    setFieldValue("AMMPage", "");
    setFieldValue("AMMFig", "");
    setFieldValue("CMM1", "");
    setFieldValue("CMM11", "");
    setFieldValue("CMM12", "");
    setFieldValue("CMM13", "");
    setFieldValue("CMM2", "");
    setFieldValue("CMM21", "");
    setFieldValue("CMM22", "");
    setFieldValue("CMM23", "");
    setFieldValue("CMM3", "");
    setFieldValue("CMM31", "");
    setFieldValue("CMM32", "");
    setFieldValue("CMM33", "");
    setFieldValue("CMMPage", "");
    setFieldValue("CMMFig", "");
    setFieldValue("RepairECRA1", "");
    setFieldValue("RepairECRA2", "");
    setFieldValue("RepairDetails.Comments", "");
    setFieldTouched("RepairDetails.Comments", false);
    setFieldError("RepairDetails.Comments", "");
  }, [values.DocumentType]);

  useEffect(() => {
    setFieldValue(
      "RepairDetails.RepairECRA",
      formatCodes([values.RepairECRA1, values.RepairECRA2])
    );
  }, [values.RepairECRA1, values.RepairECRA2]);

  useEffect(() => {
    setFieldValue("SRM1", formatCodes([values.SRM11, values.SRM12, values.SRM13]));
  }, [values.DocumentType, values.SRM11, values.SRM12, values.SRM13]);

  useEffect(() => {
    setFieldValue("SRM2", formatCodes([values.SRM21, values.SRM22, values.SRM23]));
  }, [values.DocumentType, values.SRM21, values.SRM22, values.SRM23]);

  useEffect(() => {
    setFieldValue("SRM3", formatCodes([values.SRM31, values.SRM32, values.SRM33]));
  }, [values.DocumentType, values.SRM31, values.SRM32, values.SRM33]);

  useEffect(() => {
    setFieldValue("AMM1", formatCodes([values.AMM11, values.AMM12, values.AMM13]));
  }, [values.DocumentType, values.AMM11, values.AMM12, values.AMM13]);

  useEffect(() => {
    setFieldValue("AMM2", formatCodes([values.AMM21, values.AMM22, values.AMM23]));
  }, [values.DocumentType, values.AMM21, values.AMM22, values.AMM23]);

  useEffect(() => {
    setFieldValue("AMM3", formatCodes([values.AMM31, values.AMM32, values.AMM33]));
  }, [values.DocumentType, values.AMM31, values.AMM32, values.AMM33]);

  useEffect(() => {
    setFieldValue("CMM1", formatCodes([values.CMM11, values.CMM12, values.CMM13]));
  }, [values.DocumentType, values.CMM11, values.CMM12, values.CMM13]);

  useEffect(() => {
    setFieldValue("CMM2", formatCodes([values.CMM21, values.CMM22, values.CMM23]));
  }, [values.DocumentType, values.CMM21, values.CMM22, values.CMM23]);

  useEffect(() => {
    setFieldValue("CMM3", formatCodes([values.CMM31, values.CMM32, values.CMM33]));
  }, [values.DocumentType, values.CMM31, values.CMM32, values.CMM33]);

  useEffect(() => {
    setFieldValue("RepairDetails.RepairTypes", [
      {
        Code: joinCodes([values.SRM1, values.SRM2, values.SRM3]),
        Page: values.SRMPage,
        Fig: values.SRMFig,
      },
      {
        Code: joinCodes([values.AMM1, values.AMM2, values.AMM3]),
        Page: values.AMMPage,
        Fig: values.AMMFig,
      },
      {
        Code: joinCodes([values.CMM1, values.CMM2, values.CMM3]),
        Page: values.CMMPage,
        Fig: values.CMMFig,
      },
    ]);
  }, [
    values.DocumentType,
    values.SRM1,
    values.SRM2,
    values.SRM3,
    values.SRMPage,
    values.SRMFig,
    values.AMM1,
    values.AMM2,
    values.AMM3,
    values.AMMPage,
    values.AMMFig,
    values.CMM1,
    values.CMM2,
    values.CMM3,
    values.CMMPage,
    values.CMMFig,
  ]);

  return { values };
};
