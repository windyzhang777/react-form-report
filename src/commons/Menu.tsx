import { ListItem, Menu } from "@mui/material";
import { MouseEvent, ReactNode, useState } from "react";

export interface ICommonMenuProps {
  button: ReactNode;
  children: ReactNode;
  id?: string;
}

const CommonMenu = ({ button, children, id }: ICommonMenuProps) => {
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
      <ListItem onClick={openMenu}>{button}</ListItem>
      <Menu
        anchorEl={anchorEl}
        id={id ? id : "common-menu"}
        open={open}
        onClose={closeMenu}
        slotProps={{
          paper: {
            elevation: 0,
            sx: {
              top: "100px",
              width: "360px",
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
        transformOrigin={{ horizontal: "center", vertical: "top" }}
        anchorOrigin={{ horizontal: 66, vertical: "bottom" }}
      >
        {children}
      </Menu>
    </>
  );
};

export default CommonMenu;
