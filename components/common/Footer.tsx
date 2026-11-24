

"use client";

import Image from "next/image";
import Container from "./Container";
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaYoutube } from "react-icons/fa";
import type { IconType } from "react-icons";

import {
  motion,
  useReducedMotion,
  type Variants,
} from "framer-motion";

import {
  Mail,
  Phone,
  MapPin,
  ChevronRight,
  type LucideIcon,
} from "lucide-react";

import { FooterData } from "@/types/template.type";
import Brand from "./Brand";

const footer = FooterData;

const EASE = [0.22, 1, 0.36, 1] as const;

const icons: Record<string, LucideIcon | IconType> = {
  Facebook: FaFacebookF,
  Instagram: FaInstagram,
  Youtube: FaYoutube,
  Linkedin: FaLinkedinIn,
  Mail,
  Phone,
  MapPin,
};

// ========================================
// FOOTER HEADING
// ========================================

function FooterHeading({
  title,
}: {
  title: string;
}) {
  return (
    <div className="mb-5">
      <h3 className="text-xl font-bold text-white xl:text-xl">
        {title}
      </h3>

      <span className="mt-2 block h-1 w-16 rounded-full bg-[#ff8000]" />
    </div>
  );
}

// ========================================
// FOOTER COMPONENT
// ========================================

export default function Footer({ year }: { year: number }) {
  const reduceMotion = useReducedMotion();

  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: reduceMotion ? 0 : 0.15,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: {
      opacity: 0,
      y: reduceMotion ? 0 : 25,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: reduceMotion ? 0 : 0.65,
        ease: EASE,
      },
    },
  };

  return (
    <footer className="overflow-hidden bg-primary text-white">

      <Container>
        <motion.div
          variants={containerVariants}
          initial={reduceMotion ? false : "hidden"}
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 gap-8 py-10 sm:grid-cols-2 lg:grid-cols-[1.15fr_0.85fr_1.15fr_1fr] lg:gap-0"
        >

          {/* ======================================== */}
          {/* BRAND INFORMATION */}
          {/* ======================================== */}

          <motion.div
            variants={itemVariants}
            className="lg:pr-8"
          >


            <Brand
              logo={footer.logo}
              logoAlt={footer.brand}
              handleNavigation={() => console.log("Tiffin-Sutra")}
            />

            <p className="mt-5 max-w-sm text-base leading-relaxed text-white/90">
              {footer.description}
            </p>

            {/* SOCIAL MEDIA LINKS */}

            <div className="mt-5 flex flex-wrap items-center gap-3">
              {footer.socialLinks.map((item) => {
                const Icon = icons[item.icon];

                if (!Icon) return null;

                const className =
                  "flex h-9.5 w-9.5 items-center justify-center rounded-xl border border-white/70 text-white transition-colors duration-300 hover:border-[#ff8000] hover:bg-[#ff8000]";

                return item.href ? (
                  <motion.a
                    key={item.icon}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={item.icon}
                    whileHover={
                      reduceMotion
                        ? undefined
                        : { y: -4 }
                    }
                    className={className}
                  >
                    <Icon size={18} />
                  </motion.a>
                ) : (
                  <span
                    key={item.icon}
                    aria-label={item.icon}
                    className={className}
                  >
                    <Icon size={18} />
                  </span>
                );
              })}
            </div>
          </motion.div>

          {/* ======================================== */}
          {/* QUICK LINKS */}
          {/* ======================================== */}

          <motion.div
            variants={itemVariants}
            className="lg:border-l lg:border-white/30 lg:px-8"
          >
            <FooterHeading
              title={footer.quickLinks.title}
            />

            <ul className="flex flex-col gap-3">
              {footer.quickLinks.links.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="group flex items-center gap-2 text-[14px] text-white/90 transition-colors hover:text-[#ff8000]"
                  >
                    <ChevronRight
                      size={18}
                      strokeWidth={3}
                      className="shrink-0 text-[#ff8000] transition-transform duration-300 group-hover:translate-x-1"
                    />

                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* ======================================== */}
          {/* PAYMENT METHODS */}
          {/* ======================================== */}

          <motion.div
            variants={itemVariants}
            className="lg:border-l lg:border-white/30 lg:px-8"
          >
            <FooterHeading
              title={footer.payments.title}
            />

            <div className="grid max-w-[300px] grid-cols-2 gap-3">
              {footer.payments.items.map((item) => (
                <motion.div
                  key={item.name}
                  whileHover={
                    reduceMotion
                      ? undefined
                      : { y: -3 }
                  }
                  className="relative flex h-14 relative items-center p-1 justify-center overflow-hidden rounded-xl bg-white p-3 shadow-md"
                >
                  {
                    item.image ?
                      <Image src={item.image} alt={item.name} fill className="object-cover" /> :
                      <span className="font-bold text-primary">{item.name}</span>
                  }
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* ======================================== */}
          {/* CONTACT INFORMATION */}
          {/* ======================================== */}

          <motion.div
            variants={itemVariants}
            className="lg:border-l lg:border-white/30 lg:pl-8"
          >
            <FooterHeading
              title={footer.contactInfo.title}
            />

            <div className="flex flex-col gap-5">
              {footer.contactInfo.items.map((item) => {
                const Icon = icons[item.icon] ?? Mail;

                return (
                  <div
                    key={item.icon}
                    className="flex items-start gap-4"
                  >
                    <Icon
                      size={25}
                      className="mt-0.5 shrink-0 text-white"
                    />

                    {item.href ? (
                      <a
                        href={item.href}
                        className="min-w-0 break-words text-sm md:text-[15px] leading-relaxed text-white/90 transition-colors hover:text-[#ff8000]"
                      >
                        {item.value}
                      </a>
                    ) : (
                      <p className="text-sm md:text-[15px] leading-relaxed text-white/90">
                        {item.value}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          </motion.div>
        </motion.div>
      </Container>

      {/* ======================================== */}
      {/* COPYRIGHT */}
      {/* ======================================== */}

      <div className="border-t border-white/40">
        <Container className="py-4">
          <p className="text-center text-sm font-medium text-white/90 md:text-left md:text-[15px]">
            © {year}{" "}
            {footer.copyright}
          </p>
        </Container>
      </div>

    </footer>
  );
}
