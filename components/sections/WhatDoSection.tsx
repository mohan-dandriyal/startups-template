


"use client";

import Image from "next/image";
import Container from "../common/Container";

import {
  motion,
  useReducedMotion,
  type Variants,
} from "framer-motion";

import {
  ConciergeBell,
  Leaf,
  ChefHat,
  type LucideIcon,
} from "lucide-react";

import { WhatWeDoData } from "@/types/template.type";

const section = WhatWeDoData;

const EASE = [0.22, 1, 0.36, 1] as const;

// Dynamic icon mapping
const icons: Record<string, LucideIcon> = {
  ConciergeBell,
  Leaf,
  ChefHat,
};

export default function WhatWeDo() {
  const reduceMotion = useReducedMotion();

  // Container animation
  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: reduceMotion ? 0 : 0.15,
        delayChildren: reduceMotion ? 0 : 0.1,
      },
    },
  };

  // Content reveal animation
  const itemVariants: Variants = {
    hidden: {
      opacity: 0,
      y: reduceMotion ? 0 : 30,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: reduceMotion ? 0 : 0.7,
        ease: EASE,
      },
    },
  };

  // Image animation
  const imageVariants: Variants = {
    hidden: {
      opacity: 0,
      x: reduceMotion ? 0 : 45,
      scale: reduceMotion ? 1 : 0.97,
    },
    visible: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: {
        duration: reduceMotion ? 0 : 0.9,
        ease: EASE,
      },
    },
  };

  return (
    <section
      id="why-choose-us"
      className="overflow-hidden bg-white "
    >
      <Container>

        {/* Main Grid */}
        <div className="grid grid-cols-1 items-stretch gap-8 lg:grid-cols-[minmax(0,2.3fr)_minmax(0,1fr)]">

          {/* ============================== */}
          {/* LEFT SIDE CONTENT */}
          {/* ============================== */}

          <motion.div
            variants={containerVariants}
            initial={reduceMotion ? false : "hidden"}
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            className="flex min-w-0 flex-col"
          >

            {/* Section Subtitle */}
            <motion.div
              variants={itemVariants}
              className="mb-7"
            >
              <span className=" font-extrabold uppercase text-foreground text-sm md:text-lg">
                {section.subtitle}
              </span>

              <motion.div
                initial={{
                  scaleX: reduceMotion ? 1 : 0,
                }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{
                  duration: reduceMotion ? 0 : 0.7,
                  ease: EASE,
                }}
                className="mt-2 h-1 w-20 origin-left bg-[#ff7900]"
              />
            </motion.div>

            {/* Main Heading */}
            <motion.h2
              variants={itemVariants}
              className="mb-8 text-[clamp(22px,2.8vw,50px)] font-extrabold leading-[1.15] tracking-[-0.035em] text-foreground lg:mb-10"
            >
              <span className="block">
                {section.title1}
              </span>

              {section.title2}{" "}

              <span className="text-secondary">
                {section.title3}
              </span>
            </motion.h2>

            {/* Description and Features Grid */}
            <div className="grid flex-1 grid-cols-1 items-stretch gap-7 md:grid-cols-2 xl:gap-9">

              <motion.div
                variants={itemVariants}
                className="relative flex h-full flex-col justify-center overflow-hidden rounded-lg bg-primary px-6 py-9 text-white sm:px-8 xl:px-9 xl:py-9"
              >
                {/* Background Gradient */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,#082b56_0%,transparent_75%)]"
                />

                <div className="relative z-10">

                  {/* Orange Divider */}
                  <motion.div
                    initial={{
                      scaleX: reduceMotion ? 1 : 0,
                    }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: reduceMotion ? 0 : 0.8,
                      ease: EASE,
                    }}
                    className="mb-6 h-[7px] w-28 origin-left rounded-full bg-[#ff7900]"
                  />

                  {/* Dynamic Paragraphs */}
                  <div className="space-y-5">
                    {section.description
                      .split("\n")
                      .filter(Boolean)
                      .map((paragraph, index) => (
                        <p
                          key={index}
                          className="text-sm text-white/95 md:text-[17px] leading-[1.5]"
                        >
                          {paragraph}
                        </p>
                      ))}
                  </div>

                </div>
              </motion.div>

              <motion.div
                variants={containerVariants}
                className="relative flex flex-col justify-between gap-7 md:pl-7 xl:gap-9 xl:pl-9"
              >
                {/* Vertical Orange Line */}
                <motion.span
                  aria-hidden="true"
                  initial={{
                    scaleY: reduceMotion ? 1 : 0,
                  }}
                  whileInView={{ scaleY: 1 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: reduceMotion ? 0 : 0.9,
                    ease: EASE,
                  }}
                  className="absolute bottom-3 left-0 top-3 hidden w-[3px] origin-top rounded-full bg-[#ff7900] md:block"
                />

                {section.features.map((feature) => {
                  const Icon =
                    icons[feature.icon] ?? ChefHat;

                  return (
                    <motion.div
                      key={feature.id}
                      variants={itemVariants}
                      className="group flex items-start gap-4 xl:gap-6"
                    >

                      {/* Feature Icon */}
                      <motion.div
                        whileHover={
                          reduceMotion
                            ? undefined
                            : {
                              scale: 1.08,
                              rotate: -5,
                            }
                        }
                        transition={{
                          duration: 0.3,
                          ease: EASE,
                        }}
                        className="flex h-[50px] w-[50px] shrink-0 items-center justify-center rounded-2xl bg-[#fff1e5] text-secondary transition-colors duration-300 group-hover:bg-[#ff7900] group-hover:text-white xl:h-[clamp(50px,5.45vw,60px)] xl:w-[clamp(50px,5.45vw,60px)]"
                      >
                        <Icon
                          strokeWidth={1.8}
                          className="h-8 w-8 xl:h-10 xl:w-10"
                        />
                      </motion.div>

                      {/* Feature Text */}
                      <div className="min-w-0 flex-1 py-1">
                        <h3 className="mb-2 text-lg font-bold leading-tight tracking-[-0.025em] text-foreground transition-colors duration-300 group-hover:text-secondary xl:text-[20px]">
                          {feature.title}
                        </h3>

                        <p className="text-sm leading-relaxed text-[#334155] md:text-[17px]">
                          {feature.description}
                        </p>
                      </div>

                    </motion.div>
                  );
                })}
              </motion.div>
            </div>
          </motion.div>

          {/* ============================== */}
          {/* RIGHT SIDE IMAGE */}
          {/* ============================== */}

          <motion.div
            variants={imageVariants}
            initial={reduceMotion ? false : "hidden"}
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            className="group relative min-h-[400px] overflow-hidden rounded-[22px] sm:min-h-[500px] lg:mt-10 lg:min-h-0"
          >
            <Image
              src={section.image}
              alt="Fresh and healthy home-style Indian thali"
              fill
              sizes="(max-width: 1023px) 100vw, 30vw"
              className="object-cover object-center transition-transform duration-700 ease-out motion-safe:group-hover:scale-105"
            />
          </motion.div>

        </div>
      </Container>
    </section>
  );
}
