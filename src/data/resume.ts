// Single source of truth for every view: desktop apps, mobile apps,
// the terminal, the landing page and Pro mode all read from here.

export const profile = {
  name: "Md Shadi Rohan",
  shortName: "Rohan",
  handle: "rohan",
  title: "Software Engineer",
  tagline: "AI-native · Full-stack · Next.js · Node.js",
  location: "Dhaka, Bangladesh",
  email: "rohan.devwhiz@gmail.com",
  photo: "/profile.jpg",
  resumePdf: "/Md_Shadi_Rohan_Resume.pdf",
  status: "Open to new opportunities",
  links: {
    github: "https://github.com/SadeeMsr",
    linkedin: "https://www.linkedin.com/in/md-sadee-rohan-4180a7211/",
  },
  summary:
    "AI-native software engineer who builds web products end to end with Next.js, Node.js and TypeScript. Claude Code and Cursor are part of how I plan, build, test and ship every day, and I review every line they write. I recently launched TruckerPaperwork, my own SaaS, and before that built a mentorship marketplace used by around 1,000 people and a school platform that runs daily in 10 classes.",
  /** shorter intro for the Pro hero */
  pitch:
    "AI-native software engineer building web products end to end with Next.js, Node.js and TypeScript. I ship faster with Claude Code and Cursor, and I review every line.",
  highlights: [
    { value: "2+ yrs", label: "shipping production software" },
    { value: "~1,000", label: "active users on a marketplace I built" },
    { value: "1 SaaS", label: "designed, built and launched solo" },
  ],
} as const;

export const education = {
  school: "Independent University, Bangladesh",
  degree: "B.Sc. in Computer Science, Minor in Finance",
  period: "Jan 2019 – May 2024",
  courses: [
    "Object-Oriented Programming",
    "Data Structures & Algorithms",
    "Database Management",
    "System Analysis and Design",
    "Web Development",
    "Mobile Application Development",
    "Data Communication & Networking",
    "Cryptography and Network Security",
    "Cloud Computing",
    "Probability & Statistics",
  ],
};

export type Job = {
  company: string;
  /** company website */
  url?: string;
  role: string;
  period: string;
  location: string;
  version: string;
  codename: string;
  points: string[];
  stack: string[];
};

export const experience: Job[] = [
  {
    company: "Independent",
    role: "Software Engineer",
    period: "Aug 2026 – Present",
    location: "Remote",
    version: "3.0",
    codename: "Indie",
    points: [
      "Built and launched TruckerPaperwork (truckerpaperwork.com), a mobile-first PWA that lets truckers scan paperwork, merge it into one PDF and send it to brokers from their own Gmail.",
      "Built Gmail OAuth sending (a separate email per broker, every send logged), Lemon Squeezy subscriptions with webhooks, and direct-to-storage uploads protected by Postgres row-level security.",
      "Shipped a guest mode where the scanner runs entirely on the phone, plus SEO landing pages, a blog and PostHog analytics, with unit and Playwright end-to-end tests running in CI on every push.",
      "Delivered a full-stack MVP of LoadBoard for a client: a logistics marketplace with shipper, driver and admin dashboards, job review, driver document checks, invoices and map views.",
    ],
    stack: ["Next.js", "TypeScript", "Supabase", "Lemon Squeezy", "Gmail API", "Express", "Prisma", "Playwright"],
  },
  {
    company: "Spade Digital",
    url: "https://spade-digital-usa.vercel.app/",
    role: "Software Developer",
    period: "Jun 2024 – Jul 2026",
    location: "Dhaka, Bangladesh",
    version: "2.0 LTS",
    codename: "Spade",
    points: [
      "Built Barnyard Recs end to end (front end, back end and AWS hosting), an electronic-music mentorship marketplace earning $50k+ ARR with around 1,000 active users: one-on-one and ongoing mentorship bookings, a digital products cart, coupons and Stripe payments.",
      "Built a transaction ledger and automated Stripe Connect payouts that release instructors' earnings when their monthly goals are met.",
      "Built a video-review pipeline: direct uploads to Amazon S3, processed by AWS MediaConvert with progress tracking, plus CometChat real-time chat and video.",
      "Architected admin, instructor and student dashboards with role-based access via Clerk, timezone-aware scheduling, cron jobs and Klaviyo email automation.",
      "Integrated Meta Pixel and Google Analytics, boosting engagement by 60%.",
    ],
    stack: ["Next.js", "TypeScript", "AWS S3", "MediaConvert", "Stripe", "Clerk", "CometChat", "Klaviyo"],
  },
  {
    company: "Doodle Inc.",
    role: "Software Development Intern",
    period: "Feb 2024 – Jun 2024",
    location: "Dhaka, Bangladesh",
    version: "1.0",
    codename: "Doodle",
    points: [
      "Used AWS serverless services (Amplify, AppSync, Lambda, DynamoDB) to build scalable back-end solutions for Wozaef, a large-scale job portal.",
      "Implemented core Wozaef features: user profiles, job posting with advanced cascading search and filters, and contact support, using GraphQL, TypeScript and Next.js.",
    ],
    stack: ["AWS Amplify", "AppSync", "Lambda", "DynamoDB", "GraphQL", "Next.js"],
  },
];

