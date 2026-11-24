
"use client";

import Image from "next/image";

import {
    motion,
    useReducedMotion,
    type Variants,
} from "framer-motion";

import { Star } from "lucide-react";
import data from "@/data/template.json";
import Container from "../common/Container";

const hero =
    data.categories.WedBliss.sections.Hero.variants.WedBlissHero2;

const EASE = [0.22, 1, 0.36, 1] as const;

export default function HeroSection() {
    const reduceMotion = useReducedMotion();

    const containerVariants: Variants = {
        hidden: {},
        visible: {
            transition: {
                staggerChildren: reduceMotion ? 0 : 0.15,
                delayChildren: reduceMotion ? 0 : 0.15,
            },
        },
    };

    const textVariants: Variants = {
        hidden: {
            opacity: 0,
            y: reduceMotion ? 0 : 35,
        },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: reduceMotion ? 0 : 0.8,
                ease: EASE,
            },
        },
    };

    return (
        <section
            id={hero.id}
            className="relative isolate flex items-center overflow-hidden bg-primary py-20"
        >
            {/* Background Gradient */}
            <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 -z-20 bg-[radial-gradient(ellipse_at_25%_60%,#062c5d_0%,#031b3c_45%,#020e20_100%)]"
            />

            {/* Decorative Background Shapes */}
            <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
            >
                <div
                    className="absolute inset-0 bg-gradient-to-br from-[#e40000] via-[#9e0000] to-[#ff7900]"
                    style={{
                        clipPath:
                            "polygon(21% 100%, 100% 0%, 100% 20%, 36% 100%)",
                    }}
                />

                <div
                    className="absolute inset-0 bg-gradient-to-br from-[#55565a] to-[#202124]"
                    style={{
                        clipPath:
                            "polygon(36% 100%, 100% 20%, 100% 100%)",
                    }}
                />

                <div
                    className="absolute inset-0 bg-[#062d0d]"
                    style={{
                        clipPath: "polygon(88% 100%, 100% 87%, 100% 100%)",
                    }}
                />

                <div
                    className="absolute inset-0 bg-white/10"
                    style={{
                        clipPath: "polygon(0 0, 7% 0, 0 11%)",
                    }}
                />
            </div>

            <Container className="relative grid grid-cols-1 gap-8 lg:grid-cols-[1fr_0.98fr] lg:gap-[4vw]">

                {/* Left Hero Content */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="relative z-10 text-white  lg:pt-4"
                >
                    {/* Subtitle */}
                    <motion.div
                        variants={textVariants}
                        className="mb-3 flex items-center gap-3"
                    >
                        <motion.span
                            initial={reduceMotion ? false : { scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{
                                duration: reduceMotion ? 0 : 0.5,
                                delay: reduceMotion ? 0 : 0.4,
                            }}
                        >
                            <Star
                                size={29}
                                fill="#ffb000"
                                className="shrink-0 text-[#ffb000]"
                            />
                        </motion.span>

                        <span className="text-xs font-semibold tracking-wide sm:text-base">
                            {hero.subtitle}
                        </span>
                    </motion.div>

                    {/* Main Heading */}
                    <h1 className="sm:font-extrabold font-bold leading-[1.4] tracking-[-0.035em] text-[clamp(28px,4vw,80px)]">
                        <motion.span
                            variants={textVariants}
                            className="block  text-white"
                        >
                            {hero.title1}
                        </motion.span>

                        <motion.span
                            variants={textVariants}
                            className="block text-[#ff9000]"
                        >
                            {hero.title2}
                        </motion.span>
                    </h1>

                    {/* Description */}
                    <motion.p
                        variants={textVariants}
                        className="mt-3 max-w-[28em] text-sm font-medium leading-snug text-white/95 sm:text-lg xl:text-[clamp(20px,1.40vw,28px)]"
                    >
                        {hero.description}
                    </motion.p>
                </motion.div>

                {/* Right Hero Image */}
                <motion.div
                    initial={
                        reduceMotion
                            ? false
                            : {
                                opacity: 0,
                                x: 60,
                                scale: 0.96,
                            }
                    }
                    animate={{
                        opacity: 1,
                        x: 0,
                        scale: 1,
                    }}
                    transition={{
                        duration: reduceMotion ? 0 : 1.1,
                        delay: reduceMotion ? 0 : 0.2,
                        ease: EASE,
                    }}
                    className="relative w-full lg:pr-[1.3vw]"
                >
                    <motion.div
                        whileHover={
                            reduceMotion ? {} : { y: -6 }
                        }
                        transition={{
                            duration: 0.4,
                            ease: EASE,
                        }}
                        className="relative overflow-hidden rounded-2xl border-[8px] border-white bg-white shadow-[0_20px_45px_rgba(0,0,0,0.45)] sm:border-[clamp(9px,0.75vw,14px)]"
                    >
                        <div className="relative aspect-[1.5] w-full overflow-hidden rounded-md">
                            <Image
                                src={hero.image1}
                                alt="Fresh home-style Indian tiffin meals"
                                fill
                                priority
                                quality={90}
                                sizes="(max-width: 1023px) 100vw, 50vw"
                                className="object-cover"
                            />
                        </div>
                    </motion.div>
                </motion.div>
            </Container>
        </section>
    );
}
