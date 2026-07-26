import { Box, Container, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

export const PageContainer = styled(Container)(({ theme }) => ({
  paddingBlock: theme.spacing(5),
  [theme.breakpoints.up("md")]: {
    paddingBlock: theme.spacing(8),
  },
}));

export const Eyebrow = styled(Typography)(({ theme }) => ({
  display: "inline-flex",
  alignItems: "center",
  gap: theme.spacing(1),
  marginBottom: theme.spacing(1.5),
  color: theme.palette.secondary.main,
  fontSize: "0.72rem",
  fontWeight: 800,
  letterSpacing: 0,
  lineHeight: 1.2,
  textTransform: "uppercase",
  "&::before": {
    width: 24,
    height: 2,
    backgroundColor: "currentColor",
    content: '""',
  },
}));

export const PageTitle = styled(Typography)(({ theme }) => ({
  maxWidth: 760,
  fontFamily: 'Georgia, "Times New Roman", serif',
  fontSize: "2.6rem",
  fontWeight: 500,
  lineHeight: 1,
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
