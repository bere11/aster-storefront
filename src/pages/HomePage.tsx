import ArrowForwardRounded from "@mui/icons-material/ArrowForwardRounded";
import SearchRounded from "@mui/icons-material/SearchRounded";
import {
  Box,
  Button,
  Container,
  InputAdornment,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { EmptyState, ErrorPanel, ProductGridSkeleton } from "../components/Feedback";
import { ProductCard } from "../components/ProductCard";
import { useProducts } from "../query/queries";
import {
  categoryLabel,
  filterAndSortProducts,
  type ProductSort,
} from "../utils/products";

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

  return (
    <Box className="route-enter">
      <Box
        component="section"
        aria-labelledby="home-heading"
        sx={{
          position: "relative",
          overflow: "hidden",
          py: { xs: 7, sm: 9, md: 12 },
          borderBottom: 1,
          borderColor: "divider",
          "&::after": {
            content: '""',
            position: "absolute",
            width: { xs: 220, md: 420 },
            height: { xs: 220, md: 420 },
            right: { xs: -110, md: "6%" },
            top: { xs: -90, md: -150 },
            borderRadius: "48% 52% 62% 38%",
            bgcolor: "secondary.main",
            opacity: 0.13,
            transform: "rotate(18deg)",
          },
          "&::before": {
            content: '""',
            position: "absolute",
            width: 160,
            height: 160,
            right: { xs: "30%", md: "28%" },
            bottom: -120,
            borderRadius: "50%",
            border: "36px solid",
            borderColor: "primary.main",
            opacity: 0.09,
          },
        }}
      >
        <Container sx={{ position: "relative", zIndex: 1 }}>
          <Stack spacing={2.5} sx={{ maxWidth: 820 }}>
            <Typography
              variant="overline"
              color="secondary.main"
              sx={{ fontWeight: 800, letterSpacing: "0.16em" }}
            >
              The everyday edit · 2026
            </Typography>
            <Typography
              id="home-heading"
              component="h1"
              variant="h1"
              sx={{
                fontSize: { xs: "2.55rem", sm: "4.25rem", md: "5.5rem" },
                overflowWrap: "anywhere",
              }}
            >
              Useful things,
              <Box component="span" sx={{ color: "primary.main" }}>
                {" "}
                chosen well.
              </Box>
            </Typography>
            <Typography
              variant="h6"
              color="text.secondary"
              sx={{ maxWidth: 620, fontWeight: 400, lineHeight: 1.6 }}
            >
              A considered collection of wardrobe essentials, jewelry, and
              technology for life in motion.
            </Typography>
            <Button
              href="#collection"
              endIcon={<ArrowForwardRounded />}
              sx={{ alignSelf: "flex-start" }}
              variant="contained"
            >
              Explore the collection
            </Button>
          </Stack>
        </Container>
      </Box>

      <Container
        component="section"
        id="collection"
        aria-labelledby="collection-heading"
        sx={{ py: { xs: 5, md: 8 } }}
      >
        <Stack
          direction={{ xs: "column", md: "row" }}
          justifyContent="space-between"
          alignItems={{ xs: "stretch", md: "flex-end" }}
          spacing={3}
          sx={{ mb: { xs: 3.5, md: 5 } }}
        >
          <Box>
            <Typography
              variant="overline"
              color="text.secondary"
              sx={{ letterSpacing: "0.12em" }}
            >
              {category ? "Filtered collection" : "Our collection"}
            </Typography>
            <Typography id="collection-heading" component="h2" variant="h3">
              {category ? categoryLabel(category) : "Find your next favorite"}
            </Typography>
            {!isLoading && !isError && (
              <Typography color="text.secondary" sx={{ mt: 0.75 }}>
                {visibleProducts.length}{" "}
                {visibleProducts.length === 1 ? "product" : "products"}
              </Typography>
            )}
          </Box>

          <Stack direction={{ xs: "column", sm: "row" }} spacing={1.5}>
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
              sx={{ minWidth: { sm: 260 } }}
            />
            <TextField
              select
              label="Sort"
              value={sort}
              onChange={(event) => setSort(event.target.value as ProductSort)}
              sx={{ minWidth: 155 }}
            >
              <MenuItem value="featured">Featured</MenuItem>
              <MenuItem value="price-asc">Price: low to high</MenuItem>
              <MenuItem value="price-desc">Price: high to low</MenuItem>
              <MenuItem value="rating">Top rated</MenuItem>
            </TextField>
          </Stack>
        </Stack>

        {isLoading && <ProductGridSkeleton />}
        {isError && <ErrorPanel onRetry={() => void refetch()} />}
        {!isLoading && !isError && visibleProducts.length === 0 && (
          <EmptyState
            title="No products found"
            message="Try a different search term or return to the full collection."
            action={
              <Button component={Link} to="/" variant="outlined">
                View all products
              </Button>
            }
          />
        )}
        {!isLoading && !isError && visibleProducts.length > 0 && (
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
            {visibleProducts.map((product, index) => (
              <ProductCard product={product} index={index} key={product.id} />
            ))}
          </Box>
        )}
      </Container>
    </Box>
  );
}
