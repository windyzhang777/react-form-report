import { Grid } from "@mui/material";
import { useFormikContext } from "formik";
import ListItem from "src/commons/ListItem";
import Radio from "src/commons/Radio";
import { SingleSelect } from "src/commons/Select";
import TabPanel from "src/commons/TabPanel";
import TextField from "src/commons/TextField";
import { ISaveSfrValues, SdrEsfrRecordDetailsStateType, SelectedSfrTab } from "src/commons/types";
import { useAppSelector } from "src/redux/hooks";

type DiscrepancyTabProps = {
  editable: any;
  tabIndex: any;
};

export const DiscrepancyTab = ({ editable, tabIndex }: DiscrepancyTabProps) => {
  const { masterData }: SdrEsfrRecordDetailsStateType = useAppSelector(
    (state) => state.sdrEsfrRecordDetails
  );
  const { errors, handleBlur, handleChange, setFieldValue, touched, values } =
    useFormikContext<ISaveSfrValues>();

  return (
    <>
      <TabPanel
        value={tabIndex}
        index={SelectedSfrTab.Discrepancy}
        className="sdr-status-grid overflow-y-auto"
      >
        <div className="relative">
          <ListItem>Exceed Manufacturer/FAA Limits</ListItem>
          <ListItem className="!absolute !px-0 left-0 top-[20px]">
            {editable ? (
              <Radio
                name="ExceedLimits"
                value={values.ExceedLimits || ""}
                onChange={(values) => {
                  setFieldValue("ExceedLimits", values);
                }}
                error={!!touched.ExceedLimits && !!errors.ExceedLimits}
                helperText={!!touched.ExceedLimits && errors.ExceedLimits}
                options={["Yes", "No"]}
                className={"sdr-status-edit gap-5"}
              />
            ) : (
              ""
            )}
          </ListItem>
        </div>
        <Grid container className="!mt-[40px]">
          <Grid item xs={6} className="flex !flex-col gap-4">
            {/* Discrepancy Type */}
            <div>
              <ListItem>Discrepancy Type</ListItem>
              <ListItem>
                {editable ? (
                  <SingleSelect
                    name="DiscrepancyType"
                    value={values.DiscrepancyType || ""}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={!!touched.DiscrepancyType && !!errors.DiscrepancyType}
                    helperText={!!touched.DiscrepancyType && errors.DiscrepancyType}
                    options={
                      masterData?.DiscrepancyTypes &&
                      [...masterData.DiscrepancyTypes].sort(
                        (a, b) => a.DisplayOrder - b.DisplayOrder
                      )
                    }
                    className={"sdr-status-edit"}
                    id="DiscrepancyType"
                  />
                ) : (
                  ""
                )}
              </ListItem>
            </div>

            {/* Corrosion */}
            {(values.DiscrepancyType === 4 || values.DiscrepancyType === 6) && (
              <>
                <div>
                  <ListItem>Corrosion Level</ListItem>
                  <ListItem>
                    {editable ? (
                      <SingleSelect
                        name="SfrAdditionalDetails.CorrisionLevel"
                        value={values.SfrAdditionalDetails?.CorrisionLevel || ""}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={
                          !!touched.SfrAdditionalDetails?.CorrisionLevel &&
                          !!errors.SfrAdditionalDetails?.CorrisionLevel
                        }
                        helperText={
                          !!touched.SfrAdditionalDetails?.CorrisionLevel &&
                          errors.SfrAdditionalDetails?.CorrisionLevel
                        }
                        options={
                          masterData?.CorrosionLevels &&
                          [...masterData.CorrosionLevels].sort(
                            (a, b) => a.DisplayOrder - b.DisplayOrder
                          )
                        }
                        className={"sdr-status-edit"}
                        id="SfrAdditionalDetails.CorrisionLevel"
                      />
                    ) : (
                      ""
                    )}
                  </ListItem>
                </div>
                <div>
                  <ListItem>Extent</ListItem>
                  <ListItem>
                    {editable ? (
                      <SingleSelect
                        name="CorrosionExtent"
                        value={values.CorrosionExtent || ""}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={!!touched.CorrosionExtent && !!errors.CorrosionExtent}
                        helperText={!!touched.CorrosionExtent && errors.CorrosionExtent}
                        options={
                          masterData?.CorrosionExtent &&
                          [...masterData.CorrosionExtent].sort(
                            (a, b) => a.DisplayOrder - b.DisplayOrder
                          )
                        }
                        className={"sdr-status-edit"}
                        id="CorrosionExtent"
                      />
                    ) : (
                      ""
                    )}
                  </ListItem>
                </div>
                <div>
                  <ListItem>Cause</ListItem>
                  <ListItem>
                    {editable ? (
                      <SingleSelect
                        name="CorrosionCause"
                        value={values.CorrosionCause || ""}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={!!touched.CorrosionCause && !!errors.CorrosionCause}
                        helperText={!!touched.CorrosionCause && errors.CorrosionCause}
                        options={
                          masterData?.CorrosionCauses &&
                          [...masterData.CorrosionLevels].sort(
                            (a, b) => a.DisplayOrder - b.DisplayOrder
                          )
                        }
                        className={"sdr-status-edit"}
                        id="CorrosionCause"
                      />
                    ) : (
                      ""
                    )}
                  </ListItem>
                </div>
              </>
            )}

            {/* Crack */}
            {(values.DiscrepancyType === 5 || values.DiscrepancyType === 6) && (
              <>
                <div>
                  <ListItem>Crack Level</ListItem>
                  <ListItem>
                    {editable ? (
                      <TextField
                        name="SfrAdditionalDetails.CrackLength"
                        value={values?.SfrAdditionalDetails?.CrackLength || ""}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={
                          !!touched?.SfrAdditionalDetails?.CrackLength &&
                          !!errors?.SfrAdditionalDetails?.CrackLength
                        }
                        helperText={
                          !!touched?.SfrAdditionalDetails?.CrackLength &&
                          errors?.SfrAdditionalDetails?.CrackLength
                        }
                        className={"sdr-status-edit"}
                      />
                    ) : (
                      ""
                    )}
                  </ListItem>
                </div>
                <div className="relative">
                  <ListItem>Multiple Cracks in Same Location</ListItem>
                  <ListItem className="!absolute !px-0 left-0 top-[20px]">
                    {editable ? (
                      <Radio
                        name="MultipleCracks"
                        value={values.MultipleCracks || ""}
                        onChange={(values) => {
                          setFieldValue("MultipleCracks", values);
                        }}
                        error={!!touched.MultipleCracks && !!errors.MultipleCracks}
                        helperText={!!touched.MultipleCracks && errors.MultipleCracks}
                        options={["Yes", "No"]}
                        className={"sdr-status-edit gap-5"}
                      />
                    ) : (
                      ""
                    )}
                  </ListItem>
                </div>
                {values.MultipleCracks === "Yes" && (
                  <div className="!mt-[40px]">
                    <ListItem>Number of Cracks</ListItem>
                    <ListItem>
                      {editable ? (
                        <TextField
                          type="number"
                          name="SfrAdditionalDetails.NumberOfCracks"
                          value={values?.SfrAdditionalDetails?.NumberOfCracks || ""}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={
                            !!touched?.SfrAdditionalDetails?.NumberOfCracks &&
                            !!errors?.SfrAdditionalDetails?.NumberOfCracks
                          }
                          helperText={
                            !!touched?.SfrAdditionalDetails?.NumberOfCracks &&
                            errors?.SfrAdditionalDetails?.NumberOfCracks
                          }
                          className={"sdr-status-edit"}
                        />
                      ) : (
                        ""
                      )}
                    </ListItem>
                  </div>
                )}
              </>
            )}

            {/* Delaminated/Disbonded */}
            {(values.DiscrepancyType === 7 || values.DiscrepancyType === 8) && (
              <>
                <div>
                  <ListItem>Damage Level</ListItem>
                  <ListItem>
                    {editable ? (
                      <TextField
                        type="number"
                        name="DamageLength"
                        value={values?.DamageLength || ""}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={!!touched?.DamageLength && !!errors?.DamageLength}
                        helperText={!!touched?.DamageLength && errors?.DamageLength}
                        className={"sdr-status-edit"}
                      />
                    ) : (
                      ""
                    )}
                  </ListItem>
                </div>
                <div>
                  <ListItem>Damage Width</ListItem>
                  <ListItem>
                    {editable ? (
                      <TextField
                        type="number"
                        name="DamageWidth"
                        value={values?.DamageWidth || ""}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={!!touched?.DamageWidth && !!errors?.DamageWidth}
                        helperText={!!touched?.DamageWidth && errors?.DamageWidth}
                        className={"sdr-status-edit"}
                      />
                    ) : (
                      ""
                    )}
                  </ListItem>
                </div>
              </>
            )}

            {/* Dented/Deformed */}
            {values.DiscrepancyType === 8 && (
              <div>
                <ListItem>Damage Depth</ListItem>
                <ListItem>
                  {editable ? (
                    <TextField
                      type="number"
                      name="DamageDepth"
                      value={values?.DamageDepth || ""}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={!!touched?.DamageDepth && !!errors?.DamageDepth}
                      helperText={!!touched?.DamageDepth && errors?.DamageDepth}
                      className={"sdr-status-edit"}
                    />
                  ) : (
                    ""
                  )}
                </ListItem>
              </div>
            )}

            {/* Other Structural Defect */}
            {values.DiscrepancyType === 13 && (
              <div>
                <ListItem>Damage Depth</ListItem>
                <ListItem>
                  {editable ? (
                    <TextField
                      name="OtherStructuralDefectSpecify"
                      value={values.OtherStructuralDefectSpecify || ""}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={
                        !!touched.OtherStructuralDefectSpecify &&
                        !!errors.OtherStructuralDefectSpecify
                      }
                      helperText={
                        !!touched.OtherStructuralDefectSpecify &&
                        errors.OtherStructuralDefectSpecify
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
            )}
          </Grid>
          <Grid item xs={6} className="flex !flex-col gap-4">
            {/* Discrepancy Part Info */}
            <div>
              <ListItem>Discrepancy Part Info</ListItem>
              <ListItem>
                {editable ? (
                  <SingleSelect
                    name="DiscrepancyPartInfo"
                    value={values.DiscrepancyPartInfo || ""}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={!!touched.DiscrepancyPartInfo && !!errors.DiscrepancyPartInfo}
                    helperText={!!touched.DiscrepancyPartInfo && errors.DiscrepancyPartInfo}
                    options={
                      masterData?.DiscrepancyParts &&
                      [...masterData.DiscrepancyParts].sort(
                        (a, b) => a.DisplayOrder - b.DisplayOrder
                      )
                    }
                    className={"sdr-status-edit"}
                    id="DiscrepancyPartInfo"
                  />
                ) : (
                  ""
                )}
              </ListItem>
            </div>

            {/* Other */}
            {values.DiscrepancyPartInfo === 28 && (
              <div>
                <ListItem>Specify</ListItem>
                <ListItem>
                  {editable ? (
                    <TextField
                      name="OtherSpecify"
                      value={values.OtherSpecify || ""}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={!!touched.OtherSpecify && !!errors.OtherSpecify}
                      helperText={!!touched.OtherSpecify && errors.OtherSpecify}
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
            )}

            {!!values.DiscrepancyPartInfo && (
              <>
                <div>
                  <ListItem>ATA Chapter</ListItem>
                  <ListItem>
                    {editable ? (
                      <TextField
                        name="ATAChapter"
                        value={values?.ATAChapter || ""}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={!!touched?.ATAChapter && !!errors?.ATAChapter}
                        helperText={!!touched?.ATAChapter && errors?.ATAChapter}
                        className={"sdr-status-edit"}
                      />
                    ) : (
                      ""
                    )}
                  </ListItem>
                </div>
                <div>
                  <ListItem>ATA Sub Chapter</ListItem>
                  <ListItem>
                    {editable ? (
                      <TextField
                        name="ATASubChapter"
                        value={values?.ATASubChapter || ""}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={!!touched?.ATASubChapter && !!errors?.ATASubChapter}
                        helperText={!!touched?.ATASubChapter && errors?.ATASubChapter}
                        className={"sdr-status-edit"}
                      />
                    ) : (
                      ""
                    )}
                  </ListItem>
                </div>
                <div>
                  <ListItem>Part Number</ListItem>
                  <ListItem>
                    {editable ? (
                      <TextField
                        name="SfrAdditionalDetails.PartNumber"
                        value={values?.SfrAdditionalDetails?.PartNumber || ""}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={
                          !!touched?.SfrAdditionalDetails?.PartNumber &&
                          !!errors?.SfrAdditionalDetails?.PartNumber
                        }
                        helperText={
                          !!touched?.SfrAdditionalDetails?.PartNumber &&
                          errors?.SfrAdditionalDetails?.PartNumber
                        }
                        className={"sdr-status-edit"}
                      />
                    ) : (
                      ""
                    )}
                  </ListItem>
                </div>
                <div>
                  <ListItem>Structure</ListItem>
                  <ListItem>
                    {editable ? (
                      <TextField
                        name="Structure"
                        value={values?.Structure || ""}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={!!touched?.Structure && !!errors?.Structure}
                        helperText={!!touched?.Structure && errors?.Structure}
                        className={"sdr-status-edit"}
                      />
                    ) : (
                      ""
                    )}
                  </ListItem>
                </div>
                <div>
                  <ListItem>Comment Box</ListItem>
                  <ListItem>
                    {editable ? (
                      <TextField
                        name="DiscrepancyComments"
                        value={values.DiscrepancyComments || ""}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={!!touched.DiscrepancyComments && !!errors.DiscrepancyComments}
                        helperText={!!touched.DiscrepancyComments && errors.DiscrepancyComments}
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
              </>
            )}
          </Grid>
        </Grid>
      </TabPanel>
    </>
  );
};
