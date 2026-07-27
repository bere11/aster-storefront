import FavoriteBorderRounded from "@mui/icons-material/FavoriteBorderRounded";
import FavoriteRounded from "@mui/icons-material/FavoriteRounded";
import StarRounded from "@mui/icons-material/StarRounded";
import {
  Box,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import { alpha, styled } from "@mui/material/styles";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAppState } from "../state/AppState";
import type { Product } from "../types/api";
import { categoryLabel, formatPrice } from "../utils/products";

const ProductCardRoot = styled("article")({
  position: "relative",
  minWidth: 0,
  height: "100%",
});

const ProductLink = styled(Link)(({ theme }) => ({
  display: "flex",
  height: "100%",
  flexDirection: "column",
  alignItems: "stretch",
  color: "inherit",
  borderRadius: 0,
  textDecoration: "none",
  "&:hover .product-image": {
    transform: "scale(1.035)",
  },
  "&:hover .product-title": {
    color: theme.palette.secondary.main,
  },
  "&:focus-visible": {
    outline: `3px solid ${theme.palette.info.main}`,
    outlineOffset: 4,
  },
}));

const ImageFrame = styled(Box)(({ theme }) => ({
  position: "relative",
  display: "grid",
  width: "100%",
  aspectRatio: "4 / 4.8",
  placeItems: "center",
  overflow: "hidden",
  padding: theme.spacing(2.25),
  backgroundColor:
    theme.palette.mode === "light"
      ? alpha(theme.palette.primary.main, 0.055)
      : alpha(theme.palette.common.white, 0.045),
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: 8,
  transition:
    "border-color var(--motion-fast) ease, box-shadow var(--motion-fast) ease",
  [theme.breakpoints.up("sm")]: {
    padding: theme.spacing(3.5),
  },
  [`${ProductLink}:hover &`]: {
    borderColor: alpha(theme.palette.primary.main, 0.42),
    boxShadow: "var(--shadow-lifted)",
  },
}));

const ProductImage = styled("img")(({ theme }) => ({
  width: "100%",
  height: "100%",
  objectFit: "contain",
  mixBlendMode: theme.palette.mode === "light" ? "multiply" : "normal",
  transition: "transform var(--motion-medium) var(--ease-out)",
}));

const WishlistAction = styled(IconButton)(({ theme }) => ({
  position: "absolute",
  zIndex: 2,
  top: theme.spacing(1),
  right: theme.spacing(1),
  color: theme.palette.text.primary,
  backgroundColor: alpha(theme.palette.background.paper, 0.92),
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: "50%",
  boxShadow: "0 5px 14px rgba(10, 35, 29, 0.08)",
  "&:hover": {
    color: theme.palette.secondary.main,
    backgroundColor: theme.palette.background.paper,
    transform: "translateY(-2px)",
  },
}));

const ProductDetails = styled(Box)(({ theme }) => ({
  display: "flex",
  minHeight: 126,
  flex: 1,
  flexDirection: "column",
  paddingTop: theme.spacing(1.75),
}));

const ProductTitle = styled(Typography)(({ theme }) => ({
  display: "-webkit-box",
  marginTop: theme.spacing(0.75),
  overflow: "hidden",
  fontWeight: 700,
  lineHeight: 1.35,
  transition: "color var(--motion-fast) ease",
  WebkitBoxOrient: "vertical",
  WebkitLineClamp: 2,
}));

export function ProductCard({
  product,
  index = 0,
  headingLevel = "h2",
}: {
  product: Product;
  index?: number;
  headingLevel?: "h2" | "h3";
}) {
  const { auth, isWishlisted, toggleWishlist } = useAppState();
  const location = useLocation();
  const navigate = useNavigate();
  const wished = isWishlisted(product.id);

  const handleWishlist = () => {
    if (!auth) {
      const redirect = encodeURIComponent(location.pathname + location.search);
      navigate(`/login?redirect=${redirect}`);
      return;
    }
    toggleWishlist(product.id);
  };

  return (
    <ProductCardRoot
      className="product-card"
      style={{ animationDelay: `${Math.min(index * 45, 360)}ms` }}
    >
      <WishlistAction
        aria-label={
          wished
            ? `Remove ${product.title} from wishlist`
            : `Add ${product.title} to wishlist`
        }
        onClick={handleWishlist}
      >
        {wished ? (
          <FavoriteRounded color="secondary" />
        ) : (
          <FavoriteBorderRounded />
        )}
      </WishlistAction>

      <ProductLink
        to={`/products/${product.id}`}
        aria-label={`View ${product.title}`}
      >
        <ImageFrame>
          <ProductImage
            className="product-image"
            src={product.image}
            alt={product.title}
            loading="lazy"
          />
        </ImageFrame>

        <ProductDetails>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            spacing={1}
          >
            <Typography
              variant="caption"
              color="text.secondary"
              noWrap
            >
              {categoryLabel(product.category)}
            </Typography>
            <Stack
              direction="row"
              alignItems="center"
              spacing={0.35}
              color="text.secondary"
            >
              <StarRounded sx={{ color: "#d49b18", fontSize: 16 }} />
              <Typography variant="caption">
                {product.rating.rate.toFixed(1)}
              </Typography>
            </Stack>
          </Stack>
          <ProductTitle
            className="product-title"
            as={headingLevel}
            variant="subtitle1"
          >
            {product.title}
          </ProductTitle>
          <Typography
            component="p"
            variant="h6"
            color="primary.main"
            sx={{ mt: "auto", pt: 1.25, fontWeight: 800 }}
          >
            {formatPrice(product.price)}
          </Typography>
        </ProductDetails>
      </ProductLink>
    </ProductCardRoot>
  );
}
