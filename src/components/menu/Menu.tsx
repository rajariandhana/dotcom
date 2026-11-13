import { MobileMenu } from "./MobileMenu";
import { Sidebar } from "./Sidebar";

/** Sidebar on desktop, collapsed bar + top drawer on mobile. Both read src/config/navigation.ts. */
export function Menu() {
  return (
    <>
      <a
        href="#content"
        className="sr-only z-50 rounded-lg bg-surface px-4 py-2 font-semibold text-accent focus:not-sr-only focus:fixed focus:start-4 focus:top-4"
      >
        Skip to content
      </a>
      <Sidebar />
      <MobileMenu />
    </>
  );
}
