import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Navbar from "../../../components/NavBar/Navbar";
import vector from "../../../assets/images/cloud-data.svg";
import { Link } from "react-router-dom";
import Button from "../../../components/Button/Button";

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
      <Box
        sx={{
          padding: ["40px 0", "80px"],
        }}
      >
        <Navbar />
      </Box>
      <Box
        sx={{
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
            background:
              "linear-gradient(to right, #E4B8FD, var(--primary-hover))",
            borderRadius: "20px",
            height: "100%",
            p: 2,
          }}
        >
          <Box
            sx={{
              background: "#fff",
              borderRadius: "20px",
              p: [2, 3],
            }}
          >
            <Box
              sx={{
                position: ["absolute", "fixed", "absolute"],
                top: "100%",
                right: 0,
                transform: ["translate(0%,-30%)", "translate(50%,-50%)"],
              }}
            >
              <img style={{ height: "200px" }} src={vector} alt="Cloud logo" />
            </Box>
            <Typography
              sx={{
                fontFamily: "Poppins",
                color: "var(--secondary)",
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
                px: [2, 8],
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
