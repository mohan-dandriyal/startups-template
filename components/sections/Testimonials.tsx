


"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Container from "../common/Container";

import {
    motion,
    useReducedMotion,
    useMotionValue,
    useAnimationFrame,
    type Variants,
} from "framer-motion";

import {
    ChefHat,
    Star,
    Quote,
} from "lucide-react";

import data from "@/data/template.json";

const section =
    data.categories.WedBliss.sections.Testimonials.variants
        .WedBlissTestimonials2;

const EASE = [0.22, 1, 0.36, 1] as const;

// ========================================
// TYPES
// ========================================

interface Testimonial {
    id: string;
    name: string;
    designation: string;
    image: string;
    rating: number;
    description: string;
}

interface MarqueeRowProps {
    items: Testimonial[];
    direction?: "left" | "right";
    speed?: number;
}

// ========================================
// TESTIMONIAL CARD
// ========================================

function TestimonialCard({
    item,
}: {
    item: Testimonial;
}) {
    return (
        <article className="group relative flex h-full w-[300px] shrink-0 flex-col rounded-[24px] border border-gray-200 bg-white p-4 shadow-[0_4px_8px_rgba(0,0,0,0.08)] transition-shadow duration-300 hover:shadow-lg lg:w-[clamp(290px,23.6vw,435px)]">

            {/* Quote Icon */}
            <Quote
                aria-hidden="true"
                size={42}
                strokeWidth={0}
                fill="currentColor"
                className="absolute right-6 top-5 rotate-180 text-[#ffd5b8]"
            />

            {/* Customer Image and Rating */}
            <div className="mb-4 flex items-center gap-4">

                {/* Profile Image */}
                <div className="relative h-[68px] w-[68px] shrink-0 overflow-hidden rounded-full border-2 border-[#ff8000] xl:h-[clamp(55px,3.5vw,68px)] xl:w-[clamp(55px,3.5vw,68px)]">
                    <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        sizes="85px"
                        className="object-cover transition-transform duration-500 motion-safe:group-hover:scale-110"
                    />
                </div>

                {/* Star Rating */}
                <div
                    aria-label={`${item.rating} out of 5 stars`}
                    className="flex items-center gap-[2px]"
                >
                    {Array.from({ length: 5 }).map((_, index) => (
                        <Star
                            key={index}
                            aria-hidden="true"
                            size={22}
                            strokeWidth={1.5}
                            className={
                                index < item.rating
                                    ? "fill-[#ff8000] text-secondary"
                                    : "fill-gray-200 text-gray-200"
                            }
                        />
                    ))}
                </div>
            </div>

            {/* Review Description */}
            <p className="mb-4 flex-1 px-2 text-sm font-medium leading-[1.55] text-[#252b38] xl:text-[16px]">
                {item.description}
            </p>

            {/* Customer Information */}
            <div className="relative mt-auto rounded-2xl bg-[#fff2e8] px-5 py-3 pl-9">

                {/* Orange Vertical Line */}
                <span className="absolute bottom-3 left-5 top-3 w-[4px] rounded-full bg-[#ff8000]" />

                <h3 className="md:text-[17px] font-bold leading-tight tracking-[-0.02em] text-foreground ">
                    {item.name}
                </h3>

                <p className="mt-1 text-sm font-medium text-[#334155] xl:text-[15px]">
                    {item.designation}
                </p>

            </div>
        </article>
    );
}

// ========================================
// INFINITE MARQUEE ROW
// ========================================

