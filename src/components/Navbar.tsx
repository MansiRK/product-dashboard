import React from "react";
import { RiHeart3Line, RiShoppingCartLine, RiUser3Line } from "react-icons/ri";
import { useCartStore } from "../store/cartStore";
import { useWishlistStore } from "../store/wishlistStore";
import { Link } from "react-router-dom";

import { HiOutlineMenuAlt2 } from "react-icons/hi";

interface NavbarProps {
  isMobile: boolean;
  setMobileOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Navbar({
  isMobile,
  setMobileOpen,
  setCollapsed,
}: NavbarProps) {
  const cart = useCartStore((state) => state.cart);
  const wishlist = useWishlistStore((state) => state.wishlist);

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const wishlistCount = wishlist.length;

  const handleNavClick = () => {
    if (isMobile) {
      setMobileOpen(false);
    }
  };

  return (
    <header className="bg-white shadow-sm px-6 py-4 flex items-center justify-between z-10">
      <button
        onClick={() => {
          if (isMobile) {
            setMobileOpen(true);
          } else {
            setCollapsed((prev) => !prev);
          }
        }}
        className="text-2xl text-gray-600 hover:text-[#aa3bff] transition cursor-pointer"
      >
        <HiOutlineMenuAlt2 />
      </button>

      {/* Icons */}
      <div className="flex items-center gap-6">
        {/* Wishlist */}
        <Link
          to="/wishlist"
          onClick={handleNavClick}
          className="relative lg:text-2xl md:text-2xl text-xl text-gray-600 hover:text-[#aa3bff] transition"
        >
          <RiHeart3Line />

          {wishlistCount > 0 && (
            <span
              className="
        absolute
        -top-2
        -right-2
        lg:h-5 md:h-5 h-4
        lg:min-w-[20px] md:min-w-[20px] min-w-[15px]
        lg:px-1 px-[5px]
        rounded-full
        bg-[#aa3bff]
        text-white
        lg:text-[11px] md:text-[11px] text-[10px]
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
          onClick={handleNavClick}
          className="relative lg:text-2xl md:text-2xl text-xl text-gray-600 hover:text-[#aa3bff] transition"
        >
          <RiShoppingCartLine />

          {cartCount > 0 && (
            <span
              className="
        absolute
        -top-2
        -right-2
        lg:h-5 md:h-5 h-4
        lg:min-w-[20px] md:min-w-[20px] min-w-[15px]
        lg:px-1 px-[5px]
        rounded-full
        bg-[#aa3bff]
        text-white
        lg:text-[11px] md:text-[11px] text-[10px]
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
