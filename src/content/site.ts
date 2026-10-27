// All of the site's personal content lives here. Edit this file to update the site.

export type Project = {
  title: string;
  description: string;
  tech: string[];
  /** Live demo URL, if there is one. */
  href?: string;
  /** Source code URL. */
  repo?: string;
  /** Optional screenshot in /public, e.g. "/projects/my-app.png". */
  image?: string;
  featured?: boolean;
};

export type Job = {
  title: string;
  company: string;
  location: string;
  period: string;
  /** The first few are always shown; the rest sit behind a "more" toggle. */
  bullets: string[];
};

export const site = {
  name: "Graham McCarthy",
  role: "Forward Deployed Engineer",
  tagline:
    "I embed with business teams to turn operational pain points into production software: cloud-native, event-driven, and increasingly AI-powered.",
  location: "Berlin, Germany",
  photo: { src: "/graham-pixel.png", alt: "Pixel-art portrait of Graham McCarthy" },

  about: [
    "I'm a Forward Deployed Engineer with 5+ years of experience building cloud-native, event-driven systems on AWS with TypeScript, Node.js, and React.",
    "At BMW Group I work embedded with business stakeholders, turning operational pain points into production software, more and more of it with AI-powered capabilities. I'm hands-on with LLM-based tooling, from prompt engineering to agentic workflows.",
    "My strengths are distributed systems, platform engineering, and developer productivity.",
  ],

  facts: [
    { label: "Based in", value: "Berlin, Germany" },
    { label: "Role", value: "Forward Deployed Engineer @ BMW" },
    { label: "Experience", value: "5+ years" },
    { label: "Focus", value: "AWS · event-driven · AI" },
  ],

  experience: [
    {
      title: "Forward Deployed Engineer",
      company: "BMW",
      location: "Munich",
      period: "Jun 2026 – Present",
      bullets: [
        "Embed in the Electronics department to understand workflows and define requirements to fully automate multiple flashing processes from a central orchestrator.",
        "Design and maintain broad pipelines that deliver up-to-date business context to LLMs, applications, and beyond.",
        "Integrate AI capabilities into existing systems and event-driven architectures to provide complete coverage and assist users.",
        "Drive architectural decisions for shared services and platform modernization.",
        "Use AI coding assistants to speed up prototyping, testing, and documentation, and help teams adopt them responsibly.",
      ],
    },
    {
      title: "Senior Fullstack Software Engineer",
      company: "in-tech GmbH",
      location: "Berlin",
      period: "Oct 2022 – May 2026",
      bullets: [
        "Designed, developed, and maintained the platform powering the BMW internal application marketplace.",
        "Architected and extended event-driven microservices using AWS Lambda, ECS, EventBridge, API Gateway, ECR, and CloudFormation.",
        "Built scalable backend services in Node.js and TypeScript supporting enterprise-grade application distribution workflows.",
        "Led CI/CD improvements using GitHub Actions and SonarQube, reducing build instability and accelerating delivery cycles.",
        "Used AI coding assistants to accelerate development, test generation, code review, and documentation, and shared effective prompting practices with the team.",
        "Structured service APIs and metadata so the platform's data could be used by AI and automation use cases.",
        "Collaborated with product owners, architects, and engineering teams to deliver secure, high-performance systems across multiple business domains.",
        "Participated in technical design reviews, architectural discussions, and code reviews, helping establish engineering best practices.",
        "Contributed to improving developer productivity through automation, tooling enhancements, and streamlined development workflows.",
      ],
    },
    {
      title: "Fullstack Web Developer",
      company: "Thunder Labs GmbH",
      location: "Berlin",
      period: "Jan 2021 – Jul 2022",
      bullets: [
        "Contributed to a large-scale real-time communication platform using React, TypeScript, and Node.js.",
        "Developed reusable frontend components and features that improved consistency and maintainability across the product.",
        "Helped improve frontend architecture and development workflows in a fast-paced product environment.",
        "Collaborated closely with designers and engineers to deliver responsive, user-focused experiences.",
        "Participated in agile delivery and code reviews, contributing to code quality and team productivity.",
      ],
    },
  ] satisfies Job[],

  skillGroups: [
    { name: "Languages", items: ["TypeScript", "JavaScript", "Kotlin", "SQL", "YAML"] },
    {
      name: "Cloud & Infrastructure",
      items: ["AWS Lambda", "ECS", "ECR", "EventBridge", "SQS", "SNS", "Step Functions", "API Gateway", "CloudFormation", "AWS CDK"],
    },
    { name: "Backend", items: ["Node.js", "Express", "GraphQL", "Firebase"] },
    { name: "Frontend", items: ["React", "Redux", "Vue.js", "Vuex", "HTML", "CSS"] },
    { name: "Databases", items: ["PostgreSQL", "MongoDB", "Firestore"] },
    { name: "DevOps & Quality", items: ["GitHub Actions", "SonarQube", "Jest", "Cypress"] },
    { name: "Tools & Frameworks", items: ["Git", "AG Grid", "Bootstrap", "Ant Design", "Ionic"] },
  ],

  education: [
    { name: "B.Sc. Actuarial Science", school: "University of Illinois at Urbana-Champaign" },
    { name: "Full Stack Open", school: "University of Helsinki" },
    { name: "Web Developer Bootcamp", school: "Colt Steele" },
  ],

  spokenLanguages: [
    { name: "English", level: "Native", bars: 5 },
    { name: "German", level: "Fluent (C1 certified)", bars: 4 },
    { name: "Spanish", level: "Intermediate (B2)", bars: 3 },
  ],

  links: {
    // Base64-encoded so the address isn't scrapeable from the repo or page HTML.
    // To change it, run: printf '%s' 'you@example.com' | base64
    emailEncoded: "Z3JhaGFtaGVpbnptY2NhcnRoeUBnbWFpbC5jb20=",
    github: "https://github.com/RanchHowards",
    linkedin: "https://www.linkedin.com/in/graham-mccarthy",
  },
};

// Add new projects here. Featured projects are shown first and larger.
export const projects: Project[] = [];
