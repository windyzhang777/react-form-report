import { Button, Grid, Typography } from "@mui/material";
import { GridCellParams } from "@mui/x-data-grid";
import { useFormikContext } from "formik";
import { useEffect, useMemo, useRef, useState } from "react";
import { FlexRow, InfoBox, WarningBox } from "src/commons/Box";
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
import { useFormCreateSfrData } from "src/components/createsfr/useFormCreateSfrData";
import { handleFocus, handleScroll } from "src/helpers";
import {
  getCtnData,
  getSidData,
  resetCtnDataSuccess,
} from "src/redux/ducks/getSdrEsfrRecordDetails";
import { useAppDispatch, useAppSelector } from "src/redux/hooks";

type OriginTabProps = {
  editable: boolean;
  tabIndex: number;
  handleFetchLogpageData: (a: string) => void;
};

export const OriginTab = ({ editable, tabIndex, handleFetchLogpageData }: OriginTabProps) => {
  const dispatch = useAppDispatch();
  const logPageNumberRef = useRef<HTMLInputElement>(null);
  const { masterData, ctnData }: SdrEsfrRecordDetailsStateType = useAppSelector(
    (state) => state.sdrEsfrRecordDetails
  );
  const { errors, handleBlur, handleChange, setFieldValue, touched } =
    useFormikContext<ISaveSfrValues>();
  const { values } = useFormCreateSfrData();
  const [openSelectCtn, setOpenSelect] = useState<boolean>(false);
  const selectedMFRSource = useMemo(
    () =>
      masterData?.MfrSources?.find((m) => m.Id === values?.OriginDetails?.MfrSourceId)
        ?.Description || "CTN",
    [values?.OriginDetails?.MfrSourceId]
  );

  const toggleSelect = () => {
    dispatch(resetCtnDataSuccess());
    setOpenSelect(!openSelectCtn);
  };

  const handleGetData = () => {
    switch (values?.OriginDetails?.MfrSourceId) {
      case 1:
        dispatch(getCtnData(values.FleetCode));
        break;
      case 2:
      case 3:
        dispatch(getSidData(values.FleetCode));
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    handleScroll(logPageNumberRef);
    handleFocus(logPageNumberRef);
  }, [logPageNumberRef]);

  return (
    <>
      <TabPanel
        value={tabIndex}
        index={SelectedSfrTab.Origin}
        className="sdr-status-grid overflow-y-auto"
      >
        <Grid container className="!mb-[30px]">
          <Grid item xs={6} className="relative">
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
          </Grid>
          <Grid item xs={6} className="flex !flex-col justify-end">
            <FlexRow>
              <ListItem required>Log Page Number</ListItem>
              <Button
                disabled={!values.LogPageNumber}
                onClick={() => handleFetchLogpageData(values.LogPageNumber)}
                sx={{ marginRight: "16px", minWidth: "4rem !important" }}
              >
                Fetch
              </Button>
            </FlexRow>
            <ListItem>
              {editable ? (
                <TextField
                  name="LogPageNumber"
                  value={values.LogPageNumber || ""}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={!!touched.LogPageNumber && !!errors.LogPageNumber}
                  helperText={!!touched.LogPageNumber && errors.LogPageNumber}
                  className={"sdr-status-edit"}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleFetchLogpageData(values.LogPageNumber);
                    }
                  }}
                  inputProps={{ maxLength: 7, ref: logPageNumberRef }}
                  placeholder="xxxxxxx"
                />
              ) : (
                ""
              )}
            </ListItem>
          </Grid>
        </Grid>
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
                      value={values?.OriginDetails?.CalDocId}
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
                      id="OriginDetails.CalDocId"
                    />
                  ) : (
                    ""
                  )}
                </ListItem>
              </div>

              {values?.OriginDetails?.CalDocId === 1 && (
                <div>
                  <ListItem required={!!values?.OriginDetails?.CalDocId}>Work Card #</ListItem>
                  <ListItem>
                    {editable ? (
                      <TextFieldGroup
                        count={4}
                        disables={[false, false, true, false]}
                        maxAllowed={[2, 4, 1, 4]}
                        name="CalDocIdentifier"
                        path="OriginDetails.CalDocIdentifier"
                        values={values}
                        onChange={handleChange}
                        touched={touched}
                        errors={errors}
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
                        path="OriginDetails.CalDocIdentifier"
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
                        path="OriginDetails.CalDocIdentifier"
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
                        inputProps={{ maxLength: 7 }}
                        placeholder="xxxxxxx"
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
                        inputProps={{ maxLength: 7 }}
                        placeholder="xxxxxxx"
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
                        inputProps={{ maxLength: 1 }}
                        placeholder="x"
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
                        inputProps={{ maxLength: 1 }}
                        placeholder="x"
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
                      path="OriginDetails.SpecIdentifier"
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
                      value={values?.OriginDetails?.MfrSourceId}
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
                      id="OriginDetails.MfrSourceId"
                    />
                  ) : (
                    ""
                  )}
                </ListItem>
              </div>

              {values?.OriginDetails?.MfrSourceId === 1 && (
                <div>
                  <ListItem required>CTN</ListItem>
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
                  <ListItem required>SSI</ListItem>
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
                        inputProps={{ maxLength: 9 }}
                        placeholder="xxxxxxxxx"
                      />
                    ) : (
                      ""
                    )}
                  </ListItem>
                </div>
              )}
              {values?.OriginDetails?.MfrSourceId === 3 && (
                <div>
                  <ListItem required>SID</ListItem>
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
                  <ListItem required>SSID</ListItem>
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
                        inputProps={{ maxLength: 12 }}
                        placeholder="xxxxxxxxxxxx"
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
                        inputProps={{ maxLength: 200, style: { resize: "both" } }}
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

              {/* Detection Method */}
              <div className="mb-[5px]">
                <ListItem required>Detection Method</ListItem>
                <ListItem>
                  {editable ? (
                    <SingleSelect
                      name="OriginDetails.DetectionMethodId"
                      value={values?.OriginDetails?.DetectionMethodId}
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
                      id="OriginDetails.DetectionMethodId"
                    />
                  ) : (
                    ""
                  )}
                </ListItem>
              </div>

              {/* Other */}
              {values?.OriginDetails?.DetectionMethodId === 9 && (
                <div>
                  <ListItem required>Other</ListItem>
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
                        inputProps={{ maxLength: 100, style: { resize: "both" } }}
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
                      value={values?.OriginDetails?.UnscheduledInspectionTypeId}
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
                        inputProps={{ maxLength: 250, style: { resize: "both" } }}
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
                        inputProps={{ maxLength: 100, style: { resize: "both" } }}
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
                      value={values?.OriginDetails?.DetectionMethodId}
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
                        inputProps={{ maxLength: 100, style: { resize: "both" } }}
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
            />
          )}
          <ButtonGroup
            className="justify-end mt-4"
            primaryLabel="Select"
            secondaryLabel="Cancel"
            primaryOnClick={handleGetData}
            secondaryOnClick={toggleSelect}
          />
        </Modal>
      )}
    </>
  );
};
