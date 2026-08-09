/**
 * Content for the non-home pages. Copy is reproduced verbatim from the
 * original project (including its original typos, e.g. "Join Watlist").
 */

export interface ChangelogEntry {
  date: string;
  title: string;
  /** Blocks render in order: paragraphs, an optional sub-heading, list or image. */
  blocks: Array<
    | { type: "paragraph"; text: string }
    | { type: "subheading"; text: string }
    | { type: "list"; items: string[] }
    | { type: "image"; src: string; alt: string; width: number; height: number }
  >;
}

export interface PricingTableRow {
  label: string;
  /** A string renders as text; true/false render a tick or a cross. */
  cells: [string | boolean, string | boolean, string | boolean];
}

export interface LegalSection {
  heading: string;
  body?: string;
  items?: string[];
}

/* -------------------------------------------------------------------------- */
/* Pricing page                                                                */
/* -------------------------------------------------------------------------- */

export const pricingPage = {
  tableTitle: "Compare plans and features",
  featuresColumnLabel: "Top Features",
  columns: [
    { name: "Personal Plan", audience: "Individual", price: "Starting at $10/m", accent: "muted" },
    { name: "Team Plan", audience: "2 to 20 users", price: "Starting at $30/m", accent: "accent" },
    { name: "Enterprise Plan", audience: "20 users +", price: "Starting at $80/m", accent: "muted" },
  ],
  ctaLabel: "Start Subscription",
  ctaHref: "/waitlist",
  rows: [
    { label: "Top-rated courses", cells: ["11,000+", "11,000+", "26,000+"] },
    { label: "Certification prep courses and practice tests", cells: [true, true, true] },
    { label: "AI-powered coding exercises", cells: [true, true, true] },
    { label: "Goal-aligned recommendations", cells: [true, true, true] },
    { label: "Instructor Q&A", cells: [true, true, true] },
    { label: "Mobile app access", cells: [false, true, true] },
    { label: "User adoption and engagement reports", cells: [false, true, true] },
    { label: "24/7 customer support", cells: [false, false, true] },
    { label: "Integration capabilities", cells: [false, false, true] },
    { label: "Skills assessments", cells: [false, false, true] },
  ] satisfies PricingTableRow[],
};

/* -------------------------------------------------------------------------- */
/* Contact page                                                                */
/* -------------------------------------------------------------------------- */

export const contactPage = {
  badge: { icon: "/images/icons/badge/contact.svg", label: "Contact Us" },
  title: "Contact Us Today",
  description:
    "For any inquiries or support, reach out to us via email, phone, or our contact form. We're here to help!",
  submitLabel: "Send Your Message",
  fields: [
    { name: "name", label: "Name", type: "text", placeholder: "Jane Smith", half: true },
    { name: "email", label: "Email", type: "email", placeholder: "jane@framer.com", half: true },
    { name: "subject", label: "Subject", type: "text", placeholder: "Enter your subject", half: false },
    { name: "message", label: "Message", type: "textarea", placeholder: "Enter your message", half: false },
  ],
  dividerLabel: "OR",
  channels: [
    {
      icon: "/images/icons/mail-outline.svg",
      label: "Email Us",
      value: "hello@aston.com",
      href: "mailto:hello@aston.com",
    },
    {
      icon: "/images/icons/mail-outline.svg",
      label: "Contact Sales",
      value: "sales@aston.com",
      href: "mailto:sales@aston.com",
    },
    {
      icon: "/images/icons/phone.svg",
      label: "Call Us on",
      value: "Book a Call",
      href: "https://calendly.com/",
    },
  ],
};

/* -------------------------------------------------------------------------- */
/* Waitlist page                                                               */
/* -------------------------------------------------------------------------- */

export const waitlistPage = {
  title: "Get on the Waitlist for New Features",
  description:
    "Join our waitlist to be among the first to access new features and updates. Stay informed and get early access!",
  placeholder: "Enter your email",
  submitLabel: "Join Watlist",
  note: "Join our list to gain early access! ",
  noteEmphasis: "Grandfathered discount.",
  videoLabel: "Learn more about the product",
  videoThumbnail: "/images/illustrations/waitlist-video.png",
};

/* -------------------------------------------------------------------------- */
/* Changelog page                                                              */
/* -------------------------------------------------------------------------- */

