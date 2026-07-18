import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  RiDashboardLine,
  RiHeart3Line,
  RiShoppingCartLine,
  RiLogoutBoxLine,
  RiCloseLine,
} from "react-icons/ri";
import { toast } from "react-hot-toast";
import logo from "../assets/icons/purple-shopping-bag.png";
import { FiPackage } from "react-icons/fi";

interface SidebarProps {
  collapsed: boolean;
  isMobile: boolean;

  mobileOpen: boolean;
  setMobileOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Sidebar({
  collapsed,
  isMobile,
  mobileOpen,
  setMobileOpen,
}: SidebarProps) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("adminEmail");

    toast.success("Logged out successfully!");

    navigate("/", { replace: true });
  };

  const handleNavClick = () => {
    if (isMobile) {
      setMobileOpen(false);
    }
  };

  return (
    <aside
      className={`
    bg-white shadow-lg flex flex-col transition-all duration-300

    ${
      isMobile
        ? `fixed top-0 left-0 z-50 h-screen ${
            mobileOpen
              ? "translate-x-0 lg:w-64 w-[70%]"
              : "-translate-x-full lg:w-64 w-[70%]"
          }`
        : `h-screen ${collapsed ? "w-20" : "lg:w-64 w-[70%]"}`
    }
  `}
    >
      {/* Top */}
      <div>
        <div
          className={`flex items-center gap-2 px-5 pt-5 pb-8 relative ${collapsed && !isMobile ? "justify-center" : "gap-3 justify-start"}`}
        >
          <div className="flex items-center gap-3">
            <img src={logo} alt="ShopEase Logo" className="w-7 h-7" />

            {(!collapsed || isMobile) && (
              <h4 className="text-2xl font-semibold">ShopEase</h4>
            )}
          </div>

          {isMobile && (
            <button
              onClick={() => setMobileOpen(false)}
              className="rounded-lg p-2 hover:bg-gray-100 absolute top-3 right-3"
            >
              <RiCloseLine size={24} />
            </button>
          )}
        </div>

        <nav className="space-y-3">
          <NavLink
            to="/dashboard"
            onClick={handleNavClick}
            className={`flex items-center lg:py-3 md:py-3 py-2 px-5 px-5 rounded-lg hover:bg-gray-100 mx-2
${collapsed && !isMobile ? "justify-center" : "gap-3"}`}
          >
            <RiDashboardLine size={22} />

            {(!collapsed || isMobile) && <span>Dashboard</span>}
          </NavLink>

          <NavLink
            to="/products"
            onClick={handleNavClick}
            className={`flex items-center lg:py-3 md:py-3 py-2 px-5 px-5 rounded-lg hover:bg-gray-100 mx-2
 ${collapsed && !isMobile ? "justify-center" : "gap-3"}`}
          >
            <FiPackage size={22} />

            {(!collapsed || isMobile) && <span>Products</span>}
          </NavLink>

          <NavLink
            to="/wishlist"
            onClick={handleNavClick}
            className={`flex items-center lg:py-3 md:py-3 py-2 px-5 px-5 rounded-lg hover:bg-gray-100 mx-2
  ${collapsed && !isMobile ? "justify-center" : "gap-3"}`}
          >
            <RiHeart3Line size={22} />
            {(!collapsed || isMobile) && <span>Wishlist</span>}
          </NavLink>

          <NavLink
            to="/cart"
            onClick={handleNavClick}
            className={`flex items-center lg:py-3 md:py-3 py-2 px-5 rounded-lg hover:bg-gray-100 mx-2
  ${collapsed && !isMobile ? "justify-center" : "gap-3"}`}
          >
            <RiShoppingCartLine size={22} />
            {(!collapsed || isMobile) && <span>Cart</span>}
          </NavLink>
        </nav>
      </div>

      {/* Bottom */}
      <button
        onClick={handleLogout}
        className={`flex items-center lg:py-3 md:py-3 py-2 px-5 px-5 rounded-lg text-red-800 hover:bg-gray-100 mx-2 mt-2 hover:cursor-pointer
  ${collapsed && !isMobile ? "justify-center" : "gap-3"}`}
      >
        <RiLogoutBoxLine size={22} />
        {(!collapsed || isMobile) && <span>Logout</span>}
      </button>
    </aside>
  );
}
