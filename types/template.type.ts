

import template from "@/data/template.json";

const data = template.categories.WedBliss.sections;



export const TopHeaderData = data.TopHeader.variants.WedBlissTopHeader2;
export const HeaderData = data.Header.variants.WedBlissHeader2;
export const HeroData = data.Hero.variants.WedBlissHero2;
export const AboutData = data.AboutUs.variants.WedBlissAboutUs2;
export const ServicesData = data.Services.variants.WedBlissServices2;
export const WhatWeDoData = data.WhatWeDo.variants.WedBlissWhatWeDo2;
export const GalleryData = data.Gallery.variants.WedBlissGallery2;
export const TestimonialsData = data.Testimonials.variants.WedBlissTestimonials2;
export const FaqData = data.Faq.variants.WedBlissFaq2;
export const ContactData = data.Contact.variants.WedBlissContact2;

export const FooterData = template.common.Footer;


export type TopHeaderDataTypes = typeof TopHeaderData;
export type HeaderDataTypes = typeof HeaderData;
export type HeroDataTypes = typeof HeroData;
export type AboutDataTypes = typeof AboutData;
export type ServicesDataTypes = typeof ServicesData;
export type WhatWeDoDataTypes = typeof WhatWeDoData;
export type GalleryDataTypes = typeof GalleryData;
export type TestimonialsDataTypes = typeof TestimonialsData;
export type FaqDataTypes = typeof FaqData;
export type ContactDataTypes = typeof ContactData;

export type FooterDataTypes = typeof FooterData;