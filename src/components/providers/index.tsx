"use client";
import { makeStore } from "@/lib/model/store";
import type { AppStore } from "@/lib/model/store";
import { AuthInitializer } from "./auth-initializer";
import { QueryProvider } from "./query-provider";
import { Provider } from "react-redux";
import { useState } from "react";

export function Providers({ children }: { children: React.ReactNode }) {
  const [store] = useState<AppStore>(() => makeStore());

  return (
    <Provider store={store}>
      <QueryProvider>
        <AuthInitializer>{children}</AuthInitializer>
      </QueryProvider>
    </Provider>
  );
}
