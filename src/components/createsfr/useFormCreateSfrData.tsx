import { useFormikContext } from "formik";
import { useEffect } from "react";
import { ISaveSfrValues } from "src/commons/types";
import { formatCodes, joinCodes } from "src/helpers";

export const useFormCreateSfrData = () => {
  const { setFieldValue, values } = useFormikContext<ISaveSfrValues>();

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
    setFieldValue("OriginDetails.MfrSourceIdentifier", "");
  }, [values?.OriginDetails?.MfrSourceId]);

  useEffect(() => {
    setFieldValue("OriginDetails.CalDocIdentifier", "");
    setFieldValue("CalDocIdentifier1", "");
    setFieldValue("CalDocIdentifier2", "");
    setFieldValue("CalDocIdentifier3", "");
    setFieldValue("CalDocIdentifier4", "");
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

  // Repair Tab
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
