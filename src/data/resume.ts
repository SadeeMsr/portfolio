// Single source of truth for every view: desktop apps, mobile apps,
// the terminal and Recruiter Mode all read from here.

export const profile = {
  name: "Md Shadi Rohan",
  shortName: "Rohan",
  handle: "rohan",
  title: "Full-Stack Software Developer",
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
    "Full-stack developer who builds Next.js and Node.js products end to end, from Postgres schemas and AWS infrastructure to dashboards people actually enjoy using. I've shipped an LMS used by around 1,000 people, a school platform that runs daily in 10 classes, and ERP tooling for a 100-person team.",
  highlights: [
    { value: "2+ yrs", label: "shipping production software" },
    { value: "~1,000", label: "active users on an LMS I built" },
    { value: "10", label: "classes running on my school platform" },
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
    company: "Spade Digital",
    role: "Software Developer",
    period: "Jun 2024 – Jul 2026",
    location: "Dhaka, Bangladesh",
    version: "2.0 LTS",
    codename: "Spade",
    points: [
      "Built Barnyard Recs, a cloud-based (AWS) LMS serving around 1,000 active users, with session booking, Stripe payments and CometChat for real-time chat and video.",
      "Architected the back end with timezone support, custom dashboards and role-based access via Clerk, improving booking and profile management.",
      "Integrated Meta Pixel and Google Analytics, boosting engagement by 60%.",
    ],
    stack: ["Next.js", "TypeScript", "AWS", "Stripe", "Clerk", "CometChat"],
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
  kind: "project" | "research";
  color: string;
};

export const projects: Project[] = [
  {
    slug: "sonamukh",
    name: "Sonamukh School Management",
    year: "2026",
    tagline: "End-to-end school platform, live in 10 classes",
    stack: ["Next.js", "TypeScript", "Prisma", "PostgreSQL", "Supabase", "Tailwind CSS"],
    points: [
      "Bilingual public site plus role-based dashboards for operators, teachers, students and parents, secured by JWT sessions and middleware.",
      "PostgreSQL schema with Prisma for a class → shift → section hierarchy, online admissions, enrolment, user histories and attendance/progress records.",
      "Used daily for admissions, attendance, reports and class management, replacing paper records and cutting routine admin time.",
      "Operators manage notices, gallery media and school magazines with Supabase Storage uploads and homepage publishing controls.",
    ],
    url: "https://www.sonamukh.org/",
    kind: "project",
    color: "#3EB34F",
  },
  {
    slug: "barnyard-recs",
    name: "Barnyard Recs",
    year: "2024–2026",
    tagline: "AWS-hosted LMS with bookings, payments and live video",
    stack: ["Next.js", "AWS", "Stripe", "Clerk", "CometChat"],
    points: [
      "Session booking, Stripe payments and CometChat real-time chat/video for around 1,000 active users.",
      "Timezone-aware back end, custom dashboards and role-based access via Clerk.",
      "Analytics with Meta Pixel and Google Analytics: +60% engagement.",
    ],
    url: "https://www.barnyardrecs.com/",
    kind: "project",
    color: "#E95420",
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
    kind: "project",
    color: "#0073E5",
  },
  {
    slug: "wozaef",
    name: "Wozaef Job Portal",
    year: "2024",
    tagline: "Serverless job portal on AWS (Doodle Inc.)",
    stack: ["AWS Amplify", "AppSync", "Lambda", "DynamoDB", "GraphQL", "Next.js"],
    points: [
      "User profiles, job posting, and advanced cascading search and filters.",
      "Serverless back end on Amplify, AppSync, Lambda and DynamoDB.",
    ],
    kind: "project",
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
  ["Redux", "Frontend"],
  ["Tailwind CSS", "Frontend"],
  ["Node.js", "Backend"],
  ["Express", "Backend"],
  ["REST APIs", "Backend"],
  ["GraphQL", "Backend"],
  ["WebSockets", "Backend"],
  ["PostgreSQL", "Database"],
  ["SQL", "Database"],
  ["AWS", "Cloud"],
  ["Git", "Tooling"],
];
const basic: [string, string][] = [
  ["C++", "Language"],
  ["Java", "Language"],
  ["Dart", "Language"],
  ["Flutter", "Mobile"],
];

export const skills: Skill[] = [
  ...proficient.map(([name, group]) => ({ name, group, level: "proficient" as const })),
  ...basic.map(([name, group]) => ({ name, group, level: "basic" as const })),
];
