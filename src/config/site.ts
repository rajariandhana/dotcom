/** Identity shown in the menu (sidebar on desktop, drawer on mobile). */
export const site = {
  domain: "ralfazza.com",
  name: "Ralfazza Rajariandhana",
  role: "Software Engineer",
  quote: "I like building cool stuff",
  email: "rajariandhana@gmail.com",
  /** Just the silhouette, on a transparent background (exported from Figma's
   * "profile-silhouette" frame); the circle behind it is drawn in the accent colour. */
  avatar: {
    src: "/profile-silhouette.webp",
    alt: "Silhouette of Ralfazza",
  },
} as const;
