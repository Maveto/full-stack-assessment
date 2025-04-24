import { AxiosError } from "axios";
import api from "./axios";
import { Review } from "@/components/ReviewsList";
import { Product } from "@/components/ProductCard";

/////////////////////////// User functions////////////////////////
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

/////////////////////////// Product functions////////////////////////
export async function createNewProduct(product: {
  name: string;
  description: string;
  price?: number;
  stockQuantity?: number;
  imageUrl?: string;
}) {
  try {
    const res = await api.post("/products", product);
    return res.data;
  } catch (error: any) {
    if (error instanceof AxiosError) {
      const message =
        error.response?.data?.error ||
        error.response?.data?.message ||
        "Create product failed";
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

export async function updateProductById(productId: number, newData: Product) {
  try {
    const res = await api.put(`/products/${productId}`, newData);
    return res.data;
  } catch (error: any) {
    if (error instanceof AxiosError) {
      const message =
        error.response?.data?.error ||
        error.response?.data?.message ||
        "Update product by id failed";
      throw new Error(message);
    }
    throw new Error("Unexpected error occurred");
  }
}

export async function deleteProductById(productId: number) {
  try {
    const res = await api.delete(`/products/${productId}`);
    return res.data;
  } catch (error: any) {
    if (error instanceof AxiosError) {
      const message =
        error.response?.data?.error ||
        error.response?.data?.message ||
        "Delete product by id failed";
      throw new Error(message);
    }
    throw new Error("Unexpected error occurred");
  }
}

/////////////////////////// Reviews functions////////////////////////
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

export async function postReview(review: Omit<Review, "id" | "createdDate">) {
  try {
    const res = await api.post("/reviews", review);
    return res.data;
  } catch (error: any) {
    if (error instanceof AxiosError) {
      const message =
        error.response?.data?.error ||
        error.response?.data?.message ||
        "Posting review failed";
      throw new Error(message);
    }
    throw new Error("Unexpected error occurred");
  }
}

/////////////////////////// Cart functions////////////////////////
export async function getCart() {
  try {
    const res = await api.get("/cart");
    return res.data;
  } catch (error: any) {
    if (error instanceof AxiosError) {
      const message =
        error.response?.data?.error ||
        error.response?.data?.message ||
        "Getting cart failed";
      throw new Error(message);
    }
    throw new Error("Unexpected error occurred");
  }
}

export async function addItemToCart(item: {
  productId: number;
  quantity: number;
}) {
  try {
    const res = await api.post("/cart", item);
    return res.data;
  } catch (error: any) {
    if (error instanceof AxiosError) {
      const message =
        error.response?.data?.error ||
        error.response?.data?.message ||
        "Adding item to cart failed";
      throw new Error(message);
    }
    throw new Error("Unexpected error occurred");
  }
}

export async function updateCartItem(item: {
  productId: number;
  quantity: number;
}) {
  try {
    const res = await api.put("/cart", item);
    return res.data;
  } catch (error: any) {
    if (error instanceof AxiosError) {
      console.log(error);
      const message =
        error.response?.data?.error ||
        error.response?.data?.message ||
        "Updating cart item failed";
      throw new Error(message);
    }
    throw new Error("Unexpected error occurred");
  }
}

export async function removeItemFromCart(itemId: number) {
  try {
    const res = await api.delete(`/cart/${itemId}`);
    return res.data;
  } catch (error: any) {
    if (error instanceof AxiosError) {
      const message =
        error.response?.data?.error ||
        error.response?.data?.message ||
        "Removing item from cart failed";
      throw new Error(message);
    }
    throw new Error("Unexpected error occurred");
  }
}
