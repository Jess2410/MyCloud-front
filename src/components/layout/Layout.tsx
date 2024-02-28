import Box from "@mui/material/Box";
import Navbar from "../NavBar/Navbar";

type LayoutProps = {
  children: React.ReactNode;
  image?: string;
};
const Layout = ({ children, image }: LayoutProps) => {
  return (
    <>
      <Box
        sx={{ px: "80px " }}
        style={{
          backgroundImage: "/src/assets/images/Homebackground-home.png",
        }}
      >
        <Box
          sx={{
            padding: ["40px 0", "80px"],
          }}
        >
          <Navbar />
        </Box>
      </Box>
      <Box sx={{ pb: 4, px: "80px" }}>{children}</Box>
    </>
  );
};

export default Layout;
