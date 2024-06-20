/* eslint-disable react-hooks/exhaustive-deps */
import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import useScrollTrigger from "@mui/material/useScrollTrigger";
import Link from "next/link";
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import { useRouter } from "next/router";
import { getToken, removeSessions } from "../../helper/sessionStorage";
import { useSelector } from "react-redux";

function Header(props) {
  const router = useRouter();
  const [user, setUser] = React.useState({ value: null });
  const [key, setKey] = React.useState(0);
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const [open, setOpen] = React.useState(false);
  const { currentUser } = useSelector((state) => state.auth);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const SidebarToggle = () => {
    setOpen(true);
  };

  const AuthVarify = async () => {
    const token = getToken();
    const AuthToken = { headers: { Authorization: `Bearer ${token}` } };

    try {
      await axios.get(
        `${process.env.NEXT_PUBLIC_URL}/auth/auth-check`,
        AuthToken
      );
    } catch (err) {
      if (err?.response?.status === 401) {
        removeSessions();
        router.push("/login");
      } else if (err?.response?.status === 500) {
        removeSessions();
        router.push("/404");
      }
    }
  };

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
  };

  React.useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setUser({ value: token });
      setKey(Math.random());
      AuthVarify();
    }
  }, []);

  React.useEffect(() => {
    if (window.location.pathname === "/") {
      setSelectedIndex(0);
    } else if (router.pathname.includes("course")) {
      setSelectedIndex(1);
    } else if (router.pathname.includes("blog")) {
      setSelectedIndex(2);
    } else if (router.pathname.includes("contact")) {
      setSelectedIndex(3);
    } else if (router.pathname.includes("about")) {
      setSelectedIndex(4);
    } else if (router.pathname.includes("cart")) {
      setSelectedIndex(5);
    }
  }, []);

  return (
    <ElevationScroll {...props}>
      <AppBar position="sticky" sx={{ background: "#140342" }}>
        <Container maxWidth="xl">
          <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography
              variant="h6"
              noWrap
              component={Link}
              href="/"
              sx={{
                display: { xs: "none", md: "flex" },
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              { process.env.NEXT_PUBLIC_APP_NAME || 'CLP' }
            </Typography>

            <Box sx={{ flexGrow: 0, display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={SidebarToggle}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
            </Box>
            <Typography
              variant="h5"
              noWrap
              component={Link}
              href="/"
              sx={{
                display: { xs: "flex", md: "none" },
                flexGrow: 0,
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >

            </Typography>
            <Box
              sx={{
                flexGrow: 1,
                display: { xs: "none", md: "flex", justifyContent: "center" },
              }}
            >
              {pages.map((page, index) => (
                <MenuItem
                  key={index.toString()}
                  sx={{
                    my: 2,
                    color: "white",
                    display: "block",
                    textTransform: "capitalize",
                    "&.Mui-selected": {
                      color: "#50f53d",
                    },
                  }}
                  component={Link}
                  href={`${page.link}`}
                  selected={selectedIndex === index}
                  onClick={(event) => handleListItemClick(event, index)}
                >
                  {page.title}
                </MenuItem>
              ))}
            </Box>
            {!user.value && (
              <Box sx={{ flexGrow: 0 }}>
                <Button
                  style={{ marginRight: "1rem" }}
                  color="secondary"
                  component={Link}
                  href="/login"
                  sx={{ textTransform: "capitalize", fontWeight: "800" }}
                  variant="contained"
                  disableElevation
                >
                  Login
                </Button>
                <Button
                  color="secondary"
                  component={Link}
                  href="/signup"
                  sx={{ textTransform: "capitalize", fontWeight: "800" }}
                  variant="contained"
                  disableElevation
                >
                  Sign Up
                </Button>
              </Box>
            )}
            {user.value && (
              <Box sx={{ flexGrow: 0 }}>
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar
                      alt={`${currentUser?.firstName}`}
                      src={
                        currentUser?.picture?.secure_url ||
                        "https://www.dropbox.com/s/iv3vsr5k6ib2pqx/avatar_default.jpg?dl=1"
                      }
                    >
                      S
                    </Avatar>
                  </IconButton>
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
                  {settings.map((setting, i) => (
                    <MenuItem
                      component={Link}
                      href={`${setting.link}`}
                      key={i.toString()}
                      onClick={handleCloseUserMenu}
                    >
                      <Typography sx={{ paddingRight: 8 }} textAlign="center">
                        {setting.title}
                      </Typography>
                    </MenuItem>
                  ))}
                </Menu>
              </Box>
            )}
          </Toolbar>
        </Container>
        <Drawer anchor="left" open={open} onClose={() => setOpen(false)}>
          <Box component="div" sx={{ background: "#1d1d66", height: "100vh" }}>
            <Box p={2} width={240} textAlign="center" role="presentation">
              <Typography
                variant="h5"
                component={Link}
                href="/"
                sx={{ display: "flex", justifyContent: "center" }}
              >

              </Typography>
            </Box>
            <List>
              {pages.map((page, i) => (
                <ListItemButton
                  onClick={(event) => handleListItemClick(event, i)}
                  key={i.toString()}
                  component={Link}
                  href={page.link}
                  selected={selectedIndex === i}
                >
                  <ListItem
                    sx={{
                      "&.Mui-selected": {
                        color: "#50f53d",
                      },
                    }}
                  >
                    <ListItemText
                      sx={{
                        color: "#fff",
                      }}
                      primary={`${page.title}`}
                    ></ListItemText>
                  </ListItem>
                </ListItemButton>
              ))}
            </List>
          </Box>
        </Drawer>
      </AppBar>
    </ElevationScroll>
  );
}
export default Header;

function ElevationScroll(props) {
  const { children, window } = props;
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
    target: window ? window() : undefined,
  });

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
    sx: {
      padding: trigger ? "0" : "20px 0px",
      backgroundColor: trigger ? "#4f46e5" : "#140342",
      transition: "300ms ease-in-out",
    },
  });
}

const pages = [
  {
    link: "/",
    title: "Home",
  },
  {
    link: "/course",
    title: "Course",
  },
  {
    link: "/contact",
    title: "Contact",
  },
  {
    link: "/about",
    title: "About Us",
  },
  {
    link: "/teacher/teachers",
    title: "Teachers",
  },
  {
    link: "/cart",
    title: "Cart",
  },
];

const settings = [
  {
    link: "/dashboard",
    title: "Dashboard",
  },
  {
    link: "/logout",
    title: "Logout",
  },
];
