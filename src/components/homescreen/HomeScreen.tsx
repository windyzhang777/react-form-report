import { Box, Grid, Tab, Tabs } from "@mui/material";
import { SyntheticEvent, useState } from "react";
import CommonLoader from "src/commons/CommonLoader";
import CommonSnackbar from "src/commons/Snackbar";
import TabPanel from "src/commons/TabPanel";
import { SdrStatus, SelectedTab } from "src/commons/types";
import CommonDataGrid from "src/components/commondatagrid/commondatagrid";
import ViewSdrData from "src/components/viewsdr/ViewSdrData";
import { getAllSdrs } from "src/redux/ducks/getAllSdrs";
import { useAppDispatch } from "src/redux/hooks";
import axiosInstance from "src/utils/axiosInstance";
import config from "src/utils/env.config";
import "./homescreen.css";

const sxBox = {
    borderBottom: 1,
    borderColor: "divider",
};

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
            // whiteSpace: "nowrap",
        },
    };
}

const HomeScreen = () => {
    const [tabIndex, setTabIndex] = useState<number>(0);
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

    const handleTabChange = (event: SyntheticEvent, newValue: number) => {
        setTabIndex(newValue);
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
    };

    const handleApprove = (flag: boolean) => {
        setApproving(true);
        axiosInstance
            .post(`${config.apiBaseAddress}${config.URL_ESFR_APPROVE}`, {
                id: selectedSdrId,
                recordType: selectedType,
                statusId: flag ? SdrStatus.Flagged : SdrStatus.Approved,
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
            });
    };

    return (
        <Grid container>
            {openSDRApproved && (
                <CommonSnackbar
                    onClose={() => setOpenSDRApproved(false)}
                    severity="success"
                >
                    SDR approved
                </CommonSnackbar>
            )}
            {openSDRApprovedWithFlag && (
                <CommonSnackbar
                    onClose={() => setOpenSDRApprovedWithFlag(false)}
                    severity="success"
                >
                    SDR approved with flagged for follow-up
                </CommonSnackbar>
            )}
            {openFail && (
                <CommonSnackbar
                    onClose={() => setOpenFail(false)}
                    severity="error"
                >
                    Fail to Approve
                </CommonSnackbar>
            )}
            {approving ? (
                <CommonLoader />
            ) : (
                <>
                    <Grid item lg={6} md={12}>
                        <Box sx={{ ...sxBox }}>
                            <Tabs
                                value={tabIndex}
                                onChange={handleTabChange}
                                aria-label="homeScreenSdrTabs"
                            >
                                <Tab
                                    {...a11yProps(0)}
                                    label={`New SDR/SFRs (${openSdrCount || 0})`}
                                    id="NewsdrTab"
                                />
                                <Tab
                                    {...a11yProps(1)}
                                    label={`Flagged for Follow up (${flaggedSdrCount || 0})`}
                                    id="Flaggedforfollowup"
                                />
                                <Tab
                                    {...a11yProps(2)}
                                    label={`Approved SDRs (${approvedSdrCount || 0})`}
                                    id="Approvedsdr"
                                />
                            </Tabs>
                        </Box>
                        <TabPanel value={tabIndex}>
                            <CommonDataGrid
                                setSelectedIndex={setSelectedIndex}
                                setSelectedSdrId={setSelectedSdrId}
                                setSelectedType={setSelectedType}
                                setViewSdrFlag={setViewSdrFlag}
                                tabIndex={tabIndex}
                                tabValue={SelectedTab[tabIndex]}
                                updateSdrCount={updateSdrCount}
                            />
                        </TabPanel>
                    </Grid>
                    <Grid item lg={6} md={12}>
                        {viewSdrFlag ? (
                            <ViewSdrData
                                selectedSdrId={selectedSdrId}
                                selectedIndex={selectedIndex}
                                selectedType={selectedType}
                                handleApprove={handleApprove}
                            />
                        ) : (
                            <Grid
                                container
                                spacing={0}
                                direction="column"
                                alignItems="center"
                                justifyContent="center"
                                sx={{ minHeight: "85vh" }}
                            >
                                <p className="sdrDefaultMsg">Please select an SDR to view it.</p>
                            </Grid>
                        )}
                    </Grid>
                </>
            )}
        </Grid>
    );
};

export default HomeScreen;
