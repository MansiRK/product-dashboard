import { useEffect, useState } from "react";
import { api } from "../services/api";
import ProductCard from "../components/ProductCard";
import Filters from "../components/Filters";
import type { Product } from "../types/product";
import type { Category } from "../types/category";
import { RiSearchLine } from "react-icons/ri";
import ProductSkeleton from "../components/skeletons/ProductSkeleton";

const LIMIT = 4;

export default function Products() {
  const [products, setProducts] = useState<Product[]>([]);
  const [page, setPage] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0);
  const [loading, setLoading] = useState(false);

  const [view, setView] = useState<"grid" | "list">("grid");

  const [category, setCategory] = useState("");
  const [sort, setSort] = useState("");
  const [priceRange, setPriceRange] = useState("");
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  const [categories, setCategories] = useState<Category[]>([]);
  const [showFilters, setShowFilters] = useState(false);

  const [tempCategory, setTempCategory] = useState("");
  const [tempPriceRange, setTempPriceRange] = useState("");
  const [tempSort, setTempSort] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
      setPage(1);
    }, 500);

    return () => clearTimeout(timer);
  }, [search]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);

        const skip = (page - 1) * LIMIT;

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

        let filteredProducts: Product[] = [...data.products];

        if (debouncedSearch.trim()) {
          const searchTerm = debouncedSearch.toLowerCase();

          filteredProducts = filteredProducts.filter((product: Product) => {
            return (
              product.title?.toLowerCase().includes(searchTerm) ||
              product.brand?.toLowerCase().includes(searchTerm) ||
              product.category?.toLowerCase().includes(searchTerm) ||
              product.description?.toLowerCase().includes(searchTerm) ||
              product.tags?.some((tag) =>
                tag.toLowerCase().includes(searchTerm),
              ) ||
              product.price.toString().includes(searchTerm)
            );
          });
        }

        if (priceRange) {
          const [min, max] = priceRange.split("-").map(Number);

          filteredProducts = filteredProducts.filter((product) => {
            if (priceRange === "1000+") {
              return product.price >= 1000;
            }

            return product.price >= min && product.price <= max;
          });
        }

        setTotalProducts(filteredProducts.length);

        // Pagination after filtering

        const paginatedProducts = filteredProducts.slice(skip, skip + LIMIT);

        setProducts(paginatedProducts);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [page, category, sort, priceRange, debouncedSearch]);

  useEffect(() => {
    const fetchCategories = async () => {
      const { data } = await api.get("/products/categories");

      setCategories(data);
    };

    fetchCategories();
  }, []);

  const totalPages = Math.ceil(totalProducts / LIMIT);

  return (
    <div>
      <div className="mb-8 lg:flex md:flex block justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Products</h1>

          <p className="text-gray-500 mt-1">Manage and explore all products</p>
        </div>

        <div className="bg-white shadow-sm px-5 py-3 rounded-xl lg:mt-0 md:mt-0 mt-3">
          <p className="text-sm text-gray-500">Total Products</p>

          <h2 className="text-2xl font-bold text-[#aa3bff]">{totalProducts}</h2>
        </div>
      </div>

      <div className="md:hidden fixed bottom-5 left-5 right-5 z-40">
        <button
          onClick={() => setShowFilters(true)}
          className="
w-full
bg-[#aa3bff]
text-white
py-3
rounded-2xl
shadow-lg
font-semibold
"
        >
          ⚙ Filters
        </button>
      </div>

      <Filters
        category={category}
        setCategory={setCategory}
        priceRange={priceRange}
        setPriceRange={setPriceRange}
        sort={sort}
        setSort={setSort}
        categories={categories}
        view={view}
        setView={setView}
        setPage={setPage}
        search={search}
        setSearch={setSearch}
        showFilters={showFilters}
        setShowFilters={setShowFilters}
        tempCategory={tempCategory}
        setTempCategory={setTempCategory}
        tempPriceRange={tempPriceRange}
        setTempPriceRange={setTempPriceRange}
        tempSort={tempSort}
        setTempSort={setTempSort}
      />

      {loading ? (
        <ProductSkeleton view={view} />
      ) : products.length > 0 ? (
        <ProductCard products={products} view={view} />
      ) : (
        <div className="bg-white rounded-2xl shadow-sm p-10 flex flex-col items-center justify-center text-center">
          <div className="text-gray-600 mb-4">
            <RiSearchLine fontSize={30} />
          </div>

          <h2 className="text-xl font-semibold text-gray-800">
            No Products Found
          </h2>

          <p className="text-gray-500 mt-2">
            We couldn't find any products matching your filters.
          </p>

          <button
            onClick={() => {
              setCategory("");
              setPriceRange("");
              setSort("");
              setSearch("");
              setPage(1);
            }}
            className="
                mt-6 
                px-6 
                py-2
                rounded-xl
                bg-[#aa3bff]
                text-white
                hover:bg-[#922df0]
                transition
            "
          >
            Clear Filters
          </button>
        </div>
      )}

      {/* Pagination */}
      {products.length > 0 && totalPages > 1 && (
        <div
          className="
flex justify-center items-center gap-3 mt-12
"
        >
          <button
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
            className="
w-10 h-10 rounded-full
bg-white shadow
disabled:opacity-40
hover:bg-[#aa3bff]
hover:text-white
hover:cursor-pointer
transition
"
          >
            ‹
          </button>

          {Array.from(
            {
              length: totalPages,
            },
            (_, i) => i + 1,
          )
            .slice(Math.max(0, page - 3), Math.min(totalPages, page + 2))
            .map((num) => (
              <button
                key={num}
                onClick={() => setPage(num)}
                className={`
w-10 h-10 rounded-full
transition
hover:cursor-pointer
${
  page === num
    ? "bg-[#aa3bff] text-white shadow-lg"
    : "bg-white hover:bg-purple-100"
}

`}
              >
                {num}
              </button>
            ))}

          <button
            disabled={page === totalPages}
            onClick={() => setPage(page + 1)}
            className="
w-10 h-10 rounded-full
bg-[#aa3bff]
text-white
disabled:opacity-40 hover:cursor-pointer
"
          >
            ›
          </button>
        </div>
      )}
    </div>
  );
}
