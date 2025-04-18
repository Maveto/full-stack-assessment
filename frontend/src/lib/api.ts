const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function signUpUser(data: {
  username: string;
  email: string;
  password: string;
}) {}

export async function fetchProducts() {
  const res = await fetch(`${API_URL}/products`, {
    next: { revalidate: 60 },
  });

  if (!res.ok) throw new Error("Failed to load products");

  return res.json();
}
