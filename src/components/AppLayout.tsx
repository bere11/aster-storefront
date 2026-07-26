import AutoAwesomeRounded from "@mui/icons-material/AutoAwesomeRounded";
import { Box, Container, Stack, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { Link, Outlet } from "react-router-dom";
import { Header } from "./Header";

const SiteShell = styled(Box)({
  display: "flex",
  minHeight: "100vh",
  flexDirection: "column",
});

const Main = styled("main")({
  flexGrow: 1,
  outline: 0,
});

const Footer = styled("footer")(({ theme }) => ({
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

export function AppLayout() {
  return (
    <SiteShell>
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
    </SiteShell>
  );
}
