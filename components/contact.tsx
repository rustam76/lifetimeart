"use client";

import { useRef, useEffect } from "react";
import { Instagram, Tiktok, Twitter } from "./icons";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import {
  motion,
  useAnimation,
  useInView,
  type Variants,
} from "framer-motion";

/** Variants */
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 0.62, 0.2, 1] },
  },
};

const staggerCol: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
};

function Reveal({
  children,
  variants = fadeUp,
  amount = 0.2,
  margin = "0px 0px -15% 0px",
  className,
}: {
  children: React.ReactNode;
  variants?: Variants;
  amount?: number;
  margin?: string;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const controls = useAnimation();
  const inView = useInView(ref, { amount, margin: margin as any });

  useEffect(() => {
    if (inView) controls.start("visible");
    else controls.start("hidden"); 
  }, [inView, controls]);

  return (
    <motion.div ref={ref} className={className} variants={variants} initial="hidden" animate={controls}>
      {children}
    </motion.div>
  );
}

export function Contact() {
  return (
    <section id="contact" className="pb-[16px] px-[20px] max-w-[1440px] mx-auto">
      <div className="mx-auto 2xl:mx-[70px] p-4 lg:p-[80px] overflow-hidden rounded-2xl bg-primary text-neutral-100">
        <div className="grid gap-10 md:p-10 lg:grid-cols-2 lg:gap-16">
          {/* Left: details */}
          <Reveal variants={staggerCol}>
            <Reveal>
              <Badge className="text-md font-semibold bg-zinc-800 rounded-full">
                Contact
              </Badge>
            </Reveal>

            <Reveal>
              <h3 className="mt-4 text-5xl font-medium leading-tight text-white">
                Get in touch
              </h3>
            </Reveal>

            <Reveal>
              <p className="mt-4 max-w-md text-xl leading-6 text-neutral-400">
                For any inquiries or to explore your vision further, we invite you to
                contact our professional team using the details provided below.
              </p>
            </Reveal>

            <Reveal variants={staggerCol}>
              <div className="mt-8 space-y-5 text-sm">
                <Reveal>
                  <div className="flex flex-col 2xl:flex-row gap-3">
                    <dt className="text-lg font-semibold">Office</dt>
                    <dd className="text-lg">150 Old Park Ln, London W1K 1QZ</dd>
                  </div>
                </Reveal>

                <Reveal>
                  <div className="flex flex-col 2xl:flex-row gap-3">
                    <dt className="text-lg font-semibold">Email</dt>
                    <dd className="text-lg font-regular">
                      <a
                        href="mailto:hello@refit.com"
                        className="text-neutral-100 underline decoration-neutral-600 underline-offset-4 hover:decoration-neutral-300"
                      >
                        hello@refit.com
                      </a>
                    </dd>
                  </div>
                </Reveal>

                <Reveal>
                  <div className="flex flex-col 2xl:flex-row gap-3">
                    <dt className="text-lg font-semibold">Telephone</dt>
                    <dd className="text-lg">07716 534984</dd>
                  </div>
                </Reveal>
              </div>
            </Reveal>

            <Reveal>
              <div className="mt-8">
                <p className="text-lg font-semibold uppercase text-white">Follow us</p>
                <div className="mt-3 flex items-center gap-3">
                  <motion.span whileHover={{ y: -2 }} whileTap={{ scale: 0.96 }}>
                    <Instagram />
                  </motion.span>
                  <motion.span whileHover={{ y: -2 }} whileTap={{ scale: 0.96 }}>
                    <Tiktok />
                  </motion.span>
                  <motion.span whileHover={{ y: -2 }} whileTap={{ scale: 0.96 }}>
                    <Twitter />
                  </motion.span>
                </div>
              </div>
            </Reveal>
          </Reveal>

          {/* Right: form */}
          <Reveal>
            <motion.form
              // biar field-field ikut stagger saat muncul
              variants={staggerCol}
              className="rounded-xl bg-white p-4 ring-1 ring-white/10 sm:p-5"
            >
              <Reveal><Input label="Name" name="name" placeholder="John Smith" required /></Reveal>
              <Reveal><Input label="Email" name="email" type="email" placeholder="johnsmith@gmail.com" required /></Reveal>
              <Reveal><Input label="Phone Number" name="phone" placeholder="+44789 123456" /></Reveal>
              <Reveal>
                <Input
                  textarea
                  label="Message"
                  name="message"
                  placeholder="Hello, I’d like to enquire about…"
                  required
                />
              </Reveal>
              <Reveal>
                <motion.div whileHover={{ y: -1 }} whileTap={{ scale: 0.98 }}>
                  <Button type="submit" className="w-full rounded-md bg-[#101014BF]">
                    Send message
                  </Button>
                </motion.div>
              </Reveal>
            </motion.form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
