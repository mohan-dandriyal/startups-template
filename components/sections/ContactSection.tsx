


"use client";

import {
  useEffect,
  useRef,
  useState,
  type FormEvent,
} from "react";

import Image from "next/image";
import Container from "../common/Container";

import {
  motion,
  animate,
  useInView,
  useReducedMotion,
  type Variants,
} from "framer-motion";

import {
  Mail,
  Phone,
  MapPin,
  User,
  MessageCircle,
  Send,
  Users,
  ConciergeBell,
  Bike,
  Star,
  type LucideIcon,
} from "lucide-react";

import { ContactData } from "@/types/template.type";

const { contact } = ContactData;

const EASE = [0.22, 1, 0.36, 1] as const;

const icons: Record<string, LucideIcon> = {
  Mail,
  Phone,
  MapPin,
  User,
  MessageCircle,
  Users,
  ConciergeBell,
  Bike,
  Star,
};

// ========================================
// ANIMATED COUNTER
// ========================================

function Counter({
  value,
  suffix,
}: {
  value: number;
  suffix: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);

  const isInView = useInView(ref, {
    once: true,
    amount: 0.5,
  });

  const reduceMotion = useReducedMotion();

  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView || reduceMotion) return;

    const controls = animate(0, value, {
      duration: 2,
      ease: "easeOut",
      onUpdate: (latest) => {
        setCount(latest);
      },
    });

    return () => controls.stop();
  }, [isInView, value, reduceMotion]);

  const displayCount = reduceMotion ? value : count;

  return (
    <span ref={ref}>
      {Number.isInteger(value)
        ? Math.round(displayCount)
        : displayCount.toFixed(1)}

      <span className="text-highlight">
        {suffix}
      </span>
    </span>
  );
}

// ========================================
// MAIN CONTACT SECTION
// ========================================

