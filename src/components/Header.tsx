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
import { alpha, styled } from "@mui/material/styles";
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

const StoreAppBar = styled(AppBar)(({ theme }) => ({
  zIndex: theme.zIndex.drawer + 1,
  color: theme.palette.text.primary,
  backgroundColor: alpha(theme.palette.background.default, 0.94),
  backgroundImage: "none",
  borderBottom: `1px solid ${theme.palette.divider}`,
  boxShadow: "none",
  backdropFilter: "blur(14px)",
}));

const UtilityBar = styled(Box)(({ theme }) => ({
  display: "none",
  color: theme.palette.primary.contrastText,
  backgroundColor:
    theme.palette.mode === "light" ? "#153f36" : theme.palette.background.paper,
  [theme.breakpoints.up("sm")]: {
    display: "block",
  },
}));

const UtilityInner = styled(Container)({
  display: "flex",
  minHeight: 28,
  alignItems: "center",
  justifyContent: "space-between",
});

const MainToolbar = styled(Toolbar)(({ theme }) => ({
  minHeight: 68,
  [theme.breakpoints.up("md")]: {
    minHeight: 72,
  },
}));

const BrandLink = styled(Link)(({ theme }) => ({
  display: "inline-flex",
  flexShrink: 0,
  alignItems: "center",
  gap: theme.spacing(1.25),
  marginRight: "auto",
  color: "inherit",
  textDecoration: "none",
  [theme.breakpoints.up("md")]: {
    marginRight: theme.spacing(4),
  },
}));

const BrandMark = styled("span")(({ theme }) => ({
  display: "grid",
  width: 34,
  height: 34,
  placeItems: "center",
  color: theme.palette.primary.contrastText,
  backgroundColor: theme.palette.primary.main,
  borderRadius: 2,
  fontFamily: 'Georgia, "Times New Roman", serif',
  fontSize: "1.25rem",
  fontWeight: 700,
  lineHeight: 1,
}));

const DesktopCategories = styled("nav")(({ theme }) => ({
  display: "none",
  minWidth: 0,
  flex: 1,
  alignItems: "stretch",
  alignSelf: "stretch",
  gap: theme.spacing(0.5),
  [theme.breakpoints.up("md")]: {
    display: "flex",
  },
}));

const CategoryLink = styled(Link)(({ theme }) => ({
  position: "relative",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  minHeight: 0,
  paddingInline: theme.spacing(1.5),
  color: theme.palette.text.secondary,
  borderRadius: 0,
  fontSize: "0.875rem",
  fontWeight: 700,
  textDecoration: "none",
  whiteSpace: "nowrap",
  "&::after": {
    position: "absolute",
    right: theme.spacing(1.5),
    bottom: 0,
    left: theme.spacing(1.5),
    height: 3,
    backgroundColor: theme.palette.secondary.main,
    content: '""',
    transform: "scaleX(0)",
    transformOrigin: "left",
    transition: "transform var(--motion-fast) var(--ease-out)",
  },
  "&:hover": {
    color: theme.palette.text.primary,
    backgroundColor: "transparent",
  },
  '&[aria-current="page"]': {
    color: theme.palette.text.primary,
  },
  '&[aria-current="page"]::after': {
    transform: "scaleX(1)",
  },
}));

const HeaderActions = styled(Stack)(({ theme }) => ({
  flexShrink: 0,
  alignSelf: "stretch",
  marginLeft: theme.spacing(1),
  borderLeft: `1px solid ${theme.palette.divider}`,
}));

const HeaderAction = styled(IconButton)(({ theme }) => ({
  alignSelf: "stretch",
  width: 44,
  borderRadius: 0,
  color: theme.palette.text.secondary,
  "&:hover": {
    color: theme.palette.text.primary,
  },
}));

