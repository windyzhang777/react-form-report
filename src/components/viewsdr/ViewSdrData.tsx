import {Box, Grid, ListItem, Menu, Typography} from "@mui/material";
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