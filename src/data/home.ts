/**
 * Home-page content. Copy is reproduced verbatim from the original project,
 * including its original punctuation and typos, so the coded template matches
 * the published site exactly. Edit freely when adapting the template.
 */

export interface StatItem {
  value: string;
  suffix: string;
  label: string;
  /**
   * Present on the two groups the source animates. The figure counts from
   * `from` to `to` (one step every 20ms) the first time it scrolls into view.
   */
  from?: number;
  to?: number;
}

export interface FeatureItem {
  icon: string;
  title: string;
  description: string;
}

export interface TickerTag {
  icon: string;
  label: string;
}

export interface BenefitCard {
  image: string;
  background: string;
  title: string;
  description?: string;
  /**
   * Aspect ratio of the artwork plate. In the source these ratios are what
   * give each card its height (capped at 224px), so they are reproduced here.
   */
  aspect: number;
}

export interface PricingPlan {
  name: string;
  audience: string;
  bestFor: string;
  price: string;
  billingNote: string;
  ctaLabel: string;
  ctaHref: string;
  includedLabel: string;
  features: string[];
  /** How many leading features are included; the rest render greyed out. */
  activeCount: number;
  /** The Enterprise plan renders as a full-width panel below the two cards. */
  layout: "card" | "panel";
}

export interface ComparisonRow {
  others: string;
  aston: string;
}

export interface MiniTestimonial {
  name: string;
  quote: string;
  avatar: string;
}

export interface Testimonial {
  quote: string;
  name: string;
  role: string;
  avatar: string;
}

export interface TeamMember {
  name: string;
  role: string;
  photo: string;
  social: string;
}