export const changelogPage = {
  badge: { icon: "/images/icons/badge/changelog.svg", label: "Changelog" },
  title: "Recent Updates",
  description:
    "Stay updated with the latest changes, improvements, and bug fixes in our version history. Explore our changelog here.",
  entries: [
    {
      date: "May 25, 2024",
      title: "Advanced Reporting Tools Added",
      blocks: [
        {
          type: "paragraph",
          text: "We've added new advanced reporting tools to help users generate detailed reports and insights. These tools offer customizable options for in-depth analysis.",
        },
        { type: "subheading", text: "Feature Highlights" },
        {
          type: "list",
          items: [
            "Customizable report templates for tailored data analysis.",
            "Advanced filtering options for detailed insights.",
            "Export reports in various formats, including PDF and Excel.",
            "Visual data representation with charts and graphs.",
            "Scheduled report generation for automated updates.",
            "Integration with existing data sources for seamless access.",
            "Enhanced user interface for easier report creation.",
            "Real-time data updates for accurate reporting.",
          ],
        },
      ],
    },
    {
      date: "June 15, 2024",
      title: "Resolved Login Issue",
      blocks: [
        {
          type: "paragraph",
          text: "We have fixed a bug that caused intermittent login issues for users. This update ensures a smoother and more reliable login process.",
        },
        { type: "subheading", text: "Bug Resolution Details" },
        {
          type: "paragraph",
          text: "The fix addresses multiple login errors and improves system stability, providing users with a consistent and hassle-free login experience.",
        },
      ],
    },
    {
      date: "June 15, 2024",
      title: "New Analytics Dashboard Features",
      blocks: [
        {
          // One paragraph with a blank line inside it, as in the source — the
          // spacing differs from two separate paragraphs.
          type: "paragraph",
          text: "We’ve introduced advanced analytics tools to help you track and analyze your progress more effectively. This new feature provides detailed insights and performance metrics.\n\nThe updated dashboard now includes customizable reports and data visualization options, enabling you to monitor your learning journey with greater precision and ease.",
        },
        { type: "subheading", text: "Key Updates" },
        {
          type: "list",
          items: [
            "Enhanced data visualization tools for clearer insights.",
            "Customizable report generation for personalized analysis.",
            "Real-time performance tracking and notifications.",
            "Advanced filtering options for detailed metrics.",
          ],
        },
      ],
    },
    {
      date: "July 10, 2024",
      title: "Product Launch",
      blocks: [
        {
          type: "paragraph",
          text: "Our platform now features a sleek, modern design with improved navigation for a more intuitive user experience.",
        },
        // Blank line before the screenshot, as in the source.
        { type: "paragraph", text: "" },
        {
          type: "image",
          src: "/images/illustrations/changelog-product-launch.png",
          alt: "The redesigned Aston dashboard",
          width: 747,
          height: 409,
        },
      ],
    },
  ] satisfies ChangelogEntry[],
};

/* -------------------------------------------------------------------------- */
/* Privacy policy page                                                         */
/* -------------------------------------------------------------------------- */

export const privacyPage = {
  badge: { icon: "/images/icons/badge/privacy.svg", label: "Privacy Policy" },
  title: "Our Privacy Policy",
  description:
    "Our Privacy Policy outlines how we collect, use, and protect your personal information. Your privacy and security are our priorities.",
  lastUpdated: "Last Updated on August, 24, 2024",
  sections: [
    {
      heading: "Information We Collect",
      body: "We may collect personal information from you when you visit our website, register for an account, or interact with our services. This information may include your name, email address, contact details, and any other information you voluntarily provide to us.",
    },
    {
      heading: "How We Use Your Information",
      body: "We may use the information we collect from you for various purposes, including:",
      items: [
        "Providing and improving our products and services",
        "Personalizing your experience on our website",
        "Communicating with you about your account and any updates or promotions",
        "Analyzing website traffic and user behavior to enhance our offerings",
      ],
    },
    {
      heading: "Data Security",
      body: "We take data security seriously and employ industry-standard measures to protect your personal information from unauthorized access, disclosure, alteration, or destruction. However, no method of transmission over the internet or electronic storage is 100% secure, and we cannot guarantee absolute security.",
    },
    {
      heading: "Third-Party Disclosure",
      body: "We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, except as required by law or as necessary to provide our services. We may share your information with trusted third-party service providers who assist us in operating our website, conducting our business, or servicing you, provided that they agree to keep your information confidential.",
    },
    {
      heading: "Cookies",
      body: "Our website may use cookies to enhance your browsing experience and collect information about how you interact with our site. You can adjust your browser settings to refuse cookies or alert you when cookies are being sent, but some features of the site may not function properly without cookies.",
    },
    {
      heading: "Changes to this Privacy Policy",
      body: "We reserve the right to update or change this Privacy Policy at any time. Any changes will be posted on this page, and the effective date will be updated accordingly. We encourage you to review this Privacy Policy periodically for any updates.",
    },
    {
      heading: "Contact Us",
      body: "If you have any questions or concerns about our Privacy Policy or the handling of your personal information, please contact us at hello@aston.com",
    },
  ] satisfies LegalSection[],
};

/* -------------------------------------------------------------------------- */
/* 404 page                                                                    */
/* -------------------------------------------------------------------------- */

export const notFoundPage = {
  code: "404",
  title: "Oops page not found",
  description:
    "We regret to inform you that the Pavyon you're searching for seems to be beyond our grasp. We apologize for any inconvenience this may cause.",
  ctaLabel: "Back to Home",
  ctaHref: "/",
};
