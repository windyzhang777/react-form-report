import { Box, Grid } from "@mui/material";
import { FormikErrors, FormikTouched, useFormikContext } from "formik";
import { ChangeEventHandler, Dispatch, FocusEventHandler, SetStateAction, useEffect } from "react";
import { FlexColumn } from "src/commons/Box";
import ListItem from "src/commons/ListItem";
import Radio, { SimpleRadio } from "src/commons/Radio";
import { MultipleSelect, SingleSelect } from "src/commons/Select";
import TabPanel from "src/commons/TabPanel";
import TextField from "src/commons/TextField";
import TextFieldGroup from "src/commons/TextFieldGroup";
import {
  DocumentTypeOptions,
  ISaveSfrValues,
  SdrEsfrRecordDetailsStateType,
  SelectedSfrTab,
} from "src/commons/types";
import { useFormCreateSfrData } from "src/components/createsfr/useFormCreateSfrData";
import { useAppSelector } from "src/redux/hooks";
import { removeNonAlphaNumeric } from "src/validationSchema";

type RepairTabProps = {
  editable: boolean;
  tabIndex: number;
  sdrRequired: boolean;
  setSdrRequired: Dispatch<SetStateAction<boolean>>;
};

export const RepairTab = ({ editable, tabIndex, sdrRequired, setSdrRequired }: RepairTabProps) => {
  const { errors, handleBlur, handleChange, setFieldValue, touched } =
    useFormikContext<ISaveSfrValues>();
  const { values } = useFormCreateSfrData();
  const { masterData }: SdrEsfrRecordDetailsStateType = useAppSelector(
    (state) => state.sdrEsfrRecordDetails
  );

  useEffect(() => {
    if (values?.RepairDetails?.IsSdrReportable && values?.RepairDetails?.IsMajorRepair) {
      setSdrRequired(true);
    } else {
      setSdrRequired(false);
    }
  }, [values?.RepairDetails?.IsSdrReportable, values?.RepairDetails?.IsMajorRepair]);

  return (
    <>
      <TabPanel
        value={tabIndex}
        index={SelectedSfrTab.Repair}
        className="sdr-status-grid overflow-y-auto"
      >
        <div className="relative mb-[50px]">
          <ListItem>{`Was this repair "deferred"?`}</ListItem>
          <ListItem className="!absolute !px-0 left-0 top-[20px]">
            {editable ? (
              <SimpleRadio
                name="RepairDetails.IsDeferred"
                value={values?.RepairDetails?.IsDeferred}
                onChange={(value) => {
                  setFieldValue("RepairDetails.IsDeferred", value === "true");
                }}
                error={!!touched?.RepairDetails?.IsDeferred && !!errors?.RepairDetails?.IsDeferred}
                helperText={
                  !!touched?.RepairDetails?.IsDeferred && errors?.RepairDetails?.IsDeferred
                }
                className={"sdr-status-edit gap-5"}
              />
            ) : (
              ""
            )}
          </ListItem>
        </div>
        {values.RepairDetails?.IsDeferred && (
          <>
            <ListItem>DIP #</ListItem>
            <ListItem>
              {editable ? (
                <TextField
                  name="RepairDetails.DipCode"
                  value={values?.RepairDetails?.DipCode || ""}
                  onChange={(e) =>
                    setFieldValue("RepairDetails.DipCode", removeNonAlphaNumeric(e.target.value))
                  }
                  onBlur={handleBlur}
                  error={!!touched?.RepairDetails?.DipCode && !!errors?.RepairDetails?.DipCode}
                  helperText={!!touched?.RepairDetails?.DipCode && errors?.RepairDetails?.DipCode}
                  className={"sdr-status-edit !w-[50%]"}
                  inputProps={{ maxLength: 7 }}
                  placeholder="xxxxxxx"
                />
              ) : (
                ""
              )}
            </ListItem>
          </>
        )}

        {/* Repair Information */}
        <div className="px-[20px] pb-[60px] mt-6 border border-[#e6e6e6] border-t-0">
          <Box className={"sdr-status-title !mx-[-20px]"}>Repair Information</Box>
          <Grid container>
            <Grid item xs={6} className="flex !flex-col gap-4">
              <div className="relative">
                <ListItem className="whitespace-nowrap">{`Was this repair a "Major Repair"?`}</ListItem>
                <ListItem className="!absolute !px-0 left-0 top-[20px]">
                  {editable ? (
                    <SimpleRadio
                      name="RepairDetails.IsMajorRepair"
                      value={values?.RepairDetails?.IsMajorRepair}
                      onChange={(value) => {
                        setFieldValue("RepairDetails.IsMajorRepair", value === "true");
                      }}
                      error={
                        !!touched?.RepairDetails?.IsMajorRepair &&
                        !!errors?.RepairDetails?.IsMajorRepair
                      }
                      helperText={
                        !!touched?.RepairDetails?.IsMajorRepair &&
                        errors?.RepairDetails?.IsMajorRepair
                      }
                      className={"sdr-status-edit gap-5"}
                    />
                  ) : (
                    ""
                  )}
                </ListItem>
              </div>
              <div className="relative !mt-[40px]">
                <ListItem className="whitespace-nowrap">Damaged Structure was:</ListItem>
                <ListItem className="!absolute !px-0 left-0 top-[20px]">
                  {editable ? (
                    <Radio
                      name="RepairDetails.DamageStructureStatus"
                      value={values?.RepairDetails?.DamageStructureStatus || ""}
                      onChange={(value) => {
                        setFieldValue("RepairDetails.DamageStructureStatus", value);
                      }}
                      error={
                        !!touched?.RepairDetails?.DamageStructureStatus &&
                        !!errors?.RepairDetails?.DamageStructureStatus
                      }
                      helperText={
                        !!touched?.RepairDetails?.DamageStructureStatus &&
                        errors?.RepairDetails?.DamageStructureStatus
                      }
                      options={["Repaired", "Replaced"]}
                      className={"sdr-status-edit gap-5"}
                    />
                  ) : (
                    ""
                  )}
                </ListItem>
              </div>
              <div className="relative !mt-[40px]">
                <ListItem className="whitespace-nowrap">
                  Were there any previous repairs or rework in this area?
                </ListItem>
                <ListItem className="!absolute !px-0 left-0 top-[20px]">
                  {editable ? (
                    <SimpleRadio
                      name="RepairDetails.IsRepairOrRework"
                      value={values?.RepairDetails?.IsRepairOrRework}
                      onChange={(value) => {
                        setFieldValue("RepairDetails.IsRepairOrRework", value === "true");
                      }}
                      error={
                        !!touched?.RepairDetails?.IsRepairOrRework &&
                        !!errors?.RepairDetails?.IsRepairOrRework
                      }
                      helperText={
                        !!touched?.RepairDetails?.IsRepairOrRework &&
                        errors?.RepairDetails?.IsRepairOrRework
                      }
                      className={"sdr-status-edit gap-5"}
                    />
                  ) : (
                    ""
                  )}
                </ListItem>
              </div>
            </Grid>
            <Grid item xs={6} className="flex !flex-col gap-2">
              <div className="relative">
                <ListItem className="whitespace-nowrap" disabled>
                  SDR Reportable?
                </ListItem>
                <ListItem className="!absolute !px-0 left-0 top-[20px]">
                  {editable ? (
                    <SimpleRadio
                      name="RepairDetails.IsSdrReportable"
                      disabled
                      value={values?.RepairDetails?.IsSdrReportable}
                      onChange={(value) => {
                        setFieldValue("RepairDetails.IsSdrReportable", value === "true");
                      }}
                      error={
                        !!touched?.RepairDetails?.IsSdrReportable &&
                        !!errors?.RepairDetails?.IsSdrReportable
                      }
                      helperText={
                        !!touched?.RepairDetails?.IsSdrReportable &&
                        errors?.RepairDetails?.IsSdrReportable
                      }
                      className={"sdr-status-edit gap-5"}
                    />
                  ) : (
                    ""
                  )}
                </ListItem>
              </div>
              <div className="relative !mt-[40px]">
                <ListItem className="whitespace-nowrap">Weight increase over 5 lbs?</ListItem>
                <ListItem className="!absolute !px-0 left-0 top-[20px]">
                  {editable ? (
                    <SimpleRadio
                      name="RepairDetails.IsOverWeight"
                      value={values?.RepairDetails?.IsOverWeight}
                      onChange={(value) => {
                        setFieldValue("RepairDetails.IsOverWeight", value === "true");
                      }}
                      error={
                        !!touched?.RepairDetails?.IsOverWeight &&
                        !!errors?.RepairDetails?.IsOverWeight
                      }
                      helperText={
                        !!touched?.RepairDetails?.IsOverWeight &&
                        errors?.RepairDetails?.IsOverWeight
                      }
                      className={"sdr-status-edit gap-5"}
                    />
                  ) : (
                    ""
                  )}
                </ListItem>
              </div>
            </Grid>
          </Grid>
        </div>

        {/* SDR Information */}
        {values?.RepairDetails?.IsSdrReportable && values?.RepairDetails?.IsMajorRepair && (
          <div className="px-[20px] pb-[20px] mt-6 border border-[#e6e6e6] border-t-0">
            <Box className={"sdr-status-title !mx-[-20px]"}>SDR Information</Box>
            <Grid container>
              <Grid item xs={6} className="flex !flex-col gap-4">
                <div>
                  <ListItem required={sdrRequired}>Nature of Condition</ListItem>
                  <ListItem>
                    {editable ? (
                      <MultipleSelect
                        name="SdrDetails.NatureOfReportIds"
                        value={values?.SdrDetails?.NatureOfReportIds || []}
                        onChange={(values) => {
                          setFieldValue("SdrDetails.NatureOfReportIds", values);
                        }}
                        onBlur={handleBlur}
                        error={
                          !!touched?.SdrDetails?.NatureOfReportIds &&
                          !!errors?.SdrDetails?.NatureOfReportIds
                        }
                        helperText={
                          !!touched?.SdrDetails?.NatureOfReportIds &&
                          errors?.SdrDetails?.NatureOfReportIds
                        }
                        options={
                          masterData?.NatureofReports &&
                          [...masterData.NatureofReports].sort(
                            (a, b) => a.DisplayOrder - b.DisplayOrder
                          )
                        }
                        id="SdrDetails.NatureOfReportIds"
                        maxAllowed={3}
                      />
                    ) : (
                      ""
                    )}
                  </ListItem>
                </div>
                <div>
                  <ListItem required={sdrRequired}>Precautionary Procedure</ListItem>
                  <ListItem>
                    {editable ? (
                      <MultipleSelect
                        name="SdrDetails.PrecautionaryProcedureIds"
                        value={values?.SdrDetails?.PrecautionaryProcedureIds || []}
                        onChange={(values) => {
                          setFieldValue("SdrDetails.PrecautionaryProcedureIds", values);
                        }}
                        onBlur={handleBlur}
                        error={
                          !!touched?.SdrDetails?.PrecautionaryProcedureIds &&
                          !!errors?.SdrDetails?.PrecautionaryProcedureIds
                        }
                        helperText={
                          !!touched?.SdrDetails?.PrecautionaryProcedureIds &&
                          errors?.SdrDetails?.PrecautionaryProcedureIds
                        }
                        options={
                          masterData?.PrecautionaryProcedures &&
                          [...masterData.PrecautionaryProcedures].sort(
                            (a, b) => a.DisplayOrder - b.DisplayOrder
                          )
                        }
                        id="SdrDetails.PrecautionaryProcedureIds"
                        maxAllowed={4}
                      />
                    ) : (
                      ""
                    )}
                  </ListItem>
                </div>
              </Grid>
              <Grid item xs={6} className="flex !flex-col gap-4">
                <div>
                  <ListItem required={sdrRequired}>Stage of Operation</ListItem>
                  <ListItem>
                    {editable ? (
                      <SingleSelect
                        name="SdrDetails.StageId"
                        value={values?.SdrDetails?.StageId || ""}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={!!touched?.SdrDetails?.StageId && !!errors?.SdrDetails?.StageId}
                        helperText={!!touched?.SdrDetails?.StageId && errors?.SdrDetails?.StageId}
                        options={
                          masterData?.Stage &&
                          [...masterData.Stage].sort((a, b) => a.DisplayOrder - b.DisplayOrder)
                        }
                        id="SdrDetails.StageId"
                      />
                    ) : (
                      ""
                    )}
                  </ListItem>
                </div>
                <div>
                  <ListItem required={sdrRequired}>How Discovered</ListItem>
                  <ListItem>
                    {editable ? (
                      <SingleSelect
                        name="SdrDetails.HowDiscoveredId"
                        value={values?.SdrDetails?.HowDiscoveredId || ""}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={
                          !!touched?.SdrDetails?.HowDiscoveredId &&
                          !!errors?.SdrDetails?.HowDiscoveredId
                        }
                        helperText={
                          !!touched?.SdrDetails?.HowDiscoveredId &&
                          errors?.SdrDetails?.HowDiscoveredId
                        }
                        options={
                          masterData?.HowDiscovered &&
                          [...masterData.HowDiscovered].sort(
                            (a, b) => a.DisplayOrder - b.DisplayOrder
                          )
                        }
                        id="SdrDetails.HowDiscoveredId"
                      />
                    ) : (
                      ""
                    )}
                  </ListItem>
                </div>
              </Grid>
            </Grid>
          </div>
        )}

        {/* Repair Document Information */}
        <FlexColumn className="gap-4 px-[20px] pb-[20px] mt-6 border border-[#e6e6e6] border-t-0">
          <Box className={"sdr-status-title !mx-[-20px] !mb-0"}>Repair Document Information</Box>
          <div>
            <ListItem>Document Type</ListItem>
            <ListItem>
              {editable ? (
                <MultipleSelect
                  name="DocumentType"
                  value={values.DocumentType || []}
                  onChange={(values) => {
                    setFieldValue("DocumentType", values);
                  }}
                  onBlur={handleBlur}
                  error={!!touched.DocumentType && !!errors.DocumentType}
                  helperText={!!touched.DocumentType && errors.DocumentType}
                  options={DocumentTypeOptions.sort((a, b) => a.DisplayOrder - b.DisplayOrder)}
                  className={"sdr-status-edit"}
                  id="DocumentType"
                  maxAllowed={3}
                />
              ) : (
                ""
              )}
            </ListItem>
          </div>
          {values?.DocumentType?.sort().map((dt) => {
            const name = DocumentTypeOptions.find((option) => option.Id === dt)?.Description;

            switch (dt) {
              case 1:
              case 2:
              case 3:
                return (
                  <DocumentGrid
                    key={dt}
                    editable={editable}
                    handleBlur={handleBlur}
                    handleChange={handleChange}
                    name={name as string}
                    values={values}
                    setFieldValue={setFieldValue}
                    touched={touched}
                    errors={errors}
                  />
                );
              case 4:
                return (
                  <Grid container key={dt}>
                    <Grid item xs={6}>
                      <ListItem>Repair ECRA</ListItem>
                      <ListItem>
                        {editable ? (
                          <TextFieldGroup
                            count={2}
                            maxAllowed={[4, 5]}
                            name="RepairECRA"
                            path="RepairDetails.RepairECRA"
                            values={values}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            touched={touched}
                            errors={errors}
                          />
                        ) : (
                          ""
                        )}
                      </ListItem>
                    </Grid>
                    <Grid item xs={6}>
                      <ListItem>Rev</ListItem>
                      <ListItem>
                        {editable ? (
                          <TextField
                            name="RepairDetails.Rev"
                            value={values?.RepairDetails?.Rev || ""}
                            onChange={(e) =>
                              setFieldValue(
                                "values.RepairDetails.Rev",
                                removeNonAlphaNumeric(e.target.value)
                              )
                            }
                            onBlur={handleBlur}
                            error={!!touched?.RepairDetails?.Rev && !!errors?.RepairDetails?.Rev}
                            helperText={!!touched?.RepairDetails?.Rev && errors?.RepairDetails?.Rev}
                            className={"sdr-status-edit"}
                            inputProps={{ maxLength: 1 }}
                            placeholder="x"
                          />
                        ) : (
                          ""
                        )}
                      </ListItem>
                    </Grid>
                  </Grid>
                );
              case 5:
                return (
                  <div key={dt}>
                    <ListItem>Other</ListItem>
                    <ListItem>
                      {editable ? (
                        <TextField
                          name="RepairDetails.Comments"
                          value={values?.RepairDetails?.Comments || ""}
                          onChange={(e) =>
                            setFieldValue(
                              "RepairDetails.Commentsber",
                              removeNonAlphaNumeric(e.target.value)
                            )
                          }
                          onBlur={handleBlur}
                          error={
                            !!touched?.RepairDetails?.Comments && !!errors?.RepairDetails?.Comments
                          }
                          helperText={
                            !!touched?.RepairDetails?.Comments && errors?.RepairDetails?.Comments
                          }
                          multiline
                          maxRows={4}
                          className={"sdr-status-edit textareaAutosize"}
                          inputProps={{ maxLength: 100 }}
                        />
                      ) : (
                        ""
                      )}
                    </ListItem>
                  </div>
                );
              default:
                return null;
            }
          })}
        </FlexColumn>

        {/* Warranty Document Information */}
        <div className="px-[20px] pb-[20px] mt-6 border border-[#e6e6e6] border-t-0">
          <Box className={"sdr-status-title !mx-[-20px]"}>Warranty Document Information</Box>
          <FlexColumn className="gap-4">
            <div>
              <ListItem>Material utilized for the repairs</ListItem>
              <ListItem>
                {editable ? (
                  <TextField
                    name="RepairDetails.MaterialsUtilized"
                    value={values?.RepairDetails?.MaterialsUtilized || ""}
                    onChange={(e) =>
                      setFieldValue(
                        "RepairDetails.MaterialsUtilized",
                        removeNonAlphaNumeric(e.target.value)
                      )
                    }
                    onBlur={handleBlur}
                    error={
                      !!touched?.RepairDetails?.MaterialsUtilized &&
                      !!errors?.RepairDetails?.MaterialsUtilized
                    }
                    helperText={
                      !!touched?.RepairDetails?.MaterialsUtilized &&
                      errors?.RepairDetails?.MaterialsUtilized
                    }
                    multiline
                    maxRows={4}
                    className={"sdr-status-edit textareaAutosize"}
                    inputProps={{ maxLength: 200 }}
                  />
                ) : (
                  ""
                )}
              </ListItem>
            </div>
            <div>
              <ListItem>Man-hours to compete the repairs in hours</ListItem>
              <ListItem>
                {editable ? (
                  <TextField
                    name="RepairDetails.ManHoursRequired"
                    value={values?.RepairDetails?.ManHoursRequired || ""}
                    onChange={(e) =>
                      setFieldValue(
                        "RepairDetails.ManHoursRequired",
                        removeNonAlphaNumeric(e.target.value)
                      )
                    }
                    onBlur={handleBlur}
                    error={
                      !!touched?.RepairDetails?.ManHoursRequired &&
                      !!errors?.RepairDetails?.ManHoursRequired
                    }
                    helperText={
                      !!touched?.RepairDetails?.ManHoursRequired &&
                      errors?.RepairDetails?.ManHoursRequired
                    }
                    className={"sdr-status-edit"}
                    inputProps={{ maxLength: 4 }}
                    placeholder="xxxx"
                  />
                ) : (
                  ""
                )}
              </ListItem>
            </div>
          </FlexColumn>
        </div>
      </TabPanel>
    </>
  );
};

