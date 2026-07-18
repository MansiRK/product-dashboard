import { useWishlistStore } from "../store/wishlistStore";
import {
  RiShoppingCartLine,
  RiDeleteBin6Line,
  RiBox3Line,
  RiHeartLine,
} from "react-icons/ri";
import { useCartStore } from "../store/cartStore";
import { toast } from "react-hot-toast";
import type { Product } from "../types/product";
import WishlistSkeleton from "../components/skeletons/WishlistSkeleton";
import EmptyState from "../components/EmptyState";
import { useNavigate } from "react-router-dom";

export default function Wishlist() {
  const wishlist = useWishlistStore((state) => state.wishlist);

  const addToCart = useCartStore((state) => state.addToCart);

  const removeFromWishlist = useWishlistStore(
    (state) => state.removeFromWishlist,
  );

  const isCart = useCartStore((state) => state.isCart);

  const handleAddToCart = (product: Product) => {
    if (isCart(product.id)) {
      navigate("/cart");
      return;
    }

    addToCart(product);
    removeFromWishlist(product.id);

    toast.success("Moved to cart");
  };

  const clearWishlist = useWishlistStore((state) => state.clearWishlist);

  const addMultipleToCart = useCartStore((state) => state.addMultipleToCart);
  const handleMoveAll = () => {
    if (wishlist.length === 0) {
      toast("Wishlist is empty");
      return;
    }

    addMultipleToCart(wishlist);
    clearWishlist();

    toast.success(`${wishlist.length} items moved to cart`);
  };

  const handleClearWishlist = () => {
    if (wishlist.length === 0) {
      toast("Wishlist is already empty");
      return;
    }

    clearWishlist();
    toast.success("Wishlist cleared");
  };

  const loading = useWishlistStore((state) => state.loading);
  const navigate = useNavigate();

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="lg:text-3xl md:text-2xl text-xl font-bold text-gray-800">
            Wishlist
          </h1>

          <p className="text-gray-500 lg:mt-3 mt-2 lg:text-[16px] md:text-[15px] text-[14px]">
            {wishlist.length} saved items
          </p>
        </div>

        <div className="flex gap-5">
          <button
            onClick={handleMoveAll}
            disabled={wishlist.length === 0}
            title="Move all to cart"
            aria-label="Move all wishlist items to cart"
            className={`
    flex items-center justify-center gap-2
    rounded-xl transition hover:cursor-pointer
lg:text-[15px] md:text-[15px] text-[14px]
    lg:px-3 md:px-3 px-2 py-2

    ${
      wishlist.length === 0
        ? "bg-gray-100 text-gray-400 cursor-not-allowed"
        : "bg-[#aa3bff] text-white hover:bg-purple-700"
    }
  `}
          >
            <RiShoppingCartLine size={20} />

            <span className="hidden sm:block">Move All</span>
          </button>

          <button
            onClick={handleClearWishlist}
            disabled={wishlist.length === 0}
            title="Clear wishlist"
            aria-label="Clear all wishlist items"
            className={`
   flex items-center justify-center gap-2
    rounded-xl transition hover:cursor-pointer
lg:text-[15px] md:text-[15px] text-[14px]
    lg:px-3 md:px-3 px-2 py-2

    ${
      wishlist.length === 0
        ? "bg-gray-100 text-gray-400 cursor-not-allowed "
        : "border border-gray-200 hover:bg-gray-100"
    }
  `}
          >
            <RiDeleteBin6Line size={20} />

            <span className="hidden sm:block">Clear All</span>
          </button>
        </div>
      </div>
      {loading ? (
        <WishlistSkeleton count={3} />
      ) : wishlist.length === 0 ? (
        <EmptyState
          icon={<RiHeartLine size={32} />}
          title="Your wishlist is empty"
          description="Save your favorite products here and find them easily later."
          buttonText="Explore Products"
          onClick={() => navigate("/products")}
        />
      ) : (
        <div className="space-y-5">
          {wishlist.map((product) => {
            const alreadyInCart = isCart(product.id);

            return (
              <div
                key={product.id}
                className="
  bg-white
  rounded-2xl
  shadow-sm
  lg:p-5 md:p-4 p-3
  flex
  flex-col
  sm:flex-row
  lg:items-center md:items-center items-start
  lg:gap-6 md:gap-5 gap-4
  relative
  "
              >
                {/* Discount */}
                <span
                  className="
              absolute top-3 left-3
              bg-red-500
              text-white
              text-xs
              px-2
              py-1
              rounded-full
            "
                >
                  -{Math.round(product.discountPercentage)}%
                </span>

                {/* Image */}
                <a href={`/products/${product.id}`}>
                  <img
                    src={product.thumbnail}
                    alt={product.title}
                    className="w-36 h-36 rounded-xl object-cover shrink-0"
                  />
                </a>

                {/* Details */}
                <div className="flex-1">
                  <a
                    href={`/products/${product.id}`}
                    className="lg:text-[20px] md:text-[20px] text-[18px] leading-base font-semibold"
                  >
                    {product.title}
                  </a>

                  <p className="text-gray-500 lg:mt-2 md:mt-2 mt-1 lg:text-[18px] md:text-[18px] text-[16px]">
                    {product.brand}
                  </p>

                  <p className="text-[#aa3bff] lg:text-2xl md:text-xl text-lg font-bold mt-3">
                    ${product.price}
                  </p>

                  <div className="flex items-center gap-5 lg:mt-2 md:mt-2 mt-1">
                    <span className="text-yellow-500 font-medium">
                      ★ {product.rating}
                    </span>

                    <div className="flex items-center gap-2 bg-green-50 px-4 py-2 rounded-xl">
                      <RiBox3Line className="text-green-600" size={18} />

                      <span className="text-sm text-green-600">
                        {" "}
                        {product.stock} in stock
                      </span>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-3">
                  <button
                    onClick={() => handleAddToCart(product)}
                    className={`
                lg:text-[15px] md:text-[15px] text-[14px]
    lg:px-3 md:px-3 px-2 py-2
                rounded-xl
                flex
                items-center
                gap-2
                transition hover:cursor-pointer

                  ${
                    alreadyInCart
                      ? "bg-purple-100 text-[#aa3bff] hover:bg-purple-200"
                      : "bg-[#aa3bff] text-white hover:bg-purple-700"
                  }
              `}
                  >
                    <RiShoppingCartLine />

                    {alreadyInCart ? "Go to Cart" : "Add to Cart"}
                  </button>

                  <button
                    onClick={() => removeFromWishlist(product.id)}
                    className="
                lg:text-[15px] md:text-[15px] text-[14px]
    lg:px-3 md:px-3 px-2 py-2
                rounded-xl
                border
                border-gray-200
                hover:bg-gray-100
                transition
                flex
                items-center
                gap-2 hover:cursor-pointer
              "
                  >
                    <RiDeleteBin6Line />
                    Remove
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
