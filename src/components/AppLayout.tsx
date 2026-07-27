import AutoAwesomeRounded from "@mui/icons-material/AutoAwesomeRounded";
import { Box, Container, Stack, Typography } from "@mui/material";
import { alpha, styled } from "@mui/material/styles";
import { useEffect, useRef } from "react";
import {
  Link,
  Outlet,
  ScrollRestoration,
  useLocation,
} from "react-router-dom";
import { categoryLabel } from "../utils/products";
import { Header } from "./Header";

const SiteShell = styled(Box)({
  position: "relative",
  display: "flex",
  minHeight: "100vh",
  flexDirection: "column",
  isolation: "isolate",
});

const PageBackdrop = styled("div")(({ theme }) => {
  const frameColor = alpha(
    theme.palette.secondary.main,
    theme.palette.mode === "light" ? 0.045 : 0.06,
  );
  const blockColor = alpha(
    theme.palette.info.main,
    theme.palette.mode === "light" ? 0.04 : 0.055,
  );

  return {
    position: "absolute",
    zIndex: 0,
    inset: 0,
    overflow: "hidden",
    pointerEvents: "none",
    "&::before, & > span": {
      content: '""',
      position: "absolute",
      right: -330,
      width: 440,
      height: 440,
      border: `42px solid ${frameColor}`,
      borderRadius: 8,
      transform: "rotate(12deg)",
    },
    "&::before": {
      top: 720,
    },
    "&::after": {
      content: '""',
      position: "absolute",
      top: 1430,
      left: -72,
      width: 112,
      height: 360,
      backgroundColor: blockColor,
      transform: "rotate(-12deg)",
    },
    "& > span": {
      top: 2440,
      transform: "rotate(-8deg)",
    },
    '&[data-page="product"]': {
      "&::before, &::after, & > span": {
        display: "none",
      },
    },
    [theme.breakpoints.up("md")]: {
      "&::before, & > span": {
        right: -300,
        width: 480,
        height: 480,
        borderWidth: 48,
      },
      "&::after": {
        left: -62,
        width: 126,
        height: 420,
      },
    },
  };
});

const Main = styled("main")({
  position: "relative",
  zIndex: 1,
  flexGrow: 1,
  outline: 0,
});

const Footer = styled("footer")(({ theme }) => ({
  position: "relative",
  zIndex: 1,
  marginTop: "auto",
  paddingBlock: theme.spacing(4),
  color: theme.palette.text.primary,
  backgroundColor: theme.palette.background.paper,
  borderTop: `1px solid ${theme.palette.divider}`,
}));

const FooterInner = styled(Container)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(2),
  [theme.breakpoints.up("sm")]: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
}));

const FooterBrand = styled(Link)(({ theme }) => ({
  display: "inline-flex",
  width: "fit-content",
  alignItems: "center",
  gap: theme.spacing(1),
  color: "inherit",
  fontWeight: 900,
  textDecoration: "none",
}));

function getDocumentTitle(pathname: string, search: string): string {
  if (pathname === "/") {
    const category = new URLSearchParams(search).get("category");
    return category
      ? `${categoryLabel(category)} | Aster`
      : "Aster - Useful things, chosen well";
  }
  if (pathname.startsWith("/products/")) return "Product details | Aster";
  if (pathname === "/cart") return "Shopping bag | Aster";
  if (pathname === "/wishlist") return "Wishlist | Aster";
  if (pathname === "/login") return "Sign in | Aster";
  return "Page not found | Aster";
}

function RouteEffects() {
  const { pathname, search } = useLocation();
  const previousPathname = useRef(pathname);

  useEffect(() => {
    document.title = getDocumentTitle(pathname, search);
  }, [pathname, search]);

  useEffect(() => {
    if (previousPathname.current === pathname) return;
    previousPathname.current = pathname;
    document.getElementById("main-content")?.focus({ preventScroll: true });
  }, [pathname]);

  return null;
}

export function AppLayout() {
  const { pathname } = useLocation();

  return (
    <SiteShell>
      <PageBackdrop
        data-page={pathname.startsWith("/products/") ? "product" : "default"}
        aria-hidden="true"
      >
        <span />
      </PageBackdrop>
      <RouteEffects />
      <a className="skip-link" href="#main-content">
        Skip to main content
      </a>
      <Header />
      <Main id="main-content" tabIndex={-1}>
        <Outlet />
      </Main>
      <Footer>
        <FooterInner>
          <FooterBrand to="/">
            <AutoAwesomeRounded color="primary" fontSize="small" />
            <span>ASTER</span>
          </FooterBrand>
          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={{ xs: 0.5, sm: 3 }}
          >
            <Typography variant="body2" color="text.secondary">
              Thoughtful goods, powered by Fake Store API.
            </Typography>
            <Typography variant="body2" color="text.secondary">
              2026
            </Typography>
          </Stack>
        </FooterInner>
      </Footer>
      <ScrollRestoration />
    </SiteShell>
  );
}
