import type { Metadata } from "next";

import { DebugBar } from "@/components/debug/DebugBar";
import { Menu } from "@/components/menu/Menu";
import { ThemeScript } from "@/components/ThemeScript";
import { display } from "@/config/display";
import { site } from "@/config/site";

import { plusJakartaSans } from "./fonts";
import { Providers } from "./providers";
import "./globals.css";

export const metadata: Metadata = {
  title: { default: site.domain, template: `%s · ${site.domain}` },
  description: `${site.name} — ${site.role}`,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    // Prerendered light; themeInitScript switches the theme before paint, so <html>'s
    // class and data-theme may differ from the server HTML on purpose.
    <html
      lang="en"
      className={`light ${plusJakartaSans.variable}`}
      data-theme="light"
      suppressHydrationWarning
      data-font-set={display.fontSet}
      data-grid={display.grid}
      data-tagline={display.tagline}
    >
      <head>
        <ThemeScript />
      </head>
      <body className="bg-background font-sans text-foreground antialiased">
        <Providers>
          <div className="min-h-dvh lg:flex">
            <Menu />
            {/* Content area: one grid tile (90px) of padding on larger screens so pages
                start on a grid line; children stack in a column, capped at 9 tiles wide. */}
            <main id="content" className="min-w-0 flex-1 overflow-x-clip px-6 py-12 sm:p-tile">
              <div className="flex max-w-content flex-col gap-8">{children}</div>
            </main>
          </div>
          {process.env.NODE_ENV === "development" && <DebugBar />}
        </Providers>
      </body>
    </html>
  );
}
