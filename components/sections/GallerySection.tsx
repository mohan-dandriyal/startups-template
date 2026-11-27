"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

import {
    motion,
    AnimatePresence,
    useReducedMotion,
    type Variants,
} from "framer-motion";

import {
    ChevronLeft,
    ChevronRight,
    Image as ImageIcon,
    SquarePlay,
    X,
    type LucideIcon,
} from "lucide-react";

import { GalleryData } from "@/types/template.type";
import Container from "../common/Container";

const gallery = GalleryData;

const EASE = [0.22, 1, 0.36, 1] as const;
const viewerButton =
    "grid size-11 cursor-pointer place-items-center rounded-full bg-white/15 text-white hover:bg-white/25 focus-visible:outline-2 focus-visible:outline-white";

const icons: Record<string, LucideIcon> = {
    Image: ImageIcon,
    Video: SquarePlay,
};

type Selection = { kind: "image" | "video"; index: number } | null;

// Accepts a Pinterest pin link or an embed link and returns the iframe URL
function getPinterestEmbedUrl(url?: string) {
    if (!url) return null;
    if (url.includes("assets.pinterest.com/ext/embed.html")) return url;
    const match = url.match(/pinterest\.[a-z.]+\/pin\/(\d+)/i);
    return match
        ? `https://assets.pinterest.com/ext/embed.html?id=${match[1]}`
        : null;
}

// Accepts watch, youtu.be, shorts, live or embed links and returns the iframe URL
function getYouTubeEmbedUrl(url?: string) {
    if (!url) return null;
    const match = url.match(
        /(?:youtube(?:-nocookie)?\.com\/(?:watch\?(?:.*&)?v=|embed\/|shorts\/|live\/)|youtu\.be\/)([\w-]{11})/i
    );
    return match
        ? `https://www.youtube-nocookie.com/embed/${match[1]}?autoplay=1&rel=0&modestbranding=1`
        : null;
}

// Fades the image in once loaded, so there is no size jump
function ViewerImage({
    src,
    alt,
    reduceMotion,
}: {
    src: string;
    alt: string;
    reduceMotion: boolean | null;
}) {
    const [loaded, setLoaded] = useState(false);

    return (
        // eslint-disable-next-line @next/next/no-img-element
        <motion.img
            src={src}
            alt={alt}
            onLoad={() => setLoaded(true)}
            initial={false}
            animate={{
                opacity: loaded ? 1 : 0,
                scale: loaded ? 1 : reduceMotion ? 1 : 0.97,
            }}
            transition={{ duration: reduceMotion ? 0 : 0.3, ease: EASE }}
            className="block h-auto max-h-[calc(100dvh-10rem)] w-auto max-w-[calc(100vw-2rem)] rounded-lg object-contain"
        />
    );
}

