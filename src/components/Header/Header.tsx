import {AppBar, Box, Button, Drawer, IconButton, List, Menu, MenuItem, Toolbar, Typography} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import {useEffect, useState} from "react";
import UnitedLogo from "../../icons/logo-united.svg";
import RefreshIcon from "../../icons/Refresh.png";
import ProfileIcon from "../../icons/Traveler.png";
import "./header.css";
import moment from "moment";
import {useAppSelector} from "../../redux/hooks";

const Header = () => {
    const [openDrawer, setOpenDrawer] = useState<boolean>(false);
    const [anchorEl, setAnchorEl] = useState<any>(null);
    const [lastRefreshed, setLastRefreshed] = useState<string>(moment().format("MM/DD/YYYY hh:mm"));
    const {profileData} = useAppSelector(state => state.profile);

    useEffect(() => {
        setLastRefreshed(moment().format("MM/DD/YYYY hh:mm"));
    }, [window.location]);

    const openProfile = (event: any) => {
        setAnchorEl(event.currentTarget);
    }

    const closeProfile = () => {
        setAnchorEl(null);
    }

    const showProfile: boolean = Boolean(anchorEl);

    const redirectToAdmin = () => {
        if (process.env.REACT_APP_ENVIRONMENT === "production") {
            window.open("https://amts.ual.com/mx", "_self");
        } else {
            window.open("http://amts-oqa.ual.com/mx/", "_self");
        }
    };

    const refreshData = () => {
        setLastRefreshed(moment().format("MM/DD/YYYY hh:mm"));
    }

    const onLogoutClick = () => {
        const logoutURL = process.env.REACT_APP_LOGOUT_URL;
        sessionStorage.clear();
        window.open(logoutURL, "_self");
    }

    return (
        <AppBar position={"static"}>
            <Toolbar className="header-toolbar">
                <IconButton
                    edge={"start"}
                    color={"default"}
                    aria-label={"open drawer"}
                    onClick={() => setOpenDrawer(true)}
                >
                    <MenuIcon sx={{ color: "#FFFFFF", width: "30px", height: "30px" }}/>
                </IconButton>
                <Drawer
                    anchor="left"
                    variant="temporary"
                    open={openDrawer}
                    onClose={() => setOpenDrawer(false)}
                >
                    <Box>
                        <List>
                            <MenuItem onClick={() => setOpenDrawer(false)}><CloseIcon/></MenuItem>
                            <MenuItem>SDR Search function</MenuItem>
                            <MenuItem>CPCP Report</MenuItem>
                            <MenuItem>Parts Reporting</MenuItem>
                        </List>
                    </Box>
                </Drawer>
                <IconButton onClick={redirectToAdmin}>
                    <img
                        alt="Logo"
                        src={UnitedLogo}
                        className="unitedLogoIcon"
                    />
                </IconButton>
                <header className={"headerTitle"}>
                    SDR Web
                </header>
                <IconButton sx={{marginLeft: "auto", marginRight: "15px"}} onClick={refreshData}>
                    <div>
                        <img alt="Refresh Icon" src={RefreshIcon} className="header-icon" />
                        <div className={"header-text"}>Refresh</div>
                    </div>
                </IconButton>
                {lastRefreshed !== null && (
                    <div  className="last-refreshed">
                        Last Refreshed{" "}
                        <div>
                            {moment(lastRefreshed).format("MM/DD/YYYY@hh:mm")}
                        </div>
                    </div>
                )}
                <div className={showProfile ? "show-profile" : "" }>
                <IconButton sx={{marginLeft: "15px", marginRight: "15px"}} onClick={openProfile} >
                    <div>
                        <img alt="Profile Icon" src={ProfileIcon} className="header-icon" />
                        <div className={"header-text"}>{sessionStorage.fname}</div>
                    </div>
                </IconButton>
                </div>
                <Menu
                    anchorEl={anchorEl}
                    open={showProfile}
                    onClose={closeProfile}
                >
                    <Typography
                        sx={{
                            mt: 1,
                            pr: 4,
                            pl: 4,
                            backgroundColor: "#334E69",
                            fontSize: "18px",
                            fontWeight: 600,
                            color: "white",
                        }}
                    >
                        {sessionStorage.fname} {sessionStorage.lname}
                        {"    "}
                        {"  |   "}
                        <Typography sx={{ pr: 2, display: "inline", fontSize: "18px" }}>
                            {sessionStorage.id?.toLowerCase()}
                        </Typography>
                        <Typography sx={{mt: 2, fontWeight: 600}}>
                            Role: <span> {sessionStorage.jobRole}</span>
                        </Typography>{" "}
                        <Typography sx={{mt: 2, fontWeight: 600}}>
                            Station:<span> {sessionStorage.station}</span>
                        </Typography>{" "}
                    </Typography>
                    <Button
                        onClick={() => {
                            window.open(`${process.env.REACT_APP_URL_AMT_BASE}/app-feedback?empid=${sessionStorage?.id}&appid=MyCrewWeb&appversion=1&firstname=${sessionStorage?.fname}&lastname=${sessionStorage?.lname}&employeestation=${sessionStorage?.station}&email=${sessionStorage?.email}`, "_blank")
                        }}
                        variant="text"
                        sx={{
                            textTransform: "none",
                            padding: "0.2rem",
                            marginLeft: 4,
                            mt: 3,
                            mb: 3,
                            borderRadius: "12",
                            width: "135px",
                            backgroundColor: "white",
                            fontWeight: "600",
                            color: "#6244BB",
                            ":hover": { bgcolor: "#1976d2" },
                        }}
                    >
                        {" "}
                        Site Feedback
                    </Button>
                    <Button
                        onClick={() => {
                            onLogoutClick();
                        }}
                        variant="text"
                        sx={{
                            textTransform: "none",
                            padding: "0.2rem",
                            marginLeft: 4,
                            mt: 3,
                            mb: 3,
                            mr: 4,
                            borderRadius: "12",
                            width: "135px",
                            backgroundColor: "#6244BB",
                            fontWeight: "600",
                            color: "white",
                            ":hover": { bgcolor: "#1976d2" },
                        }}
                    >
                        {" "}
                        Logout
                    </Button>
                </Menu>
            </Toolbar>
        </AppBar>
    );
};

export default Header;
