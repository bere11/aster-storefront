import FavoriteRounded from "@mui/icons-material/FavoriteRounded";
import FavoriteBorderRounded from "@mui/icons-material/FavoriteBorderRounded";
import StarRounded from "@mui/icons-material/StarRounded";
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  Chip,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAppState } from "../state/AppState";
import type { Product } from "../types/api";
import { categoryLabel, formatPrice } from "../utils/products";

export function ProductCard({
  product,
  index = 0,
}: {
  product: Product;
  index?: number;
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
    <Card
      className="product-card"
      elevation={0}
      sx={{
        position: "relative",
        display: "flex",
        flexDirection: "column",
        minWidth: 0,
        height: "100%",
        overflow: "visible",
        bgcolor: "transparent",
        animationDelay: `${Math.min(index * 45, 360)}ms`,
      }}
    >
      <IconButton
        aria-label={
          wished
            ? `Remove ${product.title} from wishlist`
            : `Add ${product.title} to wishlist`
        }
        onClick={handleWishlist}
        sx={{
          position: "absolute",
          zIndex: 2,
          top: 10,
          right: 10,
          bgcolor: "background.paper",
          boxShadow: "0 6px 22px rgba(10, 35, 29, 0.12)",
          "&:hover": { bgcolor: "background.paper", transform: "scale(1.05)" },
        }}
      >
        {wished ? (
          <FavoriteRounded color="secondary" />
        ) : (
          <FavoriteBorderRounded />
        )}
      </IconButton>

      <CardActionArea
        component={Link}
        to={`/products/${product.id}`}
        aria-label={`View ${product.title}`}
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "stretch",
          flexGrow: 1,
          borderRadius: 4,
          "&:hover .product-image": {
            transform: "scale(1.045)",
          },
        }}
      >
        <Box
          sx={{
            position: "relative",
            display: "grid",
            placeItems: "center",
            width: "100%",
            aspectRatio: "4 / 4.6",
            p: { xs: 2.25, sm: 3.5 },
            overflow: "hidden",
            borderRadius: 4,
            bgcolor: "background.paper",
            boxShadow: "var(--shadow-soft)",
          }}
        >
          <Box
            component="img"
            className="product-image"
            src={product.image}
            alt={product.title}
            loading="lazy"
            sx={{
              width: "100%",
              height: "100%",
              objectFit: "contain",
              transition: "transform 320ms ease",
              mixBlendMode: (theme) =>
                theme.palette.mode === "light" ? "multiply" : "normal",
            }}
          />
        </Box>

        <CardContent
          sx={{
            display: "flex",
            flexDirection: "column",
            flexGrow: 1,
            px: { xs: 0.25, sm: 0.5 },
            pt: 1.75,
            pb: "0 !important",
          }}
        >
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            spacing={1}
          >
            <Typography
              variant="overline"
              color="text.secondary"
              sx={{ lineHeight: 1.2, letterSpacing: "0.09em" }}
            >
              {categoryLabel(product.category)}
            </Typography>
            <Chip
              size="small"
              icon={<StarRounded sx={{ fontSize: "15px !important" }} />}
              label={product.rating.rate.toFixed(1)}
              sx={{
                height: 25,
                bgcolor: "transparent",
                "& .MuiChip-label": { px: 0.5 },
                "& .MuiChip-icon": { color: "#e1a524", ml: 0 },
              }}
            />
          </Stack>
          <Typography
            component="h2"
            variant="subtitle1"
            sx={{
              mt: 0.75,
              fontWeight: 650,
              lineHeight: 1.35,
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {product.title}
          </Typography>
          <Typography
            variant="h6"
            sx={{ mt: "auto", pt: 1, fontWeight: 760 }}
          >
            {formatPrice(product.price)}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
