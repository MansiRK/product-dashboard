import React from "react";
import { RiHeart3Line, RiShoppingCartLine, RiUser3Line } from "react-icons/ri";
import { useCartStore } from "../store/cartStore";
import { useWishlistStore } from "../store/wishlistStore";
import { Link } from "react-router-dom";

import { HiOutlineMenuAlt2 } from "react-icons/hi";

interface NavbarProps {
  collapsed: boolean;
  setCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Navbar({ collapsed, setCollapsed }: NavbarProps) {
  const cart = useCartStore((state) => state.cart);
  const wishlist = useWishlistStore((state) => state.wishlist);

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const wishlistCount = wishlist.length;

  return (
    <header className="bg-white shadow-sm px-8 py-4 flex items-center justify-between">
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="text-2xl text-gray-600 hover:text-[#aa3bff] transition cursor-pointer"
      >
        <HiOutlineMenuAlt2 />
      </button>

      {/* Icons */}
      <div className="flex items-center gap-6">
        {/* Wishlist */}
        <Link
          to="/wishlist"
          className="relative text-2xl text-gray-600 hover:text-[#aa3bff] transition"
        >
          <RiHeart3Line />

          {wishlistCount > 0 && (
            <span
              className="
        absolute
        -top-2
        -right-2
        h-5
        min-w-[20px]
        px-1
        rounded-full
        bg-[#aa3bff]
        text-white
        text-[11px]
        font-semibold
        flex
        items-center
        justify-center
      "
            >
              {wishlistCount}
            </span>
          )}
        </Link>

        {/* Cart */}
        <Link
          to="/cart"
          className="relative text-2xl text-gray-600 hover:text-[#aa3bff] transition"
        >
          <RiShoppingCartLine />

          {cartCount > 0 && (
            <span
              className="
        absolute
        -top-2
        -right-2
        h-5
        min-w-[20px]
        px-1
        rounded-full
        bg-[#aa3bff]
        text-white
        text-[11px]
        font-semibold
        flex
        items-center
        justify-center
      "
            >
              {cartCount}
            </span>
          )}
        </Link>

        {/* User */}
        <button className="text-2xl text-gray-600 hover:text-[#aa3bff] transition">
          <RiUser3Line />
        </button>
      </div>
    </header>
  );
}
