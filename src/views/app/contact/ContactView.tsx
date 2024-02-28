import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import Navbar from "../../../components/NavBar/Navbar";
import image from "../../../assets/images/cloud-data.png";

const ContactView = () => {
  return (
    <>
      <Box
        sx={{
          padding: ["40px 0", "80px"],
        }}
      >
        <Navbar />
      </Box>
      <Box
        sx={{
          p: 4,
          m: "auto",
          maxWidth: 1200,

          position: "relative",
        }}
      >
        <Box sx={{ opacity: { xs: 0.2 }, position: "absolute", zIndex: -1 }}>
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
        </Box>
        <Box sx={{ p: { xs: 2 } }}>
          <Typography
            sx={{
              fontFamily: "Poppins",
              color: "var(--primary-hover)",
            }}
            variant="h2"
            gutterBottom
            align="center"
          >
            Contact
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
            Pour nous contacter, rien de plus simple!
          </Typography>
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
                  <LocalPhoneIcon
                    sx={{ fontSize: 60, color: "#E4B8FD", mb: 2 }}
                  />
                  <Typography
                    gutterBottom
                    variant="h5"
                    component="div"
                    sx={{
                      fontFamily: "Poppins",
                      color: "var(--primary-hover)",
                    }}
                  >
                    Appelez-nous
                  </Typography>
                  <Typography
                    sx={{
                      fontFamily: "Poppins",
                    }}
                    variant="body2"
                    color="#a0a0a0"
                  >
                    +33 (0)4 93 62 44 58
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
                  <AlternateEmailIcon
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
                      color: "var(--primary-hover)",
                      textAlign: "center",
                    }}
                  >
                    Adresse E-mail
                  </Typography>
                  <Typography
                    sx={{
                      fontFamily: "Poppins",
                    }}
                    variant="body2"
                    color="#a0a0a0"
                  >
                    hello@lenuage.com
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
                  <LinkedInIcon
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
                    color="var(--primary-hover)"
                    sx={{
                      fontFamily: "Poppins",
                      color: "var(--primary-hover)",
                    }}
                  >
                    LinkedIn
                  </Typography>
                  <Typography
                    variant="body2"
                    color="#a0a0a0"
                    sx={{
                      fontFamily: "Poppins",
                    }}
                  >
                    <a href="https://www.linkedin.com/school/le-bocal-academy-bcl/">
                      Le Nuage
                    </a>
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

export default ContactView;
