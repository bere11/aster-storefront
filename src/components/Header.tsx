import AccountCircleOutlined from "@mui/icons-material/AccountCircleOutlined";
import CloseRounded from "@mui/icons-material/CloseRounded";
import DarkModeOutlined from "@mui/icons-material/DarkModeOutlined";
import FavoriteBorderRounded from "@mui/icons-material/FavoriteBorderRounded";
import LightModeOutlined from "@mui/icons-material/LightModeOutlined";
import LogoutRounded from "@mui/icons-material/LogoutRounded";
import MenuRounded from "@mui/icons-material/MenuRounded";
import ShoppingBagOutlined from "@mui/icons-material/ShoppingBagOutlined";
import {
  AppBar,
  Badge,
  Box,
  Button,
  Container,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemText,
  Skeleton,
  Stack,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import { alpha } from "@mui/material/styles";
import { useState } from "react";
import {
  Link,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { useCategories } from "../query/queries";
import { useAppState } from "../state/AppState";
import { categoryLabel } from "../utils/products";

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { data: categories, isLoading, isError } = useCategories();
  const { auth, cartCount, wishlist, mode, toggleMode, logout } = useAppState();
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const navigate = useNavigate();
  const activeCategory =
    location.pathname === "/" ? searchParams.get("category") : null;

  const closeMobileNav = () => setMobileOpen(false);
  const handleLogout = () => {
    logout();
    closeMobileNav();
    navigate("/");
  };

  const categoryItems = (
    <>
      <ListItemButton
        component={Link}
        to="/"
        selected={location.pathname === "/" && !activeCategory}
        onClick={closeMobileNav}
      >
        <ListItemText primary="All products" />
      </ListItemButton>
      {categories?.map((category) => (
        <ListItemButton
          component={Link}
          to={`/?category=${encodeURIComponent(category)}`}
          selected={activeCategory === category}
          onClick={closeMobileNav}
          key={category}
        >
          <ListItemText primary={categoryLabel(category)} />
        </ListItemButton>
      ))}
    </>
  );

  return (
    <>
      <AppBar
        position="sticky"
        color="transparent"
        elevation={0}
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
          bgcolor: (theme) => alpha(theme.palette.background.default, 0.88),
          backdropFilter: "blur(18px)",
          borderBottom: 1,
          borderColor: "divider",
        }}
      >
        <Container>
          <Toolbar disableGutters sx={{ minHeight: { xs: 68, md: 76 } }}>
            <IconButton
              aria-label="Open navigation"
              onClick={() => setMobileOpen(true)}
              sx={{ display: { md: "none" }, mr: 1 }}
            >
              <MenuRounded />
            </IconButton>

            <Stack
              component={Link}
              to="/"
              direction="row"
              alignItems="center"
              spacing={1.15}
              sx={{
                color: "inherit",
                textDecoration: "none",
                mr: { xs: "auto", md: 4 },
              }}
              aria-label="Aster home"
            >
              <Box
                aria-hidden="true"
                sx={{
                  width: 34,
                  height: 34,
                  display: "grid",
                  placeItems: "center",
                  borderRadius: "50% 50% 48% 52%",
                  color: "primary.contrastText",
                  bgcolor: "primary.main",
                  fontSize: 18,
                  transform: "rotate(-8deg)",
                }}
              >
                ✦
              </Box>
              <Typography
                component="span"
                sx={{ fontWeight: 800, letterSpacing: "0.14em" }}
              >
                ASTER
              </Typography>
            </Stack>

            <Box
              component="nav"
              aria-label="Product categories"
              sx={{
                display: { xs: "none", md: "flex" },
                alignItems: "center",
                minWidth: 0,
                mr: "auto",
                gap: 0.5,
              }}
            >
              <Button
                component={Link}
                to="/"
                color={location.pathname === "/" && !activeCategory ? "primary" : "inherit"}
                variant={
                  location.pathname === "/" && !activeCategory ? "contained" : "text"
                }
                size="small"
              >
                All
              </Button>
              {isLoading &&
                Array.from({ length: 3 }, (_, index) => (
                  <Skeleton key={index} width={72} height={36} />
                ))}
              {isError && (
                <Typography variant="caption" color="text.secondary">
                  Categories unavailable
                </Typography>
              )}
              {categories?.map((category) => (
                <Button
                  component={Link}
                  to={`/?category=${encodeURIComponent(category)}`}
                  color={activeCategory === category ? "primary" : "inherit"}
                  variant={activeCategory === category ? "contained" : "text"}
                  size="small"
                  key={category}
                  sx={{ whiteSpace: "nowrap", px: 1.5 }}
                >
                  {categoryLabel(category)}
                </Button>
              ))}
            </Box>

            <Stack
              direction="row"
              alignItems="center"
              spacing={{ xs: 0, sm: 0.5 }}
              sx={{ flexShrink: 0 }}
            >
              <Tooltip title={`Use ${mode === "light" ? "dark" : "light"} theme`}>
                <IconButton onClick={toggleMode} aria-label={`Use ${mode === "light" ? "dark" : "light"} theme`}>
                  {mode === "light" ? <DarkModeOutlined /> : <LightModeOutlined />}
                </IconButton>
              </Tooltip>
              <Tooltip title="Wishlist">
                <IconButton
                  component={Link}
                  to="/wishlist"
                  aria-label={`Wishlist, ${wishlist.length} items`}
                  sx={{ display: { xs: "none", sm: "inline-flex" } }}
                >
                  <Badge badgeContent={auth ? wishlist.length : 0} color="secondary">
                    <FavoriteBorderRounded />
                  </Badge>
                </IconButton>
              </Tooltip>
              <Tooltip title="Shopping bag">
                <IconButton
                  component={Link}
                  to="/cart"
                  aria-label={`Shopping bag, ${cartCount} items`}
                  sx={{ display: { xs: "none", sm: "inline-flex" } }}
                >
                  <Badge badgeContent={auth ? cartCount : 0} color="secondary">
                    <ShoppingBagOutlined />
                  </Badge>
                </IconButton>
              </Tooltip>
              {auth ? (
                <Tooltip title={`Sign out ${auth.username}`}>
                  <IconButton
                    onClick={handleLogout}
                    aria-label="Sign out"
                    sx={{ display: { xs: "none", sm: "inline-flex" } }}
                  >
                    <LogoutRounded />
                  </IconButton>
                </Tooltip>
              ) : (
                <Tooltip title="Sign in">
                  <IconButton
                    component={Link}
                    to="/login"
                    aria-label="Sign in"
                    sx={{ display: { xs: "none", sm: "inline-flex" } }}
                  >
                    <AccountCircleOutlined />
                  </IconButton>
                </Tooltip>
              )}
            </Stack>
          </Toolbar>
        </Container>
      </AppBar>

      <Drawer
        open={mobileOpen}
        onClose={closeMobileNav}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { md: "none" },
          "& .MuiDrawer-paper": { width: "min(86vw, 340px)", p: 2 },
        }}
      >
        <Toolbar disableGutters sx={{ justifyContent: "space-between" }}>
          <Typography sx={{ fontWeight: 800, letterSpacing: "0.12em" }}>
            BROWSE
          </Typography>
          <IconButton onClick={closeMobileNav} aria-label="Close navigation">
            <CloseRounded />
          </IconButton>
        </Toolbar>
        <Divider />
        <List component="nav" aria-label="Mobile product categories">
          {categoryItems}
        </List>
        <Divider sx={{ my: 1 }} />
        <List>
          <ListItemButton component={Link} to="/wishlist" onClick={closeMobileNav}>
            <FavoriteBorderRounded sx={{ mr: 2 }} />
            <ListItemText primary="Wishlist" />
          </ListItemButton>
          <ListItemButton component={Link} to="/cart" onClick={closeMobileNav}>
            <ShoppingBagOutlined sx={{ mr: 2 }} />
            <ListItemText primary="Shopping bag" />
          </ListItemButton>
          {auth ? (
            <ListItemButton onClick={handleLogout}>
              <LogoutRounded sx={{ mr: 2 }} />
              <ListItemText
                primary="Sign out"
                secondary={`Signed in as ${auth.username}`}
              />
            </ListItemButton>
          ) : (
            <ListItemButton component={Link} to="/login" onClick={closeMobileNav}>
              <AccountCircleOutlined sx={{ mr: 2 }} />
              <ListItemText primary="Sign in" />
            </ListItemButton>
          )}
        </List>
      </Drawer>
    </>
  );
}
