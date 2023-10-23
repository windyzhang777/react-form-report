import {AppBar, Box, Drawer, IconButton, List, MenuItem, Toolbar} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import RefreshIcon from '@mui/icons-material/Refresh';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import {useState} from "react";
import UnitedLogo from "../../icons/logo-united.svg";
import "./header.css";

const Header = () => {
    const [openDrawer, setOpenDrawer] = useState<boolean>(false)

    const redirectToAdmin = () => {
        if (process.env.REACT_APP_ENVIRONMENT === "production") {
            window.open("https://amts.ual.com/mx", "_self");
        } else {
            window.open("http://amts-oqa.ual.com/mx/", "_self");
        }
    };

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
                <RefreshIcon sx={{ marginLeft: "auto", marginRight: "25px" }} />
                <PermIdentityIcon sx={{marginRight: "10px"}}/>
            </Toolbar>
        </AppBar>
    );
};

export default Header;
