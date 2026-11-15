// Single source of truth for every view: desktop apps, mobile apps,
// the terminal and Recruiter Mode all read from here.

export const profile = {
  name: "Md Shadi Rohan",
  shortName: "Rohan",
  handle: "rohan",
  title: "Software Engineer",
  tagline: "Full-stack · Next.js · Node.js · AWS",
  location: "Dhaka, Bangladesh",
  email: "rohan.devwhiz@gmail.com",
  photo: "/hackathonPfp.jpeg",
  resumePdf: "/Md_Shadi_Rohan_Resume.pdf",
  status: "Open to new opportunities",
  links: {
    github: "https://github.com/SadeeMsr",
    linkedin: "https://www.linkedin.com/in/md-sadee-rohan-4180a7211/",
  },
  summary:
    "Software engineer who builds web products end to end with Next.js, Node.js and TypeScript, from Postgres schemas and AWS pipelines to dashboards people actually enjoy using. I recently launched TruckerPaperwork, my own SaaS, and before that built a mentorship marketplace used by around 1,000 people and a school platform that runs daily in 10 classes.",
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
      "Built Gmail OAuth sending (a separate email per broker, every send logged), Stripe subscriptions with webhooks, and direct-to-storage uploads protected by Postgres row-level security.",
      "Shipped a guest mode where the scanner runs entirely on the phone, plus SEO landing pages, a blog and PostHog analytics, with unit and Playwright end-to-end tests running in CI on every push.",
      "Delivered a full-stack MVP of LoadBoard for a client: a logistics marketplace with shipper, driver and admin dashboards, job review, driver document checks, invoices and map views.",
    ],
    stack: ["Next.js", "TypeScript", "Supabase", "Stripe", "Gmail API", "Express", "Prisma", "Playwright"],
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
      "Built Barnyard Recs, an AWS-hosted electronic-music mentorship marketplace with around 1,000 active users: one-on-one and ongoing mentorship bookings, a digital products cart, coupons and Stripe payments.",
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

export type Project = {
  slug: string;
  name: string;
  year: string;
  tagline: string;
  stack: string[];
  points: string[];
  url?: string;
  repo?: string;
  /** project = featured work, side = smaller builds, research = academic */
  kind: "project" | "side" | "research";
  /** company the project was built at */
  org?: { name: string; url: string };
  caseStudy?: { problem: string; solution: string; role: string; outcome: string };
  /** screenshot shown on the card and at the top of the detail view */
  image?: string;
  /** short status label, e.g. "Live" or "Client MVP" */
  badge?: string;
  /** shown on the one-page resume */
  onResume?: boolean;
  video?: string;
  color: string;
};

