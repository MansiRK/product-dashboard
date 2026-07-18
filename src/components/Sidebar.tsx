import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  RiDashboardLine,
  RiHeart3Line,
  RiShoppingCartLine,
  RiLogoutBoxLine,
} from "react-icons/ri";
import { toast } from "react-hot-toast";
import logo from "../assets/icons/purple-shopping-bag.png";
import { FiPackage } from "react-icons/fi";

interface SidebarProps {
  collapsed: boolean;
  setCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Sidebar({ collapsed }: SidebarProps) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("adminEmail");

    toast.success("Logged out successfully!");

    navigate("/", { replace: true });
  };

  return (
    <aside
      className={`h-screen bg-white shadow-md transition-all duration-300 flex flex-col
  ${collapsed ? "w-20" : "w-64"}`}
    >
      {/* Top */}
      <div>
        <div
          className={`flex items-center gap-2 px-5 pt-5 pb-8 ${collapsed ? "justify-center" : "gap-3"}`}
        >
          <img src={logo} alt="ShopEase Logo" className="w-[28px] h-[28px]" />
          {!collapsed && (
            <h4 className="text-[24px] font-semibold">ShopEase</h4>
          )}
        </div>

        <nav className="space-y-3">
          <NavLink
            to="/dashboard"
            className={`flex items-center py-3 px-5 rounded-lg hover:bg-gray-100 mx-2
  ${collapsed ? "justify-center" : "gap-3"}`}
          >
            <RiDashboardLine size={22} />

            {!collapsed && <span>Dashboard</span>}
          </NavLink>

          <NavLink
            to="/products"
            className={`flex items-center py-3 px-5 rounded-lg hover:bg-gray-100 mx-2
  ${collapsed ? "justify-center" : "gap-3"}`}
          >
            <FiPackage size={22} />

            {!collapsed && <span>Products</span>}
          </NavLink>

          <NavLink
            to="/wishlist"
            className={`flex items-center py-3 px-5 rounded-lg hover:bg-gray-100 mx-2
  ${collapsed ? "justify-center" : "gap-3"}`}
          >
            <RiHeart3Line size={22} />
            {!collapsed && <span>Wishlist</span>}
          </NavLink>

          <NavLink
            to="/cart"
            className={`flex items-center py-3 px-5 rounded-lg hover:bg-gray-100 mx-2
  ${collapsed ? "justify-center" : "gap-3"}`}
          >
            <RiShoppingCartLine size={22} />
            {!collapsed && <span>Cart</span>}
          </NavLink>
        </nav>
      </div>

      {/* Bottom */}
      <button
        onClick={handleLogout}
        className={`flex items-center py-3 px-5 rounded-lg text-red-800 hover:bg-gray-100 mx-2 mt-2
  ${collapsed ? "justify-center" : "gap-3"}`}
      >
        <RiLogoutBoxLine size={22} />
        {!collapsed && <span>Logout</span>}
      </button>
    </aside>
  );
}
