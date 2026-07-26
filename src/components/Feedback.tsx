import RefreshRounded from "@mui/icons-material/RefreshRounded";
import SearchOffRounded from "@mui/icons-material/SearchOffRounded";
import {
  Alert,
  AlertTitle,
  Box,
  Button,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";
import { ProductGrid } from "../theme/primitives";

export function ErrorPanel({
  title = "Something went wrong",
  message = "We couldn't load this content. Check your connection and try again.",
  onRetry,
}: {
  title?: string;
  message?: string;
  onRetry?: () => void;
}) {
  return (
    <Alert
      severity="error"
      variant="outlined"
      sx={{ borderRadius: 1, alignItems: "center", py: 1.5 }}
      action={
        onRetry ? (
          <Button
            color="inherit"
            size="small"
            startIcon={<RefreshRounded />}
            onClick={onRetry}
          >
            Try again
          </Button>
        ) : undefined
      }
    >
      <AlertTitle>{title}</AlertTitle>
      {message}
    </Alert>
  );
}

export function ProductGridSkeleton({ count = 8 }: { count?: number }) {
  return (
    <ProductGrid
      aria-label="Loading products"
      aria-busy="true"
    >
      {Array.from({ length: count }, (_, index) => (
        <Box key={index}>
          <Skeleton
            variant="rounded"
            sx={{ borderRadius: 1, aspectRatio: "4 / 4.8", height: "auto" }}
          />
          <Skeleton width="38%" sx={{ mt: 1.5 }} />
          <Skeleton width="88%" />
          <Skeleton width="28%" />
        </Box>
      ))}
    </ProductGrid>
  );
}

export function EmptyState({
  title,
  message,
  action,
}: {
  title: string;
  message: string;
  action?: React.ReactNode;
}) {
  return (
    <Stack
      alignItems="center"
      textAlign="center"
      spacing={1.5}
      sx={{ py: { xs: 8, md: 12 }, px: 2 }}
    >
      <Box
        sx={{
          width: 64,
          height: 64,
          display: "grid",
          placeItems: "center",
          borderRadius: 1,
          color: "text.secondary",
          bgcolor: "action.hover",
          border: 1,
          borderColor: "divider",
        }}
      >
        <SearchOffRounded fontSize="large" />
      </Box>
      <Typography variant="h5" component="h2">
        {title}
      </Typography>
      <Typography color="text.secondary" sx={{ maxWidth: 460 }}>
        {message}
      </Typography>
      {action}
    </Stack>
  );
}
