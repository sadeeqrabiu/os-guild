"use client";

import React, { useEffect, useRef } from "react";
import { animate, type AnimationParams } from "animejs";

interface AnimatedDivProps extends React.HTMLAttributes<HTMLDivElement> {
    animation: AnimationParams;
    runOnMount?: boolean;
}

export function AnimatedDiv({
    children,
    animation,
    runOnMount = true,
    ...props
}: AnimatedDivProps) {
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (runOnMount && ref.current) {
            animate(ref.current, animation);
        }
    }, [runOnMount]); // intentionally omitting animation from deps to avoid re-running on every render unless memoized

    return (
        <div ref={ref} {...props}>
            {children}
        </div>
    );
}
