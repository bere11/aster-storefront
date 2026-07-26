import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getCategories, getProduct, getProducts } from "../api/storeApi";

export const queryKeys = {
  categories: ["categories"] as const,
  products: (category?: string) => ["products", category ?? "all"] as const,
  product: (productId: number) => ["product", productId] as const,
};

export function useCategories() {
  return useQuery({
    queryKey: queryKeys.categories,
    queryFn: getCategories,
    staleTime: 30 * 60 * 1000,
  });
}

export function useProducts(category?: string) {
  return useQuery({
    queryKey: queryKeys.products(category),
    queryFn: () => getProducts(category),
    placeholderData: keepPreviousData,
  });
}

export function useProduct(productId: number) {
  return useQuery({
    queryKey: queryKeys.product(productId),
    queryFn: () => getProduct(productId),
    enabled: Number.isInteger(productId) && productId > 0,
  });
}
