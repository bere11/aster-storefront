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
  Container,
  Divider,
  Link as MuiLink,
  Skeleton,
  Snackbar,
  Stack,
  Typography,
} from "@mui/material";
import { alpha, styled } from "@mui/material/styles";
import { useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { ErrorPanel } from "../components/Feedback";
import { useProduct } from "../query/queries";
import { useAppState } from "../state/AppState";
import { Eyebrow } from "../theme/primitives";
import { categoryLabel, formatPrice } from "../utils/products";

const DetailPage = styled(Container)(({ theme }) => ({
  paddingBlock: theme.spacing(3),
  [theme.breakpoints.up("md")]: {
    paddingBlock: theme.spacing(6),
  },
}));

const DetailLayout = styled("article")(({ theme }) => ({
  display: "grid",
  gap: theme.spacing(4),
  alignItems: "start",
  [theme.breakpoints.up("sm")]: {
    gap: theme.spacing(6),
  },
  [theme.breakpoints.up("md")]: {
    gridTemplateColumns: "minmax(0, 1.04fr) minmax(0, 0.8fr)",
    gap: theme.spacing(9),
  },
}));

const ProductStage = styled(Box)(({ theme }) => ({
  position: "relative",
  display: "grid",
  minHeight: 390,
  placeItems: "center",
  padding: theme.spacing(4),
  overflow: "hidden",
  backgroundColor:
    theme.palette.mode === "light"
      ? alpha(theme.palette.info.main, 0.09)
      : alpha(theme.palette.common.white, 0.04),
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: 6,
  [theme.breakpoints.up("sm")]: {
    minHeight: 520,
    padding: theme.spacing(7),
  },
  [theme.breakpoints.up("md")]: {
    minHeight: 650,
    padding: theme.spacing(9),
  },
}));

const StageNumber = styled("span")(({ theme }) => ({
  position: "absolute",
  top: theme.spacing(2),
  left: theme.spacing(2),
  color: alpha(theme.palette.text.primary, 0.35),
  fontFamily: 'Georgia, "Times New Roman", serif',
  fontSize: "4rem",
  lineHeight: 1,
  [theme.breakpoints.up("md")]: {
    top: theme.spacing(3),
    left: theme.spacing(3),
    fontSize: "6rem",
  },
}));

const ProductVisual = styled("img")(({ theme }) => ({
  width: "100%",
  height: 310,
  objectFit: "contain",
  mixBlendMode: theme.palette.mode === "light" ? "multiply" : "normal",
  animation: "image-reveal 650ms var(--ease-out) both",
  [theme.breakpoints.up("sm")]: {
    height: 410,
  },
  [theme.breakpoints.up("md")]: {
    height: 500,
  },
}));

const DetailInfo = styled(Stack)(({ theme }) => ({
  paddingBlock: theme.spacing(1),
  [theme.breakpoints.up("md")]: {
    position: "sticky",
    top: 126,
    paddingBlock: theme.spacing(2),
  },
}));

const ProductTitle = styled(Typography)(({ theme }) => ({
  marginTop: theme.spacing(0.5),
  fontFamily: 'Georgia, "Times New Roman", serif',
  fontSize: "2.8rem",
  fontWeight: 500,
  lineHeight: 1,
  overflowWrap: "anywhere",
  [theme.breakpoints.up("sm")]: {
    fontSize: "3.8rem",
  },
}));

const RatingRow = styled(Stack)(({ theme }) => ({
  width: "fit-content",
  marginTop: theme.spacing(2.5),
  paddingBlock: theme.spacing(1),
  color: theme.palette.text.secondary,
  borderBlock: `1px solid ${theme.palette.divider}`,
}));

const ActionRow = styled(Stack)(({ theme }) => ({
  gap: theme.spacing(1.5),
  [theme.breakpoints.up("sm")]: {
    flexDirection: "row",
  },
}));

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
      <DetailPage aria-label="Loading product" aria-busy="true">
        <DetailLayout>
          <Skeleton variant="rectangular" sx={{ minHeight: { xs: 390, md: 650 } }} />
          <Stack spacing={2}>
            <Skeleton width="25%" />
            <Skeleton height={160} />
            <Skeleton width="35%" height={45} />
            <Skeleton height={130} />
            <Skeleton height={52} />
          </Stack>
        </DetailLayout>
      </DetailPage>
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
    <DetailPage className="route-enter">
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

      <DetailLayout>
        <ProductStage>
          <StageNumber aria-hidden="true">
            {String(product.id).padStart(2, "0")}
          </StageNumber>
          <ProductVisual src={product.image} alt={product.title} />
        </ProductStage>

        <DetailInfo>
          <Eyebrow>{categoryLabel(product.category)}</Eyebrow>
          <ProductTitle as="h1" variant="h2">
            {product.title}
          </ProductTitle>

          <RatingRow direction="row" alignItems="center" spacing={0.75}>
            <StarRounded sx={{ color: "#d49b18", fontSize: 20 }} />
            <Typography variant="body2" fontWeight={700}>
              {product.rating.rate.toFixed(1)}
            </Typography>
            <Typography variant="body2">
              / {product.rating.count} reviews
            </Typography>
          </RatingRow>

          <Typography variant="h3" color="primary.main" sx={{ mt: 3.5 }}>
            {formatPrice(product.price)}
          </Typography>
          <Typography
            color="text.secondary"
            sx={{ mt: 3, lineHeight: 1.8, fontSize: "1.05rem" }}
          >
            {product.description}
          </Typography>

          <Divider sx={{ my: 4 }} />

          <ActionRow>
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
                wished ? (
                  <FavoriteRounded color="secondary" />
                ) : (
                  <FavoriteBorderRounded />
                )
              }
              onClick={handleWishlist}
              aria-pressed={wished}
            >
              {wished ? "Saved" : "Save"}
            </Button>
          </ActionRow>

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
        </DetailInfo>
      </DetailLayout>

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
    </DetailPage>
  );
}
