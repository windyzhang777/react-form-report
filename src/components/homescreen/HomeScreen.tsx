import { Box, Grid, Tab, Tabs } from "@mui/material";
import React from "react";
// import * as React from 'react';
import "./homescreen.css";
import CommonDataGrid from "../commondatagrid/commondatagrid";

// interface TabPanelProps {
//     children?: React.ReactNode;
//     index: number;
//     value: number;
// };

const sxBox = {
    borderBottom: 1, 
    borderColor: 'divider'
}

const TabPanel = (props: any) => {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ padding: "30px 0 0" }}>
                    <Box>{children}</Box>
                </Box>
            )}
        </div>
    );
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
            "& .MuiButtonBase-root-MuiTab-root.Mui-selected": {
                color: " #002244",
                fontFamily: "Open Sans",
                fontSize: 16,
                fontWeight: 600,
                lineHeight: 24,
                letterSpacing: 0,
                textAlign: "center",
                background: "#666666"
            },
        }
    }
};

const HomeScreen = () => {
    const [value, setValue]= React.useState(0);
    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    return (
        <Grid container spacing={2} sx={{ m: 2 }} >
            <Grid item md={6}>
                <Box sx={{ ...sxBox }}>
                    <Tabs value={value} onChange={handleChange} className="hm-tabs" aria-label="homeScreenSdrTabs"
                        TabIndicatorProps={{ style: { backgroundColor: "#002244", height: 4 } }}>
                        <Tab  {...a11yProps(0)} label="New SDRs(0)" id="NewsdrTab" />
                        <Tab {...a11yProps(1)} label="Flagged for Follow up(0)" id="Flaggedforfollowup" />
                        <Tab {...a11yProps(2)} label="Approved SDRs(0)" id="Approvedsdr" />
                    </Tabs>
                </Box>
                <TabPanel value={value} index={0}>
                    <CommonDataGrid />
                </TabPanel>
            </Grid>
            <Grid md={6} container 
                spacing={0} 
                direction="column" 
                alignItems="center"
                justifyContent="center"
                sx={{ minHeight: '85vh' }}>
                <p className="sdrDefaultMsg">Please select an SDR to view it. </p>
            </Grid>
        </Grid>
    );
};

export default HomeScreen;