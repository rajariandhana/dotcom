import type { Metadata } from "next";

import { StickyHeading } from "@/components/StickyHeading";
import { site } from "@/config/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `${site.domain} does not collect, store, sell, or share any personal user data.`,
};

const contact = [
  { label: "Website name", value: site.domain },
  { label: "Owner", value: site.name },
  { label: "Email", value: site.email, href: `mailto:${site.email}` },
] as const;

/**
 * Padding and max width come from the content area in app/layout.tsx; under
 * the sticky title the sections are spaced one grid tile (90px) apart on larger screens.
 * Cards are edged with the shared 1px block border (no shadow).
 */
export default function PrivacyPolicyPage() {
  return (
    <article className="flex flex-col gap-10">
      {/* Same sticky title as the other pages; it must stay a direct child of the article to keep sticking. */}
      <StickyHeading className="text-[2rem] leading-none font-bold text-accent">Privacy Policy</StickyHeading>

      <div className="flex flex-col gap-12 sm:gap-tile">
        <section aria-labelledby="policy-heading" className="flex flex-col gap-4">
          <h2 id="policy-heading" className="text-sm font-bold tracking-widest text-accent uppercase">
            Your data
          </h2>
          <p className="bg-surface p-6 leading-relaxed text-pretty text-foreground border border-block sm:p-8 text-justify">
            We do not collect, store, sell, or share any personal user data. Any information processed
            through the application is used only temporarily to provide the requested functionality
            and is not retained after the request is completed. We do not maintain user accounts,
            store uploaded content, or track personally identifiable information. Third-party
            services used by the application may process limited technical data as required for
            operation and security.
          </p>
        </section>

        <section aria-labelledby="contact-heading" className="flex flex-col gap-4">
          <h2 id="contact-heading" className="text-sm font-bold tracking-widest text-accent uppercase">
            Contact information
          </h2>
          <dl className="divide-y divide-block border border-block bg-surface text-foreground">
            {contact.map((row) => (
              <div
                key={row.label}
                className="flex flex-col gap-1 px-6 py-4 sm:grid sm:grid-cols-[calc(var(--spacing-tile)*2)_1fr] sm:items-baseline sm:gap-4 sm:px-8"
              >
                <dt className="text-sm text-muted">{row.label}</dt>
                <dd className="font-medium break-words">
                  {"href" in row ? (
                    <a
                      href={row.href}
                      className="text-accent underline-offset-4 hover:underline focus-visible:rounded-xs focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus"
                    >
                      {row.value}
                    </a>
                  ) : (
                    row.value
                  )}
                </dd>
              </div>
            ))}
          </dl>
        </section>
      </div>
    </article>
  );
}