export const projects: Project[] = [
  {
    slug: "truckerpaperwork",
    image: "/projects/truckerpaperwork.jpg",
    name: "TruckerPaperwork",
    year: "2026",
    tagline: "My own SaaS: scan, merge and send trucking paperwork from a phone",
    badge: "Live · my product",
    stack: ["Next.js", "TypeScript", "Supabase", "Postgres RLS", "Stripe", "Gmail API", "PostHog", "Playwright"],
    caseStudy: {
      problem:
        "Owner-operator truckers still photograph bills of lading and rate confirmations, then fight with scanner apps and email threads to get one clean PDF to each broker before they get paid.",
      solution:
        "A phone-first PWA: scan, auto-crop and enhance pages, merge them into one PDF and send it to saved brokers from the driver's own Gmail, with a full history of every send.",
      role: "Founder and sole engineer: product, design, code, SEO and launch.",
      outcome: "Launched in 2026 with Stripe subscriptions and an early-access program; guests can try the full scanner without signing up.",
    },
    points: [
      "Mobile-first PWA: truckers scan bills of lading and rate confirmations, crop and enhance pages, merge them into one PDF and email it to brokers from their own Gmail.",
      "Gmail OAuth sending with one email per broker (brokers never see each other) and every attempt logged for a full send history.",
      "Phones upload straight to Supabase Storage with signed URLs; row-level security limits every table and bucket to its owner.",
      "Guest mode runs the real scanner and editor on the device, so nothing reaches the server until sign-up.",
      "Stripe subscriptions (checkout, customer portal, webhooks), SEO landing pages and blog, PostHog analytics with customer data masked in replays.",
      "Typecheck, lint, unit and Playwright end-to-end tests run in CI on every push.",
    ],
    url: "https://www.truckerpaperwork.com/",
    kind: "project",
    onResume: true,
    video: "/projects/truckerpaperwork-demo.mp4",
    color: "#E95420",
  },
  {
    slug: "barnyard-recs",
    image: "/projects/barnyard-recs.jpg",
    name: "Barnyard Recs",
    year: "2024–2026",
    tagline: "Electronic-music mentorship marketplace on AWS (Spade Digital)",
    org: { name: "Spade Digital", url: "https://spade-digital-usa.vercel.app/" },
    badge: "Live · ~1,000 users",
    stack: ["Next.js", "TypeScript", "AWS S3", "MediaConvert", "Stripe", "Clerk", "CometChat", "Klaviyo"],
    caseStudy: {
      problem:
        "An electronic-music mentorship brand needed to sell one-on-one lessons, mentorship programs and digital products without juggling separate booking, payment and video tools.",
      solution:
        "One platform with timezone-aware booking, Stripe checkout, video reviews processed on AWS, live chat and video calls, and separate dashboards for admins, instructors and students.",
      role: "Software developer at Spade Digital: back-end architecture, video pipeline, dashboards and integrations.",
      outcome: "Serves around 1,000 active users; analytics work lifted engagement by 60%.",
    },
    points: [
      "One-on-one sessions and ongoing mentorships with timezone-aware booking, a digital products cart, coupons and Stripe payments.",
      "Video reviews: students upload straight to S3, AWS MediaConvert transcodes them, and the app tracks processing status.",
      "Admin, instructor and student dashboards with role-based access via Clerk; CometChat for real-time chat and video calls.",
      "Cron jobs, Klaviyo email automation, and Meta Pixel + Google Analytics tracking (+60% engagement).",
    ],
    url: "https://www.barnyardrecs.com/",
    kind: "project",
    onResume: true,
    color: "#C2185B",
  },
  {
    slug: "sonamukh",
    image: "/projects/sonamukh.jpg",
    name: "Sonamukh School Management",
    year: "2025–2026",
    tagline: "End-to-end school platform, live in 10 classes",
    badge: "Live",
    stack: ["Next.js", "TypeScript", "Prisma", "PostgreSQL", "Supabase", "Tailwind CSS"],
    caseStudy: {
      problem: "A growing school ran admissions, attendance and progress reports on paper registers.",
      solution:
        "A bilingual public site plus dashboards for operators, teachers, students and parents, covering admissions through to monthly attendance reports.",
      role: "Lead developer: schema, auth, dashboards, uploads and staff manuals.",
      outcome: "Live in 10 classes and used daily, replacing paper records.",
    },
    points: [
      "Bilingual public site plus role-based dashboards for operators, teachers, students and parents, secured by JWT sessions and middleware.",
      "PostgreSQL schema with Prisma for a class → shift → section hierarchy, online admissions, enrolment, user histories and attendance/progress records.",
      "Used daily for admissions, attendance, reports and class management, replacing paper records and cutting routine admin time.",
      "Operators manage notices, gallery media and school magazines with Supabase Storage uploads; wrote operator and teacher manuals for staff.",
    ],
    url: "https://www.sonamukh.org/",
    kind: "project",
    onResume: true,
    color: "#3EB34F",
  },
  {
    slug: "doctor-tracker",
    image: "/projects/doctor-tracker.jpg",
    name: "Doctor Tracker",
    year: "2026",
    tagline: "Clinic admin portal with a Clean Architecture API, fully tested",
    badge: "Open source",
    stack: ["Next.js 16", "React 19", "TanStack Query", "Express 5", "MongoDB", "Zod", "Vitest"],
    caseStudy: {
      problem: "A full-stack take-home brief: a secure admin portal for clinics to manage doctors and their patients.",
      solution:
        "A Next.js 16 admin app and an Express 5 + MongoDB API built as production software, not a demo: layered architecture, secure sessions and full test coverage.",
      role: "Sole engineer, front end to deployment.",
      outcome: "Every requirement met and verified: 140 automated tests and a 122-check walkthrough of every screen.",
    },
    points: [
      "Admin portal for clinics: manage a doctor roster, record each doctor's patients and see activity at a glance.",
      "Express 5 + MongoDB API in Clean Architecture layers, with cookie auth and refresh-token rotation, rate limiting and idempotent writes.",
      "140 unit and component tests across web and API, plus a 122-check walkthrough of every screen in light, dark, desktop and phone.",
      "The README doubles as user manual and build log: user stories, architecture, failure handling and test strategy.",
    ],
    url: "https://doctortracker-portal.vercel.app/",
    repo: "https://github.com/SadeeMsr/doctor-tracker-web",
    kind: "project",
    onResume: true,
    color: "#0073E5",
  },
  {
    slug: "loadboard",
    image: "/projects/loadboard.jpg",
    name: "LoadBoard",
    year: "2026",
    tagline: "Freight load board with live tracking for shippers, drivers and admins",
    badge: "Client MVP · live demo",
    stack: ["Next.js", "TypeScript", "Express", "Prisma", "PostgreSQL", "Supabase", "Mapbox", "Leaflet", "Recharts"],
    caseStudy: {
      problem:
        "Small freight operations match shippers and drivers over phone calls and spreadsheets. The client wanted one place to post loads, vet drivers, follow each delivery and get paid.",
      solution:
        "A three-sided load board. Shippers post loads, admins approve jobs and drivers, drivers accept loads and confirm pickup and delivery with proof documents, and everyone follows the truck on a live map until the invoice is paid.",
      role: "Sole engineer: data model, REST API, all three dashboards and deployment.",
      outcome:
        "Delivered as a working MVP with a live demo where the full job lifecycle runs end to end, from posting a load to a paid invoice.",
    },
    points: [
      "Job lifecycle as a state machine: pending review → active → accepted → in transit → delivered → payment pending → completed, with every step written to an activity timeline.",
      "Admin review queues for new jobs and driver accounts (approve, reject, suspend, restore), plus payments, users and platform dashboards.",
      "Drivers upload bills of lading and pickup/delivery proof; shippers get invoices and rate drivers after delivery.",
      "Live driver locations on a map with Mapbox geocoding, and revenue, volume and earnings charts per role.",
      "Express API in Clean Architecture layers with Prisma on Supabase Postgres, JWT auth with refresh-token rotation, Zod validation and file uploads.",
    ],
    url: "https://loadboard-track.vercel.app/",
    kind: "project",
    color: "#7764D8",
  },
  {
    slug: "skill-guild",
    name: "The Skill Guild",
    year: "2026",
    tagline: "Front-end prototype of a homeschool learning platform (client demo)",
    badge: "Front-end prototype",
    stack: ["Next.js", "React Three Fiber", "Framer Motion", "Tailwind CSS"],
    points: [
      "Clickable front end for a client pitch: screens for parents, kids, homeschool co-ops and admins.",
      "Kid-friendly views for courses, quests, rewards and certificates, with 3D scenes in React Three Fiber.",
      "Front end only: built to demo the product before the back end was funded.",
    ],
    kind: "project",
    color: "#F29B1D",
  },
  {
    slug: "rp-billing",
    name: "RP Billing ERP",
    year: "2023",
    tagline: "ERP front end for a 100-person photography company",
    stack: ["React", "Redux", "Tailwind CSS"],
    points: [
      "Front end of an ERP for Reminiscence, a photography company, streamlining event management and collaboration for around 100 members.",
      "Excel-like data grids with complex state so users can manipulate tables and generate dynamic bills.",
      "Custom logic modules mapped to the company's business processes, improving employee efficiency by 30%.",
    ],
    url: "https://www.rpbilling.com/",
    kind: "side",
    color: "#308280",
  },
  {
    slug: "statement-tools",
    name: "Statement Tools",
    year: "2026",
    tagline: "Bank-statement PDFs to CSV and Excel, plus PDF unlocking",
    stack: ["Next.js", "pdf-lib", "unpdf", "SheetJS"],
    points: [
      "Converts bank statements and PDF tables to CSV or Excel.",
      "Unlocks password-protected PDF and Office files you own.",
    ],
    kind: "side",
    color: "#5F6B7A",
  },
  {
    slug: "spade-site",
    image: "/projects/spade-site.jpg",
    name: "Spade Digital USA",
    year: "2026",
    tagline: "Website for a digital product agency",
    stack: ["Next.js", "Framer Motion", "Tailwind CSS"],
    points: ["Marketing site with animated sections and responsive layouts."],
    url: "https://spade-digital-usa.vercel.app/",
    kind: "side",
    color: "#1F1F1F",
  },
  {
    slug: "genxintel",
    image: "/projects/genxintel.jpg",
    name: "GenXIntel 3D",
    year: "2023",
    tagline: "Scroll-driven 3D flight portfolio site",
    stack: ["React Three Fiber", "Three.js", "Vite"],
    points: ["A 3D landing experience: the camera flies through a scene as you scroll."],
    url: "https://gen-xintel-portfolio-flight-r3-f.vercel.app/",
    repo: "https://github.com/SadeeMsr/GenXintel-portfolio-flight-R3F",
    kind: "side",
    color: "#2D7FD6",
  },
  {
    slug: "extensions",
    name: "Browser Extensions",
    year: "2025",
    tagline: "Pixelsack and Boogly, built with WXT and React",
    stack: ["WXT", "React", "TypeScript"],
    points: [
      "Pixelsack: helps designers and developers collect front-end references while browsing.",
      "Boogly: an assistant that explains complex terms on compliance forms.",
    ],
    kind: "side",
    color: "#B34CB3",
  },
  {
    slug: "cloud-security",
    name: "Sensitive Data Security in Cloud",
    year: "2024",
    tagline: "Hybrid cloud infrastructure research on AWS",
    stack: ["AWS VPC", "VPN", "Hybrid Cloud"],
    points: [
      "Secure hybrid cloud infrastructure on AWS designed to navigate geopolitical data challenges.",
      "AWS VPC architecture and VPN for robust data security.",
      "Two phases: a local prototype, then migration to AWS, tackling scalability and real-time data access.",
    ],
    repo: "https://github.com/SadeeMsr/Sensitive-data-security-with-cloud__AWS",
    kind: "research",
    color: "#308280",
  },
];

export type Skill = { name: string; group: string; level: "proficient" | "basic" };

const proficient: [string, string][] = [
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
