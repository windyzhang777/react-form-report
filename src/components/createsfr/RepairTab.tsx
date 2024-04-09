import { Box, Grid } from "@mui/material";
import { useFormikContext } from "formik";
import { ChangeEventHandler, FocusEventHandler } from "react";
import { FlexColumn } from "src/commons/Box";
import ListItem from "src/commons/ListItem";
import Radio from "src/commons/Radio";
import { MultipleSelect } from "src/commons/Select";
import TabPanel from "src/commons/TabPanel";
import TextField from "src/commons/TextField";
import TextFieldGroup from "src/commons/TextFieldGroup";
import { DocumentTypeOptions, ISaveSfrValues, SelectedSfrTab } from "src/commons/types";

type RepairTabProps = {
  editable: any;
  tabIndex: any;
};

export const RepairTab = ({ editable, tabIndex }: RepairTabProps) => {
  const { errors, handleBlur, handleChange, setFieldValue, touched, values } =
    useFormikContext<ISaveSfrValues>();

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
              <Radio
                name="RepairDeferred"
                value={values.RepairDeferred || ""}
                onChange={(values) => {
                  setFieldValue("RepairDeferred", values);
                }}
                error={!!touched.RepairDeferred && !!errors.RepairDeferred}
                helperText={!!touched.RepairDeferred && errors.RepairDeferred}
                options={["Yes", "No"]}
                className={"sdr-status-edit gap-5"}
              />
            ) : (
              ""
            )}
          </ListItem>
        </div>
        {values.RepairDeferred === "Yes" && (
          <>
            <ListItem>DIP #</ListItem>
            <ListItem>
              {editable ? (
                <TextField
                  name="DIP"
                  value={values.DIP || ""}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={!!touched.DIP && !!errors.DIP}
                  helperText={!!touched.DIP && errors.DIP}
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
                    <Radio
                      name="MajorRepair"
                      value={values.MajorRepair || ""}
                      onChange={(values) => {
                        setFieldValue("MajorRepair", values);
                      }}
                      error={!!touched.MajorRepair && !!errors.MajorRepair}
                      helperText={!!touched.MajorRepair && errors.MajorRepair}
                      options={["Yes", "No"]}
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
                      name="DamagedStructure"
                      value={values.DamagedStructure || ""}
                      onChange={(values) => {
                        setFieldValue("DamagedStructure", values);
                      }}
                      error={!!touched.DamagedStructure && !!errors.DamagedStructure}
                      helperText={!!touched.DamagedStructure && errors.DamagedStructure}
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
                    <Radio
                      name="PreviousRepairsOrRework"
                      value={values.PreviousRepairsOrRework || ""}
                      onChange={(values) => {
                        setFieldValue("PreviousRepairsOrRework", values);
                      }}
                      error={!!touched.PreviousRepairsOrRework && !!errors.PreviousRepairsOrRework}
                      helperText={
                        !!touched.PreviousRepairsOrRework && errors.PreviousRepairsOrRework
                      }
                      options={["Yes", "No"]}
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
                    <Radio
                      name="SDRReportable"
                      value={values.SDRReportable || ""}
                      onChange={(values) => {
                        setFieldValue("SDRReportable", values);
                      }}
                      error={!!touched.SDRReportable && !!errors.SDRReportable}
                      helperText={!!touched.SDRReportable && errors.SDRReportable}
                      options={["Yes", "No"]}
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
                    <Radio
                      name="WeightIncreaseOver5Lbs"
                      value={values.WeightIncreaseOver5Lbs || ""}
                      onChange={(values) => {
                        setFieldValue("WeightIncreaseOver5Lbs", values);
                      }}
                      error={!!touched.WeightIncreaseOver5Lbs && !!errors.WeightIncreaseOver5Lbs}
                      helperText={!!touched.WeightIncreaseOver5Lbs && errors.WeightIncreaseOver5Lbs}
                      options={["Yes", "No"]}
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
          {values.DocumentType.sort().map((dt) => {
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
                  <Grid container>
                    <Grid item xs={6}>
                      <ListItem>Repair ECRA</ListItem>
                      <ListItem>
                        {editable ? (
                          <TextFieldGroup
                            count={2}
                            name="Repair ECRA"
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
                            name="RepairREV"
                            value={values?.RepairREV || ""}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={!!touched?.RepairREV && !!errors?.RepairREV}
                            helperText={!!touched?.RepairREV && errors?.RepairREV}
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
                  <div>
                    <ListItem>Other</ListItem>
                    <ListItem>
                      {editable ? (
                        <TextField
                          name="RepairOther"
                          value={values?.RepairOther || ""}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={!!touched?.RepairOther && !!errors?.RepairOther}
                          helperText={!!touched?.RepairOther && errors?.RepairOther}
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
                name="MaterialUtilizedForRepairs"
                value={values?.MaterialUtilizedForRepairs || ""}
                onChange={handleChange}
                onBlur={handleBlur}
                error={
                  !!touched?.MaterialUtilizedForRepairs && !!errors?.MaterialUtilizedForRepairs
                }
                helperText={
                  !!touched?.MaterialUtilizedForRepairs && errors?.MaterialUtilizedForRepairs
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
                name="ManHoursToCompeterRepairs"
                value={values.ManHoursToCompeterRepairs || ""}
                onChange={handleChange}
                onBlur={handleBlur}
                error={!!touched.ManHoursToCompeterRepairs && !!errors.ManHoursToCompeterRepairs}
                helperText={!!touched.ManHoursToCompeterRepairs && errors.ManHoursToCompeterRepairs}
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
          />
        ) : (
          ""
        )}
      </ListItem>
    </Grid>
  </Grid>
);
