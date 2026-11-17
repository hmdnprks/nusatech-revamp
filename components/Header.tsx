"use client";

import { List, X } from "@phosphor-icons/react/ssr";
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { LogoMark } from "@/components/Logo";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries/en";
import { navIds, type NavId } from "@/lib/content";
import { scrollToId } from "@/components/MotionLayer";

export function Header({
  t,
  locale,
  mailto,
}: {
  t: Dictionary["nav"];
  locale: Locale;
  mailto: string;
}) {
  const [active, setActive] = useState<NavId>("home");
  const [open, setOpen] = useState(false);
  const [indicator, setIndicator] = useState<{ x: number; w: number } | null>(
    null,
  );
  const [animateIndicator, setAnimateIndicator] = useState(false);
  const linkRefs = useRef<Partial<Record<NavId, HTMLAnchorElement | null>>>({});
  const activeRef = useRef<NavId>("home");

  // Scroll spy: the section whose top has passed the upper third of the viewport is current.
  useEffect(() => {
    const sections = navIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    const update = () => {
      const line = window.innerHeight * 0.35;
      let current: NavId = "home";
      for (const el of sections) {
        if (el.getBoundingClientRect().top <= line) current = el.id as NavId;
      }
      if (window.innerHeight + window.scrollY >= document.body.scrollHeight - 4)
        current = "contact";
      setActive(current);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  // Sliding indicator: follows the active link with a short spring. Placed without
  // animation on first paint, on resize and once fonts have loaded.
  const measure = useCallback(() => {
    const el = linkRefs.current[activeRef.current];
    if (el) setIndicator({ x: el.offsetLeft, w: el.offsetWidth });
  }, []);

  useLayoutEffect(() => {
    activeRef.current = active;
    measure();
  }, [active, measure]);

  useEffect(() => {
    let frame = 0;
    const placeWithoutAnimation = () => {
      setAnimateIndicator(false);
      measure();
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() =>
        requestAnimationFrame(() => setAnimateIndicator(true)),
      );
    };
    placeWithoutAnimation();
    window.addEventListener("resize", placeWithoutAnimation);
    document.fonts?.ready.then(placeWithoutAnimation);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", placeWithoutAnimation);
    };
  }, [measure]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const go = (id: NavId) => (e: React.MouseEvent) => {
    e.preventDefault();
    setOpen(false);
    scrollToId(id);
  };

  const items = navIds.map((id) => ({ id, label: t[id] }));

  return (
    <header className="sticky top-0 z-40 bg-bg/85 backdrop-blur-md">
      <div className="mx-auto flex h-[76px] max-w-[1240px] items-center gap-3 px-5 md:h-[84px] md:px-8 lg:gap-6">
        <a
          href="#home"
          onClick={go("home")}
          className="flex items-center gap-2.5 text-[19px] font-semibold"
        >
          <LogoMark className="h-[27px] w-[36px]" />
          Nusatech
        </a>

        <nav
          aria-label={t.main}
          className="relative mx-auto hidden rounded-[14px] border border-line bg-card p-[5px] lg:flex"
        >
          {indicator && (
            <span
              aria-hidden="true"
              className="absolute top-[5px] bottom-[5px] left-0 rounded-[10px] bg-sky-50"
              style={{
                transform: `translateX(${indicator.x}px)`,
                width: indicator.w,
                transition: animateIndicator
                  ? "transform 280ms var(--ease-click), width 280ms var(--ease-click)"
                  : "none",
              }}
            />
          )}
          {items.map((item) => (
            <a
              key={item.id}
              ref={(el) => {
                linkRefs.current[item.id] = el;
              }}
              href={`#${item.id}`}
              onClick={go(item.id)}
              aria-current={active === item.id ? "true" : undefined}
              className={`relative rounded-[10px] px-4 py-2.5 text-[15px] underline-offset-4 transition-colors ${
                active === item.id
                  ? "font-medium text-ink"
                  : "text-body hover:text-ink hover:underline"
              }`}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <a
          href={mailto}
          className="btn btn-dark hidden h-[46px] lg:inline-flex"
        >
          {t.cta}
        </a>

        <LanguageSwitcher
          current={locale}
          label={t.language}
          className="ml-auto lg:ml-0"
        />

        <button
          type="button"
          className="grid size-11 place-items-center rounded-[12px] border border-line bg-card lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? t.closeMenu : t.openMenu}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? (
            <X size={22} aria-hidden="true" />
          ) : (
            <List size={22} aria-hidden="true" />
          )}
        </button>
      </div>

      {/* Closed menu is inert: out of the tab order and hidden from screen readers. */}
      <div
        id="mobile-menu"
        inert={!open}
        className={`overflow-hidden border-line px-5 transition-[max-height,opacity] duration-300 ease-out lg:hidden ${
          open ? "max-h-[420px] border-b opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <nav aria-label={t.main} className="flex flex-col pb-5">
          {items.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={go(item.id)}
              className={`rounded-[12px] px-4 py-3 text-[17px] underline-offset-4 ${
                active === item.id
                  ? "bg-sky-50 font-medium"
                  : "text-body hover:underline"
              }`}
            >
              {item.label}
            </a>
          ))}
          <a href={mailto} className="btn btn-dark mt-3">
            {t.cta}
          </a>
        </nav>
      </div>
    </header>
  );
}