export default function Contact() {
  const reduceMotion = useReducedMotion();

  const [formData, setFormData] = useState<
    Record<string, string>
  >(
    Object.fromEntries(
      contact.form.fields.map((field) => [
        field.name,
        "",
      ])
    )
  );

  const [emailDraftOpened, setEmailDraftOpened] = useState(false);

  // ========================================
  // ANIMATION VARIANTS
  // ========================================

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

  // ========================================
  // FORM HANDLER
  // ========================================

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const recipient = contact.contactItems.find((item) => item.icon === "Mail")?.value;
    if (!recipient) return;

    const subject = encodeURIComponent("TiffinSutra inquiry");
    const body = encodeURIComponent(
      `Name: ${formData.name}\r\nEmail: ${formData.email}\r\nPhone: ${formData.phone}\r\n\r\n${formData.message}`
    );
    window.location.assign(`mailto:${recipient}?subject=${subject}&body=${body}`);
    setEmailDraftOpened(true);
  };

  return (
    <section
      id="contact"
      className="overflow-hidden bg-white"
    >
      <Container>

        {/* ======================================== */}
        {/* SECTION HEADING */}
        {/* ======================================== */}

        <motion.div
          variants={containerVariants}
          initial={reduceMotion ? false : "hidden"}
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="mb-10 text-center lg:mb-14"
        >
          <motion.div
            variants={itemVariants}
            className="mb-3 flex items-center justify-center gap-4"
          >
            <span className="h-px w-12 bg-[#ff6500] sm:w-16" />

            <span className="text-sm font-bold text-highlight md:text-lg">
              {contact.subtitle}
            </span>

            <span className="h-px w-12 bg-[#ff6500] sm:w-16" />
          </motion.div>

          <motion.h2
            variants={itemVariants}
            className="text-[clamp(22px,2.8vw,50px)] font-extrabold leading-tight tracking-[-0.035em] text-foreground"
          >
            {contact.title1}{" "}

            <span className="text-highlight">
              {contact.title2}
            </span>
          </motion.h2>

          <motion.p
            variants={itemVariants}
            className="mx-auto mt-3 max-w-3xl text-sm leading-relaxed text-gray-700 md:text-[17px]"
          >
            {contact.description}
          </motion.p>
        </motion.div>

        {/* ======================================== */}
        {/* THREE COLUMN CONTACT LAYOUT */}
        {/* ======================================== */}

        <motion.div
          variants={containerVariants}
          initial={reduceMotion ? false : "hidden"}
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 items-center gap-10 lg:grid-cols-[0.9fr_1.4fr_1fr] lg:gap-5 xl:gap-7"
        >

          {/* LEFT SIDE CONTACT INFORMATION */}

          <motion.div
            variants={itemVariants}
            className="flex flex-col gap-8 self-start lg:pt-4"
          >
            {contact.contactItems.map((item) => {
              const Icon = icons[item.icon] ?? Mail;

              return (
                <div
                  key={item.id}
                  className="group flex items-start gap-5"
                >
                  <motion.div
                    whileHover={
                      reduceMotion
                        ? undefined
                        : { scale: 1.08 }
                    }
                    className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#ff6500] text-white shadow-md"
                  >
                    <Icon
                      size={29}
                      strokeWidth={2.5}
                    />
                  </motion.div>

                  <div className="min-w-0">
                    <h3 className="text-xl font-extrabold text-foreground">
                      {item.title}
                    </h3>

                    {item.href ? (
                      <a
                        href={item.href}
                        className="mt-1 block break-words text-base text-gray-700 transition-colors hover:text-highlight"
                      >
                        {item.value}
                      </a>
                    ) : (
                      <p className="mt-1 text-base text-gray-700">
                        {item.value}
                      </p>
                    )}
                  </div>
                </div>
              );
            })}

            <div className="mt-2 h-px w-full bg-gray-200" />
          </motion.div>

          {/* CENTER CONTACT FORM */}

          <motion.div
            variants={itemVariants}
            className="relative isolate"
          >
            {/* Top Right Orange Decoration */}
            <div
              aria-hidden="true"
              className="absolute -right-3 -top-3 -z-10 h-24 w-28 rounded-[20px] bg-[#ff6500]"
            />

            {/* Bottom Left Orange Decoration */}
            <div
              aria-hidden="true"
              className="absolute -bottom-3 -left-3 -z-10 h-24 w-28 rounded-[20px] bg-[#ff6500]"
            />

            <form
              id="pricing"
              onSubmit={handleSubmit}
              className="rounded-2xl border border-gray-200 bg-white p-5 shadow-[0_8px_30px_rgba(0,0,0,0.08)] md:p-6"
            >
              <h3 className="mb-6 text-2xl font-extrabold tracking-tight text-foreground md:text-[28px]">
                {contact.form.title}
              </h3>

              <div className="flex flex-col gap-3">
                {contact.form.fields.map((field) => {
                  const Icon =
                    icons[field.icon] ?? User;

                  const inputClass =
                    "w-full rounded-xl border border-gray-300 bg-white py-2 pl-12 pr-4 text-base text-gray-800 outline-none transition-all placeholder:text-gray-600 focus:border-[#ff6500] focus:ring-2 focus:ring-[#ff6500]/15";

                  return (
                    <div
                      key={field.name}
                      className="relative"
                    >
                      <Icon
                        size={20}
                        strokeWidth={1.8}
                        className="pointer-events-none absolute left-4 top-[10px] text-gray-700"
                      />

                      {field.type === "textarea" ? (
                        <textarea
                          name={field.name}
                          aria-label={field.placeholder}
                          placeholder={field.placeholder}
                          required={field.required}
                          rows={4}
                          value={
                            formData[field.name] ?? ""
                          }
                          onChange={(event) =>
                            setFormData((previous) => ({
                              ...previous,
                              [field.name]:
                                event.target.value,
                            }))
                          }
                          className={`${inputClass} min-h-[98px] resize-y`}
                        />
                      ) : (
                        <input
                          name={field.name}
                          type={field.type}
                          aria-label={field.placeholder}
                          placeholder={field.placeholder}
                          required={field.required}
                          value={
                            formData[field.name] ?? ""
                          }
                          onChange={(event) =>
                            setFormData((previous) => ({
                              ...previous,
                              [field.name]:
                                event.target.value,
                            }))
                          }
                          className={inputClass}
                        />
                      )}
                    </div>
                  );
                })}
              </div>

              {/* SUBMIT BUTTON */}

              <motion.button
                type="submit"
                whileHover={
                  reduceMotion
                    ? undefined
                    : { y: -2 }
                }
                whileTap={
                  reduceMotion
                    ? undefined
                    : { scale: 0.98 }
                }
                className="mt-4 flex w-full cursor-pointer items-center justify-center gap-3 rounded-xl bg-[#ff6500] px-5 py-3 text-lg font-bold text-white transition-colors hover:bg-[#e85b00] "
              >
                {contact.form.buttonText}
                <Send size={23} />
              </motion.button>

              {/* FORM RESPONSE */}

              {emailDraftOpened && (
                <p role="status" className="mt-4 text-sm text-gray-700">
                  Send your draft from your email app.
                </p>
              )}
            </form>
          </motion.div>

          {/* RIGHT SIDE FOOD IMAGE */}

          <motion.div
            variants={itemVariants}
            className="relative mx-auto w-full max-w-[450px]"
          >
            <motion.div
              animate={
                reduceMotion
                  ? undefined
                  : { y: [0, -8, 0] }
              }
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="relative aspect-[0.95] w-full"
            >
              <Image
                src={contact.image}
                alt="Fresh home-style meals with paneer, rice, chapati and spices"
                fill
                sizes="(max-width: 1023px) 90vw, 30vw"
                className="object-contain"
              />
            </motion.div>
          </motion.div>
        </motion.div>

        {/* ======================================== */}
        {/* STATISTICS SECTION */}
        {/* ======================================== */}

        <motion.div
          variants={containerVariants}
          initial={reduceMotion ? false : "hidden"}
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="mt-12 grid grid-cols-2 items-center gap-y-8 border-gray-200 py-8 md:mt-16 lg:grid-cols-[1.4fr_repeat(4,minmax(0,1fr))] lg:gap-y-0"
        >
          <motion.div
            variants={itemVariants}
            className="col-span-2 mb-2 lg:col-span-1 lg:mb-0 lg:pr-6"
          >
            <h3 className="md:text-xl text-lg font-bold tracking-tight text-foreground xl:text-2xl">
              {contact.statistics.title}
            </h3>

            <span className="mt-3 block h-1 w-16 rounded-full bg-[#ff6500]" />
          </motion.div>

          {contact.statistics.items.map((item) => {
            const Icon = icons[item.icon] ?? Star;

            return (
              <motion.div
                key={item.id}
                variants={itemVariants}
                className="flex flex-col items-center justify-center px-3 text-center lg:border-l lg:border-gray-200"
              >
                <div className="flex items-center justify-center gap-3">
                  <Icon
                    size={32}
                    strokeWidth={2.5}
                    className="shrink-0 text-secondary"
                  />

                  <h4 className="text-xl font-extrabold tabular-nums tracking-tight text-foreground xl:text-2xl">
                    <Counter
                      value={item.value}
                      suffix={item.suffix}
                    />
                  </h4>
                </div>

                <p className="mt-2 text-sm font-semibold text-gray-800 md:text-[15px]">
                  {item.label}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </Container>
    </section>
  );
}
