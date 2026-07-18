import { api } from "./api";
import type { Product } from "../types/product";

export async function fetchDashboardData() {
  const [productsRes, categoriesRes] = await Promise.all([
    api.get("/products"),
    api.get("/products/categories"),
  ]);

  return {
    products: productsRes.data.products as Product[],
    categories: categoriesRes.data as string[],
  };
}
