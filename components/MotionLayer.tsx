"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

gsap.registerPlugin(ScrollTrigger, useGSAP);

let lenis: Lenis | null = null;

const HEADER_OFFSET = -88;

export function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  if (lenis)
    lenis.scrollTo(id === "home" ? 0 : el, {
      offset: HEADER_OFFSET,
      duration: 1.1,
    });
  else
    window.scrollTo({
      top:
        id === "home"
          ? 0
          : el.getBoundingClientRect().top + window.scrollY + HEADER_OFFSET,
    });
  history.replaceState(null, "", `#${id}`);
}

/**
 * Page-wide motion: smooth scrolling, the hero's first-entry sequence and
 * one-time reveals for sections below the fold. Elements opt in with
 * `data-hero-item` / `data-reveal`; with reduced motion everything is shown as-is.
 */
export function MotionLayer() {
  useGSAP(() => {
    const root = document.documentElement;
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: reduce)", () => {
      gsap.set("[data-hero-item], [data-reveal]", { autoAlpha: 1 });
      root.classList.add("motion-ready");
    });

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      lenis = new Lenis({ lerp: 0.12, anchors: { offset: HEADER_OFFSET } });
      lenis.on("scroll", ScrollTrigger.update);
      const raf = (t: number) => lenis?.raf(t * 1000);
      gsap.ticker.add(raf);
      gsap.ticker.lagSmoothing(0);

      playHero();
      setupReveals();
      root.classList.add("motion-ready");

      // Measure in page order once the pinned process section exists, and again once fonts settle.
      ScrollTrigger.sort();
      ScrollTrigger.refresh();
      document.fonts?.ready.then(() => ScrollTrigger.refresh());

      return () => {
        gsap.ticker.remove(raf);
        lenis?.destroy();
        lenis = null;
      };
    });

    return () => mm.revert();
  });

  return null;
}

function playHero() {
  const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

  // Headline: each word rises out of its own line mask.
  tl.set("[data-hero-item='title']", { autoAlpha: 1 });
  tl.from("[data-hero-word]", { yPercent: 110, duration: 0.7, stagger: 0.04 });
  tl.fromTo(
    "[data-hero-item='copy']",
    { autoAlpha: 0, y: 14 },
    { autoAlpha: 1, y: 0, duration: 0.5, stagger: 0.07 },
    "-=0.45",
  );

  // Tiles click into place in reading order.
  tl.fromTo(
    "[data-hero-item='tile']",
    { autoAlpha: 0, y: 36, scale: 0.97 },
    {
      autoAlpha: 1,
      y: 0,
      scale: 1,
      duration: 0.65,
      ease: "back.out(1.3)",
      stagger: 0.07,
    },
    0.15,
  );

  // Inside the tiles: the clock counts up and services report in. The brand
  // tile's logo assembles itself (LogoScene).

  const counter = document.querySelector<HTMLElement>("[data-count]");
  if (counter) {
    counter.textContent = "0";
    const value = { n: 0 };
    tl.to(
      value,
      {
        n: Number(counter.dataset.count),
        duration: 0.8,
        ease: "power2.out",
        onUpdate: () => {
          counter.textContent = String(Math.round(value.n));
        },
      },
      0.35,
    );
  }

  document.querySelectorAll<HTMLElement>("[data-status]").forEach((el, i) => {
    el.setAttribute("data-state", "wait");
    tl.call(
      () => el.setAttribute("data-state", "ok"),
      undefined,
      0.85 + i * 0.22,
    );
  });
}

function setupReveals() {
  const handled = new Set<Element>();

  gsap.utils.toArray<HTMLElement>("[data-reveal-group]").forEach((group) => {
    const items = gsap.utils.toArray<HTMLElement>(
      group.querySelectorAll("[data-reveal]"),
    );
    items.forEach((el) => handled.add(el));
    reveal(items, group);
  });

  gsap.utils
    .toArray<HTMLElement>("[data-reveal]")
    .filter((el) => !handled.has(el))
    .forEach((el) => reveal([el], el));
}

function reveal(items: HTMLElement[], trigger: HTMLElement) {
  const st = { trigger, start: "top 85%", once: true };
  const byKind = (kind: string) =>
    items.filter((el) => el.dataset.reveal === kind);

  const tl = gsap.timeline({ scrollTrigger: st });

  // Headings and copy: a short lift.
  const rise = byKind("rise");
  if (rise.length)
    tl.fromTo(
      rise,
      { autoAlpha: 0, y: 24 },
      { autoAlpha: 1, y: 0, duration: 0.6, ease: "power3.out", stagger: 0.06 },
      0,
    );

  // Cards: set down with a little weight; each one pulls the next.
  const drop = byKind("drop");
  if (drop.length)
    tl.fromTo(
      drop,
      { autoAlpha: 0, y: 48, scale: 0.98 },
      {
        autoAlpha: 1,
        y: 0,
        scale: 1,
        duration: 0.7,
        ease: "back.out(1.25)",
        stagger: 0.07,
      },
      0.08,
    );

  // Thumbnails: the mask opens from the bottom while the picture settles.
  const mask = byKind("mask");
  if (mask.length) {
    tl.fromTo(
      mask,
      { autoAlpha: 1, clipPath: "inset(100% 0% 0% 0% round 16px)" },
      {
        clipPath: "inset(0% 0% 0% 0% round 16px)",
        duration: 0.8,
        ease: "power3.inOut",
        stagger: 0.08,
      },
      0.1,
    );
    tl.fromTo(
      mask.map((el) => el.firstElementChild).filter(Boolean),
      { scale: 1.08 },
      { scale: 1, duration: 0.9, ease: "power3.out", stagger: 0.08 },
      0.1,
    );
  }

  // Small labels: quick fade, after their container.
  const pop = byKind("pop");
  if (pop.length)
    tl.fromTo(
      pop,
      { autoAlpha: 0, y: 8 },
      { autoAlpha: 1, y: 0, duration: 0.35, ease: "power2.out", stagger: 0.05 },
      0.3,
    );
}
