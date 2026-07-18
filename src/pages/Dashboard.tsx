import {
  RiShoppingBag3Line,
  RiShoppingCartLine,
  RiHeart3Line,
  RiArchiveLine,
  RiMoneyDollarCircleLine,
  RiStarSmileLine,
  RiAlarmWarningLine,
  RiPriceTag3Line,
  RiStore2Line,
  RiErrorWarningLine,
  RiUserSmileLine,
} from "react-icons/ri";
import { useCartStore } from "../store/cartStore";
import { useWishlistStore } from "../store/wishlistStore";
import StatCard from "../components/StatCard";
import CardSkeleton from "../components/skeletons/CardSkeleton";
import { useQuery } from "@tanstack/react-query";
import { fetchDashboardData } from "../services/dashboardService";

export default function Dashboard() {
  const cart = useCartStore((state) => state.cart);
  const wishlist = useWishlistStore((state) => state.wishlist);

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["dashboard"],
    queryFn: fetchDashboardData,
  });

  const products = data?.products ?? [];

  const categories = data?.categories ?? [];

  const totalProducts = products.length;

  const totalCartItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  const totalWishlist = wishlist.length;

  const totalStock = products.reduce((sum, item) => sum + item.stock, 0);

  const inventoryValue = products.reduce(
    (sum, item) => sum + item.price * item.stock,
    0,
  );

  const averageRating =
    products.length > 0
      ? (
          products.reduce((sum, item) => sum + item.rating, 0) / products.length
        ).toFixed(1)
      : "0";

  const lowStockProducts = products.filter(
    (item) => item.stock > 0 && item.stock < 10,
  ).length;

  const outOfStockProducts = products.filter((item) => item.stock === 0).length;

  const cartValue = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  const totalCategories = categories.length;

  const totalBrands = new Set(products.map((item) => item.brand)).size;

  const mostWishlisted = wishlist.length > 0 ? wishlist[0].title : "None";

  if (isError) {
    return (
      <div className="p-10 text-center">
        <h2 className="text-xl font-semibold text-red-500">
          Failed to load dashboard data
        </h2>

        <p className="text-gray-500 mt-1">
          Something went wrong while fetching dashboard information.
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
      {/* Header */}

      <div className="mb-10">
        <h1 className="lg:text-3xl md:text-2xl text-xl font-bold text-gray-800 gap-3 flex items-center">
          Welcome Back{" "}
          <span>
            <RiUserSmileLine size={30} className="text-[#aa3bff]" />
          </span>
        </h1>

        <p className="text-gray-500 lg:mt-3 mt-2 lg:text-[16px] md:text-[15px] text-[14px]">
          Here's an overview of your store.
        </p>
      </div>

      {/* Stats */}

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {isLoading ? (
          Array.from({ length: 12 }).map((_, index) => (
            <CardSkeleton key={index} />
          ))
        ) : (
          <>
            <StatCard
              title="Total Products"
              value={totalProducts}
              icon={RiShoppingBag3Line}
            />

            <StatCard
              title="Cart Items"
              value={totalCartItems}
              icon={RiShoppingCartLine}
            />

            <StatCard
              title="Wishlist"
              value={totalWishlist}
              icon={RiHeart3Line}
            />

            <StatCard
              title="Total Stock"
              value={totalStock}
              icon={RiArchiveLine}
            />

            <StatCard
              title="Inventory Value"
              value={`$${inventoryValue.toFixed(2)}`}
              icon={RiMoneyDollarCircleLine}
            />

            <StatCard
              title="Average Rating"
              value={`${averageRating}`}
              icon={RiStarSmileLine}
            />

            <StatCard
              title="Low Stock Products"
              value={lowStockProducts}
              icon={RiAlarmWarningLine}
            />

            <StatCard
              title="Cart Value"
              value={`$${cartValue.toFixed(2)}`}
              icon={RiShoppingCartLine}
            />

            <StatCard
              title="Most Wishlisted"
              value={mostWishlisted}
              icon={RiHeart3Line}
            />

            <StatCard
              title="Out of Stock"
              value={outOfStockProducts}
              icon={RiErrorWarningLine}
            />

            <StatCard
              title="Categories"
              value={totalCategories}
              icon={RiPriceTag3Line}
            />

            <StatCard title="Brands" value={totalBrands} icon={RiStore2Line} />
          </>
        )}
      </div>
    </div>
  );
}
