"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Logo } from "./icons";

const navLinks = [
  { name: "About", href: "#about" },
  { name: "Services", href: "#services" },
  { name: "Our Work", href: "#our-work" },
  { name: "FAQs", href: "#faqs" },
  { name: "Contact", href: "#contact" },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const custom = document.querySelector<HTMLElement>("[data-scroll-container]");
    const getScrollTop = () =>
      custom ? custom.scrollTop : window.scrollY || document.documentElement.scrollTop;

    const onScroll = () => setScrolled(getScrollTop() > 20);
    onScroll();

    if (custom) {
      custom.addEventListener("scroll", onScroll, { passive: true });
      return () => custom.removeEventListener("scroll", onScroll);
    } else {
      window.addEventListener("scroll", onScroll, { passive: true });
      return () => window.removeEventListener("scroll", onScroll);
    }
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        let closestSection = { id: "", ratio: 0 };
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio > closestSection.ratio) {
            closestSection = {
              id: entry.target.getAttribute("id") || "",
              ratio: entry.intersectionRatio,
            };
          }
        });

        if (closestSection.id) {
          setActiveSection(`#${closestSection.id}`);
        } else if ((document.querySelector<HTMLElement>("[data-scroll-container]")?.scrollTop ?? window.scrollY ?? document.documentElement.scrollTop) < 20) {
          setActiveSection(""); 
        }
      },
      {
        root: document.querySelector<HTMLElement>("[data-scroll-container]") || null,
        rootMargin: "-40% 0px -40% 0px", 
        threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0], 
      }
    );

    navLinks.forEach((link) => {
      const section = document.querySelector(link.href);
      if (section) observer.observe(section);
    });

    return () => {
      navLinks.forEach((link) => {
        const section = document.querySelector(link.href);
        if (section) observer.unobserve(section);
      });
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = showMobileMenu ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [showMobileMenu]);

  const condensed = scrolled || showMobileMenu;

  return (
    <>
      <nav className={`z-50 w-full px-[20px] ${scrolled ? "fixed top-3" : "absolute top-0"}`}>
        <div
          className={[
            "mx-auto",
            "xl:max-w-[1280px] 2xl:max-w-[1440px] 3xl:max-w-[1440px]",
            "flex items-center justify-between gap-4 px-4 2xl:px-[80px]",
            condensed ? "py-3" : "py-6 xs:py-[40px]",
            condensed
              ? "bg-primary/60 backdrop-blur-md rounded-2xl shadow-[0_10px_30px_-10px_rgba(0,0,0,0.45)]"
              : "bg-[linear-gradient(to_bottom,rgba(0,0,0,0.45)_0%,rgba(0,0,0,0.2)_35%,rgba(0,0,0,0)_100%)]",
            "transition-all duration-200 ease-out",
          ].join(" ")}
        >
          <div className="flex items-center gap-3 text-primary-foreground">
            <Logo />
            <Link href="/" className="font-medium text-2xl tracking-tight hover:opacity-80">
              LifetimeArt
            </Link>
          </div>

          <div className="hidden items-center font-medium gap-[30px] text-lg text-primary-foreground lg:flex">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`relative font-medium transition-opacity duration-200 hover:opacity-100 pb-1 ${
                  activeSection === link.href
                    ? "opacity-100 border-b-2 border-primary-foreground"
                    : "opacity-80"
                }`}
                onClick={() => setActiveSection(link.href)}
              >
                {link.name}
              </Link>
            ))}
          </div>

          <div className="lg:hidden">
            <button
              type="button"
              onClick={() => setShowMobileMenu((v) => !v)}
              className="grid size-9 place-items-center text-primary-foreground rounded-md hover:bg-black/10 focus:outline-none focus:ring-2 focus:ring-ring/40"
              aria-expanded={showMobileMenu}
              aria-controls="mobile-menu-popover"
              aria-label={showMobileMenu ? "Close mobile menu" : "Open mobile menu"}
              title={showMobileMenu ? "Close main navigation" : "Open main navigation"}
            >
              <AnimatePresence mode="wait" initial={false}>
                {!showMobileMenu ? (
                  <motion.svg
                    key="hamburger"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    viewBox="0 0 24 24"
                    className="h-6 w-6"
                  >
                    <path
                      d="M4 7h16M4 12h16M4 17h16"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </motion.svg>
                ) : (
                  <motion.svg
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    viewBox="0 0 24 24"
                    className="h-6 w-6"
                  >
                    <path
                      d="M6 6l12 12M18 6l-12 12"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </motion.svg>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {showMobileMenu && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.22 }}
            className="fixed inset-0 z-[60] flex h-full w-full flex-col bg-primary/80 backdrop-blur-[20px] text-primary-foreground shadow-[0_10px_30px_rgba(0,0,0,0.5)]"
            id="mobile-menu-popover"
            role="dialog"
            aria-modal="true"
          >
            <div className="flex h-full flex-col overflow-hidden p-6">
              <div className="mb-2 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Logo />
                  <span className="font-semibold">LifetimeArt</span>
                </div>
                <button
                  type="button"
                  onClick={() => setShowMobileMenu(false)}
                  className="grid size-9 place-items-center rounded-lg hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-ring/40"
                  aria-label="Close menu"
                >
                  <svg viewBox="0 0 24 24" className="h-6 w-6">
                    <path
                      d="M6 6l12 12M18 6l-12 12"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </svg>
                </button>
              </div>

              <nav className="mt-16 flex flex-1 flex-col items-start text-xl" aria-label="Primary">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`relative w-full py-5 text-left transition-opacity duration-200 hover:opacity-100 hover:translate-x-1 ${
                      activeSection === link.href
                        ? "opacity-100 border-b-2 border-primary-foreground"
                        : "opacity-85"
                    }`}
                    onClick={() => {
                      setActiveSection(link.href);
                      setShowMobileMenu(false);
                    }}
                  >
                    {link.name}
                  </Link>
                ))}
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
export default Navbar;