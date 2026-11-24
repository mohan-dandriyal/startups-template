

"use client";

import { useEffect, useState } from "react";

import {
    motion,
    AnimatePresence,
    useReducedMotion,
} from "framer-motion";

import { ArrowRight, Menu, X } from "lucide-react";
import data from "@/data/template.json";
import Container from "./Container";
import Brand from "./Brand";

const header =
    data.categories.WedBliss.sections.Header.variants.WedBlissHeader2;

const EASE = [0.22, 1, 0.36, 1] as const;

export default function Header() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [active, setActive] = useState("#home");
    const [scrolled, setScrolled] = useState(false);

    const reduceMotion = useReducedMotion();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);

            const sections = [...header.navLinks, header.contactButton]
                .map((link) => document.getElementById(link.url.slice(1)))
                .filter((section): section is HTMLElement => !!section)
                .sort((first, second) => first.getBoundingClientRect().top - second.getBoundingClientRect().top);

            let current = "#home";

            sections.forEach((section) => {
                if (section.getBoundingClientRect().top <= 100) {
                    current = `#${section.id}`;
                }
            });

            setActive(current);
        };

        handleScroll();

        window.addEventListener("scroll", handleScroll, {
            passive: true,
        });

        return () =>
            window.removeEventListener("scroll", handleScroll);
    }, []);

    const handleNavigation = (href: string) => {
        setActive(href);
        setMenuOpen(false);
    };

    return (
        <motion.header
            initial={reduceMotion ? false : { y: -40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.65, ease: EASE }}
            className={`sticky top-0 z-50 w-full bg-white transition-shadow duration-300 ${scrolled ? "shadow-lg" : ""
                }`}
        >
           

            {/* Main Navigation */}
            <Container className="flex items-center justify-between gap-4">

                {/* Logo */}
               <Brand
                logo={header.logo}
                logoAlt= {header.logoAlt}
                handleNavigation ={handleNavigation}
               />

                {/* Desktop Menu */}
                <nav className="hidden items-center gap-[clamp(14px,2vw,36px)] xl:flex">
                    {header.navLinks.map((item) => {
                        const isActive = active === item.url;

                        return (
                            <a
                                key={item.id}
                                href={item.url}
                                aria-current={isActive ? "location" : undefined}
                                onClick={() => handleNavigation(item.url)}
                                className={`relative whitespace-nowrap py-4 text-sm font-bold uppercase transition-colors  ${isActive
                                        ? "text-[#ff4800]"
                                        : "text-[#10182d] hover:text-[#ff4800]"
                                    }`}
                            >
                                {item.label}

                                {isActive && (
                                    <motion.span
                                        layoutId="activeNav"
                                        className="absolute bottom-1 left-0 h-1 w-full rounded-full bg-[#ff4800]"
                                        transition={{
                                            duration: reduceMotion ? 0 : 0.3,
                                        }}
                                    />
                                )}
                            </a>
                        );
                    })}
                </nav>

                {/* Contact Button */}
                <motion.div
                    whileHover={reduceMotion ? {} : { scale: 1.04 }}
                    whileTap={reduceMotion ? {} : { scale: 0.96 }}
                    className="hidden shrink-0 xl:block"
                >
                    <a
                        href={header.contactButton.url}
                        onClick={() => handleNavigation(header.contactButton.url)}
                        className="flex items-center gap-3 rounded-lg bg-[#ff4800] px-4 py-3 text-sm font-bold uppercase text-white transition-colors hover:bg-[#e83e00] 2xl:text-base"
                    >
                        {header.contactButton.text}
                        <ArrowRight size={21} />
                    </a>
                </motion.div>

                {/* Mobile Menu Button */}
                <button
                    type="button"
                    aria-label={menuOpen ? "Close menu" : "Open menu"}
                    aria-expanded={menuOpen}
                    onClick={() => setMenuOpen(!menuOpen)}
                    className="rounded-lg bg-[#ff4800] p-3 text-white xl:hidden"
                >
                    {menuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </Container>

            {/* Mobile Navigation */}
            <AnimatePresence>
                {menuOpen && (
                    <motion.nav
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{
                            duration: reduceMotion ? 0 : 0.3,
                            ease: EASE,
                        }}
                        className="absolute left-0 top-full w-full overflow-hidden border-t border-gray-100 bg-white shadow-xl xl:hidden"
                    >
                        <div className="max-h-[75dvh] overflow-y-auto px-5 py-5">
                            {header.navLinks.map((item, index) => (
                                <motion.div
                                    key={item.id}
                                    initial={
                                        reduceMotion ? false : { x: -15, opacity: 0 }
                                    }
                                    animate={{ x: 0, opacity: 1 }}
                                    transition={{
                                        delay: reduceMotion ? 0 : index * 0.04,
                                    }}
                                >
                                    <a
                                        href={item.url}
                                        onClick={() => handleNavigation(item.url)}
                                        className={`block border-b border-gray-100 px-3 py-4 text-sm font-bold uppercase ${active === item.url
                                                ? "text-[#ff4800]"
                                                : "text-[#031a35]"
                                            }`}
                                    >
                                        {item.label}
                                    </a>
                                </motion.div>
                            ))}

                            <a
                                href={header.contactButton.url}
                                onClick={() =>
                                    handleNavigation(header.contactButton.url)
                                }
                                className="mt-5 flex items-center justify-center gap-3 rounded-lg bg-[#ff4800] px-5 py-4 font-bold uppercase text-white"
                            >
                                {header.contactButton.text}
                                <ArrowRight size={20} />
                            </a>
                        </div>
                    </motion.nav>
                )}
            </AnimatePresence>
        </motion.header>
    );
}
