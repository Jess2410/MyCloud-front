import Box from "@mui/material/Box";
import Navbar from "../NavBar/Navbar";
import backgroundHome from "../assets/images/Homebackground-home.png";

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
        <Navbar />
      </Box>
      <Box sx={{ pb: 4, px: "80px" }}>{children}</Box>
    </>
  );
};

export default Layout;
