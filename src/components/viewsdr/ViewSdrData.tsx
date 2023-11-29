import {Box, Button, Checkbox, Grid, ListItem, Menu, TextareaAutosize, TextField} from "@mui/material";
import {EsfrRecordDetailStateType, ViewSdrDataProps} from "src/commons/types";
import "./viewSdrData.css";
import {MouseEvent, useEffect, useState} from "react";
import {useAppDispatch, useAppSelector} from "../../redux/hooks";
import {getEsfrRecordDetails} from "../../redux/ducks/getEsfrRecordDetails";
import moment from "moment";

const ViewSdrData = (props: ViewSdrDataProps) => {
    const [anchorEl, setAnchorEl] = useState<Element | null>(null);
    const [editable, setEditable] = useState(false);
    const dispatch = useAppDispatch();
    const esfrRecordDetails: EsfrRecordDetailStateType = useAppSelector(state => state.esfrRecordDetail);

    useEffect(() => {
        dispatch(getEsfrRecordDetails(props.selectedSdrId, props.selectedType));
    }, [props]);

    const sxBox = {
        borderBottom: 1,
        borderColor: 'divider',
        width: '190%',
        fontWeight: '600',
        marginLeft: '15px',
    }

    const openACDetails = (event: MouseEvent) => {
        setAnchorEl(event.currentTarget);
    }

    const closeACDetails = () => {
        setAnchorEl(null);
    }

    const showACDetails: boolean = Boolean(anchorEl);

    const onClickEdit = () => {
        setEditable(!editable);
    }

    return (
        <Grid item md={6}
              sx={{boxShadow: "-4px 0px 4px 0px rgba(51, 51, 51, 0.12)", marginTop: "-30px", paddingTop: "30px"}}>
            <Box sx={{...sxBox}}>
                <p>Service Difficulty Report - #{props.selectedSdrId}</p>
            </Box>
            <Grid container spacing={2}
                  sx={{marginTop: "10px", color: "#666666", fontWeight: 400}}>
                <Grid item xs={6}>
                    <ListItem>Operator Control Number</ListItem>
                </Grid>
                <Grid item xs={6}>
                    <ListItem>A/C Information</ListItem>
                </Grid>
            </Grid>
            <Grid container spacing={2}>
                <Grid item xs={6}>
                    <ListItem>{esfrRecordDetails.esfrRecordDetailData?.OperatorControlNumber}</ListItem>
                </Grid>
                <Grid item xs={6}>
                    <ListItem onClick={openACDetails}> <u className={"view-details-text"}>View Details</u></ListItem>
                </Grid>
            </Grid>
            <Grid className={"sdr-status-grid"}
                  sx={{borderLeft: 1, borderRight: 1, borderBottom: 1, borderColor: "#E6E6E6"}}>
                <Grid className={"sdr-status-title"}>Problem Description</Grid>
                <Grid className={"sdr-status-item"} container spacing={3}>
                    <Grid item xs={4}>
                        <ListItem>Difficulty Date</ListItem>
                    </Grid>
                    <Grid item xs={4}>
                        <ListItem>Log Page Number</ListItem>
                    </Grid>
                    <Grid item xs={4}>
                        <ListItem>Station</ListItem>
                    </Grid>
                </Grid>
                <Grid className={"sdr-status-description"} container spacing={3}>
                    <Grid item xs={4}>
                        <ListItem>
                            {editable ? <TextField size={"small"}
                                                   defaultValue={moment(esfrRecordDetails.esfrRecordDetailData?.CreatedDate).format("MM/DD/YYYY")}
                                                   className={"sdr-status-edit"}/>
                                : moment(esfrRecordDetails.esfrRecordDetailData?.CreatedDate).format("MM/DD/YYYY")
                            }
                        </ListItem>
                    </Grid>
                    <Grid item xs={4}>
                        <ListItem>
                            {editable ? <TextField size={"small"}
                                                   defaultValue={esfrRecordDetails.esfrRecordDetailData?.LogPageNumber}
                                                   className={"sdr-status-edit"}/>
                                : esfrRecordDetails.esfrRecordDetailData?.LogPageNumber
                            }
                        </ListItem>
                    </Grid>
                    <Grid item xs={4}>
                        <ListItem>
                            {editable ?
                                <TextField size={"small"} defaultValue={esfrRecordDetails.esfrRecordDetailData?.Station}
                                           className={"sdr-status-edit"}/>
                                : esfrRecordDetails.esfrRecordDetailData?.Station
                            }
                        </ListItem>
                    </Grid>
                </Grid>
                <Grid className={"sdr-status-item"} container spacing={3}>
                    <Grid item xs={4}>
                        <ListItem>ATA Code</ListItem>
                    </Grid>
                    <Grid item xs={4}>
                        <ListItem>Nature of Condition</ListItem>
                    </Grid>
                    <Grid item xs={4}>
                        <ListItem>Precautionary Procedure</ListItem>
                    </Grid>
                </Grid>
                <Grid className={"sdr-status-description"} container spacing={3}>
                    <Grid item xs={4}>
                        <ListItem>
                            {editable ? <TextField size={"small"}
                                                   defaultValue={esfrRecordDetails.esfrRecordDetailData?.FleetInfo?.AtaCode}
                                                   className={"sdr-status-edit"}/>
                                : esfrRecordDetails.esfrRecordDetailData?.FleetInfo?.AtaCode
                            }
                        </ListItem>
                    </Grid>
                    <Grid item xs={4}>
                        <ListItem>
                            {editable ? <TextField size={"small"}
                                                   defaultValue={esfrRecordDetails.esfrRecordDetailData?.SdrDetails?.NatureofReports ? esfrRecordDetails.esfrRecordDetailData?.SdrDetails?.NatureofReports[0] : ""}
                                                   className={"sdr-status-edit"}/>
                                : esfrRecordDetails.esfrRecordDetailData?.SdrDetails?.NatureofReports ? esfrRecordDetails.esfrRecordDetailData?.SdrDetails?.NatureofReports[0] : ""
                            }
                        </ListItem>
                    </Grid>
                    <Grid item xs={4}>
                        <ListItem>
                            {editable ? <TextField size={"small"}
                                                   defaultValue={esfrRecordDetails.esfrRecordDetailData?.SdrDetails?.PrecautionaryProcedures ? esfrRecordDetails.esfrRecordDetailData?.SdrDetails?.PrecautionaryProcedures[0] : ""}
                                                   className={"sdr-status-edit"}/>
                                : esfrRecordDetails.esfrRecordDetailData?.SdrDetails?.PrecautionaryProcedures ? esfrRecordDetails.esfrRecordDetailData?.SdrDetails?.PrecautionaryProcedures[0] : ""
                            }
                        </ListItem>
                    </Grid>
                </Grid>
                <Grid className={"sdr-status-item"} container spacing={3}>
                    <Grid item xs={4}>
                        <ListItem>Stage of Operation</ListItem>
                    </Grid>
                    <Grid item xs={4}>
                        <ListItem>How Discovered</ListItem>
                    </Grid>
                </Grid>
                <Grid className={"sdr-status-description"} container spacing={3}>
                    <Grid item xs={4}>
                        <ListItem>
                            {editable ? <TextField size={"small"}
                                                   defaultValue={esfrRecordDetails.esfrRecordDetailData?.SdrDetails?.Stage}
                                                   className={"sdr-status-edit"}/>
                                : esfrRecordDetails.esfrRecordDetailData?.SdrDetails?.Stage
                            }
                        </ListItem>
                    </Grid>
                    <Grid item xs={4}>
                        <ListItem>
                            {editable ? <TextField size={"small"}
                                                   defaultValue={esfrRecordDetails.esfrRecordDetailData?.SdrDetails?.HowDicovered}
                                                   className={"sdr-status-edit"}/>
                                : esfrRecordDetails.esfrRecordDetailData?.SdrDetails?.HowDicovered
                            }
                        </ListItem>
                    </Grid>
                </Grid>
                <Grid className={"sdr-status-item"} container spacing={1}>
                    <Grid item xs={12}>
                        <ListItem>Discrepancy/Corrective Action Summary</ListItem>
                    </Grid>
                </Grid>
                <Grid className={"sdr-status-description"} container spacing={1}>
                    <Grid item xs={12}>
                        <ListItem>
                            {editable ?
                                <TextareaAutosize style={{width: "190%", fontSize: "16px"}}
                                                  value={esfrRecordDetails.esfrRecordDetailData?.FleetInfo?.CorrectiveActions}/>

                                // <TextField size={"small"} fullWidth={true}  defaultValue={"EXIT LIGHT ABOVE L1 DOOR WILL NOT ILLUMINATE (REF. AAR NR 99978502). REPLACED BATTERY PACK M1675 WITH NEW BATTERY PACK IAW B737 AMM 33-51-06-960-805. INSTALLATION TEST GOOD. (WORK ACCOMPLISHED BY V937131 AND AAR QC A-83 V935067)."} className={"sdr-status-edit"}/>
                                : esfrRecordDetails.esfrRecordDetailData?.FleetInfo?.CorrectiveActions
                            }
                        </ListItem>
                    </Grid>
                </Grid>
            </Grid>
            <Grid className={"sdr-status-grid"}
                  sx={{borderLeft: 1, borderRight: 1, borderBottom: 1, borderColor: "#E6E6E6"}}>
                <Grid className={"sdr-status-title"}>Part Information</Grid>
                <Grid className={"sdr-status-item"} container spacing={3}>
                    <Grid item xs={4}>
                        <ListItem>Part Name</ListItem>
                    </Grid>
                    <Grid item xs={4}>
                        <ListItem>Part Number</ListItem>
                    </Grid>
                    <Grid item xs={4}>
                        <ListItem>Part make</ListItem>
                    </Grid>
                </Grid>
                <Grid className={"sdr-status-description"} container spacing={3}>
                    <Grid item xs={4}>
                        <ListItem>
                            {editable ? <TextField size={"small"}
                                                   defaultValue={esfrRecordDetails.esfrRecordDetailData?.SdrDetails?.PartDetails?.PartDescription}
                                                   className={"sdr-status-edit"}/>
                                : esfrRecordDetails.esfrRecordDetailData?.SdrDetails?.PartDetails?.PartDescription
                            }
                        </ListItem>
                    </Grid>
                    <Grid item xs={4}>
                        <ListItem>
                            {editable ? <TextField size={"small"}
                                                   defaultValue={esfrRecordDetails.esfrRecordDetailData?.SdrDetails?.PartDetails?.PartManufacturerSerialNumber}
                                                   className={"sdr-status-edit"}/>
                                : esfrRecordDetails.esfrRecordDetailData?.SdrDetails?.PartDetails?.PartManufacturerSerialNumber
                            }
                        </ListItem>
                    </Grid>
                    <Grid item xs={4}>
                        <ListItem>
                            {editable ? <TextField size={"small"}
                                                   defaultValue={esfrRecordDetails.esfrRecordDetailData?.SdrDetails?.PartDetails?.PartTrackingNumber}
                                                   className={"sdr-status-edit"}/>
                                : esfrRecordDetails.esfrRecordDetailData?.SdrDetails?.PartDetails?.PartTrackingNumber
                            }
                        </ListItem>
                    </Grid>
                </Grid>
                <Grid className={"sdr-status-item"} container spacing={3}>
                    <Grid item xs={4}>
                        <ListItem>Part Serial number</ListItem>
                    </Grid>
                    <Grid item xs={4}>
                        <ListItem>Part Condition</ListItem>
                    </Grid>
                    <Grid item xs={4}>
                        <ListItem>Part Location</ListItem>
                    </Grid>
                </Grid>
                <Grid className={"sdr-status-description"} container spacing={3}>
                    <Grid item xs={4}>
                        <ListItem>
                            {editable ? <TextField size={"small"}
                                                   defaultValue={esfrRecordDetails.esfrRecordDetailData?.SdrDetails?.PartDetails?.PartSerialNumber}
                                                   className={"sdr-status-edit"}/>
                                : esfrRecordDetails.esfrRecordDetailData?.SdrDetails?.PartDetails?.PartSerialNumber
                            }
                        </ListItem>
                    </Grid>
                    <Grid item xs={4}>
                        <ListItem>
                            {editable ? <TextField size={"small"}
                                                   defaultValue={esfrRecordDetails.esfrRecordDetailData?.SdrDetails?.PartDetails?.PartCondition}
                                                   className={"sdr-status-edit"}/>
                                : esfrRecordDetails.esfrRecordDetailData?.SdrDetails?.PartDetails?.PartCondition
                            }
                        </ListItem>
                    </Grid>
                    <Grid item xs={4}>
                        <ListItem>
                            {editable ? <TextField size={"small"}
                                                   defaultValue={esfrRecordDetails.esfrRecordDetailData?.SdrDetails?.PartDetails?.PartLocation}
                                                   className={"sdr-status-edit"}/>
                                : esfrRecordDetails.esfrRecordDetailData?.SdrDetails?.PartDetails?.PartLocation
                            }
                        </ListItem>
                    </Grid>
                </Grid>
            </Grid>
            <Grid className={"sdr-status-grid"}
                  sx={{borderLeft: 1, borderRight: 1, borderBottom: 1, borderColor: "#E6E6E6"}}>
                <Grid className={"sdr-status-title"}>Origin Details</Grid>
                <Grid className={"sdr-status-item"} container spacing={3}>
                    <Grid item xs={4}>
                        <ListItem>Inspection Type</ListItem>
                    </Grid>
                    <Grid item xs={4}>
                        <ListItem>CAL Document</ListItem>
                    </Grid>
                    <Grid item xs={4}>
                        <ListItem>MFR Source</ListItem>
                    </Grid>
                </Grid>
                <Grid className={"sdr-status-description"} container spacing={3}>
                    <Grid item xs={4}>
                        <ListItem>
                            {editable ? <TextField size={"small"}
                                                   defaultValue={esfrRecordDetails.esfrRecordDetailData?.OriginDetails?.InspectionType}
                                                   className={"sdr-status-edit"}/>
                                : esfrRecordDetails.esfrRecordDetailData?.OriginDetails?.InspectionType
                            }
                        </ListItem>
                    </Grid>
                    <Grid item xs={4}>
                        <ListItem>
                            {editable ? <TextField size={"small"}
                                                   defaultValue={esfrRecordDetails.esfrRecordDetailData?.OriginDetails?.CalDoc}
                                                   className={"sdr-status-edit"}/>
                                : esfrRecordDetails.esfrRecordDetailData?.OriginDetails?.CalDoc
                            }
                        </ListItem>
                    </Grid>
                    <Grid item xs={4}>
                        <ListItem>
                            {editable ? <TextField size={"small"}
                                                   defaultValue={esfrRecordDetails.esfrRecordDetailData?.OriginDetails?.MfrSource}
                                                   className={"sdr-status-edit"}/>
                                : esfrRecordDetails.esfrRecordDetailData?.OriginDetails?.MfrSource
                            }
                        </ListItem>
                    </Grid>
                </Grid>
                <Grid className={"sdr-status-item"} container spacing={3}>
                    <Grid item xs={4}>
                        <ListItem>Spec #</ListItem>
                    </Grid>
                    <Grid item xs={4}>
                        <ListItem>Detection Method</ListItem>
                    </Grid>
                </Grid>
                <Grid className={"sdr-status-description"} container spacing={3}>
                    <Grid item xs={4}>
                        <ListItem>
                            {editable ? <TextField size={"small"}
                                                   defaultValue={esfrRecordDetails.esfrRecordDetailData?.OriginDetails?.SpecIdentifier}
                                                   className={"sdr-status-edit"}/>
                                : esfrRecordDetails.esfrRecordDetailData?.OriginDetails?.SpecIdentifier
                            }
                        </ListItem>
                    </Grid>
                    <Grid item xs={4}>
                        <ListItem>
                            {editable ? <TextField size={"small"}
                                                   defaultValue={esfrRecordDetails.esfrRecordDetailData?.OriginDetails?.DetectionMethod}
                                                   className={"sdr-status-edit"}/>
                                : esfrRecordDetails.esfrRecordDetailData?.OriginDetails?.DetectionMethod
                            }
                        </ListItem>
                    </Grid>
                </Grid>
            </Grid>
            <Grid className={"sdr-status-grid"}
                  sx={{borderLeft: 1, borderRight: 1, borderBottom: 1, borderColor: "#E6E6E6"}}>
                <Grid className={"sdr-status-title"}>Discrepancy</Grid>
                <Grid className={"sdr-status-item"} container spacing={3}>
                    <Grid item xs={4}>
                        <ListItem>Exceeds Manufacturer Limits</ListItem>
                    </Grid>
                    <Grid item xs={4}>
                        <ListItem>Discrepancy Type</ListItem>
                    </Grid>
                    <Grid item xs={4}>
                        <ListItem>Discrepancy Part Info</ListItem>
                    </Grid>
                </Grid>
                <Grid className={"sdr-status-description"} container spacing={3}>
                    <Grid item xs={4}>
                        <ListItem>
                            {editable ? <TextField size={"small"}
                                                   defaultValue={esfrRecordDetails.esfrRecordDetailData?.DiscrepancyDetails?.IsManufacturingLimitExceeded ? "Yes" : "No"}
                                                   className={"sdr-status-edit"}/>
                                : esfrRecordDetails.esfrRecordDetailData?.DiscrepancyDetails?.IsManufacturingLimitExceeded ? "Yes" : "No"
                            }
                        </ListItem>
                    </Grid>
                    <Grid item xs={4}>
                        <ListItem>
                            {editable ? <TextField size={"small"}
                                                   defaultValue={esfrRecordDetails.esfrRecordDetailData?.DiscrepancyDetails?.DiscrepancyType}
                                                   className={"sdr-status-edit"}/>
                                : esfrRecordDetails.esfrRecordDetailData?.DiscrepancyDetails?.DiscrepancyType
                            }
                        </ListItem>
                    </Grid>
                    <Grid item xs={4}>
                        <ListItem>
                            {editable ? <TextField size={"small"}
                                                   defaultValue={esfrRecordDetails.esfrRecordDetailData?.DiscrepancyDetails?.DiscrepancyPartComments}
                                                   className={"sdr-status-edit"}/>
                                : esfrRecordDetails.esfrRecordDetailData?.DiscrepancyDetails?.DiscrepancyPartComments
                            }
                        </ListItem>
                    </Grid>
                </Grid>
                <Grid className={"sdr-status-item"} container spacing={3}>
                    <Grid item xs={4}>
                        <ListItem>Zone</ListItem>
                    </Grid>
                    <Grid item xs={4}>
                        <ListItem>Defect Location</ListItem>
                    </Grid>
                    <Grid item xs={4}>
                        <ListItem>Location Details</ListItem>
                    </Grid>
                </Grid>
                <Grid className={"sdr-status-description"} container spacing={3}>
                    <Grid item xs={4}>
                        <ListItem>
                            {editable ? <TextField size={"small"}
                                                   defaultValue={esfrRecordDetails.esfrRecordDetailData?.LocationDetails?.Zone}
                                                   className={"sdr-status-edit"}/>
                                : esfrRecordDetails.esfrRecordDetailData?.LocationDetails?.Zone
                            }
                        </ListItem>
                    </Grid>
                    <Grid item xs={4}>
                        <ListItem>
                            {editable ? <TextField size={"small"}
                                                   defaultValue={esfrRecordDetails.esfrRecordDetailData?.LocationDetails?.DefectLocation}
                                                   className={"sdr-status-edit"}/>
                                : esfrRecordDetails.esfrRecordDetailData?.LocationDetails?.DefectLocation
                            }
                        </ListItem>
                    </Grid>
                    <Grid item xs={4}>
                        <ListItem>
                            {editable ? <TextField size={"small"}
                                                   defaultValue={esfrRecordDetails.esfrRecordDetailData?.LocationDetails?.CoordinateLocationDetails}
                                                   className={"sdr-status-edit"}/>
                                : esfrRecordDetails.esfrRecordDetailData?.LocationDetails?.CoordinateLocationDetails
                            }
                        </ListItem>
                    </Grid>
                </Grid>
            </Grid>
            <Box sx={{...sxBox}}>
            </Box>
            {props.selectedIndex !== 2 && <Grid sx={{marginTop: "10px", marginBottom: "10px"}}>
                <Checkbox sx={{
                    marginLeft: "5px", color: "#6244BB",
                    '&.Mui-checked': {
                        color: "#6244BB",
                    },
                }}/> Flag for follow up
            </Grid>}
            {props.selectedIndex !== 2 && <Grid spacing={3} container sx={{
                boxShadow: "0px -4px 8px 0px rgba(51, 51, 51, 0.12)", width: "200%",
                marginLeft: "0", marginTop: "10px", textTransform: "none"
            }}>
                <Grid item xs={8}></Grid>
                <Grid item xs={2}>
                    <Button sx={{
                        color: "#6244BB", borderColor: "#6244BB", width: "100px",
                        marginTop: "20px", marginBottom: "20px",
                    }} variant={"outlined"}
                            onClick={onClickEdit}
                    >{editable ? "Cancel" : "Edit"}</Button>
                </Grid>
                <Grid item xs={2}>
                    <Button sx={{
                        backgroundColor: "#6244BB", textTransform: "none", width: "100px",
                        marginTop: "20px", marginBottom: "20px"
                    }} variant={"contained"}>{editable ? "Save" : "Approve"}</Button>
                </Grid>
            </Grid>}
            <Menu
                anchorEl={anchorEl}
                id="help-menu"
                open={showACDetails}
                onClose={closeACDetails}
                PaperProps={{
                    elevation: 0,
                    sx: {
                        top: "100px",
                        width: "310px",
                        overflow: "visible",
                        filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                        mt: 1.5,
                        "& .MuiAvatar-root": {width: 32, height: 32, ml: -0.5, mr: 1},
                        "&:before": {
                            content: "''",
                            display: "block",
                            position: "absolute",
                            top: 0,
                            right: 150,
                            width: 10,
                            height: 10,
                            bgcolor: "background.paper",
                            transform: "translateY(-50%) rotate(45deg)",
                            zIndex: 0,
                        },
                    },
                }}
                transformOrigin={{horizontal: "center", vertical: "top"}}
                anchorOrigin={{horizontal: 66, vertical: "bottom"}}
            >
                <Grid className={"view-details-dropdown"} container spacing={2}>
                    <Grid className={"view-details-left"} item xs={7}>
                        <ListItem>A/C Number</ListItem>
                    </Grid>
                    <Grid className={"view-details-right"} item xs={5}>
                        <ListItem>{esfrRecordDetails.esfrRecordDetailData?.FleetInfo?.LicenseNumber}</ListItem>
                    </Grid>
                </Grid>
                <Grid className={"view-details-dropdown"} container spacing={2}>
                    <Grid className={"view-details-left"} item xs={7}>
                        <ListItem>A/C Manufacturer</ListItem>
                    </Grid>
                    <Grid className={"view-details-right"} item xs={5}>
                        <ListItem>{esfrRecordDetails.esfrRecordDetailData?.FleetInfo?.ManufacturedBy}</ListItem>
                    </Grid>
                </Grid>
                <Grid className={"view-details-dropdown"} container spacing={2}>
                    <Grid className={"view-details-left"} item xs={7}>
                        <ListItem>A/C Model</ListItem>
                    </Grid>
                    <Grid className={"view-details-right"} item xs={5}>
                        <ListItem>{esfrRecordDetails.esfrRecordDetailData?.FleetInfo?.ManufacturerPartNumber}</ListItem>
                    </Grid>
                </Grid>
                <Grid className={"view-details-dropdown"} container spacing={2}>
                    <Grid className={"view-details-left"} item xs={7}>
                        <ListItem>A/C Serial Number</ListItem>
                    </Grid>
                    <Grid className={"view-details-right"} item xs={5}>
                        <ListItem>{esfrRecordDetails.esfrRecordDetailData?.FleetInfo?.ManufacturerSerialNumber}</ListItem>
                    </Grid>
                </Grid>
                <Grid className={"view-details-dropdown"} container spacing={2}>
                    <Grid className={"view-details-left"} item xs={7}>
                        <ListItem>A/C Total Time</ListItem>
                    </Grid>
                    <Grid className={"view-details-right"} item xs={5}>
                        <ListItem>{esfrRecordDetails.esfrRecordDetailData?.FleetInfo?.TotalAircraftTime}</ListItem>
                    </Grid>
                </Grid>
                <Grid className={"view-details-dropdown"} container spacing={2}>
                    <Grid className={"view-details-left"} item xs={7}>
                        <ListItem>A/C Total Cycles</ListItem>
                    </Grid>
                    <Grid className={"view-details-right"} item xs={5}>
                        <ListItem>{esfrRecordDetails.esfrRecordDetailData?.FleetInfo?.TotalAircraftCycles}</ListItem>
                    </Grid>
                </Grid>
                <Grid className={"view-details-dropdown"} container spacing={2}>
                    <Grid className={"view-details-left"} item xs={7}>
                        <ListItem>Flight #</ListItem>
                    </Grid>
                    <Grid className={"view-details-right"} item xs={5}>
                        <ListItem>{esfrRecordDetails.esfrRecordDetailData?.FleetInfo?.TailNumber}</ListItem>
                    </Grid>
                </Grid>
            </Menu>
            {props.selectedSdrId === null && <Grid>Please select on SDR to view it.</Grid>}
        </Grid>
    );
};

export default ViewSdrData;