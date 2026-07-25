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
      sx={{ borderRadius: 3, alignItems: "center", py: 1.5 }}
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
    <Box
      aria-label="Loading products"
      aria-busy="true"
      sx={{
        display: "grid",
        gridTemplateColumns: {
          xs: "repeat(2, minmax(0, 1fr))",
          sm: "repeat(2, minmax(0, 1fr))",
          md: "repeat(3, minmax(0, 1fr))",
          lg: "repeat(4, minmax(0, 1fr))",
        },
        gap: { xs: 1.5, sm: 2.5 },
      }}
    >
      {Array.from({ length: count }, (_, index) => (
        <Box key={index}>
          <Skeleton
            variant="rounded"
            sx={{ borderRadius: 4, aspectRatio: "4 / 4.8", height: "auto" }}
          />
          <Skeleton width="38%" sx={{ mt: 1.5 }} />
          <Skeleton width="88%" />
          <Skeleton width="28%" />
        </Box>
      ))}
    </Box>
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
          borderRadius: "50%",
          color: "text.secondary",
          bgcolor: "action.hover",
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
