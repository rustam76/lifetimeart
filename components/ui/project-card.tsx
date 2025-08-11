"use client"

import Image from "next/image"
import { cn } from "@/lib/utils"
import { Quote } from "../icons"

interface ProjectCardProps {
  image: string
  title: string
  description: string
  tags: string[]
  testimonial: string
  authorName: string
  authorImage: string
  duration?: string
  variant?: "light" | "dark"
  className?: string
}

export function ProjectCard({
  image,
  title,
  description,
  tags,
  testimonial,
  authorName,
  authorImage,
  duration,
  variant = "light",
  className,
}: ProjectCardProps) {
  const isDark = variant === "dark"

  return (
    <div
      className={cn(
        "rounded-[12px] overflow-hidden p-5 sm:p-6 lg:p-8 relative",
        isDark ? "bg-zinc-900 text-white" : "bg-zinc-100 text-zinc-900",
        className
      )}
    >
      {/* Mobile Layout */}
      <div className="flex flex-col gap-5 lg:hidden">
        <div className="w-full">
          <div className="relative overflow-hidden rounded-[10px] w-full h-[220px] sm:h-[260px]">
            <Image
              src={image}
              alt={title}
              fill
              className="object-cover"
              sizes="100vw"
              priority={false}
            />
          </div>
        </div>

        <div className="w-full">
          <h3 className="text-[28px] md:text-[34px] leading-[120%] font-medium">
            {title}
          </h3>

          <p className={cn("mt-3 text-base md:text-[17px] leading-[170%] tracking-[-0.2px]", isDark ? "text-white" : "text-[#3D3D47]")}>
            {description}
          </p>

          <div className="mt-4 flex flex-wrap gap-2">
            {tags.map((tag, i) => (
              <span
                key={i}
                className={cn(
                  "px-3 py-1 rounded-full text-xs font-medium",
                  isDark ? "bg-zinc-800 text-white" : "bg-[#28282C] text-white"
                )}
              >
                {tag}
              </span>
            ))}
            {duration && (
              <span
                className={cn(
                  "px-3 py-1 rounded-full text-xs font-medium",
                  isDark ? "bg-zinc-800 text-white" : "bg-[#28282C] text-white"
                )}
              >
                {duration}
              </span>
            )}
          </div>

          <div className="mt-4 flex gap-3">
            <Quote className="h-[22px] w-[22px] shrink-0" color={isDark ? "white" : "black"} />
            <div>
              <blockquote className="text-sm italic">"{testimonial}"</blockquote>
              <div className="flex items-center gap-3 mt-3">
                <Image src={authorImage} alt={authorName} width={32} height={32} className="rounded-full" />
                <span className="text-sm font-medium">{authorName}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Desktop Layout */}
      <div className="hidden xl:block">
        <div className="grid grid-cols-2 gap-6 min-h-[300px]">
          {/* Image */}
          <div className="relative overflow-hidden rounded-[10px] w-full h-full min-h-[300px]">
            <Image
              src={image}
              alt={title}
              fill
              className="object-cover"
              sizes="(max-width: 1279px) 50vw, (max-width: 1439px) 40vw, 35vw"
              priority={false}
            />
          </div>

          {/* Content */}
          <div className="flex flex-col h-full min-h-[300px]">
            <div className="flex-1">
              <h3 className="text-[40px] leading-[120%] font-medium">
                {title}
              </h3>

              <p className={cn("mt-3 text-[17px] leading-[170%] tracking-[-0.2px]", isDark ? "text-white" : "text-[#3D3D47]")}>
                {description}
              </p>

              <div className="mt-4 flex flex-wrap gap-2">
                {tags.map((tag, i) => (
                  <span
                    key={i}
                    className={cn(
                      "px-3 py-1 rounded-full text-xs font-medium",
                      isDark ? "bg-zinc-800 text-white" : "bg-[#28282C] text-white"
                    )}
                  >
                    {tag}
                  </span>
                ))}
                {duration && (
                  <span
                    className={cn(
                      "px-3 py-1 rounded-full text-xs font-medium",
                      isDark ? "bg-zinc-800 text-white" : "bg-[#28282C] text-white"
                    )}
                  >
                    {duration}
                  </span>
                )}
              </div>
            </div>

            <div className="mt-auto pt-4 flex gap-3">
              <Quote className="h-[22px] w-[22px] shrink-0" color={isDark ? "white" : "black"} />
              <div>
                <blockquote className="text-sm italic">"{testimonial}"</blockquote>
                <div className="flex items-center gap-3 mt-3">
                  <Image src={authorImage} alt={authorName} width={32} height={32} className="rounded-full" />
                  <span className="text-sm font-medium">{authorName}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ===== leptop ===== */}
      <div className="hidden lg:block xl:hidden 2xl:hidden">
        <div className="grid grid-cols-2 gap-6 min-h-[300px]">
          {/* Image */}
          <div className="relative overflow-hidden rounded-[10px] w-full h-full min-h-[300px]">
            <Image
              src={image}
              alt={title}
              fill
              className="object-cover"
              sizes="(max-width: 1279px) 50vw, (max-width: 1439px) 40vw, 35vw"
              priority={false}
            />
          </div>

          {/* Content */}
          <div className="flex flex-col h-full min-h-[300px]">
            <div className="flex-1">
              <h3 className="text-[40px] leading-[120%] font-medium">
                {title}
              </h3>

              <p className={cn("mt-3 text-[17px] leading-[170%] tracking-[-0.2px]", isDark ? "text-white" : "text-[#3D3D47]")}>
                {description}
              </p>

              <div className="mt-4 flex flex-wrap gap-2">
                {tags.map((tag, i) => (
                  <span
                    key={i}
                    className={cn(
                      "px-3 py-1 rounded-full text-xs font-medium",
                      isDark ? "bg-zinc-800 text-white" : "bg-[#28282C] text-white"
                    )}
                  >
                    {tag}
                  </span>
                ))}
                {duration && (
                  <span
                    className={cn(
                      "px-3 py-1 rounded-full text-xs font-medium",
                      isDark ? "bg-zinc-800 text-white" : "bg-[#28282C] text-white"
                    )}
                  >
                    {duration}
                  </span>
                )}
              </div>
            </div>

            
          </div>
        </div>
        <div className="mt-auto pt-4 flex gap-3">
              <Quote className="h-[22px] w-[22px] shrink-0" color={isDark ? "white" : "black"} />
              <div>
                <blockquote className="text-sm italic">"{testimonial}"</blockquote>
                <div className="flex items-center gap-3 mt-3">
                  <Image src={authorImage} alt={authorName} width={32} height={32} className="rounded-full" />
                  <span className="text-sm font-medium">{authorName}</span>
                </div>
              </div>
            </div>
      </div>
    </div>
  )
}