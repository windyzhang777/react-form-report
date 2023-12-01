import {Alert, Box, Grid, Tab, Tabs} from "@mui/material";
import React, {useEffect, useState} from "react";
import "../homescreen/homescreen.css";
import CommonDataGrid from "../commondatagrid/commondatagrid";
import {SdrStatus, SelectedTab} from "src/commons/types";
import TabPanel from "src/commons/TabPanel";
import ViewSdrData from "../viewsdr/ViewSdrData";
import {getAllSdrs} from "../../redux/ducks/getAllSdrs";
import {useAppDispatch} from "../../redux/hooks";
import CommonLoader from "../../commons/CommonLoader";
import axiosInstance from "../../utils/axiosInstance";
import config from "../../utils/env.config";

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
}

const HomeScreen = () => {
    const [value, setValue] = useState<number>(0);
    const [openSdrCount, setOpenSdrCount] = useState<number>(0);
    const [flaggedSdrCount, setFlaggedSdrCount] = useState<number>(0);
    const [approvedSdrCount, setApprovedSdrCount] = useState<number>(0);
    const [viewSdrFlag, setViewSdrFlag] = useState<boolean>(false);
    const [selectedSdrId, setSelectedSdrId] = useState<number>(0);
    const [selectedIndex, setSelectedIndex] = useState<number>(0);
    const [selectedType, setSelectedType] = useState<string>("");
    const dispatch = useAppDispatch();
    const [openSDRApproved, setOpenSDRApproved] = useState<boolean>(false);
    const [openSDRApprovedWithFlag, setOpenSDRApprovedWithFlag] = useState<boolean>(false);
    const [approving, setApproving] = useState<boolean>(false);
    const [openFail, setOpenFail] = useState<boolean>(false);

    useEffect(() => {
        dispatch(getAllSdrs(SdrStatus.New));
        dispatch(getAllSdrs(SdrStatus.Flagged));
        dispatch(getAllSdrs(SdrStatus.Approved));
    }, []);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
        setViewSdrFlag(false);
        setSelectedSdrId(0);
    };

    const updateSdrCount = (index: number, count: number) => {
        switch (index) {
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

    const onClickApprove = (flag: boolean) => {
        setApproving(true);
        axiosInstance
            .post(`${config.apiBaseAddress}${config.URL_ESFR_APPROVE}`,
                {
                    "id": selectedSdrId,
                    "recordType": selectedType,
                    "statusId": flag ? SdrStatus.Flagged : SdrStatus.Approved
                })
            .then((res) => {
                setApproving(false);
                if (res && res.status === 200) {
                    dispatch(getAllSdrs(SdrStatus.New));
                    dispatch(getAllSdrs(SdrStatus.Flagged));
                    dispatch(getAllSdrs(SdrStatus.Approved));
                    flag ? setOpenSDRApprovedWithFlag(true) : setOpenSDRApproved(true);
                    setViewSdrFlag(false);
                    setSelectedSdrId(0);
                } else {
                    setOpenFail(true);
                }
            })
            .catch(() => {
                setApproving(false);
                setOpenFail(true);
            })
    }

    return (
        <Grid container spacing={2} sx={{m: 0}}>
            {openSDRApproved && <Alert sx={{position: "absolute", left: "47%"}} onClose={() => {
                setOpenSDRApproved(false)
            }} variant="filled" severity="success">SDR approved</Alert>}
            {openSDRApprovedWithFlag && <Alert sx={{position: "absolute", left: "42%"}} onClose={() => {
                setOpenSDRApprovedWithFlag(false)
            }} variant="filled" severity="success">SDR approved with flagged for follow-up</Alert>}
            {openFail && <Alert sx={{position: "absolute", left: "47%"}} onClose={() => {
                setOpenFail(false)
            }} variant="filled" severity="error">Fail to Approve</Alert>}
            {approving ? <CommonLoader></CommonLoader> :
                <>
                    <Grid item md={6}>
                        <Box sx={{...sxBox}}>
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
                                reportStatus={SelectedTab[value]}
                                reportIndex={value}
                                updateSdrCount={updateSdrCount}
                                setViewSdrFlag={setViewSdrFlag}
                                setSelectedSdrId={setSelectedSdrId}
                                setSelectedType={setSelectedType}
                                setSelectedIndex={setSelectedIndex}
                            />
                        </TabPanel>
                    </Grid>
                    <Grid item md={6}>
                        {viewSdrFlag ? (
                            <ViewSdrData selectedSdrId={selectedSdrId} selectedIndex={selectedIndex}
                                         selectedType={selectedType}
                                         onClickApprove={onClickApprove}/>
                        ) : (
                            <Grid
                                container
                                spacing={0}
                                direction="column"
                                alignItems="center"
                                justifyContent="center"
                                sx={{minHeight: "85vh"}}
                            >
                                <p className="sdrDefaultMsg">Please select an SDR to view it. </p>
                            </Grid>
                        )}
                    </Grid>
                </>
            }
        </Grid>
    );
};

export default HomeScreen;