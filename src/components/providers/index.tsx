import { QueryProvider } from "./query-provider";
import StoreProvider from "./store-provider";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <QueryProvider>
      <StoreProvider>{children}</StoreProvider>
    </QueryProvider>
  );
}
