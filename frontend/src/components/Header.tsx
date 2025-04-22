"use client";

import Link from "next/link";
import FaviconImage from "./FaviconImage";
import Navbar from "./Navbar";
import { useAuth } from "@/hooks/useAuth";
import { logout } from "@/lib/api";
import {
  FaShoppingCart,
  FaSignInAlt,
  FaSignOutAlt,
  FaUser,
  FaUserPlus,
} from "react-icons/fa";
import { useRouter } from "next/navigation";
import { MdOutlineReviews } from "react-icons/md";
import { RiDashboardLine, RiShoppingBagLine } from "react-icons/ri";

export default function Header() {
  const { user, isInitialized, logout: logoutSlice, isAdmin } = useAuth();
  const router = useRouter();

  const handleLogOut = async () => {
    try {
      await logout();
      logoutSlice();
      router.push("/");
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  const linksGuest = [
    { name: "Products", href: "/", icon: RiShoppingBagLine },
    { name: "Log In", href: "/login", icon: FaSignInAlt },
    { name: "Sign Up", href: "/signup", icon: FaUserPlus },
  ];

  const linksUserNav = [
    { name: "Products", href: "/", icon: RiShoppingBagLine },
    { name: "Cart", href: "/cart", icon: FaShoppingCart },
    // { name: "My Reviews", href: "/reviews", icon: MdOutlineReviews },
    { name: "Profile", href: "/profile", icon: FaUser },
    { name: "Log Out", onClick: handleLogOut, icon: FaSignOutAlt },
  ];

  const linksAdminNav = [
    { name: "Products", href: "/", icon: RiShoppingBagLine },
    { name: "Admin Panel", href: "/admin", icon: RiDashboardLine },
    { name: "Profile", href: "/profile", icon: FaUser },
    { name: "Log Out", onClick: handleLogOut, icon: FaSignOutAlt },
  ];

  const userActionLinks = user ? linksUserNav : linksGuest;

  return (
    <header className="w-full bg-secondary text-white shadow-md">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex flex-row justify-between items-center gap-4 sm:gap-0">
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-2 hover:opacity-90">
            <FaviconImage size={32} />
            <span className="text-2xl font-bold tracking-tight text-white">
              Mauri Shop
            </span>
          </Link>
        </div>

        {isInitialized ? (
          user ? (
            isAdmin ? (
              <Navbar links={linksAdminNav} primary={false} />
            ) : (
              <Navbar links={linksUserNav} primary={false} />
            )
          ) : (
            <Navbar links={userActionLinks} rounded="full" primary={false} />
          )
        ) : null}
      </nav>
    </header>
  );
}
