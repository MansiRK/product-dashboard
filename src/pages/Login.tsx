import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { HiOutlineEye, HiOutlineEyeOff } from "react-icons/hi";
import shoppingBag from "../assets/icons/shopping-bag.png";
import { toast } from "react-hot-toast";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const ADMIN_EMAIL = "admin@shopease.com";
  const ADMIN_PASSWORD = "Admin@12345";

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    if (!email.trim() || !password.trim()) {
      toast.error("Please enter email and password");
      return;
    }

    if (email !== ADMIN_EMAIL || password !== ADMIN_PASSWORD) {
      toast.error("Invalid email or password");
      return;
    }

    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&^#()_\-+=])[A-Za-z\d@$!%*?&^#()_\-+=]{10,}$/;

    if (!passwordRegex.test(password)) {
      toast.error(
        "Password must be at least 10 characters and include uppercase, lowercase, number, and special character.",
      );
      return;
    }

    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("adminEmail", email);

    toast.success("Login successful!");
    navigate("/dashboard");
  };

  return (
    <div className="flex min-h-dvh">
      {/* Left Side */}
      <div className="hidden lg:flex lg:w-2/5 bg-[#aa3bff] items-center justify-center text-white p-8">
        <div className="text-center px-10">
          <h3 className="text-[30px] font-semibold mb-4 flex items-center justify-center gap-2 ">
            <span>
              <img
                src={shoppingBag}
                alt="Shopping Bag"
                className="w-[50px] h-[50px]"
              />
            </span>
            ShopEase{" "}
          </h3>
          <h1 className="text-5xl font-bold mb-6">Welcome Back!</h1>
          <p className="text-md text-gray-200 ">
            Securely access your ShopEase admin dashboard.
          </p>
        </div>
      </div>

      {/* Right Side */}
      <div className="w-full lg:w-[60%] bg-gray-100 lg:flex flex items-center justify-center">
        <form
          onSubmit={handleLogin}
          className="w-full max-w-md rounded-2xl shadow-lg p-6 sm:p-8 md:p-10"
        >
          <div className="lg:hidden mb-8 text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#aa3bff] shadow-lg">
              <img src={shoppingBag} alt="Shopping Bag" className="h-8 w-8" />
            </div>

            <h1 className="text-3xl font-bold text-gray-900">Welcome Back</h1>

            <p className="mt-2 text-sm leading-6 text-gray-500">
              Securely access your ShopEase admin dashboard.
            </p>
          </div>

          <h3 className="text-2xl sm:text-3xl font-semibold text-center text-gray-800 mb-2">
            Login
          </h3>

          {/* Email */}
          <div className="mb-5">
            <label className="block text-gray-700 font-medium mb-2">
              Email
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#aa3bff] transition"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Password */}
          <div className="mb-6">
            <label className="block text-gray-700 font-medium mb-2">
              Password
            </label>

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                className="w-full border border-gray-300 rounded-xl px-4 py-3 pr-12 focus:outline-none focus:ring-2 focus:ring-[#aa3bff] transition"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-[#aa3bff]"
              >
                {showPassword ? (
                  <HiOutlineEyeOff size={20} />
                ) : (
                  <HiOutlineEye size={20} />
                )}
              </button>
            </div>
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full bg-[#aa3bff] hover:bg-[#8a2be2] text-white py-3 rounded-xl font-semibold transition duration-300 hover:scale-[1.02] hover:cursor-pointer"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
