import type { Product } from "../types/api";

export type ProductSort = "featured" | "price-asc" | "price-desc" | "rating";

export function formatPrice(value: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(value);
}

export function filterAndSortProducts(
  products: Product[],
  searchTerm: string,
  sort: ProductSort,
): Product[] {
  const normalizedSearch = searchTerm.trim().toLocaleLowerCase();
  const filtered = normalizedSearch
    ? products.filter((product) =>
        [product.title, product.category, product.description].some((value) =>
          value.toLocaleLowerCase().includes(normalizedSearch),
        ),
      )
    : [...products];

  switch (sort) {
    case "price-asc":
      return filtered.sort((a, b) => a.price - b.price);
    case "price-desc":
      return filtered.sort((a, b) => b.price - a.price);
    case "rating":
      return filtered.sort((a, b) => b.rating.rate - a.rating.rate);
    default:
      return filtered.sort((a, b) => a.id - b.id);
  }
}

export function categoryLabel(category: string): string {
  return category
    .split(/\s+/)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export function getUserIdFromToken(token: string): number {
  try {
    const payloadPart = token.split(".")[1];
    if (!payloadPart) return 1;
    const payload = JSON.parse(atob(payloadPart)) as { sub?: number | string };
    const userId = Number(payload.sub);
    return Number.isFinite(userId) ? userId : 1;
  } catch {
    return 1;
  }
}

export function getSafeRedirect(value: string | null): string {
  return value?.startsWith("/") && !value.startsWith("//") ? value : "/";
}
