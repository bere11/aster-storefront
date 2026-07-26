import AddRounded from "@mui/icons-material/AddRounded";
import CheckCircleRounded from "@mui/icons-material/CheckCircleRounded";
import DeleteOutlineRounded from "@mui/icons-material/DeleteOutlineRounded";
import LocalShippingOutlined from "@mui/icons-material/LocalShippingOutlined";
import RemoveRounded from "@mui/icons-material/RemoveRounded";
import ShoppingBagOutlined from "@mui/icons-material/ShoppingBagOutlined";
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  IconButton,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { createCart } from "../api/storeApi";
import { EmptyState } from "../components/Feedback";
import { useAppState } from "../state/AppState";
import { Eyebrow, PageContainer, PageTitle } from "../theme/primitives";
import { formatPrice, getUserIdFromToken } from "../utils/products";

export function CartPage() {
  const {
    auth,
    cartLines,
    cartCount,
    setQuantity,
    removeFromCart,
    clearCart,
  } = useAppState();

  const checkout = useMutation({
    mutationFn: createCart,
    onSuccess: clearCart,
  });

  const subtotal = cartLines.reduce(
    (total, line) => total + line.product.price * line.quantity,
    0,
  );

  const handleCheckout = () => {
    if (!auth || cartLines.length === 0) return;
    checkout.mutate({
      userId: getUserIdFromToken(auth.token),
      date: new Date().toISOString().slice(0, 10),
      products: cartLines.map(({ product, quantity }) => ({
        productId: product.id,
        quantity,
      })),
    });
  };

  return (
    <PageContainer className="route-enter">
      <Stack
        direction="row"
        alignItems="flex-end"
        justifyContent="space-between"
        sx={{ mb: { xs: 3, md: 5 } }}
      >
        <Box>
          <Eyebrow>Your selection</Eyebrow>
          <PageTitle as="h1" variant="h2">
            Shopping bag
          </PageTitle>
        </Box>
        {cartLines.length > 0 && (
          <Button color="inherit" onClick={clearCart}>
            Clear bag
          </Button>
        )}
      </Stack>

      {cartLines.length === 0 ? (
        <EmptyState
          title="Your bag is ready for something good"
          message="Pieces you add from a product page will appear here."
          action={
            <Button
              component={Link}
              to="/"
              variant="contained"
              startIcon={<ShoppingBagOutlined />}
            >
              Browse the collection
            </Button>
          }
        />
      ) : (
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { lg: "minmax(0, 1fr) 390px" },
            gap: { xs: 4, lg: 7 },
            alignItems: "start",
          }}
        >
          <Stack divider={<Divider flexItem />} spacing={0}>
            {cartLines.map(({ product, quantity }) => (
              <Box
                component="article"
                key={product.id}
                sx={{
                  display: "grid",
                  gridTemplateColumns: { xs: "100px minmax(0, 1fr)", sm: "150px minmax(0, 1fr) auto" },
                  gap: { xs: 2, sm: 3 },
                  py: 3,
                }}
              >
                <Box
                  component={Link}
                  to={`/products/${product.id}`}
                  sx={{
                    display: "grid",
                    placeItems: "center",
                    height: { xs: 120, sm: 160 },
                    p: 2,
                    bgcolor: "background.paper",
                    borderRadius: 1,
                    border: 1,
                    borderColor: "divider",
                  }}
                >
                  <Box
                    component="img"
                    src={product.image}
                    alt={product.title}
                    sx={{ width: "100%", height: "100%", objectFit: "contain" }}
                  />
                </Box>

                <Stack alignItems="flex-start">
                  <Typography
                    component={Link}
                    to={`/products/${product.id}`}
                    variant="h6"
                    sx={{ color: "inherit", textDecoration: "none", lineHeight: 1.35 }}
                  >
                    {product.title}
                  </Typography>
                  <Typography color="text.secondary" variant="body2" sx={{ mt: 0.5 }}>
                    {product.category}
                  </Typography>
                  <Typography fontWeight={750} sx={{ mt: 1 }}>
                    {formatPrice(product.price)}
                  </Typography>
                  <Stack
                    direction="row"
                    alignItems="center"
                    spacing={0.5}
                    sx={{ mt: "auto", pt: 2 }}
                  >
                    <IconButton
                      size="small"
                      onClick={() => setQuantity(product.id, quantity - 1)}
                      aria-label={`Decrease quantity of ${product.title}`}
                    >
                      <RemoveRounded fontSize="small" />
                    </IconButton>
                    <Typography
                      aria-live="polite"
                      sx={{ minWidth: 34, textAlign: "center", fontWeight: 700 }}
                    >
                      {quantity}
                    </Typography>
                    <IconButton
                      size="small"
                      onClick={() => setQuantity(product.id, quantity + 1)}
                      aria-label={`Increase quantity of ${product.title}`}
                    >
                      <AddRounded fontSize="small" />
                    </IconButton>
                  </Stack>
                </Stack>

                <Stack
                  alignItems="flex-end"
                  justifyContent="space-between"
                  sx={{
                    gridColumn: { xs: "1 / -1", sm: "auto" },
                    flexDirection: { xs: "row", sm: "column" },
                  }}
                >
                  <Typography variant="h6">
                    {formatPrice(product.price * quantity)}
                  </Typography>
                  <IconButton
                    onClick={() => removeFromCart(product.id)}
                    aria-label={`Remove ${product.title} from bag`}
                  >
                    <DeleteOutlineRounded />
                  </IconButton>
                </Stack>
              </Box>
            ))}
          </Stack>

          <Paper
            component="aside"
            elevation={0}
            sx={{
              position: { lg: "sticky" },
              top: { lg: 106 },
              p: { xs: 3, sm: 4 },
              borderRadius: 1,
              border: 1,
              borderColor: "divider",
              boxShadow: "var(--shadow-soft)",
            }}
          >
            <Typography component="h2" variant="h5">
              Order summary
            </Typography>
            <Stack spacing={2} sx={{ mt: 3 }}>
              <Stack direction="row" justifyContent="space-between">
                <Typography color="text.secondary">
                  Subtotal ({cartCount} {cartCount === 1 ? "item" : "items"})
                </Typography>
                <Typography>{formatPrice(subtotal)}</Typography>
              </Stack>
              <Stack direction="row" justifyContent="space-between">
                <Typography color="text.secondary">Delivery</Typography>
                <Typography color="primary.main" fontWeight={700}>
                  Free
                </Typography>
              </Stack>
              <Divider />
              <Stack direction="row" justifyContent="space-between">
                <Typography variant="h6">Total</Typography>
                <Typography variant="h5">{formatPrice(subtotal)}</Typography>
              </Stack>
            </Stack>
            {checkout.isError && (
              <Alert severity="error" sx={{ mt: 2.5 }}>
                We couldn't place the demo order. Please try again.
              </Alert>
            )}
            <Button
              variant="contained"
              fullWidth
              size="large"
              onClick={handleCheckout}
              disabled={checkout.isPending}
              startIcon={
                checkout.isPending ? (
                  <CircularProgress color="inherit" size={18} />
                ) : (
                  <LocalShippingOutlined />
                )
              }
              sx={{ mt: 3 }}
            >
              {checkout.isPending ? "Placing order…" : "Place demo order"}
            </Button>
            <Typography
              variant="caption"
              color="text.secondary"
              sx={{ display: "block", textAlign: "center", mt: 1.5 }}
            >
              This sends a simulated cart to Fake Store API. No payment is taken.
            </Typography>
          </Paper>
        </Box>
      )}

      <Dialog
        open={checkout.isSuccess}
        onClose={() => checkout.reset()}
        aria-labelledby="order-success-title"
      >
        <DialogTitle id="order-success-title">
          <Stack direction="row" alignItems="center" spacing={1}>
            <CheckCircleRounded color="success" />
            <span>Demo order placed</span>
          </Stack>
        </DialogTitle>
        <DialogContent>
          <Typography color="text.secondary">
            Fake Store API accepted your cart
            {checkout.data?.id ? ` as order #${checkout.data.id}` : ""}. Your bag
            has been cleared.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button component={Link} to="/" onClick={() => checkout.reset()}>
            Continue shopping
          </Button>
        </DialogActions>
      </Dialog>
    </PageContainer>
  );
}
