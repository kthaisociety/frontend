"use client";
import { AppStore, makeStore } from "@/lib/model/store";
import { AuthInitializer } from "./auth-initializer";
import { QueryProvider } from "./query-provider";
import { Provider } from "react-redux";
import { useRef } from "react";

export function Providers({ children }: { children: React.ReactNode }) {
  const storeRef = useRef<AppStore>(null);
  if (!storeRef.current) {
    storeRef.current = makeStore();
  }

  return (
    <Provider store={storeRef.current}>
      <QueryProvider>
        <AuthInitializer>{children}</AuthInitializer>
      </QueryProvider>
    </Provider>
  );
}
