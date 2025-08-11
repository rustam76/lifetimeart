"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Badge } from "./ui/badge"
import { ProjectCard } from "./ui/project-card"
import { cn } from "@/lib/utils"

const projectList = [
  {
    image: "/assets/work-1.webp",
    title: "Modern kitchen refit",
    description:
      "This kitchen transformation brought sleek, modern design and enhanced functionality to our client’s home. We installed custom cabinetry, high-quality worktops, and state-of-the-art appliances, creating a stylish yet practical space perfect for cooking and entertaining. With attention to every detail, we delivered a kitchen that balances aesthetics and usability.",
    tags: ["Kitchen"],
    duration: "4 weeks",
    testimonial:
      "LifetimeArt completely transformed our kitchen, making it both beautiful and highly functional. The craftsmanship was outstanding, and the team was professional and communicative throughout. We couldn’t be happier with the result!",
    authorName: "Rachel Morgan",
    authorImage: "/assets/rachel.webp",
    variant: "light",
  },
  {
    image: "/assets/work-2.webp",
    title: "External garden path build",
    description:
      "Our team designed and built a durable, visually appealing garden path to enhance the outdoor space. Using premium materials, we created a seamless walkway that blends naturally with the landscape, providing both functionality and aesthetic charm. The result is a stylish, well-crafted path that elevates the overall garden design.",
    tags: ["External Works"],
    duration: "6 weeks",
    testimonial:
      "The team at LifetimeArt did an amazing job on our garden path. It’s sturdy, looks fantastic, and has completely transformed our outdoor space. They listened to our vision and delivered exactly what we wanted—highly recommended!",
    authorName: "Michael Turner",
    authorImage: "/assets/michael.webp",
    variant: "dark",
  },
  {
    image: "/assets/work-3.webp",
    title: "Bathroom renovation",
    description:
      "We revitalized this bathroom with a fresh, modern design, incorporating high-end tiling, sleek fixtures, and efficient lighting. The layout was optimized to maximize space, creating a luxurious and relaxing atmosphere. The final result is a beautifully crafted bathroom that enhances both comfort and functionality.",
    tags: ["Bathroom"],
    duration: "4 weeks",
    testimonial:
      "Our bathroom renovation by LifetimeArt exceeded all expectations. The attention to detail and quality of work created a stunning, functional space. The team was professional and kept us informed every step of the way!",
    authorName: "Laura Davies",
    authorImage: "/assets/emily.webp",
    variant: "light",
  },
]

const OurWork = () => {
  return (
    <section
      id="our-work"
      className="flex justify-center items-center py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 3xl:mx-[200px]"
    >
      <div className="w-full max-w-[1440px] 2xl:mx-[80px]">
        <motion.div
          className="flex justify-center items-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ margin: "-50px" }}
          transition={{ duration: 0.5 }}
        >
          <Badge className="rounded-full text-center text-sm sm:text-md">Our Work</Badge>
        </motion.div>

        <motion.h3
          className="mt-2 mb-4 lg:mx-auto text-center font-medium text-4xl sm:text-4xl lg:text-5xl lg:max-w-[343px] leading-[120%] tracking-[-0.8px]"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ margin: "-50px" }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          Get inspired by our work
        </motion.h3>

        <motion.p
          className="mb-12 sm:mb-16 lg:mb-24 text-center font-normal text-sm sm:text-md lg:text-lg leading-[170%] tracking-[-0.3px] lg:max-w-[540px] lg:mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ margin: "-50px" }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          See how we’ve transformed homes with our expert craftsmanship and attention to detail.
        </motion.p>

        <div className="hidden lg:grid grid-cols-1 gap-8 px-0 lg:px-4 2xl:px-8">
          {projectList.map((project, i) => (
            <motion.div
              key={i}
              className="mx-auto w-full rounded-[12px] 2xl:py-[290px] overflow-hidden"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.2 }}
            >
              <ProjectCard
                className="w-full"
                image={project.image}
                title={project.title}
                description={project.description}
                tags={project.tags}
                duration={project.duration}
                testimonial={project.testimonial}
                authorName={project.authorName}
                authorImage={project.authorImage}
                variant={project.variant as "light" | "dark"}
              />
            </motion.div>
          ))}
        </div>

        <div className="block lg:hidden px-4 sm:px-6">
          <MobileCarousel items={projectList} />
        </div>
      </div>
    </section>
  )
}

export default OurWork

function MobileCarousel({ items }: { items: typeof projectList }) {
  const [idx, setIdx] = React.useState(0)
  const [paused, setPaused] = React.useState(false)

  React.useEffect(() => {
    if (paused) return
    const t = setInterval(() => setIdx((v) => (v + 1) % items.length), 3500)
    return () => clearInterval(t)
  }, [paused, items.length])

  const go = (i: number) => setIdx((i + items.length) % items.length)

  return (
    <div
      className="mx-auto max-w-full"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={() => setPaused(true)}
      onTouchEnd={() => setPaused(false)}
    >
      <div className="overflow-hidden">
        <AnimatePresence initial={false} mode="wait">
          <motion.div
            key={idx}
            className="flex"
            initial={{ x: "100%" }}
            animate={{ x: `-${idx * 100}%` }}
            exit={{ x: "-100%" }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
          >
            {items.map((p, i) => (
              <div key={i} className="min-w-full px-1">
                <ProjectCard
                  image={p.image}
                  title={p.title}
                  description={p.description}
                  tags={p.tags}
                  duration={p.duration}
                  testimonial={p.testimonial}
                  authorName={p.authorName}
                  authorImage={p.authorImage}
                  variant={p.variant as "light" | "dark"}
                  className="w-full"
                />
              </div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="mt-4 flex items-center justify-center gap-2">
        {items.map((_, i) => (
          <motion.button
            key={i}
            onClick={() => go(i)}
            aria-label={`Go to slide ${i + 1}`}
            className={cn(
              "h-2 w-2 sm:h-2.5 sm:w-2.5 rounded-full transition-colors",
              idx === i ? "bg-black" : "bg-black/30"
            )}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            transition={{ duration: 0.2 }}
          />
        ))}
      </div>
    </div>
  )
}