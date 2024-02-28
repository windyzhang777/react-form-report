import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MenuIcon from "@mui/icons-material/Menu";
import { AppBar, Box, Drawer, IconButton, List, Menu, MenuItem, Toolbar } from "@mui/material";
import moment from "moment";
import { MouseEvent, useEffect, useState } from "react";
import { FlexColumn } from 'src/commons/Box';
import CommonButtonGroup from 'src/commons/ButtonGroup';
import RefreshIcon from "src/icons/Refresh.png";
import ProfileIcon from "src/icons/Traveler.png";
import UnitedLogo from "src/icons/logo-united.svg";
import { getProfile } from "src/redux/ducks/getProfile";
import { useAppDispatch } from "src/redux/hooks";
import "./header.css";

const Header = () => {
    const [openDrawer, setOpenDrawer] = useState<boolean>(false);
    const [anchorEl, setAnchorEl] = useState<Element | null>(null);
    const [lastRefreshed, setLastRefreshed] = useState<string>(moment().format("MM/DD/YYYY hh:mm"));
    const dispatch = useAppDispatch();

    useEffect(() => {
        setLastRefreshed(moment().format("MM/DD/YYYY hh:mm"));
    }, [window.location]);

    const openProfile = (event: MouseEvent) => {
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
        dispatch(getProfile(sessionStorage.id));
        setLastRefreshed(moment().format("MM/DD/YYYY hh:mm"));
    }

    const onLogoutClick = () => {
        const logoutURL = process.env.REACT_APP_LOGOUT_URL;
        window.open(logoutURL, "_self");
        sessionStorage.clear();
    }

    return (
        <AppBar position={"static"}>
            <Toolbar className="header-toolbar">
                <div style={{backgroundColor: openDrawer ? "#334E69" : ""}}>
                    <IconButton
                        edge={"start"}
                        color={"default"}
                        aria-label={"open drawer"}
                        onClick={() => setOpenDrawer(true)}
                        sx={{marginLeft: "15px", marginRight: "15px", paddingTop: "15px", paddingBottom: "17px"}}
                    >
                        <MenuIcon sx={{ color: "#FFFFFF", width: "30px", height: "30px" }}/>
                    </IconButton>
                </div>
                <Drawer
                    anchor="left"
                    variant="temporary"
                    open={openDrawer}
                    onClose={() => setOpenDrawer(false)}
                >
                    <Box>
                        <List>
                            <MenuItem>SDR Search Function</MenuItem>
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
                    {anchorEl ? <ExpandLessIcon sx={{color:"#fff"}} /> : <ExpandMoreIcon sx={{color:"#fff"}} />}
                </IconButton>
                </div>
                <Menu
                    anchorEl={anchorEl}
                    open={showProfile}
                    onClose={closeProfile}
                >
                    <FlexColumn
                        sx={{
                            marginBottom: "1rem ",
                            fontSize: "18px",
                            color: "#fff",
                        }}
                    >
                        <div>{`${sessionStorage.fname} ${sessionStorage.lname} | ${sessionStorage.id?.toLowerCase()}`}</div>
                        <div>{`Role: ${sessionStorage.jobRole}`}</div>
                        <div>{`Station: ${sessionStorage.station}`}</div>
                    </FlexColumn>
                    <CommonButtonGroup
                        labelPrimary="Logout"
                        labelSecondary="Site Feedback"
                        onClickPrimary={onLogoutClick}
                        onClickSecondary={() =>
                            window.open(
                            `${process.env.REACT_APP_URL_AMT_BASE}/app-feedback?empid=${sessionStorage?.id}&appid=MyCrewWeb&appversion=1&firstname=${sessionStorage?.fname}&lastname=${sessionStorage?.lname}&employeestation=${sessionStorage?.station}&email=${sessionStorage?.email}`,
                            "_blank"
                            )
                        }
                    />
                </Menu>
            </Toolbar>
        </AppBar>
    );
};

export default Header;
