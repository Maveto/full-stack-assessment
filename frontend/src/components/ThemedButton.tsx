"use client";

import Link from "next/link";
import { IconType } from "react-icons";

type ButtonProps = {
  isPrimary?: boolean;
  isDisabled?: boolean;
  text: string;
  icon?: IconType;
  href?: string;
  onClick?: () => void;
  fullWidth?: boolean;
  padding?: "sm" | "md" | "lg";
};

export default function ThemedButton({
  isPrimary = false,
  isDisabled = false,
  text,
  icon: Icon,
  href,
  onClick,
  fullWidth = false,
  padding = "md",
}: ButtonProps) {
  const paddingMap = {
    sm: "px-2 py-1",
    md: "px-4 py-2",
    lg: "px-6 py-3",
  };

  const baseClass = `
    flex items-center justify-center gap-2 
    rounded transition-colors 
    disabled:bg-gray-400 disabled:text-gray-800
    ${isDisabled ? "cursor-not-allowed" : "cursor-pointer"}
    ${paddingMap[padding]}
    ${fullWidth ? "w-full" : "max-w-fit"}
  `;

  const variantClass = isPrimary
    ? "bg-primary text-background hover:text-foreground hover:bg-accent"
    : "bg-secondary text-foreground hover:bg-accent";

  const finalClass = `${baseClass} ${variantClass}`.replace(/\s+/g, " ").trim();

  const buttonContent = (
    <>
      {Icon && <Icon size={18} />}
      <span>{text}</span>
    </>
  );

  if (href) {
    return (
      <Link href={href} className={finalClass}>
        {buttonContent}
      </Link>
    );
  }

  return (
    <button onClick={onClick} disabled={isDisabled} className={finalClass}>
      {buttonContent}
    </button>
  );
}
