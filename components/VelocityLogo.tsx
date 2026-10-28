"use client";

import { useEffect, useRef, type ReactNode } from "react";

type VelocityLogoProps = {
  /** wordmark; the in-flow copy is the accessible name, track copies are aria-hidden */
  children: ReactNode;
};

// Marquee speed, px/s.
const SPEED = 40;

// The track holds two copies, each with its trailing gap, so sliding it from
// -50% back to 0 moves exactly one copy (left to right) and the loop restarts
// on an identical frame.
const css = `
@keyframes velocity-logo-marquee {
  from { transform: translate3d(-50%, 0, 0); }
  to { transform: translate3d(0, 0, 0); }
}
.velocity-logo-track {
  animation: velocity-logo-marquee var(--velocity-logo-duration, 4s) linear infinite;
}
a:hover .velocity-logo-track,
a:focus-visible .velocity-logo-track {
  animation-play-state: paused;
}
`;

/**
 * Navbar wordmark that scrolls right in a seamless loop as soon as it renders.
 *
 * The static wordmark stays in flow and sets the width and height, so the
 * navbar layout never changes; the looping track is an absolutely positioned
 * overlay clipped to that box. The animation is pure CSS (transform only);
 * JS just measures one copy to hold the speed at SPEED px/s. Hovering or
 * keyboard-focusing the logo link pauses it, and under prefers-reduced-motion
 * only the static wordmark renders.
 */
export default function VelocityLogo({ children }: VelocityLogoProps) {
  const boxRef = useRef<HTMLSpanElement>(null);
  const firstRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const box = boxRef.current;
    const first = firstRef.current;
    if (!box || !first) return;

    // Re-measure when the display font loads or the wordmark resizes.
    const ro = new ResizeObserver(() => {
      const period = first.getBoundingClientRect().width; // one copy incl. gap
      if (period) {
        box.style.setProperty("--velocity-logo-duration", `${period / SPEED}s`);
      }
    });
    ro.observe(first);
    return () => ro.disconnect();
  }, []);

  return (
    <span
      ref={boxRef}
      className="relative block overflow-hidden whitespace-nowrap"
    >
      <style href="velocity-logo" precedence="default">
        {css}
      </style>
      {/* opacity (not visibility) keeps the name in the accessibility tree */}
      <span className="block motion-safe:opacity-0">{children}</span>
      <span
        aria-hidden="true"
        className="velocity-logo-track absolute left-0 top-0 flex will-change-transform motion-reduce:hidden"
      >
        <span ref={firstRef} className="shrink-0 pr-[0.6em]">
          {children}
        </span>
        <span className="shrink-0 pr-[0.6em]">{children}</span>
      </span>
    </span>
  );
}
