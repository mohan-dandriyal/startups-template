

import type { ReactNode } from "react";

export default function Container({ children, className = "" }: { children: ReactNode, className?: string }) {

    return (
        <div className={`mx-auto w-full max-w-[1500px] px-[clamp(1rem,3vw,3rem)] ${className}`}>
            {children}
        </div>
    )
}
