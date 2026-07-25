import FavoriteBorderRounded from "@mui/icons-material/FavoriteBorderRounded";
import { Box, Button, Container, Stack, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import {
  EmptyState,
  ErrorPanel,
  ProductGridSkeleton,
} from "../components/Feedback";
import { ProductCard } from "../components/ProductCard";
import { useProducts } from "../query/queries";
import { useAppState } from "../state/AppState";

export function WishlistPage() {
  const { wishlist } = useAppState();
  const { data: products = [], isLoading, isError, refetch } = useProducts();
  const savedProducts = products.filter((product) =>
    wishlist.includes(product.id),
  );

  return (
    <Container className="route-enter" sx={{ py: { xs: 4, md: 7 } }}>
      <Stack sx={{ mb: { xs: 3.5, md: 5 } }}>
        <Typography
          variant="overline"
          color="secondary.main"
          sx={{ fontWeight: 800, letterSpacing: "0.13em" }}
        >
          Keep for later
        </Typography>
        <Typography component="h1" variant="h2">
          Wishlist
        </Typography>
        {!isLoading && (
          <Typography color="text.secondary" sx={{ mt: 1 }}>
            {savedProducts.length} saved{" "}
            {savedProducts.length === 1 ? "piece" : "pieces"}
          </Typography>
        )}
      </Stack>

      {isLoading && <ProductGridSkeleton count={4} />}
      {isError && <ErrorPanel onRetry={() => void refetch()} />}
      {!isLoading && !isError && savedProducts.length === 0 && (
        <EmptyState
          title="Nothing saved yet"
          message="Tap the heart on a product to keep it close for later."
          action={
            <Button
              component={Link}
              to="/"
              variant="contained"
              startIcon={<FavoriteBorderRounded />}
            >
              Discover products
            </Button>
          }
        />
      )}
      {!isLoading && !isError && savedProducts.length > 0 && (
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "repeat(2, minmax(0, 1fr))",
              sm: "repeat(2, minmax(0, 1fr))",
              md: "repeat(3, minmax(0, 1fr))",
              lg: "repeat(4, minmax(0, 1fr))",
            },
            columnGap: { xs: 1.5, sm: 2.5, lg: 3 },
            rowGap: { xs: 4, md: 6 },
          }}
        >
          {savedProducts.map((product, index) => (
            <ProductCard product={product} index={index} key={product.id} />
          ))}
        </Box>
      )}
    </Container>
  );
}
