import {Box, Grid, ListItem} from "@mui/material";
import { ViewSdrDataProps } from "src/commons/types";
import "./viewSdrData.css";

const ViewSdrData = (props: ViewSdrDataProps) => {

    const opeartorControlumber = "34564567320230714";

    const sxBox = {
        borderBottom: 1, 
        borderColor: 'divider',
        width: '190%',
        fontWeight: '600',
        marginLeft: '15px'
    }

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
                  <ListItem> <u className={"view-details-text"}>View Details</u></ListItem>
              </Grid>
          </Grid>



          {props.selectedSdrId === null && <Grid>Please select on SDR to view it.</Grid>}
      </Grid>
    );
};

export default ViewSdrData;