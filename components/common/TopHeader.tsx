"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Mail, MapPin, Phone } from "lucide-react";
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaTwitter, FaYoutube } from "react-icons/fa";
import type { IconType } from "react-icons";
import { ContactData, TopHeaderData } from "@/types/template.type";
import Container from "./Container";

const [email, phone, address] = ContactData.contact.contactItems;
const { socialLinks } = TopHeaderData;

const socialIcons: Record<string, IconType> = {
    FaFacebookF,
    FaInstagram,
    FaLinkedinIn,
    FaYoutube,
    FaTwitter,
};

export default function TopHeader() {

    const reduceMotion = useReducedMotion();

    return (
        <>
            {/* Top Contact Bar */}
            <div className="hidden bg-[#031a35] text-white lg:block">
                <Container className="flex items-center justify-between min-h-11 py-2">
                    <div className="flex items-center gap-6 text-sm">

                        <a
                            href={email.href}
                            className="flex items-center gap-3 transition-colors hover:text-[#ff7900]"
                        >
                            <Mail size={20} />
                            {email.value}
                        </a>

                        <span className="h-5 w-px bg-white/40" />

                        <a
                            href={phone.href}
                            className="flex items-center gap-3 transition-colors hover:text-[#ff7900]"
                        >
                            <Phone size={19} />
                            {phone.value}
                        </a>

                        <span className="h-5 w-px bg-white/40" />

                        <div className="flex items-center gap-3">
                            <MapPin size={21} />
                            {address.value}
                        </div>
                    </div>

                    {/* Social Icons */}
                    <div className="flex items-center gap-3">
                        {socialLinks.map((social) => {
                            const Icon = socialIcons[social.icon];

                            if (!Icon) return null;

                            return (
                                <motion.a
                                    key={social.id}
                                    href={social.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={social.icon.replace("Fa", "")}
                                    whileHover={reduceMotion ? {} : { y: -3 }}
                                    className="flex h-6 w-6 items-center justify-center rounded-full bg-white text-[#031a35] transition-colors hover:bg-[#ff7900] hover:text-white"
                                >
                                    <Icon size={16} />
                                </motion.a>
                            );
                        })}
                    </div>
                </Container>
            </div>
        </>
    )
}