export interface ProcessStep {
  step: string;
  title: string;
  description: string;
  screen: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface AudienceItem {
  title: string;
  description: string;
}

/* -------------------------------------------------------------------------- */
/* Hero                                                                        */
/* -------------------------------------------------------------------------- */

export const hero = {
  badge: {
    text: "3,500+ Pro Users",
    avatars: [
      "/images/avatars/hero-1.png",
      "/images/avatars/hero-2.png",
      "/images/avatars/hero-3.png",
    ],
  },
  title: "Simplify, Scale, Succeed with Our SaaS Solution",
  description:
    "Empower Your Learning Journey with Aston the Ultimate Online Course Platform.",
  note: "Available Figma File with Editable Assets",
  visual: "/images/illustrations/hero-dashboard.png",
  trustedText:
    "Trusted by over 14,540 businesses to enhance learning and drive educational growth.",
  logos: [
    "/images/logos/trusted/logo-1.svg",
    "/images/logos/trusted/logo-2.svg",
    "/images/logos/trusted/logo-3.svg",
    "/images/logos/trusted/logo-4.svg",
    "/images/logos/trusted/logo-5.svg",
    "/images/logos/trusted/logo-6.svg",
  ],
  ratings: [
    {
      icon: "/images/icons/g2.svg",
      score: "4.6",
      count: "127",
      label: "Rating by G2 users",
      href: "https://www.g2.com/",
    },
    {
      icon: "/images/icons/google.svg",
      score: "4.8",
      count: "932",
      label: "on Google Review",
      href: "https://www.google.com/",
    },
  ],
  /**
   * Floating widget artwork. Offsets, sizes and rotations are the exact values
   * from the Framer project's absolute layout.
   */
  widgets: {
    left: [
      { src: "/images/illustrations/hero-widget-l3.svg", w: 265, h: 139, top: 9, left: -87, rotate: 12, radius: 16 },
      { src: "/images/illustrations/hero-widget-l2.svg", w: 192, h: 98, top: 230, left: -19, rotate: -3, radius: 16 },
      { src: "/images/illustrations/hero-widget-l1.svg", w: 265, h: 175, top: 393, left: -67, rotate: 14, radius: 16 },
    ],
    right: [
      { src: "/images/illustrations/hero-widget-r3.svg", w: 262, h: 173, top: -10, left: 3, rotate: -16, radius: 16 },
      { src: "/images/illustrations/hero-widget-r2.svg", w: 211, h: 167, top: 242, left: 53, rotate: 11, radius: 5 },
      { src: "/images/illustrations/hero-widget-r1.svg", w: 173, h: 81, top: 468, left: 40, rotate: -7, radius: 9 },
    ],
  },
} as const;

/* -------------------------------------------------------------------------- */
/* Motto + stats                                                               */
/* -------------------------------------------------------------------------- */

export const motto = {
  title: "Empowering Growth and Innovation with Cutting-Edge Technology Solutions",
  stats: [
    { value: "2,548", suffix: "+", label: "Pro Users", from: 2548, to: 2648 },
    { value: "121", suffix: "+", label: "Professional Courses", from: 121, to: 221 },
    { value: "197", suffix: "+", label: "Team Members", from: 197, to: 297 },
  ] satisfies StatItem[],
};

/* -------------------------------------------------------------------------- */
/* What's In (community benefits)                                              */
/* -------------------------------------------------------------------------- */

export const whatsIn = {
  title: "What’s in our Community",
  description:
    "Comprehensive online courses designed to enhance skills and knowledge for all learners.",
  cards: [
    {
      image: "/images/illustrations/whats-in-card-1.svg",
      background: "/images/illustrations/whats-in-card-1-bg.svg",
      title: "Anytime Access to Courses",
      description:
        "Access our courses anytime, anywhere, on any device, allowing you to learn at your own pace and convenience.",
      aspect: 3.05357,
    },
    {
      image: "/images/illustrations/whats-in-card-2.png",
      background: "/images/illustrations/whats-in-card-2-bg.svg",
      title: "Certificates for All Courses",
      description: "Earn certificates upon completion to validate your skills.",
      aspect: 2.00712,
    },
    {
      image: "/images/illustrations/whats-in-card-3.png",
      background: "/images/illustrations/whats-in-card-3-bg.svg",
      title: "Job-Finding Community",
      description: "Connect with our community to discover job opportunities.",
      aspect: 1.49107,
    },
    {
      image: "/images/illustrations/whats-in-card-4.png",
      background: "/images/illustrations/whats-in-card-4-bg.svg",
      title: "Expert Teacher Network",
      description:
        "Access a supportive community of experienced teachers for guidance.",
      aspect: 1.75446,
    },
    {
      image: "/images/illustrations/whats-in-card-5.png",
      background: "/images/illustrations/whats-in-card-5-bg.svg",
      title: "Skill-Enhancing Online Events",
      description:
        "Participate in online events designed to refine and advance your skills.",
      aspect: 1.75446,
    },
  ] satisfies BenefitCard[],
  orbitLogos: [
    "/images/illustrations/orbit/orbit-1.png",
    "/images/illustrations/orbit/orbit-2.png",
    "/images/illustrations/orbit/orbit-3.png",
    "/images/illustrations/orbit/orbit-4.png",
    "/images/illustrations/orbit/orbit-5.png",
    "/images/illustrations/orbit/orbit-6.png",
  ],
};

/* -------------------------------------------------------------------------- */
/* Platform highlight ticker                                                   */
/* -------------------------------------------------------------------------- */

export const platformHighlight = {
  badge: { icon: "/images/icons/badge/whats-inside.svg", label: "What’s Inside" },
  title: "Platform Highlights",
  tags: [
    { icon: "/images/icons/ticker/web-design.svg", label: "Web Design" },
    { icon: "/images/icons/ticker/data-science.svg", label: "Data Science" },
    { icon: "/images/icons/ticker/digital-marketing.svg", label: "Digital Marketing" },
    { icon: "/images/icons/ticker/software-development.svg", label: "Software Development" },
    { icon: "/images/icons/ticker/machine-learning.svg", label: "Machine Learning" },
    { icon: "/images/icons/ticker/graphic-design.svg", label: "Graphic Design" },
    { icon: "/images/icons/ticker/ai-tools.svg", label: "AI Tools" },
    { icon: "/images/icons/ticker/project-management.svg", label: "Project Management" },
    { icon: "/images/icons/ticker/cybersecurity.svg", label: "Cybersecurity" },
    { icon: "/images/icons/ticker/cloud-computing.svg", label: "Cloud Computing" },
    { icon: "/images/icons/ticker/ux-ui-design.svg", label: "UX/UI Design" },
    { icon: "/images/icons/ticker/business-analytics.svg", label: "Business Analytics" },
    { icon: "/images/icons/ticker/programming-languages.svg", label: "Programming Languages" },
    { icon: "/images/icons/ticker/seo-techniques.svg", label: "SEO Techniques" },
    { icon: "/images/icons/ticker/financial-modeling.svg", label: "Financial Modeling" },
    { icon: "/images/icons/ticker/mobile-development.svg", label: "Mobile Development" },
    { icon: "/images/icons/ticker/content-creation.svg", label: "Content Creation" },
    { icon: "/images/icons/ticker/e-commerce.svg", label: "E-commerce" },
  ] satisfies TickerTag[],
};

/* -------------------------------------------------------------------------- */
/* Core features                                                               */
/* -------------------------------------------------------------------------- */

export const coreFeatures = {
  badge: { icon: "/images/icons/badge/features.svg", label: "Features" },
  title: "Explore Our Core Features",
  description:
    "Experience a suite of powerful tools designed to streamline your workflow and elevate your business operations.",
  items: [
    {
      icon: "/images/icons/feature/smart-prioritization.svg",
      title: "Smart Prioritization",
      description: "Helpin  focusing on what truly matters first.",
    },
    {
      icon: "/images/icons/feature/offline-access.svg",
      title: "Offline Access",
      description: "Manage tasks even without internet.",
    },
    {
      icon: "/images/icons/feature/real-time-sync.svg",
      title: "Real-Time Sync",
      description: "Keep all your devices updated instantly.",
    },
    {
      icon: "/images/icons/feature/automated-workflows.svg",
      title: "Automated Workflows",
      description: "Simplify processes with automation.",
    },
    {
      icon: "/images/icons/feature/user-management.svg",
      title: "User Management",
      description: "Control access with multi-user permissions.",
    },
    {
      icon: "/images/icons/feature/real-time-notifications.svg",
      title: "Real-Time Notifications",
      description: "Stay informed with real-time alerts messages.",
    },
  ] satisfies FeatureItem[],
};

/* -------------------------------------------------------------------------- */
/* Numbers                                                                     */
/* -------------------------------------------------------------------------- */

export const numbers = {
  badge: { icon: "/images/icons/badge/numbers.svg", label: "Numbers" },
  title: "Impressive Figures and Facts",
  description:
    "Explore our key statistics and milestones that showcase our growth, impact, and success in transforming the learning experience for users.",
  stats: [
    { value: "16k", suffix: "+", label: "Total Users" },
    { value: "1800", suffix: "+", label: "Courses" },
    { value: "16", suffix: "+", label: "Years Experience" },
    { value: "381", suffix: "+", label: "Team Members" },
  ] satisfies StatItem[],
};

/* -------------------------------------------------------------------------- */
/* Powerful features (tabs + cards)                                            */
/* -------------------------------------------------------------------------- */

export const powerfulFeatures = {
  badge: { icon: "/images/icons/badge/benefits.svg", label: "Features" },
  title: "Explore the Powerful Features of Aston",
  highlights: [
    "Interactive Course Modules",
    "Real-Time Progress Tracking",
    "Customizable Learning Paths",
    "Live Instructor Sessions",
  ],
  items: [
    {
      icon: "/images/icons/feature/resource-library.svg",
      title: "Resource Library",
      description: "Access a vast collection of supplementary materials.",
    },
    {
      icon: "/images/icons/feature/collaborative-projects.svg",
      title: "Collaborative Projects",
      description: "Work on group assignments with other learners.",
    },
    {
      icon: "/images/icons/feature/live-qa.svg",
      title: "Live Q&A Sessions",
      description: "Ask questions in real-time during live classes.",
    },
    {
      icon: "/images/icons/feature/smart-analytics.svg",
      title: "Smart Analytics",
      description: "Track your progress with detailed analytics.",
    },
  ] satisfies FeatureItem[],
};

/* -------------------------------------------------------------------------- */
/* Mobile app                                                                  */
/* -------------------------------------------------------------------------- */

export const mobileApp = {
  badge: { icon: "/images/icons/badge/mobile-app.svg", label: "Mobile App" },
  title: "Explore Our Mobile App Features",
  cardTags: ["Smart Prioritization", "Real-Time Sync"],
  features: [
    { icon: "/images/icons/list/mobile-1.svg", label: "Offline Access" },
    { icon: "/images/icons/list/mobile-2.svg", label: "Push Notifications" },
    { icon: "/images/icons/list/mobile-3.svg", label: "Interactive Quizzes" },
    { icon: "/images/icons/list/mobile-4.svg", label: "Progress Tracking" },
    { icon: "/images/icons/list/mobile-5.svg", label: "Course Downloads" },
    { icon: "/images/icons/list/mobile-6.svg", label: "In-App Messaging" },
  ],
  video: {
    title: "Learn how to use the app",
    subtitle: "Watch the demo",
    thumbnail: "/images/illustrations/mobile-app-video-thumb.png",
  },
};

/* -------------------------------------------------------------------------- */
/* Download app                                                                */
/* -------------------------------------------------------------------------- */

export const downloadApp = {
  badge: { icon: "/images/icons/badge/download-app.svg", label: "Download App" },
  title: "Get the App for Seamless Learning",
  stats: [
    { icon: "/images/icons/list/download-1.svg", label: "4.4+ Reviews" },
    { icon: "/images/icons/list/download-2.svg", label: "100k+ Downloads" },
  ],
  buttons: [
    {
      icon: "/images/icons/google-play.svg",
      small: "Get It On",
      large: "Google Play",
      href: "https://play.google.com/",
    },
    {
      icon: "/images/icons/app-store.svg",
      small: "Get It On",
      large: "App Store",
      href: "https://www.apple.com/app-store/",
    },
  ],
  screens: [
    "/images/illustrations/download-screen-1.png",
    "/images/illustrations/download-screen-2.png",
    "/images/illustrations/download-screen-3.png",
    "/images/illustrations/download-screen-4.png",
  ],
};

/* -------------------------------------------------------------------------- */
/* Pricing                                                                     */
/* -------------------------------------------------------------------------- */

const BASE_FEATURES = [
  "Access to 25,000+ top courses",
  "Certification prep",
  "Goal-focused recommendations",
  "AI-powered coding exercises",
  "Advanced analytics and insights",
  "Dedicated customer success team",
  "Customizable content",
];

export const pricing = {
  badge: { icon: "/images/icons/badge/pricing.svg", label: "Pricing" },
  title: "Our Pricing Plans",
  description:
    "Explore our flexible pricing plans designed to fit your budget and learning needs.",
  plans: [
    {
      name: "Personal Plan",
      audience: "Individual",
      bestFor: "Best for Individual",
      price: "$10/m",
      billingNote: "Billed monthly or annually. Cancel anytime.",
      ctaLabel: "Start Subscription",
      ctaHref: "/waitlist",
      includedLabel: "What’s Included",
      features: BASE_FEATURES,
      activeCount: 4,
      layout: "card",
    },
    {
      name: "Team Plan",
      audience: "2 to 20 users",
      bestFor: "Best for your Team",
      price: "$30/m",
      billingNote: "Billed monthly or annually. Cancel anytime.",
      ctaLabel: "Start Subscription",
      ctaHref: "/waitlist",
      includedLabel: "What’s Included",
      features: BASE_FEATURES,
      activeCount: 7,
      layout: "card",
    },
    {
      name: "Enterprise Plan",
      audience: "20 users +",
      bestFor: "Best for your whole organization",
      price: "$80/m",
      billingNote: "Billed monthly or annually. Cancel anytime.",
      ctaLabel: "Start Subscription",
      ctaHref: "/waitlist",
      includedLabel: "What’s Included",
      features: [
        ...BASE_FEATURES,
        "Hands-on tech training.",
        "Strategic implementation services",
        "International course collection",
      ],
      activeCount: 10,
      layout: "panel",
    },
  ] satisfies PricingPlan[],
};

/* -------------------------------------------------------------------------- */
/* Comparison                                                                  */
/* -------------------------------------------------------------------------- */

export const comparison = {
  badge: { icon: "/images/icons/badge/comparison.svg", label: "Comparison" },
  title: "Choosing Aston Over Others",
  othersLabel: "Other Platforms",
  rows: [
    { others: "Limited course selection", aston: "Extensive range of diverse courses" },
    { others: "Rigid and scheduled course timings", aston: "Self-paced and flexible schedules" },
    { others: "Certification not always provided", aston: "Earn certificates for all courses" },
    { others: "Limited or no mobile app support", aston: "Fully functional mobile app" },
    { others: "Generic, one-size-fits-all approach", aston: "Customized learning paths" },
    { others: "Delayed or no feedback", aston: "Immediate feedback on assignments" },
    { others: "Basic or no progress tracking", aston: "Detailed progress analytics" },
  ] satisfies ComparisonRow[],
};

/* -------------------------------------------------------------------------- */
/* About us                                                                    */
/* -------------------------------------------------------------------------- */

export const about = {
  badge: { icon: "/images/icons/badge/about-us.svg", label: "About Us" },
  title: "Learn More About Aston and Our Mission",
  description:
    "At Aston, we’re dedicated to revolutionizing education with innovative online courses tailored to your needs. Our mission is to empower learners worldwide through accessible, engaging, and high-quality content, supported by a passionate team of experts and professionals.",
  primaryCta: { label: "Get Started Now", href: "/waitlist" },
  secondaryCta: { label: "Contact Us", href: "/contact" },
  stats: [
    { value: "2,548", suffix: "+", label: "Successful Users", from: 2548, to: 2648 },
    { value: "121", suffix: "+", label: "Professional Courses", from: 121, to: 221 },
    { value: "197", suffix: "+", label: "Team Members", from: 197, to: 297 },
  ] satisfies StatItem[],
  students: [
    "/images/illustrations/about-student-1.png",
    "/images/illustrations/about-student-2.png",
    "/images/illustrations/about-student-3.png",
  ],
  testimonials: [
    { name: "Emma Johnson", quote: "Aston’s courses transformed my career. Highly recommended!", avatar: "/images/avatars/about-1.png" },
    { name: "Mark Lee", quote: "The flexible learning options were perfect for my busy schedule.", avatar: "/images/avatars/about-2.png" },
    { name: "Sophia Adams", quote: "Exceptional content and support. I gained valuable skills quickly.", avatar: "/images/avatars/about-3.png" },
    { name: "Ryan Smith", quote: "Aston’s platform is user-friendly and full of great resources.", avatar: "/images/avatars/about-4.png" },
    { name: "Olivia Brown", quote: "Incredible courses that exceeded my expectations. Worth every penny!", avatar: "/images/avatars/about-5.png" },
    { name: "Liam Davis", quote: "The community support on Aston is fantastic. Very engaging.", avatar: "/images/avatars/about-6.png" },
  ] satisfies MiniTestimonial[],
};

/* -------------------------------------------------------------------------- */
/* Who can use                                                                 */
/* -------------------------------------------------------------------------- */

export const whoCanUse = {
  badge: { icon: "/images/icons/badge/who-can-use.svg", label: "Who Can Use" },
  title: "Ideal Users, Who Aston Empowers",
  items: [
    {
      title: "Students and Lifelong Learners",
      description:
        "Empowering individuals seeking knowledge and skills beyond the classroom for personal growth.",
    },
    { title: "Educators and Trainers", description: "" },
    { title: "Corporate Professionals and Teams", description: "" },
  ] satisfies AudienceItem[],
  panel: {
    image: "/images/illustrations/who-can-use-panel.png",
    avatar: "/images/avatars/who-can-use.png",
    kicker: "Made for professionals",
    title: "Ready to Get Started?",
    subtitle: "Connect with us now",
    ctaLabel: "Contact Us",
    ctaHref: "/contact",
  },
};

/* -------------------------------------------------------------------------- */
/* Team                                                                        */
/* -------------------------------------------------------------------------- */

export const team = {
  badge: { icon: "/images/icons/badge/our-team.svg", label: "Our Team" },
  title: "Our Team Members",
  members: [
    { name: "Michael Brown", role: "Founder & CEO", photo: "/images/avatars/team-michael-brown.png", social: "https://x.com/" },
    { name: "Sarah White", role: "UI UX Designer", photo: "/images/avatars/team-sarah-white.png", social: "https://x.com/" },
    { name: "David Brown", role: "Head of Marketing", photo: "/images/avatars/team-david-brown.png", social: "https://x.com/" },
    { name: "Emile Johnson", role: "Head of Operations", photo: "/images/avatars/team-emile-johnson.png", social: "https://x.com/" },
  ] satisfies TeamMember[],
};

/* -------------------------------------------------------------------------- */
/* Process                                                                     */
/* -------------------------------------------------------------------------- */

export const process = {
  badge: { icon: "/images/icons/badge/process.svg", label: "Process" },
  title: "Steps to Start",
  ctaLabel: "Get Started Now",
  ctaHref: "/waitlist",
  steps: [
    {
      step: "Step 01",
      title: "Create an Account",
      description: "Create an account to start exploring and enrolling in courses.",
      screen: "/images/illustrations/process-screen-1.png",
    },
    {
      step: "Step 02",
      title: "Complete your Course",
      description: "Complete your courses by engaging with all lessons and assignments.",
      screen: "/images/illustrations/process-screen-2.png",
    },
    {
      step: "Step 03",
      title: "Receive Certificates",
      description: "Earn certificates upon course completion to showcase your new skills.",
      screen: "/images/illustrations/process-screen-3.png",
    },
  ] satisfies ProcessStep[],
};

/* -------------------------------------------------------------------------- */
/* FAQ                                                                         */
/* -------------------------------------------------------------------------- */

export const faq = {
  badge: { icon: "/images/icons/badge/faq.svg", label: "FAQ’s" },
  title: "Frequently Asked Questions",
  items: [
    {
      question: "How secure is my data?",
      answer:
        "We implement top-tier encryption and security protocols to ensure your data remains safe and protected from unauthorized access.",
    },
    {
      question: "Can I customize the platform?",
      answer:
        "Yes, our platform is fully customizable, allowing you to tailor features and functionalities to suit your business needs. ",
    },
    {
      question: "Is there a free trial available?",
      answer:
        "Absolutely! We offer a free trial so you can explore our platform's features before committing to a subscription.",
    },
    {
      question: "How do I upgrade my plan?",
      answer:
        "Upgrading your plan is simple—just navigate to your account settings and select the plan that best fits your needs.",
    },
    {
      question: "Do you offer customer support?",
      answer:
        "Yes, our dedicated support team is available 24/7 to assist you with any questions or issues you may encounter.",
    },
    {
      question: "What integrations are available?",
      answer:
        "Our platform integrates seamlessly with popular tools like CRM systems, project management apps, and marketing automation software.",
    },
    {
      question: "How often are updates released?",
      answer:
        "We regularly release updates to ensure the platform is always running smoothly and includes the latest features.",
    },
  ] satisfies FaqItem[],
};

/* -------------------------------------------------------------------------- */
/* Final CTA                                                                   */
/* -------------------------------------------------------------------------- */

export const finalCta = {
  title: "Get Started with Aston",
  description:
    "Ready to advance your skills? Sign up now and start your learning journey with us!",
  points: ["Instant Access", "Exclusive Content", "Expert Support"],
  ctaLabel: "Get Started Now",
  ctaHref: "/waitlist",
};

/* -------------------------------------------------------------------------- */
/* Testimonials                                                                */
/* -------------------------------------------------------------------------- */

export const testimonials = {
  badge: { icon: "/images/icons/badge/testimonials.svg", label: "Testimonials" },
  title: "Hear from Our Users",
  description:
    "Read how our users have achieved success and improved their skills with Aston’s courses.",
  avatarStrip: [
    "/images/avatars/testimonial-strip-1.png",
    "/images/avatars/testimonial-strip-2.png",
    "/images/avatars/testimonial-strip-3.png",
    "/images/avatars/testimonial-strip-4.png",
    "/images/avatars/testimonial-strip-5.png",
    "/images/avatars/testimonial-strip-6.png",
    "/images/avatars/testimonial-strip-7.png",
    "/images/avatars/testimonial-strip-8.png",
  ],
  items: [
    { quote: "Aston's courses were a game-changer for my career. The detailed content and expert support made learning engaging and effective. I highly recommend it!", name: "Emily Johnson", role: "Programmer", avatar: "/images/avatars/testimonial-1.png" },
    { quote: "The interactive tutorials and real-time feedback provided by Aston helped me master complex topics quickly. The certificates have significantly boosted my professional credibility.", name: "Sarah Lee", role: "Data Analyst", avatar: "/images/avatars/testimonial-2.png" },
    { quote: "With Aston, I accessed top-notch courses and received personalized learning paths. The mobile app and offline capabilities were a huge plus for my busy lifestyle.", name: "Olivia Martinez", role: "Graphic Designer", avatar: "/images/avatars/testimonial-3.png" },
    { quote: "Aston’s courses are practical, engaging, and perfect for skill enhancement.", name: "Anna White", role: "Web Designer", avatar: "/images/avatars/testimonial-4.png" },
    { quote: "Aston’s flexible courses and engaging content helped me quickly develop new skills for my job.", name: "James Wilson", role: "Business Analyst", avatar: "/images/avatars/testimonial-5.png" },
    { quote: "I found Aston to be incredibly user-friendly with a wealth of resources. The flexible learning options allowed me to balance work and study effortlessly.", name: "Michael Roberts", role: "Digital Marketer", avatar: "/images/avatars/testimonial-6.png" },
    { quote: "Aston’s platform offers exceptional course variety and quality. The community support and expert guidance were invaluable in achieving my learning goals.", name: "David Turner", role: "Project Manager", avatar: "/images/avatars/testimonial-7.png" },
    { quote: "Quick and effective learning with Aston. The support is exceptional.", name: "Ethan Lee", role: "UX Designer", avatar: "/images/avatars/testimonial-8.png" },
    { quote: "Aston made learning easy with its interactive features and flexible schedule.", name: "Isabella Adams", role: "Data Scientist", avatar: "/images/avatars/testimonial-9.png" },
    { quote: "The interactive features and real-time support made learning with Aston both effective and enjoyable.", name: "Laura Smith", role: "Content Creator", avatar: "/images/avatars/testimonial-10.png" },
    { quote: "I appreciated the in-depth tutorials and practical exercises. Aston has been a valuable learning resource.", name: "Chris Brown", role: "Web Developer", avatar: "/images/avatars/testimonial-11.png" },
    { quote: "Aston’s platform is easy to navigate and the course materials are top-notch. Highly recommended!", name: "Mia Clark", role: "SEO Specialist", avatar: "/images/avatars/testimonial-12.png" },
    { quote: "The course variety and quality on Aston exceeded my expectations. Great for professional growth and skills development.", name: "Daniel Green", role: "Software Engineer", avatar: "/images/avatars/testimonial-13.png" },
  ] satisfies Testimonial[],
};
