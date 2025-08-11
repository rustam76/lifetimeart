"use client"

import Image from "next/image"
import * as React from "react"
import { cn } from "@/lib/utils"
import {
  AccordionClose,
  AccordionOpen,
  Bathrooms,
  Extensions,
  ExternalWorks,
  Kitchens,
  LoftConversions,
  Restorations,
} from "./icons"
import { Badge } from "./ui/badge"
import {
  motion,
  AnimatePresence,
  useAnimation,
  useInView,
  type Variants,
} from "framer-motion"

const Icons = {
  kitchens: Kitchens,
  loft: LoftConversions,
  bathrooms: Bathrooms,
  extensions: Extensions,
  restorations: Restorations,
  external: ExternalWorks,
}

type ServiceItem = {
  id: string
  title: string
  icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>
  description: string
}

interface ServicesSectionProps {
  imageAlt?: string
  heading?: string
  subheading?: string
  badge?: string
  items?: ServiceItem[]
  variant?: "light" | "dark"
  className?: string
}

/* ===== Anim variants ===== */
const easeOut: [number, number, number, number] = [0.22, 0.62, 0.2, 1]

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.32, ease: easeOut } },
}

const fadeRight: Variants = {
  hidden: { opacity: 0, x: 16 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.34, ease: easeOut } },
}

const imgBump: Variants = {
  hidden: { opacity: 0, scale: 0.985 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.34, ease: easeOut } },
}

function Reveal({
  children,
  variants = fadeUp,
  amount = 0.5,
  margin = "0px 0px -120px 0px", 
  className,
}: {
  children: React.ReactNode
  variants?: Variants
  amount?: number
  margin?: string
  className?: string
}) {
  const ref = React.useRef<HTMLDivElement | null>(null)
  const controls = useAnimation()
  const inView = useInView(ref, { amount, margin: margin as any })

  React.useEffect(() => {
    if (inView) controls.start("visible")
    else controls.start("hidden") 
  }, [inView, controls])

  return (
    <motion.div ref={ref} className={className} variants={variants} initial="hidden" animate={controls}>
      {children}
    </motion.div>
  )
}

