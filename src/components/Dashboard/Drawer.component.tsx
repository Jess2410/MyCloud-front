import * as React from "react";
import { styled, useTheme, Theme, CSSObject } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import { IconButton as IconButtonMui, Grid } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Card from "../Card/Card";
import IconButton from "../IconButton/IconButton";
import SearchWithFilter from "../SearchBarFilter/SearchBarFilter.component";
import logoCloud from "../../assets/icons/logoResponsive.png";
import trashIcon from "../../assets/icons/trash-drawer.svg";
import starIcon from "../../assets/icons/star-drawer.svg";
import fileIcon from "../../assets/icons/file-drawer.svg";
import addFile from "../../assets/icons/add-file-icon.png";
import addFolder from "../../assets/icons/add-folder-icon.png";
import trash from "../../assets/icons/trash-icon.png";
import checkBox from "../../assets/icons/checkbox-tool.svg";
import checkBoxNoChecked from "../../assets/icons/checkbox-checked-tool.svg";
import { Link } from "react-router-dom";
import Button from "../Button/Button";
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

const tabsList = [
  {
    name: "Mon Cloud",
    key: 1,
    icon: fileIcon,
    link: "CLOUD_HREF",
  },
  {
    name: "Mes favoris",
    key: 2,
    icon: starIcon,
    link: "FAVORITES_HREF",
  },
  {
    name: "Corbeille",
    key: 3,
    icon: trashIcon,
    link: "TRASH_HREF",
  },
];

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

export default function DashboardDrawer() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [selected, setSelected] = React.useState(false);
  const [listSelectedCards, setListSelectedCards] = React.useState<number[]>(
    []
  );

  const onSelected = () => {
    setSelected(!selected);
  };
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const mockData = [
    {
      extensionFile: "audio",
      name: "Audio File",
      date: "2024-02-14",
      id: 1,
      isFavorite: false,
    },
    {
      extensionFile: "file",
      name: "Document File",
      date: "2024-02-15",
      id: 2,
      isFavorite: true,
    },
    {
      extensionFile: "folder",
      name: "Folder",
      date: "2024-02-16",
      id: 3,
      isFavorite: false,
    },
    {
      extensionFile: "image",
      name: "Image File",
      date: "2024-02-17",
      id: 4,
      isFavorite: true,
    },
    {
      extensionFile: "image",
      name: "Image File",
      date: "2024-02-17",
      id: 5,
      isFavorite: true,
    },
    {
      extensionFile: "image",
      name: "Image File",
      date: "2024-02-17",
      id: 6,
      isFavorite: true,
    },
  ];

  const onAddSelectedCards = (id: number) => {
    if (listSelectedCards.includes(id)) {
      setListSelectedCards(listSelectedCards.filter((cardId) => cardId !== id));
    } else {
      setListSelectedCards([...listSelectedCards, id]);
    }
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
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          px: 4,
          py: 2,
          background: "#fff",
          maxWidth: "1400px",
          margin: "auto",
          height: "100vh",
        }}
      >
        <Box
          component="main"
          sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}
        >
          <Box sx={{ p: 4, px: 8 }}>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Typography
                sx={{
                  fontFamily: "Poppins",
                  color: "#A0A0A0",
                  fontSize: 32,
                  fontWeight: 500,
                }}
              >
                Mon Cloud
              </Typography>
              <Link to="/" style={{ textDecoration: "none" }}>
                <Button label="Déconnexion" variant="contained" />
              </Link>
            </Box>
            <Typography
              sx={{
                fontFamily: "Poppins",
                color: "#A0A0A0",
                fontSize: 18,
                fontWeight: 300,
              }}
            >
              Bienvenue 'nom' ! 👋
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              p: 4,
              px: 8,
              flexWrap: "wrap",
              background: "#fff",
              justifyContent: { xs: "center", md: "center", lg: "flex-start" },
            }}
          >
            <Box
              sx={{
                background: "rgba(124, 210, 215, 0.2)",
                borderRadius: "60px",
                p: "4px",
                display: "flex",
                alignItems: "center",
                mr: 1,
                px: 2,
                width: { xs: "100%", md: "100%", lg: "inherit" },
                flexWrap: "wrap",
                justifyContent: "center",
              }}
            >
              <SearchWithFilter />
              <Box sx={{ display: "flex" }}>
                <Box
                  sx={{
                    ml: 1,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <IconButton icon={addFile} />
                  <IconButton icon={addFolder} />
                </Box>

                <Box
                  // sx={{
                  //   borderRight: "1px solid #7CD2D7",
                  // }}
                  onClick={() => onSelected()}
                >
                  {selected ? (
                    <IconButton icon={checkBox} />
                  ) : (
                    <IconButton icon={checkBoxNoChecked} />
                  )}

                  <IconButton
                    icon={trash}
                    onClick={() =>
                      console.log(
                        "🚀 ~ onAddSelectedCards ~ listSelectedCards:",
                        listSelectedCards
                      )
                    }
                  />
                </Box>
              </Box>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Typography
                sx={{
                  fontFamily: "Poppins",
                  color: "#7CD2D7",
                  fontSize: 18,
                  fontWeight: 300,
                  mt: { xs: 1, md: 1 },
                }}
              >
                {listSelectedCards.length >= 1 &&
                  `${listSelectedCards.length}  élément(s) sélectionné(s)`}
              </Typography>
            </Box>
          </Box>
        </Box>
        <Grid sx={{ px: 4 }}>
          <Box
            sx={{
              p: 4,
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(184px, 1fr))",
              margin: "auto",
              gap: "16px",
              justifyContent: "center",
              alignItems: "flex-start",
            }}
          >
            {mockData.map((card) => (
              <Card
                {...card}
                isSelected={listSelectedCards.includes(card.id)}
                onAddSelectedCards={onAddSelectedCards}
                // id={card.id}
                // extensionFile={card.extensionFile}
                // name={card.name}
                // date={card.date}
                // isFavorite={card.isFavorite}
              />
            ))}
          </Box>
        </Grid>
      </Box>
    </Box>
  );
}
