import FavoriteBorderRounded from "@mui/icons-material/FavoriteBorderRounded";
import { Button, Stack, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import {
  EmptyState,
  ErrorPanel,
  ProductGridSkeleton,
} from "../components/Feedback";
import { ProductCard } from "../components/ProductCard";
import { useProducts } from "../query/queries";
import { useAppState } from "../state/AppState";
import {
  PageContainer,
  PageTitle,
  ProductGrid,
} from "../theme/primitives";

export function WishlistPage() {
  const { wishlist } = useAppState();
  const { data: products = [], isLoading, isError, refetch } = useProducts();
  const savedProducts = products.filter((product) =>
    wishlist.includes(product.id),
  );

  return (
    <PageContainer className="route-enter">
      <Stack sx={{ mb: { xs: 3.5, md: 5 } }}>
        <PageTitle as="h1" variant="h2">
          Wishlist
        </PageTitle>
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
        <ProductGrid>
          {savedProducts.map((product, index) => (
            <ProductCard product={product} index={index} key={product.id} />
          ))}
        </ProductGrid>
      )}
    </PageContainer>
  );
}
