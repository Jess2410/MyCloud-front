import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import logoCloud from "../../assets/icons/logo-nuage.svg";
import trashIcon from "../../assets/icons/trash-drawer.svg";
import starIcon from "../../assets/icons/star-drawer.svg";
import fileIcon from "../../assets/icons/file-drawer.svg";
import addFile from "../../assets/icons/add-file-icon.png";
import addFolder from "../../assets/icons/add-folder-icon.png";
import trash from "../../assets/icons/trash-icon.png";
import Button from "../button/Button";
import IconButton from "../IconButton/IconButton";
import checkBox from "../../assets/icons/checkbox-tool.svg";
import checkBoxNoChecked from "../../assets/icons/checkbox-checked-tool.svg";
import { useState } from "react";
import Card from "../Card/Card";
import { Link } from "react-router-dom";

const drawerWidth = 400;
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

const DashboardComponent = () => {
  const [selected, setSelected] = useState(false);

  const onSelected = () => {
    setSelected(!selected);
  };
  return (
    <Box sx={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      <CssBaseline />
      <Toolbar />
      <Box sx={{ display: "flex", flexGrow: 1 }}>
        <Drawer
          variant="permanent"
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            [`& .MuiDrawer-paper`]: {
              width: drawerWidth,
            },
          }}
        >
          <Box sx={{ overflow: "auto" }}>
            <Link  to="/dashboard" style={{ textDecoration: "none" }}>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <img
                  src={logoCloud}
                  alt="logo-le-nuage"
                  style={{
                    height: "auto",
                    margin: 24,
                  }}
                />
              </div>
            </Link>
            <Typography
              sx={{
                color: "#A0A0A0",
                textAlign: "center",
                fontFamily: "Poppins",
                mb: "24px",
                fontWeight: 300,
                fontSize: 18,
              }}
            >
              Dashboard Menu
            </Typography>
            <Divider />
            <List>
              {tabsList.map((item) => (
                <ListItem key={item.key}>
                  <ListItemButton
                    disableGutters
                    sx={{ display: "flex", px: 3, py: 2, alignItems: "center" }}
                  >
                    <ListItemIcon sx={{ mr: 2, justifyContent: "flex-end" }}>
                      <img src={item.icon} alt={item.name} />
                    </ListItemIcon>
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
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </Box>
        </Drawer>
        <Box
          component="main"
          sx={{ flexGrow: 1, px: 2, display: "flex", flexDirection: "column" }}
        >
          <Box sx={{ p: 4 }}>
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
              <Link  to="/" style={{ textDecoration: "none" }}>
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

          <Grid sx={{ px: 4 }}>
            <Box
              sx={{
                background: "rgba(124, 210, 215, 0.2)",
                borderRadius: "60px",
                p: "4px",
                display: "flex",
                alignItems: "center",
                mr: 1,
                flex: 1,
              }}
            >
              <Box
                sx={{
                  borderRight: "1px solid #7CD2D7",
                  mx: 1,

                  display: "flex",
                  alignItems: "center",
                }}
              >
                <IconButton icon={addFolder} />
                <IconButton icon={addFile} />
              </Box>
              <Box
                sx={{
                  borderRight: "1px solid #7CD2D7",
                  display: "flex",
                  alignItems: "center",
                  mx: 1,
                }}
              >
                <Typography
                  sx={{
                    fontFamily: "Poppins",
                    color: "#A0A0A0",
                    fontSize: 18,
                    fontWeight: 300,
                  }}
                >
                  Sélectionner
                </Typography>
                <Box onClick={() => onSelected()}>
                  {selected ? (
                    <IconButton icon={checkBox} />
                  ) : (
                    <IconButton icon={checkBoxNoChecked} />
                  )}
                </Box>
              </Box>
              <IconButton icon={trash} />
            </Box>

            <Box
              sx={{
                p: 4,
                display: "flex",
                flexWrap: "wrap",
                gap: "16px",
                justifyContent: "center",
                alignItems: "flex-start",
              }}
            >
              <Card
                extensionFile="folder"
                name="Nouveau dossier"
                date="21/06/2023"
              />
              <Card
                extensionFile="folder"
                name="Nouveau dossier"
                date="09/09/2023"
              />
              <Card
                extensionFile="folder"
                name="Nouveau dossier"
                date="21/06/2023"
              />
              <Card extensionFile="audio" name="Music" date="21/06/2023" />
              <Card
                extensionFile="file"
                name="Photo12.jpeg"
                date="09/09/2023"
              />
              <Card extensionFile="image" name="Drawing" date="21/06/2023" />
              <Card extensionFile="audio" name="Music" date="21/06/2023" />
              <Card
                extensionFile="file"
                name="Photo12.jpeg"
                date="09/09/2023"
              />
              <Card extensionFile="audio" name="Music" date="21/06/2023" />
              <Card extensionFile="image" name="Drawing" date="21/06/2023" />
              <Card
                extensionFile="file"
                name="Photo12.jpeg"
                date="09/09/2023"
              />
              <Card extensionFile="audio" name="Music" date="21/06/2023" />
              <Card extensionFile="image" name="Drawing" date="21/06/2023" />
              <Card
                extensionFile="file"
                name="Photo12.jpeg"
                date="09/09/2023"
              />
              <Card extensionFile="audio" name="Music" date="21/06/2023" />
            </Box>
          </Grid>
        </Box>
      </Box>
    </Box>
  );
};

export default DashboardComponent;
