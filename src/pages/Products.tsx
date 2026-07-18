import { useEffect, useState } from "react";
import { api } from "../services/api";
import ProductCard from "../components/ProductCard";
import Filters from "../components/Filters";
import { RiSearchLine, RiFilter3Line } from "react-icons/ri";
import ProductSkeleton from "../components/skeletons/ProductSkeleton";
import { useQuery } from "@tanstack/react-query";
import { fetchProducts } from "../services/productService";

const LIMIT = 4;

export default function Products() {
  const [page, setPage] = useState(1);
  const [view, setView] = useState<"grid" | "list">("grid");

  const [category, setCategory] = useState("");
  const [sort, setSort] = useState("");
  const [priceRange, setPriceRange] = useState("");
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  const [tempCategory, setTempCategory] = useState("");
  const [tempPriceRange, setTempPriceRange] = useState("");
  const [tempSort, setTempSort] = useState("");

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["products", page, category, sort, priceRange, debouncedSearch],

    queryFn: () =>
      fetchProducts({
        page,
        category,
        sort,
        priceRange,
        search: debouncedSearch,
      }),
  });

  const products = data?.products ?? [];

  const totalProducts = data?.totalProducts ?? 0;

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
      setPage(1);
    }, 400);

    return () => clearTimeout(timer);
  }, [search]);

  const { data: categoryData, isError: categoryError } = useQuery({
    queryKey: ["categories"],

    queryFn: async () => {
      const { data } = await api.get("/products/categories");

      return data;
    },
  });

  const categories = categoryError ? [] : (categoryData ?? []);
  const totalPages = Math.ceil(totalProducts / LIMIT);

  if (isError) {
    return (
      <div className="p-10 text-center">
        <h2 className="text-xl font-semibold text-red-500">
          Failed to load products
        </h2>

        <p className="text-gray-500 mt-2">
          Something went wrong while fetching products.
        </p>

        <button
          onClick={() => refetch()}
          className="
        mt-5
        px-5 py-2
        rounded-xl
        bg-[#aa3bff]
        text-white
        "
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8 lg:flex md:flex block justify-between items-center">
        <div>
          <h1 className="lg:text-3xl md:text-2xl text-xl font-bold text-gray-800">
            Products
          </h1>

          <p className="text-gray-500 lg:mt-3 mt-2 lg:text-[16px] md:text-[15px] text-[14px]">
            Manage and explore all products
          </p>
        </div>

        <div className="bg-white shadow-sm px-5 py-3 rounded-xl lg:mt-0 md:mt-0 mt-3">
          <p className="text-sm text-gray-500">Total Products</p>

          <h2 className="text-2xl font-bold text-[#aa3bff]">{totalProducts}</h2>
        </div>
      </div>

      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40">
        <button
          onClick={() => setShowFilters(true)}
          className="
w-full
bg-[#aa3bff]
text-white
py-3
rounded-t-2xl
border
shadow-lg
font-semibold flex items-center justify-center gap-3
"
        >
          <RiFilter3Line fontSize={20} /> Filters
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

      {isLoading ? (
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
  pb-24
  md:pb-0
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
