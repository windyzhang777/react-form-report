import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Menu, MenuItem } from "@mui/material";
import { Children, MouseEvent, ReactNode, useState } from "react";
import { FlexRow } from "src/commons/Box";

export interface ICommonMenuProps {
  button: ReactNode | string;
  children: ReactNode;
  className?: string;
  darkMood?: boolean;
  endIcon?: ReactNode | string;
  id?: string;
  shouldCloseMenu?: boolean;
  width?: string;
}

export const ArrowMenu = ({ button, children, id, width }: ICommonMenuProps) => {
  const [anchorEl, setAnchorEl] = useState<Element | null>(null);
  const open: boolean = Boolean(anchorEl);

  const openMenu = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const closeMenu = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <div
        aria-controls={open ? (id ? id + "-menu" : "arrow-menu") : undefined}
        aria-expanded={open ? "true" : undefined}
        aria-haspopup="true"
        id={id ? id + "arrow-menu-button" : "arrow-menu-button"}
        onClick={openMenu}
      >
        {button}
      </div>
      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{ horizontal: 66, vertical: "bottom" }}
        className={id ? id + "-menu" : "arrow-menu"}
        id={id ? id + "-menu" : "arrow-menu"}
        MenuListProps={{ "aria-labelledby": "arrow-menu-button" }}
        onClose={closeMenu}
        open={open}
        transformOrigin={{ horizontal: "center", vertical: "top" }}
        slotProps={{
          paper: {
            elevation: 0,
            sx: {
              width: width || "360px",
              overflow: "visible",
              filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
              mt: 1.5,
              "& .MuiAvatar-root": { width: 32, height: 32, ml: -0.5, mr: 1 },
              "&:before": {
                content: "''",
                display: "block",
                position: "absolute",
                top: 0,
                right: 150,
                width: 10,
                height: 10,
                bgcolor: "background.paper",
                transform: "translateY(-50%) rotate(45deg)",
                zIndex: 0,
              },
            },
          },
        }}
      >
        {children}
      </Menu>
    </>
  );
};

const CommonMenu = ({
  button,
  children,
  id,
  endIcon,
  darkMood = false,
  shouldCloseMenu = false,
}: ICommonMenuProps) => {
  const [anchorEl, setAnchorEl] = useState<Element | null>(null);
  const open: boolean = Boolean(anchorEl);

  const openMenu = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const closeMenu = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <FlexRow
        aria-controls={open ? (id ? id + "-click-menu" : "click-menu") : undefined}
        aria-expanded={open ? "true" : undefined}
        aria-haspopup="true"
        id={
          id ? id + "-click-menu-button-" + (open ? 1 : 0) : "click-menu-button-" + (open ? 1 : 0)
        }
        onClick={openMenu}
        sx={{ position: "relative", cursor: "pointer" }}
      >
        {button}
        {endIcon === "expand" ? (
          open ? (
            <ExpandLessIcon sx={{ color: "#fff" }} />
          ) : (
            <ExpandMoreIcon sx={{ color: "#fff" }} />
          )
        ) : (
          endIcon
        )}
      </FlexRow>
      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        id={id ? id + "-click-menu" : "click-menu"}
        MenuListProps={{ "aria-labelledby": "click-menu-button" }}
        onClose={closeMenu}
        open={open}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        sx={{
          "& .MuiMenu-paper": {
            bgcolor: darkMood ? "#334E69" : "#fff",
            color: darkMood ? "#fff" : "#334E69",
          },
          "& .MuiMenu-list": {
            paddingTop: 0,
            paddingBottom: 0,
          },
        }}
      >
        {shouldCloseMenu
          ? Children.map(children, (child, index) => (
              <MenuItem
                id={id ? id + "-menuItem-" + index : "menuItem-" + index}
                onClick={closeMenu}
                sx={{ minWidth: "10rem" }}
              >
                {child}
              </MenuItem>
            ))
          : children}
      </Menu>
    </>
  );
};

export default CommonMenu;