export function Services({
  imageAlt = "Project photo",
  heading = "What we do",
  subheading = "Find out which one of our services fit the needs of your project",
  badge = "Services",
  items,
  className,
}: ServicesSectionProps) {
  const data: ServiceItem[] =
    items ??
    [
      {
        id: "kitchens",
        title: "Kitchens",
        icon: Icons.kitchens,
        description:
          "At LifetimeArt, we design and build stunning kitchens tailored to your style and needs. Whether you're after a sleek modern space or a classic, timeless look, our expert team delivers high-quality craftsmanship, functionality, and attention to detail to create the heart of your home.",
      },
      {
        id: "loft",
        title: "Loft Conversions",
        icon: Icons.loft,
        description:
          "Transform unused loft space into a bright, practical part of your home—from structural adjustments to finishing touches.",
      },
      {
        id: "bathrooms",
        title: "Bathrooms",
        icon: Icons.bathrooms,
        description:
          "From spa-inspired retreats to minimalist spaces—durable, elegant, and comfortable for years to come.",
      },
      {
        id: "extensions",
        title: "Extensions",
        icon: Icons.extensions,
        description:
          "Expand your living space—kitchen extensions, new family rooms, or an additional floor that complements your home.",
      },
      {
        id: "restorations",
        title: "Restorations",
        icon: Icons.restorations,
        description:
          "Preserve character while upgrading for modern living with traditional craftsmanship and modern techniques.",
      },
      {
        id: "external",
        title: "External Works",
        icon: Icons.external,
        description:
          "Enhance outdoor areas: landscaping, patios, pathways, and lighting that connect your home to nature.",
      },
    ]

  const [openId, setOpenId] = React.useState<string>(data[0]?.id)

  const surface = "bg-[#FAFAFA] text-[#101014]"
  const mutedText = "text-zinc-600"
  const iconColor = "text-zinc-800"

  return (
    <section id="services" className={cn("w-full", surface, className)}>
      <div className={cn("mx-auto w-full max-w-[1440px] pt-10 md:pt-14", "3xl:max-w-[1960px] 3xl:pt-[120px]")}>
        <div className="text-center">
          <Reveal>
            <Badge className="rounded-full text-md">{badge}</Badge>
          </Reveal>

          <Reveal>
            <motion.h3
              variants={fadeUp}
              className="mt-4 text-center font-medium text-5xl leading-[120%] tracking-[-0.8px]"
            >
              {heading}
            </motion.h3>
          </Reveal>

          <Reveal>
            <p className={cn("mt-2 text-center font-normal text-[20px] leading-[170%] tracking-[-0.3px]", mutedText)}>
              {subheading}
            </p>
          </Reveal>
        </div>
      </div>

      <div
        className={cn(
          "mx-auto w-full max-w-[1440px] pb-12 md:pb-16",
          "mt-10 md:mt-14 3xl:mt-[96px]",
          "px-[40px] lg:px-[80px] 3xl:pb-[120px]"
        )}
      >
        <div className={cn("grid items-start gap-6 md:gap-8 lg:gap-10 lg:grid-cols-2", "3xl:gap-[96px]")}>
          <motion.div key={openId} variants={imgBump} initial="hidden" animate="visible" className="flex items-start justify-center">
            <div
              className={cn(
                "relative overflow-hidden rounded-[12px] bg-zinc-100",
                "w-[295px] h-[337.1253px] min-w-[290px] min-h-[331.41px]",
                "lg:w-[432px] lg:h-[493.6886px]",
                "xl:w-[560px] xl:h-[639.9667px]",
                "2xl:w-[600px] 2xl:h-[685.6786px]",
                "3xl:w-[680px] 3xl:h-[777.1024px]"
              )}
            >
              <Image
                src="/assets/services.webp"
                alt={imageAlt}
                fill
                priority
                sizes="(max-width: 1024px) 295px, (max-width: 1280px) 432px, (max-width: 1440px) 560px, (max-width: 1960px) 600px, 680px"
                className="object-cover"
              />
            </div>
          </motion.div>

          <div className="rounded-[12px] p-3 sm:p-4 md:p-6">
            <Reveal variants={fadeUp} amount={0.3} margin="0px 0px -120px 0px">
              <ul className={cn("divide-y divide-zinc-200")}>
                {data.map((item) => {
                  const Icon = item.icon ?? Kitchens
                  const open = openId === item.id
                  return (
                    <li key={item.id} className="py-5 sm:py-5">
                      <button
                        className="group flex min-h-12 w-full items-center gap-3 text-left sm:gap-4"
                        aria-expanded={open}
                        aria-controls={`panel-${item.id}`}
                        onClick={() => setOpenId(open ? "" : item.id)}
                      >
                        <span className="flex h-10 w-10 items-center justify-center rounded-lg">
                          <Icon className={cn("h-[40px] w-[40px]", iconColor)} />
                        </span>

                        <span
                          className={cn(
                            "flex-1 font-medium text-[20px] leading-[120%] tracking-[-0.2px] transition-colors",
                            "group-hover:text-black/80"
                          )}
                        >
                          {item.title}
                        </span>

                        <span className="shrink-0 text-zinc-600">
                          <AnimatePresence mode="wait" initial={false}>
                            {open ? (
                              <motion.span
                                key="close"
                                initial={{ rotate: -90, opacity: 0 }}
                                animate={{ rotate: 0, opacity: 1 }}
                                exit={{ rotate: 90, opacity: 0 }}
                                transition={{ duration: 0.22, ease: easeOut }}
                                className="inline-flex"
                              >
                                <AccordionOpen className="h-5 w-5" />
                              </motion.span>
                            ) : (
                              <motion.span
                                key="open"
                                initial={{ rotate: -90, opacity: 0 }}
                                animate={{ rotate: 0, opacity: 1 }}
                                exit={{ rotate: 90, opacity: 0 }}
                                transition={{ duration: 0.22, ease: easeOut }}
                                className="inline-flex"
                              >
                                <AccordionClose className="h-5 w-5" />
                              </motion.span>
                            )}
                          </AnimatePresence>
                        </span>
                      </button>

                      <div
                        id={`panel-${item.id}`}
                        className={cn(
                          "grid transition-[grid-template-rows,opacity,margin] duration-300 ease-out motion-reduce:transition-none",
                          open ? "grid-rows-[1fr] opacity-100 mt-2 sm:mt-3" : "grid-rows-[0fr] opacity-0 mt-0"
                        )}
                      >
                        <div className="overflow-hidden">
     
                          <AnimatePresence initial={false} mode="wait">
                            {open && (
                              <motion.p
                                key={`${item.id}-desc`}
                                variants={fadeRight}
                                initial="hidden"
                                animate="visible"
                                exit={{ opacity: 0, x: -8, transition: { duration: 0.22, ease: easeOut } }}
                                className="font-normal text-[16px] leading-[170%] tracking-[-0.1px] text-zinc-600"
                              >
                                {item.description}
                              </motion.p>
                            )}
                          </AnimatePresence>
                        </div>
                      </div>
                    </li>
                  )
                })}
              </ul>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}
