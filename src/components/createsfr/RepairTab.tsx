import { Box, Grid } from "@mui/material";
import { useFormikContext } from "formik";
import { ChangeEventHandler, FocusEventHandler } from "react";
import { FlexColumn } from "src/commons/Box";
import ListItem from "src/commons/ListItem";
import Radio, { SimpleRadio } from "src/commons/Radio";
import { MultipleSelect } from "src/commons/Select";
import TabPanel from "src/commons/TabPanel";
import TextField from "src/commons/TextField";
import TextFieldGroup from "src/commons/TextFieldGroup";
import { DocumentTypeOptions, ISaveSfrValues, SelectedSfrTab } from "src/commons/types";
import { UseUpdateCodes } from "src/components/createsfr/useUpdateCodes";

type RepairTabProps = {
  editable: any;
  tabIndex: any;
};

export const RepairTab = ({ editable, tabIndex }: RepairTabProps) => {
  const { errors, handleBlur, handleChange, setFieldValue, touched } =
    useFormikContext<ISaveSfrValues>();
  const values = UseUpdateCodes();

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
                value={values?.RepairDetails?.IsDeferred || ""}
                onChange={(values) => {
                  setFieldValue("RepairDetails.IsDeferred", values);
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
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={!!touched?.RepairDetails?.DipCode && !!errors?.RepairDetails?.DipCode}
                  helperText={!!touched?.RepairDetails?.DipCode && errors?.RepairDetails?.DipCode}
                  className={"sdr-status-edit !w-[50%]"}
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
                      value={values?.RepairDetails?.IsMajorRepair || ""}
                      onChange={(values) => {
                        setFieldValue("RepairDetails.IsMajorRepair", values);
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
                      onChange={(values) => {
                        setFieldValue("RepairDetails.DamageStructureStatus", values);
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
                      value={values?.RepairDetails?.IsRepairOrRework || ""}
                      onChange={(values) => {
                        setFieldValue("RepairDetails.IsRepairOrRework", values);
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
                <ListItem className="whitespace-nowrap">SDR Reportable?</ListItem>
                <ListItem className="!absolute !px-0 left-0 top-[20px]">
                  {editable ? (
                    <SimpleRadio
                      name="RepairDetails.IsSdrReportable"
                      value={values?.RepairDetails?.IsSdrReportable || ""}
                      onChange={(values) => {
                        setFieldValue("RepairDetails.IsSdrReportable", values);
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
                      value={values?.RepairDetails?.IsOverWeight || ""}
                      onChange={(values) => {
                        setFieldValue("RepairDetails.IsOverWeight", values);
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
                            name="RepairDetails.RepairECRA"
                            values={values}
                            onChange={handleChange}
                            onBlur={handleBlur}
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
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={!!touched?.RepairDetails?.Rev && !!errors?.RepairDetails?.Rev}
                            helperText={!!touched?.RepairDetails?.Rev && errors?.RepairDetails?.Rev}
                            multiline
                            maxRows={4}
                            className={"sdr-status-edit textareaAutosize"}
                            inputProps={{ style: { resize: "both" } }}
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
                          onChange={handleChange}
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
                          inputProps={{ style: { resize: "both" } }}
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
          <ListItem>Material utilized for the repairs</ListItem>
          <ListItem>
            {editable ? (
              <TextField
                name="RepairDetails.MaterialsUtilized"
                value={values?.RepairDetails?.MaterialsUtilized || ""}
                onChange={handleChange}
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
                inputProps={{ style: { resize: "both" } }}
              />
            ) : (
              ""
            )}
          </ListItem>
          <ListItem>Man-hours to compete the repairs in hours</ListItem>
          <ListItem>
            {editable ? (
              <TextField
                type="number"
                name="RepairDetails.ManHoursRequired"
                value={values?.RepairDetails?.ManHoursRequired || ""}
                onChange={handleChange}
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
              />
            ) : (
              ""
            )}
          </ListItem>
        </div>
      </TabPanel>
    </>
  );
};

interface IDocumentGridProps {
  editable: boolean;
  handleBlur: FocusEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  handleChange: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  name: string;
  values: ISaveSfrValues;
}

const DocumentGrid = ({ editable, handleBlur, handleChange, name, values }: IDocumentGridProps) => (
  <Grid container>
    <Grid item xs={4}>
      <ListItem>{name}1</ListItem>
      <ListItem>
        {editable ? (
          <TextFieldGroup
            count={3}
            maxAllowed={[2, 2, 2]}
            name={`${name}1`}
            values={values}
            onChange={handleChange}
            onBlur={handleBlur}
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
            values={values}
            onChange={handleChange}
            onBlur={handleBlur}
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
            values={values}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        ) : (
          ""
        )}
      </ListItem>
    </Grid>
    <Grid item xs={4}>
      <ListItem>Page</ListItem>
      <ListItem>
        {editable ? (
          <TextField
            name={`${name}Page`}
            value={(values as any)?.[`${name}Page`] || ""}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="xxx"
            className={"sdr-status-edit"}
            inputProps={{ maxLength: 3 }}
          />
        ) : (
          ""
        )}
      </ListItem>
    </Grid>
    <Grid item xs={4}>
      <ListItem>Fig</ListItem>
      <ListItem>
        {editable ? (
          <TextField
            name={`${name}Fig`}
            value={(values as any)?.[`${name}Fig`] || ""}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="xxx"
            className={"sdr-status-edit"}
            inputProps={{ maxLength: 3 }}
          />
        ) : (
          ""
        )}
      </ListItem>
    </Grid>
  </Grid>
);
