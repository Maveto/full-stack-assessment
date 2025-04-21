"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { IconType } from "react-icons";
import { FaBars } from "react-icons/fa";

type LinkItem = {
  name: string;
  href?: string;
  icon?: IconType;
  onClick?: () => void;
};

type NavbarProps = {
  links: LinkItem[];
  rounded?: string;
  primary?: boolean;
};

export default function Navbar({
  links,
  rounded = "md",
  primary = true,
}: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const pathName = usePathname();

  const baseClasses = `p-3 rounded-${rounded} flex items-center gap-2 transition`;
  const primaryClasses = `bg-primary hover:bg-accent text-background`;
  const secondaryClasses = `bg-secondary hover:bg-accent text-foreground`;
  const combinedClasses = (isPrimary: boolean) =>
    `${baseClasses} ${isPrimary ? primaryClasses : secondaryClasses}`;

  const isActiveRoute = (href?: string) => {
    if (!href) return false;
    return pathName === href || pathName.startsWith(href + "/");
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative">
      {/* Desktop Menu */}
      <ul className="gap-2 hidden md:flex items-center">
        {links.map((link) => (
          <li key={link.name + (link.href || "")}>
            {link.href ? (
              <Link
                href={link.href}
                onClick={link.onClick}
                className={
                  isActiveRoute(link.href)
                    ? `${baseClasses} bg-accent text-foreground`
                    : combinedClasses(primary)
                }
              >
                {link.icon && <link.icon size={18} />}
                {link.name}
              </Link>
            ) : (
              <button
                onClick={link.onClick}
                className={
                  isActiveRoute(link.href)
                    ? `${baseClasses} bg-accent text-foreground`
                    : combinedClasses(primary)
                }
              >
                {link.icon && <link.icon size={18} />}
                {link.name}
              </button>
            )}
          </li>
        ))}
      </ul>

      {/* Mobile Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex md:hidden items-center justify-center hover:bg-accent text-foreground p-3 rounded-md transition"
      >
        <FaBars />
      </button>

      {/* Dropdown Menu Mobile */}
      {isOpen && (
        <div
          ref={dropdownRef}
          className="absolute right-0 top-12 z-50 w-48 bg-background rounded-md shadow-lg border dark:border-gray-700 animate-fade-in"
        >
          <ul className="flex flex-col py-2">
            {links.map((link) => (
              <li key={"mobile" + link.name + (link.href || "")}>
                {link.href ? (
                  <Link
                    href={link.href}
                    onClick={() => {
                      link.onClick?.();
                      setIsOpen(false);
                    }}
                    className="px-4 py-2 text-foreground hover:bg-accent hover:text-foreground transition flex items-center gap-2"
                  >
                    {link.icon && <link.icon size={18} />}
                    {link.name}
                  </Link>
                ) : (
                  <button
                    onClick={() => {
                      link.onClick?.();
                      setIsOpen(false);
                    }}
                    className="w-full text-left text-foreground px-4 py-2 hover:bg-accent hover:text-foreground transition flex items-center gap-2"
                  >
                    {link.icon && <link.icon size={18} />}
                    {link.name}
                  </button>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
