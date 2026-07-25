import type {
  CreateCartPayload,
  CreatedCart,
  LoginCredentials,
  LoginResponse,
  Product,
  ProductCategory,
} from "../types/api";
import { apiClient } from "./client";

export async function getCategories(): Promise<ProductCategory[]> {
  const { data } = await apiClient.get<ProductCategory[]>("/products/categories");
  return data;
}

export async function getProducts(category?: string): Promise<Product[]> {
  const path = category
    ? `/products/category/${encodeURIComponent(category)}`
    : "/products";
  const { data } = await apiClient.get<Product[]>(path);
  return data;
}

export async function getProduct(productId: number): Promise<Product> {
  const { data } = await apiClient.get<Product>(`/products/${productId}`);
  return data;
}

export async function login(credentials: LoginCredentials): Promise<LoginResponse> {
  const { data } = await apiClient.post<LoginResponse>("/auth/login", credentials);
  return data;
}

export async function createCart(payload: CreateCartPayload): Promise<CreatedCart> {
  const { data } = await apiClient.post<CreatedCart>("/carts", payload);
  return data;
}