export type ProjectCategory = "production" | "code" | "design";

export const CATEGORIES: Record<ProjectCategory, { label: string; blurb: string }> = {
  production: { label: "Production & client work", blurb: "Live products and client systems people use every day." },
  code: { label: "Code showcase", blurb: "Open source, built to show how I structure, test and document software." },
  design: { label: "Design & front-end", blurb: "Interfaces, motion and craft." },
};

/** mobile is optional: leave it out when the phone layout of that screen is not presentable */
export type Shot = { label: string; desktop: string; mobile?: string };

export type Project = {
  slug: string;
  /** URL slug for the /work page when it should differ from slug */
  page?: string;
  name: string;
  category: ProjectCategory;
  tagline: string;
  year: string;
  /** short status label, e.g. "Live" or "Client MVP" */
  badge?: string;
  role: string;
  timeline: string;
  client?: string;
  problem?: string;
  /** step-by-step product flow (used for MVPs) */
  flow?: { title: string; body: string }[];
  features: string[];
  highlights: string[];
  stack: string[];
  impact?: string;
  /** headline numbers shown on cards */
  stats?: { value: string; label: string }[];
  url?: string;
  urlLabel?: string;
  repos?: { label: string; url: string }[];
  demoNote?: string;
  org?: { name: string; url: string };
  shots: { desktop: string; mobile: string };
  gallery?: Shot[];
  video?: string;
  color: string;
};

const P = (slug: string) => ({ desktop: `/projects/${slug}/desktop.jpg`, mobile: `/projects/${slug}/mobile.jpg` });
const G = (slug: string, file: string, label: string, opts: { noMobile?: boolean } = {}): Shot => ({
  label,
  desktop: `/projects/${slug}/gallery/${file}-desktop.jpg`,
  ...(opts.noMobile ? {} : { mobile: `/projects/${slug}/gallery/${file}-mobile.jpg` }),
});

