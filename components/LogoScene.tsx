"use client";

import { useEffect, useRef, useState } from "react";
import { LogoMark } from "@/components/Logo";

/**
 * The brand tile's 3D logo. Shows the flat mark first; Three.js is loaded only
 * once the tile is near the screen, never under reduced motion, and the flat
 * mark stays if WebGL is unavailable.
 */
export function LogoScene({ className = "" }: { className?: string }) {
  const host = useRef<HTMLDivElement>(null);
  const [live, setLive] = useState(false);

  useEffect(() => {
    const el = host.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let cleanup = () => {};
    let disposed = false;
    const pointerArea = el.closest<HTMLElement>("[data-logo-tile]") ?? el;

    const near = new IntersectionObserver(
      async ([entry]) => {
        if (!entry.isIntersecting) return;
        near.disconnect();
        const { mountLogo } = await import("@/lib/logo-three");
        if (disposed) return;
        cleanup = mountLogo(
          el,
          pointerArea,
          () => setLive(true),
          () => {
            cleanup();
            setLive(false);
          },
        );
      },
      { rootMargin: "200px" },
    );
    near.observe(el);

    return () => {
      disposed = true;
      near.disconnect();
      cleanup();
    };
  }, []);

  return (
    <div ref={host} aria-hidden="true" className={`relative ${className}`}>
      <LogoMark
        tone="light"
        className={`absolute inset-0 m-auto h-[70%] w-auto transition-opacity duration-500 ${
          live ? "opacity-0" : "opacity-100"
        }`}
      />
    </div>
  );
}
