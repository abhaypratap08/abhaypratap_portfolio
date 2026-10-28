export const profile = {
  name: 'Abhay Pratap Singh',
  role: 'Computer Science and Engineering Student',
  headline: 'Backend Development · System Design · Applied AI',
  email: '',
  phone: '',
  github: 'https://github.com/abhaypratap08',
  linkedin: 'https://www.linkedin.com/in/abhaypratap08/',
  location: 'Galgotias University',
  availability: 'Focused on backend engineering',
  summary: 'I\'m a Computer Science and Engineering student at Galgotias University, interested in building reliable backend systems, useful developer tools, and AI-powered applications.',
  about: 'My work spans Java and Spring Boot, REST APIs, databases, Python, and Linux. I\'m particularly interested in how software systems are designed, how APIs behave under real-world conditions, and how AI can make complex information more accessible.\n\nI enjoy working across the stack when needed, but my primary focus is backend engineering: designing clear interfaces, structuring application logic, handling errors, testing behavior, and understanding the systems beneath the code.\n\nOutside application development, I experiment with Arch Linux, desktop customization, shell workflows, and developer tooling.',
  workingToward: 'Developing strong backend engineering and system design fundamentals.\nBuilding practical applications that solve real problems.\nExploring AI integration and data-driven software.\nImproving through algorithmic problem solving and hands-on experimentation.',
  principle: 'I believe in understanding how things work, learning from what breaks, and building better systems one iteration at a time.',
};

export const experience = [];

export const education = [
  {
    degree: 'B.Tech, Computer Science and Engineering',
    school: 'Galgotias University',
    period: '2024 – 2028',
    detail: 'CGPA: 8.65',
  },
  {
    degree: 'Senior Secondary (Class XII)',
    school: 'Premier Pre-University',
    period: '2020 – 2022',
    detail: '92%',
  },
  {
    degree: 'Secondary (Class X)',
    school: 'Amrita Vidyalayam',
    period: '2019 – 2020',
    detail: '81%',
  },
];

export const projects = [
  {
    title: 'TypeGym',
    description: 'A multiplayer typing race app for people who want to get sharper without it feeling boring.',
    tech: ['TypeScript', 'Next.js'],
    detail: '18 stars · 1 fork',
    link: 'https://github.com/abhaypratap08/TypeGym',
    live: 'https://typegym-io.vercel.app',
  },
  {
    title: 'Photon',
    description: 'A lightweight image viewer built with C and SDL2.',
    tech: ['C', 'SDL2'],
    detail: '8 stars',
    link: 'https://github.com/abhaypratap08/ImageViewer_UsingC',
  },
  {
    title: 'LNXX',
    description: 'A terminal UI trainer for learning Linux and Vim without leaving the terminal.',
    tech: ['Python', 'TUI'],
    detail: '4 stars',
    link: 'https://github.com/abhaypratap08/LNXX',
  },
  {
    title: 'InternX',
    description: 'An AI-powered internship and job recommendation platform. It analyzes a student\'s resume with an LLM pipeline, builds a structured candidate profile, and ranks opportunities by relevance.',
    tech: ['Python', 'FastAPI', 'Ollama', 'Gemma', 'Node.js'],
    detail: '1 star · 1 fork',
    link: 'https://github.com/abhaypratap08/InternX',
  },
  {
    title: 'IntervueX',
    description: 'An AI-assisted platform for technical interview preparation.',
    tech: ['React', 'Next.js', 'Node.js'],
    detail: '1 star',
    link: 'https://github.com/abhaypratap08/IntervueX',
  },
  {
    title: 'SIH-WeatherGPT',
    description: 'An AI weather platform with chat as the main interface. Forked from mbsurya19122004/SIH-WeatherGPT.',
    tech: ['Java'],
    detail: 'Smart India Hackathon',
    link: 'https://github.com/abhaypratap08/SIH-WeatherGPT',
    live: 'https://sih-weather-gpt.vercel.app',
  },
];

export const skills = [
  { group: 'Backend', items: ['Java', 'Spring Boot', 'REST APIs'] },
  { group: 'Data', items: ['Databases', 'Data-driven software'] },
  { group: 'Languages & Systems', items: ['Python', 'Linux', 'Arch Linux'] },
  { group: 'Focus Areas', items: ['System Design', 'Applied AI', 'API Reliability', 'Testing'] },
];

export const certifications = [
  {
    title: 'Gemini Multimodality & Multimodal RAG Skill Badge',
    issuer: 'Google Cloud',
    period: 'February 2026',
  },
  {
    title: 'Prompt Design in Vertex AI Skill Badge',
    issuer: 'Google Cloud',
    period: 'February 2026',
  },
  {
    title: 'Red Hat System Administration I (RH124), Ver. 9.3',
    issuer: 'Red Hat',
    period: 'May 2026',
  },
  {
    title: 'Getting Started with Linux Fundamentals (RH104), Ver. 9.1',
    issuer: 'Red Hat',
    period: 'May 2026',
  },
];

export const initialPortfolioData = {
  profile,
  experience,
  education,
  projects,
  skills,
  certifications,
};
