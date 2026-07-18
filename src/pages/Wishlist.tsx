import { useWishlistStore } from "../store/wishlistStore";
import {
  RiShoppingCartLine,
  RiDeleteBin6Line,
  RiBox3Line,
} from "react-icons/ri";
import { useCartStore } from "../store/cartStore";
import { toast } from "react-hot-toast";
import type { Product } from "../types/product";

export default function Wishlist() {
  const wishlist = useWishlistStore((state) => state.wishlist);

  const addToCart = useCartStore((state) => state.addToCart);

  const removeFromWishlist = useWishlistStore(
    (state) => state.removeFromWishlist,
  );

  const isCart = useCartStore((state) => state.isCart);

  const handleAddToCart = (product: Product) => {
    if (isCart(product.id)) {
      toast("Already in cart");
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

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Wishlist</h1>

          <p className="text-gray-500">{wishlist.length} saved items</p>
        </div>

        <div className="flex gap-5">
          <button
            onClick={handleMoveAll}
            disabled={wishlist.length === 0}
            className={`
    flex items-center gap-3 px-5 py-3 rounded-xl transition

    ${
      wishlist.length === 0
        ? "bg-gray-100 text-gray-400 cursor-not-allowed"
        : "bg-[#aa3bff] text-white hover:bg-purple-700"
    }
  `}
          >
            <RiShoppingCartLine />
            Move All
          </button>

          <button
            onClick={handleClearWishlist}
            disabled={wishlist.length === 0}
            className={`
    flex items-center gap-3 px-5 py-3 rounded-xl transition

    ${
      wishlist.length === 0
        ? "bg-gray-100 text-gray-400 cursor-not-allowed"
        : "border border-gray-200 hover:bg-gray-100"
    }
  `}
          >
            <RiDeleteBin6Line />
            Clear All
          </button>
        </div>
      </div>

      {wishlist.length === 0 ? (
        <p className="text-center text-gray-500 py-10">
          No products in wishlist
        </p>
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
      p-6
      flex
      items-center
      gap-6 relative
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
                    className="text-xl font-semibold"
                  >
                    {product.title}
                  </a>

                  <p className="text-gray-500 mt-2">{product.brand}</p>

                  <p className="text-[#aa3bff] text-2xl font-bold mt-3">
                    ${product.price}
                  </p>

                  <div className="flex items-center gap-5 mt-2">
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
                    disabled={alreadyInCart}
                    onClick={() => handleAddToCart(product)}
                    className={`
                px-5
                py-3
                rounded-xl
                flex
                items-center
                gap-2
                transition

                ${
                  alreadyInCart
                    ? "bg-purple-100 text-[#aa3bff] cursor-not-allowed"
                    : "bg-[#aa3bff] text-white hover:bg-purple-700"
                }
              `}
                  >
                    <RiShoppingCartLine />

                    {alreadyInCart ? "Already in Cart" : "Move to Cart"}
                  </button>

                  <button
                    onClick={() => removeFromWishlist(product.id)}
                    className="
                px-5
                py-3
                rounded-xl
                border
                border-gray-200
                hover:bg-gray-100
                transition
                flex
                items-center
                gap-2
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
