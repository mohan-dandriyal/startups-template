

import type { ReactNode } from "react";

export default function Container({ children, className = "" }: { children: ReactNode, className?: string }) {

    return (
        <div className={`mx-auto w-full max-w-[1400px] px-[clamp(1rem,1vw,2rem)] ${className}`}>
            {children}
        </div>
    )
}
