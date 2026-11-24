
import Image from "next/image";

type BrandProps = {
    logo: string;
    logoAlt: string;
    handleNavigation: (href: string) => void;
};

export default function Brand({ handleNavigation, logo, logoAlt }: BrandProps) {

    return (
        <a
            href="#home"
            onClick={() => handleNavigation("#home")}
            className="relative block h-[68px] w-[170px] py-4 shrink-0 xl:h-[84px] xl:w-[clamp(165px,18vw,205px)]"
        >
            <Image
                src={logo}
                alt={logoAlt}
                fill
                priority
                sizes="(min-width: 1280px) 250px, 170px"
                className="object-contain object-left"
            />
        </a>
    )
}
