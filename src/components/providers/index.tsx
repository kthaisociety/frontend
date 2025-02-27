import { QueryProvider } from "./query-provider";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <QueryProvider>
      <StoreProvider>
        {children}
        </StoreProvider>
    </QueryProvider>
  );
}
