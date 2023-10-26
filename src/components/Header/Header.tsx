import {AppBar, Box, Drawer, IconButton, List, MenuItem, Toolbar} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import {useEffect, useState} from "react";
import UnitedLogo from "../../icons/logo-united.svg";
import RefreshIcon from "../../icons/Refresh.png";
import "./header.css";
import moment from "moment";

const Header = () => {
    const [openDrawer, setOpenDrawer] = useState<boolean>(false);
    const [lastRefreshed, setLastRefreshed] = useState<string>(moment().format("MM/DD/YYYY hh:mm"));

    useEffect(() => {
        setLastRefreshed(moment().format("MM/DD/YYYY hh:mm"));
    }, [window.location]);

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
                <IconButton sx={{marginLeft: "auto"}} onClick={refreshData}>
                    <div>
                        <img alt="Refresh Icon" src={RefreshIcon} className="refresh-icon" />
                        <div className={"refresh-text"}>Refresh</div>
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
                <PermIdentityIcon sx={{marginRight: "10px"}}/>
            </Toolbar>
        </AppBar>
    );
};

export default Header;
