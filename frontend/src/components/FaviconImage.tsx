"use client";

import { useTheme } from "next-themes";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function ({ size = 32 }) {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  const src =
    resolvedTheme === "dark" ? "/favicon-dark.ico" : "/favicon-light.ico";

  return <Image src={src} alt="Logo" width={size} height={size} priority />;
}
