import { Grid, Typography } from "@mui/material";
import { GridCellParams } from "@mui/x-data-grid";
import { useFormikContext } from "formik";
import { useMemo, useState } from "react";
import { InfoBox, WarningBox } from "src/commons/Box";
import ButtonGroup from "src/commons/ButtonGroup";
import { ScrollableDataGrid as DataGrid } from "src/commons/DataGrid";
import ListItem from "src/commons/ListItem";
import Modal from "src/commons/Modal";
import { SimpleRadio } from "src/commons/Radio";
import { SingleSelect } from "src/commons/Select";
import TabPanel from "src/commons/TabPanel";
import TextField, { ClickableTextField } from "src/commons/TextField";
import TextFieldGroup from "src/commons/TextFieldGroup";
import {
  ISaveSfrValues,
  SdrEsfrRecordDetailsStateType,
  SelectedSfrTab,
  TypeOptions,
} from "src/commons/types";
import { UseUpdateCodes } from "src/components/createsfr/useUpdateCodes";
import { getCtnData, getSidData } from "src/redux/ducks/getSdrEsfrRecordDetails";
import { useAppDispatch, useAppSelector } from "src/redux/hooks";

type OriginTabProps = {
  editable: any;
  tabIndex: any;
};

export const OriginTab = ({ editable, tabIndex }: OriginTabProps) => {
  const dispatch = useAppDispatch();
  const { loading, masterData, ctnData }: SdrEsfrRecordDetailsStateType = useAppSelector(
    (state) => state.sdrEsfrRecordDetails
  );
  const { errors, handleBlur, handleChange, setFieldValue, touched } =
    useFormikContext<ISaveSfrValues>();
  const values = UseUpdateCodes();
  const [openSelectCtn, setOpenSelect] = useState<boolean>(false);
  const selectedMFRSource = useMemo(
    () =>
      masterData?.MfrSources?.find((m) => m.Id === values?.OriginDetails?.MfrSourceId)?.Description,
    [values?.OriginDetails?.MfrSourceId]
  );

  const toggleSelect = () => {
    setOpenSelect(!openSelectCtn);
  };

  const handleGetData = (fleetCode: string) => {
    switch (values?.OriginDetails?.MfrSourceId) {
      case 1:
        dispatch(getCtnData(fleetCode));
        break;
      case 2:
      case 3:
        dispatch(getSidData(fleetCode));
        break;
      default:
        break;
    }
  };

  return (
    <>
      <TabPanel
        value={tabIndex}
        index={SelectedSfrTab.Origin}
        className="sdr-status-grid overflow-y-auto"
      >
        <div className="relative !mb-[50px]">
          <ListItem>Scheduled Inspection</ListItem>
          <ListItem className="!absolute !px-0 left-0 top-[20px]">
            {editable ? (
              <SimpleRadio
                name="OriginDetails.IsScheduledInspection"
                value={values?.OriginDetails?.IsScheduledInspection}
                onChange={(value) => {
                  setFieldValue("OriginDetails.IsScheduledInspection", value === "true");
                }}
                error={
                  !!touched?.OriginDetails?.IsScheduledInspection &&
                  !!errors?.OriginDetails?.IsScheduledInspection
                }
                helperText={
                  !!touched?.OriginDetails?.IsScheduledInspection &&
                  errors?.OriginDetails?.IsScheduledInspection
                }
                className={"sdr-status-edit gap-5"}
              />
            ) : (
              ""
            )}
          </ListItem>
        </div>
        {values?.OriginDetails?.IsScheduledInspection && (
          <Grid container>
            <Grid item xs={6} className="flex !flex-col gap-6">
              {/* CAL Document */}
              <div>
                <ListItem>CAL Document</ListItem>
                <ListItem>
                  {editable ? (
                    <SingleSelect
                      name="OriginDetails.CalDocId"
                      value={values?.OriginDetails?.CalDocId || ""}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={
                        !!touched?.OriginDetails?.CalDocId && !!errors?.OriginDetails?.CalDocId
                      }
                      helperText={
                        !!touched?.OriginDetails?.CalDocId && errors?.OriginDetails?.CalDocId
                      }
                      options={
                        masterData?.CalDocuments &&
                        [...masterData.CalDocuments].sort((a, b) => a.DisplayOrder - b.DisplayOrder)
                      }
                      className={"sdr-status-edit"}
                      id="OriginDetails.CalDocId"
                    />
                  ) : (
                    ""
                  )}
                </ListItem>
              </div>

              {values?.OriginDetails?.CalDocId === 1 && (
                <div>
                  <ListItem>Work Card #</ListItem>
                  <ListItem>
                    {editable ? (
                      <TextFieldGroup
                        count={4}
                        maxAllowed={[2, 4, 1, 4]}
                        name="CalDocIdentifier"
                        values={values}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                    ) : (
                      ""
                    )}
                  </ListItem>
                </div>
              )}
              {values?.OriginDetails?.CalDocId === 2 && (
                <div>
                  <ListItem>EA #</ListItem>
                  <ListItem>
                    {editable ? (
                      <TextFieldGroup
                        count={2}
                        maxAllowed={[4, 5]}
                        name="CalDocIdentifier"
                        values={values}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                    ) : (
                      ""
                    )}
                  </ListItem>
                </div>
              )}
              {values?.OriginDetails?.CalDocId === 3 && (
                <div>
                  <ListItem>FCD #</ListItem>
                  <ListItem>
                    {editable ? (
                      <TextFieldGroup
                        count={2}
                        maxAllowed={[4, 5]}
                        name="CalDocIdentifier"
                        values={values}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                    ) : (
                      ""
                    )}
                  </ListItem>
                </div>
              )}
              {values?.OriginDetails?.CalDocId === 4 && (
                <div>
                  <ListItem>DIP #</ListItem>
                  <ListItem>
                    {editable ? (
                      <TextField
                        name="OriginDetails.CalDocIdentifier"
                        value={values?.OriginDetails?.CalDocIdentifier || ""}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={
                          !!touched?.OriginDetails?.CalDocIdentifier &&
                          !!errors?.OriginDetails?.CalDocIdentifier
                        }
                        helperText={
                          !!touched?.OriginDetails?.CalDocIdentifier &&
                          errors?.OriginDetails?.CalDocIdentifier
                        }
                        className={"sdr-status-edit"}
                      />
                    ) : (
                      ""
                    )}
                  </ListItem>
                </div>
              )}
              {values?.OriginDetails?.CalDocId === 5 && (
                <div>
                  <ListItem>Log Page #</ListItem>
                  <ListItem>
                    {editable ? (
                      <TextField
                        name="OriginDetails.CalDocIdentifier"
                        value={values?.OriginDetails?.CalDocIdentifier || ""}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={
                          !!touched?.OriginDetails?.CalDocIdentifier &&
                          !!errors?.OriginDetails?.CalDocIdentifier
                        }
                        helperText={
                          !!touched?.OriginDetails?.CalDocIdentifier &&
                          errors?.OriginDetails?.CalDocIdentifier
                        }
                        className={"sdr-status-edit"}
                      />
                    ) : (
                      ""
                    )}
                  </ListItem>
                </div>
              )}

              {/* REV */}
              {(values?.OriginDetails?.CalDocId === 2 || values?.OriginDetails?.CalDocId === 3) && (
                <div>
                  <ListItem>Rev #</ListItem>
                  <ListItem>
                    {editable ? (
                      <TextField
                        name="OriginDetails.Rev"
                        value={values?.OriginDetails?.Rev || ""}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={!!touched?.OriginDetails?.Rev && !!errors?.OriginDetails?.Rev}
                        helperText={!!touched?.OriginDetails?.Rev && errors?.OriginDetails?.Rev}
                        className={"sdr-status-edit"}
                      />
                    ) : (
                      ""
                    )}
                  </ListItem>
                </div>
              )}

              {/* OP */}
              {values?.OriginDetails?.CalDocId === 2 && (
                <div>
                  <ListItem>Op #</ListItem>
                  <ListItem>
                    {editable ? (
                      <TextField
                        name="OriginDetails.Op"
                        value={values?.OriginDetails?.Op || ""}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={!!touched?.OriginDetails?.Op && !!errors?.OriginDetails?.Op}
                        helperText={!!touched?.OriginDetails?.Op && errors?.OriginDetails?.Op}
                        className={"sdr-status-edit"}
                      />
                    ) : (
                      ""
                    )}
                  </ListItem>
                </div>
              )}

              {/* Spec */}
              <div>
                <ListItem>Spec #</ListItem>
                <ListItem>
                  {editable ? (
                    <TextFieldGroup
                      count={4}
                      maxAllowed={[4, 2, 1, 4]}
                      name="SpecIdentifier"
                      values={values}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                  ) : (
                    ""
                  )}
                </ListItem>
              </div>
            </Grid>
            <Grid item xs={6} className="flex !flex-col gap-6">
              {/* MFR Source */}
              <div>
                <ListItem>MFR Source</ListItem>
                <ListItem>
                  {editable ? (
                    <SingleSelect
                      name="OriginDetails.MfrSourceId"
                      value={values?.OriginDetails?.MfrSourceId || ""}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={
                        !!touched?.OriginDetails?.MfrSourceId &&
                        !!errors?.OriginDetails?.MfrSourceId
                      }
                      helperText={
                        !!touched?.OriginDetails?.MfrSourceId && errors?.OriginDetails?.MfrSourceId
                      }
                      options={
                        masterData?.MfrSources &&
                        [...masterData.MfrSources].sort((a, b) => a.DisplayOrder - b.DisplayOrder)
                      }
                      className={"sdr-status-edit"}
                      id="OriginDetails.MfrSourceId"
                    />
                  ) : (
                    ""
                  )}
                </ListItem>
              </div>

              {values?.OriginDetails?.MfrSourceId === 1 && (
                <div>
                  <ListItem>CTN</ListItem>
                  <ListItem>
                    {editable ? (
                      <ClickableTextField
                        name="OriginDetails.MfrSourceIdentifier"
                        value={values?.OriginDetails?.MfrSourceIdentifier || ""}
                        onClick={toggleSelect}
                        onBlur={handleBlur}
                        error={
                          !!touched?.OriginDetails?.MfrSourceIdentifier &&
                          !!errors?.OriginDetails?.MfrSourceIdentifier
                        }
                        helperText={
                          !!touched?.OriginDetails?.MfrSourceIdentifier &&
                          errors?.OriginDetails?.MfrSourceIdentifier
                        }
                        className={"sdr-status-edit"}
                      />
                    ) : (
                      ""
                    )}
                  </ListItem>
                </div>
              )}
              {values?.OriginDetails?.MfrSourceId === 2 && (
                <div>
                  <ListItem>SSI</ListItem>
                  <ListItem>
                    {editable ? (
                      <ClickableTextField
                        name="OriginDetails.MfrSourceIdentifier"
                        value={values?.OriginDetails?.MfrSourceIdentifier || ""}
                        onClick={toggleSelect}
                        onBlur={handleBlur}
                        error={
                          !!touched?.OriginDetails?.MfrSourceIdentifier &&
                          !!errors?.OriginDetails?.MfrSourceIdentifier
                        }
                        helperText={
                          !!touched?.OriginDetails?.MfrSourceIdentifier &&
                          errors?.OriginDetails?.MfrSourceIdentifier
                        }
                        className={"sdr-status-edit"}
                      />
                    ) : (
                      ""
                    )}
                  </ListItem>
                </div>
              )}
              {values?.OriginDetails?.MfrSourceId === 3 && (
                <div>
                  <ListItem>SID</ListItem>
                  <ListItem>
                    {editable ? (
                      <ClickableTextField
                        name="OriginDetails.MfrSourceIdentifier"
                        value={values?.OriginDetails?.MfrSourceIdentifier || ""}
                        onClick={toggleSelect}
                        onBlur={handleBlur}
                        error={
                          !!touched?.OriginDetails?.MfrSourceIdentifier &&
                          !!errors?.OriginDetails?.MfrSourceIdentifier
                        }
                        helperText={
                          !!touched?.OriginDetails?.MfrSourceIdentifier &&
                          errors?.OriginDetails?.MfrSourceIdentifier
                        }
                        className={"sdr-status-edit"}
                      />
                    ) : (
                      ""
                    )}
                  </ListItem>
                </div>
              )}
              {values?.OriginDetails?.MfrSourceId === 4 && (
                <div>
                  <ListItem>SSID</ListItem>
                  <ListItem>
                    {editable ? (
                      <TextField
                        name="OriginDetails.MfrSourceIdentifier"
                        value={values?.OriginDetails?.MfrSourceIdentifier || ""}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={
                          !!touched?.OriginDetails?.MfrSourceIdentifier &&
                          !!errors?.OriginDetails?.MfrSourceIdentifier
                        }
                        helperText={
                          !!touched?.OriginDetails?.MfrSourceIdentifier &&
                          errors?.OriginDetails?.MfrSourceIdentifier
                        }
                        className={"sdr-status-edit"}
                      />
                    ) : (
                      ""
                    )}
                  </ListItem>
                </div>
              )}
              {/* Comments */}
              {values?.OriginDetails?.MfrSourceId === 4 && (
                <div>
                  <ListItem>Comments</ListItem>
                  <ListItem>
                    {editable ? (
                      <TextField
                        name="OriginDetails.MfrSourceComments"
                        value={values?.OriginDetails?.MfrSourceComments || ""}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={
                          !!touched?.OriginDetails?.MfrSourceComments &&
                          !!errors?.OriginDetails?.MfrSourceComments
                        }
                        helperText={
                          !!touched?.OriginDetails?.MfrSourceComments &&
                          errors?.OriginDetails?.MfrSourceComments
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
              {/* Specify */}
              {values?.OriginDetails?.MfrSourceId === 5 && (
                <div>
                  <ListItem>Specify</ListItem>
                  <ListItem>
                    {editable ? (
                      <TextField
                        name="OriginDetails.MfrSourceComments"
                        value={values?.OriginDetails?.MfrSourceComments || ""}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={
                          !!touched?.OriginDetails?.MfrSourceComments &&
                          !!errors?.OriginDetails?.MfrSourceComments
                        }
                        helperText={
                          !!touched?.OriginDetails?.MfrSourceComments &&
                          errors?.OriginDetails?.MfrSourceComments
                        }
                        className={"sdr-status-edit"}
                      />
                    ) : (
                      ""
                    )}
                  </ListItem>
                </div>
              )}

              {/* Detection Method */}
              <div>
                <ListItem>Detection Method</ListItem>
                <ListItem>
                  {editable ? (
                    <SingleSelect
                      name="OriginDetails.DetectionMethodId"
                      value={values?.OriginDetails?.DetectionMethodId || ""}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={
                        !!touched?.OriginDetails?.DetectionMethodId &&
                        !!errors?.OriginDetails?.DetectionMethodId
                      }
                      helperText={
                        !!touched?.OriginDetails?.DetectionMethodId &&
                        errors?.OriginDetails?.DetectionMethodId
                      }
                      options={
                        masterData?.DetectionMethods &&
                        [...masterData.DetectionMethods].sort(
                          (a, b) => a.DisplayOrder - b.DisplayOrder
                        )
                      }
                      className={"sdr-status-edit"}
                      id="OriginDetails.DetectionMethodId"
                    />
                  ) : (
                    ""
                  )}
                </ListItem>
              </div>
            </Grid>
          </Grid>
        )}
        {!values?.OriginDetails?.IsScheduledInspection && (
          <Grid container>
            <Grid item xs={6} className="flex !flex-col gap-6">
              {/* Type */}
              <div>
                <ListItem>Type</ListItem>
                <ListItem>
                  {editable ? (
                    <SingleSelect
                      name="OriginDetails.UnscheduledInspectionTypeId"
                      value={values?.OriginDetails?.UnscheduledInspectionTypeId || ""}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={
                        !!touched?.OriginDetails?.UnscheduledInspectionTypeId &&
                        !!errors?.OriginDetails?.UnscheduledInspectionTypeId
                      }
                      helperText={
                        !!touched?.OriginDetails?.UnscheduledInspectionTypeId &&
                        errors?.OriginDetails?.UnscheduledInspectionTypeId
                      }
                      options={TypeOptions.sort((a, b) => a.DisplayOrder - b.DisplayOrder)}
                      className={"sdr-status-edit"}
                      id="OriginDetails.UnscheduledInspectionTypeId"
                    />
                  ) : (
                    ""
                  )}
                </ListItem>
              </div>
              {values?.OriginDetails?.UnscheduledInspectionTypeId === 3 && (
                <div>
                  <ListItem>Comments</ListItem>
                  <ListItem>
                    {editable ? (
                      <TextField
                        name="OriginDetails.UnscheduledInspectionTypeComments"
                        value={values?.OriginDetails?.UnscheduledInspectionTypeComments || ""}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={
                          !!touched?.OriginDetails?.UnscheduledInspectionTypeComments &&
                          !!errors?.OriginDetails?.UnscheduledInspectionTypeComments
                        }
                        helperText={
                          !!touched?.OriginDetails?.UnscheduledInspectionTypeComments &&
                          errors?.OriginDetails?.UnscheduledInspectionTypeComments
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
              {values?.OriginDetails?.UnscheduledInspectionTypeId === 5 && (
                <div>
                  <ListItem>Specify</ListItem>
                  <ListItem>
                    {editable ? (
                      <TextField
                        name="OriginDetails.UnscheduledInspectionTypeComments"
                        value={values?.OriginDetails?.UnscheduledInspectionTypeComments || ""}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={
                          !!touched?.OriginDetails?.UnscheduledInspectionTypeComments &&
                          !!errors?.OriginDetails?.UnscheduledInspectionTypeComments
                        }
                        helperText={
                          !!touched?.OriginDetails?.UnscheduledInspectionTypeComments &&
                          errors?.OriginDetails?.UnscheduledInspectionTypeComments
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
            <Grid item xs={6} className="flex !flex-col gap-6">
              {/* Detection Method */}
              <div>
                <ListItem>Detection Method</ListItem>
                <ListItem>
                  {editable ? (
                    <SingleSelect
                      name="OriginDetails.DetectionMethodId"
                      value={values?.OriginDetails?.DetectionMethodId || ""}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={
                        !!touched?.OriginDetails?.DetectionMethodId &&
                        !!errors?.OriginDetails?.DetectionMethodId
                      }
                      helperText={
                        !!touched?.OriginDetails?.DetectionMethodId &&
                        errors?.OriginDetails?.DetectionMethodId
                      }
                      options={
                        masterData?.DetectionMethods &&
                        [...masterData.DetectionMethods].sort(
                          (a, b) => a.DisplayOrder - b.DisplayOrder
                        )
                      }
                      className={"sdr-status-edit"}
                      id="OriginDetails.DetectionMethodId"
                    />
                  ) : (
                    ""
                  )}
                </ListItem>
              </div>

              {values?.OriginDetails?.DetectionMethodId === 9 && (
                <div>
                  <ListItem>Comments</ListItem>
                  <ListItem>
                    {editable ? (
                      <TextField
                        name="OriginDetails.DetectionMethodComments"
                        value={values?.OriginDetails?.DetectionMethodComments || ""}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={
                          !!touched?.OriginDetails?.DetectionMethodComments &&
                          !!errors?.OriginDetails?.DetectionMethodComments
                        }
                        helperText={
                          !!touched?.OriginDetails?.DetectionMethodComments &&
                          errors?.OriginDetails?.DetectionMethodComments
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
          </Grid>
        )}
      </TabPanel>
      {openSelectCtn && (
        <Modal
          name={`select-${selectedMFRSource}`}
          onClose={toggleSelect}
          open={true}
          className="max-h-[80%] !w-[60%]"
        >
          <Typography
            id={`select-${selectedMFRSource}-modal-title`}
            variant="h6"
            mb={2}
            fontWeight={600}
          >
            Select {selectedMFRSource}
          </Typography>
          <TextField
            name="searchDescription"
            value={values.searchDescription || ""}
            placeholder={`Search for ${selectedMFRSource}`}
            onChange={handleChange}
            onBlur={handleBlur}
            className="w-full !mb-4"
          />
          <InfoBox className="!w-full mb-4">{selectedMFRSource}s for B737</InfoBox>

          {!(ctnData && ctnData.FleetMasterResponse?.length > 0) ? (
            touched?.searchDescription ? (
              <WarningBox>no {selectedMFRSource} data found for the current fleet</WarningBox>
            ) : (
              <b className="ml-1">Search Description</b>
            )
          ) : (
            <DataGrid
              className="!h-[400px]"
              columns={[
                {
                  field: "Code",
                  headerName: `${selectedMFRSource} Number`,
                  sortable: false,
                  minWidth: 120,
                },
                {
                  field: "Description",
                  headerName: "Description",
                  sortable: false,
                  flex: 1,
                },
              ]}
              rows={ctnData!.FleetMasterResponse}
              disableColumnMenu
              disableRowSelectionOnClick
              onCellClick={(data: GridCellParams) => {
                setFieldValue("OriginDetails.MfrSourceIdentifier", data?.row?.Code);
                toggleSelect();
              }}
              getRowId={(row) => row.Code}
              getRowClassName={(params) =>
                params.indexRelativeToCurrentPage % 2 === 0 ? "Mui-even" : "Mui-odd"
              }
              hideFooter
              loading={loading}
            />
          )}
          <ButtonGroup
            className="justify-end mt-4"
            primaryLabel="Select"
            secondaryLabel="Cancel"
            primaryOnClick={() => handleGetData("19")}
            secondaryOnClick={toggleSelect}
          />
        </Modal>
      )}
    </>
  );
};