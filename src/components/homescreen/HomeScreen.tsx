import { Box, Grid, Tab, Tabs } from "@mui/material";
import React, {useEffect, useState} from "react";
import "../homescreen/homescreen.css";
import CommonDataGrid from "../commondatagrid/commondatagrid";
import { ReportStatus } from "src/commons/types";
import TabPanel from "src/commons/TabPanel";
import ViewSdrData from "../viewsdr/ViewSdrData";
import {getAllSdrs} from "../../redux/ducks/getAllSdrs";
import {useAppDispatch} from "../../redux/hooks";

const sxBox = {
    borderBottom: 1, 
    borderColor: 'divider'
}

function a11yProps(index: number) {
    return {
        id: `esfr-tabs-${index}`,
        "aria-controls": `esfr-tabpanels-${index}`,
        sx: {
            color: "#666666",
            fontWeight: 500,
            fontSize: "16px",
            textTransform: "capitalize",
            minWidth: "20%",
            width: "25%",
        }
    }
};

const HomeScreen = () => {
    const [value, setValue]= useState<number>(0);
    const [openSdrCount, setOpenSdrCount] = useState<number>(0);
    const [flaggedSdrCount, setFlaggedSdrCount] = useState<number>(0);
    const [approvedSdrCount, setApprovedSdrCount] = useState<number>(0);
    const [viewSdrFlag, setViewSdrFlag] = useState<boolean>(false);
    const [selectedSdrId, setSelectedSdrId] = useState<number>(0);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(getAllSdrs(2));
        dispatch(getAllSdrs(3));
        dispatch(getAllSdrs(4));
    }, []);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
        setViewSdrFlag(false);
        setSelectedSdrId(0);
    };

    const updateSdrCount = (index: number, count: number) => {
        switch(index){
            case 0:
                setOpenSdrCount(count);
                break;
            case 1:
                setFlaggedSdrCount(count);
                break;
            case 2:
                setApprovedSdrCount(count);
                break;
        }
    }

    return (
      <Grid container spacing={2} sx={{ m: 0 }}>
        <Grid item md={6}>
          <Box sx={{ ...sxBox }}>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="homeScreenSdrTabs"
            >
              <Tab
                {...a11yProps(0)}
                label={`New SDR/SFRs (${openSdrCount})`}
                id="NewsdrTab"
              />
              <Tab
                {...a11yProps(1)}
                label={`Flagged for Follow up (${flaggedSdrCount})`}
                id="Flaggedforfollowup"
              />
              <Tab
                {...a11yProps(2)}
                label={`Approved SDRs (${approvedSdrCount})`}
                id="Approvedsdr"
              />
            </Tabs>
          </Box>
          <TabPanel value={value}>
            <CommonDataGrid
              reportStatus={ReportStatus[value]}
              reportIndex={value}
              updateSdrCount={updateSdrCount}
              setViewSdrFlag={setViewSdrFlag}
              setSelectedSdrId={setSelectedSdrId}
            />
          </TabPanel>
        </Grid>
        <Grid item md={6}>
          {viewSdrFlag ? (
            <ViewSdrData selectedSdrId={selectedSdrId} selectedIndex={value} />
          ) : (
            <Grid
              container
              spacing={0}
              direction="column"
              alignItems="center"
              justifyContent="center"
              sx={{ minHeight: "85vh" }}
            >
              <p className="sdrDefaultMsg">Please select an SDR to view it. </p>
            </Grid>
          )}
        </Grid>
      </Grid>
    );
};

export default HomeScreen;