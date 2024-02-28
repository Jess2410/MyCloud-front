import Navbar from "../../../components/NavBar/Navbar";
import Button from "../../../components/Button/Button";
import background from "../../../assets/images/Homebackground-home.png";
import { Link } from "react-router-dom";
import { Box, Typography } from "@mui/material";

export default function HomeView() {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundImage: `url(${background})`,
        backgroundSize: "cover",
        backgroundPosition: ["left", "left", "center"],
        backgroundRepeat: "no-repeat",
      }}
    >
      <Box
        sx={{
          padding: ["40px", "80px"],
        }}
      >
        <Navbar />
        <Box
          sx={{
            padding: ["40px 0", "80px 0"],
            maxWidth: "500px",
            gap: "40px",
          }}
        >
          <Typography
            sx={{
              fontFamily: "Poppins",
              fontWeight: 500,
              fontSize: ["40px", "44px"],
              lineHeight: ["48px", "64px"],
              color: "#6A6369",
              textAlign: { xs: "center", sm: "left" },
            }}
          >
            Et si vos dossiers avaient la tête dans
            <span style={{ color: "var(--secondary)" }}> Le Nuage ?</span>
          </Typography>
          <Typography
            sx={{
              my: 3,
              fontSize: ["16px", "18px"],
              fontFamily: "Poppins",
              fontWeight: 400,
              lineHeight: "31px",
              textAlign: ["center", "left"],
              color: "#6A6369",
            }}
          >
            Laissez vos données voguer vers de nouveaux horizons avec notre
            système de cloud!
          </Typography>

          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              my: 3,
              gap: "16px",
              justifyContent: ["center", "inherit"],
            }}
          >
            <Link to="/login">
              <Button label={"Connectez-vous"} variant="contained" />
            </Link>
            <Link to="/signin">
              <Button label={"Inscrivez-vous"} variant="outlined" />
            </Link>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
