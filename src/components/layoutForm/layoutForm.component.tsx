import CssBaseline from "@mui/material/CssBaseline";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

import Navbar from "../NavBar/Navbar";

import styles from "./layoutForm.module.css";

type LayoutProps = {
  children: React.ReactNode;
  image: string;
};

const LayoutForm: React.FC<LayoutProps> = ({ children, image }) => {
  return (
    <>
      <CssBaseline />
      <Grid
        container
        xs={12}
        component="main"
        className={styles["layoutForm__container"]}
      >
        <Box
          sx={{
            padding: ["40px 0", "80px"],
          }}
        >
          <Navbar />
        </Box>
        <Grid
          item
          container
          xs={12}
          sm={8}
          md={7}
          component={Paper}
          className={styles["layoutForm__paper"]}
        >
          <Box className={styles["layoutForm__imageBox"]}>
            <img
              src={image}
              className={styles["layoutForm__image"]}
              alt="cloud"
            />
          </Box>

          <Box
            sx={{
              height: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
            }}
          >
            {children}
          </Box>
        </Grid>
      </Grid>
    </>
  );
};
export default LayoutForm;
