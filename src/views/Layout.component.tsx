import { Box } from "@mui/material";

import CssBaseline from "@mui/material/CssBaseline";

import DashboardDrawer from "../components/Drawer/DashboardDrawer.component";
import DashboardHeader from "../components/Tabs/DashboardHeader.component";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import useLogout from "../components/Tabs/hooks/useLogout";

type DashboardMainProps = {
  children: React.ReactNode;
};
const Layout: React.FC<DashboardMainProps> = ({ children }) => {
  const userContext = useContext(UserContext);
  const getUserName = () => {
    if (userContext?.user) {
      const { firstname, lastname } = userContext.user;
      return `${firstname} ${lastname}`;
    }
    return "stranger";
  };
  const logout = useLogout();
  return (
    <Box
      sx={{ display: "flex", flexDirection: "column", height: "100vh", px: 6 }}
    >
      <CssBaseline />
      <Box sx={{ display: "flex", flexGrow: 1, justifyContent: "center" }}>
        <DashboardDrawer />
        <Box sx={{ maxWidth: "1200px" }}>
          <Box sx={{ display: "flex", flexGrow: 1, flexDirection: "column" }}>
            <DashboardHeader onLogout={logout} username={getUserName()} />
            {/*TODO move header ici et retravailler*/}
            {children}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Layout;
