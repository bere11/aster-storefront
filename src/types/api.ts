export interface ProductRating {
  rate: number;
  count: number;
}

export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: ProductRating;
}

export type ProductCategory = string;

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface LoginResponse {
  token: string;
}

export interface CartProductPayload {
  productId: number;
  quantity: number;
}

export interface CreateCartPayload {
  userId: number;
  date: string;
  products: CartProductPayload[];
}

export interface CreatedCart extends CreateCartPayload {
  id: number;
}
