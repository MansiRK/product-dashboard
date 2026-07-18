import {
  RiHeart3Line,
  RiShoppingCartLine,
  RiEyeLine,
  RiStarFill,
  RiBox3Line,
} from "react-icons/ri";

import type { Product } from "../types/product";
import { useNavigate } from "react-router-dom";

interface ProductCardProps {
  products: Product[];
  view: "grid" | "list";
}

export default function ProductCard({ products, view }: ProductCardProps) {
  const navigate = useNavigate();
  return (
    <div
      className={
        view === "grid"
          ? " grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6"
          : "space-y-4"
      }
    >
      {products.map((product) => (
        <div
          key={product.id}
          onClick={() => navigate(`/products/${product.id}`)}
          className={`
          bg-white rounded-2xl shadow-sm w-full
          hover:shadow-lg transition hover:cursor-pointer
          ${view === "list" ? "flex items-center gap-6 p-5" : "overflow-hidden"}
          `}
        >
          {/* Image */}
          <div
            className={`
            relative bg-gray-100 rounded-xl overflow-hidden
            ${view === "list" ? "w-50 h-50 shrink-0" : "h-56 w-full"}
            `}
          >
            <img
              src={product.thumbnail}
              alt={product.title}
              className="w-full h-full object-contain"
            />

            <span
              className="
              absolute top-2 left-2
              bg-red-500 text-white
              text-xs px-2 py-1 rounded-full
            "
            >
              -{Math.round(product.discountPercentage)}%
            </span>
          </div>

          {/* Details */}

          <div
            className={`
            ${view === "list" ? "flex-1" : "lg:p-5 md:p-4 p-3"}
            `}
          >
            <div className="flex justify-between gap-2">
              <div className="text-left">
                <span
                  className="
                text-xs
                bg-purple-100
                text-[#aa3bff]
                px-3 py-1
                rounded-full
                capitalize
                "
                >
                  {product.category}
                </span>

                <h2
                  className="
                lg:text-[20px] md:text-[20px] text-[18px] leading-base font-semibold mt-3
                text-gray-800
                "
                >
                  {product.title}
                </h2>

                <p
                  className="
                lg:text-[16px] md:text-[15px] text-[14px] text-gray-500
                mt-2
                "
                >
                  {product.brand}
                </p>
              </div>

              {/* Wishlist */}

              <div
                className="
              h-10 w-10
              rounded-full
              bg-gray-100
              flex items-center justify-center 
              "
              >
                <RiHeart3Line size={20} />
              </div>
            </div>

            {/* Stats */}

            {view === "list" ? (
              // LIST VIEW STATS
              <div className="flex items-center justify-between mt-6">
                {/* Left stats */}
                <div className="flex gap-4">
                  {/* Rating */}
                  <div className="flex items-center gap-3 bg-yellow-50 px-4 py-3 rounded-xl">
                    <RiStarFill className="text-yellow-500" size={20} />

                    <div>
                      <p className="text-xs text-gray-400">Rating</p>

                      <p className="font-semibold">{product.rating}/5</p>
                    </div>
                  </div>

                  {/* Stock */}
                  <div className="flex items-center gap-3 bg-green-50 px-4 py-3 rounded-xl">
                    <RiBox3Line className="text-green-600" size={20} />

                    <div>
                      <p className="text-xs text-gray-400">Stock</p>

                      <p className="font-semibold">{product.stock}</p>
                    </div>
                  </div>
                </div>

                {/* Price */}
                <div className="text-right">
                  <p className="text-sm text-gray-400">Price</p>

                  <p className="lg:text-3xl md:text-2xl text-xl font-bold text-[#aa3bff]">
                    ${product.price}
                  </p>
                </div>
              </div>
            ) : (
              // GRID VIEW STATS

              <div className="mt-4">
                {/* Price */}
                <p className="text-2xl font-bold text-[#aa3bff]">
                  ${product.price}
                </p>

                <div className="flex justify-between items-center mt-3">
                  {/* Rating */}
                  <div
                    className="
      flex items-center gap-1
      bg-yellow-50
      px-3 py-1.5
      rounded-full
      "
                  >
                    <RiStarFill className="text-yellow-500" size={16} />

                    <span className="text-sm font-medium">
                      {product.rating}
                    </span>
                  </div>

                  {/* Stock */}
                  <span
                    className={`
      text-xs px-3 py-1 rounded-full
      ${
        product.stock > 0
          ? "bg-green-100 text-green-600"
          : "bg-red-100 text-red-600"
      }
      `}
                  >
                    {product.stock > 0 ? "In Stock" : "Out"}
                  </span>
                </div>
              </div>
            )}
            {/* Actions */}

            <div
              className={` flex gap-6 mt-5 items-center ${view === "grid" ? "justify-between" : "justify-start"}`}
            >
              <button
                className="
              flex items-center gap-2
              px-4 py-2
              rounded-xl 
              bg-[#aa3bff]
              text-white
              text-sm hover:cursor-pointer
              "
                onClick={(e) => {
                  e.stopPropagation();
                  navigate(`/products/${product.id}`);
                }}
              >
                <RiEyeLine />
                View Details
              </button>

              <div
                className="
              h-10 w-10
              rounded-full
              bg-gray-100
               flex items-center justify-center
              "
              >
                <RiShoppingCartLine />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
