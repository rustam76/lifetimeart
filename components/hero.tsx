"use client";

import Image from "next/image";
import Link from "next/link";
import * as React from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useReducedMotion,
  type Variants,
} from "framer-motion";
import { StarRating } from "./ui/start";
import { Arrow } from "./icons";


function useMounted() {
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);
  return mounted;
}


const easeOut: [number, number, number, number] = [0.22, 0.62, 0.2, 1];

const popIn: Variants = {
  hidden: { opacity: 0, y: 8, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: [0.98, 1.02, 1],
    transition: { duration: 0.35, times: [0, 0.6, 1], ease: easeOut },
  },
};

const lineContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const lineItem: Variants = {
  hidden: { opacity: 0, y: 14 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.32, ease: easeOut } },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.35, ease: easeOut },
  }),
};

export default function Hero() {
  const mounted = useMounted();

  // Parallax per-section
  const sectionRef = React.useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });


  const reduceMotion = useReducedMotion();
  const P = (from: number, to: number) => (reduceMotion ? [0, 0] : [from, to]);


  const imgYDesktopRaw = useTransform(scrollYProgress, [0, 1], P(0, -60));
  const imgYLgRaw = useTransform(scrollYProgress, [0, 1], P(0, -40));
  const imgYMobileRaw = useTransform(scrollYProgress, [0, 1], P(0, -30));
  const fgYRaw = useTransform(scrollYProgress, [0, 1], P(0, -12));
  const badgeYRaw = useTransform(scrollYProgress, [0, 1], P(0, -8));
  const cardOpacityRaw = useTransform(scrollYProgress, [0, 1], reduceMotion ? [1, 1] : [1, 0.9]);
  const cardYRaw = useTransform(scrollYProgress, [0, 1], P(10, -6));

  const springOpt = { stiffness: 120, damping: 20, mass: 0.3 };
  const imgYDesktop = useSpring(imgYDesktopRaw, springOpt);
  const imgYLg = useSpring(imgYLgRaw, springOpt);
  const imgYMobile = useSpring(imgYMobileRaw, springOpt);
  const fgY = useSpring(fgYRaw, springOpt);
  const badgeY = useSpring(badgeYRaw, springOpt);
  const cardOpacity = useSpring(cardOpacityRaw, springOpt);
  const cardY = useSpring(cardYRaw, springOpt);

  return (
    <section ref={sectionRef} className="relative w-full overflow-hidden bg-[#0f0f12] text-white">
      {/* ====== DESKTOP  ====== */}
      <div className="mx-auto hidden max-w-[1600px] grid-cols-2 items-center gap-10 px-[80px] py-20 2xl:grid 2xl:max-w-[1440px]">
        <div>
          <motion.div
            style={mounted ? { y: badgeY } : undefined}
            variants={popIn}
            initial="hidden"
            animate="visible"
            viewport={{ once: true }}
            className="mb-6 inline-flex items-center gap-2 rounded-full bg-white/5 px-3 py-1 text-white/80 ring-1 ring-white/10 xl:text-[14px] xl:leading-[14px] xl:font-normal"
          >
            <span className="inline-block h-2 w-2 rounded-full bg-emerald-400" />
            Available for work
          </motion.div>

          {/* Headline */}
          <motion.h1
            style={mounted ? { y: fgY } : undefined}
            variants={lineContainer}
            initial="hidden"
            animate="visible"
            viewport={{ once: true }}
            className="mt-2 xl:text-[56px] xl:font-medium xl:leading-[120%] xl:tracking-[-1px]"
          >
            <motion.span variants={lineItem} className="block">
              Your trusted partner
            </motion.span>
            <motion.span variants={lineItem} className="block">
              for quality home
            </motion.span>
            <motion.span variants={lineItem} className="block">
              improvement
            </motion.span>
          </motion.h1>

          {/* Subcopy */}
          <motion.p
            style={mounted ? { y: fgY } : undefined}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={1}
            viewport={{ once: true }}
            className="mt-6 max-w-xl text-white/70 xl:text-[20px] xl:leading-[170%] xl:tracking-[-0.3px] xl:font-normal"
          >
            LifetimeArt delivers expert home improvements, creating beautiful and functional spaces
            with quality craftsmanship.
          </motion.p>

          {/* CTA */}
          <motion.div
            style={mounted ? { y: fgY } : undefined}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={2}
            viewport={{ once: true }}
            className="mt-10"
          >
            <Link
              href="#contact"
              className="group inline-flex items-center gap-3 rounded-full bg-white/10 px-6 py-3 text-white ring-1 ring-white/15 backdrop-blur transition will-change-transform hover:-translate-y-1 hover:bg-white/15"
            >
              Work with us
              <span className="grid h-9 w-9 place-content-center rounded-full bg-white/90 text-black transition-transform duration-200 group-hover:translate-x-1">
                <Arrow color="black" />
              </span>
            </Link>
          </motion.div>
        </div>

        {/* Right image */}
        <motion.div
          initial={false}
          style={mounted ? { y: imgYDesktop } : undefined}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.4, ease: easeOut }}
          className="relative overflow-hidden rounded-[28px] ring-1 ring-white/10 will-change-transform"
        >
          <Image
            src="/assets/hero.webp"
            alt="Interior hero"
            priority
            width={1600}
            height={1100}
            className="h-[720px] w-full object-cover"
          />

          <motion.div
            initial={false}
            style={mounted ? { opacity: cardOpacity, y: cardY } : undefined}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.65, duration: 0.35, ease: easeOut }}
            className="absolute bottom-9 right-8 hidden w-[240px] max-w-[44%] flex-col gap-3 rounded-[8px] bg-primary/30 p-5 backdrop-blur-[15px] 2xl:flex 3xl:hidden"
            aria-label="Testimonial"
          >
            <div className="flex items-center gap-3">
              <StarRating value={5} activeColor="text-white" readOnly />
            </div>
            <p className="inline-block align-middle font-normal text-white/70 text-[14px] leading-[20.8px] tracking-[-0.1px]">
              “LifetimeArt has been a game-changer for my home. Their ability to blend functionality
              with exquisite design is unparalleled."
            </p>
          </motion.div>
        </motion.div>
      </div>

      {/* ====== LAPTOP/TABLET LANDSCAPE  ====== */}
      <div className="relative hidden lg:block 2xl:hidden">
        <motion.div
          initial={false}
          style={mounted ? { y: imgYLg } : undefined}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.4, ease: easeOut }}
          className="relative mx-5 overflow-hidden rounded-[18px]"
        >
          <Image
            src="/assets/hero.webp"
            alt="Interior hero"
            priority
            width={1600}
            height={900}
            className="h-[72vh] w-full object-cover"
          />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(16,16,20,0.8)_0%,rgba(16,16,20,0.8)_100%)]" />

          <div className="absolute inset-0 flex items-end">
            <div className="p-8 md:p-10">
              <motion.div
                style={mounted ? { y: badgeY } : undefined}
                variants={popIn}
                initial="hidden"
                animate="visible"
                viewport={{ once: true }}
                className="mb-4 inline-flex items-center gap-2 rounded-full bg-primary/80 px-3 py-1 text-white/90 ring-1 ring-white/15 lg:text-[14px] lg:leading-[14px] lg:font-normal"
              >
                <span className="inline-block h-2 w-2 rounded-full bg-emerald-400" />
                Available for work
              </motion.div>

              <motion.h1
                style={mounted ? { y: fgY } : undefined}
                variants={lineContainer}
                initial="hidden"
                animate="visible"
                viewport={{ once: true }}
                className="lg:text-[56px] lg:font-medium lg:leading-[120%] lg:tracking-[-1px]"
              >
                <motion.span variants={lineItem} className="block">
                  Your trusted partner for quality home
                </motion.span>
                <motion.span variants={lineItem} className="block">
                  improvement
                </motion.span>
              </motion.h1>

              <motion.p
                style={mounted ? { y: fgY } : undefined}
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                custom={1}
                viewport={{ once: true }}
                className="mt-5 max-w-2xl text-white/80 lg:text-[20px] lg:leading-[170%] lg:tracking-[-0.3px] lg:font-normal"
              >
                LifetimeArt delivers expert home improvements, creating beautiful and functional
                spaces with quality craftsmanship.
              </motion.p>

              <motion.div
                style={mounted ? { y: fgY } : undefined}
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                custom={2}
                viewport={{ once: true }}
                className="mt-8"
              >
                <Link
                  href="#contact"
                  className="group inline-flex items-center gap-3 rounded-full bg-white/10 px-6 py-3 text-white ring-1 ring-white/15 backdrop-blur transition will-change-transform hover:-translate-y-1 hover:bg-white/15"
                >
                  Work with us
                  <span className="grid h-9 w-9 place-content-center rounded-full bg-white/90 text-black transition-transform duration-200 group-hover:translate-x-1">
                    <Arrow color="black" />
                  </span>
                </Link>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* ====== MOBILE/TABLET ====== */}
      <div className="block px-4 pb-8 pt-6 lg:hidden">
        <motion.div
          initial={false}
          style={mounted ? { y: imgYMobile } : undefined}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, ease: easeOut }}
          className="relative overflow-hidden rounded-3xl ring-1 ring-white/10"
        >
          <Image
            src="/assets/hero.webp"
            alt="Interior hero"
            priority
            width={900}
            height={1400}
            className="h-[78vh] w-full object-cover"
          />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(16,16,20,0.8)_0%,rgba(16,16,20,0.8)_100%)]" />

          <div className="absolute inset-0 flex items-end">
            <div className="p-5">
              <motion.div
                style={mounted ? { y: badgeY } : undefined}
                variants={popIn}
                initial="hidden"
                animate="visible"
                viewport={{ once: true }}
                className="mb-3 inline-flex items-center gap-2 rounded-full bg-primary/80 px-3 py-1 ring-1 ring-white/15 text-white/90 font-normal text-[16px] leading-[170%] tracking-[-0.3px]"
              >
                <span className="inline-block h-2 w-2 rounded-full bg-emerald-400" />
                Available for work
              </motion.div>

              <motion.h1
                style={mounted ? { y: fgY } : undefined}
                variants={lineContainer}
                initial="hidden"
                animate="visible"
                viewport={{ once: true }}
                className="font-medium text-[40px] leading-[120%] tracking-[-1px]"
              >
                <motion.span variants={lineItem} className="block">
                  Your trusted partner
                </motion.span>
                <motion.span variants={lineItem} className="block">
                  for quality home
                </motion.span>
                <motion.span variants={lineItem} className="block">
                  improvement
                </motion.span>
              </motion.h1>

              <motion.p
                style={mounted ? { y: fgY } : undefined}
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                custom={1}
                viewport={{ once: true }}
                className="mt-4 max-w-md text-white/80 font-normal text-[16px] leading-[170%] tracking-[-0.3px]"
              >
                LifetimeArt delivers expert home improvements, creating beautiful and functional
                spaces with quality craftsmanship.
              </motion.p>

              <motion.div
                style={mounted ? { y: fgY } : undefined}
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                custom={2}
                viewport={{ once: true }}
                className="mt-6"
              >
                <Link
                  href="#contact"
                  className="group inline-flex items-center gap-3 rounded-full bg-white/10 px-5 py-3 text-white ring-1 ring-white/15 backdrop-blur transition will-change-transform hover:-translate-y-1 hover:bg-white/15"
                >
                  Work with us
                  <span className="grid h-9 w-9 place-content-center rounded-full bg-white/90 text-black transition-transform duration-200 group-hover:translate-x-1">
                    <Arrow color="black" />
                  </span>
                </Link>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
