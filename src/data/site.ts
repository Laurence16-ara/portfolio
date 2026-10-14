/* ==================================================================
   SITE CONTENT — laurencemaligaya.com
   ------------------------------------------------------------------
   Almost every update to the portfolio happens in THIS file:
   - add or edit a project ............ PROJECTS
   - change your stats ................ STATS
   - add a review ..................... REVIEWS
   - change contact links ............. CONTACT
   The page layouts read from here, so you rarely need to touch them.
   ================================================================== */

/* ---------- Types (you don't need to edit these) ---------- */

export interface Spec {
  label: string;
  value: string;
  /** show 5 stars before the value */
  stars?: boolean;
  href?: string;
}

export interface Shot {
  src: string;
  caption: string;
  /** text shown in the browser-frame bar, e.g. a URL */
  frame?: string;
  /** a full-page screenshot: shown in a frame you can scroll inside */
  scroll?: boolean;
}

export interface WorkflowStep {
  kind: "trigger" | "action" | "wait" | "check" | "end";
  label: string;
  /** small second line, e.g. "Yes → stop. No → keep going." */
  detail?: string;
  /** numbered marker that matches a note below the workflow */
  note?: number;
  /** for checks with several paths */
  branches?: { when: string; then: string }[];
}

export interface Workflow {
  title: string;
  intro: string;
  steps: WorkflowStep[];
  notes?: { title: string; text: string }[];
  /** special hand-drawn diagram shown on large screens */
  diagram?: "apex-lead-nurture";
}

export interface Project {
  /** the web address of the project page: /work/<slug> */
  slug: string;
  code: string;
  kind: "client" | "demo";
  /** featured client projects get a large case on the homepage */
  featured?: boolean;
  /** big title on the project page */
  name: string;
  /** headline of the large case on the homepage */
  title: string;
  category: string;
  /** "System" column in the homepage index */
  system: string;
  /** "What's inside" column in the homepage index */
  inside: string;
  badge: string;
  summary: string;
  /** small image in the homepage index */
  thumbnail?: string;
  /** screenshots. The first one is shown large. */
  images?: Shot[];
  /** optional heading above the screenshots on the project page */
  gallery?: { title: string; intro?: string };
  /** main button. `note` is the small line under it (defaults to the web address). */
  primaryLink?: { label: string; href: string; note?: string };
  links?: { label: string; href: string }[];
  specs: Spec[];
  /** specs shown on the homepage case (defaults to `specs`) */
  caseSpecs?: Spec[];
  timeline?: {
    title: string;
    intro?: string;
    items: { date: string; title: string; text: string; result: string }[];
  };
  problem?: string;
  solution?: string;
  workflows?: Workflow[];
  pipeline?: string[];
  orderForm?: { title: string; intro?: string; items: { title: string; text?: string }[] };
  steps?: { title: string; items: { title: string; text: string }[] };
  quotes?: { text: string; source: string; rating?: number }[];
  /** line on the orange strip at the bottom of the project page */
  ctaLine: string;
}

/* ---------- You ---------- */

export const PROFILE = {
  name: "Laurence Maligaya",
  role: "GHL Specialist",
  roleLong: "GoHighLevel Specialist",
  location: "Santa Rosa, Laguna, PH",
  timezone: "UTC+8",
  domain: "laurencemaligaya.com",
  /** your portrait. Swap the URL to change the photo. */
  portrait: "/images/portrait.webp",
  /** used only if the portrait above fails to load (your current photo) */
  portraitFallback: "https://assets.cdn.filesafe.space/9tQkDHB9yoFf7gva7zy7/media/6a77e7c703343f290f809c82.png",
  /** true = black & white portrait, false = full colour */
  portraitBlackAndWhite: true,
};

/** what Google and link previews show for the homepage */
export const SEO = {
  url: "https://laurencemaligaya.com",
  title: "Laurence Maligaya · GoHighLevel Specialist",
  description:
    "GoHighLevel specialist building funnels, pipelines and automated follow-up for home service businesses and agencies. Top Rated Plus on Upwork, 100% Job Success.",
};

export const HERO = {
  headline: "GoHighLevel systems that book the job.",
  intro:
    "I build the funnels, pipelines and automated follow-up behind home service businesses and the agencies that market them. Every path is tested before it goes live.",
};

/* ---------- Stats strip under the hero ---------- */

