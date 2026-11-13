import { mobileHomeLink, navGroups } from "@/config/navigation";

import { MenuLink } from "./MenuLink";

const styles = {
  // 16px text with 8px padding → 32px rows; 32px between groups (48px text-to-text, as in Figma).
  sidebar: { groups: "gap-8", link: "py-2 leading-none" },
  // 20px text in 44px rows for touch.
  drawer: { groups: "gap-7", link: "py-2 text-xl leading-7" },
} as const;

export function NavGroups({
  variant,
  onNavigate,
}: {
  variant: keyof typeof styles;
  onNavigate?: () => void;
}) {
  const s = styles[variant];
  return (
    <div className={`flex flex-col ${s.groups}`}>
      {navGroups.map((group, index) => (
        <ul key={group.id} className="flex flex-col">
          {(variant === "drawer" && index === 0
            ? [mobileHomeLink, ...group.items]
            : group.items
          ).map((item) => (
            <li key={item.href}>
              <MenuLink {...item} className={s.link} onNavigate={onNavigate} />
            </li>
          ))}
        </ul>
      ))}
    </div>
  );
}
