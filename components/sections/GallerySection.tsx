

"use client";

import { useEffect, useState } from "react";
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
    X,
    ChevronLeft,
    ChevronRight,
    ZoomIn,
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

type SelectedMedia =
    | { type: "photo"; index: number }
    | null;

export default function Gallery() {
    const [activeTab, setActiveTab] = useState("photos");

    const [selectedMedia, setSelectedMedia] =
        useState<SelectedMedia>(null);

    const reduceMotion = useReducedMotion();

    // Close popup and navigate images with keyboard
    useEffect(() => {
        if (!selectedMedia) return;

        const previousOverflow = document.body.style.overflow;

        document.body.style.overflow = "hidden";

        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                setSelectedMedia(null);
            }

            if (selectedMedia.type !== "photo") return;

            if (event.key === "ArrowRight") {
                setSelectedMedia({
                    type: "photo",
                    index:
                        (selectedMedia.index + 1) %
                        gallery.images.length,
                });
            }

            if (event.key === "ArrowLeft") {
                setSelectedMedia({
                    type: "photo",
                    index:
                        (selectedMedia.index -
                            1 +
                            gallery.images.length) %
                        gallery.images.length,
                });
            }
        };

        window.addEventListener("keydown", handleKeyDown);

        return () => {
            document.body.style.overflow = previousOverflow;

            window.removeEventListener(
                "keydown",
                handleKeyDown
            );
        };
    }, [selectedMedia]);

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

    const navigateImage = (direction: number) => {
        setSelectedMedia((previous) => {
            if (!previous || previous.type !== "photo") {
                return previous;
            }

            return {
                type: "photo",
                index:
                    (previous.index +
                        direction +
                        gallery.images.length) %
                    gallery.images.length,
            };
        });
    };

    return (
        <>
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
                                {gallery.images.map((item, index) => (
                                    <motion.button
                                        key={item.id}
                                        type="button"
                                        variants={itemVariants}
                                        initial={reduceMotion ? false : "hidden"}
                                        whileInView="visible"
                                        viewport={{ once: true, amount: 0.15 }}
                                        onClick={() =>
                                            setSelectedMedia({
                                                type: "photo",
                                                index,
                                            })
                                        }
                                        aria-label={`View ${item.alt}`}
                                        className="group relative aspect-[1.73] w-full cursor-pointer overflow-hidden rounded-2xl bg-gray-100 shadow-md focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#ff6500]"
                                    >
                                        <Image
                                            src={item.image}
                                            alt={item.alt}
                                            fill
                                            sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 25vw"
                                            className="object-cover transition-transform duration-700 ease-out motion-safe:group-hover:scale-110"
                                        />

                                        {/* Hover Overlay */}
                                        <div className="absolute inset-0 flex items-center justify-center bg-primary/45 opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100">

                                            <span className="flex h-14 w-14 items-center justify-center rounded-full bg-white text-highlight shadow-lg">
                                                <ZoomIn size={26} />
                                            </span>

                                        </div>
                                    </motion.button>
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

            {/* ============================== */}
            {/* IMAGE AND VIDEO LIGHTBOX */}
            {/* ============================== */}

            <AnimatePresence>
                {selectedMedia && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{
                            duration: reduceMotion ? 0 : 0.25,
                        }}
                        onClick={() => setSelectedMedia(null)}
                        className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/90 p-5 backdrop-blur-sm"
                    >
                        <motion.div
                            role="dialog"
                            aria-modal="true"
                            aria-label="Gallery media viewer"
                            initial={{
                                opacity: 0,
                                scale: reduceMotion ? 1 : 0.95,
                            }}
                            animate={{
                                opacity: 1,
                                scale: 1,
                            }}
                            exit={{
                                opacity: 0,
                                scale: reduceMotion ? 1 : 0.95,
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
                                aria-label="Close gallery"
                                onClick={() => setSelectedMedia(null)}
                                className="absolute -top-12 right-0 z-20 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-white text-foreground transition-colors hover:bg-[#ff6500] hover:text-white"
                            >
                                <X size={24} />
                            </button>

                            {/* PHOTO LIGHTBOX */}
                            {selectedMedia.type === "photo" && (
                                <>
                                    <div className="relative h-[65dvh] w-full overflow-hidden rounded-xl bg-black">

                                        <AnimatePresence mode="wait">
                                            <motion.div
                                                key={selectedMedia.index}
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                exit={{ opacity: 0 }}
                                                transition={{
                                                    duration: reduceMotion ? 0 : 0.2,
                                                }}
                                                className="absolute inset-0"
                                            >
                                                <Image
                                                    src={
                                                        gallery.images[
                                                            selectedMedia.index
                                                        ].image
                                                    }
                                                    alt={
                                                        gallery.images[
                                                            selectedMedia.index
                                                        ].alt
                                                    }
                                                    fill
                                                    sizes="100vw"
                                                    className="object-contain"
                                                />
                                            </motion.div>
                                        </AnimatePresence>

                                        {/* Previous Button */}
                                        <button
                                            type="button"
                                            aria-label="Previous image"
                                            onClick={() => navigateImage(-1)}
                                            className="absolute left-3 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-white text-foreground shadow-lg transition-colors hover:bg-[#ff6500] hover:text-white"
                                        >
                                            <ChevronLeft size={26} />
                                        </button>

                                        {/* Next Button */}
                                        <button
                                            type="button"
                                            aria-label="Next image"
                                            onClick={() => navigateImage(1)}
                                            className="absolute right-3 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-white text-foreground shadow-lg transition-colors hover:bg-[#ff6500] hover:text-white"
                                        >
                                            <ChevronRight size={26} />
                                        </button>

                                    </div>

                                    {/* Image Caption */}
                                    <div className="mt-4 text-center text-white">
                                        <p className="text-lg font-semibold">
                                            {
                                                gallery.images[
                                                    selectedMedia.index
                                                ].alt
                                            }
                                        </p>

                                        <p className="mt-1 text-sm text-white/70">
                                            {selectedMedia.index + 1} /{" "}
                                            {gallery.images.length}
                                        </p>
                                    </div>
                                </>
                            )}

                            {/* VIDEO LIGHTBOX */}

                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
