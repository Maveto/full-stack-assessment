"use client";

import { ThemeProvider } from "@/context/ThemeProvider";
import { store } from "@/store";
import { ReactNode } from "react";
import { Provider } from "react-redux";

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <Provider store={store}>
      <ThemeProvider>{children}</ThemeProvider>
    </Provider>
  );
}
