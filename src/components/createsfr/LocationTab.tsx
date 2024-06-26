import { Grid } from "@mui/material";
import { useFormikContext } from "formik";
import { useEffect } from "react";
import ListItem from "src/commons/ListItem";
import { SimpleSingleSelect, SingleSelect } from "src/commons/Select";
import TabPanel from "src/commons/TabPanel";
import TextField from "src/commons/TextField";
import {
  BLOptions,
  ISaveSfrValues,
  OtherOptions,
  SdrEsfrRecordDetailsStateType,
  SelectedSfrTab,
  Sides,
  SpecificsOptions,
  SurfaceOptions,
} from "src/commons/types";
import { useFormCreateSfrData } from "src/components/createsfr/useFormCreateSfrData";
import { getLocationStaData } from "src/redux/ducks/getSdrEsfrRecordDetails";
import { useAppDispatch, useAppSelector } from "src/redux/hooks";
import { removeNonAlphaNumeric, removeNonAlphaNumericSpace } from "src/validationSchema";

type LocationTabProps = {
  editable: boolean;
  tabIndex: number;
};

export const LocationTab = ({ editable, tabIndex }: LocationTabProps) => {
  const dispatch = useAppDispatch();
  const { masterData, locationStaData, logpageData }: SdrEsfrRecordDetailsStateType =
    useAppSelector((state) => state.sdrEsfrRecordDetails);
  const { errors, handleBlur, handleChange, setFieldValue, touched } =
    useFormikContext<ISaveSfrValues>();
  const { values } = useFormCreateSfrData();
  const { DamageProximities, Types } = locationStaData?.StaDataResponse || {};

  useEffect(() => {
    if (
      logpageData &&
      (values?.LocationDetails?.DefectLocationId === 6 ||
        values?.LocationDetails?.DefectLocationId === 9 ||
        values?.LocationDetails?.DefectLocationId === 18 ||
        values?.LocationDetails?.DefectLocationId === 19 ||
        values?.LocationDetails?.DefectLocationId === 21)
    ) {
      dispatch(
        getLocationStaData(
          logpageData.FleetInfo.SceptreCode,
          values.LocationDetails.DefectLocationId
        )
      );
    }
  }, [logpageData, values?.LocationDetails?.DefectLocationId]);

  useEffect(() => {
    setFieldValue(
      "LocationDetails.StaTypeId",
      (Types &&
        [...Types].find((type) => type.Description === values?.LocationDetails?.StaType)?.Id) ||
        0
    );
  }, [values?.LocationDetails?.StaType]);

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
                    onChange={(e) =>
                      setFieldValue(
                        "LocationDetails.CoordinateLocationDetails",
                        removeNonAlphaNumericSpace(e.target.value)
                      )
                    }
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
                    inputProps={{ maxLength: 100 }}
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
              values?.LocationDetails?.DefectLocationId === 18 ||
              values?.LocationDetails?.DefectLocationId === 19) && (
              <div>
                <ListItem>Side</ListItem>
                <ListItem>
                  {editable ? (
                    <SimpleSingleSelect
                      name="LocationDetails.Side"
                      value={values?.LocationDetails?.Side || ""}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={!!touched?.LocationDetails?.Side && !!errors?.LocationDetails?.Side}
                      helperText={!!touched?.LocationDetails?.Side && errors?.LocationDetails?.Side}
                      options={Sides.sort((a, b) => a.DisplayOrder - b.DisplayOrder).map(
                        (o) => o.Description
                      )}
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
                    <SimpleSingleSelect
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
                      options={SurfaceOptions.sort((a, b) => a.DisplayOrder - b.DisplayOrder).map(
                        (o) => o.Description
                      )}
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
              <>
                <div>
                  <ListItem>From STA</ListItem>
                  <ListItem>
                    {editable ? (
                      <TextField
                        name="LocationDetails.FromSta"
                        value={values?.LocationDetails?.FromSta || ""}
                        onChange={(e) =>
                          setFieldValue(
                            "LocationDetails.FromSta",
                            removeNonAlphaNumeric(e.target.value)
                          )
                        }
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
                        inputProps={{ maxLength: 50 }}
                      />
                    ) : (
                      ""
                    )}
                  </ListItem>
                </div>
                <div>
                  <ListItem>To STA</ListItem>
                  <ListItem>
                    {editable ? (
                      <TextField
                        name="LocationDetails.ToSta"
                        value={values?.LocationDetails?.ToSta || ""}
                        onChange={(e) =>
                          setFieldValue(
                            "LocationDetails.ToSta",
                            removeNonAlphaNumeric(e.target.value)
                          )
                        }
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
                        inputProps={{ maxLength: 50 }}
                      />
                    ) : (
                      ""
                    )}
                  </ListItem>
                </div>
              </>
            )}

            {/* BL */}
            {(values?.LocationDetails?.DefectLocationId === 4 ||
              values?.LocationDetails?.DefectLocationId === 5) && (
              <>
                <div>
                  <ListItem>From BL</ListItem>
                  <ListItem>
                    {editable ? (
                      <SimpleSingleSelect
                        name="LocationDetails.FromBL"
                        value={values?.LocationDetails?.FromBL || ""}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={
                          !!touched?.LocationDetails?.FromBL && !!errors?.LocationDetails?.FromBL
                        }
                        helperText={
                          !!touched?.LocationDetails?.FromBL && errors?.LocationDetails?.FromBL
                        }
                        options={BLOptions.sort((a, b) => a.DisplayOrder - b.DisplayOrder).map(
                          (o) => o.Description
                        )}
                        id="LocationDetails.FromBL"
                      />
                    ) : (
                      ""
                    )}
                  </ListItem>
                  <ListItem>
                    {editable ? (
                      <TextField
                        name="LocationDetails.FromBLLength"
                        value={values.LocationDetails?.FromBLLength || ""}
                        onChange={(e) =>
                          setFieldValue(
                            "LocationDetails.FromBLLength",
                            removeNonAlphaNumeric(e.target.value)
                          )
                        }
                        onBlur={handleBlur}
                        error={
                          !!touched.LocationDetails?.FromBLLength &&
                          !!errors.LocationDetails?.FromBLLength
                        }
                        helperText={
                          !!touched.LocationDetails?.FromBLLength &&
                          errors.LocationDetails?.FromBLLength
                        }
                        className={"sdr-status-edit"}
                        inputProps={{ maxLength: 10 }}
                        placeholder="xxxxxxxxxx"
                      />
                    ) : (
                      ""
                    )}
                  </ListItem>
                </div>
                <div>
                  <ListItem>To BL</ListItem>
                  <ListItem>
                    {editable ? (
                      <SimpleSingleSelect
                        name="LocationDetails.ToBL"
                        value={values?.LocationDetails?.ToBL || ""}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={!!touched?.LocationDetails?.ToBL && !!errors?.LocationDetails?.ToBL}
                        helperText={
                          !!touched?.LocationDetails?.ToBL && errors?.LocationDetails?.ToBL
                        }
                        options={BLOptions.sort((a, b) => a.DisplayOrder - b.DisplayOrder).map(
                          (o) => o.Description
                        )}
                        id="LocationDetails.ToBL"
                      />
                    ) : (
                      ""
                    )}
                  </ListItem>
                  <ListItem>
                    {editable ? (
                      <TextField
                        name="LocationDetails.ToBLLength"
                        value={values?.LocationDetails?.ToBLLength || ""}
                        onChange={(e) =>
                          setFieldValue(
                            "LocationDetails.ToBLLength",
                            removeNonAlphaNumeric(e.target.value)
                          )
                        }
                        onBlur={handleBlur}
                        error={
                          !!touched?.LocationDetails?.ToBLLength &&
                          !!errors?.LocationDetails?.ToBLLength
                        }
                        helperText={
                          !!touched?.LocationDetails?.ToBLLength &&
                          errors?.LocationDetails?.ToBLLength
                        }
                        className={"sdr-status-edit"}
                        inputProps={{ maxLength: 10 }}
                        placeholder="xxxxxxxxxx"
                      />
                    ) : (
                      ""
                    )}
                  </ListItem>
                </div>
              </>
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
                    <SimpleSingleSelect
                      name="LocationDetails.StaType"
                      value={values?.LocationDetails?.StaType || ""}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={
                        !!touched?.LocationDetails?.StaType && !!errors?.LocationDetails?.StaType
                      }
                      helperText={
                        !!touched?.LocationDetails?.StaType && errors?.LocationDetails?.StaType
                      }
                      options={
                        Types &&
                        [...Types]
                          .sort((a, b) => a.DisplayOrder - b.DisplayOrder)
                          .map((o) => o.Description)
                      }
                      id="LocationDetails.StaType"
                    />
                  ) : (
                    ""
                  )}
                </ListItem>
              </div>
            )}

            {/* DamageProximity Rudder */}
            {(values?.LocationDetails?.DefectLocationId === 6 ||
              values?.LocationDetails?.DefectLocationId === 9 ||
              values?.LocationDetails?.DefectLocationId === 18 ||
              values?.LocationDetails?.DefectLocationId === 19 ||
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
                      options={
                        DamageProximities &&
                        [...DamageProximities].sort((a, b) => a.DisplayOrder - b.DisplayOrder)
                      }
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
              <>
                <div>
                  <ListItem>From STR/Long</ListItem>
                  <ListItem>
                    {editable ? (
                      <SimpleSingleSelect
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
                        options={Array.from({ length: 29 }, (_, i) => `${i + 1}`)}
                        id="LocationDetails.FromStr"
                      />
                    ) : (
                      ""
                    )}
                  </ListItem>
                  <ListItem>
                    {editable ? (
                      <SimpleSingleSelect
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
                        options={Sides.sort((a, b) => a.DisplayOrder - b.DisplayOrder).map(
                          (o) => o.Description
                        )}
                        id="LocationDetails.FromSide"
                      />
                    ) : (
                      ""
                    )}
                  </ListItem>
                </div>
                <div>
                  <ListItem>To STR/Long</ListItem>

                  <ListItem>
                    {editable ? (
                      <SimpleSingleSelect
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
                        options={Array.from({ length: 29 }, (_, i) => `${i + 1}`)}
                        id="LocationDetails.ToStr"
                      />
                    ) : (
                      ""
                    )}
                  </ListItem>
                  <ListItem>
                    {editable ? (
                      <SimpleSingleSelect
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
                        options={Sides.sort((a, b) => a.DisplayOrder - b.DisplayOrder).map(
                          (o) => o.Description
                        )}
                        id="LocationDetails.ToSide"
                      />
                    ) : (
                      ""
                    )}
                  </ListItem>
                </div>
              </>
            )}

            {/* Fuselage */}
            {values?.LocationDetails?.DefectLocationId === 8 && (
              <>
                {/* <div>
                  <ListItem>Elevator Tab</ListItem>
                  <ListItem>
                    {editable ? (
                      <SimpleSingleSelect
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
                        options={Sides.sort((a, b) => a.DisplayOrder - b.DisplayOrder).map(
                              (o) => o.Description
                            )}
                        id="LocationDetails.ElevatorTab"
                      />
                    ) : (
                      ""
                    )}
                  </ListItem>
                </div> */}
                <div>
                  <ListItem>Fuselage</ListItem>
                  <ListItem>
                    {editable ? (
                      <SimpleSingleSelect
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
                        options={Sides.sort((a, b) => a.DisplayOrder - b.DisplayOrder).map(
                          (o) => o.Description
                        )}
                        id="LocationDetails.Fuselage"
                      />
                    ) : (
                      ""
                    )}
                  </ListItem>
                </div>
              </>
            )}

            {/* LE Flap */}
            {values?.LocationDetails?.DefectLocationId === 11 && (
              <div>
                <ListItem>LE Flap #</ListItem>
                <ListItem>
                  {editable ? (
                    <SimpleSingleSelect
                      name="LocationDetails.DefectLocationIdentifier"
                      value={values?.LocationDetails?.DefectLocationIdentifier || ""}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={
                        !!touched?.LocationDetails?.DefectLocationIdentifier &&
                        !!errors?.LocationDetails?.DefectLocationIdentifier
                      }
                      helperText={
                        !!touched?.LocationDetails?.DefectLocationIdentifier &&
                        errors?.LocationDetails?.DefectLocationIdentifier
                      }
                      options={
                        logpageData?.MasterData?.LEFlaps &&
                        [...logpageData.MasterData.LEFlaps]
                          .sort((a, b) => a.DisplayOrder - b.DisplayOrder)
                          .map((o) => o.Description)
                      }
                      id="LocationDetails.DefectLocationIdentifier"
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
                      name="LocationDetails.DefectLocationIdentifier"
                      value={values?.LocationDetails?.DefectLocationIdentifier}
                      onChange={(e) =>
                        setFieldValue(
                          "LocationDetails.DefectLocationIdentifier",
                          removeNonAlphaNumeric(e.target.value)
                        )
                      }
                      onBlur={handleBlur}
                      error={
                        !!touched?.LocationDetails?.DefectLocationIdentifier &&
                        !!errors?.LocationDetails?.DefectLocationIdentifier
                      }
                      helperText={
                        !!touched?.LocationDetails?.DefectLocationIdentifier &&
                        errors?.LocationDetails?.DefectLocationIdentifier
                      }
                      multiline
                      maxRows={4}
                      className={"sdr-status-edit textareaAutosize"}
                      inputProps={{ maxLength: 50 }}
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
                    <SimpleSingleSelect
                      name="LocationDetails.DefectLocationIdentifier"
                      value={values?.LocationDetails?.DefectLocationIdentifier || ""}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={
                        !!touched?.LocationDetails?.DefectLocationIdentifier &&
                        !!errors?.LocationDetails?.DefectLocationIdentifier
                      }
                      helperText={
                        !!touched?.LocationDetails?.DefectLocationIdentifier &&
                        errors?.LocationDetails?.DefectLocationIdentifier
                      }
                      options={
                        logpageData?.MasterData?.Slats &&
                        [...logpageData.MasterData.Slats]
                          .sort((a, b) => a.DisplayOrder - b.DisplayOrder)
                          .map((o) => o.Description)
                      }
                      id="LocationDetails.DefectLocationIdentifier"
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
                    <SimpleSingleSelect
                      name="LocationDetails.DefectLocationIdentifier"
                      value={values?.LocationDetails?.DefectLocationIdentifier || ""}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={
                        !!touched?.LocationDetails?.DefectLocationIdentifier &&
                        !!errors?.LocationDetails?.DefectLocationIdentifier
                      }
                      helperText={
                        !!touched?.LocationDetails?.DefectLocationIdentifier &&
                        errors?.LocationDetails?.DefectLocationIdentifier
                      }
                      options={
                        logpageData?.MasterData?.Spoilers &&
                        [...logpageData.MasterData.Spoilers]
                          .sort((a, b) => a.DisplayOrder - b.DisplayOrder)
                          .map((o) => o.Description)
                      }
                      id="LocationDetails.DefectLocationIdentifier"
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
                <ListItem>Specifics</ListItem>
                <ListItem>
                  {editable ? (
                    <SimpleSingleSelect
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
                      options={SpecificsOptions.sort((a, b) => a.DisplayOrder - b.DisplayOrder).map(
                        (o) => o.Description
                      )}
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
                    <SimpleSingleSelect
                      name="LocationDetails.Other"
                      value={values?.LocationDetails?.Other || ""}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={!!touched?.LocationDetails?.Other && !!errors?.LocationDetails?.Other}
                      helperText={
                        !!touched?.LocationDetails?.Other && errors?.LocationDetails?.Other
                      }
                      options={OtherOptions.sort((a, b) => a.DisplayOrder - b.DisplayOrder).map(
                        (o) => o.Description
                      )}
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
                      onChange={(e) =>
                        setFieldValue(
                          "LocationDetails.AdditionalLocationDetails",
                          removeNonAlphaNumeric(e.target.value)
                        )
                      }
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
                      inputProps={{ maxLength: 100 }}
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
                      onChange={(e) =>
                        setFieldValue(
                          "LocationDetails.SpecificsLocation",
                          removeNonAlphaNumeric(e.target.value)
                        )
                      }
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
                      inputProps={{ maxLength: 100 }}
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
                  <div>
                    <ListItem>From STR</ListItem>
                    <ListItem>
                      {editable ? (
                        <TextField
                          name="LocationDetails.FromStr"
                          value={values?.LocationDetails?.FromStr || ""}
                          onChange={(e) =>
                            setFieldValue(
                              "LocationDetails.FromStr",
                              removeNonAlphaNumeric(e.target.value)
                            )
                          }
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
                          inputProps={{ maxLength: 50 }}
                        />
                      ) : (
                        ""
                      )}
                    </ListItem>
                  </div>
                  <div>
                    <ListItem>To STR</ListItem>
                    <ListItem>
                      {editable ? (
                        <TextField
                          name="LocationDetails.ToStr"
                          value={values?.LocationDetails?.ToStr || ""}
                          onChange={(e) =>
                            setFieldValue(
                              "LocationDetails.ToStr",
                              removeNonAlphaNumeric(e.target.value)
                            )
                          }
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
                          inputProps={{ maxLength: 50 }}
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