export const projects: Project[] = [
  /* ---------------- production ---------------- */
  {
    slug: "barnyard-recs",
    name: "Barnyard Recs",
    category: "production",
    tagline: "Mentorship marketplace where music producers book sessions with established artists",
    year: "2024–2026",
    badge: "Live · $50k+ ARR",
    role: "Built it end to end: front end, back end, payments and AWS cloud hosting",
    timeline: "Jun 2024 – Jul 2026",
    org: { name: "Spade Digital", url: "https://spade-digital-usa.vercel.app/" },
    problem:
      "Lessons were sold through a patchwork of booking links, payment pages and chat apps. Instructors needed availability, payouts and live sessions in one place, and students needed to book the right artist across timezones.",
    features: [
      "Instructor roster filtered by genre, DAW and price, with trials, bundles and mentorships booked in the student's own timezone.",
      "Automatic instructor payouts through Stripe Connect when monthly goals are hit, with no manual admin step.",
      "Video reviews: tracks upload straight to S3 and AWS MediaConvert transcodes them, with live status.",
      "Live chat and video calls over CometChat, synced to Google Calendar with automated reminders.",
      "Transaction ledger that traces every sale, refund and payout back to Stripe.",
      "Digital store with cart, coupons and secure downloads, plus admin, instructor and student dashboards.",
    ],
    highlights: [
      "Owned the whole stack: Next.js front end, API and data layer, and AWS hosting.",
      "25-model Prisma schema covering sessions, availability, sales, coupons, payouts and transfers.",
      "Timezone-aware scheduling across bookings, reschedules and calendar sync.",
      "Stripe webhooks and scheduled jobs that check monthly goals and release payouts.",
      "Growth tooling: Klaviyo, PostHog, Dub referral links, Meta Pixel and Google Analytics.",
      "Deployed on AWS Amplify with secrets in SSM and short-lived SSO credentials.",
    ],
    stack: ["Next.js", "TypeScript", "Prisma", "PostgreSQL", "AWS S3", "MediaConvert", "Stripe Connect", "Clerk", "CometChat", "Google Calendar", "Klaviyo", "PostHog"],
    impact: "Earning $50k+ ARR with around 1,000 active users; analytics work lifted engagement by 60%.",
    stats: [
      { value: "$50k+", label: "ARR" },
      { value: "~1,000", label: "active users" },
      { value: "+60%", label: "engagement" },
    ],
    url: "https://www.barnyardrecs.com/",
    shots: P("barnyard-recs"),
    color: "#C2185B",
  },
  {
    slug: "truckerpaperwork",
    name: "TruckerPaperwork",
    category: "production",
    tagline: "My own SaaS: truckers scan paperwork into one PDF and send it to brokers from their Gmail",
    year: "2026",
    badge: "Live · my product",
    role: "Founder and sole engineer: product, design, code, SEO and launch",
    timeline: "Sep 2026 – present",
    problem:
      "Drivers only get paid once brokers receive the bill of lading, rate confirmation and proof of delivery, which means photographing crumpled paper in a cab and fighting scanner apps and email threads, often with bad signal.",
    features: [
      "Scanner with automatic edge detection, perspective correction and a high-contrast document mode.",
      "Every page of a load merged into one PDF, with reordering and preview before sending.",
      "Sends from the driver's own Gmail: one separate email per broker, with a full send history.",
      "Works offline: pages are saved on the phone and upload when signal returns.",
      "Guests try the real scanner on their device before signing up; saved brokers, document history and an invoice template.",
    ],
    highlights: [
      "Image processing runs in the browser on the phone itself.",
      "PDFs up to 15 MB go straight to Supabase Storage through signed links, then get verified on the server.",
      "Row-level security on every table and bucket, so drivers only ever reach their own data.",
      "Offline-first with a service worker and an IndexedDB queue.",
      "Lemon Squeezy subscriptions; unit and Playwright end-to-end tests run in CI on every push.",
    ],
    stack: ["Next.js 16", "React 19", "TypeScript", "Supabase", "Postgres RLS", "Gmail API", "Lemon Squeezy", "pdf-lib", "PostHog", "Playwright"],
    impact: "Launched in 2026 and in early access.",
    url: "https://www.truckerpaperwork.com/",
    shots: P("truckerpaperwork"),
    video: "/projects/truckerpaperwork/demo.mp4",
    color: "#E95420",
  },
  {
    slug: "sonamukh",
    name: "Sonamukh School Management",
    category: "production",
    tagline: "Bilingual school site and management system that replaced paper registers",
    year: "2025–2026",
    badge: "Live · 10 classes",
    role: "Lead developer: data model, auth, dashboards, uploads and staff manuals",
    timeline: "Sep 2025 – present",
    client: "Sonamukh Smart Academy",
    problem:
      "The school ran admissions, attendance and student progress on paper. Information was hard to find, monthly reports took hours, and parents had no visibility.",
    features: [
      "Bangla and English public site with notices, academics, gallery, school magazines and online admission applications.",
      "Role-based dashboards for operators, teachers, students and parents.",
      "Attendance by section and date: mark all present or absent in one tap, or Present / Absent / Late per student, with live counters.",
      "Monthly attendance reports per section and per student, student IDs and ID cards, progress history.",
      "Operators publish notices, media and magazines and control what appears on the homepage.",
    ],
    highlights: [
      "Prisma schema for the class → shift → section hierarchy, admissions, enrolment, attendance and progress.",
      "Custom auth: bcrypt, signed HTTP-only cookie sessions and route-level access rules.",
      "Full Bangla/English internationalisation with SEO.",
      "Wrote operator and teacher manuals so staff run it themselves.",
    ],
    stack: ["Next.js", "TypeScript", "Prisma", "PostgreSQL", "Supabase Storage", "next-intl", "TanStack Query", "Tailwind CSS"],
    impact: "Used daily in 10 classes, replacing paper records and cutting routine admin time.",
    stats: [{ value: "10", label: "classes, daily" }],
    url: "https://www.sonamukh.org/",
    shots: { desktop: "/projects/sonamukh/attendance-desktop.jpg", mobile: "/projects/sonamukh/attendance-mobile.jpg" },
    gallery: [
      G("sonamukh", "01-students", "Students", { noMobile: true }),
      G("sonamukh", "02-student-manage", "Student profile"),
      G("sonamukh", "03-teachers", "Teachers & classes", { noMobile: true }),
      G("sonamukh", "04-teacher-assign", "Class assignments"),
      G("sonamukh", "05-report-student", "Monthly attendance report"),
      G("sonamukh", "06-classes", "Classes, shifts & sections", { noMobile: true }),
      G("sonamukh", "07-applications", "Admission applications"),
      G("sonamukh", "08-application-view", "Application details"),
      G("sonamukh", "09-student-add", "Admit a student"),
      G("sonamukh", "10-notices", "Noticeboard", { noMobile: true }),
      G("sonamukh", "11-notice-add", "Add a notice"),
      G("sonamukh", "12-credentials", "Login accounts", { noMobile: true }),
    ],
    color: "#1F7A3E",
  },
  {
    slug: "rp-billing",
    name: "RP Billing",
    category: "production",
    tagline: "Billing and accounting system that turns every booked event into invoices and ledgers",
    year: "2023",
    badge: "Live · 100-person team",
    role: "Front-end developer (React, Redux); Django back end by a teammate",
    timeline: "2023",
    client: "Reminiscence Photography",
    problem:
      "A busy event photography company tracked clients, packages, advances and dues across spreadsheets. Revenue and pending payments were hard to see and billing every event was manual.",
    features: [
      "600+ clients with active and past events, total revenue and pending payment, filtered by activity and month.",
      "Events with type, package, video package, add-ons, event lead, venue, date, discount and cash advance.",
      "Invoices generated automatically when an event is created.",
      "Ledgers, payment logging and cash inflows; monthly income statements.",
    ],
    highlights: [
      "Spreadsheet-like editable tables with complex Redux Toolkit state and batched saves.",
      "Business rules for packages, add-ons, discounts and advances mapped to how the company bills.",
      "Responsive across desktop and phone.",
    ],
    stack: ["React", "Redux Toolkit", "React Router", "Tailwind CSS", "Django REST"],
    impact: "Used by the company's ~100 staff; improved employee efficiency by 30%.",
    stats: [{ value: "+30%", label: "team efficiency" }],
    url: "https://www.rpbilling.com/",
    urlLabel: "Visit app",
    shots: P("rp-billing"),
    color: "#4338CA",
  },
  {
    slug: "wozaif",
    name: "Wozaif",
    category: "production",
    tagline: "UAE recruitment platform connecting migrant workers, employers and agencies",
    year: "2024",
    badge: "Live",
    role: "Software Development Intern at Doodle Inc.: core features and serverless back end",
    timeline: "Feb – Jun 2024",
    client: "Wozaif (UAE)",
    problem:
      "Hiring skilled migrant workers involves candidates, employers and agencies who usually talk through middlemen and paperwork, with little transparency for workers.",
    features: [
      "Three user types (candidates, employers, agencies) with dashboards and three-way messaging.",
      "Job search by title and location with advanced cascading filters and popular categories.",
      "Six-step candidate profile and CV builder with document upload and video résumé.",
      "Job posting, saved jobs, following employers and agencies, packages, training and certificates.",
    ],
    highlights: [
      "Serverless back end on AWS Amplify, AppSync (GraphQL), Lambda and DynamoDB.",
      "Cascading search and filters on top of a GraphQL API.",
    ],
    stack: ["Next.js", "TypeScript", "GraphQL", "AWS Amplify", "AppSync", "Lambda", "DynamoDB"],
    url: "https://www.wozaif.com/",
    shots: P("wozaif"),
    color: "#F28C28",
  },
  {
    slug: "loadboard",
    name: "LoadBoard",
    category: "production",
    tagline: "Freight load board with live tracking for shippers, drivers and admins",
    year: "2026",
    badge: "Client MVP · live demo",
    role: "Sole engineer: data model, REST API, three dashboards and deployment",
    timeline: "Aug – Sep 2026",
    problem:
      "Small freight operations match shippers and drivers over phone calls and spreadsheets. The client wanted one place to post loads, vet drivers, follow each delivery and get paid.",
    features: [
      "Shippers post loads (full, partial, flatbed, refrigerated, hazmat, oversized), track status, view invoices and rate drivers.",
      "Drivers find and accept loads, confirm pickup and delivery with proof documents, and see earnings.",
      "Admin review queues for jobs and driver accounts, plus payments, users and analytics.",
      "Live driver locations on a map with Mapbox geocoding.",
    ],
    highlights: [
      "Job lifecycle modelled as a state machine, with every step in an activity timeline.",
      "Express API in clean architecture layers, Prisma on Supabase Postgres, JWT with refresh tokens and Zod validation.",
      "Installable as a phone app (PWA).",
    ],
    stack: ["Next.js", "TypeScript", "Express", "Prisma", "PostgreSQL", "Mapbox", "Leaflet", "Recharts"],
    impact: "Working MVP with a live demo of the full job lifecycle.",
    url: "https://loadboard-track.vercel.app/",
    urlLabel: "Live demo",
    shots: P("loadboard"),
    color: "#FF6A1A",
  },
  {
    slug: "statement-tools",
    name: "Statement Tools",
    category: "production",
    tagline: "Bank-statement PDFs to clean Excel and CSV, plus PDF unlocking",
    year: "2026",
    badge: "Product",
    role: "Solo: product and engineering",
    timeline: "2026",
    problem: "Banks send statements as PDFs, often password-protected, and accountants waste hours retyping transactions into spreadsheets.",
    features: [
      "Bank statement to CSV and to Excel with clean, labelled columns.",
      "Visual PDF table mapper: mark columns on the PDF, preview headers live, merge files into one spreadsheet.",
      "Merge statements and unlock password-protected PDF and Office files. No signup, no storage.",
    ],
    highlights: [
      "Custom parsing pipeline: rebuilds text lines from PDF geometry, detects table grids, applies layout-specific parsers and scores confidence.",
      "Exports XLSX and CSV; unlocks PDFs with qpdf.",
    ],
    stack: ["Next.js", "TypeScript", "pdf-lib", "unpdf", "SheetJS", "qpdf", "Tailwind CSS"],
    shots: P("statement-tools"),
    color: "#10A37F",
  },

  /* ---------------- code showcase ---------------- */
  {
    slug: "doctor-tracker",
    name: "Doctor Tracker",
    category: "code",
    tagline: "Clinic admin portal built to show production-grade React and Node.js engineering",
    year: "2026",
    badge: "Open source",
    role: "Sole engineer: front end, API, tests and deployment",
    timeline: "Nov 2026",
    features: [
      "Doctor roster and patient records with search, filters, sorting and pagination.",
      "Dashboard with admissions over time, patient conditions and KPIs.",
      "URL-driven dialogs, keyboard shortcuts, light and dark themes.",
    ],
    highlights: [
      "Express 5 + MongoDB API in Clean Architecture layers; Next.js 16 front end with Server Components and partial prerendering.",
      "Argon2, httpOnly cookie sessions through a same-origin proxy, refresh-token rotation, Helmet, rate limiting, idempotent writes.",
      "TanStack Query plus URL state (nuqs), no global store; React Compiler handles memoisation.",
      "One request feeds the whole dashboard, debounced search, lazy charts, optimistic deletes, an index behind every filter.",
      "140 unit and component tests and a 122-check walkthrough of every screen; README documents every decision.",
    ],
    stack: ["Next.js 16", "React 19", "TypeScript", "TanStack Query", "nuqs", "Express 5", "MongoDB", "Zod", "Vitest"],
    stats: [
      { value: "140", label: "automated tests" },
      { value: "122/122", label: "screen checks" },
      { value: "0.2–0.8s", label: "first paint, cold" },
    ],
    url: "https://doctortracker-portal.vercel.app/",
    urlLabel: "Live demo",
    repos: [
      { label: "Web code", url: "https://github.com/SadeeMsr/doctor-tracker-web" },
      { label: "API code", url: "https://github.com/SadeeMsr/doctor-tracker-api" },
    ],
    shots: P("doctor-tracker"),
    color: "#0E5C46",
  },

  /* ---------------- design & front-end ---------------- */
  {
    slug: "skill-guild",
    name: "The Skill Guild",
    category: "design",
    tagline: "Homeschool learning platform MVP with parent, kid, co-op and admin experiences",
    year: "2026",
    badge: "Front-end MVP · live demo",
    role: "Front-end developer: every screen, interaction and the mock data layer",
    timeline: "May – Jul 2026",
    problem:
      "Homeschooling families juggle courses, life-skills projects and co-op groups across many tools, and kids lose motivation without structure. The client needed something families and investors could click through before building the back end.",
    flow: [
      { title: "Public site", body: "3D hero, an 18-course catalog filtered by learning path and age, co-ops and a blog." },
      { title: "Log in", body: "Email or Google/Apple. In the demo any email and password opens the parent portal." },
      { title: "Parent portal", body: "Dashboard, child switcher, progress analytics, quests with proof and parent approval, certificates, rewards, billing." },
      { title: "Kid mode", body: "Profile picker with PIN lock, a kid home with streaks and levels, and a course player where lessons unlock step by step." },
      { title: "Co-op", body: "Four-step onboarding wizard, then a group dashboard with families, cohort progress, a leaderboard and a join code." },
      { title: "Admin console", body: "Separate staff login and a platform overview with families, learners, recurring revenue and content." },
    ],
    features: [
      "Four complete experiences in one app, each with its own navigation and mobile layout.",
      "Gamified learning: points, streaks, levels, milestones, quests and a rewards store.",
      "Course player with videos, readings, games, quizzes and audiobooks, notes and celebration animations.",
    ],
    highlights: [
      "Typed mock data behind query functions and TanStack Query hooks, so a real API can replace the mocks without touching screens.",
      "Kid progress and notes saved in the browser, so the demo behaves like the real product.",
      "React Three Fiber 3D scenes and Framer Motion transitions.",
      "PostHog analytics, SEO structured data and a crawlability audit.",
    ],
    stack: ["Next.js 16", "React 19", "TypeScript", "TanStack Query", "React Three Fiber", "Framer Motion", "PostHog", "Tailwind CSS"],
    url: "https://homeschool-app-main.vercel.app/",
    urlLabel: "Live demo",
    demoNote: "Log in with any email and password. Kid PINs: Mia 1234, Leo 4321.",
    shots: P("skill-guild"),
    gallery: [
      G("skill-guild", "01-login", "Log in"),
      G("skill-guild", "02-kids-picker", "Kid profile picker"),
      G("skill-guild", "03-kids-pin", "PIN lock"),
      G("skill-guild", "04-kid-home", "Kid home"),
      G("skill-guild", "05-kid-course", "Course player"),
      G("skill-guild", "06-progress", "Progress"),
      G("skill-guild", "07-quests", "Quests"),
      G("skill-guild", "08-rewards", "Rewards"),
      G("skill-guild", "09-coop", "Co-op dashboard"),
      G("skill-guild", "10-coop-onboarding", "Co-op onboarding"),
      G("skill-guild", "11-admin", "Admin console"),
      G("skill-guild", "12-home", "Homepage"),
    ],
    color: "#5B21D6",
  },
  {
    slug: "spade-site",
    page: "spade-digital",
    name: "Spade Digital USA",
    category: "design",
    tagline: "Agency website with scroll-driven animation and a rotating work showcase",
    year: "2026",
    badge: "Live",
    role: "Front-end developer",
    timeline: "Sep – Oct 2026",
    features: [
      "Animated hero with rotating brand work and a giant wordmark.",
      "Services, about, team, careers and contact pages with reveal-on-scroll sections.",
      "Page loader, smooth scrolling and a work showcase.",
    ],
    highlights: [
      "Framer Motion scroll effects throughout (useScroll, useTransform, AnimatePresence).",
      "Animations tuned to stay smooth on phones.",
    ],
    stack: ["Next.js", "React", "Framer Motion", "Tailwind CSS"],
    url: "https://spade-digital-usa.vercel.app/",
    shots: P("spade-site"),
    color: "#F04E23",
  },
  {
    slug: "oindriza",
    page: "oindriza-reza",
    name: "Oindriza Reza",
    category: "design",
    tagline: "Portfolio for an architect and urban researcher",
    year: "2023–2026",
    badge: "Live",
    role: "Front-end developer, working with Oindriza on content and art direction",
    timeline: "Nov 2023 – 2026",
    features: [
      "Sidebar navigation across seven collections: data visualisation, urban analytics, research, academic, professional, model fabrication and workshops.",
      "Image galleries and sliders, embedded interactive maps and dashboards, downloadable CV.",
      "Content driven from data files, so new projects need no layout changes.",
    ],
    highlights: ["Editorial, image-first layout that stays clean on phones.", "NextUI, Framer Motion and Swiper for galleries and transitions."],
    stack: ["Next.js", "React", "NextUI", "Framer Motion", "Swiper", "Tailwind CSS"],
    url: "https://www.oindrizareza.com/",
    shots: P("oindriza"),
    color: "#8A6D4B",
  },
];

