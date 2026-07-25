import { Box, Container, Typography } from "@mui/material";
import { Outlet } from "react-router-dom";
import { Header } from "./Header";

export function AppLayout() {
  return (
    <Box sx={{ display: "flex", minHeight: "100vh", flexDirection: "column" }}>
      <a className="skip-link" href="#main-content">
        Skip to main content
      </a>
      <Header />
      <Box
        component="main"
        id="main-content"
        tabIndex={-1}
        sx={{ flexGrow: 1, outline: 0 }}
      >
        <Outlet />
      </Box>
      <Box component="footer" sx={{ py: 4.5, mt: "auto" }}>
        <Container>
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 1,
              pt: 3,
              borderTop: 1,
              borderColor: "divider",
            }}
          >
            <Typography variant="body2" fontWeight={700}>
              ASTER
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Thoughtful goods, powered by Fake Store API.
            </Typography>
          </Box>
        </Container>
      </Box>
    </Box>
  );
}
