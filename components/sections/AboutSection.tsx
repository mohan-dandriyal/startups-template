


"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Container from "../common/Container";

import {
    motion,
    AnimatePresence,
    useReducedMotion,
    type Variants,
} from "framer-motion";

import { ChefHat, Play, X } from "lucide-react";

import { AboutData } from "@/types/template.type";

const about = AboutData;

const EASE = [0.22, 1, 0.36, 1] as const;

export default function AboutUs() {
    const [videoOpen, setVideoOpen] = useState(false);
    const reduceMotion = useReducedMotion();

    // Close video popup with Escape key
    useEffect(() => {
        if (!videoOpen) return;

        const handleEscape = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                setVideoOpen(false);
            }
        };

        const previousOverflow = document.body.style.overflow;

        document.body.style.overflow = "hidden";
        window.addEventListener("keydown", handleEscape);

        return () => {
            document.body.style.overflow = previousOverflow;
            window.removeEventListener("keydown", handleEscape);
        };
    }, [videoOpen]);

    // Container animation
    const containerVariants: Variants = {
        hidden: {},
        visible: {
            transition: {
                staggerChildren: reduceMotion ? 0 : 0.15,
            },
        },
    };

    // Content animation
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
            x: reduceMotion ? 0 : -40,
        },
        visible: {
            opacity: 1,
            x: 0,
            transition: {
                duration: reduceMotion ? 0 : 0.9,
                ease: EASE,
            },
        },
    };

    return (
        <>
            <section
                id="about"
                className="overflow-hidden bg-white"
            >
                <Container>

                    <div className="grid grid-cols-1 items-stretch gap-8 lg:grid-cols-[36.8%_1fr] lg:gap-[4.2vw]">

                        {/* LEFT SIDE - CHEF IMAGE */}
                        <motion.div
                            variants={imageVariants}
                            initial={reduceMotion ? false : "hidden"}
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.15 }}
                            className="group relative aspect-[0.61] self-start overflow-hidden rounded-2xl"
                        >
                            <Image
                                src={about.imageMain}
                                alt="TiffinSutra professional chef"
                                fill
                                sizes="(max-width: 1023px) 100vw, 37vw"
                                className="object-cover object-top transition-transform duration-700 motion-safe:group-hover:scale-105"
                            />
                        </motion.div>

                        {/* RIGHT SIDE - ABOUT CONTENT */}
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
                                className="mb-4 flex items-center gap-3"
                            >
                                <ChefHat
                                    size={26}
                                    strokeWidth={2.5}
                                    className="shrink-0 text-secondary"
                                />

                                <span className="shrink-0 text-sm font-extrabold uppercase text-foreground md:text-lg">
                                    {about.subtitle}
                                </span>

                                <motion.span
                                    initial={{ scaleX: reduceMotion ? 1 : 0 }}
                                    whileInView={{ scaleX: 1 }}
                                    viewport={{ once: true }}
                                    transition={{
                                        duration: reduceMotion ? 0 : 0.9,
                                        ease: EASE,
                                    }}
                                    className="h-[2px] max-w-[600px] flex-1 origin-left bg-[#ff8000]"
                                />
                            </motion.div>

                            {/* Section Heading */}
                            <motion.h2
                                variants={itemVariants}
                                className="text-[clamp(22px,2.8vw,50px)] max-w-[700px] font-bold leading-[1.15] tracking-[-0.025em] text-foreground"
                            >
                                Bringing Fresh, <span className="text-secondary">Home-Style Meals</span> to Your Everyday Life
                            </motion.h2>

                            {/* Orange Underline */}
                            <motion.div
                                variants={itemVariants}
                                className="mb-6 mt-2 h-[6px] w-20 rounded-full bg-[#ff8000]"
                            />

                            {/* About Description */}
                            <motion.p
                                variants={itemVariants}
                                className="mb-8 text-sm font-medium leading-[1.6] text-[#1b1b1b]/95  sm:text-[17px]"
                            >
                                {about.description1}{" "}
                                {about.description2}
                            </motion.p>

                            {/* BOTTOM CONTENT GRID */}
                            <div className="grid grid-cols-1 items-stretch gap-6 sm:grid-cols-2 xl:gap-8">

                                {/* Video Thumbnail */}
                                <motion.div
                                    variants={itemVariants}
                                    className="group w-full relative aspect-[1.1] overflow-hidden rounded-lg bg-gray-100"
                                >
                                    <Image
                                        src={about.aboutVideo}
                                        alt="Freshly prepared home-style tiffin meals"
                                        fill
                                        sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 30vw"
                                        className="object-cover transition-transform duration-700 motion-safe:group-hover:scale-105"
                                    />

                                    <div className="absolute inset-0 bg-black/5 transition-colors duration-300 group-hover:bg-black/15" />


                                    {/* Play Button */}
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <motion.button
                                            type="button"
                                            aria-label="Play about us video"
                                            onClick={() => setVideoOpen(true)}
                                            whileHover={
                                                reduceMotion ? undefined : { scale: 1.1 }
                                            }
                                            whileTap={
                                                reduceMotion ? undefined : { scale: 0.95 }
                                            }
                                            className="relative flex h-20 w-20 cursor-pointer items-center justify-center rounded-full bg-white shadow-xl xl:h-24 xl:w-24"
                                        >

                                            {/* Pulse Animation */}
                                            <motion.span
                                                aria-hidden="true"
                                                animate={
                                                    reduceMotion
                                                        ? undefined
                                                        : {
                                                            scale: [1, 1.4, 1.7],
                                                            opacity: [0.6, 0.3, 0],
                                                        }
                                                }
                                                transition={{
                                                    duration: 2,
                                                    repeat: Infinity,
                                                    ease: "easeOut",
                                                }}
                                                className="absolute inset-0 rounded-full bg-white/50"
                                            />


                                            <Play
                                                size={38}
                                                fill="#ff8000"
                                                stroke="#ff8000"
                                                className="relative ml-1"
                                            />
                                        </motion.button>
                                    </div>
                                </motion.div>

                                {/* Feature Content */}
                                <motion.div
                                    variants={itemVariants}
                                    className="flex flex-col justify-between gap-3"
                                >

                                    {/* Feature Heading and Description */}
                                    <div className="relative py-2 pl-6">

                                        {/* Orange Vertical Border */}
                                        <span className="absolute left-0 top-3 h-[80px] w-[7px] rounded-full bg-[#ff8000]" />

                                        <h3 className="mb-2 text-lg font-extrabold leading-tight text-foreground xl:text-[28px]">
                                            {about.feature.title}
                                        </h3>

                                        <p className="text-sm leading-relaxed text-[#1b1b1b]/95 sm:text-[17px]">
                                            {about.feature.description}
                                        </p>
                                    </div>

                                    {/* Small Food Image */}
                                    <div className="group relative aspect-[1.65] overflow-hidden rounded-lg">
                                        <Image
                                            src={about.imageSmall}
                                            alt="Fresh chapati, chickpea curry and salad"
                                            fill
                                            sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 30vw"
                                            className="object-cover transition-transform duration-700 motion-safe:group-hover:scale-105"
                                        />
                                    </div>

                                </motion.div>
                            </div>
                        </motion.div>
                    </div>
                </Container>
            </section>

            {/* VIDEO POPUP */}
            <AnimatePresence>
                {videoOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: reduceMotion ? 0 : 0.25 }}
                        onClick={() => setVideoOpen(false)}
                        className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/85 p-5 backdrop-blur-sm"
                    >
                        <motion.div
                            role="dialog"
                            aria-modal="true"
                            aria-label="About TiffinSutra video"
                            initial={{
                                opacity: 0,
                                scale: reduceMotion ? 1 : 0.9,
                            }}
                            animate={{
                                opacity: 1,
                                scale: 1,
                            }}
                            exit={{
                                opacity: 0,
                                scale: reduceMotion ? 1 : 0.9,
                            }}
                            transition={{
                                duration: reduceMotion ? 0 : 0.35,
                                ease: EASE,
                            }}
                            onClick={(event) => event.stopPropagation()}
                            className="relative w-full max-w-5xl"
                        >

                            {/* Close Button */}
                            <button
                                type="button"
                                autoFocus
                                aria-label="Close video"
                                onClick={() => setVideoOpen(false)}
                                className="absolute -top-12 right-0 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-white text-foreground transition-colors hover:bg-[#ff8000] hover:text-white"
                            >
                                <X size={24} />
                            </button>

                            {/* Video Player */}
                            <div className="aspect-video overflow-hidden rounded-xl bg-black shadow-2xl">
                                <p className="grid h-full place-items-center px-6 text-center text-white">
                                    The about video is currently unavailable.
                                </p>
                            </div>

                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
