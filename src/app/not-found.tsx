import Link from "next/link";

/**
 * Replaces Next's built-in 404, which switches to a black background in
 * dark-mode browsers. Every menu link lands here until its page exists.
 */
export default function NotFound() {
  return (
    <div className="grid min-h-[calc(100dvh-4rem)] place-items-center p-6 lg:min-h-dvh">
      <div className="flex flex-col items-center gap-3 text-center">
        <p className="text-5xl font-extrabold text-accent">404</p>
        <p className="font-medium">This page doesn’t exist yet.</p>
        <Link
          href="/"
          className="font-medium text-accent underline-offset-4 hover:font-bold hover:underline"
        >
          Back to home
        </Link>
      </div>
    </div>
  );
}
