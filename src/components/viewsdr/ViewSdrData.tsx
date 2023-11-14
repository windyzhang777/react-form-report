import {Box, Button, Checkbox, Grid, ListItem, Menu, Typography} from "@mui/material";
import { ViewSdrDataProps } from "src/commons/types";
import "./viewSdrData.css";
import {MouseEvent, useState} from "react";

const ViewSdrData = (props: ViewSdrDataProps) => {

    const opeartorControlumber = "34564567320230714";
    const [open, setOpen] = useState(false);
    const [anchorEl, setAnchorEl] = useState<Element | null>(null);

    const sxBox = {
        borderBottom: 1, 
        borderColor: 'divider',
        width: '190%',
        fontWeight: '600',
        marginLeft: '15px'
    }

    const openACDetails = (event: MouseEvent) => {
        setAnchorEl(event.currentTarget);
    }

    const closeACDetails = () => {
        setAnchorEl(null);
    }

    const showACDetails: boolean = Boolean(anchorEl);


    return (
      <Grid item md={6}>
        <Box sx={{ ...sxBox }}>
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
                  <ListItem>{opeartorControlumber}</ListItem>
              </Grid>
              <Grid item xs={6}>
                  <ListItem onClick={openACDetails}> <u className={"view-details-text"}>View Details</u></ListItem>
              </Grid>
          </Grid>
          <Grid className={"sdr-status-grid"} sx={{borderLeft: 1, borderRight: 1, borderBottom: 1, borderColor: "#E6E6E6"}}>
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
              <Grid className={"sdr-status-description"}  container spacing={3} >
                  <Grid item xs={4}>
                      <ListItem>18/08/2023</ListItem>
                  </Grid>
                  <Grid item xs={4}>
                      <ListItem>3945748</ListItem>
                  </Grid>
                  <Grid item xs={4}>
                      <ListItem>IAH</ListItem>
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
              <Grid className={"sdr-status-description"} container spacing={3} >
                  <Grid item xs={4}>
                      <ListItem>3351</ListItem>
                  </Grid>
                  <Grid item xs={4}>
                      <ListItem>K</ListItem>
                  </Grid>
                  <Grid item xs={4}>
                      <ListItem>L</ListItem>
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
              <Grid className={"sdr-status-description"} container spacing={3} >
                  <Grid item xs={4}>
                      <ListItem>IN</ListItem>
                  </Grid>
                  <Grid item xs={4}>
                      <ListItem>V</ListItem>
                  </Grid>
              </Grid>
              <Grid className={"sdr-status-item"} container spacing={1}>
                  <Grid item xs={12}>
                      <ListItem>Discrepancy/Corrective Action Summary</ListItem>
                  </Grid>
              </Grid>
              <Grid className={"sdr-status-description"} container spacing={1} >
                  <Grid item xs={12}>
                      <ListItem>EXIT LIGHT ABOVE L1 DOOR WILL NOT ILLUMINATE (REF. AAR NR 99978502). REPLACED BATTERY PACK M1675 WITH NEW BATTERY PACK IAW B737 AMM 33-51-06-960-805. INSTALLATION TEST GOOD. (WORK ACCOMPLISHED BY V937131 AND AAR QC A-83 V935067).</ListItem>
                  </Grid>
              </Grid>
          </Grid>
          <Grid className={"sdr-status-grid"} sx={{borderLeft: 1, borderRight: 1, borderBottom: 1, borderColor: "#E6E6E6"}}>
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
              <Grid className={"sdr-status-description"}  container spacing={3} >
                  <Grid item xs={4}>
                      <ListItem>BATTERY PACK</ListItem>
                  </Grid>
                  <Grid item xs={4}>
                      <ListItem>d71701100</ListItem>
                  </Grid>
                  <Grid item xs={4}>
                      <ListItem>GOODRICH LIGHTI</ListItem>
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
              <Grid className={"sdr-status-description"} container spacing={3} >
                  <Grid item xs={4}>
                      <ListItem>437841</ListItem>
                  </Grid>
                  <Grid item xs={4}>
                      <ListItem>INOP</ListItem>
                  </Grid>
                  <Grid item xs={4}>
                      <ListItem>M1675</ListItem>
                  </Grid>
              </Grid>
          </Grid>
          <Grid className={"sdr-status-grid"} sx={{borderLeft: 1, borderRight: 1, borderBottom: 1, borderColor: "#E6E6E6"}}>
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
              <Grid className={"sdr-status-description"}  container spacing={3} >
                  <Grid item xs={4}>
                      <ListItem>XXXXXX</ListItem>
                  </Grid>
                  <Grid item xs={4}>
                      <ListItem>123456</ListItem>
                  </Grid>
                  <Grid item xs={4}>
                      <ListItem>XXXXXX</ListItem>
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
              <Grid className={"sdr-status-description"} container spacing={3} >
                  <Grid item xs={4}>
                      <ListItem>34567</ListItem>
                  </Grid>
                  <Grid item xs={4}>
                      <ListItem>Visual</ListItem>
                  </Grid>
              </Grid>
          </Grid>
          <Grid className={"sdr-status-grid"} sx={{borderLeft: 1, borderRight: 1, borderBottom: 1, borderColor: "#E6E6E6"}}>
              <Grid className={"sdr-status-title"}>Part Information</Grid>
              <Grid className={"sdr-status-item"} container spacing={3}>
                  <Grid item xs={4}>
                      <ListItem>Discrepancy</ListItem>
                  </Grid>
                  <Grid item xs={4}>
                      <ListItem>Discrepancy Type</ListItem>
                  </Grid>
                  <Grid item xs={4}>
                      <ListItem>Discrepancy Part Info</ListItem>
                  </Grid>
              </Grid>
              <Grid className={"sdr-status-description"}  container spacing={3} >
                  <Grid item xs={4}>
                      <ListItem>Yes</ListItem>
                  </Grid>
                  <Grid item xs={4}>
                      <ListItem>123456</ListItem>
                  </Grid>
                  <Grid item xs={4}>
                      <ListItem>XXXXXX</ListItem>
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
              <Grid className={"sdr-status-description"} container spacing={3} >
                  <Grid item xs={4}>
                      <ListItem>34567</ListItem>
                  </Grid>
                  <Grid item xs={4}>
                      <ListItem>Fwd Pit</ListItem>
                  </Grid>
                  <Grid item xs={4}>
                      <ListItem>Visual</ListItem>
                  </Grid>
              </Grid>
          </Grid>
          <Box sx={{ ...sxBox }}>
          </Box>
          <Checkbox sx={{marginLeft: "5px"}} /> Flag for follow up
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
                      "& .MuiAvatar-root": { width: 32, height: 32, ml: -0.5, mr: 1 },
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
              transformOrigin={{ horizontal: "center", vertical: "top" }}
              anchorOrigin={{ horizontal: 66, vertical: "bottom" }}
          >
              <Grid className={"view-details-dropdown"} container spacing={2}>
                  <Grid className={"view-details-left"} item xs={7}>
                      <ListItem>A/C Number</ListItem>
                  </Grid>
                  <Grid className={"view-details-right"} item xs={5}>
                      <ListItem>N37534</ListItem>
                  </Grid>
              </Grid>
              <Grid className={"view-details-dropdown"} container spacing={2}>
                  <Grid className={"view-details-left"} item xs={7}>
                      <ListItem>A/C Manufacturer</ListItem>
                  </Grid>
                  <Grid className={"view-details-right"} item xs={5}>
                      <ListItem>BOEING</ListItem>
                  </Grid>
              </Grid>
              <Grid className={"view-details-dropdown"} container spacing={2}>
                  <Grid className={"view-details-left"} item xs={7}>
                      <ListItem>A/C Model</ListItem>
                  </Grid>
                  <Grid className={"view-details-right"} item xs={5}>
                      <ListItem>737-9M9</ListItem>
                  </Grid>
              </Grid>
              <Grid className={"view-details-dropdown"} container spacing={2}>
                  <Grid className={"view-details-left"} item xs={7}>
                      <ListItem>A/C Serial Number</ListItem>
                  </Grid>
                  <Grid className={"view-details-right"} item xs={5}>
                      <ListItem>66121</ListItem>
                  </Grid>
              </Grid>
              <Grid className={"view-details-dropdown"} container spacing={2}>
                  <Grid className={"view-details-left"} item xs={7}>
                      <ListItem>A/C Total Time</ListItem>
                  </Grid>
                  <Grid className={"view-details-right"} item xs={5}>
                      <ListItem>4344.00</ListItem>
                  </Grid>
              </Grid>
              <Grid className={"view-details-dropdown"} container spacing={2}>
                  <Grid className={"view-details-left"} item xs={7}>
                      <ListItem>A/C Total Cycles</ListItem>
                  </Grid>
                  <Grid className={"view-details-right"} item xs={5}>
                      <ListItem>6641</ListItem>
                  </Grid>
              </Grid>
              <Grid className={"view-details-dropdown"} container spacing={2}>
                  <Grid className={"view-details-left"} item xs={7}>
                      <ListItem>Flight #</ListItem>
                  </Grid>
                  <Grid className={"view-details-right"} item xs={5}>
                      <ListItem>2631</ListItem>
                  </Grid>
              </Grid>
          </Menu>
          {props.selectedSdrId === null && <Grid>Please select on SDR to view it.</Grid>}
      </Grid>
    );
};

export default ViewSdrData;