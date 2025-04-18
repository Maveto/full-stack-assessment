"use client";

import { useEffect } from "react";
import { useTheme } from "next-themes";

const Favicon = () => {
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    const favicon = document.querySelector(
      "link[rel='icon']"
    ) as HTMLLinkElement;

    if (favicon) {
      favicon.href =
        resolvedTheme === "dark" ? "/favicon-dark.ico" : "favicon-light.ico";
    }
  }, [resolvedTheme]);

  return null;
};

export default Favicon;
