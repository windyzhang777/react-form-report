import MenuIcon from "@mui/icons-material/Menu";
import { AppBar, Box, Drawer, IconButton, List, MenuItem, Toolbar } from "@mui/material";
import moment from "moment";
import { useEffect, useState } from "react";
import { FlexColumn } from "src/commons/Box";
import ButtonGroup from "src/commons/ButtonGroup";
import RouterLink from "src/commons/Link";
import Menu from "src/commons/Menu";
import { DATETIME_REFRESH } from "src/helpers";
import RefreshIcon from "src/icons/Refresh.png";
import ProfileIcon from "src/icons/Traveler.png";
import UnitedLogo from "src/icons/logo-united.svg";
import config from "src/utils/env.config";
import "./header.css";

export interface IHeaderProps {
  resetApp: () => void;
}

const Header = ({ resetApp }: IHeaderProps) => {
  const [openDrawer, setOpenDrawer] = useState<boolean>(false);
  const [lastRefreshed, setLastRefreshed] = useState<string>(moment().format(DATETIME_REFRESH));

  useEffect(() => {
    setLastRefreshed(moment().format(DATETIME_REFRESH));
  }, [window.location]);

  const redirectToAdmin = () => {
    if (config.REACT_APP_ENVIRONMENT === "production") {
      window.open("https://amts.ual.com/mx", "_self");
    } else {
      window.open("http://amts-oqa.ual.com/mx/", "_self");
    }
  };

  const refreshData = () => {
    resetApp();
    setLastRefreshed(moment().format(DATETIME_REFRESH));
  };

  const onLogoutClick = () => {
    const logoutURL = config.REACT_APP_LOGOUT_URL;
    window.open(logoutURL, "_self");
    sessionStorage.clear();
  };

  return (
    <AppBar position={"static"} sx={{ maxHeight: "10vh" }}>
      <Toolbar className="header-toolbar">
        <IconButton
          edge={"start"}
          color={"default"}
          aria-label={"open drawer"}
          onClick={() => setOpenDrawer(true)}
          sx={{
            marginLeft: "15px",
            marginRight: "15px",
            paddingTop: "15px",
            paddingBottom: "17px",
            bgcolor: openDrawer ? "#334E69" : "",
          }}
        >
          <MenuIcon sx={{ color: "#FFFFFF", width: "30px", height: "30px" }} />
        </IconButton>
        <Drawer
          anchor="left"
          variant="temporary"
          open={openDrawer}
          onClose={() => setOpenDrawer(false)}
        >
          <Box>
            <List>
              <RouterLink to="/esfr/report" onClick={() => setOpenDrawer(false)}>
                <MenuItem>Report Search</MenuItem>
              </RouterLink>
              <RouterLink to="/esfr/cpcp" onClick={() => setOpenDrawer(false)}>
                <MenuItem>CPCP Report Search</MenuItem>
              </RouterLink>
              <RouterLink to="/esfr/parts" onClick={() => setOpenDrawer(false)}>
                <MenuItem>Discrepancy Parts Report</MenuItem>
              </RouterLink>
            </List>
          </Box>
        </Drawer>
        <IconButton onClick={redirectToAdmin} className="!hidden sm:!block">
          <img alt="Logo" src={UnitedLogo} className="unitedLogoIcon" />
        </IconButton>
        <header className={"headerTitle"}>SDR Web</header>
        <IconButton sx={{ marginLeft: "auto", marginRight: "15px" }} onClick={refreshData}>
          <FlexColumn sx={{ alignItems: "center" }}>
            <img alt="Refresh Icon" src={RefreshIcon} className="header-icon" />
            <div className={"header-text"}>Refresh</div>
          </FlexColumn>
        </IconButton>
        {lastRefreshed !== null && (
          <div className="last-refreshed !hidden sm:!block">
            Last Refreshed <div>{moment(lastRefreshed).format(DATETIME_REFRESH)}</div>
          </div>
        )}
        <Menu
          button={
            <FlexColumn sx={{ gap: "5px", alignItems: "center" }}>
              <img alt="Profile Icon" src={ProfileIcon} className="header-icon" />
              <div className={"header-text mt-[-3px]"}>{sessionStorage.fname}</div>
            </FlexColumn>
          }
          endIcon="expand"
          darkMood
        >
          <FlexColumn sx={{ margin: "1rem", fontSize: "18px", gap: "10px" }}>
            <div>{`${sessionStorage.fname} ${
              sessionStorage.lname
            } | ${sessionStorage.id?.toLowerCase()}`}</div>
            <div>{`Role: ${sessionStorage.jobRole}`}</div>
          </FlexColumn>
          <ButtonGroup
            className="pt-0"
            primaryLabel="Logout"
            secondaryLabel="Site Feedback"
            primaryOnClick={onLogoutClick}
            secondaryOnClick={() =>
              window.open(
                `${process.env.REACT_APP_URL_AMT_BASE}/app-feedback?empid=${sessionStorage?.id}&appid=esfrweb&appversion=1&firstname=${sessionStorage?.fname}&lastname=${sessionStorage?.lname}&employeestation=${sessionStorage?.station}&email=${sessionStorage?.email}`,
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
