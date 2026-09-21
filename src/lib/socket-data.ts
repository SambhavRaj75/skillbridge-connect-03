export type OpeningType = "Internship" | "Placement" | "Project";

export type Opening = {
  id: string;
  title: string;
  company: string;
  location: "Bengaluru" | "Pune" | "Remote" | "Hyderabad";
  type: OpeningType;
  meta: string;
  pay: string;
  stipendPerMonth: number;
  skills: string[];
};

export const openings: Opening[] = [
  {
    id: "tcs-data-eng",
    title: "Data Engineering Intern",
    company: "TCS",
    location: "Bengaluru",
    type: "Internship",
    meta: "6 mo",
    pay: "₹45k / mo",
    stipendPerMonth: 45000,
    skills: ["Spark", "Airflow"],
  },
  {
    id: "zoho-frontend",
    title: "Frontend Engineer",
    company: "Zoho",
    location: "Pune",
    type: "Placement",
    meta: "Full-time",
    pay: "₹8.5 LPA",
    stipendPerMonth: 70000,
    skills: ["React", "TypeScript"],
  },
  {
    id: "bosch-embedded",
    title: "Embedded Systems Trainee",
    company: "Bosch",
    location: "Bengaluru",
    type: "Project",
    meta: "4 mo",
    pay: "₹30k / mo",
    stipendPerMonth: 30000,
    skills: ["C++", "RTOS"],
  },
  {
    id: "infosys-ml",
    title: "ML Research Intern",
    company: "Infosys BPM",
    location: "Remote",
    type: "Internship",
    meta: "Remote",
    pay: "₹50k / mo",
    stipendPerMonth: 50000,
    skills: ["PyTorch", "MLOps"],
  },
  {
    id: "hdfc-risk",
    title: "Risk Analytics Intern",
    company: "HDFC Bank",
    location: "Hyderabad",
    type: "Internship",
    meta: "5 mo",
    pay: "₹38k / mo",
    stipendPerMonth: 38000,
    skills: ["SQL", "Python"],
  },
  {
    id: "wipro-cloud",
    title: "Cloud Platform Engineer",
    company: "Wipro",
    location: "Pune",
    type: "Placement",
    meta: "Full-time",
    pay: "₹9.2 LPA",
    stipendPerMonth: 76000,
    skills: ["AWS", "Terraform"],
  },
  {
    id: "cipla-bio",
    title: "Bioprocess Data Project",
    company: "Cipla",
    location: "Bengaluru",
    type: "Project",
    meta: "3 mo",
    pay: "₹28k / mo",
    stipendPerMonth: 28000,
    skills: ["R", "Lab Ops"],
  },
  {
    id: "reliance-genai",
    title: "Gen-AI Product Intern",
    company: "Reliance",
    location: "Remote",
    type: "Internship",
    meta: "6 mo",
    pay: "₹55k / mo",
    stipendPerMonth: 55000,
    skills: ["LLMs", "Evals"],
  },
];

export const skillGaps = [
  { skill: "Python / Data Wrangling", supply: 62, demand: 80, gap: 18 },
  { skill: "Cloud / DevOps", supply: 24, demand: 65, gap: -41 },
  { skill: "Gen-AI Prompting", supply: 16, demand: 74, gap: -58 },
  { skill: "VLSI Design", supply: 55, demand: 64, gap: 9 },
  { skill: "Embedded C / RTOS", supply: 48, demand: 57, gap: -9 },
  { skill: "Product Communication", supply: 71, demand: 62, gap: 9 },
];

export const partners = [
  "HDFC Bank",
  "Wipro",
  "Tata Consultancy",
  "Zoho",
  "Infosys",
  "Bosch",
  "Cipla",
  "Reliance",
];
