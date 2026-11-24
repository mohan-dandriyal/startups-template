

"use client";

import { useState } from "react";
import Image from "next/image";

import {
    motion,
    AnimatePresence,
    useReducedMotion,
    type Variants,
} from "framer-motion";

import {
    Image as ImageIcon,
    SquarePlay,
    type LucideIcon,
} from "lucide-react";

import { GalleryData } from "@/types/template.type";
import Container from "../common/Container";

const gallery = GalleryData;

const EASE = [0.22, 1, 0.36, 1] as const;

const icons: Record<string, LucideIcon> = {
    Image: ImageIcon,
    Video: SquarePlay,
};

export default function Gallery() {
    const [activeTab, setActiveTab] = useState("photos");

    const reduceMotion = useReducedMotion();

    // Container animation
    const containerVariants: Variants = {
        hidden: {},
        visible: {
            transition: {
                staggerChildren: reduceMotion ? 0 : 0.08,
            },
        },
    };

    // Individual gallery card animation
    const itemVariants: Variants = {
        hidden: {
            opacity: 0,
            y: reduceMotion ? 0 : 30,
            scale: reduceMotion ? 1 : 0.96,
        },
        visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: {
                duration: reduceMotion ? 0 : 0.6,
                ease: EASE,
            },
        },
    };

    return (
        <section
            id="gallery"
            className="overflow-hidden bg-white"
        >
            {/* ============================== */}
            {/* GALLERY HEADER */}
            {/* ============================== */}

            <div className="relative isolate overflow-hidden bg-primary">

                {/* Background Image */}
                <Image
                    src={gallery.backgroundImage}
                    alt=""
                    fill
                    sizes="100vw"
                    className="-z-20 object-cover object-center"
                />

                {/* Background Overlay */}
                <div
                    aria-hidden="true"
                    className="absolute inset-0 -z-10 bg-[#031b3c]/95"
                />

                <Container className="relative">

                    {/* Section Heading */}
                    <motion.div
                        variants={containerVariants}
                        initial={reduceMotion ? false : "hidden"}
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.2 }}
                        className="pb-7 pt-18 text-center md:pb-8"
                    >
                        {gallery.subtitle && (
                            <motion.p
                                variants={itemVariants}
                                className="mb-3 font-bold uppercase text-white"
                            >
                                {gallery.subtitle}
                            </motion.p>
                        )}

                        <motion.h2
                            variants={itemVariants}
                            className="text-[clamp(22px,2.8vw,50px)] font-extrabold leading-tight tracking-[-0.025em] text-white"
                        >
                            {gallery.title1}{" "}

                            <span className="text-highlight">
                                {gallery.title2}
                            </span>
                        </motion.h2>

                        {/* Orange Divider */}
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
                            className="mx-auto my-4 h-[5px] w-20 rounded-full bg-[#ff6500]"
                        />

                        {/* Description */}
                        <motion.p
                            variants={itemVariants}
                            className="mx-auto max-w-5xl text-sm font-medium leading-relaxed text-white/95 md:text-lg xl:text-[17px]"
                        >
                            {gallery.description}
                        </motion.p>
                    </motion.div>

                    {/* ============================== */}
                    {/* GALLERY TABS */}
                    {/* ============================== */}

                    <div
                        role="tablist"
                        aria-label="Gallery categories"
                        className="flex items-end gap-2 sm:gap-4 lg:pl-10"
                    >
                        {gallery.tabs.map((tab) => {
                            const Icon = icons[tab.icon] ?? ImageIcon;

                            const isActive = activeTab === tab.id;

                            return (
                                <button
                                    key={tab.id}
                                    id={`gallery-tab-${tab.id}`}
                                    type="button"
                                    role="tab"
                                    aria-selected={isActive}
                                    aria-controls={`gallery-panel-${tab.id}`}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`relative isolate flex min-h-[45px] flex-1 cursor-pointer items-center justify-center gap-2 overflow-hidden rounded-t-2xl px-3 py-3 transition-colors duration-300 sm:flex-none sm:gap-4 sm:px-8 md:min-h-[60px] lg:min-w-[clamp(200px,20vw,250px)] ${isActive
                                        ? "text-foreground"
                                        : "bg-white/25 text-white hover:bg-white/35"
                                        }`}
                                >
                                    {/* Animated Active Background */}
                                    {isActive && (
                                        <motion.span
                                            layoutId="gallery-active-tab"
                                            transition={{
                                                duration: reduceMotion ? 0 : 0.35,
                                                ease: EASE,
                                            }}
                                            className="absolute inset-0 -z-10 rounded-t-2xl bg-white"
                                        />
                                    )}

                                    <Icon
                                        strokeWidth={2.2}
                                        className={`h-6 w-6 shrink-0 sm:h-7 sm:w-7 ${isActive
                                            ? "text-highlight"
                                            : "text-white"
                                            }`}
                                    />

                                    <span className="text-sm font-bold sm:text-lg xl:text-[20px]">
                                        {tab.label}
                                    </span>
                                </button>
                            );
                        })}
                    </div>
                </Container>
            </div>

            {/* ============================== */}
            {/* GALLERY CONTENT */}
            {/* ============================== */}

            <Container className=" pt-8">

                <AnimatePresence mode="wait">

                    {/* PHOTO GALLERY */}
                    {activeTab === "photos" && (
                        <motion.div
                            key="photos"
                            id="gallery-panel-photos"
                            role="tabpanel"
                            aria-labelledby="gallery-tab-photos"
                            exit={{
                                opacity: 0,
                                transition: {
                                    duration: reduceMotion ? 0 : 0.2,
                                },
                            }}
                            className="grid grid-cols-2 gap-4 sm:grid-cols-2 lg:grid-cols-4"
                        >
                            {gallery.images.map((item) => (
                                <motion.div
                                    key={item.id}
                                    variants={itemVariants}
                                    initial={reduceMotion ? false : "hidden"}
                                    whileInView="visible"
                                    viewport={{ once: true, amount: 0.15 }}
                                    className="group relative aspect-[1.73] w-full overflow-hidden rounded-2xl bg-gray-100 shadow-md"
                                >
                                    <Image
                                        src={item.image}
                                        alt={item.alt}
                                        fill
                                        sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 25vw"
                                        className="object-cover transition-transform duration-700 ease-out motion-safe:group-hover:scale-110"
                                    />

                                </motion.div>
                            ))}
                        </motion.div>
                    )}

                    {/* VIDEO GALLERY */}
                    {activeTab === "videos" && (
                        <motion.div
                            key="videos"
                            id="gallery-panel-videos"
                            role="tabpanel"
                            aria-labelledby="gallery-tab-videos"
                            variants={containerVariants}
                            initial="hidden"
                            animate="visible"
                            exit={{
                                opacity: 0,
                                transition: {
                                    duration: reduceMotion ? 0 : 0.2,
                                },
                            }}
                            className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4"
                        >
                            <p className="col-span-full py-8 text-center text-gray-700">Video gallery is currently unavailable.</p>
                        </motion.div>
                    )}

                </AnimatePresence>
            </Container>
        </section>
    );
}
