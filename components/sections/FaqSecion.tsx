



"use client";

import { useState } from "react";
import Image from "next/image";
import Container from "../common/Container";

import {
  motion,
  AnimatePresence,
  useReducedMotion,
  type Variants,
} from "framer-motion";

import {
  MessageCircleQuestion,
  Plus,
  Minus,
} from "lucide-react";

import { FaqData } from "@/types/template.type";

const section = FaqData;

const EASE = [0.22, 1, 0.36, 1] as const;

export default function FAQ() {
  const reduceMotion = useReducedMotion();

  // First FAQ open by default
  const [activeId, setActiveId] = useState<string | null>(
    section.faqs[0]?.id ?? null
  );

  // Toggle FAQ
  const toggleFAQ = (id: string) => {
    setActiveId((previous) =>
      previous === id ? null : id
    );
  };

  // ========================================
  // ANIMATION VARIANTS
  // ========================================

  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: reduceMotion ? 0 : 0.12,
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

  const leftVariants: Variants = {
    hidden: {
      opacity: 0,
      x: reduceMotion ? 0 : -40,
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: reduceMotion ? 0 : 0.8,
        ease: EASE,
      },
    },
  };

  return (
    <section
      id="faq"
      className="relative isolate overflow-hidden"
    >
      {/* ======================================== */}
      {/* BACKGROUND IMAGE */}
      {/* ======================================== */}

      <div className="absolute top-0 left-0 w-full h-full bg-[#001c41]/98" />

      <Image
        src={section.backgroundImage || ""}
        alt=""
        fill
        sizes="100vw"
        className="-z-20 object-cover object-left-bottom"
      />

      {/* Mobile Background Overlay */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-primary/80 lg:hidden"
      />

      <Container className="relative pt-14 md:pt-18 lg:pb-0 pb-14 ">

        {/* Main Grid */}
        <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.5fr)] lg:gap-12 xl:gap-16">

          {/* ======================================== */}
          {/* LEFT SIDE CONTENT */}
          {/* ======================================== */}

          <motion.div
            variants={leftVariants}
            initial={reduceMotion ? false : "hidden"}
            whileInView="visible"
            viewport={{
              once: true,
              amount: 0.2,
            }}
            className="relative min-w-0"
          >

            {/* FAQ Icon */}
            <motion.div
              initial={{
                scale: reduceMotion ? 1 : 0.8,
                opacity: reduceMotion ? 1 : 0,
              }}
              whileInView={{
                scale: 1,
                opacity: 1,
              }}
              viewport={{ once: true }}
              transition={{
                duration: reduceMotion ? 0 : 0.6,
                ease: EASE,
              }}
              className="mb-5 inline-flex text-highlight"
            >
              <MessageCircleQuestion
                size={64}
                strokeWidth={2}
                className="h-12 w-12 md:h-16 md:w-16"
              />
            </motion.div>

            {/* Optional Subtitle */}
            {section.subtitle && (
              <p className="mb-3 text-lg font-bold uppercase text-white">
                {section.subtitle}
              </p>
            )}

            {/* Main Heading */}
            <h2 className="text-[clamp(22px,2.8vw,50px)] font-extrabold leading-[1.1] tracking-[-0.035em] text-white">

              <span className="block">
                {section.title1}
              </span>

              <span className="block text-highlight">
                {section.title2}
              </span>

            </h2>

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
              className="mb-4 mt-5 h-[6px] w-32 origin-left rounded-full bg-[#ff6500]"
            />

            {/* Description */}
            <p className="max-w-xl text-sm font-medium leading-relaxed text-white/95 md:text-[17px]">
              {section.description}
            </p>


            <div className="relative w-full min-h-[400px] lg:flex hidden">
              <Image src={section.image} alt="" fill className="" />
            </div>

          </motion.div>

          {/* RIGHT SIDE FAQ ACCORDION */}
          <motion.div
            variants={containerVariants}
            initial={reduceMotion ? false : "hidden"}
            whileInView="visible"
            viewport={{
              once: true,
              amount: 0.1,
            }}
            className="flex min-w-0 flex-col gap-6 lg:pt-6"
          >

            {section.faqs.map((faq) => {
              const isOpen = activeId === faq.id;

              return (
                <motion.article
                  key={faq.id}
                  variants={itemVariants}
                  className={`overflow-hidden rounded-2xl shadow-[0_5px_15px_rgba(0,0,0,0.12)] transition-colors duration-300 md:rounded-[20px] ${
                    isOpen
                      ? "bg-[#fff2e8]"
                      : "bg-white"
                  }`}
                >

                  {/* FAQ QUESTION */}
                  <h3>
                    <button
                      type="button"
                      id={`faq-button-${faq.id}`}
                      aria-expanded={isOpen}
                      aria-controls={`faq-answer-${faq.id}`}
                      onClick={() => toggleFAQ(faq.id)}
                      className={`flex w-full cursor-pointer items-center justify-between gap-4 rounded-2xl px-5 py-4 text-left transition-colors duration-300 md:rounded-[20px] md:px-7 lg:px-8 xl:py-4 ${
                        isOpen
                          ? "bg-[#ff6500] text-white"
                          : "bg-white text-foreground hover:bg-orange-50"
                      }`}
                    >

                      {/* Question Text */}
                      <span className="text-base font-bold leading-snug tracking-[-0.02em] md:text-xl xl:text-[19px]">
                        {faq.question}
                      </span>

                      {/* Animated Plus / Minus Icon */}
                      <motion.span
                        animate={{
                          rotate: reduceMotion
                            ? 0
                            : isOpen
                              ? 180
                              : 0,
                        }}
                        transition={{
                          duration: reduceMotion ? 0 : 0.3,
                          ease: EASE,
                        }}
                        className={`flex shrink-0 items-center justify-center ${
                          isOpen
                            ? "text-white"
                            : "text-highlight"
                        }`}
                      >
                        {isOpen ? (
                          <Minus
                            size={30}
                            strokeWidth={3.5}
                          />
                        ) : (
                          <Plus
                            size={30}
                            strokeWidth={3.5}
                          />
                        )}
                      </motion.span>

                    </button>
                  </h3>

                  {/* FAQ ANSWER */}
                  <div
                    id={`faq-answer-${faq.id}`}
                    role="region"
                    aria-labelledby={`faq-button-${faq.id}`}
                  >
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
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
                            height: {
                              duration: reduceMotion
                                ? 0
                                : 0.4,
                              ease: EASE,
                            },
                            opacity: {
                              duration: reduceMotion
                                ? 0
                                : 0.25,
                            },
                          }}
                          className="overflow-hidden"
                        >
                          <div className="px-5 py-5 md:px-7 lg:px-8 xl:py-4">
                            <p className="text-base font-medium leading-snug text-[#334155] md:text-[17px]">
                              {faq.answer}
                            </p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                </motion.article>
              );
            })}

          </motion.div>
        </div>
      </Container>
    </section>
  );
}