export const projectsBy = (c: ProjectCategory) => projects.filter((p) => p.category === c);

export type Skill = { name: string; group: string; level: "proficient" | "basic" };

const proficient: [string, string][] = [
  ["Claude Code", "AI"],
  ["Cursor", "AI"],
  ["LLM APIs (Claude, GPT)", "AI"],
  ["Prompt & context engineering", "AI"],
  ["TypeScript", "Language"],
  ["JavaScript", "Language"],
  ["Next.js", "Frontend"],
  ["React", "Frontend"],
  ["TanStack Query", "Frontend"],
  ["Redux", "Frontend"],
  ["Tailwind CSS", "Frontend"],
  ["PWAs", "Frontend"],
  ["Node.js", "Backend"],
  ["Express", "Backend"],
  ["REST APIs", "Backend"],
  ["GraphQL", "Backend"],
  ["WebSockets", "Backend"],
  ["Stripe", "Backend"],
  ["OAuth / Gmail API", "Backend"],
  ["PostgreSQL", "Database"],
  ["Prisma", "Database"],
  ["MongoDB", "Database"],
  ["Supabase", "Database"],
  ["AWS (S3, MediaConvert, Lambda)", "Cloud"],
  ["Vercel", "Cloud"],
  ["Playwright", "Testing"],
  ["Vitest", "Testing"],
  ["Git & CI", "Tooling"],
  ["PostHog", "Tooling"],
];
const basic: [string, string][] = [
  ["React Three Fiber", "Frontend"],
  ["C++", "Language"],
  ["Java", "Language"],
  ["Dart", "Language"],
  ["Flutter", "Mobile"],
];

export const skills: Skill[] = [
  ...proficient.map(([name, group]) => ({ name, group, level: "proficient" as const })),
  ...basic.map(([name, group]) => ({ name, group, level: "basic" as const })),
];

/** Path of a project's standalone case-study page, e.g. /pro/work/barnyard-recs */
export const workPath = (p: Project) => `/pro/work/${p.page ?? p.slug}`;
export const projectByPage = (page: string) => projects.find((p) => (p.page ?? p.slug) === page);
export const SITE_URL = "https://rohanships.com";
