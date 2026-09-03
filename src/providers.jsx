import { HeroUIProvider } from "@heroui/react";
import { ToastProvider } from "@heroui/toast";
import { QueryClientProvider } from "@tanstack/react-query";
import queryClient from "./libs/tanstack/tanstack";
import ScrollToTop from "./components/ScrollToTop";
export function Providers({ children }) {
  return (
    <HeroUIProvider>
      <ToastProvider />
      <QueryClientProvider client={queryClient}>
        <ScrollToTop />
        {children}
      </QueryClientProvider>
    </HeroUIProvider>
  );
}
