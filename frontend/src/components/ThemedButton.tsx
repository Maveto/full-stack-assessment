"use client";

import { IconType } from "react-icons";
import Link from "next/link";
import { MouseEventHandler } from "react";

type ButtonProps = {
  isPrimary?: boolean;
  isDisabled?: boolean;
  text: string;
  icon?: IconType;
  href?: string;
  onClick?: () => void;
  fullWidth?: boolean;
  px?: number;
  py?: number;
};

export default function ThemedButton({
  isPrimary = false,
  isDisabled = false,
  text,
  icon: Icon,
  href,
  onClick,
  fullWidth = false,
  px = 1,
  py = 2,
}: ButtonProps) {
  const baseClass = `flex items-center justify-center gap-2 py-${py} px-${px} rounded transition-colors disabled:bg-gray-400 disabled:text-gray-800 ${
    fullWidth ? "w-full" : ""
  }
  hover:bg-accent
  ${isDisabled ? "cursor-not-allowed" : ""}`;

  const variantClass = isPrimary
    ? "bg-primary text-background hover:text-foreground"
    : "bg-secondary text-foreground ";

  const finalClass = `${baseClass} ${variantClass}`;

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
