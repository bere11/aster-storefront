import ArrowDownwardRounded from "@mui/icons-material/ArrowDownwardRounded";
import ArrowForwardRounded from "@mui/icons-material/ArrowForwardRounded";
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
import { Eyebrow, ProductGrid } from "../theme/primitives";
import { useProducts } from "../query/queries";
import {
  categoryLabel,
  filterAndSortProducts,
  formatPrice,
  type ProductSort,
} from "../utils/products";

const HeroBand = styled("section")(({ theme }) => ({
  overflow: "hidden",
  backgroundColor: theme.palette.background.paper,
  borderBottom: `1px solid ${theme.palette.divider}`,
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
  fontFamily: 'Georgia, "Times New Roman", serif',
  fontSize: "2.75rem",
  fontWeight: 500,
  lineHeight: 0.98,
  overflowWrap: "anywhere",
  [theme.breakpoints.up("sm")]: {
    fontSize: "4.6rem",
  },
  [theme.breakpoints.up("lg")]: {
    fontSize: "5.65rem",
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
  gridTemplateRows: "1fr auto",
  overflow: "hidden",
  backgroundColor:
    theme.palette.mode === "light"
      ? alpha(theme.palette.info.main, 0.14)
      : alpha(theme.palette.info.main, 0.1),
  borderInline: `1px solid ${theme.palette.divider}`,
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
  "&:hover img": {
    transform: "translateY(-5px) scale(1.02)",
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

const HeroNumber = styled("span")(({ theme }) => ({
  position: "absolute",
  top: theme.spacing(2),
  left: theme.spacing(2),
  color: alpha(theme.palette.text.primary, 0.38),
  fontFamily: 'Georgia, "Times New Roman", serif',
  fontSize: "4rem",
  lineHeight: 1,
  [theme.breakpoints.up("md")]: {
    top: theme.spacing(3),
    left: theme.spacing(3),
    fontSize: "6.5rem",
  },
}));

const HeroProductBar = styled(Link)(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "minmax(0, 1fr) auto",
  gap: theme.spacing(2),
  alignItems: "center",
  padding: theme.spacing(2.25, 2.5),
  color: "#f5faf7",
  backgroundColor:
    theme.palette.mode === "light" ? theme.palette.primary.main : "#213f37",
  textDecoration: "none",
  "&:hover svg": {
    transform: "translateX(4px)",
  },
  "& svg": {
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
  const { data: products = [], isLoading, isError, refetch } = useProducts(category);

  const visibleProducts = useMemo(
    () => filterAndSortProducts(products, searchTerm, sort),
    [products, searchTerm, sort],
  );
  const featuredProduct = products[0];
  const collectionLabel = category ? categoryLabel(category) : "The full edit";

  return (
    <Box className="route-enter">
      <HeroBand aria-labelledby="home-heading">
        <HeroLayout>
          <HeroCopy>
            <Eyebrow>ASTER / EDIT NO. 01</Eyebrow>
            <HeroTitle id="home-heading" as="h1" variant="h1">
              {category
                ? `${categoryLabel(category)}, considered.`
                : "Everyday goods, edited with intent."}
            </HeroTitle>
            <HeroDescription>
              <Box component="span" sx={{ display: { xs: "inline", sm: "none" } }}>
                Useful pieces across wardrobe, jewelry, and technology, chosen
                for everyday life.
              </Box>
              <Box component="span" sx={{ display: { xs: "none", sm: "inline" } }}>
                A useful collection across wardrobe, jewelry, and technology.
                Selected with a preference for function, clarity, and things
                worth keeping close.
              </Box>
            </HeroDescription>
            <HeroActions spacing={1.5}>
              <Button
                href="#collection"
                variant="contained"
                endIcon={<ArrowDownwardRounded />}
              >
                Browse {collectionLabel.toLowerCase()}
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

          <HeroVisual aria-label="Featured product">
            {featuredProduct ? (
              <>
                <HeroImageLink to={`/products/${featuredProduct.id}`}>
                  <HeroNumber aria-hidden="true">01</HeroNumber>
                  <HeroImage
                    className="hero-product-image"
                    src={featuredProduct.image}
                    alt={featuredProduct.title}
                  />
                </HeroImageLink>
                <HeroProductBar to={`/products/${featuredProduct.id}`}>
                  <Box sx={{ minWidth: 0 }}>
                    <Typography variant="caption" sx={{ opacity: 0.72 }}>
                      FEATURED / {categoryLabel(featuredProduct.category)}
                    </Typography>
                    <Typography fontWeight={800} noWrap>
                      {featuredProduct.title}
                    </Typography>
                  </Box>
                  <Stack direction="row" alignItems="center" spacing={1}>
                    <Typography fontWeight={800}>
                      {formatPrice(featuredProduct.price)}
                    </Typography>
                    <ArrowForwardRounded />
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
              <Eyebrow>{category ? "FILTERED COLLECTION" : "CATALOG / 01"}</Eyebrow>
              <Typography id="collection-heading" component="h2" variant="h2">
                {category ? categoryLabel(category) : "Browse the collection"}
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
