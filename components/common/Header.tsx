
"use client";

import {
  useEffect,
  useState,
  useRef,
  useCallback,
  type MouseEvent,
} from "react";

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

  const headerRef = useRef<HTMLElement>(null);
  const scrollingRef = useRef(false);
  const scrollTimerRef = useRef<number | null>(null);

  const reduceMotion = useReducedMotion();

  // ========================================
  // SCROLL TO SECTION
  // ========================================

  const scrollToSection = useCallback(
    (href: string) => {
      if (!href.startsWith("#")) return false;

      const id = href.slice(1);
      const section = document.getElementById(id);

      if (!section && href !== "#home") {
        console.warn(`Section not found: ${href}`);
        return false;
      }

      const headerHeight =
        headerRef.current?.offsetHeight ?? 80;

      const top =
        href === "#home"
          ? 0
          : Math.max(
              0,
              section!.getBoundingClientRect().top +
                window.scrollY -
                headerHeight
            );

      scrollingRef.current = true;

      if (scrollTimerRef.current !== null) {
        window.clearTimeout(scrollTimerRef.current);
      }

      window.scrollTo({
        top,
        behavior: reduceMotion ? "instant" : "smooth",
      });

      scrollTimerRef.current = window.setTimeout(() => {
        scrollingRef.current = false;
      }, reduceMotion ? 0 : 1000);

      return true;
    },
    [reduceMotion]
  );

  // ========================================
  // COMMON NAVIGATION HANDLER
  // ========================================

  const handleNavigation = useCallback(
    (href: string) => {
      setMenuOpen(false);

      if (!href.startsWith("#")) return;

      const section = document.getElementById(
        href.slice(1)
      );

      if (!section && href !== "#home") {
        console.warn(`Section not found: ${href}`);
        return;
      }

      setActive(href);

      if (window.location.hash !== href) {
        window.history.pushState(null, "", href);
      }

      // Wait for the next browser rendering frame
      requestAnimationFrame(() => {
        scrollToSection(href);
      });
    },
    [scrollToSection]
  );

  // ========================================
  // ANCHOR CLICK HANDLER
  // ========================================

  const handleLinkClick = (
    event: MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    if (
      event.defaultPrevented ||
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey
    ) {
      return;
    }

    if (!href.startsWith("#")) {
      setMenuOpen(false);
      return;
    }

    event.preventDefault();

    handleNavigation(href);
  };

  // ========================================
  // ACTIVE NAVIGATION SCROLL SPY
  // ========================================

  useEffect(() => {
    let frameId = 0;

    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      if (scrollingRef.current) return;

      const headerHeight =
        headerRef.current?.offsetHeight ?? 80;

      const sections = [
        ...header.navLinks,
        header.contactButton,
      ]
        .filter((link) => link.url.startsWith("#"))
        .map((link) =>
          document.getElementById(link.url.slice(1))
        )
        .filter(
          (section): section is HTMLElement =>
            section !== null
        )
        .sort(
          (first, second) =>
            first.getBoundingClientRect().top -
            second.getBoundingClientRect().top
        );

      let current = "#home";

      sections.forEach((section) => {
        if (
          section.getBoundingClientRect().top <=
          headerHeight + 30
        ) {
          current = `#${section.id}`;
        }
      });

      // Activate last section at the bottom
      const isBottom =
        window.scrollY + window.innerHeight >=
        document.documentElement.scrollHeight - 10;

      if (
        isBottom &&
        window.scrollY > 0 &&
        sections.length > 0
      ) {
        current = `#${sections[sections.length - 1].id}`;
      }

      setActive(current);
    };

    const onScroll = () => {
      cancelAnimationFrame(frameId);

      frameId = requestAnimationFrame(handleScroll);
    };

    handleScroll();

    window.addEventListener("scroll", onScroll, {
      passive: true,
    });

    window.addEventListener("resize", onScroll);

    return () => {
      cancelAnimationFrame(frameId);

      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  // ========================================
  // BROWSER BACK / FORWARD NAVIGATION
  // ========================================

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash || "#home";

      setActive(hash);
      setMenuOpen(false);
      scrollToSection(hash);
    };

    if (window.location.hash) {
      handleHashChange();
    }

    window.addEventListener(
      "hashchange",
      handleHashChange
    );

    return () => {
      window.removeEventListener(
        "hashchange",
        handleHashChange
      );

      if (scrollTimerRef.current !== null) {
        window.clearTimeout(scrollTimerRef.current);
      }
    };
  }, [scrollToSection]);

  // ========================================
  // CLOSE MOBILE MENU ON DESKTOP
  // ========================================

  useEffect(() => {
    const mediaQuery = window.matchMedia(
      "(min-width: 1280px)"
    );

    const handleResize = () => {
      if (mediaQuery.matches) {
        setMenuOpen(false);
      }
    };

    mediaQuery.addEventListener(
      "change",
      handleResize
    );

    return () => {
      mediaQuery.removeEventListener(
        "change",
        handleResize
      );
    };
  }, []);

  // ========================================
  // CLOSE MENU WITH ESCAPE KEY
  // ========================================

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener(
        "keydown",
        handleKeyDown
      );
    };
  }, []);

  return (
    <motion.header
      ref={headerRef}
      initial={
        reduceMotion
          ? false
          : { y: -40, opacity: 0 }
      }
      animate={{ y: 0, opacity: 1 }}
      transition={{
        duration: reduceMotion ? 0 : 0.65,
        ease: EASE,
      }}
      className={`sticky top-0 z-50 w-full bg-white transition-shadow duration-300 ${
        scrolled ? "shadow-lg" : ""
      }`}
    >
      {/* Main Navigation */}

      <Container className="flex items-center justify-between gap-4">

        {/* Logo */}

        <Brand
          logo={header.logo}
          logoAlt={header.logoAlt}
          handleNavigation={handleNavigation}
        />

        {/* Desktop Navigation */}

        <nav
          aria-label="Desktop navigation"
          className="hidden items-center gap-[clamp(14px,2vw,36px)] xl:flex"
        >
          {header.navLinks.map((item) => {
            const isActive = active === item.url;

            return (
              <a
                key={item.id}
                href={item.url}
                aria-current={
                  isActive ? "location" : undefined
                }
                onClick={(event) =>
                  handleLinkClick(event, item.url)
                }
                className={`relative whitespace-nowrap py-4 text-sm font-bold uppercase transition-colors ${
                  isActive
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

        {/* Desktop Contact Button */}

        <motion.div
          whileHover={
            reduceMotion ? undefined : { scale: 1.04 }
          }
          whileTap={
            reduceMotion ? undefined : { scale: 0.96 }
          }
          className="hidden shrink-0 xl:block"
        >
          <a
            href={header.contactButton.url}
            onClick={(event) =>
              handleLinkClick(
                event,
                header.contactButton.url
              )
            }
            className="flex items-center gap-3 rounded-lg bg-[#ff4800] px-4 py-3 text-sm font-bold uppercase text-white transition-colors hover:bg-[#e83e00] 2xl:text-base"
          >
            {header.contactButton.text}

            <ArrowRight size={21} />
          </a>
        </motion.div>

        {/* Mobile Menu Toggle */}

        <button
          type="button"
          aria-label={
            menuOpen ? "Close menu" : "Open menu"
          }
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation"
          onClick={() =>
            setMenuOpen((previous) => !previous)
          }
          className="rounded-lg bg-[#ff4800] p-3 text-white xl:hidden"
        >
          {menuOpen ? (
            <X size={24} />
          ) : (
            <Menu size={24} />
          )}
        </button>
      </Container>

      {/* Mobile Navigation */}

      <AnimatePresence initial={false}>
        {menuOpen && (
          <motion.nav
            id="mobile-navigation"
            aria-label="Mobile navigation"
            initial={{
              height: 0,
              opacity: 0,
            }}
            animate={{
              height: "auto",
              opacity: 1,
            }}
            exit={{
              height: 0,
              opacity: 0,
            }}
            transition={{
              duration: reduceMotion ? 0 : 0.3,
              ease: EASE,
            }}
            className="absolute left-0 top-full w-full overflow-hidden border-t border-gray-100 bg-white shadow-xl xl:hidden"
          >
            <div className="max-h-[75dvh] overflow-y-auto overscroll-contain px-5 py-5">

              {header.navLinks.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={
                    reduceMotion
                      ? false
                      : { x: -15, opacity: 0 }
                  }
                  animate={{
                    x: 0,
                    opacity: 1,
                  }}
                  transition={{
                    delay: reduceMotion
                      ? 0
                      : index * 0.04,
                  }}
                >
                  <a
                    href={item.url}
                    aria-current={
                      active === item.url
                        ? "location"
                        : undefined
                    }
                    onClick={(event) =>
                      handleLinkClick(event, item.url)
                    }
                    className={`block border-b border-gray-100 px-3 py-4 text-sm font-bold uppercase transition-colors ${
                      active === item.url
                        ? "text-[#ff4800]"
                        : "text-[#031a35]"
                    }`}
                  >
                    {item.label}
                  </a>
                </motion.div>
              ))}

              {/* Mobile Contact Button */}

              <a
                href={header.contactButton.url}
                onClick={(event) =>
                  handleLinkClick(
                    event,
                    header.contactButton.url
                  )
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
