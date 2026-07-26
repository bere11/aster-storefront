import ArrowForwardRounded from "@mui/icons-material/ArrowForwardRounded";
import LockOutlined from "@mui/icons-material/LockOutlined";
import VisibilityOffOutlined from "@mui/icons-material/VisibilityOffOutlined";
import VisibilityOutlined from "@mui/icons-material/VisibilityOutlined";
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Container,
  IconButton,
  InputAdornment,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { isAxiosError } from "axios";
import { useState, type FormEvent } from "react";
import { Link, Navigate, useNavigate, useSearchParams } from "react-router-dom";
import { login } from "../api/storeApi";
import { useAppState } from "../state/AppState";
import { getSafeRedirect } from "../utils/products";

const DEMO_USERNAME = "mor_2314";
const DEMO_PASSWORD = "83r5^_";

export function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { auth, loginSession } = useAppState();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const redirect = getSafeRedirect(searchParams.get("redirect"));

  const loginMutation = useMutation({
    mutationFn: login,
    onSuccess: ({ token }) => {
      loginSession({ token, username });
      navigate(redirect, { replace: true });
    },
  });

  if (auth) {
    return <Navigate to={redirect} replace />;
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    loginMutation.mutate({ username: username.trim(), password });
  };

  const errorMessage = isAxiosError(loginMutation.error)
    ? loginMutation.error.response?.status === 401
      ? "Those credentials don't match a Fake Store API user."
      : "The sign-in service is unavailable. Please try again."
    : "We couldn't sign you in. Please try again.";

  return (
    <Container
      className="route-enter"
      sx={{
        display: "grid",
        placeItems: "center",
        minHeight: { xs: "calc(100vh - 180px)", md: "calc(100vh - 210px)" },
        py: 6,
      }}
    >
      <Paper
        component="section"
        elevation={0}
        sx={{
          width: "100%",
          minWidth: 0,
          maxWidth: 520,
          p: { xs: 3, sm: 5 },
          borderRadius: 1,
          border: 1,
          borderColor: "divider",
          boxShadow: "var(--shadow-soft)",
        }}
      >
        <Box
          sx={{
            display: "grid",
            placeItems: "center",
            width: 54,
            height: 54,
            borderRadius: 1,
            color: "primary.contrastText",
            bgcolor: "primary.main",
            mb: 3,
          }}
        >
          <LockOutlined />
        </Box>
        <Typography component="h1" variant="h3">
          Welcome back.
        </Typography>
        <Typography color="text.secondary" sx={{ mt: 1, overflowWrap: "anywhere" }}>
          Sign in to access your shopping bag and saved pieces.
        </Typography>

        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 4 }}>
          <Stack spacing={2.25}>
            {loginMutation.isError && (
              <Alert severity="error">{errorMessage}</Alert>
            )}
            <TextField
              label="Username"
              name="username"
              autoComplete="username"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              required
              fullWidth
            />
            <TextField
              label="Password"
              name="password"
              type={showPassword ? "text" : "password"}
              autoComplete="current-password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
              fullWidth
              slotProps={{
                input: {
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPassword((current) => !current)}
                        edge="end"
                        aria-label={showPassword ? "Hide password" : "Show password"}
                      >
                        {showPassword ? (
                          <VisibilityOffOutlined />
                        ) : (
                          <VisibilityOutlined />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                },
              }}
            />
            <Button
              type="submit"
              variant="contained"
              size="large"
              endIcon={
                loginMutation.isPending ? (
                  <CircularProgress color="inherit" size={18} />
                ) : (
                  <ArrowForwardRounded />
                )
              }
              disabled={loginMutation.isPending}
            >
              {loginMutation.isPending ? "Signing in…" : "Sign in"}
            </Button>
          </Stack>
        </Box>

        <Alert
          severity="info"
          variant="outlined"
          sx={{
            mt: 3,
            minWidth: 0,
            "& .MuiAlert-message": { minWidth: 0, overflow: "hidden" },
          }}
        >
          <Typography variant="body2" sx={{ overflowWrap: "anywhere" }}>
            Try the public demo account: <strong>{DEMO_USERNAME}</strong> /{" "}
            <strong>{DEMO_PASSWORD}</strong>
          </Typography>
          <Button
            size="small"
            onClick={() => {
              setUsername(DEMO_USERNAME);
              setPassword(DEMO_PASSWORD);
            }}
            sx={{ mt: 0.5, px: 0 }}
          >
            Fill demo credentials
          </Button>
        </Alert>

        <Button component={Link} to="/" color="inherit" sx={{ mt: 2, px: 0 }}>
          Continue browsing
        </Button>
      </Paper>
    </Container>
  );
}
