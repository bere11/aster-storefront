import { Box, Container, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

export const PageContainer = styled(Container)(({ theme }) => ({
  paddingBlock: theme.spacing(5),
  [theme.breakpoints.up("md")]: {
    paddingBlock: theme.spacing(8),
  },
}));

export const PageTitle = styled(Typography)(({ theme }) => ({
  maxWidth: 760,
  fontFamily:
    '"Avenir Next", "Segoe UI", system-ui, -apple-system, sans-serif',
  fontSize: "2.6rem",
  fontWeight: 800,
  lineHeight: 1.05,
  overflowWrap: "anywhere",
  [theme.breakpoints.up("sm")]: {
    fontSize: "3.6rem",
  },
  [theme.breakpoints.up("md")]: {
    fontSize: "4.5rem",
  },
}));

export const ProductGrid = styled(Box)(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
  columnGap: theme.spacing(1.5),
  rowGap: theme.spacing(4),
  [theme.breakpoints.up("sm")]: {
    columnGap: theme.spacing(2.5),
  },
  [theme.breakpoints.up("md")]: {
    gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
    rowGap: theme.spacing(6),
  },
  [theme.breakpoints.up("lg")]: {
    gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
    columnGap: theme.spacing(3),
  },
}));
