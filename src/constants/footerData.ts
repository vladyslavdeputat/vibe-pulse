import type { FooterSection, SocialLink } from "@/types";

export const footerSections: FooterSection[] = [
  {
    title: "Navigation",
    links: [
      { label: "Home", href: "/" },
      { label: "Dashboard", href: "/dashboard" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Documentation", href: "/docs" },
      { label: "Blog", href: "/blog" },
      { label: "Support", href: "/support" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Service", href: "/terms" },
      { label: "Cookie Policy", href: "/cookies" },
    ],
  },
];

export const socialLinks: SocialLink[] = [
  { label: "GitHub", href: "/github" },
  { label: "Twitter", href: "/twitter" },
  { label: "LinkedIn", href: "/linkedin" },
];

export const footerBrand = {
  name: "Vibe Pulse",
  description:
    "Building amazing experiences with Next.js, Supabase, and Clerk.",
};
