import { useMemo, type ReactNode } from "react";
import {
  createTheme,
  responsiveFontSizes,
  ThemeProvider,
} from "@mui/material/styles";
import { useAppState } from "../state/AppState";

export function AppThemeProvider({ children }: { children: ReactNode }) {
  const { mode } = useAppState();

  const theme = useMemo(() => {
    const isLight = mode === "light";
    return responsiveFontSizes(
      createTheme({
        palette: {
          mode,
          primary: {
            main: isLight ? "#173f35" : "#8dd4bd",
            contrastText: isLight ? "#ffffff" : "#0b211b",
          },
          secondary: {
            main: isLight ? "#df6c55" : "#ff9a83",
          },
          background: {
            default: isLight ? "#f7f6f0" : "#0d1714",
            paper: isLight ? "#ffffff" : "#14231f",
          },
          text: {
            primary: isLight ? "#17201d" : "#eef7f3",
            secondary: isLight ? "#58625e" : "#aebcb7",
          },
          divider: isLight ? "rgba(23, 63, 53, 0.12)" : "rgba(220, 244, 235, 0.14)",
        },
        typography: {
          fontFamily:
            '"Inter", "Avenir Next", "Segoe UI", system-ui, -apple-system, sans-serif',
          h1: {
            fontWeight: 750,
            letterSpacing: "-0.045em",
            lineHeight: 1.02,
          },
          h2: {
            fontWeight: 720,
            letterSpacing: "-0.035em",
          },
          h3: {
            fontWeight: 700,
            letterSpacing: "-0.025em",
          },
          h4: {
            fontWeight: 700,
            letterSpacing: "-0.02em",
          },
          button: {
            fontWeight: 700,
            textTransform: "none",
          },
        },
        shape: {
          borderRadius: 14,
        },
        components: {
          MuiButton: {
            defaultProps: { disableElevation: true },
            styleOverrides: {
              root: {
                minHeight: 44,
                borderRadius: 999,
                paddingInline: 22,
              },
            },
          },
          MuiCard: {
            styleOverrides: {
              root: {
                backgroundImage: "none",
              },
            },
          },
          MuiContainer: {
            defaultProps: {
              maxWidth: "xl",
            },
          },
          MuiTextField: {
            defaultProps: {
              size: "small",
            },
          },
        },
      }),
    );
  }, [mode]);

  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}
