import { Hero } from "./hero"
import { EventsPreview } from "./events-preview"
import { ProjectsPreview } from "./projects-preview"
import { HistoryTimeline } from "./history-timeline"

const timelineEvents = [
  {
    year: 2018,
    heading: "AN IDEA IS BORN",
    description: "Alexander Jacobsen came to Filip Matz with an idea: Why don't we establish an organization to build the community of students interested in AI at KTH? Together, they planted the seeds for this vision, acting with conviction that through this, us students can impact the future of AI.",
    image: "/images/history/placeholder-01.jpg",
    imageAlt: "KTH AI Society founding",
  },
  {
    year: 2019,
    heading: "ESTABLISHED AND UP TO SPEED",
    description: "A core team is recruited and several projects are planned and executed. Plenty of interest is seen in the student community, and participants give lots of positive feedback. KTHAIS quickly became the fastest growing organisation at KTH.",
    image: "/images/history/placeholder-02.jpg",
    imageAlt: "KTH AI Society growth",
  },
  {
    year: 2020,
    heading: "FIRST FULL-DAY EVENT: AI DAY",
    description: "Over 150 students attended KTHAIS flagship event at the KTH union hall Nymble. Workshops with Ericsson and Accenture, panel discussions with AI Startups and meeting Furhat, the social robot from Furhat Robotics. A long-term partnership with McKinsey & Company as sponsor was signed.",
    image: "/images/history/placeholder-03.jpg",
    imageAlt: "AI Day 2020",
  },
  {
    year: 2021,
    heading: "NEW TEAM AND IMPROVED APPROACH",
    description: "2021 elections brought together a strong team of volunteers in three teams: Business Relations & Communications, IT & Operations, and Education. Together, they work on growing the society, strengthening the core, formalizing relations and collaborations, and leaning into the opportunities on distance with a push for online content.",
    image: "/images/history/placeholder-01.jpg",
    imageAlt: "KTH AI Society team 2021",
  },
  {
    year: 2022,
    heading: "EXPANDING IMPACT ON CAMPUS",
    description:
      "KTH AI Society broadened its activities with more frequent workshops, lunch lectures, and collaborations with industry partners in Stockholm. The community continued to grow, with increasing attendance at events and a stronger presence in KTH student life.",
    image: "/images/history/placeholder-02.jpg",
    imageAlt: "KTH AI Society events 2022",
  },
  {
    year: 2023,
    heading: "AI WEEK WITH SUNDAR PICHAI",
    description:
      "Our AI Week began with the co-organization of an event with Google CEO Sundar Pichai. Our Chairman engaged in a discussion together with Sundar Pichai and Swedish Prime Minister Ulf Kristersson, followed by a fireside chat moderated by KTH Innovation and KTH Professor Danica Kragic. Later in the week, we hosted several events with companies including SiloAI, Modulai, and our sponsors QuantumBlack.",
    image: "/images/history/placeholder-04.jpg",
    imageAlt: "AI Week 2023 with Sundar Pichai",
  },
  {
    year: 2024,
    heading: "STRENGTHENING THE ORGANIZATION",
    description:
      "The society focused on formalizing internal structures through annual meetings and updated statutes, while onboarding a new generation of board members and volunteers. Partnerships with existing sponsors were maintained and deepened, and the society continued to serve as a bridge between students and AI-focused companies in Stockholm.",
    image: "/images/history/placeholder-03.jpg",
    imageAlt: "KTH AI Society board 2024",
  },
  {
    year: 2025,
    heading: "TOWARDS A BROADER AI ECOSYSTEM",
    description:
      "With nearly 3,000 community members and a growing network beyond KTH, the society played an active role in the wider Nordic AI ecosystem. Through co-hosted hackathons, joint events with tech and venture partners, and participation in regional AI initiatives, KTH AI Society positioned itself as a key student voice in the future of AI.",
    image: "/images/history/placeholder-02.jpg",
    imageAlt: "KTH AI Society in the Nordic AI ecosystem",
  },
  
];

export function Homepage() {
  return (
    <main className="flex min-h-screen flex-col">
      <Hero />
      <EventsPreview />
      <HistoryTimeline
        title="OUR HISTORY"
        introText="KTH AI Society has a rich history of building the AI community at KTH, bringing together students, industry leaders, and innovators to shape the future of artificial intelligence."
        events={timelineEvents}
        defaultYear={2023}
      />
      <ProjectsPreview />
      
    </main>
  )
}
