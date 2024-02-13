import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import { IconButton as IconButtonMui } from "@mui/material";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import logo from "../../assets/images/logo-le-nuage.webp";
import logoResponsiveBurger from "../../assets/icons/logo-burger-svg.svg";
import LoginIcon from "@mui/icons-material/Login";
import IconButton from "../IconButton/IconButton";

const pages = ["À propos", "Services", "Contact"];
const settings = ["Sign In", "Login"];

const Navbar: React.FC = () => {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar
      position="sticky"
      sx={{
        backgroundColor: "transparent",
        padding: "0",
        boxShadow: "none",
        height: "fit-content",
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            <img
              src={logo}
              alt="logo-le-nuage"
              style={{
                width: 200,
                height: "auto",
                marginRight: 24,
              }}
            />
          </Box>

          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "flex", md: "none" },
            }}
          >
            <IconButtonMui
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
              sx={{
                p: 0,
                "&:hover": {
                  background: "RGBA(73,212,219,0.1)",
                },
              }}
            >
              <IconButton icon={logoResponsiveBurger} />
            </IconButtonMui>

            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography
                    textAlign="center"
                    sx={{
                      textTransform: "none",
                      fontFamily: "Poppins",
                      color: "#6A6369",
                      "&:hover": {
                        color: "#49d4db",
                      },
                    }}
                  >
                    {page}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Box
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              alignItems: "center",
            }}
          >
            <Typography
              variant="h1"
              sx={{
                textTransform: "none",
                fontFamily: "Poppins",
                mx: "16px",
                fontSize: "1.5em",
                fontWeight: "semi-bold",
                color: "#9B61F5",
              }}
            >
              LE NUAGE
            </Typography>
          </Box>

          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={handleCloseNavMenu}
                sx={{
                  my: 2,
                  display: "block",
                  "&:hover": {
                    color: "#49d4db",
                  },
                }}
              >
                <Typography
                  variant="body1"
                  sx={{
                    textTransform: "none",
                    fontFamily: "Poppins",
                    mx: "16px",
                    fontSize: 17,
                    color: "#6A6369",
                    "&:hover": {
                      color: "#49d4db",
                    },
                  }}
                >
                  {page}
                </Typography>
              </Button>
            ))}
          </Box>

          <Box
            sx={{
              flexGrow: 0,
              border: "2px solid #49d4db ",
              background: "#fff",
              borderRadius: "50%",
              "&:hover": {
                background: "RGBA(256,256,256,0.8)",
              },
            }}
          >
            <Tooltip title="Open settings">
              <IconButtonMui onClick={handleOpenUserMenu}>
                <LoginIcon sx={{ color: "#49d4db" }} />
              </IconButtonMui>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography
                    textAlign="center"
                    sx={{
                      textTransform: "none",
                      fontFamily: "Poppins",
                      color: "#6A6369",
                      "&:hover": {
                        color: "#9B61F5",
                      },
                    }}
                  >
                    {setting}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default Navbar;
