import { useState } from "react";
import { useParams } from "react-router-dom";
import {
  RiStarFill,
  RiShoppingBag3Line,
  RiBarcodeLine,
  RiWeightLine,
  RiShieldCheckLine,
  RiTruckLine,
  RiArrowLeftLine,
  RiHeartLine,
  RiShoppingCartLine,
} from "react-icons/ri";
import { RiHeartFill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { useCartStore } from "../store/cartStore";
import { useWishlistStore } from "../store/wishlistStore";
import { toast } from "react-hot-toast";
import ProductDetailSkeleton from "../components/skeletons/ProductDetailSkeleton";
import { useQuery } from "@tanstack/react-query";
import { fetchProductById } from "../services/productService";

export default function ProductDetail() {
  const { id } = useParams();

  const navigate = useNavigate();

  const [quantity, setQuantity] = useState(1);
  const {
    data: product,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["product", id],

    queryFn: () => fetchProductById(id!),

    enabled: !!id,
  });

  const toggleWishlist = useWishlistStore((state) => state.toggleWishlist);

  const wishlist = useWishlistStore((state) => state.wishlist);

  const isWishlisted = product
    ? wishlist.some((item) => item.id === product.id)
    : false;

  const handleWishlist = () => {
    if (!product) return;

    if (isWishlisted) {
      toggleWishlist(product);
      toast.success("Removed from wishlist");
    } else {
      toggleWishlist(product);
      toast.success("Added to wishlist");
    }
  };

  const addToCart = useCartStore((state) => state.addToCart);

  const cart = useCartStore((state) => state.cart);

  const isInCart = product
    ? cart.some((item) => item.id === product.id)
    : false;

  const handleAddToCart = () => {
    if (isError) {
      return (
        <div className="p-10 text-center text-red-500">
          Failed to load product details
        </div>
      );
    }

    if (!product) return;

    if (isInCart) {
      toast("Already in cart");
      return;
    }

    addToCart(product, quantity);
    toast.success("Added to cart");
  };

  if (isLoading) {
    return <ProductDetailSkeleton />;
  }

  if (!product) {
    return <div className="p-10">Product not found</div>;
  }

  return (
    <div className="space-y-8">
      {/* Header */}

      <div className="flex items-start gap-4">
        <button
          onClick={() => navigate(-1)}
          className="
         rounded-xl text-gray-500 pt-2
         hover:text-gray-800 hover:cursor-pointer
          "
        >
          <RiArrowLeftLine size={22} />
        </button>

        <div>
          <h1 className="lg:text-3xl md:text-2xl text-xl font-bold text-gray-800">
            Product Details
          </h1>

          <p className="text-gray-500 lg:mt-3 mt-2 lg:text-[16px] md:text-[15px] text-[14px]">
            View complete product information
          </p>
        </div>
      </div>

      <div
        className="
        bg-white
        rounded-3xl
        shadow-sm
        lg:p-8 md:p-6 p-4
        grid
        lg:grid-cols-2
        gap-10
        "
      >
        {/* Image Section */}

        <div>
          <div
            className="
            h-[420px]
            rounded-2xl
            overflow-hidden
            bg-gray-100
            "
          >
            <img
              src={product.images?.[0] || product.thumbnail}
              alt={product.title}
              className="
              lg:w-full md:w-full w-[350px]
              lg:h-full md:h-full h-[350px]
              object-contain
              "
            />
          </div>

          {/* Images */}

          {/* <div className="flex gap-3 mt-5">
            {product.images?.slice(0, 5).map((img) => (
              <img
                key={img}
                src={img}
                className="
                w-20
                h-20
                rounded-xl
                object-cover
                border
                "
              />
            ))}
          </div> */}
        </div>

        {/* Details */}

        <div>
          <span
            className="
            inline-block
            bg-purple-100
            text-[#aa3bff]
            px-4
            py-1
            rounded-full
            text-sm
            capitalize
            "
          >
            {product.category}
          </span>

          <h2
            className="
            lg:text-4xl md:text-3xl text-2xl
            font-bold
            mt-5
            text-gray-800
            "
          >
            {product.title}
          </h2>

          <p className="text-gray-500 mt-3 leading-relaxed lg:text-[16px] md:text-[15px] text-[14px]">
            {product.description}
          </p>

          {/* Price */}

          <div className="flex items-center gap-8 mt-6">
            <p
              className="
              lg:text-[35px] md:text-[30px] text-[25px]
              font-bold
              text-[#aa3bff]
              "
            >
              ${product.price}
            </p>

            <span
              className="
              bg-red-100
              text-red-600
              px-3
              py-1
              rounded-full
              lg:text-[15px] md:text-[15px] text-[13px]
              "
            >
              {product.discountPercentage}% OFF
            </span>
          </div>

          <div className="mt-8 space-y-4">
            {/* Quantity */}
            <div className="flex items-center justify-start gap-8 mt-6">
              <span className="font-medium text-gray-700 lg:text-[16px] md:text-[15px] text-[14px]">
                Quantity
              </span>

              <div className="flex items-center overflow-hidden rounded-xl border border-gray-200 bg-white">
                <button
                  className="h-11 w-11 hover:bg-gray-100 transition hover:cursor-pointer"
                  onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
                >
                  −
                </button>

                <span className="w-12 text-center font-semibold lg:text-[16px] md:text-[15px] text-[14px]">
                  {quantity}
                </span>

                <button
                  className="h-11 w-11 hover:bg-purple-50 text-[#aa3bff] transition hover:cursor-pointer"
                  onClick={() => setQuantity((prev) => prev + 1)}
                >
                  +
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4">
              <button
                onClick={handleWishlist}
                className={`flex-1 lg:h-14 md:h-14 h-12 rounded-2xl font-semibold flex items-center justify-center gap-2 transition-all duration-300 hover:cursor-pointer
      ${
        isWishlisted
          ? "bg-white border border-purple-200 text-[#aa3bff]"
          : "border-2 bg-purple-50 border-purple-300 text-[#aa3bff]"
      }`}
              >
                {isWishlisted ? (
                  <RiHeartFill size={20} />
                ) : (
                  <RiHeartLine size={20} />
                )}

                {isWishlisted ? "Wishlisted" : "Wishlist"}
              </button>

              <button
                onClick={handleAddToCart}
                disabled={isInCart}
                className={`
    flex-1 lg:h-14 md:h-14 h-12 rounded-2xl font-semibold
    flex items-center justify-center gap-2
    transition-all duration-300

    ${
      isInCart
        ? "bg-purple-100 text-[#aa3bff] border border-purple-300 cursor-not-allowed"
        : "bg-[#aa3bff] text-white hover:bg-purple-700 hover:cursor-pointer"
    }
  `}
              >
                <RiShoppingCartLine size={20} />

                {isInCart ? "Added" : "Add to Cart"}
              </button>
            </div>
          </div>

          {/* Stats */}

          <div
            className="
            grid
            grid-cols-2
            lg:gap-4 md:gap-4 gap-2
            mt-8
            "
          >
            <InfoCard
              title="Rating"
              value={
                <span className="flex items-center gap-1">
                  {product.rating}
                  <RiStarFill className="text-yellow-500" />
                </span>
              }
            />

            <InfoCard title="Stock" value={`${product.stock} units`} />

            <InfoCard title="Brand" value={product.brand} />

            <InfoCard
              title="SKU"
              value={
                <span className="flex gap-1 items-center">
                  <RiBarcodeLine />
                  {product.sku}
                </span>
              }
            />
          </div>

          {/* Extra Information */}

          <div
            className="
            mt-8
            space-y-4
            border-t
            pt-6
            "
          >
            <DetailRow
              icon={<RiWeightLine />}
              label="Weight"
              value={`${product.weight} kg`}
            />

            <DetailRow
              icon={<RiTruckLine />}
              label="Shipping"
              value={product.shippingInformation}
            />

            <DetailRow
              icon={<RiShieldCheckLine />}
              label="Warranty"
              value={product.warrantyInformation}
            />

            <DetailRow
              icon={<RiShoppingBag3Line />}
              label="Return Policy"
              value={product.returnPolicy}
            />
          </div>

          {/* Tags */}

          <div
            className="
        mt-10
        border-t
        pt-6
        "
          >
            <h2 className="font-semibold lg:text-[16px] md:text-[15px] text-[14px] mb-4">
              Tags
            </h2>

            <div className="flex flex-wrap gap-3">
              {product.tags?.map((tag) => (
                <span
                  key={tag}
                  className="
              lg:px-4 md:px-4 px-2
              lg:py-2 md:py-2 py-1
              bg-gray-100
              rounded-full
               lg:text-[14px] md:text-[14px] text-[12px]
              text-gray-700
              "
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function InfoCard({ title, value }: { title: string; value: React.ReactNode }) {
  return (
    <div
      className="
bg-gray-50
rounded-xl
lg:p-3 md:p-3 p-2
"
    >
      <p className="text-sm text-gray-500  lg:text-[16px] md:text-[15px] text-[14px]">
        {title}
      </p>

      <p className="font-semibold mt-1 lg:text-[15px] md:text-[14px] text-[13px]">
        {value}
      </p>
    </div>
  );
}

function DetailRow({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div
      className="
flex
items-start
gap-3
 lg:text-[16px] md:text-[15px] text-[14px]
"
    >
      <span className="text-[#aa3bff] lg:text-xl md:text-xl text-lg">
        {icon}
      </span>

      <div>
        <p className="text-gray-500">{label}</p>

        <p className="font-medium text-gray-800 lg:text-[15px] md:text-[14px] text-[13px]">
          {value}
        </p>
      </div>
    </div>
  );
}
