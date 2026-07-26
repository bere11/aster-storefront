import { useMemo, type ReactNode } from "react";
import {
  createTheme,
  responsiveFontSizes,
  ThemeProvider,
} from "@mui/material/styles";
import { useAppState } from "../state/AppState";

const bodyFont =
  '"Avenir Next", "Segoe UI", system-ui, -apple-system, sans-serif';

export function AppThemeProvider({ children }: { children: ReactNode }) {
  const { mode } = useAppState();

  const theme = useMemo(() => {
    const isLight = mode === "light";
    return responsiveFontSizes(
      createTheme({
        palette: {
          mode,
          primary: {
            main: isLight ? "#153f36" : "#91d6c1",
            contrastText: isLight ? "#ffffff" : "#0b211b",
          },
          secondary: {
            main: isLight ? "#d84a36" : "#ff8f79",
          },
          info: {
            main: isLight ? "#32758d" : "#79bfd7",
          },
          background: {
            default: isLight ? "#f4f6f3" : "#0c1512",
            paper: isLight ? "#ffffff" : "#14211d",
          },
          text: {
            primary: isLight ? "#17211d" : "#edf5f1",
            secondary: isLight ? "#59655f" : "#acbbb5",
          },
          divider: isLight
            ? "rgba(21, 63, 54, 0.17)"
            : "rgba(220, 244, 235, 0.16)",
        },
        typography: {
          fontFamily: bodyFont,
          h1: {
            fontFamily: bodyFont,
            fontWeight: 800,
            letterSpacing: 0,
            lineHeight: 1,
          },
          h2: {
            fontFamily: bodyFont,
            fontWeight: 780,
            letterSpacing: 0,
            lineHeight: 1.05,
          },
          h3: {
            fontFamily: bodyFont,
            fontWeight: 760,
            letterSpacing: 0,
            lineHeight: 1.08,
          },
          h4: {
            fontFamily: bodyFont,
            fontWeight: 740,
            letterSpacing: 0,
            lineHeight: 1.1,
          },
          h5: {
            fontFamily: bodyFont,
            fontWeight: 720,
            letterSpacing: 0,
          },
          h6: {
            letterSpacing: 0,
          },
          button: {
            fontWeight: 700,
            letterSpacing: 0,
            textTransform: "none",
          },
          overline: {
            fontWeight: 800,
            letterSpacing: 0,
          },
        },
        shape: {
          borderRadius: 6,
        },
        components: {
          MuiButton: {
            defaultProps: { disableElevation: true },
            styleOverrides: {
              root: {
                minHeight: 44,
                borderRadius: 4,
                paddingInline: 18,
                transition:
                  "background-color 180ms ease, border-color 180ms ease, color 180ms ease, transform 180ms ease",
                "&:active": {
                  transform: "translateY(1px)",
                },
              },
            },
          },
          MuiIconButton: {
            styleOverrides: {
              root: {
                borderRadius: 4,
                transition:
                  "background-color 180ms ease, color 180ms ease, transform 180ms ease",
              },
            },
          },
          MuiCard: {
            styleOverrides: {
              root: {
                backgroundImage: "none",
                borderRadius: 6,
              },
            },
          },
          MuiChip: {
            styleOverrides: {
              root: {
                borderRadius: 3,
              },
            },
          },
          MuiPaper: {
            styleOverrides: {
              root: {
                backgroundImage: "none",
              },
              rounded: {
                borderRadius: 6,
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
          MuiOutlinedInput: {
            styleOverrides: {
              root: {
                borderRadius: 4,
                backgroundColor: isLight
                  ? "rgba(255, 255, 255, 0.72)"
                  : "rgba(20, 33, 29, 0.72)",
              },
            },
          },
          MuiCssBaseline: {
            styleOverrides: {
              body: {
                backgroundColor: isLight ? "#f4f6f3" : "#0c1512",
              },
            },
          },
        },
      }),
    );
  }, [mode]);

  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}
