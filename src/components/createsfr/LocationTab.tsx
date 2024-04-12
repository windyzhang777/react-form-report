import { Grid } from "@mui/material";
import { useFormikContext } from "formik";
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
import { useFormCreateSfrData } from "./useFormCreateSfrData";

type LocationTabProps = {
  editable: boolean;
  tabIndex: number;
};

export const LocationTab = ({ editable, tabIndex }: LocationTabProps) => {
  const { masterData, logpageData }: SdrEsfrRecordDetailsStateType = useAppSelector(
    (state) => state.sdrEsfrRecordDetails
  );
  const { errors, handleBlur, handleChange, touched } = useFormikContext<ISaveSfrValues>();
  const { values } = useFormCreateSfrData();

  return (
    <>
      <TabPanel
        value={tabIndex}
        index={SelectedSfrTab.Location}
        className="sdr-status-grid overflow-y-auto"
      >
        <Grid container>
          <Grid item xs={6} className="flex !flex-col gap-4">
            <div>
              <ListItem required>Zone</ListItem>
              <ListItem>
                {editable ? (
                  <SingleSelect
                    name="LocationDetails.ZoneId"
                    value={values?.LocationDetails?.ZoneId || ""}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={!!touched?.LocationDetails?.ZoneId && !!errors?.LocationDetails?.ZoneId}
                    helperText={
                      !!touched?.LocationDetails?.ZoneId && errors?.LocationDetails?.ZoneId
                    }
                    options={
                      logpageData?.MasterData?.Zones &&
                      [...logpageData.MasterData.Zones].sort(
                        (a, b) => a.DisplayOrder - b.DisplayOrder
                      )
                    }
                    className={"sdr-status-edit"}
                    id="LocationDetails.ZoneId"
                  />
                ) : (
                  ""
                )}
              </ListItem>
            </div>
            <div>
              <ListItem>Location Details</ListItem>
              <ListItem>
                {editable ? (
                  <TextField
                    name="LocationDetails.CoordinateLocationDetails"
                    value={values?.LocationDetails?.CoordinateLocationDetails || ""}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={
                      !!touched?.LocationDetails?.CoordinateLocationDetails &&
                      !!errors?.LocationDetails?.CoordinateLocationDetails
                    }
                    helperText={
                      !!touched?.LocationDetails?.CoordinateLocationDetails &&
                      errors?.LocationDetails?.CoordinateLocationDetails
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
          </Grid>

          <Grid item xs={6} className="flex !flex-col gap-4">
            {/* Defect Location */}
            <div>
              <ListItem required>Select Defect Location</ListItem>
              <ListItem>
                {editable ? (
                  <SingleSelect
                    name="LocationDetails.DefectLocationId"
                    value={values?.LocationDetails?.DefectLocationId || ""}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={
                      !!touched?.LocationDetails?.DefectLocationId &&
                      !!errors?.LocationDetails?.DefectLocationId
                    }
                    helperText={
                      !!touched?.LocationDetails?.DefectLocationId &&
                      errors?.LocationDetails?.DefectLocationId
                    }
                    options={
                      masterData?.DefectLocations &&
                      [...masterData.DefectLocations].sort(
                        (a, b) => a.DisplayOrder - b.DisplayOrder
                      )
                    }
                    className={"sdr-status-edit"}
                    id="LocationDetails.DefectLocationId"
                  />
                ) : (
                  ""
                )}
              </ListItem>
            </div>

            {/* Side */}
            {(values?.LocationDetails?.DefectLocationId === 1 ||
              values?.LocationDetails?.DefectLocationId === 2 ||
              values?.LocationDetails?.DefectLocationId === 6 ||
              values?.LocationDetails?.DefectLocationId === 7 ||
              values?.LocationDetails?.DefectLocationId === 9 ||
              values?.LocationDetails?.DefectLocationId === 12 ||
              values?.LocationDetails?.DefectLocationId === 13 ||
              values?.LocationDetails?.DefectLocationId === 17 ||
              values?.LocationDetails?.DefectLocationId === 19) && (
              <div>
                <ListItem>Side</ListItem>
                <ListItem>
                  {editable ? (
                    <SingleSelect
                      name="LocationDetails.Side"
                      value={values?.LocationDetails?.Side || ""}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={!!touched?.LocationDetails?.Side && !!errors?.LocationDetails?.Side}
                      helperText={!!touched?.LocationDetails?.Side && errors?.LocationDetails?.Side}
                      options={Sides.sort((a, b) => a.DisplayOrder - b.DisplayOrder)}
                      className={"sdr-status-edit"}
                      id="LocationDetails.Side"
                    />
                  ) : (
                    ""
                  )}
                </ListItem>
              </div>
            )}

            {/* Surface */}
            {(values?.LocationDetails?.DefectLocationId === 1 ||
              values?.LocationDetails?.DefectLocationId === 2 ||
              values?.LocationDetails?.DefectLocationId === 6 ||
              values?.LocationDetails?.DefectLocationId === 7 ||
              values?.LocationDetails?.DefectLocationId === 9 ||
              values?.LocationDetails?.DefectLocationId === 11 ||
              values?.LocationDetails?.DefectLocationId === 21 ||
              values?.LocationDetails?.DefectLocationId === 14 ||
              values?.LocationDetails?.DefectLocationId === 15 ||
              values?.LocationDetails?.DefectLocationId === 16 ||
              values?.LocationDetails?.DefectLocationId === 17 ||
              values?.LocationDetails?.DefectLocationId === 18 ||
              values?.LocationDetails?.DefectLocationId === 19) && (
              <div>
                <ListItem>Surface</ListItem>
                <ListItem>
                  {editable ? (
                    <SingleSelect
                      name="LocationDetails.Surface"
                      value={values?.LocationDetails?.Surface || ""}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={
                        !!touched?.LocationDetails?.Surface && !!errors?.LocationDetails?.Surface
                      }
                      helperText={
                        !!touched?.LocationDetails?.Surface && errors?.LocationDetails?.Surface
                      }
                      options={SurfaceOptions.sort((a, b) => a.DisplayOrder - b.DisplayOrder)}
                      className={"sdr-status-edit"}
                      id="LocationDetails.Surface"
                    />
                  ) : (
                    ""
                  )}
                </ListItem>
              </div>
            )}

            {/* STA */}
            {(values?.LocationDetails?.DefectLocationId === 4 ||
              values?.LocationDetails?.DefectLocationId === 5 ||
              values?.LocationDetails?.DefectLocationId === 6 ||
              values?.LocationDetails?.DefectLocationId === 8 ||
              values?.LocationDetails?.DefectLocationId === 9 ||
              values?.LocationDetails?.DefectLocationId === 21 ||
              values?.LocationDetails?.DefectLocationId === 18 ||
              values?.LocationDetails?.DefectLocationId === 19) && (
              <div>
                <>
                  <ListItem>From STA</ListItem>
                  <ListItem>
                    {editable ? (
                      <TextField
                        name="LocationDetails.FromSta"
                        value={values?.LocationDetails?.FromSta || ""}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={
                          !!touched?.LocationDetails?.FromSta && !!errors?.LocationDetails?.FromSta
                        }
                        helperText={
                          !!touched?.LocationDetails?.FromSta && errors?.LocationDetails?.FromSta
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
                        name="LocationDetails.ToSta"
                        value={values?.LocationDetails?.ToSta || ""}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={
                          !!touched?.LocationDetails?.ToSta && !!errors?.LocationDetails?.ToSta
                        }
                        helperText={
                          !!touched?.LocationDetails?.ToSta && errors?.LocationDetails?.ToSta
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
              </div>
            )}

            {/* BL */}
            {(values?.LocationDetails?.DefectLocationId === 4 ||
              values?.LocationDetails?.DefectLocationId === 5) && (
              <div>
                <>
                  <ListItem>From BL</ListItem>
                  <ListItem>
                    {editable ? (
                      <SingleSelect
                        name="LocationDetails.FromBLLength"
                        value={values?.LocationDetails?.FromBLLength || ""}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={
                          !!touched?.LocationDetails?.FromBLLength &&
                          !!errors?.LocationDetails?.FromBLLength
                        }
                        helperText={
                          !!touched?.LocationDetails?.FromBLLength &&
                          errors?.LocationDetails?.FromBLLength
                        }
                        options={
                          masterData?.DiscrepancyParts &&
                          [...masterData.DiscrepancyParts].sort(
                            (a, b) => a.DisplayOrder - b.DisplayOrder
                          )
                        }
                        className={"sdr-status-edit"}
                        id="LocationDetails.FromBLLength"
                      />
                    ) : (
                      ""
                    )}
                  </ListItem>
                  <ListItem>
                    {editable ? (
                      <TextField
                        name="LocationDetails.FromBL"
                        value={values.LocationDetails?.FromBL || ""}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={
                          !!touched.LocationDetails?.FromBL && !!errors.LocationDetails?.FromBL
                        }
                        helperText={
                          !!touched.LocationDetails?.FromBL && errors.LocationDetails?.FromBL
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
                  <ListItem>To BL</ListItem>
                  <ListItem>
                    {editable ? (
                      <SingleSelect
                        name="LocationDetails.ToBLLength"
                        value={values?.LocationDetails?.ToBLLength || ""}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={
                          !!touched?.LocationDetails?.ToBLLength &&
                          !!errors?.LocationDetails?.ToBLLength
                        }
                        helperText={
                          !!touched?.LocationDetails?.ToBLLength &&
                          errors?.LocationDetails?.ToBLLength
                        }
                        options={
                          masterData?.DiscrepancyParts &&
                          [...masterData.DiscrepancyParts].sort(
                            (a, b) => a.DisplayOrder - b.DisplayOrder
                          )
                        }
                        className={"sdr-status-edit"}
                        id="LocationDetails.ToBLLength"
                      />
                    ) : (
                      ""
                    )}
                  </ListItem>
                  <ListItem>
                    {editable ? (
                      <TextField
                        name="LocationDetails.ToBL"
                        value={values?.LocationDetails?.ToBL || ""}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={!!touched?.LocationDetails?.ToBL && !!errors?.LocationDetails?.ToBL}
                        helperText={
                          !!touched?.LocationDetails?.ToBL && errors?.LocationDetails?.ToBL
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
              </div>
            )}

            {/* Type */}
            {(values?.LocationDetails?.DefectLocationId === 9 ||
              values?.LocationDetails?.DefectLocationId === 21 ||
              values?.LocationDetails?.DefectLocationId === 18 ||
              values?.LocationDetails?.DefectLocationId === 19) && (
              <div>
                <ListItem>Type</ListItem>
                <ListItem>
                  {editable ? (
                    <SingleSelect
                      name="LocationDetails.StaTypeId"
                      value={values?.LocationDetails?.StaTypeId || ""}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={
                        !!touched?.LocationDetails?.StaTypeId &&
                        !!errors?.LocationDetails?.StaTypeId
                      }
                      helperText={
                        !!touched?.LocationDetails?.StaTypeId && errors?.LocationDetails?.StaTypeId
                      }
                      options={
                        logpageData?.MasterData?.StaTypes &&
                        [...logpageData.MasterData.StaTypes].sort(
                          (a, b) => a.DisplayOrder - b.DisplayOrder
                        )
                      }
                      className={"sdr-status-edit"}
                      id="LocationDetails.StaTypeId"
                    />
                  ) : (
                    ""
                  )}
                </ListItem>
              </div>
            )}

            {/* DamageProximity Rudder */}
            {(values?.LocationDetails?.DefectLocationId === 6 ||
              values?.LocationDetails?.DefectLocationId === 21) && (
              <div>
                <ListItem>Damage in Proximity of or at</ListItem>
                <ListItem>
                  {editable ? (
                    <SingleSelect
                      name="LocationDetails.DamageProximityId"
                      value={values?.LocationDetails?.DamageProximityId || ""}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={
                        !!touched?.LocationDetails?.DamageProximityId &&
                        !!errors?.LocationDetails?.DamageProximityId
                      }
                      helperText={
                        !!touched?.LocationDetails?.DamageProximityId &&
                        errors?.LocationDetails?.DamageProximityId
                      }
                      options={RudderDamageProximityOptions.sort(
                        (a, b) => a.DisplayOrder - b.DisplayOrder
                      )}
                      className={"sdr-status-edit"}
                      id="LocationDetails.DamageProximityId"
                    />
                  ) : (
                    ""
                  )}
                </ListItem>
              </div>
            )}

            {/* DamageProximity Stab */}
            {(values?.LocationDetails?.DefectLocationId === 9 ||
              values?.LocationDetails?.DefectLocationId === 18) && (
              <div>
                <ListItem>Damage in Proximity of or at</ListItem>
                <ListItem>
                  {editable ? (
                    <SingleSelect
                      name="LocationDetails.DamageProximityId"
                      value={values?.LocationDetails?.DamageProximityId || ""}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={
                        !!touched?.LocationDetails?.DamageProximityId &&
                        !!errors?.LocationDetails?.DamageProximityId
                      }
                      helperText={
                        !!touched?.LocationDetails?.DamageProximityId &&
                        errors?.LocationDetails?.DamageProximityId
                      }
                      options={StabDamageProximityOptions.sort(
                        (a, b) => a.DisplayOrder - b.DisplayOrder
                      )}
                      className={"sdr-status-edit"}
                      id="LocationDetails.DamageProximityId"
                    />
                  ) : (
                    ""
                  )}
                </ListItem>
              </div>
            )}

            {/* DamageProximity Wing */}
            {values?.LocationDetails?.DefectLocationId === 19 && (
              <div>
                <ListItem>Damage in Proximity of or at</ListItem>
                <ListItem>
                  {editable ? (
                    <SingleSelect
                      name="LocationDetails.DamageProximityId"
                      value={values?.LocationDetails?.DamageProximityId || ""}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={
                        !!touched?.LocationDetails?.DamageProximityId &&
                        !!errors?.LocationDetails?.DamageProximityId
                      }
                      helperText={
                        !!touched?.LocationDetails?.DamageProximityId &&
                        errors?.LocationDetails?.DamageProximityId
                      }
                      options={WingDamageProximityOptions.sort(
                        (a, b) => a.DisplayOrder - b.DisplayOrder
                      )}
                      className={"sdr-status-edit"}
                      id="LocationDetails.DamageProximityId"
                    />
                  ) : (
                    ""
                  )}
                </ListItem>
              </div>
            )}

            {/* STR */}
            {values?.LocationDetails?.DefectLocationId === 8 && (
              <div>
                <>
                  <ListItem>From STR/Long</ListItem>
                  <ListItem>
                    {editable ? (
                      <TextField
                        name="LocationDetails.FromStr"
                        value={values?.LocationDetails?.FromStr || ""}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={
                          !!touched?.LocationDetails?.FromStr && !!errors?.LocationDetails?.FromStr
                        }
                        helperText={
                          !!touched?.LocationDetails?.FromStr && errors?.LocationDetails?.FromStr
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
                  <ListItem>
                    {editable ? (
                      <SingleSelect
                        name="LocationDetails.FromSide"
                        value={values?.LocationDetails?.FromSide || ""}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={
                          !!touched?.LocationDetails?.FromSide &&
                          !!errors?.LocationDetails?.FromSide
                        }
                        helperText={
                          !!touched?.LocationDetails?.FromSide && errors?.LocationDetails?.FromSide
                        }
                        options={Sides.sort((a, b) => a.DisplayOrder - b.DisplayOrder)}
                        className={"sdr-status-edit"}
                        id="LocationDetails.FromSide"
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
                      <TextField
                        name="LocationDetails.ToStr"
                        value={values?.LocationDetails?.ToStr || ""}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={
                          !!touched?.LocationDetails?.ToStr && !!errors?.LocationDetails?.ToStr
                        }
                        helperText={
                          !!touched?.LocationDetails?.ToStr && errors?.LocationDetails?.ToStr
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
                  <ListItem>
                    {editable ? (
                      <SingleSelect
                        name="LocationDetails.ToSide"
                        value={values?.LocationDetails?.ToSide || ""}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={
                          !!touched?.LocationDetails?.ToSide && !!errors?.LocationDetails?.ToSide
                        }
                        helperText={
                          !!touched?.LocationDetails?.ToSide && errors?.LocationDetails?.ToSide
                        }
                        options={Sides.sort((a, b) => a.DisplayOrder - b.DisplayOrder)}
                        className={"sdr-status-edit"}
                        id="LocationDetails.ToSide"
                      />
                    ) : (
                      ""
                    )}
                  </ListItem>
                </>
              </div>
            )}

            {/* Fuselage */}
            {values?.LocationDetails?.DefectLocationId === 8 && (
              <div>
                <>
                  <ListItem>Elevator Tab</ListItem>
                  <ListItem>
                    {editable ? (
                      <SingleSelect
                        name="LocationDetails.ElevatorTab"
                        value={values?.LocationDetails?.ElevatorTab || ""}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={
                          !!touched?.LocationDetails?.ElevatorTab &&
                          !!errors?.LocationDetails?.ElevatorTab
                        }
                        helperText={
                          !!touched?.LocationDetails?.ElevatorTab &&
                          errors?.LocationDetails?.ElevatorTab
                        }
                        options={Sides.sort((a, b) => a.DisplayOrder - b.DisplayOrder)}
                        className={"sdr-status-edit"}
                        id="LocationDetails.ElevatorTab"
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
                        name="LocationDetails.Fuselage"
                        value={values?.LocationDetails?.Fuselage || ""}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={
                          !!touched?.LocationDetails?.Fuselage &&
                          !!errors?.LocationDetails?.Fuselage
                        }
                        helperText={
                          !!touched?.LocationDetails?.Fuselage && errors?.LocationDetails?.Fuselage
                        }
                        options={Sides.sort((a, b) => a.DisplayOrder - b.DisplayOrder)}
                        className={"sdr-status-edit"}
                        id="LocationDetails.Fuselage"
                      />
                    ) : (
                      ""
                    )}
                  </ListItem>
                </>
              </div>
            )}

            {/* LE Flap */}
            {values?.LocationDetails?.DefectLocationId === 11 && (
              <div>
                <ListItem>LE Flap #</ListItem>
                <ListItem>
                  {editable ? (
                    <SingleSelect
                      name="LocationDetails.LocationType"
                      value={values?.LocationDetails?.LocationType || ""}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={
                        !!touched?.LocationDetails?.LocationType &&
                        !!errors?.LocationDetails?.LocationType
                      }
                      helperText={
                        !!touched?.LocationDetails?.LocationType &&
                        errors?.LocationDetails?.LocationType
                      }
                      options={ZoneOptions.sort((a, b) => a.DisplayOrder - b.DisplayOrder)}
                      className={"sdr-status-edit"}
                      id="LocationDetails.LocationType"
                    />
                  ) : (
                    ""
                  )}
                </ListItem>
              </div>
            )}

            {/* TE Flap */}
            {values?.LocationDetails?.DefectLocationId === 17 && (
              <div>
                <ListItem>TE Flap #</ListItem>
                <ListItem>
                  {editable ? (
                    <TextField
                      name="LocationDetails.LocationType"
                      value={values?.LocationDetails?.LocationType || ""}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={
                        !!touched?.LocationDetails?.LocationType &&
                        !!errors?.LocationDetails?.LocationType
                      }
                      helperText={
                        !!touched?.LocationDetails?.LocationType &&
                        errors?.LocationDetails?.LocationType
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

            {/* Slat */}
            {values?.LocationDetails?.DefectLocationId === 15 && (
              <div>
                <ListItem>Slat #</ListItem>
                <ListItem>
                  {editable ? (
                    <SingleSelect
                      name="LocationDetails.LocationType"
                      value={values?.LocationDetails?.LocationType || ""}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={
                        !!touched?.LocationDetails?.LocationType &&
                        !!errors?.LocationDetails?.LocationType
                      }
                      helperText={
                        !!touched?.LocationDetails?.LocationType &&
                        errors?.LocationDetails?.LocationType
                      }
                      options={ZoneOptions.sort((a, b) => a.DisplayOrder - b.DisplayOrder)}
                      className={"sdr-status-edit"}
                      id="LocationDetails.LocationType"
                    />
                  ) : (
                    ""
                  )}
                </ListItem>
              </div>
            )}

            {/* Spoiler */}
            {values?.LocationDetails?.DefectLocationId === 16 && (
              <div>
                <ListItem>Spoiler #</ListItem>
                <ListItem>
                  {editable ? (
                    <SingleSelect
                      name="LocationDetails.LocationType"
                      value={values?.LocationDetails?.LocationType || ""}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={
                        !!touched?.LocationDetails?.LocationType &&
                        !!errors?.LocationDetails?.LocationType
                      }
                      helperText={
                        !!touched?.LocationDetails?.LocationType &&
                        errors?.LocationDetails?.LocationType
                      }
                      options={ZoneOptions.sort((a, b) => a.DisplayOrder - b.DisplayOrder)}
                      className={"sdr-status-edit"}
                      id="LocationDetails.LocationType"
                    />
                  ) : (
                    ""
                  )}
                </ListItem>
              </div>
            )}

            {/* Specifics */}
            {values?.LocationDetails?.DefectLocationId === 17 && (
              <div>
                <ListItem>Specifics #</ListItem>
                <ListItem>
                  {editable ? (
                    <SingleSelect
                      name="LocationDetails.Specifics"
                      value={values?.LocationDetails?.Specifics || ""}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={
                        !!touched?.LocationDetails?.Specifics &&
                        !!errors?.LocationDetails?.Specifics
                      }
                      helperText={
                        !!touched?.LocationDetails?.Specifics && errors?.LocationDetails?.Specifics
                      }
                      options={SpecificsOptions.sort((a, b) => a.DisplayOrder - b.DisplayOrder)}
                      className={"sdr-status-edit"}
                      id="LocationDetails.Specifics"
                    />
                  ) : (
                    ""
                  )}
                </ListItem>
              </div>
            )}

            {/* Other */}
            {values?.LocationDetails?.DefectLocationId === 17 && (
              <div>
                <ListItem>Other</ListItem>
                <ListItem>
                  {editable ? (
                    <SingleSelect
                      name="LocationDetails.Other"
                      value={values?.LocationDetails?.Other || ""}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={!!touched?.LocationDetails?.Other && !!errors?.LocationDetails?.Other}
                      helperText={
                        !!touched?.LocationDetails?.Other && errors?.LocationDetails?.Other
                      }
                      options={OtherOptions.sort((a, b) => a.DisplayOrder - b.DisplayOrder)}
                      className={"sdr-status-edit"}
                      id="LocationDetails.Other"
                    />
                  ) : (
                    ""
                  )}
                </ListItem>
              </div>
            )}

            {/* Location Details */}
            {values?.LocationDetails?.DefectLocationId === 17 && (
              <div>
                <ListItem>Additional Location Details</ListItem>
                <ListItem>
                  {editable ? (
                    <TextField
                      name="LocationDetails.AdditionalLocationDetails"
                      value={values?.LocationDetails?.AdditionalLocationDetails || ""}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={
                        !!touched?.LocationDetails?.AdditionalLocationDetails &&
                        !!errors?.LocationDetails?.AdditionalLocationDetails
                      }
                      helperText={
                        !!touched?.LocationDetails?.AdditionalLocationDetails &&
                        errors?.LocationDetails?.AdditionalLocationDetails
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

            {/* Specify Location Details */}
            {values?.LocationDetails?.DefectLocationId === 20 && (
              <div>
                <ListItem>Specify Defect Location</ListItem>
                <ListItem>
                  {editable ? (
                    <TextField
                      name="LocationDetails.SpecificsLocation"
                      value={values?.LocationDetails?.SpecificsLocation || ""}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={
                        !!touched?.LocationDetails?.SpecificsLocation &&
                        !!errors?.LocationDetails?.SpecificsLocation
                      }
                      helperText={
                        !!touched?.LocationDetails?.SpecificsLocation &&
                        errors?.LocationDetails?.SpecificsLocation
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

            {/* STR Text */}
            {values?.LocationDetails?.DefectLocationId === 19 &&
              (values?.LocationDetails?.DamageProximityId === 4 ||
                values?.LocationDetails?.DamageProximityId === 5) && (
                <>
                  <>
                    <ListItem>From STR</ListItem>
                    <ListItem>
                      {editable ? (
                        <TextField
                          name="LocationDetails.FromStr"
                          value={values?.LocationDetails?.FromStr || ""}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={
                            !!touched?.LocationDetails?.FromStr &&
                            !!errors?.LocationDetails?.FromStr
                          }
                          helperText={
                            !!touched?.LocationDetails?.FromStr && errors?.LocationDetails?.FromStr
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
                    <ListItem>To STR</ListItem>
                    <ListItem>
                      {editable ? (
                        <TextField
                          name="LocationDetails.ToStr"
                          value={values?.LocationDetails?.ToStr || ""}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={
                            !!touched?.LocationDetails?.ToStr && !!errors?.LocationDetails?.ToStr
                          }
                          helperText={
                            !!touched?.LocationDetails?.ToStr && errors?.LocationDetails?.ToStr
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
          </Grid>
        </Grid>
      </TabPanel>
    </>
  );
};
