"use client";

import { useId, useState, useRef, useEffect } from "react";
import { AccordionClose, AccordionOpen, Arrow } from "./icons";

import Link from "next/link";
import { Badge } from "./ui/badge";
import {
  motion,
  AnimatePresence,
  useAnimation,
  useInView,
  type Variants,
} from "framer-motion";

type Faq = { q: string; a: string };

const faqs: Faq[] = [
  { q: "What area are you based in?", a: "We primarily serve London and surrounding areas, but depending on the project, we may be able to travel further. Get in touch to discuss your location and project needs." },
  { q: "How long does a typical project take?", a: "Most small projects take 1–3 weeks; larger scopes can be 4–12+ weeks depending on complexity, lead times, and approvals." },
  { q: "Do you offer free quotes?", a: "Yes, we provide free, no-obligation quotes once we've discussed your requirements and site constraints." },
  { q: "Will I need planning permission for my project?", a: "It depends on scope and local regulations. We'll advise you during discovery and can assist with applications if needed." },
  { q: "Do you provide a guarantee for your work?", a: "All work is covered by our workmanship guarantee. Manufacturer warranties apply to materials and fixtures." },
  { q: "Can I stay in my home while the work is being done?", a: "Often yes, but it depends on the extent of works. We'll plan phases to minimise disruption where possible." },
  { q: "How do I get started with a project?", a: "Send us a message with your goals and timeline. We'll schedule a call, then provide a proposal and quote." },
];

/** Variants umum untuk fade-in + slide-up */
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 0.62, 0.2, 1] },
  },
};

/** Pembungkus yang mengatur masuk=visible, keluar=hidden (retrigger on scroll) */
function Reveal({
  children,
  variants = fadeUp,
  amount = 0.2,
  margin = "0px 0px -10% 0px",
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
    else controls.start("hidden"); // reset saat keluar viewport supaya bisa retrigger
  }, [inView, controls]);

  return (
    <motion.div
      ref={ref}
      className={className}
      variants={variants}
      initial="hidden"
      animate={controls}
    >
      {children}
    </motion.div>
  );
}

export default function Faqs() {
  return (
    <section
      id="faqs"
      className="mx-auto max-w-[1280px] px-4 py-16 md:px-6 lg:px-8 xl:max-w-[1960px]"
    >
      <div className="grid items-start gap-8 px-[40px] lg:px-[80px] lg:grid-cols-1 lg:gap-20 2xl:grid-cols-2 2xl:max-w-[1440px] mx-auto">

        <div className="mx-auto text-center lg:mx-0 2xl:text-left 2xl:max-w-[500px]">
          <Reveal>
            <Badge className="text-md font-semibold bg-zinc-800 rounded-full">
              FAQs
            </Badge>
          </Reveal>

          <Reveal>
            <h2 className="mt-2 text-5xl font-semibold leading-tight text-neutral-900 sm:text-4xl">
              Answering Your  Questions
            </h2>
          </Reveal>

          <Reveal>
            <p className="mt-4 mx-auto lg:max-w-[400px] text-xl text-[#3D3D47] lg:mx-0">
              Got more questions? Send us your enquiry below
            </p>
          </Reveal>

          <Reveal>
            <div className="mt-14 inline-flex items-center gap-2">
              <Link
                href="#contact"
                className="group inline-flex text-md font-medium items-center gap-3 rounded-full bg-gray-300 px-4 py-2 text-[#101014] backdrop-blur transition hover:bg-gray-200"
              >
                Get in touch
                <span className="grid h-9 w-9 place-content-center rounded-full bg-[#101014] text-white transition group-hover:bg-black">
                  <Arrow color="white" />
                </span>
              </Link>
            </div>
          </Reveal>
        </div>

        <div className="w-full mt-20">
         
          <Reveal amount={0.15}>
            <Accordion faqs={faqs} />
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Accordion({ faqs }: { faqs: Faq[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="grid grid-cols-1 gap-3 2xl:gap-4">
      {faqs.map((item, idx) => (
        <AccordionItem
          key={item.q || idx}
          item={item}
          open={openIndex === idx}
          onToggle={() => setOpenIndex(openIndex === idx ? null : idx)}
        />
      ))}
    </div>
  );
}

function AccordionItem({
  item,
  open,
  onToggle,
}: {
  item: Faq;
  open: boolean;
  onToggle: () => void;
}) {
  const uid = useId();
  const panelId = `faq-panel-${uid}`;
  const btnId = `faq-button-${uid}`;

  return (
    <div className="overflow-hidden rounded-xl bg-[#FAFAFA] ring-1 ring-[#E6E6E6]">
      <button
        id={btnId}
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={onToggle}
        className="flex w-full items-center justify-between gap-4 px-4 py-4 text-left text-sm font-medium text-neutral-900 hover:bg-neutral-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400 sm:px-5"
      >
        <span className="pr-6">{item.q}</span>

        {/* Icon + rotation */}
        <motion.span
          aria-hidden
          className="flex h-7 w-7 shrink-0 items-center justify-center"
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.25 }}
        >
          {open ? <AccordionOpen /> : <AccordionClose />}
        </motion.span>
      </button>

      {/* Smooth expand/collapse */}
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={panelId}
            role="region"
            aria-labelledby={btnId}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.32, ease: [0.22, 0.62, 0.2, 1] }}
          >
            <div className="px-4 pb-4 text-sm leading-6 text-neutral-600 sm:px-5">
              {item.a}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
