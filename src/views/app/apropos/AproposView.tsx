import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";

import StartIcon from '@mui/icons-material/Start';
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import Button from "../../../components/button/Button";
import Navbar from "../../../components/NavBar/Navbar";
import image from "../../../assets/images/cloud-data.png";
import { Link } from "react-router-dom";

const AproposView = () => {
  return (
    <>
      <Navbar />
      <Box
        sx={{
          p: 4,
          pt: 10,
          ml: "auto",
          mr: "auto",
          maxWidth: 1200,

          position: "relative",
          "&::after": {
            content: '""',
            position: "absolute",
            top: 100,
            right: "-300px",
            bottom: 0,
            width: "400px",
            backgroundColor: "#E4B8FD",
            opacity: 0.4,
            filter: "blur(100px)",
            zIndex: -1,
          },
        }}
      >
        <img
          style={{ position: "absolute", zIndex: -1, left: -600, opacity: 0.7 }}
          src={image}
        />
        <Box sx={{ p: 4 }}>
          <Typography
            sx={{
              fontFamily: "Poppins",
              color: "#49d4db",
            }}
            variant="h2"
            gutterBottom
            align="center"
          >
            À propos
          </Typography>
          <Typography
            sx={{
              fontFamily: "Poppins",
            }}
            variant="body1"
            gutterBottom
            align="center"
            color="#a0a0a0"
          >
            Découvrez l'histoire de votre partenaire de stockage
            en ligne.
          </Typography>
          <Link to="/contact" style={{textDecoration: "none"}}>
            <Box sx={{ mt: 4, display: "flex", justifyContent: "center" }}>
                <Button variant="contained" label="Contactez l'équipe" />
            </Box>
          </Link>
          <Grid container spacing={4} sx={{ mt: 4 }}>
            <Grid item xs={12} md={4}>
              <Card
                sx={{
                  height: "100%",
                  display: "flex",
                  justifyContent: "center",
                  border: "2px solid #E4B8FD",
                }}
              >
                <CardContent
                  sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <StartIcon sx={{ fontSize: 60, color: "#E4B8FD", mb: 2 }} />
                  <Typography
                    gutterBottom
                    variant="h5"
                    component="div"
                    sx={{
                      fontFamily: "Poppins",
                      color: "#49d4db",
                    }}
                  >
                    22 Mai 2023
                  </Typography>
                  <Typography
                    sx={{
                      fontFamily: "Poppins",
                    }}
                    variant="body2"
                    color="#a0a0a0"
                  >
                    Les membres de l'équipe dev se recontrent.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={4}>
              <Card
                sx={{
                  height: "100%",
                  display: "flex",
                  justifyContent: "center",
                  border: "2px solid #E4B8FD",
                }}
              >
                <CardContent
                  sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <HourglassEmptyIcon
                    sx={{
                      fontSize: 60,
                      color: "#E4B8FD",
                      mb: 2,
                    }}
                  />
                  <Typography
                    gutterBottom
                    variant="h5"
                    component="div"
                    sx={{
                      fontFamily: "Poppins",
                      color: "#49d4db",
                      textAlign: "center",
                    }}
                  >
                    2 Février 2024
                  </Typography>
                  <Typography
                    sx={{
                      fontFamily: "Poppins",
                    }}
                    variant="body2"
                    color="#a0a0a0"
                  >
                    La conception du projet "Le Nuage" commence.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={4}>
              <Card
                sx={{
                  height: "100%",
                  display: "flex",
                  justifyContent: "center",
                  border: "2px solid #E4B8FD",
                }}
              >
                <CardContent
                  sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <RocketLaunchIcon
                    sx={{
                      fontFamily: "Poppins",
                      fontSize: 60,
                      color: "#E4B8FD",
                      mb: 2,
                    }}
                  />
                  <Typography
                    gutterBottom
                    variant="h5"
                    component="div"
                    color="#49d4db"
                    sx={{
                      fontFamily: "Poppins",
                      color: "#49d4db",
                    }}
                  >
                    4 Mars 2024
                  </Typography>
                  <Typography
                    variant="body2"
                    color="#a0a0a0"
                    sx={{
                      fontFamily: "Poppins",
                    }}
                  >
                    Notre produit est prêt pour votre utilisation!
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </>
  );
};

export default AproposView;