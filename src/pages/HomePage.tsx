import ArrowDownwardRounded from "@mui/icons-material/ArrowDownwardRounded";
import ArrowForwardRounded from "@mui/icons-material/ArrowForwardRounded";
import AutoAwesomeRounded from "@mui/icons-material/AutoAwesomeRounded";
import SearchRounded from "@mui/icons-material/SearchRounded";
import {
  Box,
  Button,
  Container,
  InputAdornment,
  LinearProgress,
  MenuItem,
  Skeleton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { alpha, styled } from "@mui/material/styles";
import { useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { EmptyState, ErrorPanel, ProductGridSkeleton } from "../components/Feedback";
import { ProductCard } from "../components/ProductCard";
import { ProductGrid } from "../theme/primitives";
import { useProducts } from "../query/queries";
import {
  categoryLabel,
  filterAndSortProducts,
  formatPrice,
  type ProductSort,
} from "../utils/products";

const HeroBand = styled("section")(({ theme }) => ({
  overflow: "hidden",
  backgroundColor: theme.palette.mode === "light" ? "#dfe9e2" : "#102c24",
  borderTop: `4px solid ${theme.palette.secondary.main}`,
  borderBottom: `1px solid ${theme.palette.divider}`,
}));

const HeroLayout = styled(Container)(({ theme }) => ({
  display: "grid",
  [theme.breakpoints.up("md")]: {
    minHeight: 570,
    gridTemplateColumns: "minmax(0, 1.1fr) minmax(360px, 0.78fr)",
  },
  [theme.breakpoints.up("lg")]: {
    gridTemplateColumns: "minmax(0, 0.9fr) minmax(420px, 0.75fr)",
  },
}));

const HeroCopy = styled(Box)(({ theme }) => ({
  position: "relative",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  isolation: "isolate",
  overflow: "hidden",
  paddingBlock: theme.spacing(4),
  "&::before": {
    content: '""',
    position: "absolute",
    zIndex: 0,
    top: 24,
    right: -64,
    width: 190,
    height: 190,
    border: `28px solid ${alpha(theme.palette.secondary.main, 0.13)}`,
    transform: "rotate(12deg)",
    pointerEvents: "none",
  },
  "&::after": {
    content: '""',
    position: "absolute",
    zIndex: 0,
    bottom: -72,
    left: -38,
    width: 72,
    height: 190,
    backgroundColor: alpha(theme.palette.info.main, 0.13),
    transform: "rotate(-12deg)",
    pointerEvents: "none",
  },
  "& > *": {
    position: "relative",
    zIndex: 1,
  },
  [theme.breakpoints.up("sm")]: {
    paddingBlock: theme.spacing(8),
  },
  [theme.breakpoints.up("md")]: {
    paddingRight: theme.spacing(8),
    "&::before": {
      top: 52,
      right: 24,
      width: 270,
      height: 270,
      borderWidth: 38,
    },
    "&::after": {
      bottom: -84,
      left: -52,
      width: 104,
      height: 260,
    },
  },
}));

const HeroTitle = styled(Typography)(({ theme }) => ({
  maxWidth: 780,
  fontFamily:
    '"Avenir Next", "Segoe UI", system-ui, -apple-system, sans-serif',
  fontSize: "2.9rem",
  fontWeight: 800,
  lineHeight: 1.02,
  overflowWrap: "anywhere",
  [theme.breakpoints.up("sm")]: {
    fontSize: "3.8rem",
  },
  [theme.breakpoints.up("lg")]: {
    fontSize: "5.15rem",
  },
}));

const HeroDescription = styled(Typography)(({ theme }) => ({
  maxWidth: 590,
  marginTop: theme.spacing(2),
  color: theme.palette.text.secondary,
  fontSize: "1rem",
  lineHeight: 1.55,
  [theme.breakpoints.up("sm")]: {
    marginTop: theme.spacing(3),
    fontSize: "1.16rem",
    lineHeight: 1.7,
  },
}));

const HeroActions = styled(Stack)(({ theme }) => ({
  marginTop: theme.spacing(3),
  [theme.breakpoints.up("sm")]: {
    flexDirection: "row",
    alignItems: "center",
  },
}));

const HeroVisual = styled(Box)(({ theme }) => ({
  position: "relative",
  display: "grid",
  minHeight: 275,
  gridTemplateRows: "minmax(0, 1fr) minmax(82px, auto)",
  overflow: "hidden",
  backgroundColor:
    theme.palette.mode === "light"
      ? "#c8dde0"
      : "#173c37",
  borderInline: `1px solid ${theme.palette.divider}`,
  "&::before": {
    content: '""',
    position: "absolute",
    zIndex: 0,
    insetBlock: 0,
    right: 0,
    width: "18%",
    backgroundColor: alpha(theme.palette.secondary.main, 0.22),
    pointerEvents: "none",
  },
  "&::after": {
    content: '""',
    position: "absolute",
    zIndex: 0,
    top: "13%",
    left: "16%",
    width: "68%",
    height: "60%",
    border: `1px solid ${alpha(theme.palette.primary.main, 0.24)}`,
    backgroundColor: alpha(theme.palette.background.paper, 0.28),
    transform: "rotate(-3deg)",
    pointerEvents: "none",
  },
  "& > *": {
    position: "relative",
    zIndex: 1,
  },
  "& > .hero-product-bar": {
    zIndex: 2,
  },
  "&:hover .hero-product-image, &:focus-within .hero-product-image": {
    transform: "translateY(-5px) scale(1.025)",
  },
  [theme.breakpoints.up("sm")]: {
    height: 360,
    minHeight: 0,
  },
  [theme.breakpoints.up("md")]: {
    height: "auto",
    minHeight: 570,
  },
}));

const HeroImageLink = styled(Link)(({ theme }) => ({
  position: "relative",
  display: "grid",
  minHeight: 0,
  placeItems: "center",
  padding: theme.spacing(3),
  color: "inherit",
  textDecoration: "none",
  [theme.breakpoints.up("md")]: {
    padding: theme.spacing(7),
  },
}));

const HeroImage = styled("img")(({ theme }) => ({
  width: "82%",
  height: "100%",
  maxHeight: 205,
  objectFit: "contain",
  mixBlendMode: theme.palette.mode === "light" ? "multiply" : "normal",
  filter:
    theme.palette.mode === "light"
      ? "drop-shadow(0 18px 16px rgba(21, 63, 54, 0.14))"
      : "drop-shadow(0 18px 18px rgba(0, 0, 0, 0.24))",
  transition: "transform var(--motion-medium) var(--ease-out)",
  [theme.breakpoints.up("sm")]: {
    width: "90%",
    maxHeight: 330,
  },
  [theme.breakpoints.up("md")]: {
    width: "100%",
    maxHeight: 400,
  },
}));

const HeroProductBar = styled(Link)(({ theme }) => ({
  display: "grid",
  minHeight: 82,
  gridTemplateColumns: "minmax(0, 1fr) minmax(92px, auto)",
  gap: theme.spacing(2),
  alignItems: "center",
  padding: theme.spacing(2.25, 2.5),
  color: "#f5faf7",
  backgroundColor:
    theme.palette.mode === "light" ? theme.palette.primary.main : "#213f37",
  textDecoration: "none",
  "&:hover .hero-product-arrow": {
    transform: "translateX(4px)",
  },
  "& .hero-product-arrow": {
    transition: "transform var(--motion-fast) ease",
  },
}));

const CollectionSection = styled("section")(({ theme }) => ({
  scrollMarginTop: "calc(68px + 1rem)",
  paddingBlock: theme.spacing(4),
  borderTop: `1px solid ${theme.palette.divider}`,
  [theme.breakpoints.up("sm")]: {
    paddingBlock: theme.spacing(6),
  },
  [theme.breakpoints.up("md")]: {
    scrollMarginTop: "calc(72px + 1rem)",
    paddingBlock: theme.spacing(9),
  },
}));

const CollectionHeader = styled(Box)(({ theme }) => ({
  display: "grid",
  gap: theme.spacing(3),
  marginBottom: theme.spacing(5),
  [theme.breakpoints.up("lg")]: {
    gridTemplateColumns: "minmax(0, 1fr) auto",
    alignItems: "end",
  },
}));

const FilterControls = styled(Stack)(({ theme }) => ({
  gap: theme.spacing(1.5),
  [theme.breakpoints.up("sm")]: {
    flexDirection: "row",
  },
}));

export function HomePage() {
  const [searchParams] = useSearchParams();
  const category = searchParams.get("category") ?? undefined;
  const [searchTerm, setSearchTerm] = useState("");
  const [sort, setSort] = useState<ProductSort>("featured");
  const {
    data: products = [],
    isFetching,
    isLoading,
    isError,
    isPlaceholderData,
    refetch,
  } = useProducts(category);

  const visibleProducts = useMemo(
    () => filterAndSortProducts(products, searchTerm, sort),
    [products, searchTerm, sort],
  );
  const featuredProduct = products[0];
  const collectionLabel = category ? categoryLabel(category) : "the collection";

  return (
    <Box className="route-enter">
      <HeroBand aria-labelledby="home-heading">
        <HeroLayout>
          <HeroCopy
            className="hero-copy-transition"
            key={category ?? "all-products"}
          >
            <HeroTitle id="home-heading" as="h1" variant="h1">
              {category
                ? `${categoryLabel(category)}, chosen well.`
                : "Useful things, chosen well."}
            </HeroTitle>
            <HeroDescription>
              <Box component="span" sx={{ display: { xs: "inline", sm: "none" } }}>
                Wardrobe, jewelry, and technology selected for everyday life.
              </Box>
              <Box component="span" sx={{ display: { xs: "none", sm: "inline" } }}>
                A considered collection of wardrobe essentials, jewelry, and
                technology for life in motion.
              </Box>
            </HeroDescription>
            <HeroActions spacing={1.5}>
              <Button
                href="#collection"
                variant="contained"
                endIcon={<ArrowDownwardRounded />}
                onClick={(event) => {
                  event.preventDefault();
                  document.getElementById("collection")?.scrollIntoView({
                    behavior: window.matchMedia(
                      "(prefers-reduced-motion: reduce)",
                    ).matches
                      ? "auto"
                      : "smooth",
                    block: "start",
                  });
                }}
              >
                Browse {category ? collectionLabel.toLowerCase() : "the collection"}
              </Button>
              {featuredProduct && (
                <Button
                  component={Link}
                  to={`/products/${featuredProduct.id}`}
                  color="inherit"
                  endIcon={<ArrowForwardRounded />}
                  sx={{ display: { xs: "none", sm: "inline-flex" } }}
                >
                  View featured piece
                </Button>
              )}
            </HeroActions>
          </HeroCopy>

          <HeroVisual aria-label="Featured product" aria-busy={isFetching}>
            {featuredProduct ? (
              <>
                <HeroImageLink
                  to={`/products/${featuredProduct.id}`}
                  key={`${featuredProduct.id}-image`}
                >
                  <HeroImage
                    className="hero-product-image"
                    src={featuredProduct.image}
                    alt={featuredProduct.title}
                  />
                </HeroImageLink>
                <HeroProductBar
                  className="hero-product-bar"
                  to={`/products/${featuredProduct.id}`}
                  key={`${featuredProduct.id}-details`}
                >
                  <Box sx={{ minWidth: 0 }}>
                    <Stack direction="row" alignItems="center" spacing={0.6}>
                      <AutoAwesomeRounded sx={{ fontSize: 15, opacity: 0.8 }} />
                      <Typography variant="caption" sx={{ opacity: 0.78 }}>
                        Featured pick
                      </Typography>
                    </Stack>
                    <Typography fontWeight={800} noWrap>
                      {featuredProduct.title}
                    </Typography>
                  </Box>
                  <Stack direction="row" alignItems="center" spacing={1}>
                    <Typography fontWeight={800}>
                      {formatPrice(featuredProduct.price)}
                    </Typography>
                    <ArrowForwardRounded className="hero-product-arrow" />
                  </Stack>
                </HeroProductBar>
              </>
            ) : (
              <Box sx={{ display: "grid", placeItems: "center", p: 5 }}>
                {isLoading ? (
                  <Skeleton
                    variant="rectangular"
                    width="72%"
                    height="72%"
                    sx={{ maxHeight: 360 }}
                  />
                ) : (
                  <Typography color="text.secondary">
                    Featured selection unavailable
                  </Typography>
                )}
              </Box>
            )}
          </HeroVisual>
        </HeroLayout>
      </HeroBand>

      <CollectionSection
        id="collection"
        aria-labelledby="collection-heading"
        aria-busy={isFetching}
      >
        <Container>
          <CollectionHeader>
            <Box>
              <Typography id="collection-heading" component="h2" variant="h2">
                {category ? categoryLabel(category) : "Shop the collection"}
              </Typography>
              {!isLoading && !isError && !isPlaceholderData && (
                <Typography color="text.secondary" sx={{ mt: 1 }}>
                  {visibleProducts.length}{" "}
                  {visibleProducts.length === 1 ? "product" : "products"}
                </Typography>
              )}
            </Box>

            <FilterControls>
              <TextField
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                placeholder="Search this collection"
                slotProps={{
                  htmlInput: {
                    "aria-label": "Search products",
                  },
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchRounded />
                      </InputAdornment>
                    ),
                  },
                }}
                sx={{ minWidth: { sm: 270 } }}
              />
              <TextField
                select
                label="Sort"
                value={sort}
                onChange={(event) => setSort(event.target.value as ProductSort)}
                slotProps={{
                  select: {
                    MenuProps: {
                      disableScrollLock: true,
                    },
                  },
                }}
                sx={{ minWidth: 165 }}
              >
                <MenuItem value="featured">Featured</MenuItem>
                <MenuItem value="price-asc">Price: low to high</MenuItem>
                <MenuItem value="price-desc">Price: high to low</MenuItem>
                <MenuItem value="rating">Top rated</MenuItem>
              </TextField>
            </FilterControls>
          </CollectionHeader>

          {isPlaceholderData && (
            <LinearProgress
              color="secondary"
              aria-label={`Updating ${collectionLabel}`}
              sx={{ height: 3, mb: 3 }}
            />
          )}
          {(isLoading || isPlaceholderData) && <ProductGridSkeleton />}
          {isError && <ErrorPanel onRetry={() => void refetch()} />}
          {!isLoading &&
            !isPlaceholderData &&
            !isError &&
            visibleProducts.length === 0 && (
            <EmptyState
              title="No products match"
              message="Try a broader search or return to the full collection."
              action={
                category ? (
                  <Button component={Link} to="/" variant="outlined">
                    View all products
                  </Button>
                ) : undefined
              }
            />
          )}
          {!isLoading &&
            !isPlaceholderData &&
            !isError &&
            visibleProducts.length > 0 && (
            <ProductGrid>
              {visibleProducts.map((product, index) => (
                <ProductCard
                  product={product}
                  index={index}
                  headingLevel="h3"
                  key={product.id}
                />
              ))}
            </ProductGrid>
          )}
        </Container>
      </CollectionSection>
    </Box>
  );
}
