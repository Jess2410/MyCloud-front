import { Box } from "@mui/material";
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
