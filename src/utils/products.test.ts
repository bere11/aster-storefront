import { describe, expect, it } from "vitest";
import type { Product } from "../types/api";
import {
  categoryLabel,
  filterAndSortProducts,
  formatPrice,
  getSafeRedirect,
} from "./products";

const product = (overrides: Partial<Product>): Product => ({
  id: 1,
  title: "Canvas backpack",
  price: 40,
  description: "A sturdy everyday bag",
  category: "men's clothing",
  image: "/bag.png",
  rating: { rate: 4.2, count: 10 },
  ...overrides,
});

describe("product utilities", () => {
  it("filters across product fields and sorts by descending price", () => {
    const products = [
      product({ id: 1, title: "Silver ring", category: "jewelery", price: 20 }),
      product({ id: 2, title: "Gold ring", category: "jewelery", price: 80 }),
      product({ id: 3, title: "Cotton shirt", price: 30 }),
    ];

    expect(
      filterAndSortProducts(products, "ring", "price-desc").map(
        (item) => item.id,
      ),
    ).toEqual([2, 1]);
  });

  it("formats API prices and rejects unsafe redirect URLs", () => {
    expect(formatPrice(109.95)).toBe("$109.95");
    expect(categoryLabel("men's clothing")).toBe("Men's Clothing");
    expect(getSafeRedirect("/wishlist")).toBe("/wishlist");
    expect(getSafeRedirect("//malicious.example")).toBe("/");
  });
});
