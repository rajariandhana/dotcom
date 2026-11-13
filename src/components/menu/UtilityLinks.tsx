import { socialLinks, utilityLinks } from "@/config/navigation";

import { MenuLink } from "./MenuLink";

/** Bottom-pinned group: policy links and social icons. */
export function UtilityLinks({
  variant,
  onNavigate,
}: {
  variant: "sidebar" | "drawer";
  onNavigate?: () => void;
}) {
  const link = variant === "sidebar" ? "py-2 leading-none" : "py-2 text-sm leading-5";

  return (
    <div className="flex flex-col gap-3">
      <ul className="flex flex-col">
        {utilityLinks.map((item) => (
          <li key={item.href}>
            <MenuLink {...item} className={link} onNavigate={onNavigate} />
          </li>
        ))}
      </ul>
      <ul className="-ms-2 flex items-center" aria-label="Social links">
        {socialLinks.map(({ label, href, icon: Icon }) => {
          const external = href.startsWith("http");
          return (
            <li key={href}>
              <a
                href={href}
                aria-label={label}
                title={label}
                {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                className="grid size-10 place-items-center rounded-lg transition-transform duration-150 hover:-rotate-12 hover:scale-110 focus-visible:outline-2 focus-visible:outline-focus"
              >
                <Icon className="size-5" aria-hidden />
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
