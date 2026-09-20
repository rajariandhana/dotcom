import { useEffect } from "react";

// Sends direct arrivals — bookmarks, older links, search results — out to a
// project's own site.
//
// This replaces the current tab rather than opening a new one: window.open()
// outside a user gesture counts as a popup and gets blocked, so the new-tab
// behaviour lives on the links that point here instead. `replace` keeps the
// redirecting page out of history, so Back doesn't bounce straight into it again.
export default function ExternalRedirect({ to }) {
  useEffect(() => {
    window.location.replace(to);
  }, [to]);

  // Shown only if the redirect is slow or blocked.
  return (
    <div className="flex flex-col items-center w-full gap-2 py-16 text-sm text-gray-500">
      <span>Redirecting…</span>
      <a href={to} rel="noopener noreferrer" className="underline">
        Continue to {to.replace(/^https?:\/\//, "")}
      </a>
    </div>
  );
}
