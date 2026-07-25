import ArrowBackRounded from "@mui/icons-material/ArrowBackRounded";
import { Box, Button, Container, Typography } from "@mui/material";
import { Link } from "react-router-dom";

export function NotFoundPage() {
  return (
    <Container
      className="route-enter"
      sx={{
        display: "grid",
        placeItems: "center",
        minHeight: "65vh",
        py: 8,
        textAlign: "center",
      }}
    >
      <Box>
        <Typography
          aria-hidden="true"
          sx={{
            fontSize: { xs: "6rem", md: "10rem" },
            fontWeight: 800,
            lineHeight: 0.9,
            color: "primary.main",
            opacity: 0.16,
          }}
        >
          404
        </Typography>
        <Typography component="h1" variant="h3" sx={{ mt: 2 }}>
          This page wandered off.
        </Typography>
        <Typography color="text.secondary" sx={{ mt: 1, mb: 3 }}>
          The collection is still right where you left it.
        </Typography>
        <Button
          component={Link}
          to="/"
          variant="contained"
          startIcon={<ArrowBackRounded />}
        >
          Return to the shop
        </Button>
      </Box>
    </Container>
  );
}
