import { Box, Checkbox, Grid, ListItem, TextareaAutosize, TextField } from "@mui/material";
import moment from "moment";
import { useEffect, useState } from "react";
import CommonButtonGroup from "src/commons/ButtonGroup";
import CommonLoader from "src/commons/CommonLoader";
import Menu from 'src/commons/Menu';
import { EsfrRecordDetailStateType, InspectionType, ViewSdrDataProps } from "src/commons/types";
import { getEsfrRecordDetails } from "src/redux/ducks/getEsfrRecordDetails";
import { useAppDispatch, useAppSelector } from "src/redux/hooks";
import "./viewSdrData.css";

const ViewSdrData = ({
    handleApprove,
    selectedIndex,
    selectedSdrId,
    selectedType,
}: ViewSdrDataProps) => {
    const [editable, setEditable] = useState(false);
    const dispatch = useAppDispatch();
    const esfrRecordDetails: EsfrRecordDetailStateType = useAppSelector(state => state.esfrRecordDetail);
    const [flagFollowUp, setFlagFollowUp] = useState<boolean>(selectedIndex === 1);

    useEffect(() => {
        dispatch(getEsfrRecordDetails(selectedSdrId, selectedType));
        setFlagFollowUp(selectedIndex === 1);
    }, [selectedSdrId]);

    const sxBox = {
        borderBottom: 1,
        borderColor: 'divider',
        width: '190%',
        fontWeight: '600',
        marginLeft: '15px',
    }

    const onClickEdit = () => {
        setEditable(!editable);
    }

    const onClickApprove = () => {
        handleApprove(flagFollowUp);
    }

    return (
        <Grid item md={6}
              sx={{boxShadow: "-4px 0px 4px 0px rgba(51, 51, 51, 0.12)", marginTop: "-30px", paddingTop: "30px"}}>
            <Box sx={{...sxBox}}>
                <p>Service Difficulty Report - #{selectedSdrId}</p>
            </Box>
            {esfrRecordDetails.loading ? <CommonLoader></CommonLoader> :
                <>
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
                            <Menu button={<u className={"view-details-text"}>View Details</u>} id="view-details-menu">
                                <Grid className={"view-details-dropdown"} container spacing={2}>
                                    <Grid className={"view-details-left"} item xs={6}>
                                        <ListItem>A/C Number</ListItem>
                                    </Grid>
                                    <Grid className={"view-details-right"} item>
                                        <ListItem>{esfrRecordDetails.esfrRecordDetailData?.FleetInfo?.LicenseNumber}</ListItem>
                                    </Grid>
                                </Grid>
                                <Grid className={"view-details-dropdown"} container spacing={2}>
                                    <Grid className={"view-details-left"} item xs={6}>
                                        <ListItem>A/C Manufacturer</ListItem>
                                    </Grid>
                                    <Grid className={"view-details-right"} item>
                                        <ListItem>{esfrRecordDetails.esfrRecordDetailData?.FleetInfo?.ManufacturedBy}</ListItem>
                                    </Grid>
                                </Grid>
                                <Grid className={"view-details-dropdown"} container spacing={2}>
                                    <Grid className={"view-details-left"} item xs={6}>
                                        <ListItem>A/C Model</ListItem>
                                    </Grid>
                                    <Grid className={"view-details-right"} item>
                                        <ListItem>{esfrRecordDetails.esfrRecordDetailData?.FleetInfo?.ManufacturerPartNumber}</ListItem>
                                    </Grid>
                                </Grid>
                                <Grid className={"view-details-dropdown"} container spacing={2}>
                                    <Grid className={"view-details-left"} item xs={6}>
                                        <ListItem>A/C Serial Number</ListItem>
                                    </Grid>
                                    <Grid className={"view-details-right"} item>
                                        <ListItem>{esfrRecordDetails.esfrRecordDetailData?.FleetInfo?.ManufacturerSerialNumber}</ListItem>
                                    </Grid>
                                </Grid>
                                <Grid className={"view-details-dropdown"} container spacing={2}>
                                    <Grid className={"view-details-left"} item xs={6}>
                                        <ListItem>A/C Total Time</ListItem>
                                    </Grid>
                                    <Grid className={"view-details-right"} item>
                                        <ListItem>{esfrRecordDetails.esfrRecordDetailData?.FleetInfo?.TotalAircraftTime}</ListItem>
                                    </Grid>
                                </Grid>
                                <Grid className={"view-details-dropdown"} container spacing={2}>
                                    <Grid className={"view-details-left"} item xs={6}>
                                        <ListItem>A/C Total Cycles</ListItem>
                                    </Grid>
                                    <Grid className={"view-details-right"} item>
                                        <ListItem>{esfrRecordDetails.esfrRecordDetailData?.FleetInfo?.TotalAircraftCycles}</ListItem>
                                    </Grid>
                                </Grid>
                                <Grid className={"view-details-dropdown"} container spacing={2}>
                                    <Grid className={"view-details-left"} item xs={6}>
                                        <ListItem>Flight #</ListItem>
                                    </Grid>
                                    <Grid className={"view-details-right"} item>
                                        <ListItem>{esfrRecordDetails.esfrRecordDetailData?.FleetInfo?.TailNumber}</ListItem>
                                    </Grid>
                                </Grid>
                            </Menu>
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
                                        <TextField size={"small"}
                                                   defaultValue={esfrRecordDetails.esfrRecordDetailData?.Station}
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
                                        <TextareaAutosize minRows={2} style={{width: "190%", fontSize: "16px"}}
                                                          value={esfrRecordDetails.esfrRecordDetailData?.FleetInfo?.CorrectiveActions} />
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
                                                           defaultValue={esfrRecordDetails.esfrRecordDetailData?.OriginDetails?.InspectionType ? InspectionType.get(esfrRecordDetails.esfrRecordDetailData?.OriginDetails?.InspectionType) : ""}
                                                           className={"sdr-status-edit"}/>
                                        : esfrRecordDetails.esfrRecordDetailData?.OriginDetails?.InspectionType ? InspectionType.get(esfrRecordDetails.esfrRecordDetailData?.OriginDetails?.InspectionType) : ""
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
                    {selectedIndex !== 2 && <Grid sx={{marginTop: "10px", marginBottom: "10px"}}>
                        <Checkbox sx={{
                            marginLeft: "5px", color: "#6244BB",
                            '&.Mui-checked': {
                                color: "#6244BB",
                            },
                        }} checked={flagFollowUp} onChange={() => setFlagFollowUp(!flagFollowUp)}/> Flag for follow up
                    </Grid>}
                    {selectedIndex !== 2 && <Grid spacing={3} container sx={{
                        boxShadow: "0px -4px 8px 0px rgba(51, 51, 51, 0.12)", width: "200%",
                        marginLeft: "0", marginTop: "10px", paddingTop: "20px", textTransform: "none"
                    }}>
                    <CommonButtonGroup
                        labelPrimary={editable ? "Save" : "Approve"}
                        labelSecondary={editable ? "Cancel" : "Edit"}
                        onClickPrimary={onClickApprove}
                        onClickSecondary={onClickEdit}
                        placeEnd
                    />
                    </Grid>}
                    {selectedSdrId === null && <Grid>Please select on SDR to view it.</Grid>}
                </>}
        </Grid>
    );
};

export default ViewSdrData;