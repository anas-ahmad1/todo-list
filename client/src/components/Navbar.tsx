"use client";

import { useState, useEffect } from "react";
import { useUser } from "@/context/UserContext";
import { useRouter } from "next/navigation";
import { FRONTEND_ROUTES } from "@/utils/routes";

const Navbar = () => {
  const { user, setUser } = useUser();
  const router = useRouter();
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as "light" | "dark";
    if (savedTheme) {
      setTheme(savedTheme);
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
    router.push(FRONTEND_ROUTES.AUTH.LOGIN);
  };

  return (
    <nav className="w-full px-6 py-3 flex items-center justify-between">
      <div className="text-2xl">TextFlow</div>

      <div className="flex">
        <button
          onClick={toggleTheme}
          className={`w-12 h-6 flex items-center rounded-full p-1 ${
            theme === "dark" ? "bg-gray-800" : "bg-gray-300"
          }`}
        >
          <div
            className={`w-4 h-4 rounded-full bg-white transform transition-transform ${
              theme === "dark" ? "translate-x-6" : "translate-x-0"
            }`}
          />
        </button>
      </div>

      <div
        className="relative group"
        onClick={() => setMenuOpen((prev) => !prev)}
      >
        <button className="font-medium text-white">
          Welcome, {user?.name || "Guest"}
        </button>
        {menuOpen && user && (
          <div className="absolute right-0 mt-2 bg-white border rounded shadow-md z-50">
            <button
              onClick={handleLogout}
              className="block w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100"
            >
              Log out
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