export default function Gallery() {
    const [activeTab, setActiveTab] = useState("photos");
    const [selection, setSelection] = useState<Selection>(null);
    const [isOpen, setIsOpen] = useState(false);
    const viewer = useRef<HTMLDialogElement>(null);

    const reduceMotion = useReducedMotion();

    const images = gallery.images ?? [];
    const videos = gallery.videos ?? [];

    // Hide the Video tab if the JSON has no videos
    const tabs = gallery.tabs.filter(
        (tab) => tab.id !== "videos" || videos.length > 0
    );

    const selectedImage = selection?.kind === "image" ? images[selection.index] : null;
    const selectedVideo = selection?.kind === "video" ? videos[selection.index] : null;
    const selectedYouTube = getYouTubeEmbedUrl(selectedVideo?.embedUrl);
    const selectedEmbed = selectedYouTube
        ? null
        : getPinterestEmbedUrl(selectedVideo?.embedUrl);
    const total = selection?.kind === "video" ? videos.length : images.length;
    const label = selectedImage?.alt ?? selectedVideo?.title ?? "";

    function openViewer(kind: "image" | "video", index: number) {
        setSelection({ kind, index });
        setIsOpen(true);
        viewer.current?.showModal();
    }

    // Only starts the exit animation. The dialog closes in onExitComplete.
    function closeViewer() {
        setIsOpen(false);
    }

    function changeItem(direction: number) {
        setSelection((current) => {
            if (!current) return current;
            const count = current.kind === "video" ? videos.length : images.length;
            return {
                kind: current.kind,
                index: (current.index + direction + count) % count,
            };
        });
    }

    // Preload neighbouring photos for instant next/previous
    useEffect(() => {
        if (selection?.kind !== "image") return;
        [1, -1].forEach((d) => {
            const img = new window.Image();
            img.src = images[(selection.index + d + images.length) % images.length].image;
        });
    }, [selection, images]);

    // Container animation
    const containerVariants: Variants = {
        hidden: {},
        visible: {
            transition: {
                staggerChildren: reduceMotion ? 0 : 0.08,
            },
        },
    };

    // Individual card animation
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
        <section id="gallery" className="overflow-hidden bg-white">
            {/* ============================== */}
            {/* GALLERY HEADER */}
            {/* ============================== */}

            <div className="relative isolate overflow-hidden bg-primary">
                <Image
                    src={gallery.backgroundImage}
                    alt=""
                    fill
                    sizes="100vw"
                    className="-z-20 object-cover object-center"
                />

                <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[#031b3c]/95" />

                <Container className="relative">
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
                            <span className="text-highlight">{gallery.title2}</span>
                        </motion.h2>

                        <motion.div
                            initial={{ scaleX: reduceMotion ? 1 : 0 }}
                            whileInView={{ scaleX: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: reduceMotion ? 0 : 0.7, ease: EASE }}
                            className="mx-auto my-4 h-[5px] w-20 rounded-full bg-[#ff6500]"
                        />

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

                </Container>
            </div>

            {/* ============================== */}
            {/* GALLERY CONTENT */}
            {/* ============================== */}

            <Container className="pt-8">
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
                                transition: { duration: reduceMotion ? 0 : 0.2 },
                            }}
                            className="grid grid-cols-2 gap-4 lg:grid-cols-4"
                        >
                            {images.map((item, index) => (
                                <motion.button
                                    key={item.id}
                                    type="button"
                                    aria-label={`View full image: ${item.alt}`}
                                    aria-haspopup="dialog"
                                    onClick={() => openViewer("image", index)}
                                    variants={itemVariants}
                                    initial={reduceMotion ? false : "hidden"}
                                    whileInView="visible"
                                    viewport={{ once: true, amount: 0.15 }}
                                    className="group relative aspect-[1.73] w-full cursor-zoom-in overflow-hidden rounded-2xl bg-gray-100 shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                                >
                                    <Image
                                        src={item.image}
                                        alt={item.alt}
                                        fill
                                        sizes="(max-width: 1023px) 50vw, 25vw"
                                        className="object-cover transition-transform duration-700 ease-out motion-safe:group-hover:scale-110"
                                    />
                                </motion.button>
                            ))}
                        </motion.div>
                    )}

                   
                </AnimatePresence>
            </Container>

            {/* ============================== */}
            {/* VIEWER */}
            {/* ============================== */}

            <dialog
                ref={viewer}
                aria-label="Gallery viewer"
                onCancel={(event) => {
                    event.preventDefault(); // stop the instant native close on Escape
                    closeViewer();
                }}
                onClose={() => setSelection(null)}
                onKeyDown={(event) => {
                    if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
                        event.preventDefault();
                        changeItem(event.key === "ArrowLeft" ? -1 : 1);
                    }
                }}
                className="fixed inset-0 m-auto h-dvh max-h-none w-full max-w-none overflow-hidden bg-transparent p-0 backdrop:bg-transparent"
            >
                <AnimatePresence onExitComplete={() => viewer.current?.close()}>
                    {isOpen && selection && (
                        <motion.div
                            key="viewer"
                            initial={reduceMotion ? false : { opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: reduceMotion ? 0 : 0.25, ease: EASE }}
                            onClick={(event) => {
                                if (event.target === event.currentTarget) closeViewer();
                            }}
                            className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-black/90"
                        >
                            <button
                                type="button"
                                aria-label="Close gallery viewer"
                                autoFocus
                                onClick={closeViewer}
                                className={`absolute right-4 top-4 z-10 ${viewerButton}`}
                            >
                                <X aria-hidden="true" />
                            </button>

                            <motion.div
                                initial={reduceMotion ? false : { scale: 0.97 }}
                                animate={{ scale: 1 }}
                                exit={{ scale: reduceMotion ? 1 : 0.97 }}
                                transition={{ duration: reduceMotion ? 0 : 0.3, ease: EASE }}
                                className="relative"
                            >
                                {selectedImage && (
                                    <ViewerImage
                                        key={selectedImage.id}
                                        src={selectedImage.image}
                                        alt={selectedImage.alt}
                                        reduceMotion={reduceMotion}
                                    />
                                )}
                            </motion.div>

                         

                            {total > 1 && (
                                <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 items-center gap-4 text-white">
                                    <button
                                        type="button"
                                        aria-label={selection.kind === "video" ? "Previous video" : "Previous photo"}
                                        onClick={() => changeItem(-1)}
                                        className={viewerButton}
                                    >
                                        <ChevronLeft aria-hidden="true" />
                                    </button>

                                    <span
                                        aria-live="polite"
                                        aria-atomic="true"
                                        className="whitespace-nowrap tabular-nums"
                                    >
                                        <span className="sr-only">{label} · </span>
                                        {selection.index + 1} / {total}
                                    </span>

                                    <button
                                        type="button"
                                        aria-label={selection.kind === "video" ? "Next video" : "Next photo"}
                                        onClick={() => changeItem(1)}
                                        className={viewerButton}
                                    >
                                        <ChevronRight aria-hidden="true" />
                                    </button>
                                </div>
                            )}
                        </motion.div>
                    )}
                </AnimatePresence>
            </dialog>
        </section>
    );
}