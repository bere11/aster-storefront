/* eslint-disable react-refresh/only-export-components */
import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  type ReactNode,
} from "react";
import type { PaletteMode } from "@mui/material";
import type { Product } from "../types/api";

const STORAGE_KEY = "aster-store-state-v1";

export interface AuthSession {
  token: string;
  username: string;
}

export interface CartLine {
  product: Product;
  quantity: number;
}

interface PersistedState {
  auth: AuthSession | null;
  cart: Record<number, CartLine>;
  wishlist: number[];
  mode: PaletteMode;
}

type AppAction =
  | { type: "login"; session: AuthSession }
  | { type: "logout" }
  | { type: "addToCart"; product: Product }
  | { type: "setQuantity"; productId: number; quantity: number }
  | { type: "removeFromCart"; productId: number }
  | { type: "clearCart" }
  | { type: "toggleWishlist"; productId: number }
  | { type: "toggleMode" };

interface AppStateValue extends PersistedState {
  cartLines: CartLine[];
  cartCount: number;
  loginSession: (session: AuthSession) => void;
  logout: () => void;
  addToCart: (product: Product) => void;
  setQuantity: (productId: number, quantity: number) => void;
  removeFromCart: (productId: number) => void;
  clearCart: () => void;
  toggleWishlist: (productId: number) => void;
  isWishlisted: (productId: number) => boolean;
  toggleMode: () => void;
}

const defaultState: PersistedState = {
  auth: null,
  cart: {},
  wishlist: [],
  mode: "light",
};

function readInitialState(): PersistedState {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return defaultState;
    const parsed = JSON.parse(stored) as Partial<PersistedState>;
    return {
      auth: parsed.auth ?? null,
      cart: parsed.cart ?? {},
      wishlist: parsed.wishlist ?? [],
      mode: parsed.mode === "dark" ? "dark" : "light",
    };
  } catch {
    return defaultState;
  }
}

function appReducer(state: PersistedState, action: AppAction): PersistedState {
  switch (action.type) {
    case "login":
      return { ...state, auth: action.session };
    case "logout":
      return { ...state, auth: null, cart: {}, wishlist: [] };
    case "addToCart": {
      const currentLine = state.cart[action.product.id];
      return {
        ...state,
        cart: {
          ...state.cart,
          [action.product.id]: {
            product: action.product,
            quantity: (currentLine?.quantity ?? 0) + 1,
          },
        },
      };
    }
    case "setQuantity": {
      const currentLine = state.cart[action.productId];
      if (!currentLine) return state;
      if (action.quantity <= 0) {
        const cart = { ...state.cart };
        delete cart[action.productId];
        return { ...state, cart };
      }
      return {
        ...state,
        cart: {
          ...state.cart,
          [action.productId]: { ...currentLine, quantity: action.quantity },
        },
      };
    }
    case "removeFromCart": {
      const cart = { ...state.cart };
      delete cart[action.productId];
      return { ...state, cart };
    }
    case "clearCart":
      return { ...state, cart: {} };
    case "toggleWishlist":
      return {
        ...state,
        wishlist: state.wishlist.includes(action.productId)
          ? state.wishlist.filter((id) => id !== action.productId)
          : [...state.wishlist, action.productId],
      };
    case "toggleMode":
      return { ...state, mode: state.mode === "light" ? "dark" : "light" };
  }
}

const AppStateContext = createContext<AppStateValue | null>(null);

export function AppStateProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, undefined, readInitialState);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  const value = useMemo<AppStateValue>(() => {
    const cartLines = Object.values(state.cart);
    return {
      ...state,
      cartLines,
      cartCount: cartLines.reduce((count, line) => count + line.quantity, 0),
      loginSession: (session) => dispatch({ type: "login", session }),
      logout: () => dispatch({ type: "logout" }),
      addToCart: (product) => dispatch({ type: "addToCart", product }),
      setQuantity: (productId, quantity) =>
        dispatch({ type: "setQuantity", productId, quantity }),
      removeFromCart: (productId) =>
        dispatch({ type: "removeFromCart", productId }),
      clearCart: () => dispatch({ type: "clearCart" }),
      toggleWishlist: (productId) =>
        dispatch({ type: "toggleWishlist", productId }),
      isWishlisted: (productId) => state.wishlist.includes(productId),
      toggleMode: () => dispatch({ type: "toggleMode" }),
    };
  }, [state]);

  return (
    <AppStateContext.Provider value={value}>
      {children}
    </AppStateContext.Provider>
  );
}

export function useAppState(): AppStateValue {
  const context = useContext(AppStateContext);
  if (!context) {
    throw new Error("useAppState must be used inside AppStateProvider");
  }
  return context;
}
