import { Box, Grid, Typography } from "@mui/material";
import Dashboard from "../../../components/Dashboard/Dashboard.component";
import Sidebar from "../../../components/Dashboard/Drawer.component";
import Dashboard2 from "../../../components/Dashboard/Drawer.component";
import Button from "../../../components/Button/Button";
import IconButton from "../../../components/IconButton/IconButton";
import SearchWithFilter from "../../../components/SearchBarFilter/SearchBarFilter.component";
import Card from "../../../components/Card/Card";
import DashboardDrawer from "../../../components/Dashboard/Drawer.component";

const DashboardView = () => {
  // return <Dashboard2 />;
  return (
    <Box sx={{ background: "#E4B8FD", minHeight: "100vh" }}>
      <DashboardDrawer />
    </Box>
  );
};

export default DashboardView;
