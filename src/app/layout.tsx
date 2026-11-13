import type { Metadata } from "next";

import { DebugBar } from "@/components/debug/DebugBar";
import { Menu } from "@/components/menu/Menu";
import { display } from "@/config/display";
import { site } from "@/config/site";

import { plusJakartaSans } from "./fonts";
import { Providers } from "./providers";
import "./globals.css";

export const metadata: Metadata = {
  title: { default: site.domain, template: `%s · ${site.domain}` },
  description: `${site.name} — ${site.role}`,
  icons: { icon: "/ProfilePicture.webp" },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`light ${plusJakartaSans.variable}`}
      data-theme="light"
      data-font-set={display.fontSet}
      data-grid={display.grid}
    >
      <body className="bg-background font-sans text-foreground antialiased">
        <Providers>
          <div className="min-h-dvh lg:flex">
            <Menu />
            <main id="content" className="min-w-0 flex-1">
              {children}
            </main>
          </div>
          {process.env.NODE_ENV === "development" && <DebugBar />}
        </Providers>
      </body>
    </html>
  );
}
