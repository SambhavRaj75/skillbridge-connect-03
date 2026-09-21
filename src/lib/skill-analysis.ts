import { openings, type Opening } from "./socket-data";

export type Track = {
  id: string;
  name: string;
  blurb: string;
  skills: string[];
};

export const tracks: Track[] = [
  {
    id: "data",
    name: "Data & Analytics",
    blurb: "Pipelines, warehousing and decision analytics roles.",
    skills: ["python", "sql", "spark", "airflow", "pandas", "excel", "r", "statistics", "power bi", "tableau"],
  },
  {
    id: "ai",
    name: "AI / Machine Learning",
    blurb: "Model building, evaluation and Gen-AI product work.",
    skills: ["python", "pytorch", "tensorflow", "llms", "nlp", "mlops", "evals", "machine learning", "prompting"],
  },
  {
    id: "web",
    name: "Product & Frontend Engineering",
    blurb: "User-facing product engineering across web apps.",
    skills: ["react", "typescript", "javascript", "html", "css", "next.js", "ui", "figma", "tailwind"],
  },
  {
    id: "cloud",
    name: "Cloud & DevOps",
    blurb: "Infrastructure, deployment and reliability engineering.",
    skills: ["aws", "azure", "gcp", "docker", "kubernetes", "terraform", "linux", "ci/cd", "devops"],
  },
  {
    id: "embedded",
    name: "Embedded & Hardware",
    blurb: "Firmware, control systems and silicon design roles.",
    skills: ["c", "c++", "rtos", "embedded", "vlsi", "verilog", "microcontroller", "matlab", "pcb"],
  },
  {
    id: "bio",
    name: "Life Sciences & Bioprocess",
    blurb: "Lab operations, bioprocess data and quality roles.",
    skills: ["r", "lab ops", "biotech", "chemistry", "bioprocess", "quality", "microbiology"],
  },
];

export type StudentInput = {
  name: string;
  department: string;
  cgpa: string;
  skills: string[];
  interest: string;
  preferredLocation: string;
};

export type TrackScore = { track: Track; score: number; matched: string[]; missing: string[] };

export type Analysis = {
  readiness: number;
  ranked: TrackScore[];
  best: TrackScore;
  matches: { opening: Opening; score: number; matched: string[] }[];
  advice: string[];
};

const norm = (s: string) => s.trim().toLowerCase();

export function parseSkills(raw: string): string[] {
  return Array.from(
    new Set(
      raw
        .split(/[,\n;/|]+/)
        .map(norm)
        .filter(Boolean),
    ),
  );
}

export function analyse(input: StudentInput): Analysis {
  const skills = input.skills.map(norm);
  const has = (s: string) => skills.some((k) => k === s || k.includes(s) || s.includes(k));

  const ranked: TrackScore[] = tracks
    .map((track) => {
      const matched = track.skills.filter(has);
      const missing = track.skills.filter((s) => !has(s)).slice(0, 4);
      let score = (matched.length / track.skills.length) * 100;
      if (input.interest && norm(input.interest) === track.id) score += 18;
      return { track, score: Math.min(100, Math.round(score)), matched, missing };
    })
    .sort((a, b) => b.score - a.score);

  const best = ranked[0]!;

  const matches = openings
    .map((opening) => {
      const matched = opening.skills.filter((s) => has(norm(s)));
      let score = (matched.length / opening.skills.length) * 100;
      if (input.preferredLocation && opening.location === input.preferredLocation) score += 15;
      if (best.track.skills.some((s) => opening.skills.some((o) => norm(o).includes(s)))) score += 10;
      return { opening, score: Math.min(99, Math.round(score)), matched };
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, 4);

  const cgpa = Number.parseFloat(input.cgpa);
  const readiness = Math.max(
    12,
    Math.min(
      98,
      Math.round(best.score * 0.6 + Math.min(skills.length, 10) * 3 + (Number.isFinite(cgpa) ? cgpa * 1.2 : 0)),
    ),
  );

  const advice = [
    `Lead with ${best.track.name.toLowerCase()} on your résumé — it is your strongest signature right now.`,
    best.missing.length
      ? `Close these gaps next term: ${best.missing.join(", ")}.`
      : "You already cover the core stack for this track — go deep with a portfolio project.",
    skills.length < 5
      ? "Add at least five concrete skills or tools; recruiters filter on skill signatures."
      : `Your ${skills.length}-skill profile is broad enough to apply to both internships and placements.`,
  ];

  return { readiness, ranked, best, matches, advice };
}
