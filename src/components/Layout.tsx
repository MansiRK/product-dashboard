import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import { useState } from "react";

export default function Layout() {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <div className="flex h-screen">
      <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />

      <div className="flex-1 flex flex-col transition-all duration-300">
        <Navbar collapsed={collapsed} setCollapsed={setCollapsed} />

        <main className="flex-1 p-6 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
