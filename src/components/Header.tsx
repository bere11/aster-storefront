import AccountCircleOutlined from "@mui/icons-material/AccountCircleOutlined";
import AutoAwesomeRounded from "@mui/icons-material/AutoAwesomeRounded";
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

const MainToolbar = styled(Toolbar)(({ theme }) => ({
  minHeight: 68,
  [theme.breakpoints.up("md")]: {
    minHeight: 72,
  },
}));

const HeaderSpacer = styled("div")(({ theme }) => ({
  flexShrink: 0,
  height: 68,
  [theme.breakpoints.up("md")]: {
    height: 72,
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
  borderRadius: "50%",
  lineHeight: 1,
  transition: "transform var(--motion-medium) var(--ease-out)",
  [`${BrandLink}:hover &`]: {
    transform: "rotate(12deg) scale(1.04)",
  },
}));

const DesktopCategories = styled("nav")(({ theme }) => ({
  display: "none",
  minWidth: 0,
  flex: 1,
  alignItems: "center",
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
  minHeight: 42,
  paddingInline: theme.spacing(1.5),
  color: theme.palette.text.secondary,
  borderRadius: 999,
  fontSize: "0.875rem",
  fontWeight: 700,
  textDecoration: "none",
  whiteSpace: "nowrap",
  "&:hover": {
    color: theme.palette.text.primary,
    backgroundColor: theme.palette.action.hover,
  },
  '&[aria-current="page"]': {
    color: theme.palette.primary.contrastText,
    backgroundColor: theme.palette.primary.main,
  },
}));

const HeaderActions = styled(Stack)(({ theme }) => ({
  flexShrink: 0,
  alignSelf: "stretch",
  marginLeft: theme.spacing(1),
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
      <StoreAppBar position="fixed">
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
              <BrandMark aria-hidden="true">
                <AutoAwesomeRounded fontSize="small" />
              </BrandMark>
              <Typography component="span" sx={{ fontWeight: 900, lineHeight: 1 }}>
                ASTER
              </Typography>
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
      <HeaderSpacer aria-hidden="true" />

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
            <BrandMark aria-hidden="true">
              <AutoAwesomeRounded fontSize="small" />
            </BrandMark>
            <Typography fontWeight={900}>ASTER</Typography>
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
