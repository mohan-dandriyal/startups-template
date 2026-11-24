


"use client";

import Image from "next/image";
import {
    motion,
    useReducedMotion,
    type Variants,
} from "framer-motion";
import { ChefHat } from "lucide-react";

import data from "@/data/template.json";
import Container from "../common/Container";

const servicesData =
    data.categories.WedBliss.sections.Services.variants.WedBlissServices2;

const EASE = [0.22, 1, 0.36, 1] as const;

export default function Services() {
    const reduceMotion = useReducedMotion();

    // Heading animation
    const headingVariants: Variants = {
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

    // Cards container animation
    const containerVariants: Variants = {
        hidden: {},
        visible: {
            transition: {
                staggerChildren: reduceMotion ? 0 : 0.15,
                delayChildren: reduceMotion ? 0 : 0.1,
            },
        },
    };

    // Individual card animation
    const cardVariants: Variants = {
        hidden: {
            opacity: 0,
            y: reduceMotion ? 0 : 50,
            scale: reduceMotion ? 1 : 0.96,
        },
        visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: {
                duration: reduceMotion ? 0 : 0.8,
                ease: EASE,
            },
        },
    };

    return (
        <section
            id="services"
            className="relative isolate overflow-hidden bg-[#031d40] py-14 md:py-18"
        >
            {/* Background Gradient */}
            <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,#082c58_0%,#031d40_65%,#021730_100%)]"
            />

            <Container>

                {/* ============================= */}
                {/* SECTION HEADING */}
                {/* ============================= */}

                <motion.div
                    variants={headingVariants}
                    initial={reduceMotion ? false : "hidden"}
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                    className="mx-auto mb-8 max-w-6xl text-center"
                >

                    {/* Subtitle */}
                    <div className="mb-4 flex items-center justify-center gap-3 md:gap-5">

                        {/* Left Orange Line */}
                        <motion.span
                            initial={{ scaleX: reduceMotion ? 1 : 0 }}
                            whileInView={{ scaleX: 1 }}
                            viewport={{ once: true }}
                            transition={{
                                duration: reduceMotion ? 0 : 0.8,
                                ease: EASE,
                            }}
                            className="h-[2px] w-10 origin-right rounded-full bg-[#ff8000] sm:w-24 lg:w-48"
                        />

                        <ChefHat
                            size={26}
                            strokeWidth={2.5}
                            className="shrink-0 text-secondary"
                        />

                        <span className="whitespace-nowrap text-sm font-extrabold uppercase tracking-wide text-white sm:text-lg ">
                            {servicesData.subtitle}
                        </span>

                        {/* Right Orange Line */}
                        <motion.span
                            initial={{ scaleX: reduceMotion ? 1 : 0 }}
                            whileInView={{ scaleX: 1 }}
                            viewport={{ once: true }}
                            transition={{
                                duration: reduceMotion ? 0 : 0.8,
                                ease: EASE,
                            }}
                            className="h-[2px] w-10 origin-left rounded-full bg-[#ff8000] sm:w-24 lg:w-48"
                        />
                    </div>

                    {/* Main Heading */}
                    <h2 className="text-[clamp(22px,2.8vw,50px)] font-extrabold leading-[1.15] tracking-[-0.025em] text-white">
                        {servicesData.title1}{" "}
                        <span className="text-secondary">
                            {servicesData.title2}
                        </span>
                    </h2>

                    {/* Description */}
                    <p className="mx-auto mt-2 max-w-5xl text-sm font-medium leading-relaxed text-white/95 md:text-[17px]">
                        {servicesData.description}
                    </p>
                </motion.div>

                {/* ============================= */}
                {/* SERVICES GRID */}
                {/* ============================= */}

                <motion.div
                    variants={containerVariants}
                    initial={reduceMotion ? false : "hidden"}
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.1 }}
                    className="grid auto-rows-fr grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4"
                >
                    {servicesData.services.map((service) => (
                        <motion.article
                            key={service.id}
                            variants={cardVariants}
                            whileHover={
                                reduceMotion
                                    ? undefined
                                    : {
                                        y: -8,
                                        transition: {
                                            duration: 0.3,
                                            ease: EASE,
                                        },
                                    }
                            }
                            className="group flex h-full flex-col overflow-hidden rounded-[24px] border-[3px] border-white bg-white shadow-[0_8px_25px_rgba(0,0,0,0.18)] transition-shadow duration-300 hover:shadow-[0_15px_35px_rgba(0,0,0,0.35)]"
                        >

                            {/* Service Image */}
                            <div className="relative aspect-[1.5] w-full shrink-0 overflow-hidden rounded-[20px]">
                                <Image
                                    src={service.image}
                                    alt={service.title}
                                    fill
                                    sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 25vw"
                                    className="object-cover transition-transform duration-700 ease-out motion-safe:group-hover:scale-110"
                                />
                            </div>

                            {/* Service Content */}
                            <div className="flex flex-1 flex-col items-center px-4 pb-8 pt-6 text-center sm:px-5 xl:px-6">

                                {/* Service Title */}
                                <h3 className="text-xl md:font-extrabold font-bold leading-tight tracking-[-0.025em] text-foreground transition-colors duration-300 group-hover:text-secondary xl:text-[clamp(18px,1vw,26px)]">
                                    {service.title}
                                </h3>

                                {/* Orange Divider */}
                                <div className="my-3 h-[5px] w-16 shrink-0 rounded-full bg-[#ff8000] transition-all duration-500 group-hover:w-24" />

                                {/* Service Description */}
                                <p className="text-sm font-medium leading-snug #text-[#1b1b1b]/95 xl:text-[17px]">
                                    {service.description}
                                </p>

                            </div>
                        </motion.article>
                    ))}
                </motion.div>
            </Container>
        </section>
    );
}
