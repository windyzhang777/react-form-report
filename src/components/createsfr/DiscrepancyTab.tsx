import { Grid } from "@mui/material";
import { useFormikContext } from "formik";
import ListItem from "src/commons/ListItem";
import { SimpleRadio } from "src/commons/Radio";
import { SingleSelect } from "src/commons/Select";
import TabPanel from "src/commons/TabPanel";
import TextField from "src/commons/TextField";
import { ISaveSfrValues, SdrEsfrRecordDetailsStateType, SelectedSfrTab } from "src/commons/types";
import { useAppSelector } from "src/redux/hooks";
import { removeNonAlphaNumeric, removeNonNumeric } from "src/validationSchema";

type DiscrepancyTabProps = {
  editable: boolean;
  tabIndex: number;
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
        <Grid container>
          <Grid item xs={6} className="relative">
            <ListItem>Exceed Manufacturer/FAA Limits</ListItem>
            <ListItem className="!absolute !px-0 left-0 top-[20px]">
              {editable ? (
                <SimpleRadio
                  name="DiscrepancyDetails.IsManufacturingLimitExceeded"
                  value={values?.DiscrepancyDetails?.IsManufacturingLimitExceeded}
                  onChange={(value) => {
                    setFieldValue(
                      "DiscrepancyDetails.IsManufacturingLimitExceeded",
                      value === "true"
                    );
                  }}
                  error={
                    !!touched?.DiscrepancyDetails?.IsManufacturingLimitExceeded &&
                    !!errors?.DiscrepancyDetails?.IsManufacturingLimitExceeded
                  }
                  helperText={
                    !!touched?.DiscrepancyDetails?.IsManufacturingLimitExceeded &&
                    errors?.DiscrepancyDetails?.IsManufacturingLimitExceeded
                  }
                  className={"sdr-status-edit gap-5"}
                />
              ) : (
                ""
              )}
            </ListItem>
          </Grid>
          <Grid item xs={6} className="relative">
            <ListItem>Endangers Safe Operations of Aircraft</ListItem>
            <ListItem className="!absolute !px-0 left-0 top-[20px]">
              {editable ? (
                <SimpleRadio
                  name="DiscrepancyDetails.IsSafeOperationEndangered"
                  value={values?.DiscrepancyDetails?.IsSafeOperationEndangered}
                  onChange={(value) => {
                    setFieldValue("DiscrepancyDetails.IsSafeOperationEndangered", value === "true");
                  }}
                  error={
                    !!touched?.DiscrepancyDetails?.IsSafeOperationEndangered &&
                    !!errors?.DiscrepancyDetails?.IsSafeOperationEndangered
                  }
                  helperText={
                    !!touched?.DiscrepancyDetails?.IsSafeOperationEndangered &&
                    errors?.DiscrepancyDetails?.IsSafeOperationEndangered
                  }
                  className={"sdr-status-edit gap-5"}
                />
              ) : (
                ""
              )}
            </ListItem>
          </Grid>
        </Grid>
        <Grid container className="!mt-[50px]">
          <Grid item xs={6} className="flex !flex-col gap-4">
            {/* Discrepancy Type */}
            <div>
              <ListItem required>Discrepancy Type</ListItem>
              <ListItem>
                {editable ? (
                  <SingleSelect
                    name="DiscrepancyDetails.DiscrepancyTypeId"
                    value={values?.DiscrepancyDetails?.DiscrepancyTypeId || ""}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={
                      !!touched?.DiscrepancyDetails?.DiscrepancyTypeId &&
                      !!errors?.DiscrepancyDetails?.DiscrepancyTypeId
                    }
                    helperText={
                      !!touched?.DiscrepancyDetails?.DiscrepancyTypeId &&
                      errors?.DiscrepancyDetails?.DiscrepancyTypeId
                    }
                    options={
                      masterData?.DiscrepancyTypes &&
                      [...masterData.DiscrepancyTypes].sort(
                        (a, b) => a.DisplayOrder - b.DisplayOrder
                      )
                    }
                    className={"sdr-status-edit"}
                    id="DiscrepancyDetails.DiscrepancyTypeId"
                  />
                ) : (
                  ""
                )}
              </ListItem>
            </div>

            {/* Corrosion */}
            {(values?.DiscrepancyDetails?.DiscrepancyTypeId === 4 ||
              values?.DiscrepancyDetails?.DiscrepancyTypeId === 6) && (
              <>
                <div>
                  <ListItem>Corrosion Level</ListItem>
                  <ListItem>
                    {editable ? (
                      <SingleSelect
                        name="DiscrepancyDetails.CorrosionLevelId"
                        value={values?.DiscrepancyDetails?.CorrosionLevelId || ""}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={
                          !!touched?.DiscrepancyDetails?.CorrosionLevelId &&
                          !!errors?.DiscrepancyDetails?.CorrosionLevelId
                        }
                        helperText={
                          !!touched?.DiscrepancyDetails?.CorrosionLevelId &&
                          errors?.DiscrepancyDetails?.CorrosionLevelId
                        }
                        options={
                          masterData?.CorrosionLevels &&
                          [...masterData.CorrosionLevels].sort(
                            (a, b) => a.DisplayOrder - b.DisplayOrder
                          )
                        }
                        id="DiscrepancyDetails.CorrosionLevelId"
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
                        name="DiscrepancyDetails.CorrosionExtentId"
                        value={values?.DiscrepancyDetails?.CorrosionExtentId || ""}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={
                          !!touched?.DiscrepancyDetails?.CorrosionExtentId &&
                          !!errors?.DiscrepancyDetails?.CorrosionExtentId
                        }
                        helperText={
                          !!touched?.DiscrepancyDetails?.CorrosionExtentId &&
                          errors?.DiscrepancyDetails?.CorrosionExtentId
                        }
                        options={
                          masterData?.CorrosionExtent &&
                          [...masterData.CorrosionExtent].sort(
                            (a, b) => a.DisplayOrder - b.DisplayOrder
                          )
                        }
                        id="DiscrepancyDetails.CorrosionExtentId"
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
                        name="DiscrepancyDetails.CorrosionCauseId"
                        value={values?.DiscrepancyDetails?.CorrosionCauseId || ""}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={
                          !!touched?.DiscrepancyDetails?.CorrosionCauseId &&
                          !!errors?.DiscrepancyDetails?.CorrosionCauseId
                        }
                        helperText={
                          !!touched?.DiscrepancyDetails?.CorrosionCauseId &&
                          errors?.DiscrepancyDetails?.CorrosionCauseId
                        }
                        options={
                          masterData?.CorrosionCauses &&
                          [...masterData.CorrosionCauses].sort(
                            (a, b) => a.DisplayOrder - b.DisplayOrder
                          )
                        }
                        id="DiscrepancyDetails.CorrosionCauseId"
                      />
                    ) : (
                      ""
                    )}
                  </ListItem>
                </div>
              </>
            )}

            {/* Crack */}
            {(values?.DiscrepancyDetails?.DiscrepancyTypeId === 5 ||
              values?.DiscrepancyDetails?.DiscrepancyTypeId === 6) && (
              <>
                <div>
                  <ListItem>Crack Length (Inches)</ListItem>
                  <ListItem>
                    {editable ? (
                      <TextField
                        name="DiscrepancyDetails.CrackLength"
                        value={values?.DiscrepancyDetails?.CrackLength || ""}
                        onChange={(e) =>
                          setFieldValue(
                            "DiscrepancyDetails.CrackLength",
                            removeNonNumeric(e.target.value)
                          )
                        }
                        onBlur={handleBlur}
                        error={
                          !!touched?.DiscrepancyDetails?.CrackLength &&
                          !!errors?.DiscrepancyDetails?.CrackLength
                        }
                        helperText={
                          !!touched?.DiscrepancyDetails?.CrackLength &&
                          errors?.DiscrepancyDetails?.CrackLength
                        }
                        className={"sdr-status-edit"}
                        inputProps={{ maxLength: 5 }}
                        placeholder="xxxxx"
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
                      <SimpleRadio
                        name="DiscrepancyDetails.AreMultipleCracksInTheSameLocation"
                        value={values?.DiscrepancyDetails?.AreMultipleCracksInTheSameLocation}
                        onChange={(value) => {
                          setFieldValue(
                            "DiscrepancyDetails.AreMultipleCracksInTheSameLocation",
                            value === "true"
                          );
                        }}
                        error={
                          !!touched?.DiscrepancyDetails?.AreMultipleCracksInTheSameLocation &&
                          !!errors?.DiscrepancyDetails?.AreMultipleCracksInTheSameLocation
                        }
                        helperText={
                          !!touched?.DiscrepancyDetails?.AreMultipleCracksInTheSameLocation &&
                          errors?.DiscrepancyDetails?.AreMultipleCracksInTheSameLocation
                        }
                        className={"sdr-status-edit gap-5"}
                      />
                    ) : (
                      ""
                    )}
                  </ListItem>
                </div>
                {values?.DiscrepancyDetails?.AreMultipleCracksInTheSameLocation && (
                  <div className="!mt-[40px]">
                    <ListItem>Number of Cracks</ListItem>
                    <ListItem>
                      {editable ? (
                        <TextField
                          name="DiscrepancyDetails.NumberOfCracks"
                          value={values?.DiscrepancyDetails?.NumberOfCracks || ""}
                          onChange={(e) =>
                            setFieldValue(
                              "DiscrepancyDetails.NumberOfCracks",
                              removeNonNumeric(e.target.value)
                            )
                          }
                          onBlur={handleBlur}
                          error={
                            !!touched?.DiscrepancyDetails?.NumberOfCracks &&
                            !!errors?.DiscrepancyDetails?.NumberOfCracks
                          }
                          helperText={
                            !!touched?.DiscrepancyDetails?.NumberOfCracks &&
                            errors?.DiscrepancyDetails?.NumberOfCracks
                          }
                          className={"sdr-status-edit"}
                          inputProps={{ maxLength: 3 }}
                          placeholder="xxx"
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
            {(values?.DiscrepancyDetails?.DiscrepancyTypeId === 7 ||
              values?.DiscrepancyDetails?.DiscrepancyTypeId === 8) && (
              <>
                <div>
                  <ListItem>Damage Length (Inches)</ListItem>
                  <ListItem>
                    {editable ? (
                      <TextField
                        name="DiscrepancyDetails.CrackLength"
                        value={values?.DiscrepancyDetails?.CrackLength || ""}
                        onChange={(e) =>
                          setFieldValue(
                            "DiscrepancyDetails.CrackLength",
                            removeNonNumeric(e.target.value)
                          )
                        }
                        onBlur={handleBlur}
                        error={
                          !!touched?.DiscrepancyDetails?.CrackLength &&
                          !!errors?.DiscrepancyDetails?.CrackLength
                        }
                        helperText={
                          !!touched?.DiscrepancyDetails?.CrackLength &&
                          errors?.DiscrepancyDetails?.CrackLength
                        }
                        className={"sdr-status-edit"}
                        inputProps={{ maxLength: 5 }}
                        placeholder="xxxxx"
                      />
                    ) : (
                      ""
                    )}
                  </ListItem>
                </div>
                <div>
                  <ListItem>Damage Width (Inches)</ListItem>
                  <ListItem>
                    {editable ? (
                      <TextField
                        name="DiscrepancyDetails.CrackWidth"
                        value={values?.DiscrepancyDetails?.CrackWidth || ""}
                        onChange={(e) =>
                          setFieldValue(
                            "DiscrepancyDetails.CrackWidth",
                            removeNonNumeric(e.target.value)
                          )
                        }
                        onBlur={handleBlur}
                        error={
                          !!touched?.DiscrepancyDetails?.CrackWidth &&
                          !!errors?.DiscrepancyDetails?.CrackWidth
                        }
                        helperText={
                          !!touched?.DiscrepancyDetails?.CrackWidth &&
                          errors?.DiscrepancyDetails?.CrackWidth
                        }
                        className={"sdr-status-edit"}
                        inputProps={{ maxLength: 5 }}
                        placeholder="xxxxx"
                      />
                    ) : (
                      ""
                    )}
                  </ListItem>
                </div>
              </>
            )}

            {/* Dented/Deformed */}
            {values?.DiscrepancyDetails?.DiscrepancyTypeId === 8 && (
              <div>
                <ListItem>Damage Depth (Inches)</ListItem>
                <ListItem>
                  {editable ? (
                    <TextField
                      name="DiscrepancyDetails.CrackDepth"
                      value={values?.DiscrepancyDetails?.CrackDepth || ""}
                      onChange={(e) =>
                        setFieldValue(
                          "DiscrepancyDetails.CrackDepth",
                          removeNonNumeric(e.target.value)
                        )
                      }
                      onBlur={handleBlur}
                      error={
                        !!touched?.DiscrepancyDetails?.CrackDepth &&
                        !!errors?.DiscrepancyDetails?.CrackDepth
                      }
                      helperText={
                        !!touched?.DiscrepancyDetails?.CrackDepth &&
                        errors?.DiscrepancyDetails?.CrackDepth
                      }
                      className={"sdr-status-edit"}
                      inputProps={{ maxLength: 5 }}
                      placeholder="xxxxx"
                    />
                  ) : (
                    ""
                  )}
                </ListItem>
              </div>
            )}

            {/* Other Structural Defect */}
            {values?.DiscrepancyDetails?.DiscrepancyTypeId === 10 && (
              <div>
                <ListItem>Specify</ListItem>
                <ListItem>
                  {editable ? (
                    <TextField
                      name="DiscrepancyDetails.DiscrepancyTypeComments"
                      value={values?.DiscrepancyDetails?.DiscrepancyTypeComments || ""}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={
                        !!touched?.DiscrepancyDetails?.DiscrepancyTypeComments &&
                        !!errors?.DiscrepancyDetails?.DiscrepancyTypeComments
                      }
                      helperText={
                        !!touched?.DiscrepancyDetails?.DiscrepancyTypeComments &&
                        errors?.DiscrepancyDetails?.DiscrepancyTypeComments
                      }
                      multiline
                      maxRows={4}
                      className={"sdr-status-edit textareaAutosize"}
                      inputProps={{ maxLength: 100, style: { resize: "both" } }}
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
                    name="DiscrepancyDetails.DiscrepancyPartDetails[0].DiscrepancyPartInformationCode"
                    value={
                      values?.DiscrepancyDetails?.DiscrepancyPartDetails?.[0]
                        ?.DiscrepancyPartInformationCode || ""
                    }
                    onChange={handleChange}
                    onBlur={handleBlur}
                    // error={
                    //   !!touched?.DiscrepancyDetails?.DiscrepancyPartDetails?.[0]
                    //     ?.DiscrepancyPartInformationCode &&
                    //   !!errors?.DiscrepancyDetails?.DiscrepancyPartDetails?.[0]
                    //     ?.DiscrepancyPartInformationCode
                    // }
                    // helperText={
                    //   !!touched?.DiscrepancyDetails?.DiscrepancyPartDetails?.[0]
                    //     ?.DiscrepancyPartInformationCode &&
                    //   errors?.DiscrepancyDetails?.DiscrepancyPartDetails?.[0]
                    //     ?.DiscrepancyPartInformationCode
                    // }
                    options={
                      masterData?.DiscrepancyParts &&
                      [...masterData.DiscrepancyParts].sort(
                        (a, b) => a.DisplayOrder - b.DisplayOrder
                      )
                    }
                    className={"sdr-status-edit"}
                    id="DiscrepancyDetails.DiscrepancyPartInfo"
                  />
                ) : (
                  ""
                )}
              </ListItem>
            </div>

            {/* Other */}
            {values?.DiscrepancyDetails?.DiscrepancyPartDetails?.[0]
              ?.DiscrepancyPartInformationCode === 28 && (
              <div>
                <ListItem>Specify</ListItem>
                <ListItem>
                  {editable ? (
                    <TextField
                      name="DiscrepancyDetails.DiscrepancyTypeComments"
                      value={values?.DiscrepancyDetails?.DiscrepancyTypeComments || ""}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={
                        !!touched?.DiscrepancyDetails?.DiscrepancyTypeComments &&
                        !!errors?.DiscrepancyDetails?.DiscrepancyTypeComments
                      }
                      helperText={
                        !!touched?.DiscrepancyDetails?.DiscrepancyTypeComments &&
                        errors?.DiscrepancyDetails?.DiscrepancyTypeComments
                      }
                      multiline
                      maxRows={4}
                      className={"sdr-status-edit textareaAutosize"}
                      inputProps={{ maxLength: 100, style: { resize: "both" } }}
                    />
                  ) : (
                    ""
                  )}
                </ListItem>
              </div>
            )}

            {!!values?.DiscrepancyDetails?.DiscrepancyPartDetails?.[0]
              ?.DiscrepancyPartInformationCode && (
              <>
                <div>
                  <ListItem>Part Number</ListItem>
                  <ListItem>
                    {editable ? (
                      <TextField
                        name="PartNumber"
                        value={values.PartNumber || ""}
                        onChange={(e) => {
                          setFieldValue("PartNumber", removeNonNumeric(e.target.value));
                          setFieldValue(
                            "DiscrepancyDetails.DiscrepancyPartDetails[0].PartNumber",
                            removeNonNumeric(e.target.value)
                          );
                        }}
                        onBlur={handleBlur}
                        error={!!touched.PartNumber && !!errors.PartNumber}
                        helperText={!!touched.PartNumber && errors.PartNumber}
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
                        value={values.Structure || ""}
                        onChange={(e) => {
                          setFieldValue("Structure", removeNonAlphaNumeric(e.target.value));
                          setFieldValue(
                            "DiscrepancyDetails.DiscrepancyPartDetails[0].Structure",
                            removeNonAlphaNumeric(e.target.value)
                          );
                        }}
                        onBlur={handleBlur}
                        error={!!touched.Structure && !!errors.Structure}
                        helperText={!!touched.Structure && errors.Structure}
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
                        name="DiscrepancyDetails.DiscrepancyPartComments"
                        value={values?.DiscrepancyDetails?.DiscrepancyPartComments || ""}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={
                          !!touched?.DiscrepancyDetails?.DiscrepancyPartComments &&
                          !!errors?.DiscrepancyDetails?.DiscrepancyPartComments
                        }
                        helperText={
                          !!touched?.DiscrepancyDetails?.DiscrepancyPartComments &&
                          errors?.DiscrepancyDetails?.DiscrepancyPartComments
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
              </>
            )}
          </Grid>
        </Grid>
      </TabPanel>
    </>
  );
};
