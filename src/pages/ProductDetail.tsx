import { useEffect, useState } from "react";
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
import { api } from "../services/api";
import type { Product } from "../types/product";
import { useNavigate } from "react-router-dom";
import { useCartStore } from "../store/cartStore";
import { useWishlistStore } from "../store/wishlistStore";
import { toast } from "react-hot-toast";

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);

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
    if (!product) return;

    if (isInCart) {
      toast("Already in cart");
      return;
    }

    addToCart(product, quantity);
    toast.success("Added to cart");
  };

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await api.get(`/products/${id}`);

        setProduct(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return <div className="p-10 text-center">Loading product details...</div>;
  }

  if (!product) {
    return <div className="p-10">Product not found</div>;
  }

  return (
    <div className="space-y-8">
      {/* Header */}

      <div className="flex items-center gap-4">
        <button
          onClick={() => navigate(-1)}
          className="
          p-3 rounded-xl
          bg-white shadow-sm
          hover:bg-gray-100
          "
        >
          <RiArrowLeftLine size={22} />
        </button>

        <div>
          <h1 className="text-3xl font-bold text-gray-800">Product Details</h1>

          <p className="text-gray-500">View complete product information</p>
        </div>
      </div>

      <div
        className="
        bg-white
        rounded-3xl
        shadow-sm
        p-8
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
              w-full
              h-full
              object-cover
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
            text-4xl
            font-bold
            mt-5
            text-gray-800
            "
          >
            {product.title}
          </h2>

          <p className="text-gray-500 mt-3 leading-relaxed">
            {product.description}
          </p>

          {/* Price */}

          <div className="flex items-center gap-8 mt-6">
            <p
              className="
              text-[35px]
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
              text-sm
              "
            >
              {product.discountPercentage}% OFF
            </span>
          </div>

          <div className="mt-8 space-y-4">
            {/* Quantity */}
            <div className="flex items-center justify-start gap-8 mt-6">
              <span className="font-medium text-gray-700">Quantity</span>

              <div className="flex items-center overflow-hidden rounded-xl border border-gray-200 bg-white">
                <button
                  className="h-11 w-11 hover:bg-gray-100 transition hover:cursor-pointer"
                  onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
                >
                  −
                </button>

                <span className="w-12 text-center font-semibold">
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
                className={`flex-1 h-14 rounded-2xl font-semibold flex items-center justify-center gap-2 transition-all duration-300 hover:cursor-pointer
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
    flex-1 h-14 rounded-2xl font-semibold
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
            gap-4
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
            <h2 className="font-semibold text-xl mb-4">Tags</h2>

            <div className="flex flex-wrap gap-3">
              {product.tags?.map((tag) => (
                <span
                  key={tag}
                  className="
              px-4
              py-2
              bg-gray-100
              rounded-full
              text-sm
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
p-4
"
    >
      <p className="text-sm text-gray-500">{title}</p>

      <p className="font-semibold mt-1">{value}</p>
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
items-center
gap-3
text-sm
"
    >
      <span className="text-[#aa3bff] text-xl">{icon}</span>

      <div>
        <p className="text-gray-500">{label}</p>

        <p className="font-medium text-gray-800">{value}</p>
      </div>
    </div>
  );
}
