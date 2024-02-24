import { styled, useTheme, Theme, CSSObject } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import MuiDrawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import { IconButton as IconButtonMui } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import logoCloud from "../../assets/icons/logoResponsive.png";
import { Link } from "react-router-dom";
import { Box } from "@mui/material";
import { useState } from "react";

const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

export type DashboardDrawerProps = {
  tabsList: TabsListProps[];
};

export interface TabsListProps {
  name: string;
  key: number;
  icon: string;
}

export default function DashboardDrawer({ tabsList }: DashboardDrawerProps) {
  const theme = useTheme();
  const [open, setOpen] = useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          {open ? (
            <>
              <Box sx={{ py: 4 }}>
                <Link to="/dashboard" style={{ textDecoration: "none" }}>
                  <div style={{ display: "flex", justifyContent: "center" }}>
                    <img
                      src={logoCloud}
                      alt="logo-le-nuage"
                      style={{ width: "auto" }}
                    />
                  </div>
                </Link>
                <Typography
                  sx={{
                    color: "#A0A0A0",
                    textAlign: "center",
                    fontFamily: "Poppins",
                    mb: "30px",
                  }}
                >
                  LE NUAGE
                </Typography>
                <Typography
                  sx={{
                    color: "#A0A0A0",
                    textAlign: "center",
                    fontFamily: "Poppins",
                    mb: "24px",
                  }}
                >
                  Dashboard Menu
                </Typography>
              </Box>
              <Divider />
              <IconButtonMui onClick={handleDrawerClose}>
                {theme.direction === "rtl" ? (
                  <ChevronRightIcon />
                ) : (
                  <ChevronLeftIcon />
                )}
              </IconButtonMui>
            </>
          ) : (
            <>
              <Box sx={{ py: 4, opacity: "0" }}>
                <Link to="/dashboard" style={{ textDecoration: "none" }}>
                  <div style={{ display: "flex", justifyContent: "center" }}>
                    <img
                      src={logoCloud}
                      alt="logo-le-nuage"
                      style={{
                        opacity: "0",
                      }}
                    />
                  </div>
                </Link>
                <Typography
                  sx={{
                    color: "#A0A0A0",
                    textAlign: "center",
                    fontFamily: "Poppins",
                    mb: "30px",
                  }}
                >
                  LE NUAGE
                </Typography>
                <Typography
                  sx={{
                    mb: "24px",
                  }}
                >
                  Dashboard Menu
                </Typography>
              </Box>
              <Divider />
              <IconButtonMui
                color="inherit"
                aria-label="open drawer"
                onClick={handleDrawerOpen}
                edge="start"
                sx={{
                  marginRight: "5px",
                  color: "#B990FC",
                }}
              >
                <MenuIcon />
              </IconButtonMui>
            </>
          )}
        </DrawerHeader>
        <Divider />
        <List>
          {tabsList.map((item) => (
            <ListItem key={item.key} disablePadding sx={{ display: "block" }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                  }}
                >
                  <img src={item.icon} alt={item.name} />
                </ListItemIcon>
                <ListItemText sx={{ opacity: open ? 1 : 0 }}>
                  <Typography
                    sx={{
                      fontFamily: "Poppins",
                      color: "#A0A0A0",
                      fontSize: 16,
                      fontWeight: 300,
                    }}
                  >
                    {item.name}
                  </Typography>
                </ListItemText>
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
      </Drawer>
    </Box>
  );
}
