"use client"

import * as React from "react"
import Image from "next/image"

import { Badge } from "./ui/badge"
import { StarRating } from "./ui/start"
import { cn } from "@/lib/utils"
import Marquee from "./ui/‎marquee"

const testimonials = [
  {
    id: 1,
    name: "Emily Carter",
    start: 5,
    testimonial:
      "I couldn’t be happier with my loft conversion. The attention to detail and quality of work were outstanding. Refit made the whole process smooth and stress-free!",
    avatar: "/assets/emily.webp",
  },
  {
    id: 2,
    name: "Emily Carter",
    start: 5,
    testimonial:
      "Refit transformed our outdoor space with a beautiful garden path. The work was completed on time, and the finish is excellent. A great team to work with!",
    avatar: "/assets/emily.webp",
  },
  {
    id: 3,
    name: "Emily Carter",
    start: 5,
    testimonial:
      "I couldn’t be happier with my loft conversion. The attention to detail and quality of work were outstanding. Refit made the whole process smooth and stress-free!",
    avatar: "/assets/emily.webp",
  },
  {
    id: 4,
    name: "Emily Carter",
    start: 5,
    testimonial:
      "I couldn’t be happier with my loft conversion. The attention to detail and quality of work were outstanding. Refit made the whole process smooth and stress-free!",
    avatar: "/assets/emily.webp",
  },
  {
    id: 5,
    name: "Emily Carter",
    start: 5,
    testimonial:
      "I couldn’t be happier with my loft conversion. The attention to detail and quality of work were outstanding. Refit made the whole process smooth and stress-free!",
    avatar: "/assets/emily.webp",
  },
  {
    id: 6,
    name: "Emily Carter",
    start: 5,
    testimonial:
      "Brilliant service from start to finish. The team was professional, communicative, and the results exceeded my expectations. My new bathroom looks amazing!",
    avatar: "/assets/emily.webp",
  },
]

export default function Testimonials() {
  return (
    <section id="testimonials" className="flex justify-center items-center py-12 sm:py-16 md:py-20">
      <div className="h-full w-full ">
        <div className="flex justify-center items-center">
          <Badge className="rounded-full text-sm sm:text-md font-regular text-center">Testimonials</Badge>
        </div>

        <h2 className="mb-4 mt-2 text-3xl sm:text-4xl md:text-5xl font-medium text-center tracking-tight  lg:mx-auto">
          Hear from our clients
        </h2>
        <p className="mb-12 sm:mb-16 md:mb-24 text-base sm:text-lg md:text-xl font-normal leading-[170%] text-center lg:max-w-[640px] lg:mx-auto">
          Hear from our happy clients about their experience working with Refit and the quality of our craftsmanship.
        </p>

        {/* ≥1024: Double Marquee */}
        <div className="relative hidden lg:block">
          <div className="pointer-events-none z-10 absolute left-0 inset-y-0 w-[15%]" />
          <div className="pointer-events-none z-10 absolute right-0 inset-y-0 w-[15%]" />

          <Marquee pauseOnHover className="[--duration:20s]">
            <TestimonialRow items={testimonials} toneStart={0} />
          </Marquee>
          <Marquee pauseOnHover reverse className="mt-0 [--duration:20s]">
            <TestimonialRow items={testimonials} toneStart={1} />
          </Marquee>
        </div>

        <div className="block lg:hidden">
          <MobileCarousel items={testimonials} />
        </div>
      </div>
    </section>
  )
}

/* ===== Row ===== */
function TestimonialRow({
  items,
  toneStart = 0,
}: {
  items: typeof testimonials
  toneStart?: number
}) {
  return (
    <>
      {items.map((t, i) => (
        <TestimonialCard
          key={t.id}
          data={t}
          altTone={((i + toneStart) % 2) === 0 ? "gray" : "white"}
          className="mx-2 w-[min(90vw,420px)] sm:w-[min(80vw,360px)]"
        />
      ))}
    </>
  )
}

/* ===== Card ===== */
function TestimonialCard({
  data,
  altTone = "gray",
  className,
}: {
  data: (typeof testimonials)[number]
  altTone?: "gray" | "white"
  className?: string
}) {
  const bg = altTone === "gray" ? "bg-[#E6E6E6]" : "bg-[#FAFAFA]"

  return (
    <div className={cn("rounded-xl p-4 sm:p-6 ring-1 ring-[#DBDAD9] shadow-sm", bg, className)}>
      <StarRating value={data.start} activeColor="text-primary" readOnly />
      <p className="mt-2 text-sm sm:text-base font-regular leading-6">{data.testimonial}</p>
      <div className="mt-4 sm:mt-7 flex items-center gap-3 sm:gap-4">
        <Image
          src={data.avatar}
          alt={data.name}
          width={40}
          height={40}
          className="rounded-full"
        />
        <p className="text-sm sm:text-base font-regular">{data.name}</p>
      </div>
    </div>
  )
}

/* =========================
   Mobile 
   ========================= */
function MobileCarousel({ items }: { items: typeof testimonials }) {
  const [idx, setIdx] = React.useState(0)
  const [paused, setPaused] = React.useState(false)

  React.useEffect(() => {
    if (!items.length || paused) return;
    const interval = setInterval(() => {
      setIdx((prev) => (prev + 1) % items.length);
    }, 3500);
    return () => clearInterval(interval);
  }, [paused, items.length]);

  const go = (i: number) => {
    setIdx((i + items.length) % items.length);
    setPaused(true); 
    setTimeout(() => setPaused(false), 1000); 
  };

  if (!items.length) return null; 

  return (
    <div
      className="relative mx-auto w-full"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={() => setPaused(true)}
      onTouchEnd={() => setPaused(false)}
    >
      <div className="overflow-hidden">
        <div
          className="flex transition-transform duration-300 ease-out"
          style={{ transform: `translateX(${-idx * 100}%)` }}
        >
          {items.map((t, i) => (
            <div key={t.id} className="w-full shrink-0 px-1">
              <TestimonialCard
                data={t}
                altTone={i % 2 === 0 ? "gray" : "white"}
                className="w-full max-w-[min(80vw,520px)] sm:max-w-[min(70vw,360px)] h-[340x] mx-auto"
              />
            </div>
          ))}
        </div>
      </div>

      {/* dots */}
      <div className="mt-4 flex items-center justify-center gap-2 sm:gap-3 z-10 relative">
        {items.map((_, i) => (
          <button
            key={i}
            onClick={() => go(i)}
            aria-label={`Go to slide ${i + 1}`}
            className={cn(
              "h-3 w-3 sm:h-3.5 sm:w-3.5 rounded-full transition-all",
              idx === i ? "bg-black" : "bg-gray-400"
            )}
          />
        ))}
      </div>
    </div>
  )
}