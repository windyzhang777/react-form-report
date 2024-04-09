import { Grid, Typography } from "@mui/material";
import { GridCellParams } from "@mui/x-data-grid";
import { useFormikContext } from "formik";
import { useState } from "react";
import { InfoBox, WarningBox } from "src/commons/Box";
import ButtonGroup from "src/commons/ButtonGroup";
import { ScrollableDataGrid as DataGrid } from "src/commons/DataGrid";
import ListItem from "src/commons/ListItem";
import Modal from "src/commons/Modal";
import Radio from "src/commons/Radio";
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
  const { errors, handleBlur, handleChange, setFieldValue, touched, values } =
    useFormikContext<ISaveSfrValues>();
  const [openSelectCtn, setOpenSelectCtn] = useState<boolean>(false);
  const [openSelectSid, setOpenSelectSid] = useState<boolean>(false);

  const toggleSelectCtn = () => {
    setOpenSelectCtn(!openSelectCtn);
  };
  const handleGetCtnData = (fleetCode: string) => {
    dispatch(getCtnData(fleetCode));
  };

  const toggleSelectSid = () => {
    setOpenSelectSid(!openSelectSid);
  };
  const handleGetSidData = (fleetCode: string) => {
    dispatch(getSidData(fleetCode));
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
              <Radio
                name="ScheduledInspection"
                value={values.ScheduledInspection || ""}
                onChange={(values) => {
                  setFieldValue("ScheduledInspection", values);
                }}
                error={!!touched.ScheduledInspection && !!errors.ScheduledInspection}
                helperText={!!touched.ScheduledInspection && errors.ScheduledInspection}
                options={["Yes", "No"]}
                className={"sdr-status-edit gap-5"}
              />
            ) : (
              ""
            )}
          </ListItem>
        </div>
        {values.ScheduledInspection === "Yes" && (
          <Grid container>
            <Grid item xs={6} className="flex !flex-col gap-6">
              {/* CAL Document */}
              <div>
                <ListItem>CAL Document</ListItem>
                <ListItem>
                  {editable ? (
                    <SingleSelect
                      name="CALDocument"
                      value={values.CALDocument || ""}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={!!touched.CALDocument && !!errors.CALDocument}
                      helperText={!!touched.CALDocument && errors.CALDocument}
                      options={
                        masterData?.CalDocuments &&
                        [...masterData.CalDocuments].sort((a, b) => a.DisplayOrder - b.DisplayOrder)
                      }
                      className={"sdr-status-edit"}
                      id="CALDocument"
                    />
                  ) : (
                    ""
                  )}
                </ListItem>
              </div>

              {values.CALDocument === 1 && (
                <div>
                  <ListItem>Work Card #</ListItem>
                  <ListItem>
                    {editable ? (
                      <TextFieldGroup
                        count={4}
                        name="WorkCard"
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
              {values.CALDocument === 2 && (
                <div>
                  <ListItem>EA #</ListItem>
                  <ListItem>
                    {editable ? (
                      <TextFieldGroup
                        count={2}
                        name="EA"
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
              {values.CALDocument === 3 && (
                <div>
                  <ListItem>FCD #</ListItem>
                  <ListItem>
                    {editable ? (
                      <TextFieldGroup
                        count={2}
                        name="FCD"
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
              {values.CALDocument === 4 && (
                <div>
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
                        className={"sdr-status-edit"}
                      />
                    ) : (
                      ""
                    )}
                  </ListItem>
                </div>
              )}
              {values.CALDocument === 5 && (
                <div>
                  <ListItem>Log Page #</ListItem>
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
                      />
                    ) : (
                      ""
                    )}
                  </ListItem>
                </div>
              )}

              {/* REV */}
              {(values.CALDocument === 2 || values.CALDocument === 3) && (
                <div>
                  <ListItem>Rev #</ListItem>
                  <ListItem>
                    {editable ? (
                      <TextField
                        name="REV"
                        value={values.REV || ""}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        // error={!!touched.REV && !!errors.REV}
                        // helperText={!!touched.REV && errors.REV}
                        className={"sdr-status-edit"}
                      />
                    ) : (
                      ""
                    )}
                  </ListItem>
                </div>
              )}

              {/* OP */}
              {values.CALDocument === 2 && (
                <div>
                  <ListItem>Op #</ListItem>
                  <ListItem>
                    {editable ? (
                      <TextField
                        name="OP"
                        value={values.OP || ""}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        // error={!!touched.OP && !!errors.OP}
                        // helperText={!!touched.OP && errors.OP}
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
                      name="Spec"
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
                      name="MFRSource"
                      value={values.MFRSource || ""}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={!!touched.MFRSource && !!errors.MFRSource}
                      helperText={!!touched.MFRSource && errors.MFRSource}
                      options={
                        masterData?.MfrSources &&
                        [...masterData.MfrSources].sort((a, b) => a.DisplayOrder - b.DisplayOrder)
                      }
                      className={"sdr-status-edit"}
                      id="MFRSource"
                    />
                  ) : (
                    ""
                  )}
                </ListItem>
              </div>

              {values.MFRSource === 1 && (
                <div>
                  <ListItem>CTN</ListItem>
                  <ListItem>
                    {editable ? (
                      <ClickableTextField
                        name="MFRSourceCTN"
                        value={values.MFRSourceCTN || ""}
                        onClick={toggleSelectCtn}
                        onBlur={handleBlur}
                        // error={!!touched.MFRSourceCTN && !!errors.MFRSourceCTN}
                        // helperText={!!touched.MFRSourceCTN && errors.MFRSourceCTN}
                        className={"sdr-status-edit"}
                      />
                    ) : (
                      ""
                    )}
                  </ListItem>
                </div>
              )}
              {values.MFRSource === 2 && (
                <div>
                  <ListItem>SSI</ListItem>
                  <ListItem>
                    {editable ? (
                      <TextField
                        name="MFRSourceSSI"
                        value={values.MFRSourceSSI || ""}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        // error={!!touched.MFRSourceSSI && !!errors.MFRSourceSSI}
                        // helperText={!!touched.MFRSourceSSI && errors.MFRSourceSSI}
                        className={"sdr-status-edit"}
                      />
                    ) : (
                      ""
                    )}
                  </ListItem>
                </div>
              )}
              {values.MFRSource === 3 && (
                <div>
                  <ListItem>SID</ListItem>
                  <ListItem>
                    {editable ? (
                      <ClickableTextField
                        name="MFRSourceSID"
                        value={values.MFRSourceSID || ""}
                        onClick={toggleSelectSid}
                        onBlur={handleBlur}
                        // error={!!touched.MFRSourceSID && !!errors.MFRSourceSID}
                        // helperText={!!touched.MFRSourceSID && errors.MFRSourceSID}
                        className={"sdr-status-edit"}
                      />
                    ) : (
                      ""
                    )}
                  </ListItem>
                </div>
              )}
              {values.MFRSource === 4 && (
                <div>
                  <ListItem>SSID</ListItem>
                  <ListItem>
                    {editable ? (
                      <TextField
                        name="MFRSourceSSID"
                        value={values.MFRSourceSSID || ""}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        // error={!!touched.MFRSourceSSID && !!errors.MFRSourceSSID}
                        // helperText={!!touched.MFRSourceSSID && errors.MFRSourceSSID}
                        className={"sdr-status-edit"}
                      />
                    ) : (
                      ""
                    )}
                  </ListItem>
                </div>
              )}
              {/* Comments */}
              {values.MFRSource === 4 && (
                <div>
                  <ListItem>Comments</ListItem>
                  <ListItem>
                    {editable ? (
                      <TextField
                        name="Comments"
                        value={values.Comments || ""}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        // error={!!touched.Comments && !!errors.Comments}
                        // helperText={!!touched.Comments && errors.Comments}
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
              {values.MFRSource === 5 && (
                <div>
                  <ListItem>Specify</ListItem>
                  <ListItem>
                    {editable ? (
                      <TextField
                        name="Specify"
                        value={values.Specify || ""}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        // error={!!touched.Specify && !!errors.Specify}
                        // helperText={!!touched.Specify && errors.Specify}
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
                      name="DetectionMethod"
                      value={values.DetectionMethod || ""}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={!!touched.DetectionMethod && !!errors.DetectionMethod}
                      helperText={!!touched.DetectionMethod && errors.DetectionMethod}
                      options={
                        masterData?.DetectionMethods &&
                        [...masterData.DetectionMethods].sort(
                          (a, b) => a.DisplayOrder - b.DisplayOrder
                        )
                      }
                      className={"sdr-status-edit"}
                      id="DetectionMethod"
                    />
                  ) : (
                    ""
                  )}
                </ListItem>
              </div>
            </Grid>
          </Grid>
        )}
        {values.ScheduledInspection === "No" && (
          <Grid container>
            <Grid item xs={6} className="flex !flex-col gap-6">
              {/* Type */}
              <div>
                <ListItem>Type</ListItem>
                <ListItem>
                  {editable ? (
                    <SingleSelect
                      name="Type"
                      value={values.Type || ""}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={!!touched.Type && !!errors.Type}
                      helperText={!!touched.Type && errors.Type}
                      options={TypeOptions.sort((a, b) => a.DisplayOrder - b.DisplayOrder)}
                      className={"sdr-status-edit"}
                      id="Type"
                    />
                  ) : (
                    ""
                  )}
                </ListItem>
              </div>
              {values.Type === 3 && (
                <div>
                  <ListItem>Comments</ListItem>
                  <ListItem>
                    {editable ? (
                      <TextField
                        name="Comments"
                        value={values.Comments || ""}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={!!touched.Comments && !!errors.Comments}
                        helperText={!!touched.Comments && errors.Comments}
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
              {values.Type === 5 && (
                <div>
                  <ListItem>Specify</ListItem>
                  <ListItem>
                    {editable ? (
                      <TextField
                        name="Specify"
                        value={values.Specify || ""}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={!!touched.Specify && !!errors.Specify}
                        helperText={!!touched.Specify && errors.Specify}
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
                      name="DetectionMethod"
                      value={values.DetectionMethod || ""}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={!!touched.DetectionMethod && !!errors.DetectionMethod}
                      helperText={!!touched.DetectionMethod && errors.DetectionMethod}
                      options={
                        masterData?.DetectionMethods &&
                        [...masterData.DetectionMethods].sort(
                          (a, b) => a.DisplayOrder - b.DisplayOrder
                        )
                      }
                      className={"sdr-status-edit"}
                      id="DetectionMethod"
                    />
                  ) : (
                    ""
                  )}
                </ListItem>
              </div>

              {values.DetectionMethod === 9 && (
                <div>
                  <ListItem>Comments</ListItem>
                  <ListItem>
                    {editable ? (
                      <TextField
                        name="OtherComments"
                        value={values.OtherComments || ""}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={!!touched.OtherComments && !!errors.OtherComments}
                        helperText={!!touched.OtherComments && errors.OtherComments}
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
          name="select-ctn"
          onClose={toggleSelectCtn}
          open={true}
          className="max-h-[80%] !w-[60%]"
        >
          <Typography id="select-ctn-modal-title" variant="h6" mb={2} fontWeight={600}>
            Select CTN
          </Typography>
          <TextField
            name="searchDescription"
            value={values.searchDescription || ""}
            placeholder="Search for CTN"
            onChange={handleChange}
            onBlur={handleBlur}
            className="w-full !mb-4"
          />
          <InfoBox className="!w-full mb-4">CTNs for B737</InfoBox>

          {!(ctnData && ctnData.FleetMasterResponse?.length > 0) ? (
            <WarningBox>no CTN data found for the current fleet</WarningBox>
          ) : (
            <DataGrid
              className="!h-[400px]"
              columns={[
                {
                  field: "Code",
                  headerName: "CTN Number",
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
                setFieldValue("MFRSourceCTN", data?.row?.Code);
                toggleSelectCtn();
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
            primaryOnClick={() => handleGetCtnData("19")}
            secondaryOnClick={toggleSelectCtn}
          />
        </Modal>
      )}
      {openSelectSid && (
        <Modal
          name="select-sid"
          onClose={toggleSelectSid}
          open={true}
          className="max-h-[80%] !w-[60%]"
        >
          <Typography id="select-sid-modal-title" variant="h6" mb={2} fontWeight={600}>
            Select SID
          </Typography>
          <TextField
            name="searchDescription"
            value={values.searchDescription || ""}
            placeholder="Search for SID"
            onChange={handleChange}
            onBlur={handleBlur}
            className="w-full !mb-4"
          />
          <InfoBox className="!w-full mb-4">SIDs for B737</InfoBox>

          {!(ctnData && ctnData.FleetMasterResponse?.length > 0) ? (
            <WarningBox>no SID data found for the current fleet</WarningBox>
          ) : (
            <DataGrid
              className="!h-[400px]"
              columns={[
                {
                  field: "Code",
                  headerName: "SID Number",
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
                setFieldValue("MFRSourceSID", data?.row?.Code);
                toggleSelectSid();
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
            primaryOnClick={() => handleGetSidData("19")}
            secondaryOnClick={toggleSelectSid}
          />
        </Modal>
      )}
    </>
  );
};