const HeaderActionLink = styled(Link)(({ theme }) => ({
  display: "inline-flex",
  width: 44,
  alignSelf: "stretch",
  alignItems: "center",
  justifyContent: "center",
  color: theme.palette.text.secondary,
  textDecoration: "none",
  transition: "background-color var(--motion-fast) ease, color var(--motion-fast) ease",
  "&:hover": {
    color: theme.palette.text.primary,
    backgroundColor: theme.palette.action.hover,
  },
}));

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

  const isAllActive = location.pathname === "/" && !activeCategory;

  const categoryItems = (
    <>
      <ListItemButton
        component={Link}
        to="/"
        selected={isAllActive}
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
      <StoreAppBar position="sticky">
        <UtilityBar>
          <UtilityInner>
            <Typography variant="caption" fontWeight={700}>
              Complimentary delivery on every demo order
            </Typography>
            <Typography variant="caption">
              Independent goods / Fake Store API
            </Typography>
          </UtilityInner>
        </UtilityBar>

        <Container>
          <MainToolbar disableGutters>
            <IconButton
              aria-label="Open navigation"
              onClick={() => setMobileOpen(true)}
              sx={{ display: { md: "none" }, mr: 1 }}
            >
              <MenuRounded />
            </IconButton>

            <BrandLink to="/" aria-label="Aster home">
              <BrandMark aria-hidden="true">A</BrandMark>
              <Box>
                <Typography
                  component="span"
                  sx={{ display: "block", fontWeight: 900, lineHeight: 1 }}
                >
                  ASTER
                </Typography>
                <Typography
                  component="span"
                  variant="caption"
                  color="text.secondary"
                  sx={{ display: { xs: "none", sm: "block" }, mt: 0.35 }}
                >
                  Goods department
                </Typography>
              </Box>
            </BrandLink>

            <DesktopCategories aria-label="Product categories">
              <CategoryLink
                to="/"
                aria-current={isAllActive ? "page" : undefined}
              >
                All
              </CategoryLink>
              {isLoading &&
                Array.from({ length: 3 }, (_, index) => (
                  <Skeleton key={index} width={72} height={40} sx={{ mx: 1 }} />
                ))}
              {isError && (
                <Typography
                  variant="caption"
                  color="text.secondary"
                  sx={{ alignSelf: "center", px: 2 }}
                >
                  Categories unavailable
                </Typography>
              )}
              {categories?.map((category) => (
                <CategoryLink
                  to={`/?category=${encodeURIComponent(category)}`}
                  aria-current={activeCategory === category ? "page" : undefined}
                  key={category}
                >
                  {categoryLabel(category)}
                </CategoryLink>
              ))}
            </DesktopCategories>

            <HeaderActions direction="row" alignItems="center">
              <Tooltip title={`Use ${mode === "light" ? "dark" : "light"} theme`}>
                <HeaderAction
                  onClick={toggleMode}
                  aria-label={`Use ${mode === "light" ? "dark" : "light"} theme`}
                >
                  {mode === "light" ? (
                    <DarkModeOutlined />
                  ) : (
                    <LightModeOutlined />
                  )}
                </HeaderAction>
              </Tooltip>
              <Tooltip title="Wishlist">
                <HeaderActionLink
                  to="/wishlist"
                  aria-label={`Wishlist, ${wishlist.length} items`}
                  sx={{ display: { xs: "none", sm: "inline-flex" } }}
                >
                  <Badge badgeContent={auth ? wishlist.length : 0} color="secondary">
                    <FavoriteBorderRounded />
                  </Badge>
                </HeaderActionLink>
              </Tooltip>
              <Tooltip title="Shopping bag">
                <HeaderActionLink
                  to="/cart"
                  aria-label={`Shopping bag, ${cartCount} items`}
                  sx={{ display: { xs: "none", sm: "inline-flex" } }}
                >
                  <Badge badgeContent={auth ? cartCount : 0} color="secondary">
                    <ShoppingBagOutlined />
                  </Badge>
                </HeaderActionLink>
              </Tooltip>
              {auth ? (
                <Tooltip title={`Sign out ${auth.username}`}>
                  <HeaderAction
                    onClick={handleLogout}
                    aria-label="Sign out"
                    sx={{ display: { xs: "none", sm: "inline-flex" } }}
                  >
                    <LogoutRounded />
                  </HeaderAction>
                </Tooltip>
              ) : (
                <Tooltip title="Sign in">
                  <HeaderActionLink
                    to="/login"
                    aria-label="Sign in"
                    sx={{ display: { xs: "none", sm: "inline-flex" } }}
                  >
                    <AccountCircleOutlined />
                  </HeaderActionLink>
                </Tooltip>
              )}
            </HeaderActions>
          </MainToolbar>
        </Container>
      </StoreAppBar>

      <Drawer
        open={mobileOpen}
        onClose={closeMobileNav}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { md: "none" },
          "& .MuiDrawer-paper": {
            width: "min(86vw, 340px)",
            p: 2,
            borderRadius: 0,
          },
        }}
      >
        <Toolbar disableGutters sx={{ justifyContent: "space-between" }}>
          <Stack direction="row" alignItems="center" spacing={1}>
            <BrandMark aria-hidden="true">A</BrandMark>
            <Typography fontWeight={900}>ASTER / BROWSE</Typography>
          </Stack>
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
