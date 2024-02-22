import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import StorageIcon from "@mui/icons-material/Storage";
import SyncIcon from "@mui/icons-material/Sync";
import ShareIcon from "@mui/icons-material/Share";

import image from "../../../assets/images/cloud-data.png";
import { Link } from "react-router-dom";
import { Box } from "@mui/material";
import Navbar from "../../../components/NavBar/Navbar";
import Button from "../../../components/Button/Button";

const ServicesView = () => {
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
        }}
      >
        <img
          style={{
            position: "fixed",
            zIndex: -1,
            left: -600,
            opacity: 0.7,
            bottom: 0,
          }}
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
            Nos Services
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
            Découvrez les fonctionnalités offertes par notre service de stockage
            en ligne.
          </Typography>
          <Box sx={{ mt: 4, display: "flex", justifyContent: "center" }}>
            <Link to="/signin" style={{ textDecoration: "none" }}>
              <Button variant="contained" label="Démarrer" />
            </Link>
          </Box>
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
                  <StorageIcon sx={{ fontSize: 60, color: "#E4B8FD", mb: 2 }} />
                  <Typography
                    gutterBottom
                    variant="h5"
                    component="div"
                    sx={{
                      fontFamily: "Poppins",
                      color: "#49d4db",
                    }}
                  >
                    Stockage Illimité
                  </Typography>
                  <Typography
                    sx={{
                      fontFamily: "Poppins",
                    }}
                    variant="body2"
                    color="#a0a0a0"
                  >
                    Stockez tous vos fichiers en ligne sans aucune limite de
                    capacité.
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
                  <SyncIcon
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
                    Synchro. Automatique
                  </Typography>
                  <Typography
                    sx={{
                      fontFamily: "Poppins",
                    }}
                    variant="body2"
                    color="#a0a0a0"
                  >
                    Accédez à vos fichiers depuis n'importe quel appareil et
                    synchronisez-les automatiquement.
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
                  <ShareIcon
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
                    Partage Facile
                  </Typography>
                  <Typography
                    variant="body2"
                    color="#a0a0a0"
                    sx={{
                      fontFamily: "Poppins",
                    }}
                  >
                    Partagez vos fichiers et dossiers en toute simplicité avec
                    vos collègues et amis.
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

export default ServicesView;
