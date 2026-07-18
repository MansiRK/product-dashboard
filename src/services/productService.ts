import { api } from "./api";
import type { Product } from "../types/product";

const LIMIT = 4;

interface FetchProductsParams {
  page: number;
  category: string;
  sort: string;
  priceRange: string;
  search: string;
}

export async function fetchProducts({
  page,
  category,
  sort,
  priceRange,
  search,
}: FetchProductsParams) {
  let url = `/products?limit=100`;

  if (category) {
    url = `/products/category/${category}?limit=100`;
  }

  if (sort === "price-low") {
    url += "&sortBy=price&order=asc";
  }

  if (sort === "price-high") {
    url += "&sortBy=price&order=desc";
  }

  if (sort === "rating") {
    url += "&sortBy=rating&order=desc";
  }

  if (sort === "name") {
    url += "&sortBy=title&order=asc";
  }

  const { data } = await api.get(url);

  let products = data.products;

  if (search.trim()) {
    products = products.filter((product: Product) =>
      product.title.toLowerCase().includes(search.toLowerCase()),
    );
  }

  if (priceRange) {
    const [min, max] = priceRange.split("-").map(Number);

    products = products.filter((product: Product) => {
      if (priceRange === "1000+") return product.price >= 1000;

      return product.price >= min && product.price <= max;
    });
  }

  const totalProducts = products.length;

  const skip = (page - 1) * LIMIT;

  return {
    products: products.slice(skip, skip + LIMIT),

    totalProducts,
  };
}

export async function fetchProductById(id: string) {
  const { data } = await api.get<Product>(`/products/${id}`);

  return data;
}
