"use client";

import Image from "next/image";
import React, { useEffect, useRef, useState } from 'react';
import { motion, useAnimation, useInView, type Variants } from "framer-motion";
import { Badge } from "./ui/badge";

const gallery = [
  { src: "/assets/1.webp", alt: "Dining room with warm tones" },
  { src: "/assets/2.webp", alt: "Cozy living room" },
  { src: "/assets/3.webp", alt: "Cabin in the woods" },
  { src: "/assets/4.webp", alt: "Modern kitchen cabinetry" },
  { src: "/assets/5.webp", alt: "Minimalist bedroom loft" },
];

const stats = [
  { value: "8", label: "Years Experience", description: "Improving homes with expert craftsmanship for years" },
  { value: "26", label: "Projects Completed", description: "Over 250 successful projects delivered with quality and care" },
  { value: "30", label: "Client Satisfaction", description: "Our team of 30 experts ensures top-quality results" },
  { value: "100%", label: "Support Available", description: "All of our clients are satisfied with our work and service" },
];


const easeOut: [number, number, number, number] = [0.22, 0.62, 0.2, 1];

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.35, ease: easeOut } },
};

const fadeRight: Variants = {
  hidden: { opacity: 0, x: 16 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.35, ease: easeOut } },
};

const cardsContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.06 } },
};

const cardItem: Variants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.3, ease: easeOut } },
};

const statsContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
};

const fadeUpBottom: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3, ease: easeOut } },
};


function Reveal({
  children,
  variants = fadeUp,
  amount = 0.4,
  margin = "0px 0px -120px 0px",
  className,
}: {
  children: React.ReactNode;
  variants?: Variants;
  amount?: number;
  margin?: string;
  className?: string;
}) {
  const ref = React.useRef<HTMLDivElement | null>(null);
  const controls = useAnimation();
  const inView = useInView(ref, { amount, margin: margin as any });

  React.useEffect(() => {
    if (inView) controls.start("visible");
    else controls.start("hidden");
  }, [inView, controls]);

  return (
    <motion.div ref={ref} className={className} variants={variants} initial="hidden" animate={controls}>
      {children}
    </motion.div>
  );
}



const AboutUs = () => {
  const [visibleElements, setVisibleElements] = useState(new Set());
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const paragraphRef = useRef(null);
  const galleryRef = useRef(null);
  const statsRef = useRef(null);



  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleElements(prev => new Set([...prev, (entry.target as HTMLElement).dataset.element]));
          }
        });
      },
      { threshold: 0.3, rootMargin: '0px 0px -100px 0px' }
    );

    const elements = [titleRef, paragraphRef, galleryRef, statsRef];
    elements.forEach((ref) => {
      if (ref.current) {
        observer.observe(ref.current);
      }
    });

    return () => observer.disconnect();
  }, []);

  const [scrollPosition, setScrollPosition] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const galleryContainerRef = useRef(null);

  useEffect(() => {
    if (isPaused || !visibleElements.has('gallery')) return;

    const interval = setInterval(() => {
      setScrollPosition(prev => prev + 1);
    }, 3000);

    return () => clearInterval(interval);
  }, [isPaused, visibleElements]);

  const [indexPos, setIndexPos] = useState(0);
 
  useEffect(() => {
    if (isPaused || !visibleElements.has("gallery")) return;
    const interval = setInterval(() => {
      setIndexPos((prev) => (prev + 1) % gallery.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [isPaused, visibleElements]);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative w-full bg-white text-gray-900 py-24"
    >
      <div className="mx-auto max-w-7xl px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 mb-20">
          <div>
            {/* Badge */}
            <div
              ref={titleRef}
              data-element="title"
              className={`mb-6 transition-all duration-300 ease-out ${visibleElements.has('title')
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-4'
                }`}
            >
              <Badge className="rounded-full text-center text-md">About us</Badge>
            </div>

            {/* Main Title */}
            <div className={`transition-all duration-400 ease-out delay-100 ${visibleElements.has('title')
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-4'
              }`}>
              <h2 className="text-5xl lg:text-6xl font-medium leading-tight tracking-tight">
                Home
                <br />
                Improvement
                <br />
                Specialists
              </h2>
            </div>
          </div>

          <div
            ref={paragraphRef}
            data-element="paragraph"
            className={`transition-all duration-400 ease-out ${visibleElements.has('paragraph')
                ? 'opacity-100 translate-x-0'
                : 'opacity-0 translate-x-8'
              }`}
          >
            <div className="text-xl leading-relaxed text-gray-600 max-w-2xl">
              <p>
                Welcome to LifetimeArt, your trusted home improvement experts, dedicated to transforming homes with precision
                and care. With years of experience in building kitchens, bathrooms, garages, and more, we take pride in
                delivering top-quality craftsmanship and a seamless customer experience. Our mission is to bring your vision
                to life while ensuring clear communication and expert guidance at every step. Let's create a home you'll love!
              </p>
            </div>
          </div>
        </div>

      </div>

      <div
        ref={galleryRef}
        data-element="gallery"
        className="w-full overflow-hidden mb-20"
      >
        <div
          ref={galleryContainerRef}
          className="flex gap-6 transition-transform duration-1000 ease-linear"
          style={{
            transform: `translateX(-${(scrollPosition % gallery.length) * 424}px)`,
          }}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
     
          {[...gallery, ...gallery, ...gallery].map((item, index) => (
            <div
              key={index}
              className={`flex-shrink-0 transition-all duration-300 ease-out ${visibleElements.has('gallery')
                  ? 'opacity-100 translate-x-0'
                  : 'opacity-0 -translate-x-8'
                }`}
              style={{
                transitionDelay: `${Math.min(index * 100, 500)}ms`,
                width: '400px',
                height: '500px'
              }}
            >
              <div className="relative w-full h-full rounded-2xl overflow-hidden bg-gray-100 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <img
                  src={item.src}
                  alt={item.alt}
                  className="w-full h-full object-cover"
                  style={{
                    width: '400px',
                    height: '500px',
                    opacity: 1
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-center mt-4 space-x-2 lg:hidden">
          {gallery.map((_, idx) => {
            const active = idx === indexPos;
            return (
              <button
                key={idx}
                aria-label={`Go to slide ${idx + 1}`}
                onClick={() => {
                  setIsPaused(true);
                  setIndexPos(idx);
                }}
                className={`h-2.5 w-2.5 rounded-full transition-[transform,background-color] duration-300 ${
                  active ? "bg-gray-900 scale-100" : "bg-gray-300 scale-90"
                }`}
              />
            );
          })}
        </div>

      <div className="mx-auto max-w-7xl px-8">

        <div className="mx-auto w-full min-w-[290px] max-w-[1440px] px-[40px] lg:px-[80px] py-[80px]">
          <Reveal variants={statsContainer} amount={0.3}>
            <motion.div className="grid grid-cols-1 lg:grid-cols-2 gap-[120px] 2xl:grid-cols-4">
              {stats.map((stat, index) => (
                <motion.div key={index} variants={fadeUpBottom} className="text-left">
                  <div className="text-[72px] font-light leading-[40px] text-primary">{stat.value}</div>
                  <div className="mt-4 text-[20px] leading-[30px] text-primary">{stat.label}</div>
                  <div className="mt-4 text-[16px] leading-[150%] text-[#3D3D47]">{stat.description}</div>
                </motion.div>
              ))}
            </motion.div>
          </Reveal>     </div>
      </div>
    </section>
  );
};

export default AboutUs;
