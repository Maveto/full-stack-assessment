import FaviconImage from "./FaviconImage";
import Navbar from "./Navbar";
import Image from "next/image";

const links = [
  {
    name: "Home",
    href: "/",
    icon: "",
  },
  {
    name: "Sign In",
    href: "/signin",
    icon: "",
  },
  {
    name: "Sign Up",
    href: "/signup",
    icon: "",
  },
];

const userLinks = [
  {
    name: "Home",
    href: "/",
    icon: "",
  },
  {
    name: "Cart",
    href: "/cart",
    icon: "",
  },
  {
    name: "My Reviews",
    href: "/reviews",
    icon: "",
  },
  {
    name: "Profile",
    href: "/profile",
    icon: "",
  },
];

export default function Header() {
  return (
    <header className="w-full bg-secondary shadow">
      <nav className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex gap-3 items-center">
          <FaviconImage size={32} />
          <div className="text-xl font-bold">Mauri Shop</div>
        </div>
        <Navbar links={links} />
      </nav>
    </header>
  );
}
