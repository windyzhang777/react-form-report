import { Box, Grid } from "@mui/material";
import { ViewSdrDataProps } from "src/commons/types";

const ViewSdrData = (props: ViewSdrDataProps) => {
    console.log(props.selectedSdrId);

    const sxBox = {
        borderBottom: 1, 
        borderColor: 'divider',
    }

    return (
      <Grid item md={6}>
        <Box sx={{ ...sxBox }}>
            <p>Service Difficulty Report - #{props.selectedSdrId}</p>
        </Box>
          {props.selectedSdrId === null && <Grid>Please select on SDR to view it.</Grid>}
      </Grid>
    );
};

export default ViewSdrData;