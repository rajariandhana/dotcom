import type { Metadata } from "next";

/** The playground is reachable by URL but isn't meant to be found, so keep it out of search results. */
export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default function TestLayout({ children }: LayoutProps<"/test">) {
  return children;
}