export const STATS: Spec[] = [
  { label: "Job Success", value: "100%" },
  { label: "Upwork status", value: "Top Rated Plus" },
  { label: "Client rating", value: "5.0" },
  { label: "Hours logged", value: "7,000+" },
];

export const CERTIFICATION = {
  label: "GHL Champ certified",
  items: ["Funnels", "Workflows", "CRM & Pipeline"],
  href: "https://my-certificates.com/certificates/6a64230e8f3630ada9e02d73",
};

/* ---------- Contact ---------- */

export const CONTACT = {
  replyTime: "Usually within 4 hours",
  upwork: "https://www.upwork.com/freelancers/~011be8c77f9d0a9870",
  email: "jlmaligaya15@gmail.com",
  whatsapp: "+63 998 331 8560",
  whatsappLink: "https://wa.me/639983318560",
  linkedin: "https://www.linkedin.com/in/laurence-maligaya-760619149",
  linkedinShort: "in/laurence-maligaya",
  facebook: "https://www.facebook.com/JL16.Maligaya",
  facebookShort: "facebook.com/JL16.Maligaya",
};

/* ---------- Section headings on the homepage ---------- */

export const SECTIONS = {
  work: "Client work first. Then complete demo builds.",
  moreClientWork: "More client work",
  demos: "Demo builds",
  demosNote: "Complete systems built end to end, not client work",
  process: "How a build runs.",
  reviewsGhl: "GoHighLevel client reviews · Upwork",
  reviewsEarlier: "Earlier freelance work · Upwork",
  contact: "Leads going cold? Let's talk.",
  contactIntro:
    "Message me wherever suits you. Tell me what you use GoHighLevel for and where leads are slipping, and I'll tell you what I'd fix first.",
};

/* ---------- How a build runs ---------- */

export const PROCESS = [
  { title: "Scope", text: "We map how leads reach you today and where they stall." },
  { title: "Build in your account", text: "Funnel, pipeline and workflows, all inside your GHL. You own it." },
  { title: "Test every path", text: "Test leads go through every branch before a real one does." },
  { title: "Launch", text: "We go live, and everything stays in your account." },
];

/* ---------- Reviews ---------- */

export const REVIEWS = {
  ghl: [
    {
      text: "Working with Laurence has been refreshing. He was able to audit my previous funnel, clean up the issues, and fix the mess left behind. I really appreciate his attention to detail and professionalism.",
      source: "The French Perspective · Funnel A repair & cleanup",
      rating: 5,
    },
    {
      text: "I'm very satisfied with Laurence's work. He was thorough, detail-oriented, and professional throughout the entire process. He identified issues that had been overlooked, fixed them carefully, and provided clear documentation…",
      source: "The French Perspective · GHL funnel QA audit",
      rating: 5,
    },
  ],
  earlier: [
    { text: "Responsive, proactive, protective of your brand. Very good at what he does.", source: "Upwork client" },
    {
      text: "Very attentive and flexible. I highly recommend him and will be hiring him again!",
      source: "Upwork client",
    },
    { text: "Amazing to work with! Would highly recommend.", source: "Upwork client" },
  ],
};

/* ---------- Projects ----------
   Order here = order on the site.
   kind: "client" for paid work, "demo" for demo builds.
   featured: true puts a client project in a big case on the homepage.
   Images: paste any image link, or put the file in /public/images and use "/images/name.webp".
*/

