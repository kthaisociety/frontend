export interface Contributor {
  name: string
  role: string
  avatar?: string
  email?: string
}

export interface Screenshot {
  image: string
  caption: string
  alt?: string
}

export interface Project {
  id: string
  title: string
  oneLineDescription: string
  shortDescription: string
  category: string
  tags: string[]
  techStack: string[]
  problemImpact: string
  keyFeatures: string[]
  status: string
  coverImage?: string
  coverImageTheme?: "light" | "dark" // Determines text and gradient colors for cover
  screenshots?: Screenshot[]
  repoUrl?: string
  websiteUrl?: string
  contributors: Contributor[]
  affiliations: string
  timeline: {
    startDate: string
    currentPhase: string
    upcomingMilestones: string[]
  }
  maintenancePlan: string
  contact: string
}

export const projects: Project[] = [
  {
    id: "gnosis",
    title: "GNOSIS",
    oneLineDescription: "Exploring OCR and Visual Language Models in the context of complex graph comprehension. Building a modular architecture that can swap out models as well as evaluate their performance on graphs of oil and gas wells.",
    shortDescription: "OCR and Visual Language Models for graph comprehension",
    category: "AI application",
    tags: ["inference", "systems", "python"],
    techStack: ["Python", "Docker", "Protobuf"],
    problemImpact: "Solves the problem of Multimodal and OCR models not comprehending graph and tabular content. OCR models are good at reading text, even when its blurry or grainy, but reading grainy and at times even hand-drawn graphs is even more tricky.\n\n Google's Gemini has become the defacto model for graph comprehension, but as many have noticed, it easily gets pricey. With this said, we believe a potential combination of OCR-models, Visual Language Models and sophisticated scaling, resizing and skewing would be even more efficient.",
    keyFeatures: [
      "Run inference on graphs and plots via API, pick from any of the best benchmarking open source models.",
      "Get insights into the model performance on your particular media, to see which one would be optimal.",
      "Image Preprocessing, which includes denoising and unskewing."
    ],
    status: "In development",
    coverImage: "/gnosis.jpg",
    coverImageTheme: "dark",
    screenshots: [
      {
        image: "/dashboard-gnosis.jpg",
        caption: "Dashboard showing the modular design for model evaluation",
        alt: "GNOSIS system architecture diagram"
      },
      {
        image: "/gnosis-diagram.jpg",
        caption: "GNOSIS architecture overview showing the modular design for model evaluation",
        alt: "GNOSIS system architecture diagram"
      }
    ],
    repoUrl: "https://github.com/kthaisociety/gnosis/",
    contributors: [
      { name: "Niklavs Visockis", role: "Tech Lead" },
      { name: "Georg Zsolnai", role: "Backend" },
      { name: "Michael Yu", role: "Backend" },
      { name: "Sebastian Schmülling", role: "Inference" },
      { name: "Elias Lindstenz", role: "Inference" },
      { name: "Giulio Altomari", role: "Fullstack" }
    ],
    affiliations: "Wellvector",
    timeline: {
      startDate: "2025-11-01",
      currentPhase: "In development",
      upcomingMilestones: [
        "Deployment",
        "Evaluation suite",
        "Public API Access"
      ]
    },
    maintenancePlan: "The goal is to deploy as pay-per-use with no profit, publish as docker image and separate evaluation components into an eval suite for visual AI.",
    contact: "niklavs@kthais.com"
  },
  {
    id: "twiga",
    title: "Twiga",
    oneLineDescription: "Empowering Tanzanian education with AI",
    shortDescription: "AI-powered educational tool for Tanzanian teachers",
    category: "AI application",
    tags: ["education", "python", "research"],
    techStack: ["Python", "FastAPI", "Postgres", "Docker", "LLM", "OCR", "RAG"],
    problemImpact: "Teachers in Tanzania often spend too much time searching for accurate, syllabus-aligned materials and creating exercises from scratch. We provide an online tool that understands the syllabus, so teachers can prepare better lessons, check information quickly, and generate exercises in seconds.",
    keyFeatures: [
      "Excellence in STEM subjects",
      "Adaptation to Tanzanian context",
      "Super-fast responses"
    ],
    status: "Public beta, launching live in January",
    coverImage: "/cover-twiga.jpg",
    coverImageTheme: "light",
    screenshots: [
      {
        image: "/twiga-screenshot.jpg",
        caption: "Twiga interface showing AI-powered teaching assistance",
        alt: "Twiga application screenshot"
      },
      {
        image: "/twiga-marketing.jpg",
        caption: "Twiga empowering Tanzanian education with AI",
        alt: "Twiga marketing overview"
      }
    ],
    websiteUrl: "https://twiga.ai.or.tz/",
    repoUrl: "https://github.com/Tanzania-AI-Community/twiga",
    contributors: [
      { name: "Álvaro Mazcuñán Herreros", role: "Tech Lead" },
      { name: "Ben Temming", role: "AI Engineer" },
      { name: "Silvia Mosca", role: "AI Engineer" },
      { name: "Simon Habte", role: "AI Engineer" },
      { name: "Johan Liu", role: "AI Engineer" },
      { name: "Erik Boustedt", role: "AI Engineer" }
    ],
    affiliations: "Tanzania AI Lab & Community, AaltoAI",
    timeline: {
      startDate: "2024",
      currentPhase: "Scaling to more subjects, include audio and images as possible input, onboard 30+ teachers",
      upcomingMilestones: [
        "Cover all Tanzanian curriculum",
        "Onboard +100 teachers",
        "Support multi-format input and output"
      ]
    },
    maintenancePlan: "The tech is responsibility of the KTH AI Society, while adoption belongs to the Tanzanian AI Community",
    contact: "communications@ai.or.tz"
  },
  {
    id: "pyrmit",
    title: "Pyrmit",
    oneLineDescription: "Land development legal agent",
    shortDescription: "AI agent for fast-tracking land development legal compliance",
    category: "AI Agent",
    tags: ["python", "fastapi", "langchain", "docker"],
    techStack: ["Python", "FastAPI", "LangChain", "Docker", "Next.js"],
    problemImpact: "**Problem:** How do you fast-track land development by ensuring consistency with the surrounding legal frameworks throughout the planning process?\n\n**Solution:** Plug and play legal agent to be used by land developers. Future part of the VillageOS™ at ReGen Villages.",
    keyFeatures: [
      "Legal Agent: An autonomous agent capable of interpreting legal language regarding land use.",
      "Regulatory Lookup: Instant access to surrounding legal frameworks and zoning laws.",
      "Automatic Ingestion Pipeline: Automatically processes regulatory data for the AI model."
    ],
    status: "In development",
    coverImage: "/cover-pyrmit.jpg",
    coverImageTheme: "light",
    screenshots: [
      {
        image: "/pyrmit-screenshot.jpg",
        caption: "Pyrmit interface showing legal agent in action",
        alt: "Pyrmit application screenshot"
      }
    ],
    repoUrl: "https://github.com/kthaisociety/pyrmit",
    contributors: [
      { name: "Jonas Lorenz", role: "Tech Lead", email: "jonas@kthais.com" },
      { name: "Selsabeel Mohamed", role: "Developer" },
      { name: "Nina Kasimova", role: "Developer" },
      { name: "Harjodh Singh", role: "Developer" },
      { name: "Daniel Eriksson", role: "Developer" }
    ],
    affiliations: "Contribution to the VillageOS™ open-source platform, in collaboration with Dr. James Ehrlich at Stanford",
    timeline: {
      startDate: "2025-11-01",
      currentPhase: "Unify resource ingestion across document types, Building first agentic features",
      upcomingMilestones: [
        "Preliminary resource ingestion",
        "Unified resource ingestion across document types",
        "First agentic features"
      ]
    },
    maintenancePlan: "Active development and maintenance by KTH AI Society team",
    contact: "jonas@kthais.com"
  },
  {
    id: "topovision",
    title: "TopoVision",
    oneLineDescription: "Extracting topographical data from maps using computer vision",
    shortDescription: "Automated conversion of 2D topographical maps into 3D digital assets using deep learning",
    category: "Research",
    tags: ["research", "machine learning", "pytorch"],
    techStack: ["Python", "PyTorch"],
    problemImpact: "Current architectural and civil engineering workflows face a significant bottleneck: converting 2D topographical maps (contour lines) into usable 3D digital assets. This process often requires tedious manual data entry or fragile procedural generation tools, slowing down site analysis and environmental simulations. TopoVision solves this by automating the translation of static height curve maps into dynamic 3D meshes. For Architects/Engineers: drastic reduction in hours spent digitizing land plots. For ReGen Villages: accelerates the work of designing self-sustaining communities by allowing rapid analysis of different land plots for flood risks, solar exposure, and terraforming needs.",
    keyFeatures: [
      "Computer Vision Pipeline: Utilizes deep learning (PyTorch) to interpret height curves and visual features from standard image inputs (JPG/PNG).",
      "Synthetic Training Pipeline: Overcomes data scarcity by leveraging a custom-built synthetic map generator to train the model on diverse topographical scenarios.",
      "2D-to-3D Reconstruction: Directly outputs a 3D elevation model (Digital Elevation Model or Mesh) from a single 2D input image."
    ],
    status: "In development",
    coverImage: "/cover-topovision.jpg",
    coverImageTheme: "dark",
    screenshots: [
      {
        image: "/topovision-screenshot.jpg",
        caption: "TopoVision synthetic map generation and 3D reconstruction - integrated into ReGen VillageOS for landscape rendering",
        alt: "TopoVision topographical map processing for ReGen VillageOS"
      }
    ],
    repoUrl: "https://github.com/mattiaskvist/topovision",
    contributors: [
      { name: "Mattias Kvist", role: "Research Lead", email: "mattias@kthais.com" },
      { name: "Erik Lidman Hillbom", role: "Researcher" },
      { name: "Edoardo de Cal", role: "Researcher" }
    ],
    affiliations: "ReGen Villages",
    timeline: {
      startDate: "2025-11-24",
      currentPhase: "Development and research phase",
      upcomingMilestones: [
        "Complete synthetic training pipeline",
        "Optimize 2D-to-3D reconstruction algorithm",
        "Project completion by Jan 31, 2025"
      ]
    },
    maintenancePlan: "Research project with active development by KTH AI Society team in collaboration with ReGen Villages",
    contact: "mattias@kthais.com"
  }
]

export function getProjectById(id: string): Project | undefined {
  return projects.find(project => project.id === id)
}

export function getProjectsByTag(tag: string): Project[] {
  return projects.filter(project => 
    project.tags.some(t => t.toLowerCase() === tag.toLowerCase())
  )
}

export function getAllTags(): string[] {
  return Array.from(new Set(projects.flatMap(p => p.tags))).sort()
}
