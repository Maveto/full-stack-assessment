import { AxiosError } from "axios";
import api from "./axios";

export async function signUpUser(data: {
  username: string;
  email: string;
  password: string;
}) {
  try {
    const res = await api.post("/auth/register", data);
    const user = await getCurrentUser();
    // Return user for client to save on redux
    return user;
  } catch (error: any) {
    if (error instanceof AxiosError) {
      const message =
        error.response?.data?.error ||
        error.response?.data?.message ||
        "Sign up failed";
      throw new Error(message);
    }
    throw new Error("Unexpected error occurred");
  }
}

export async function login(data: { username: string; password: string }) {
  try {
    const res = await api.post("/auth/login", data);
    const user = await getCurrentUser();
    // Return user for client to save on redux
    return user;
  } catch (error: any) {
    if (error instanceof AxiosError) {
      const message =
        error.response?.data?.error ||
        error.response?.data?.message ||
        "Sign in failed";
      throw new Error(message);
    }
    throw new Error("Unexpected error occurred");
  }
}

export async function logout() {
  try {
    await api.post("/auth/logout");
  } catch (error: any) {
    if (error instanceof AxiosError) {
      const message =
        error.response?.data?.error ||
        error.response?.data?.message ||
        "Log out failed";
      throw new Error(message);
    }
    throw new Error("Unexpected error occurred");
  }
}

export async function getCurrentUser() {
  try {
    const res = await api.get("/users/me");
    return res.data;
  } catch (error: any) {
    if (error instanceof AxiosError) {
      const message =
        error.response?.data?.error ||
        error.response?.data?.message ||
        "Get current user failed";
      throw new Error(message);
    }
    throw new Error("Unexpected error occurred");
  }
}

export async function fetchProducts() {
  try {
    const res = await api.get("/products");
    return res.data;
  } catch (error: any) {
    if (error instanceof AxiosError) {
      const message =
        error.response?.data?.error ||
        error.response?.data?.message ||
        "Products fetch failed";
      throw new Error(message);
    }
    throw new Error("Unexpected error occurred");
  }

  // const res = await fetch(`${API_URL}/products`, {
  //   next: { revalidate: 60 },
  // });

  // if (!res.ok) throw new Error("Failed to load products");

  // return res.json();
}

export async function fetchProductById(id: string) {
  try {
    const res = await api.get(`/products/${id}`);
    return res.data;
  } catch (error: any) {
    if (error instanceof AxiosError) {
      const message =
        error.response?.data?.error ||
        error.response?.data?.message ||
        "Fetch product by id failed";
      throw new Error(message);
    }
    throw new Error("Unexpected error occurred");
  }
}

export async function fetchReviewsByProductId(id: string) {
  try {
    const res = await api.get(`/reviews/product/${id}`);
    return res.data;
  } catch (error: any) {
    if (error instanceof AxiosError) {
      const message =
        error.response?.data?.error ||
        error.response?.data?.message ||
        "Fetch reviews by product id failed";
      throw new Error(message);
    }
    throw new Error("Unexpected error occurred");
  }
}
