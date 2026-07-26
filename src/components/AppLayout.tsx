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
  paddingBlock: theme.spacing(5),
  color: theme.palette.text.primary,
  backgroundColor: theme.palette.background.paper,
  borderTop: `1px solid ${theme.palette.divider}`,
  [theme.breakpoints.up("md")]: {
    paddingBlock: theme.spacing(7),
  },
}));

const FooterGrid = styled(Container)(({ theme }) => ({
  display: "grid",
  gap: theme.spacing(4),
  [theme.breakpoints.up("sm")]: {
    gridTemplateColumns: "minmax(0, 1.4fr) repeat(2, minmax(150px, 0.5fr))",
    alignItems: "end",
  },
}));

const FooterLink = styled(Link)(({ theme }) => ({
  width: "fit-content",
  color: theme.palette.text.secondary,
  textDecoration: "none",
  transition: "color var(--motion-fast) ease",
  "&:hover": {
    color: theme.palette.secondary.main,
  },
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
        <FooterGrid>
          <Box>
            <Typography
              sx={{
                fontFamily: 'Georgia, "Times New Roman", serif',
                fontSize: "2rem",
                lineHeight: 1,
              }}
            >
              Aster
            </Typography>
            <Typography color="text.secondary" sx={{ mt: 1, maxWidth: 360 }}>
              Independent goods selected for useful, everyday living.
            </Typography>
          </Box>

          <Stack component="nav" aria-label="Footer shop links" spacing={1}>
            <Typography variant="caption" fontWeight={800}>
              SHOP
            </Typography>
            <FooterLink to="/">Collection</FooterLink>
            <FooterLink to="/wishlist">Wishlist</FooterLink>
          </Stack>

          <Stack spacing={1}>
            <Typography variant="caption" fontWeight={800}>
              ACCOUNT
            </Typography>
            <FooterLink to="/cart">Shopping bag</FooterLink>
            <FooterLink to="/login">Sign in</FooterLink>
          </Stack>
        </FooterGrid>
      </Footer>
    </SiteShell>
  );
}
