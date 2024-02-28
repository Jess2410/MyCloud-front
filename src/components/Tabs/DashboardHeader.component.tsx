import { Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import Button from "../Button/Button";
import React from "react";

type DashboardHeaderProps = {
  onLogout: () => void;
  username: string;
};
const DashboardHeader: React.FC<DashboardHeaderProps> = ({
  onLogout,
  username,
}) => {
  return (
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
        <Link to="/" style={{ textDecoration: "none" }}>
          <Button label="Déconnexion" variant="contained" onClick={onLogout} />
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
        Bienvenue {username} ! 👋
      </Typography>
    </Box>
  );
};

export default DashboardHeader;
