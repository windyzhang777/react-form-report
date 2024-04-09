import { Grid } from "@mui/material";
import { useFormikContext } from "formik";
import { useEffect } from "react";
import ListItem from "src/commons/ListItem";
import { SingleSelect } from "src/commons/Select";
import TabPanel from "src/commons/TabPanel";
import TextField from "src/commons/TextField";
import {
  ISaveSfrValues,
  OtherOptions,
  RudderDamageProximityOptions,
  SdrEsfrRecordDetailsStateType,
  SelectedSfrTab,
  Sides,
  SpecificsOptions,
  StabDamageProximityOptions,
  SurfaceOptions,
  WingDamageProximityOptions,
  ZoneOptions,
} from "src/commons/types";
import { useAppSelector } from "src/redux/hooks";

type LocationTabProps = {
  editable: any;
  tabIndex: any;
};

export const LocationTab = ({ editable, tabIndex }: LocationTabProps) => {
  const { masterData }: SdrEsfrRecordDetailsStateType = useAppSelector(
    (state) => state.sdrEsfrRecordDetails
  );
  const { errors, handleBlur, handleChange, touched, values, setFieldValue } =
    useFormikContext<ISaveSfrValues>();

  useEffect(() => {
    setFieldValue("DamageProximity", 0);
  }, [values.DefectLocation]);

  return (
    <>
      <TabPanel
        value={tabIndex}
        index={SelectedSfrTab.Location}
        className="sdr-status-grid overflow-y-auto"
      >
        <Grid container>
          <Grid item xs={6} className="flex !flex-col gap-2">
            <>
              <ListItem>Zone</ListItem>
              <ListItem>
                {editable ? (
                  <SingleSelect
                    name="Zone"
                    value={values.Zone || ""}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={!!touched.Zone && !!errors.Zone}
                    helperText={!!touched.Zone && errors.Zone}
                    options={ZoneOptions.sort((a, b) => a.DisplayOrder - b.DisplayOrder)}
                    className={"sdr-status-edit"}
                    id="Zone"
                  />
                ) : (
                  ""
                )}
              </ListItem>
            </>
            <>
              <ListItem>Location Details</ListItem>
              <ListItem>
                {editable ? (
                  <TextField
                    name="LocationDetails"
                    value={values.LocationDetails || ""}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={!!touched.LocationDetails && !!errors.LocationDetails}
                    helperText={!!touched.LocationDetails && errors.LocationDetails}
                    multiline
                    maxRows={4}
                    className={"sdr-status-edit textareaAutosize"}
                    inputProps={{ style: { resize: "both" } }}
                  />
                ) : (
                  ""
                )}
              </ListItem>
            </>
          </Grid>

          <Grid item xs={6} className="flex !flex-col gap-2">
            {/* Defect Location */}
            <>
              <ListItem>Select Defect Location</ListItem>
              <ListItem>
                {editable ? (
                  <SingleSelect
                    name="DefectLocation"
                    value={values.DefectLocation || ""}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={!!touched.DefectLocation && !!errors.DefectLocation}
                    helperText={!!touched.DefectLocation && errors.DefectLocation}
                    options={
                      masterData?.DefectLocations &&
                      [...masterData.DefectLocations].sort(
                        (a, b) => a.DisplayOrder - b.DisplayOrder
                      )
                    }
                    className={"sdr-status-edit"}
                    id="DefectLocation"
                  />
                ) : (
                  ""
                )}
              </ListItem>
            </>

            {/* Side */}
            {(values.DefectLocation === 1 ||
              values.DefectLocation === 2 ||
              values.DefectLocation === 6 ||
              values.DefectLocation === 7 ||
              values.DefectLocation === 9 ||
              values.DefectLocation === 12 ||
              values.DefectLocation === 13 ||
              values.DefectLocation === 17 ||
              values.DefectLocation === 19) && (
              <>
                <ListItem>Side</ListItem>
                <ListItem>
                  {editable ? (
                    <SingleSelect
                      name="AileronSide"
                      value={values.AileronSide || ""}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={!!touched.AileronSide && !!errors.AileronSide}
                      helperText={!!touched.AileronSide && errors.AileronSide}
                      options={Sides.sort((a, b) => a.DisplayOrder - b.DisplayOrder)}
                      className={"sdr-status-edit"}
                      id="AileronSide"
                    />
                  ) : (
                    ""
                  )}
                </ListItem>
              </>
            )}

            {/* Surface */}
            {(values.DefectLocation === 1 ||
              values.DefectLocation === 2 ||
              values.DefectLocation === 6 ||
              values.DefectLocation === 7 ||
              values.DefectLocation === 9 ||
              values.DefectLocation === 11 ||
              values.DefectLocation === 21 ||
              values.DefectLocation === 14 ||
              values.DefectLocation === 15 ||
              values.DefectLocation === 16 ||
              values.DefectLocation === 17 ||
              values.DefectLocation === 18 ||
              values.DefectLocation === 19) && (
              <>
                <ListItem>Surface</ListItem>
                <ListItem>
                  {editable ? (
                    <SingleSelect
                      name="AileronSurface"
                      value={values.AileronSurface || ""}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={!!touched.AileronSurface && !!errors.AileronSurface}
                      helperText={!!touched.AileronSurface && errors.AileronSurface}
                      options={SurfaceOptions.sort((a, b) => a.DisplayOrder - b.DisplayOrder)}
                      className={"sdr-status-edit"}
                      id="AileronSurface"
                    />
                  ) : (
                    ""
                  )}
                </ListItem>
              </>
            )}

            {/* STA */}
            {(values.DefectLocation === 4 ||
              values.DefectLocation === 5 ||
              values.DefectLocation === 6 ||
              values.DefectLocation === 8 ||
              values.DefectLocation === 9 ||
              values.DefectLocation === 21 ||
              values.DefectLocation === 18 ||
              values.DefectLocation === 19) && (
              <>
                <>
                  <ListItem>From STA</ListItem>
                  <ListItem>
                    {editable ? (
                      <TextField
                        name="SfrAdditionalDetails?.FuselageFromSta"
                        value={values?.SfrAdditionalDetails?.FuselageFromSta || ""}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={
                          !!touched?.SfrAdditionalDetails?.FuselageFromSta &&
                          !!errors?.SfrAdditionalDetails?.FuselageFromSta
                        }
                        helperText={
                          !!touched?.SfrAdditionalDetails?.FuselageFromSta &&
                          errors?.SfrAdditionalDetails?.FuselageFromSta
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
                </>
                <>
                  <ListItem>To STA</ListItem>
                  <ListItem>
                    {editable ? (
                      <TextField
                        name="SfrAdditionalDetails.FuselageToSta"
                        value={values?.SfrAdditionalDetails?.FuselageToSta || ""}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={
                          !!touched?.SfrAdditionalDetails?.FuselageToSta &&
                          !!errors?.SfrAdditionalDetails?.FuselageToSta
                        }
                        helperText={
                          !!touched?.SfrAdditionalDetails?.FuselageToSta &&
                          errors?.SfrAdditionalDetails?.FuselageToSta
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
                </>
              </>
            )}

            {/* BL */}
            {(values.DefectLocation === 4 || values.DefectLocation === 5) && (
              <>
                <>
                  <ListItem>From BL</ListItem>
                  <ListItem>
                    {editable ? (
                      <SingleSelect
                        name="FromBL"
                        value={values.FromBL || ""}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={!!touched.FromBL && !!errors.FromBL}
                        helperText={!!touched.FromBL && errors.FromBL}
                        options={
                          masterData?.DiscrepancyParts &&
                          [...masterData.DiscrepancyParts].sort(
                            (a, b) => a.DisplayOrder - b.DisplayOrder
                          )
                        }
                        className={"sdr-status-edit"}
                        id="FromBL"
                      />
                    ) : (
                      ""
                    )}
                  </ListItem>
                  <ListItem>
                    {editable ? (
                      <TextField
                        name="FuselageFromSta"
                        value={values.FromBLText || ""}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={!!touched.FromBLText && !!errors.FromBLText}
                        helperText={!!touched.FromBLText && errors.FromBLText}
                        multiline
                        maxRows={4}
                        className={"sdr-status-edit textareaAutosize"}
                        inputProps={{ style: { resize: "both" } }}
                      />
                    ) : (
                      ""
                    )}
                  </ListItem>
                </>
                <>
                  <ListItem>To BL</ListItem>
                  <ListItem>
                    {editable ? (
                      <SingleSelect
                        name="ToBL"
                        value={values.ToBL || ""}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={!!touched.ToBL && !!errors.ToBL}
                        helperText={!!touched.ToBL && errors.ToBL}
                        options={
                          masterData?.DiscrepancyParts &&
                          [...masterData.DiscrepancyParts].sort(
                            (a, b) => a.DisplayOrder - b.DisplayOrder
                          )
                        }
                        className={"sdr-status-edit"}
                        id="ToBL"
                      />
                    ) : (
                      ""
                    )}
                  </ListItem>
                  <ListItem>
                    {editable ? (
                      <TextField
                        name="FuselageToSta"
                        value={values.ToBLText || ""}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={!!touched.ToBLText && !!errors.ToBLText}
                        helperText={!!touched.ToBLText && errors.ToBLText}
                        multiline
                        maxRows={4}
                        className={"sdr-status-edit textareaAutosize"}
                        inputProps={{ style: { resize: "both" } }}
                      />
                    ) : (
                      ""
                    )}
                  </ListItem>
                </>
              </>
            )}

            {/* Type */}
            {(values.DefectLocation === 9 ||
              values.DefectLocation === 21 ||
              values.DefectLocation === 18 ||
              values.DefectLocation === 19) && (
              <>
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
                      options={ZoneOptions.sort((a, b) => a.DisplayOrder - b.DisplayOrder)}
                      className={"sdr-status-edit"}
                      id="Type"
                    />
                  ) : (
                    ""
                  )}
                </ListItem>
              </>
            )}

            {/* DamageProximity Rudder */}
            {(values.DefectLocation === 6 || values.DefectLocation === 21) && (
              <>
                <ListItem>Damage in Proximity of or at</ListItem>
                <ListItem>
                  {editable ? (
                    <SingleSelect
                      name="DamageProximity"
                      value={values.DamageProximity || ""}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={!!touched.DamageProximity && !!errors.DamageProximity}
                      helperText={!!touched.DamageProximity && errors.DamageProximity}
                      options={RudderDamageProximityOptions.sort(
                        (a, b) => a.DisplayOrder - b.DisplayOrder
                      )}
                      className={"sdr-status-edit"}
                      id="DamageProximity"
                    />
                  ) : (
                    ""
                  )}
                </ListItem>
              </>
            )}

            {/* DamageProximity Stab */}
            {(values.DefectLocation === 9 || values.DefectLocation === 18) && (
              <>
                <ListItem>Damage in Proximity of or at</ListItem>
                <ListItem>
                  {editable ? (
                    <SingleSelect
                      name="DamageProximity"
                      value={values.DamageProximity || ""}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={!!touched.DamageProximity && !!errors.DamageProximity}
                      helperText={!!touched.DamageProximity && errors.DamageProximity}
                      options={StabDamageProximityOptions.sort(
                        (a, b) => a.DisplayOrder - b.DisplayOrder
                      )}
                      className={"sdr-status-edit"}
                      id="DamageProximity"
                    />
                  ) : (
                    ""
                  )}
                </ListItem>
              </>
            )}

            {/* DamageProximity Wing */}
            {values.DefectLocation === 19 && (
              <>
                <ListItem>Damage in Proximity of or at</ListItem>
                <ListItem>
                  {editable ? (
                    <SingleSelect
                      name="DamageProximity"
                      value={values.DamageProximity || ""}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={!!touched.DamageProximity && !!errors.DamageProximity}
                      helperText={!!touched.DamageProximity && errors.DamageProximity}
                      options={WingDamageProximityOptions.sort(
                        (a, b) => a.DisplayOrder - b.DisplayOrder
                      )}
                      className={"sdr-status-edit"}
                      id="DamageProximity"
                    />
                  ) : (
                    ""
                  )}
                </ListItem>
              </>
            )}

            {/* STR */}
            {values.DefectLocation === 8 && (
              <>
                <>
                  <ListItem>From STR/Long</ListItem>
                  <ListItem>
                    {editable ? (
                      <SingleSelect
                        name="SfrAdditionalDetails.StringerFrom"
                        value={values?.SfrAdditionalDetails?.StringerFrom || ""}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={
                          !!touched?.SfrAdditionalDetails?.StringerFrom &&
                          !!errors?.SfrAdditionalDetails?.StringerFrom
                        }
                        helperText={
                          !!touched?.SfrAdditionalDetails?.StringerFrom &&
                          errors?.SfrAdditionalDetails?.StringerFrom
                        }
                        options={ZoneOptions.sort((a, b) => a.DisplayOrder - b.DisplayOrder)}
                        className={"sdr-status-edit"}
                        id="SfrAdditionalDetails.StringerFrom"
                      />
                    ) : (
                      ""
                    )}
                  </ListItem>
                  <ListItem>
                    {editable ? (
                      <SingleSelect
                        name="SfrAdditionalDetails.StringerFromSide
"
                        value={values?.SfrAdditionalDetails?.StringerFromSide || ""}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={
                          !!touched?.SfrAdditionalDetails?.StringerFromSide &&
                          !!errors?.SfrAdditionalDetails?.StringerFromSide
                        }
                        helperText={
                          !!touched?.SfrAdditionalDetails?.StringerFromSide &&
                          errors?.SfrAdditionalDetails?.StringerFromSide
                        }
                        options={Sides.sort((a, b) => a.DisplayOrder - b.DisplayOrder)}
                        className={"sdr-status-edit"}
                        id="SfrAdditionalDetails.StringerFromSide
"
                      />
                    ) : (
                      ""
                    )}
                  </ListItem>
                </>
                <>
                  <ListItem>To STR/Long</ListItem>
                  <ListItem>
                    {editable ? (
                      <SingleSelect
                        name="SfrAdditionalDetails.StringerTo"
                        value={values?.SfrAdditionalDetails?.StringerTo || ""}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={
                          !!touched?.SfrAdditionalDetails?.StringerTo &&
                          !!errors?.SfrAdditionalDetails?.StringerTo
                        }
                        helperText={
                          !!touched?.SfrAdditionalDetails?.StringerTo &&
                          errors?.SfrAdditionalDetails?.StringerTo
                        }
                        options={ZoneOptions.sort((a, b) => a.DisplayOrder - b.DisplayOrder)}
                        className={"sdr-status-edit"}
                        id="SfrAdditionalDetails.StringerTo"
                      />
                    ) : (
                      ""
                    )}
                  </ListItem>
                  <ListItem>
                    {editable ? (
                      <SingleSelect
                        name="SfrAdditionalDetails.StringerToSide"
                        value={values?.SfrAdditionalDetails?.StringerToSide || ""}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={
                          !!touched?.SfrAdditionalDetails?.StringerToSide &&
                          !!errors?.SfrAdditionalDetails?.StringerToSide
                        }
                        helperText={
                          !!touched?.SfrAdditionalDetails?.StringerToSide &&
                          errors?.SfrAdditionalDetails?.StringerToSide
                        }
                        options={Sides.sort((a, b) => a.DisplayOrder - b.DisplayOrder)}
                        className={"sdr-status-edit"}
                        id="SfrAdditionalDetails.StringerToSide
"
                      />
                    ) : (
                      ""
                    )}
                  </ListItem>
                </>
              </>
            )}

            {/* Elevator, Fuselage */}
            {values.DefectLocation === 8 && (
              <>
                <>
                  <ListItem>Elevator Tab</ListItem>
                  <ListItem>
                    {editable ? (
                      <SingleSelect
                        name="ElevatorTab"
                        value={values.ElevatorTab || ""}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={!!touched.ElevatorTab && !!errors.ElevatorTab}
                        helperText={!!touched.ElevatorTab && errors.ElevatorTab}
                        options={Sides.sort((a, b) => a.DisplayOrder - b.DisplayOrder)}
                        className={"sdr-status-edit"}
                        id="ElevatorTab"
                      />
                    ) : (
                      ""
                    )}
                  </ListItem>
                </>
                <>
                  <ListItem>Fuselage</ListItem>
                  <ListItem>
                    {editable ? (
                      <SingleSelect
                        name="Fuselage"
                        value={values.Fuselage || ""}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={!!touched.Fuselage && !!errors.Fuselage}
                        helperText={!!touched.Fuselage && errors.Fuselage}
                        options={Sides.sort((a, b) => a.DisplayOrder - b.DisplayOrder)}
                        className={"sdr-status-edit"}
                        id="Fuselage"
                      />
                    ) : (
                      ""
                    )}
                  </ListItem>
                </>
              </>
            )}

            {/* LE Flap */}
            {values.DefectLocation === 11 && (
              <>
                <ListItem>LE Flap #</ListItem>
                <ListItem>
                  {editable ? (
                    <SingleSelect
                      name="LEFlap"
                      value={values.LEFlap || ""}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={!!touched.LEFlap && !!errors.LEFlap}
                      helperText={!!touched.LEFlap && errors.LEFlap}
                      options={ZoneOptions.sort((a, b) => a.DisplayOrder - b.DisplayOrder)}
                      className={"sdr-status-edit"}
                      id="LEFlap"
                    />
                  ) : (
                    ""
                  )}
                </ListItem>
              </>
            )}

            {/* TE Flap */}
            {values.DefectLocation === 17 && (
              <>
                <ListItem>TE Flap #</ListItem>
                <ListItem>
                  {editable ? (
                    <SingleSelect
                      name="TEFlap"
                      value={values.TEFlap || ""}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={!!touched.TEFlap && !!errors.TEFlap}
                      helperText={!!touched.TEFlap && errors.TEFlap}
                      options={ZoneOptions.sort((a, b) => a.DisplayOrder - b.DisplayOrder)}
                      className={"sdr-status-edit"}
                      id="TEFlap"
                    />
                  ) : (
                    ""
                  )}
                </ListItem>
              </>
            )}

            {/* Slat */}
            {values.DefectLocation === 15 && (
              <>
                <ListItem>Slat #</ListItem>
                <ListItem>
                  {editable ? (
                    <SingleSelect
                      name="Slat"
                      value={values.Slat || ""}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={!!touched.Slat && !!errors.Slat}
                      helperText={!!touched.Slat && errors.Slat}
                      options={ZoneOptions.sort((a, b) => a.DisplayOrder - b.DisplayOrder)}
                      className={"sdr-status-edit"}
                      id="Slat"
                    />
                  ) : (
                    ""
                  )}
                </ListItem>
              </>
            )}

            {/* Spoiler */}
            {values.DefectLocation === 16 && (
              <>
                <ListItem>Spoiler #</ListItem>
                <ListItem>
                  {editable ? (
                    <SingleSelect
                      name="Spoiler"
                      value={values.Spoiler || ""}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={!!touched.Spoiler && !!errors.Spoiler}
                      helperText={!!touched.Spoiler && errors.Spoiler}
                      options={ZoneOptions.sort((a, b) => a.DisplayOrder - b.DisplayOrder)}
                      className={"sdr-status-edit"}
                      id="Spoiler"
                    />
                  ) : (
                    ""
                  )}
                </ListItem>
              </>
            )}

            {/* Specifics */}
            {values.DefectLocation === 17 && (
              <>
                <ListItem>Specifics #</ListItem>
                <ListItem>
                  {editable ? (
                    <SingleSelect
                      name="Specifics"
                      value={values.Specifics || ""}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={!!touched.Specifics && !!errors.Specifics}
                      helperText={!!touched.Specifics && errors.Specifics}
                      options={SpecificsOptions.sort((a, b) => a.DisplayOrder - b.DisplayOrder)}
                      className={"sdr-status-edit"}
                      id="Specifics"
                    />
                  ) : (
                    ""
                  )}
                </ListItem>
              </>
            )}

            {/* Other */}
            {values.DefectLocation === 17 && (
              <>
                <ListItem>Other</ListItem>
                <ListItem>
                  {editable ? (
                    <SingleSelect
                      name="TEFlapOther"
                      value={values.TEFlapOther || ""}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={!!touched.TEFlapOther && !!errors.TEFlapOther}
                      helperText={!!touched.TEFlapOther && errors.TEFlapOther}
                      options={OtherOptions.sort((a, b) => a.DisplayOrder - b.DisplayOrder)}
                      className={"sdr-status-edit"}
                      id="TEFlapOther"
                    />
                  ) : (
                    ""
                  )}
                </ListItem>
              </>
            )}

            {/* Location Details */}
            {values.DefectLocation === 17 && (
              <>
                <ListItem>Additional Location Details</ListItem>
                <ListItem>
                  {editable ? (
                    <TextField
                      name="LocationDetails"
                      value={values.LocationDetails || ""}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={!!touched.LocationDetails && !!errors.LocationDetails}
                      helperText={!!touched.LocationDetails && errors.LocationDetails}
                      multiline
                      maxRows={4}
                      className={"sdr-status-edit textareaAutosize"}
                      inputProps={{ style: { resize: "both" } }}
                    />
                  ) : (
                    ""
                  )}
                </ListItem>
              </>
            )}

            {/* Specify Location Details */}
            {values.DefectLocation === 20 && (
              <>
                <ListItem>Specify Defect Location</ListItem>
                <ListItem>
                  {editable ? (
                    <TextField
                      name="SpecifyDefectLocation"
                      value={values.SpecifyDefectLocation || ""}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={!!touched.SpecifyDefectLocation && !!errors.SpecifyDefectLocation}
                      helperText={!!touched.SpecifyDefectLocation && errors.SpecifyDefectLocation}
                      multiline
                      maxRows={4}
                      className={"sdr-status-edit textareaAutosize"}
                      inputProps={{ style: { resize: "both" } }}
                    />
                  ) : (
                    ""
                  )}
                </ListItem>
              </>
            )}

            {/* STR Text */}
            {values.DefectLocation === 19 &&
              (values.DamageProximity === 4 || values.DamageProximity === 5) && (
                <>
                  <>
                    <ListItem>From STR</ListItem>
                    <ListItem>
                      {editable ? (
                        <TextField
                          name="FromSTR"
                          value={values?.FromSTR || ""}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={!!touched?.FromSTR && !!errors?.FromSTR}
                          helperText={!!touched?.FromSTR && errors?.FromSTR}
                          multiline
                          maxRows={4}
                          className={"sdr-status-edit textareaAutosize"}
                          inputProps={{ style: { resize: "both" } }}
                        />
                      ) : (
                        ""
                      )}
                    </ListItem>
                  </>
                  <>
                    <ListItem>To STR</ListItem>
                    <ListItem>
                      {editable ? (
                        <TextField
                          name="ToSTR"
                          value={values?.ToSTR || ""}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={!!touched?.ToSTR && !!errors?.ToSTR}
                          helperText={!!touched?.ToSTR && errors?.ToSTR}
                          multiline
                          maxRows={4}
                          className={"sdr-status-edit textareaAutosize"}
                          inputProps={{ style: { resize: "both" } }}
                        />
                      ) : (
                        ""
                      )}
                    </ListItem>
                  </>
                </>
              )}
          </Grid>
        </Grid>
      </TabPanel>
    </>
  );
};
