"use client"

import { useState, useEffect, useRef } from "react"
import { AsciiGrid } from "@/components/ui/ascii-grid"
import { ChevronLeft, ChevronRight } from "lucide-react"

const slides = [
  {
    title: "Why We Exist",
    highlight: "Why",
    text: "We exist to empower the emerging voices within AI.",
  },
  {
    title: "What We Do",
    highlight: "What",
    text: "We organize workshops, hackathons, company visits, guest lectures, research projects, and flagship events  all designed and run by students, for students.",
  },
  {
    title: "How We Do It",
    highlight: "How",
    text: "We aspire to be a knowledge hub by offering resources and insigthsfor deep exploration, We bring together diverse perspectives, talents, and experiences, We also actively promote the voices of our members, providing a platform for them to express their insigths, concerns, and aspirations.",
  },
]

const timelineData = [
  {
    year: 2020,
    title: "First AI Day",
    description: "150+ students joined our first full-day event at Nymble with Ericsson, Accenture, and Furhat Robotics.",
    image: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=800&q=80",
  },
  {
    year: 2021,
    title: "Growth & New Teams",
    description: "New board elected. Formed three dedicated teams and launched AI Day on Tour.",
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80",
  },
  {
    year: 2022,
    title: "Meeting Sundar Pichai",
    description: "Our Chairman participated in a historic AI discussion with Google CEO Sundar Pichai and Swedish Prime Minister Ulf Kristersson in Stockholm.",
    image: "img/Sundar.jpg",  
  },
  {
    year: 2023,
    title: "AI Week & Beyond",
    description: "Hosted AI Week with Silo AI, Modulai, and QuantumBlack. Launched student research initiatives.",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80",
  },
]

export default function AboutUsPage() {
  const [asciiMask, setAsciiMask] = useState<string | undefined>(undefined)
  const [selectedYear, setSelectedYear] = useState<number>(2022)
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    const canvas = document.createElement("canvas")
    canvas.width = 1400
    canvas.height = 500
    const ctx = canvas.getContext("2d")
    if (!ctx) return
    ctx.fillStyle = "white"
    ctx.font = "bold 220px system-ui, sans-serif"
    ctx.textBaseline = "top"
    ctx.fillText("ABOUT US", 60, 60)
    setAsciiMask(canvas.toDataURL())
  }, [])

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length)
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
  const selectedEvent = timelineData.find((e) => e.year === selectedYear)

  return (
    <>
      {/* ABOUT US SECTION */}
      <section className="relative bg-white pt-64 pb-24 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <AsciiGrid
            color="rgba(0,0,0,0.2)"
            cellSize={12}
            logoSrc={asciiMask}
            logoPosition="center"
            logoScale={0.6}
            enableDripping={false}
          />
        </div>
        <div className="container max-w-7xl mx-auto px-6 relative z-10">
          <p className="text-3xl mb-2 tracking-tighter">
            <span className="font-serif text-primary">(Our)</span> Story
          </p>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tighter">About Us</h1>
          <p className="text-lg md:text-xl max-w-2xl leading-relaxed font-serif text-gray-700">
            KTH AI Society is a student-driven community dedicated to exploring, learning, and shaping the future of artificial intelligence,together.
          </p>
        </div>
      </section>

      {/* WHY / WHAT / HOW SLIDER (Times New Roman + sans-serif mix) */}
      <section className="py-24 bg-gradient-to-b from-white to-neutral-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="relative">
            <div
              className="flex transition-transform duration-700 ease-in-out"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {slides.map((slide, i) => (
                <div key={i} className="w-full flex-shrink-0 px-8">
                  <div className="text-center max-w-4xl mx-auto">
                    
                    <h2 className="text-5xl md:text-7xl font-normal leading-tight mb-8" style={{ fontFamily: "'Times New Roman', Times, serif" }}>
                      <span className="text-primary font-bold">{slide.highlight}</span>
                      {slide.title.replace(slide.highlight, "")}
                    </h2>
                    <p className="text-lg md:text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
                      {slide.text}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Arrows */}
            <button onClick={prevSlide} className="absolute left-0 top-1/2 -translate-y-1/2 bg-white shadow-lg rounded-full p-3 hover:scale-110 transition">
              <ChevronLeft className="w-7 h-7" />
            </button>
            <button onClick={nextSlide} className="absolute right-0 top-1/2 -translate-y-1/2 bg-white shadow-lg rounded-full p-3 hover:scale-110 transition">
              <ChevronRight className="w-7 h-7" />
            </button>

            {/* Dots */}
            <div className="flex justify-center gap-3 mt-12">
              {slides.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentSlide(i)}
                  className={`h-2 rounded-full transition-all ${i === currentSlide ? "w-8 bg-primary" : "w-2 bg-gray-300"}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* OUR JOURNEY */}
      <section className="py-28 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-3xl mb-3 tracking-tighter text-center">
            <span className="font-serif text-primary">(Our)</span> Journey
          </p>
          <h2 className="text-5xl md:text-7xl font-bold text-center mb-16 tracking-tighter">
            Timeline
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">
            <div className="space-y-4">
              {timelineData.map((item) => (
                <button
                  key={item.year}
                  onClick={() => setSelectedYear(item.year)}
                  className={`block w-full text-left text-xl font-medium py-3 px-5 rounded-lg transition ${
                    selectedYear === item.year
                      ? "text-primary bg-primary/5 font-semibold"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  {item.year}
                </button>
              ))}
            </div>

            <div className="lg:col-span-3">
              {selectedEvent && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
                  <div>
                    <h3 className="text-5xl font-bold text-primary mb-3">{selectedEvent.year}</h3>
                    <h4 className="text-2xl md:text-3xl font-bold mb-5">{selectedEvent.title}</h4>
                    <p className="text-base md:text-lg text-gray-700 leading-relaxed">{selectedEvent.description}</p>
                  </div>
                  <div className="rounded-2xl overflow-hidden shadow-xl">
                    <img
                      src={selectedEvent.image}
                      alt={selectedEvent.title}
                      className="w-full h-80 object-cover"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

    </>
  )
}