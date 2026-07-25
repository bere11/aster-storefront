import ArrowBackRounded from "@mui/icons-material/ArrowBackRounded";
import FavoriteBorderRounded from "@mui/icons-material/FavoriteBorderRounded";
import FavoriteRounded from "@mui/icons-material/FavoriteRounded";
import LocalShippingOutlined from "@mui/icons-material/LocalShippingOutlined";
import LockOutlined from "@mui/icons-material/LockOutlined";
import ShoppingBagOutlined from "@mui/icons-material/ShoppingBagOutlined";
import StarRounded from "@mui/icons-material/StarRounded";
import {
  Alert,
  Box,
  Breadcrumbs,
  Button,
  Chip,
  Container,
  Divider,
  Link as MuiLink,
  Skeleton,
  Snackbar,
  Stack,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { ErrorPanel } from "../components/Feedback";
import { useProduct } from "../query/queries";
import { useAppState } from "../state/AppState";
import { categoryLabel, formatPrice } from "../utils/products";

export function ProductPage() {
  const { productId } = useParams();
  const parsedId = Number(productId);
  const { data: product, isLoading, isError, refetch } = useProduct(parsedId);
  const { auth, addToCart, isWishlisted, toggleWishlist } = useAppState();
  const [added, setAdded] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const requireAuth = (): boolean => {
    if (auth) return true;
    navigate(
      `/login?redirect=${encodeURIComponent(location.pathname + location.search)}`,
    );
    return false;
  };

  if (!Number.isInteger(parsedId) || parsedId < 1) {
    return (
      <Container sx={{ py: 10 }}>
        <ErrorPanel
          title="Product not found"
          message="This product address is not valid."
        />
      </Container>
    );
  }

  if (isLoading) {
    return (
      <Container aria-label="Loading product" aria-busy="true" sx={{ py: { xs: 4, md: 8 } }}>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { md: "minmax(0, 1fr) minmax(0, 0.9fr)" },
            gap: { xs: 4, md: 8 },
          }}
        >
          <Skeleton variant="rounded" sx={{ height: { xs: 380, md: 620 }, borderRadius: 5 }} />
          <Stack spacing={2}>
            <Skeleton width="25%" />
            <Skeleton height={70} />
            <Skeleton width="35%" height={45} />
            <Skeleton height={130} />
            <Skeleton height={52} />
          </Stack>
        </Box>
      </Container>
    );
  }

  if (isError || !product) {
    return (
      <Container sx={{ py: 10 }}>
        <ErrorPanel
          title="We couldn't find that product"
          message="It may be temporarily unavailable. Please try again."
          onRetry={() => void refetch()}
        />
      </Container>
    );
  }

  const wished = isWishlisted(product.id);

  const handleAddToCart = () => {
    if (!requireAuth()) return;
    addToCart(product);
    setAdded(true);
  };

  const handleWishlist = () => {
    if (!requireAuth()) return;
    toggleWishlist(product.id);
  };

  return (
    <Container className="route-enter" sx={{ py: { xs: 3, md: 6 } }}>
      <Breadcrumbs aria-label="Breadcrumb" sx={{ mb: { xs: 3, md: 5 } }}>
        <MuiLink component={Link} to="/" underline="hover" color="inherit">
          Shop
        </MuiLink>
        <MuiLink
          component={Link}
          to={`/?category=${encodeURIComponent(product.category)}`}
          underline="hover"
          color="inherit"
        >
          {categoryLabel(product.category)}
        </MuiLink>
        <Typography color="text.primary" noWrap sx={{ maxWidth: 220 }}>
          {product.title}
        </Typography>
      </Breadcrumbs>

      <Box
        component="article"
        sx={{
          display: "grid",
          gridTemplateColumns: { md: "minmax(0, 1.05fr) minmax(0, 0.85fr)" },
          gap: { xs: 4, sm: 6, md: 9 },
          alignItems: "start",
        }}
      >
        <Box
          sx={{
            display: "grid",
            placeItems: "center",
            minHeight: { xs: 390, sm: 520, md: 650 },
            p: { xs: 4, sm: 7, md: 10 },
            bgcolor: "background.paper",
            borderRadius: 5,
            boxShadow: "var(--shadow-soft)",
          }}
        >
          <Box
            component="img"
            src={product.image}
            alt={product.title}
            sx={{
              width: "100%",
              height: { xs: 310, sm: 410, md: 510 },
              objectFit: "contain",
            }}
          />
        </Box>

        <Stack sx={{ py: { md: 2 } }}>
          <Typography
            variant="overline"
            color="secondary.main"
            sx={{ fontWeight: 800, letterSpacing: "0.13em" }}
          >
            {categoryLabel(product.category)}
          </Typography>
          <Typography component="h1" variant="h2" sx={{ mt: 1 }}>
            {product.title}
          </Typography>
          <Stack direction="row" alignItems="center" spacing={1.25} sx={{ mt: 2.5 }}>
            <Chip
              icon={<StarRounded />}
              label={`${product.rating.rate.toFixed(1)} · ${product.rating.count} reviews`}
              sx={{
                "& .MuiChip-icon": { color: "#e1a524" },
              }}
            />
          </Stack>
          <Typography variant="h3" color="primary.main" sx={{ mt: 3.5 }}>
            {formatPrice(product.price)}
          </Typography>
          <Typography color="text.secondary" sx={{ mt: 3, lineHeight: 1.8, fontSize: "1.05rem" }}>
            {product.description}
          </Typography>

          <Divider sx={{ my: 4 }} />

          <Stack direction={{ xs: "column", sm: "row" }} spacing={1.5}>
            <Button
              variant="contained"
              size="large"
              startIcon={<ShoppingBagOutlined />}
              onClick={handleAddToCart}
              sx={{ flexGrow: 1 }}
            >
              Add to bag
            </Button>
            <Button
              variant="outlined"
              size="large"
              startIcon={
                wished ? <FavoriteRounded color="secondary" /> : <FavoriteBorderRounded />
              }
              onClick={handleWishlist}
              aria-pressed={wished}
            >
              {wished ? "Saved" : "Save"}
            </Button>
          </Stack>

          {!auth && (
            <Typography
              variant="caption"
              color="text.secondary"
              sx={{ mt: 1.5, display: "flex", alignItems: "center", gap: 0.75 }}
            >
              <LockOutlined fontSize="inherit" />
              Sign in to use your shopping bag and wishlist.
            </Typography>
          )}

          <Stack spacing={1.5} sx={{ mt: 4 }}>
            <Stack direction="row" alignItems="center" spacing={1.5}>
              <LocalShippingOutlined color="primary" />
              <Box>
                <Typography variant="body2" fontWeight={700}>
                  Complimentary delivery
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  On every demo order.
                </Typography>
              </Box>
            </Stack>
          </Stack>

          <Button
            component={Link}
            to="/"
            startIcon={<ArrowBackRounded />}
            color="inherit"
            sx={{ alignSelf: "flex-start", mt: 4, px: 0 }}
          >
            Back to the collection
          </Button>
        </Stack>
      </Box>

      <Snackbar
        open={added}
        autoHideDuration={3500}
        onClose={() => setAdded(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert severity="success" variant="filled" onClose={() => setAdded(false)}>
          Added to your shopping bag.
        </Alert>
      </Snackbar>
    </Container>
  );
}
