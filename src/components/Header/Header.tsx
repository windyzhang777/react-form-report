import {AppBar, Box, Drawer, IconButton, List, ListItem, Toolbar} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import {useState} from "react";

const Header = () => {
    const [openDrawer, setOpenDrawer] = useState<boolean>(false)

    return (
        <AppBar position={"static"}>
            <Toolbar>
                <IconButton
                    edge={"start"}
                    aria-label={"open drawer"}
                    onClick={() => setOpenDrawer(true)}
                >
                    <MenuIcon/>
                </IconButton>
                <Drawer
                    anchor="left"
                    variant="temporary"
                    open={openDrawer}
                    onClose={() => setOpenDrawer(false)}
                >
                    <Box>
                        <List>
                            <ListItem sx={{cursor: "pointer"}} onClick={() => setOpenDrawer(false)}><CloseIcon/></ListItem>
                            <ListItem>SDR Search function</ListItem>
                            <ListItem>CPCP Report</ListItem>
                            <ListItem>Parts Reporting</ListItem>
                        </List>
                    </Box>
                </Drawer>
            </Toolbar>
        </AppBar>
    );
};

export default Header;