function MarqueeRow({
    items,
    direction = "left",
    speed = 40,
}: MarqueeRowProps) {
    const reduceMotion = useReducedMotion();

    const viewportRef = useRef<HTMLDivElement>(null);
    const groupRef = useRef<HTMLDivElement>(null);

    const [hovered, setHovered] = useState(false);
    const [focused, setFocused] = useState(false);
    const [copies, setCopies] = useState(2);

    const widthRef = useRef(0);
    const x = useMotionValue(0);

    // Measure content width for seamless looping
    useEffect(() => {
        const group = groupRef.current;
        const viewport = viewportRef.current;

        if (!group || !viewport) return;

        const updateWidth = () => {
            const width = group.getBoundingClientRect().width;

            if (width <= 0) return;

            widthRef.current = width;

            setCopies(
                Math.max(
                    2,
                    Math.ceil(viewport.clientWidth / width) + 1
                )
            );

            x.set(
                ((x.get() % width) + width) % width - width
            );
        };

        updateWidth();

        const observer = new ResizeObserver(updateWidth);

        observer.observe(group);
        observer.observe(viewport);

        return () => observer.disconnect();
    }, [items, x, reduceMotion]);

    // Continuous animation
    useAnimationFrame((_, delta) => {
        if (
            hovered ||
            focused ||
            reduceMotion ||
            widthRef.current <= 0
        ) {
            return;
        }

        const width = widthRef.current;

        const distance =
            (Math.min(delta, 64) / 1000) * speed;

        const next =
            x.get() +
            (direction === "left" ? -distance : distance);

        // Seamless position wrapping
        x.set(((next % width) + width) % width - width);
    });

    if (!items.length) return null;

    return (
        <div
            ref={viewportRef}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            onFocusCapture={() => setFocused(true)}
            onBlurCapture={(event) => {
                if (
                    !event.currentTarget.contains(event.relatedTarget)
                ) {
                    setFocused(false);
                }
            }}
            className={`relative w-full py-2 ${reduceMotion
                ? "overflow-x-auto"
                : "overflow-hidden"
                }`}
        >
            <motion.div
                style={{ x: reduceMotion ? 0 : x }}
                className="flex w-max items-stretch"
            >
                {Array.from({
                    length: reduceMotion ? 1 : copies,
                }).map((_, groupIndex) => (
                    <div
                        key={groupIndex}
                        ref={groupIndex === 0 ? groupRef : undefined}
                        aria-hidden={groupIndex !== 0}
                        className="flex shrink-0 items-stretch gap-5 pr-5"
                    >
                        {items.map((item) => (
                            <TestimonialCard
                                key={`${groupIndex}-${item.id}`}
                                item={item}
                            />
                        ))}
                    </div>
                ))}
            </motion.div>
        </div>
    );
}

// ========================================
// MAIN TESTIMONIALS SECTION
// ========================================

export default function Testimonials() {
    const reduceMotion = useReducedMotion();


    const testimonials = section.testimonials;

    // Divide testimonials into two rows
    const middle = Math.ceil(testimonials.length / 2);

    const firstRow = testimonials.slice(0, middle);
    const secondRow = testimonials.slice(middle);

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
                duration: reduceMotion ? 0 : 0.7,
                ease: EASE,
            },
        },
    };

    return (
        <section
            id="testimonials"
            className="overflow-hidden bg-white"
        >
            {/* ============================== */}
            {/* SECTION HEADING */}
            {/* ============================== */}
            <Container>
              <motion.div
                  variants={containerVariants}
                  initial={reduceMotion ? false : "hidden"}
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.2 }}
                  className="mb-10 text-center lg:mb-8"
              >

                  {/* Subtitle */}
                  <motion.div
                      variants={itemVariants}
                      className="mb-3 flex items-center justify-center gap-3 md:gap-4"
                  >

                      {/* Left Orange Line */}
                      <motion.span
                          initial={{ scaleX: reduceMotion ? 1 : 0 }}
                          whileInView={{ scaleX: 1 }}
                          viewport={{ once: true }}
                          transition={{
                              duration: reduceMotion ? 0 : 0.7,
                              ease: EASE,
                          }}
                          className="h-[2px] w-10 origin-right bg-[#ff8000] sm:w-20 lg:w-24"
                      />

                      <ChefHat
                          size={26}
                          strokeWidth={2.5}
                          className="shrink-0 text-secondary"
                      />

                      <span className="text-sm font-extrabold uppercase tracking-wide text-foreground sm:text-lg">
                          {section.subtitle}
                      </span>

                      {/* Right Orange Line */}
                      <motion.span
                          initial={{ scaleX: reduceMotion ? 1 : 0 }}
                          whileInView={{ scaleX: 1 }}
                          viewport={{ once: true }}
                          transition={{
                              duration: reduceMotion ? 0 : 0.7,
                              ease: EASE,
                          }}
                          className="h-[2px] w-10 origin-left bg-[#ff8000] sm:w-20 lg:w-24"
                      />

                  </motion.div>

                  {/* Main Heading */}
                  <motion.h2
                      variants={itemVariants}
                      className="text-[clamp(22px,2.8vw,50px)] font-extrabold leading-[1.15] tracking-[-0.025em] text-foreground"
                  >
                      {section.title1}{" "}

                      <span className="text-secondary">
                          {section.title2}
                      </span>
                  </motion.h2>

              </motion.div>
            </Container>

            <motion.div
                initial={{
                    opacity: reduceMotion ? 1 : 0,
                    y: reduceMotion ? 0 : 30,
                }}
                whileInView={{
                    opacity: 1,
                    y: 0,
                }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{
                    duration: reduceMotion ? 0 : 0.8,
                    ease: EASE,
                }}
                className="relative flex flex-col gap-2 md:gap-3"
            >

                {/* First Row: Right to Left */}
                <MarqueeRow
                    items={firstRow}
                    direction="left"
                    speed={40}
                />

                {/* Second Row: Left to Right */}
                <MarqueeRow
                    items={secondRow}
                    direction="right"
                    speed={40}
                />

            </motion.div>


        </section>
    );
}
