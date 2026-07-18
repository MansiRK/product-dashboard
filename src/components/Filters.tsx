import {
  RiGridFill,
  RiListUnordered,
  RiSearchLine,
  RiCloseLine,
} from "react-icons/ri";
import type { Category } from "../types/category";

interface FiltersProps {
  category: string;
  setCategory: React.Dispatch<React.SetStateAction<string>>;

  priceRange: string;
  setPriceRange: React.Dispatch<React.SetStateAction<string>>;

  sort: string;
  setSort: React.Dispatch<React.SetStateAction<string>>;

  categories: Category[];

  view: "grid" | "list";
  setView: React.Dispatch<React.SetStateAction<"grid" | "list">>;

  setPage: React.Dispatch<React.SetStateAction<number>>;

  search: string;

  setSearch: React.Dispatch<React.SetStateAction<string>>;
  showFilters?: boolean;
  setShowFilters?: React.Dispatch<React.SetStateAction<boolean>>;
  tempCategory: string;
  setTempCategory: React.Dispatch<React.SetStateAction<string>>;

  tempPriceRange: string;
  setTempPriceRange: React.Dispatch<React.SetStateAction<string>>;

  tempSort: string;
  setTempSort: React.Dispatch<React.SetStateAction<string>>;
}

export default function Filters({
  category,
  setCategory,
  priceRange,
  setPriceRange,
  sort,
  setSort,
  categories,
  view,
  setView,
  setPage,
  search,
  setSearch,
  showFilters,
  setShowFilters,
  tempCategory,
  setTempCategory,
  tempPriceRange,
  setTempPriceRange,
  tempSort,
  setTempSort,
}: FiltersProps) {
  const resetFilters = () => {
    setCategory("");
    setPriceRange("");
    setSort("");
    setSearch("");
    setPage(1);
  };

  return (
    <>
      {showFilters && (
        <div className="lg:hidden md:hidden fixed inset-0 z-50">
          {/* Overlay */}
          <div
            onClick={() => setShowFilters?.(false)}
            className="absolute inset-0 bg-black/40"
          />

          {/* Bottom Sheet */}
          <div
            className="
        absolute
        bottom-0
        left-0
        right-0
        bg-white
        rounded-t-2xl
        p-6
        shadow-xl
        animate-slide-up
        "
          >
            <div className="flex justify-between items-center mb-5">
              <h4 className="text-xl font-semibold">Filters</h4>

              <button onClick={() => setShowFilters?.(false)}>
                <RiCloseLine size={25} />
              </button>
            </div>

            {/* Category */}

            <select
              value={tempCategory}
              onChange={(e) => {
                setTempCategory(e.target.value);
              }}
              className="
          w-full
          bg-gray-50
          border
          rounded-xl
          px-2
          py-2
          mb-2
          "
            >
              <option value="">All Categories</option>

              {categories.map((cat) => (
                <option key={cat.slug} value={cat.slug}>
                  {cat.name}
                </option>
              ))}
            </select>

            {/* Price */}

            <select
              value={tempPriceRange}
              onChange={(e) => {
                setTempPriceRange(e.target.value);
              }}
              className="
          w-full
          bg-gray-50
          border
          rounded-xl
          px-2
          py-2
          mb-2
          "
            >
              <option value="">All Prices</option>

              <option value="0-50">Under $50</option>

              <option value="50-100">$50 - $100</option>

              <option value="100-200">$100 - $200</option>

              <option value="200-500">$200 - $500</option>

              <option value="500-1000">$500 - $1000</option>

              <option value="1000+">Above $1000</option>
            </select>

            {/* Sort */}

            <select
              value={tempSort}
              onChange={(e) => {
                setTempSort(e.target.value);
              }}
              className="
          w-full
          bg-gray-50
          border
          rounded-xl
          px-2
          py-2
          mb-2
          "
            >
              <option value="">Sort By</option>

              <option value="price-low">Price Low → High</option>

              <option value="price-high">Price High → Low</option>

              <option value="rating">Highest Rating</option>

              <option value="name">Name A-Z</option>
            </select>

            <div className="flex gap-3">
              <button
                onClick={resetFilters}
                className="
            flex-1
            border
            rounded-xl
            py-2 text-[15px]
            "
              >
                Reset
              </button>

              <button
                onClick={() => {
                  setCategory(tempCategory);
                  setPriceRange(tempPriceRange);
                  setSort(tempSort);

                  setPage(1);

                  setShowFilters?.(false);
                }}
                className="
flex-1
bg-[#aa3bff]
text-white
rounded-xl
py-2 text-[15px]
"
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-8 lg:block md:flex hidden w-full">
        <div className="flex flex-col gap-5 w-full">
          {/* Top Row */}
          <div className="flex gap-4 justify-between">
            {/* Search */}
            <div className="relative flex-1 max-w-xl">
              <RiSearchLine
                className="
            absolute left-4 top-1/2 
            -translate-y-1/2
            text-gray-400
            text-xl
            "
              />

              <input
                type="text"
                placeholder="Search products..."
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setPage(1);
                }}
                className="
            w-full
            bg-gray-50
            border border-gray-200
            rounded-xl
            py-3
            pl-12
            pr-4
            text-sm
            focus:bg-white
            focus:outline-none
            focus:ring-2
            focus:ring-[#aa3bff]/30
            transition
            "
              />
            </div>

            {/* View Switch */}

            <div
              className="
          lg:flex md:flex hidden
          bg-gray-100
          rounded-xl
          p-1
          w-fit
          "
            >
              <button
                onClick={() => setView("grid")}
                className={`
            flex items-center gap-2
            px-4 py-2
            rounded-lg
            text-sm
            transition hover:cursor-pointer

            ${
              view === "grid"
                ? "bg-white shadow text-[#aa3bff]"
                : "text-gray-500"
            }
            `}
              >
                <RiGridFill />
                Grid
              </button>

              <button
                onClick={() => setView("list")}
                className={`
            lg:flex md:flex hidden items-center gap-2
            px-4 py-2
            rounded-lg
            text-sm
            transition hover:cursor-pointer

            ${
              view === "list"
                ? "bg-white shadow text-[#aa3bff]"
                : "text-gray-500"
            }
            `}
              >
                <RiListUnordered />
                List
              </button>
            </div>
          </div>

          {/* Filters Row */}

          <div
            className="
        lg:flex md:flex hidden
        flex-wrap
        gap-3
        items-center w-full
        "
          >
            {/* Category */}

            <select
              value={category}
              onChange={(e) => {
                setCategory(e.target.value);
                setPage(1);
              }}
              className="
          bg-gray-50
          border border-gray-200
          rounded-xl
          px-4
          py-2.5
          text-sm
          focus:ring-2
          focus:ring-[#aa3bff]/30
          outline-none hover:cursor-pointer
          "
            >
              <option value="">All Categories</option>

              {categories.map((cat) => (
                <option key={cat.slug} value={cat.slug}>
                  {cat.name}
                </option>
              ))}
            </select>

            {/* Price */}

            <select
              value={priceRange}
              onChange={(e) => {
                setPriceRange(e.target.value);
                setPage(1);
              }}
              className="
          bg-gray-50 lg:flex md:flex hidden
          border border-gray-200
          rounded-xl
          px-4
          py-2.5
          text-sm
          focus:ring-2
          focus:ring-[#aa3bff]/30 hover:cursor-pointer
          outline-none
          "
            >
              <option value="">All Prices</option>

              <option value="0-50">Under $50</option>

              <option value="50-100">$50 - $100</option>

              <option value="100-200">$100 - $200</option>

              <option value="200-500">$200 - $500</option>

              <option value="500-1000">$500 - $1000</option>

              <option value="1000+">Above $1000</option>
            </select>

            {/* Sort */}

            <select
              value={sort}
              onChange={(e) => {
                setSort(e.target.value);
                setPage(1);
              }}
              className="
          bg-gray-50 lg:flex md:flex hidden
          border border-gray-200
          rounded-xl
          px-4
          py-2.5
          text-sm
          focus:ring-2
          focus:ring-[#aa3bff]/30 hover:cursor-pointer
          outline-none
          "
            >
              <option value="">Sort By</option>

              <option value="price-low">Price Low → High</option>

              <option value="price-high">Price High → Low</option>

              <option value="rating">Highest Rating</option>

              <option value="name">Name A-Z</option>
            </select>

            {/* Reset */}

            <button
              disabled={!category && !priceRange && !sort && !search}
              onClick={resetFilters}
              className="
          px-5
          py-2.5
          rounded-xl lg:flex md:flex hidden
          border
          border-gray-200
          text-sm
          font-medium
          text-gray-800
          hover:bg-gray-100
          transition
          disabled:opacity-40
          disabled:cursor-not-allowed hover:cursor-pointer
          "
            >
              Reset
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