export const PROJECTS: Project[] = [
  {
    slug: "the-french-perspective",
    code: "C-01",
    kind: "client",
    featured: true,
    name: "The French Perspective",
    title: "The French Perspective: audit, repair, rebuild",
    category: "Repeat client · VSL funnel",
    system: "Audit, repair + new VSL page",
    inside: "Pixel QA · funnel fixes · A/B test",
    badge: "Repeat client · 3 projects",
    summary:
      "Three projects for an author who sells books through a VSL funnel: a tracking audit, a funnel repair, and a new VSL page split-tested against the original.",
    thumbnail: "/images/tfp-vsl.webp",
    images: [
      {
        src: "/images/tfp-vsl.webp",
        caption: "“The French Way Back to Desire” 5-book bundle VSL page",
        frame: "thefrenchperspective.com/vsl-v2-page",
      },
    ],
    primaryLink: {
      label: "View the VSL page",
      href: "https://thefrenchperspective.com/vsl-v2-page",
      note: "thefrenchperspective.com",
    },
    links: [
      { label: "VSL page (rebuilt)", href: "https://thefrenchperspective.com/vsl-v2-page" },
      { label: "Opt-in funnel (audited)", href: "https://thefrenchperspective.com/10-relationship-lessons" },
    ],
    specs: [
      { label: "Client", value: "The French Perspective" },
      { label: "Sells", value: "Books, through a VSL funnel" },
      { label: "Period", value: "Sep – Oct 2026" },
      { label: "Rating", value: "5.0 · 2 reviews", stars: true },
      { label: "Platform", value: "GoHighLevel" },
    ],
    timeline: {
      title: "Three projects, one client.",
      intro: "It started with an audit. The fixes came next, then a new VSL page.",
      items: [
        {
          date: "Sep 21–22",
          title: "Funnel QA audit",
          text: "Checked the Meta Pixel events (Lead, InitiateCheckout, Purchase) across the “10 Relationship Lessons” opt-in and checkout funnels, and documented every issue.",
          result: "★ 5.0",
        },
        {
          date: "Oct 1–2",
          title: "Funnel A repair & cleanup",
          text: "Fixed the opt-in redirect, Purchase event mapping and post-purchase redirect.",
          result: "★ 5.0",
        },
        {
          date: "Oct 2026",
          title: "New VSL page + A/B test",
          text: "Built the 5-book bundle page from the client's design, then split-tested it against the existing VSL.",
          result: "Live · approved",
        },
      ],
    },
    quotes: [
      {
        text: "Working with Laurence has been refreshing. He was able to audit my previous funnel, clean up the issues, and fix the mess left behind. I really appreciate his attention to detail and professionalism.",
        source: "The French Perspective · Funnel A repair & cleanup",
        rating: 5,
      },
      {
        text: "I'm very satisfied with Laurence's work. He was thorough, detail-oriented, and professional throughout the entire process. He identified issues that had been overlooked, fixed them carefully, and provided clear documentation…",
        source: "The French Perspective · GHL funnel QA audit",
        rating: 5,
      },
    ],
    ctaLine: "Need your funnel audited or fixed?",
  },
  {
    slug: "desert-flour-desserts",
    code: "C-02",
    kind: "client",
    featured: true,
    name: "Desert Flour Desserts",
    title: "Desert Flour Desserts: website design & build",
    category: "Website design & build",
    system: "Website + custom order form",
    inside: "3 pages · order form · GHL",
    badge: "Paid client project",
    summary:
      "A full website for a dessert business: designed first, approved by the client, then built in GoHighLevel around a custom order form.",
    thumbnail: "/images/dfd-home.webp",
    images: [
      {
        src: "/images/dfd-home.webp",
        caption: "The live homepage, built in GoHighLevel",
        frame: "Desert Flour Desserts · Home",
      },
    ],
    gallery: {
      title: "Designed first, then built in GoHighLevel.",
      intro:
        "Every page was designed and approved before anything was built, so the client knew exactly what they were getting.",
    },
    primaryLink: {
      label: "View the site",
      href: "https://api.chhomeservices.com/preview/5UrNGwVIQeQ1riEuJZQw",
      note: "BUILT IN GOHIGHLEVEL",
    },
    specs: [
      { label: "Client", value: "Desert Flour Desserts" },
      { label: "Scope", value: "Full design + build" },
      { label: "Pages", value: "Home · Custom Order · Thank You" },
      { label: "Key feature", value: "Custom order form" },
      { label: "Platform", value: "GoHighLevel" },
    ],
    caseSpecs: [
      { label: "Scope", value: "Full design + build" },
      { label: "Pages", value: "Home · Custom Order · Thank You" },
      { label: "Key feature", value: "Custom order form" },
      { label: "Process", value: "Mockups approved, then built" },
    ],
    orderForm: {
      title: "One form for every kind of order.",
      intro:
        "Built from the client's pricing guide, so customers pick exactly what they want and the request lands in GoHighLevel ready to quote.",
      items: [
        { title: "Cakes" },
        { title: "Cupcakes" },
        { title: "Decorated cookies" },
        { title: "Gourmet cookies", text: "Baked or take-and-bake, picked by flavor and quantity" },
        { title: "Thank-you page", text: "Confirms the request after submit" },
      ],
    },
    steps: {
      title: "How it ran.",
      items: [
        { title: "Design mockups", text: "Homepage and order form designed first." },
        { title: "Client approval", text: "Changes made at the mockup stage, where they're cheap." },
        { title: "Build in GoHighLevel", text: "Pages and form built to match the approved design." },
        { title: "Launch", text: "Live on the client's site." },
      ],
    },
    ctaLine: "Need a website that takes orders?",
  },
  {
    slug: "bemunchie",
    code: "C-03",
    kind: "client",
    name: "Bemunchie",
    title: "Bemunchie: funnel repair & SEO fix",
    category: "Funnel repair + SEO",
    system: "Funnel repair + SEO fix",
    inside: "3 pages · responsive · SEO titles",
    badge: "Paid client project",
    summary:
      "An SEO agency's GoHighLevel funnel had broken buttons, layouts that fell apart on tablet and mobile, and sections that didn't match the brand. I rebuilt all three pages.",
    thumbnail: "/images/bem-lp1.webp",
    images: [
      {
        src: "https://vibe.filesafe.space/1786158431853345748/assets/7e9389cc-71e0-45ea-b05f-109620fa1d15.gif",
        caption: "SEO landing page, before and after the rebuild",
        frame: "offer.bemunchie.co.uk/lp-seo",
      },
      { src: "/images/bem-lp1.webp", caption: "SEO landing page", frame: "offer.bemunchie.co.uk/lp-seo" },
      {
        src: "/images/bem-rankings.webp",
        caption: "Guaranteed rankings page",
        frame: "offer.bemunchie.co.uk/guaranteed-rankings",
      },
    ],
    primaryLink: { label: "View live page", href: "https://offer.bemunchie.co.uk/lp-seo" },
    links: [
      { label: "SEO landing page", href: "https://offer.bemunchie.co.uk/lp-seo" },
      { label: "SEO jobs page", href: "https://offer.bemunchie.co.uk/seo-jobs-1k" },
      { label: "Guaranteed rankings page", href: "https://offer.bemunchie.co.uk/guaranteed-rankings" },
    ],
    specs: [
      { label: "Client", value: "Bemunchie" },
      { label: "Date", value: "August 2026" },
      { label: "Scope", value: "3 funnel pages" },
      { label: "Fixed", value: "Buttons · responsive layout · brand · slugs · SEO titles" },
      { label: "Platform", value: "GoHighLevel" },
    ],
    problem: "Broken buttons, layouts that fell apart on tablet and mobile, and sections that didn't match the brand.",
    solution:
      "Rebuilt the responsive layout on all three pages, fixed every broken element, redesigned sections to match the brand, cleaned up the slugs and wrote SEO titles and descriptions.",
    quotes: [{ text: "Thanks for the improvements so far.", source: "Bemunchie" }],
    ctaLine: "Funnel broken on mobile?",
  },
  {
    slug: "apex-roofing",
    code: "D-01",
    kind: "demo",
    name: "Apex Roofing",
    title: "Apex Roofing",
    category: "Lead gen + inspection booking",
    system: "Lead gen + inspection booking",
    inside: "2 workflows · 6-stage pipeline · calendar",
    badge: "Demo build",
    summary:
      "A lead-generation system that captures roofing leads, sorts them in the CRM, follows up by email and turns them into booked roof inspections.",
    thumbnail: "/images/demo-apex.webp",
    images: [
      {
        src: "/images/demo-apex.webp",
        caption: "Landing page with the free roofing guide offer",
        frame: "apex-roofing-guide.laurencemaligaya.com",
      },
    ],
    primaryLink: { label: "View live site", href: "https://apex-roofing-guide.laurencemaligaya.com/" },
    specs: [
      { label: "Type", value: "Demo build" },
      { label: "Industry", value: "Roofing" },
      { label: "Workflows", value: "2" },
      { label: "Pipeline", value: "6 stages" },
      { label: "Booking", value: "GHL calendar" },
      { label: "Built with", value: "Funnel · Forms · Tags · Email" },
    ],
    workflows: [
      {
        title: "Lead nurture",
        intro:
          "Every new lead is tagged, put in the pipeline and followed up until they book an inspection. The moment they book, the emails stop.",
        diagram: "apex-lead-nurture",
        steps: [
          { kind: "trigger", label: "Form submitted" },
          { kind: "action", label: "Email: free roofing guide" },
          { kind: "action", label: "Tag: roofing-lead", note: 1 },
          { kind: "action", label: "Pipeline: New Lead" },
          { kind: "wait", label: "Wait 1 day" },
          { kind: "check", label: "Booked yet?", detail: "Yes → stop. No → keep going.", note: 2 },
          { kind: "action", label: "Pipeline: Nurturing", note: 3 },
          { kind: "action", label: "Email: 2nd follow-up" },
          { kind: "wait", label: "Wait 3 days" },
          { kind: "check", label: "Booked yet?", detail: "Yes → stop. No → keep going." },
          { kind: "action", label: "Email: 3rd follow-up" },
          { kind: "end", label: "End" },
        ],
        notes: [
          { title: "Tagged on entry", text: "The roofing-lead tag segments the lead from minute one." },
          { title: "A check after every wait", text: "If the inspection-booked tag is there, the sequence ends." },
          { title: "The pipeline moves with the lead", text: "Unbooked leads move to Nurturing automatically." },
        ],
      },
      {
        title: "Booking & reminders",
        intro:
          "Once a lead books, the system confirms it, alerts the team and sends two reminders so the inspection actually happens.",
        steps: [
          { kind: "trigger", label: "Appointment booked" },
          { kind: "action", label: "Tag: inspection-scheduled" },
          { kind: "action", label: "Pipeline: Inspection Booked" },
          { kind: "action", label: "Email: confirmation" },
          { kind: "action", label: "Internal notification" },
          { kind: "wait", label: "Wait 1 day" },
          { kind: "action", label: "Reminder: day before" },
          { kind: "wait", label: "Wait until inspection day" },
          { kind: "action", label: "Reminder: day of" },
          { kind: "end", label: "End" },
        ],
      },
    ],
    pipeline: ["New Lead", "Nurturing", "Inspection Booked", "Inspection Completed", "Estimate Sent", "Won"],
    ctaLine: "Want a system like this?",
  },
  {
    slug: "truecare-dental",
    code: "D-02",
    kind: "demo",
    name: "TrueCare Dental",
    title: "TrueCare Dental",
    category: "Appointments + reminders",
    system: "Appointments + reminders",
    inside: "1 workflow · 6-stage pipeline · reminders",
    badge: "Demo build",
    summary:
      "An appointment funnel that takes patients from choosing a service to a booked consultation, with reminders and follow-up built in.",
    thumbnail: "/images/demo-truecare.webp",
    images: [
      {
        src: "https://vibe.filesafe.space/1786158431853345748/assets/d74953d9-28b4-40ac-aecc-d3b8092cc5a5.png",
        caption: "Consultation landing page, full length",
        scroll: true,
        frame: "truecare-dental.laurencemaligaya.com",
      },
    ],
    primaryLink: { label: "View live site", href: "https://truecare-dental.laurencemaligaya.com/" },
    specs: [
      { label: "Type", value: "Demo build" },
      { label: "Industry", value: "Dental" },
      { label: "Workflows", value: "1" },
      { label: "Pipeline", value: "6 stages" },
      { label: "Reminders", value: "2 per booking" },
      { label: "Built with", value: "Funnel · Service booking · Email" },
    ],
    workflows: [
      {
        title: "Consultation booking & reminders",
        intro:
          "When a patient books, they get a confirmation, land in the pipeline, and get two reminders before the consultation.",
        steps: [
          { kind: "trigger", label: "Service booked", detail: "Booked by the customer, TrueCare Dental service" },
          { kind: "action", label: "Email: confirmation" },
          { kind: "action", label: "Tag: consultation-booked" },
          { kind: "action", label: "Pipeline: New Booking" },
          { kind: "wait", label: "Wait until 1 day before" },
          { kind: "action", label: "Reminder: 1 day before" },
          { kind: "wait", label: "Wait until 2 hours before" },
          { kind: "action", label: "Reminder: 2 hours before" },
          { kind: "end", label: "End" },
        ],
      },
    ],
    pipeline: ["New Booking", "Appointment Confirmed", "Consultation Completed", "Scheduled", "Won", "Lost"],
    ctaLine: "Want a booking system like this?",
  },
  {
    slug: "vantage-product-systems",
    code: "D-03",
    kind: "demo",
    name: "Vantage Product Systems",
    title: "Vantage Product Systems",
    category: "Sales funnel + delivery",
    system: "Sales funnel + delivery",
    inside: "checkout · delivery · 4-stage pipeline",
    badge: "Demo build",
    summary:
      "A sales funnel that takes customers from product page to checkout, delivers the product automatically and follows up after the purchase.",
    thumbnail: "/images/demo-vantage.webp",
    images: [
      {
        src: "/images/demo-vantage.webp",
        caption: "Sales page",
        frame: "product-launch-systems.laurencemaligaya.com",
      },
    ],
    primaryLink: { label: "View live site", href: "https://product-launch-systems.laurencemaligaya.com/" },
    specs: [
      { label: "Type", value: "Demo build" },
      { label: "Offer", value: "Digital product" },
      { label: "Workflows", value: "1" },
      { label: "Pipeline", value: "4 stages" },
      { label: "Checkout", value: "Payment + delivery" },
      { label: "Built with", value: "Sales page · Checkout · Email" },
    ],
    workflows: [
      {
        title: "Purchase & follow-up",
        intro:
          "After checkout the buyer gets a confirmation, moves into the order pipeline and receives tips on using the product.",
        steps: [
          { kind: "trigger", label: "Order form submitted" },
          { kind: "action", label: "Email: purchase confirmation" },
          { kind: "action", label: "Pipeline: New Order" },
          { kind: "action", label: "Tag: customer-digital-product" },
          { kind: "wait", label: "Wait 1 day" },
          { kind: "action", label: "Email: product tips" },
          { kind: "wait", label: "Wait 2 days" },
          { kind: "action", label: "Email: more tips" },
          { kind: "end", label: "End" },
        ],
      },
    ],
    pipeline: ["New Order", "Payment Received", "Product Delivered", "Completed"],
    ctaLine: "Selling a product online?",
  },
  {
    slug: "funnelup",
    code: "D-04",
    kind: "demo",
    name: "FunnelUp",
    title: "FunnelUp",
    category: "Lead source + referrals",
    system: "Lead source + referrals",
    inside: "2 workflows · webhooks · source tags",
    badge: "Demo build",
    summary:
      "A lead-generation system that tags every lead by where they came from, and sends referrers their voucher automatically through webhooks.",
    thumbnail: "/images/demo-funnelup.webp",
    images: [
      {
        src: "https://vibe.filesafe.space/1786158431853345748/assets/e9d7a745-987c-4126-ab96-73ddfdf38314.png",
        caption: "Free training registration page, full length",
        scroll: true,
        frame: "funnel-up.laurencemaligaya.com",
      },
    ],
    primaryLink: { label: "View live site", href: "https://funnel-up.laurencemaligaya.com/" },
    specs: [
      { label: "Type", value: "Demo build" },
      { label: "Offer", value: "Free training" },
      { label: "Workflows", value: "2" },
      { label: "Lead sources", value: "3 tracked" },
      { label: "Referrals", value: "Voucher by webhook" },
      { label: "Built with", value: "AI Studio form · Tags · Webhooks" },
    ],
    workflows: [
      {
        title: "Lead source follow-up",
        intro: "Every new lead is tagged by where they came from, so follow-up and reporting match the source.",
        steps: [
          { kind: "trigger", label: "AI Studio form submitted" },
          {
            kind: "check",
            label: "Where did the lead come from?",
            branches: [
              { when: "Social media", then: "Tag: social-media" },
              { when: "Website form", then: "Tag: website-form" },
              { when: "Referral", then: "Tag: referral, then webhook to the referral flow" },
              { when: "None", then: "End" },
            ],
          },
          { kind: "end", label: "End" },
        ],
      },
      {
        title: "Send voucher to referrer",
        intro: "When a referral comes in, the referrer is found in the CRM and gets their voucher by email.",
        steps: [
          { kind: "trigger", label: "Inbound webhook", detail: "Gets the referrer's email" },
          { kind: "action", label: "Find contact" },
          { kind: "check", label: "Contact found?", detail: "Yes → send voucher. No → stop." },
          { kind: "action", label: "Email: referral voucher" },
          { kind: "end", label: "End" },
        ],
      },
    ],
    ctaLine: "Want to know where your leads come from?",
  },
];

/* ---------- Helpers (no need to edit) ---------- */

export const featuredProjects = PROJECTS.filter((p) => p.featured);
export const moreClientProjects = PROJECTS.filter((p) => p.kind === "client" && !p.featured);
export const demoProjects = PROJECTS.filter((p) => p.kind === "demo");
export const getProject = (slug?: string) => PROJECTS.find((p) => p.slug === slug);
export const nextProject = (slug: string) => {
  const i = PROJECTS.findIndex((p) => p.slug === slug);
  return PROJECTS[(i + 1) % PROJECTS.length];
};