interface IDocumentGridProps {
  editable: boolean;
  errors: FormikErrors<ISaveSfrValues> & { [key: string]: any };
  handleBlur: FocusEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  handleChange: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  name: string;
  setFieldValue: (
    field: string,
    value: any,
    shouldValidate?: boolean | undefined
  ) => Promise<void | FormikErrors<ISaveSfrValues>>;
  touched: FormikTouched<ISaveSfrValues> & { [key: string]: any };
  values: ISaveSfrValues & { [key: string]: any };
}

const DocumentGrid = ({
  editable,
  errors,
  handleBlur,
  handleChange,
  name,
  setFieldValue,
  touched,
  values,
}: IDocumentGridProps) => (
  <Grid container>
    <Grid item xs={4}>
      <ListItem>{name}1</ListItem>
      <ListItem>
        {editable ? (
          <TextFieldGroup
            count={3}
            maxAllowed={[2, 2, 2]}
            name={`${name}1`}
            path={`${name}1`}
            values={values}
            onChange={handleChange}
            onBlur={handleBlur}
            touched={touched}
            errors={errors}
          />
        ) : (
          ""
        )}
      </ListItem>
    </Grid>
    <Grid item xs={4}>
      <ListItem>{name}2</ListItem>
      <ListItem>
        {editable ? (
          <TextFieldGroup
            count={3}
            maxAllowed={[2, 2, 2]}
            name={`${name}2`}
            path={`${name}2`}
            values={values}
            onChange={handleChange}
            onBlur={handleBlur}
            touched={touched}
            errors={errors}
          />
        ) : (
          ""
        )}
      </ListItem>
    </Grid>
    <Grid item xs={4}>
      <ListItem>{name}3</ListItem>
      <ListItem>
        {editable ? (
          <TextFieldGroup
            count={3}
            maxAllowed={[2, 2, 2]}
            name={`${name}3`}
            path={`${name}3`}
            values={values}
            onChange={handleChange}
            onBlur={handleBlur}
            touched={touched}
            errors={errors}
          />
        ) : (
          ""
        )}
      </ListItem>
    </Grid>
    <Grid item xs={4} className="!mt-4">
      <ListItem>Page</ListItem>
      <ListItem>
        {editable ? (
          <TextField
            name={`${name}Page`}
            value={values?.[`${name}Page`] || ""}
            onChange={(e) =>
              setFieldValue(`values.${name}Page`, removeNonAlphaNumeric(e.target.value))
            }
            onBlur={handleBlur}
            error={!!touched?.[`${name}Page`] && !!errors?.[`${name}Page`]}
            helperText={!!touched?.[`${name}Page`] && errors?.[`${name}Page`]}
            className={"sdr-status-edit"}
            inputProps={{ maxLength: 3 }}
            placeholder="xxx"
          />
        ) : (
          ""
        )}
      </ListItem>
    </Grid>
    <Grid item xs={4} className="!mt-4">
      <ListItem>Fig</ListItem>
      <ListItem>
        {editable ? (
          <TextField
            name={`${name}Fig`}
            value={values?.[`${name}Fig`] || ""}
            onChange={(e) =>
              setFieldValue(`values.${name}Fig`, removeNonAlphaNumeric(e.target.value))
            }
            onBlur={handleBlur}
            error={!!touched?.[`${name}Fig`] && !!errors?.[`${name}Fig`]}
            helperText={!!touched?.[`${name}Fig`] && errors?.[`${name}Fig`]}
            className={"sdr-status-edit"}
            inputProps={{ maxLength: 3 }}
            placeholder="xxx"
          />
        ) : (
          ""
        )}
      </ListItem>
    </Grid>
  </Grid>
);
