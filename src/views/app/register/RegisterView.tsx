import CssBaseline from "@mui/material/CssBaseline";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import background from "../../../assets/images/background-form.png";
import cloudImage from "../../../assets/images/cloud-search.png";
import Navbar from "../../../components/NavBar/Navbar";
import FormSigninGeneric from "../../../components/Form/FormSigninGeneric";

export default function RegisterView() {
  // const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
  //   event.preventDefault();
  //   const data = new FormData(event.currentTarget);
  //   console.log({
  //     email: data.get("email"),
  //     password: data.get("password"),
  //   });
  // };

  return (
    <>
      <CssBaseline />
      <Grid
        container
        component="main"
        sx={{ height: "100vh", overflow: "hidden" }}
      >
        <Navbar />
        <Grid
          item
          xs={12}
          sm={8}
          md={7}
          component={Paper}
          square
          sx={{ position: "relative" }}
        >
          <Box
            style={{
              position: "absolute",
              background: "transparente",
              zIndex: 100,
              right: -700,
              height: "100%",
            }}
          >
            <img src={cloudImage} style={{ height: "100%" }} alt="cloud" />
          </Box>
          <Box
            id="box"
            sx={{
              height: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              background: "#fff",
              borderRadius: "0 24px 24px 0",
              position: "absolute",
              width: "110%",
              zIndex: 10,
            }}
          >
            <FormSigninGeneric />
          </Box>
        </Grid>
        <Grid
          item
          xs={0}
          sm={4}
          md={5}
          sx={{
            backgroundImage: `url(${background})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundPosition: "right",
          }}
        />
      </Grid>
    </>
  );
}
