import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "../../../components/button/Button";
import Navbar from "../../../components/NavBar/Navbar";
import vector from "../../../assets/images/cloud-data.svg";
import { Link } from "react-router-dom";

const AboutView = () => {
  return (
    <Box
      sx={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100vh",
        background: "#fff",
        opacity: 0.7,
        zIndex: -1,
      }}
    >
      <Navbar />
      <Box
        sx={{
          py: 4,
          m: "auto",
          textAlign: "center",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
          }}
        />

        <Box
          sx={{
            ml: "auto",
            mr: "auto",
            maxWidth: 800,
            position: "relative",
            textAlign: "center",
            zIndex: 1,
            background: "linear-gradient(to right, #E4B8FD, #49d4db)",
            borderRadius: "20px",
            height: "100%",
            p: 2,
          }}
        >
          <Box
            sx={{
              background: "#fff",
              borderRadius: "20px",
              p: 3,
            }}
          >
            <img
              style={{
                height: "50%",
                position: "absolute",
                top: "100%",
                right: 0,
                transform: "translate(50%,-50%)",
              }}
              src={vector}
              alt="Cloud logo"
            />
            <Typography
              sx={{
                fontFamily: "Poppins",
                color: "#9B61F5",
              }}
              variant="h2"
              gutterBottom
            >
              À Propos du Nuage
            </Typography>

            <Typography
              sx={{
                fontFamily: "Poppins",
                color: "#a0a0a0",
                mb: 4,
                px: 8,
              }}
              variant="body1"
              gutterBottom
            >
              Notre service de stockage en ligne est conçu pour vous offrir une
              expérience de stockage sécurisée, fiable et pratique. Que vous
              ayez besoin de sauvegarder des photos, des vidéos, des documents
              ou d'autres types de fichiers, notre plateforme est là pour
              répondre à vos besoins.
            </Typography>
            <Typography
              sx={{
                fontFamily: "Poppins",
                color: "#a0a0a0",
                mb: 4,
                px: 8,
              }}
              variant="body1"
              gutterBottom
            >
              Avec notre service, vous bénéficiez d'un stockage illimité pour
              vos fichiers, d'une synchronisation automatique entre vos
              appareils et d'une facilité de partage avec vos proches et
              collègues. Notre priorité est de vous offrir une solution de
              stockage qui soit à la fois sécurisée, accessible et simple à
              utiliser.
            </Typography>
            <Box sx={{ mt: 4, display: "flex", justifyContent: "center" }}>
              <Link
                to={"/signin"}
                style={{ textDecoration: "none", color: "#6A6369" }}
              >
                <Button variant="outlined" label="Essayez-le !" />
              </Link>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default AboutView;
