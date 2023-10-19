import { Box, Grid, Tab, Tabs } from "@mui/material";
import React, { useState } from "react";
import "./homescreen.css";
import CommonDataGrid from "../commondatagrid/commondatagrid";
import { ReportStatus } from "src/commons/types";
import TabPanel from "src/commons/TabPanel";

// interface TabPanelProps {
//     children?: React.ReactNode;
//     index: number;
//     value: number;
// };

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
    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    const updateOpenSdrCount = (count: number) => {
        setOpenSdrCount(count);
    }

    return (
        <Grid container spacing={2} sx={{ m: 2 }} >
            <Grid item md={6}>
                <Box sx={{ ...sxBox }}>
                    <Tabs value={value} onChange={handleChange} aria-label="homeScreenSdrTabs">
                        <Tab  {...a11yProps(0)} label={`New SDRs(${openSdrCount})`} id="NewsdrTab" />
                        <Tab {...a11yProps(1)} label={`Flagged for Follow up(${flaggedSdrCount})`} id="Flaggedforfollowup" />
                        <Tab {...a11yProps(2)} label={`Approved SDRs(${approvedSdrCount})`} id="Approvedsdr" />
                    </Tabs>
                </Box>
                <TabPanel value={value} index={0}>
                    <CommonDataGrid reportStatus={ReportStatus[value]} reportIndex={value} updateOpenSdrCount={updateOpenSdrCount} />
                </TabPanel>
            </Grid>
            <Grid md={6} item>
                <Grid container
                    spacing={0}
                    direction="column"
                    alignItems="center"
                    justifyContent="center"
                    sx={{ minHeight: '85vh' }}>
                    <p className="sdrDefaultMsg">Please select an SDR to view it. </p>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default HomeScreen;