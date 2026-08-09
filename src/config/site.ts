/**
 * Central template configuration.
 *
 * Everything a developer normally needs to change when adapting this template
 * lives here: brand, navigation, calls-to-action, contact details and SEO
 * defaults. Colours live in `src/app/globals.css` as design tokens.
 */

export interface NavLink {
  label: string;
  href: string;
}

export interface SocialLink {
  label: string;
  href: string;
  icon: string;
}

export interface FooterColumn {
  title: string;
  links: NavLink[];
}

export const siteConfig = {
  /** Brand name, used in metadata, alt text and the footer. */
  name: "Aston",
  /** One-line positioning statement shown in the footer. */
  tagline: "Aston is a education & courses learning platform.",
  /**
   * Canonical production URL — feeds canonicals, the sitemap and OG tags.
   * Vercel sets VERCEL_PROJECT_PRODUCTION_URL automatically; set
   * NEXT_PUBLIC_SITE_URL to override it with your own domain.
   */
  url:
    process.env.NEXT_PUBLIC_SITE_URL ||
    (process.env.NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL}`
      : "http://localhost:3000"),
  /** Default social-share image (served from /public). */
  ogImage: "/images/illustrations/hero-dashboard.png",

  logo: {
    /** Wordmark used on the dark nav pill. */
    light: "/images/logos/aston-wordmark-light.svg",
    /** Wordmark used in the footer. */
    footer: "/images/logos/aston-wordmark-footer.svg",
    /** Standalone glyph. */
    mark: "/images/logos/aston-mark.svg",
  },

  /** Primary navigation shown inside the header pill. */
  nav: [
    { label: "Home", href: "/" },
    { label: "Pricing", href: "/pricing" },
  ] satisfies NavLink[],

  /** Contents of the header's "All Pages" dropdown. */
  navDropdown: {
    label: "All Pages",
    links: [
      { label: "Home", href: "/" },
      { label: "Pricing", href: "/pricing" },
      { label: "Contact", href: "/contact" },
      { label: "Waitlist", href: "/waitlist" },
      { label: "Changelog", href: "/changelog" },
      { label: "Privacy Policy", href: "/privacy-policy" },
      { label: "404", href: "/404" },
    ] satisfies NavLink[],
  },

  /** Header call-to-action. */
  cta: {
    label: "Get Template",
    href: "https://framerplate.lemonsqueezy.com/buy/f098c3cc-6ff4-4f8a-9b1d-c83832916bd6",
  },

  /** Hero call-to-action. */
  heroCta: {
    label: "Get this Template",
    href: "https://framerplate.lemonsqueezy.com/buy/f098c3cc-6ff4-4f8a-9b1d-c83832916bd6",
  },

  contact: {
    supportEmail: "support@aston.com",
    generalEmail: "hello@aston.com",
    salesEmail: "sales@aston.com",
    bookACallUrl: "https://cal.com/",
  },

  social: [
    { label: "X", href: "https://x.com/", icon: "/images/icons/social-x.svg" },
    {
      label: "Meta",
      href: "https://facebook.com/",
      icon: "/images/icons/social-meta.svg",
    },
    {
      label: "Instagram",
      href: "https://instagram.com/",
      icon: "/images/icons/social-instagram.svg",
    },
    {
      label: "LinkedIn",
      href: "https://linkedin.com/",
      icon: "/images/icons/social-linkedin.svg",
    },
  ] satisfies SocialLink[],

  /** Footer link columns. Blog routes are intentionally absent. */
  footer: {
    copyright: "The future of education @2024 aston",
    disclaimer:
      "The information provided on this website is for general educational purposes only. Aston does not guarantee the accuracy, completeness, or reliability of any content. Course availability and features may change without notice. User experiences may vary. Always consult a professional for advice specific to your needs.",
    columns: [
      {
        title: "Sections",
        links: [
          { label: "Benefits", href: "/#benefits" },
          { label: "Features", href: "/#features" },
          { label: "What’s Inside", href: "/#what-in" },
          { label: "Pricing", href: "/#pricing" },
          { label: "Numbers", href: "/#numbers" },
          { label: "Comparison", href: "/#comparison" },
          { label: "Get Started", href: "/#get-started" },
        ],
      },
      {
        title: "Company",
        links: [
          { label: "Mobile App", href: "/#mobile-app" },
          { label: "Download App", href: "/#download-app" },
          { label: "Highlight", href: "/#highlight" },
          { label: "About Us", href: "/#about" },
          { label: "FAQ’s", href: "/#faq" },
          { label: "Testimonials", href: "/#testimonial" },
        ],
      },
      {
        title: "Pages",
        links: [
          { label: "Home", href: "/" },
          { label: "Contact", href: "/contact" },
          { label: "Waitlist", href: "/waitlist" },
          { label: "Pricing", href: "/pricing" },
          { label: "Privacy policy", href: "/privacy-policy" },
          { label: "Changelog", href: "/changelog" },
        ],
      },
    ] satisfies FooterColumn[],
  },

  /** Attribution required by the original template licence. */
  credit: {
    label: "Template by Praha",
    href: "https://www.framer.com/@praha/",
    avatar: "/images/illustrations/praha-avatar.png",
    figma: {
      label: "Get Figma File",
      href: "https://www.figma.com/",
      badge: "/images/illustrations/figma-badge.png",
    },
  },

  seo: {
    titleTemplate: "%s",
    defaultTitle: "Aston",
    defaultDescription:
      "Aston is a sleek and modern online course selling website template designed to elevate your e-learning platform. With its intuitive user interface and responsive design, Aston offers an effortless browsing experience across all devices.",
    twitterHandle: "@aston",
  },
} as const;

export type SiteConfig = typeof siteConfig;
