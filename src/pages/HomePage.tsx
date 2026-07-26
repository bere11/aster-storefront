import ArrowDownwardRounded from "@mui/icons-material/ArrowDownwardRounded";
import ArrowForwardRounded from "@mui/icons-material/ArrowForwardRounded";
import AutoAwesomeRounded from "@mui/icons-material/AutoAwesomeRounded";
import SearchRounded from "@mui/icons-material/SearchRounded";
import {
  Box,
  Button,
  Container,
  InputAdornment,
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
  backgroundColor: theme.palette.mode === "light" ? "#e8efea" : "#112720",
  borderBottom: `1px solid ${theme.palette.divider}`,
  boxShadow: `inset 0 4px 0 ${theme.palette.secondary.main}`,
}));

const HeroLayout = styled(Container)(({ theme }) => ({
  display: "grid",
  [theme.breakpoints.up("md")]: {
    minHeight: 570,
    gridTemplateColumns: "minmax(0, 0.9fr) minmax(420px, 0.75fr)",
  },
}));

const HeroCopy = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  paddingBlock: theme.spacing(4),
  [theme.breakpoints.up("sm")]: {
    paddingBlock: theme.spacing(8),
  },
  [theme.breakpoints.up("md")]: {
    paddingRight: theme.spacing(8),
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
    fontSize: "4.2rem",
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
      ? alpha(theme.palette.info.main, 0.14)
      : alpha(theme.palette.info.main, 0.1),
  borderInline: `1px solid ${theme.palette.divider}`,
  "&:hover .hero-product-image, &:focus-within .hero-product-image": {
    transform: "translateY(-5px) scale(1.025)",
  },
  [theme.breakpoints.up("md")]: {
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
  paddingBlock: theme.spacing(4),
  borderTop: `1px solid ${theme.palette.divider}`,
  [theme.breakpoints.up("sm")]: {
    paddingBlock: theme.spacing(6),
  },
  [theme.breakpoints.up("md")]: {
    paddingBlock: theme.spacing(9),
  },
}));

const CollectionHeader = styled(Box)(({ theme }) => ({
  display: "grid",
  gap: theme.spacing(3),
  marginBottom: theme.spacing(5),
  [theme.breakpoints.up("md")]: {
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

      <CollectionSection id="collection" aria-labelledby="collection-heading">
        <Container>
          <CollectionHeader>
            <Box>
              <Typography id="collection-heading" component="h2" variant="h2">
                {category ? categoryLabel(category) : "Shop the collection"}
              </Typography>
              {!isLoading && !isError && (
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
                aria-label="Search products"
                slotProps={{
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

          {isLoading && <ProductGridSkeleton />}
          {isError && <ErrorPanel onRetry={() => void refetch()} />}
          {!isLoading && !isError && visibleProducts.length === 0 && (
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
          {!isLoading && !isError && visibleProducts.length > 0 && (
            <ProductGrid>
              {visibleProducts.map((product, index) => (
                <ProductCard product={product} index={index} key={product.id} />
              ))}
            </ProductGrid>
          )}
        </Container>
      </CollectionSection>
    </Box>
  );
}
