"use client";

import { useGSAP } from "@gsap/react";
import { Check, CloudCheck } from "@phosphor-icons/react/ssr";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";
import type { Dictionary } from "@/i18n/dictionaries/en";

gsap.registerPlugin(ScrollTrigger, useGSAP);

type Copy = Dictionary["process"];

const statuses = [
  { key: "draft", className: "bg-sun-50 text-sun-ink" },
  { key: "build", className: "bg-sky-50 text-blue-ink" },
  { key: "test", className: "bg-ink text-white" },
  { key: "live", className: "bg-mint-50 text-mint" },
] as const;

const notePlacement = [
  "left-[8%] top-[30%] -rotate-3",
  "right-[6%] top-[22%] rotate-2",
  "right-[14%] bottom-[12%] -rotate-2",
];

const bars = [38, 56, 44, 82, 64, 72, 52, 90];

/**
 * "Our Process" told with one object: the client's app. On wide screens the section
 * pins and the scroll position moves the app from wireframe to live. Elsewhere, and
 * with reduced motion, the steps read as a list and the app is shown finished.
 */
export function ProcessStory({ t }: { t: Copy }) {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(
        "(min-width: 1024px) and (prefers-reduced-motion: no-preference)",
        () => {
          const q = gsap.utils.selector(root);
          const stepEls = q("[data-step]");
          const indicator = q("[data-step-indicator]")[0];

          // Start state: requirements.
          gsap.set(q("[data-fill]"), { autoAlpha: 0 });
          gsap.set(q("[data-note]"), { autoAlpha: 1, y: 0 });
          gsap.set(q("[data-sprint], [data-checks], [data-deploy]"), {
            autoAlpha: 0,
          });
          gsap.set(q("[data-check]"), { attr: { "data-done": "false" } });
          gsap.set(q("[data-bar]"), { scaleY: 0.15 });
          gsap.set(q("[data-card]"), { scale: 0.94 });
          gsap.set(q("[data-status]"), { autoAlpha: 0 });
          gsap.set(q("[data-status='draft']"), { autoAlpha: 1 });
          gsap.set(q("[data-step-body]"), { autoAlpha: 0.92 });
          gsap.set(q("[data-step-body]")[0], { autoAlpha: 1 });

          const moveTo = (i: number) => ({
            y: () => stepEls[i].offsetTop,
            height: () => stepEls[i].offsetHeight,
          });
          gsap.set(indicator, moveTo(0));

          const status = (from: string, to: string, at: string) => {
            tl.to(
              q(`[data-status='${from}']`),
              { autoAlpha: 0, duration: 0.15 },
              at,
            );
            tl.to(
              q(`[data-status='${to}']`),
              { autoAlpha: 1, duration: 0.15 },
              at,
            );
          };
          const step = (i: number, at: string) => {
            tl.to(
              indicator,
              { ...moveTo(i), duration: 0.35, ease: "power2.inOut" },
              at,
            );
            tl.to(
              q("[data-step-body]"),
              { autoAlpha: 0.92, duration: 0.2 },
              at,
            );
            tl.to(
              q("[data-step-body]")[i],
              { autoAlpha: 1, duration: 0.2 },
              at,
            );
          };

          const tl = gsap.timeline({
            defaults: { ease: "power2.out" },
            scrollTrigger: {
              trigger: root.current,
              start: "top 88px",
              end: "+=2400",
              pin: true,
              scrub: 0.6,
              invalidateOnRefresh: true,
            },
          });

          tl.to({}, { duration: 0.6 }); // hold on requirements

          // Development: the sketch turns into real interface.
          tl.addLabel("dev");
          step(1, "dev");
          status("draft", "build", "dev");
          tl.to(
            q("[data-note]"),
            { autoAlpha: 0, y: -24, duration: 0.4, stagger: 0.08 },
            "dev",
          );
          tl.to(
            q("[data-fill]"),
            { autoAlpha: 1, duration: 0.5, stagger: 0.05 },
            "dev+=0.1",
          );
          tl.to(
            q("[data-sprint]"),
            { autoAlpha: 1, x: 0, duration: 0.4 },
            "dev+=0.3",
          );
          tl.to(q("[data-card]"), { scale: 0.97, duration: 0.8 }, "dev");
          tl.to({}, { duration: 0.6 });

          // Testing: the checklist slides in and ticks off.
          tl.addLabel("test");
          step(2, "test");
          status("build", "test", "test");
          tl.to(q("[data-sprint]"), { autoAlpha: 0, duration: 0.25 }, "test");
          tl.fromTo(
            q("[data-checks]"),
            { autoAlpha: 0, x: 40 },
            { autoAlpha: 1, x: 0, duration: 0.4 },
            "test",
          );
          q("[data-check]").forEach((el, i) => {
            tl.set(
              el,
              { attr: { "data-done": "true" } },
              `test+=${0.4 + i * 0.2}`,
            );
          });
          tl.to({}, { duration: 0.6 });

          // Launch: it goes live and the data starts flowing.
          tl.addLabel("live");
          step(3, "live");
          status("test", "live", "live");
          tl.to(
            q("[data-checks]"),
            { autoAlpha: 0, x: 40, duration: 0.3 },
            "live",
          );
          tl.to(q("[data-card]"), { scale: 1, duration: 0.6 }, "live");
          tl.to(
            q("[data-bar]"),
            { scaleY: 1, duration: 0.6, stagger: 0.04, ease: "back.out(1.4)" },
            "live+=0.15",
          );
          tl.fromTo(
            q("[data-deploy]"),
            { autoAlpha: 0, y: 16 },
            { autoAlpha: 1, y: 0, duration: 0.35 },
            "live+=0.3",
          );
          tl.to({}, { duration: 0.5 });
        },
      );
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section
      ref={root}
      id="process"
      className="mx-auto max-w-[1240px] px-5 pt-20 md:px-8 md:pt-28 lg:mt-16 lg:pt-10"
    >
      <div
        data-reveal-group
        className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end md:gap-10"
      >
        <h2
          data-reveal="rise"
          className="text-[36px] leading-[1.08] md:text-[46px]"
        >
          {t.title}
        </h2>
        <p data-reveal="rise" className="max-w-[420px] text-body">
          {t.intro}
        </p>
      </div>

      <div
        data-stage
        className="grid items-center gap-6 lg:grid-cols-[360px_1fr] lg:gap-10"
      >
        <ol className="relative grid gap-1">
          <span
            data-step-indicator
            aria-hidden="true"
            className="absolute top-0 right-0 left-0 hidden rounded-[18px] border border-line bg-card lg:block"
          />
          {t.steps.map((s, i) => (
            <li key={i} data-step className="relative rounded-[18px] p-5">
              <div data-step-body>
                <span className="text-[14px] font-semibold text-blue-ink tabular-nums">
                  0{i + 1}
                </span>
                <h3 className="mt-0.5 text-[22px]">{s.title}</h3>
                <p className="mt-1 text-[15px] text-body">{s.body}</p>
              </div>
            </li>
          ))}
        </ol>

        <AppCard t={t.card} />
      </div>
    </section>
  );
}

function AppCard({ t }: { t: Copy["card"] }) {
  return (
    <div className="relative" aria-hidden="true">
      <div
        data-card
        className="tile relative h-[380px] overflow-hidden shadow-[0_40px_80px_-40px_rgb(16_27_43/0.35)] sm:h-[460px]"
      >
        {/* Browser bar */}
        <div className="flex h-11 items-center gap-2 border-b border-line bg-bg px-4">
          <i className="size-2.5 rounded-full bg-line" />
          <i className="size-2.5 rounded-full bg-line" />
          <i className="size-2.5 rounded-full bg-line" />
          <span className="ml-3 rounded-[8px] border border-line bg-card px-3 py-0.5 text-[13px] text-body">
            your-app.id
          </span>
          <span className="relative ml-auto h-6 w-[84px]">
            {statuses.map((s) => (
              <span
                key={s.key}
                data-status={s.key}
                className={`absolute inset-0 grid place-items-center rounded-full text-[13px] font-medium ${s.className} ${
                  s.key === "live" ? "" : "invisible"
                }`}
              >
                {t.statuses[s.key]}
              </span>
            ))}
          </span>
        </div>

        {/* App */}
        <div className="grid h-[calc(100%-44px)] grid-cols-[120px_1fr] sm:grid-cols-[150px_1fr]">
          <div className="grid content-start gap-2 border-r border-line p-4">
            <Box className="h-7" fill="bg-sky-50" />
            <Box className="h-5" />
            <Box className="h-5" />
            <Box className="h-5" />
          </div>
          <div className="flex flex-col gap-3 p-4 sm:p-5">
            <Box className="h-9" fill="bg-ink" />
            <div className="grid grid-cols-3 gap-3">
              <Box className="h-16" fill="bg-sky-50" />
              <Box className="h-16" fill="bg-sun-50" />
              <Box className="h-16" fill="bg-sky-100" />
            </div>
            <div className="relative flex-1 rounded-[12px] border border-dashed border-[#c5d0db]">
              <div
                data-fill
                className="absolute inset-0 flex items-end gap-2.5 rounded-[12px] bg-card p-4 sm:gap-3.5"
              >
                {bars.map((h, i) => (
                  <i
                    key={i}
                    data-bar
                    className={`flex-1 origin-bottom rounded-t-[6px] ${i === 7 ? "bg-blue" : "bg-sky-100"}`}
                    style={{ height: `${h}%` }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Requirements: sticky notes from the kickoff workshop */}
        {t.notes.map((text, i) => (
          <span
            key={text}
            data-note
            className={`invisible absolute rounded-[6px] bg-sun px-3.5 py-2.5 text-[14px] font-medium shadow-[0_8px_18px_-8px_rgb(122_80_0/0.5)] ${notePlacement[i]}`}
          >
            {text}
          </span>
        ))}

        {/* Development: sprint demo chip */}
        <span
          data-sprint
          className="invisible absolute bottom-5 left-[170px] rounded-full bg-ink px-3.5 py-1.5 font-mono text-[13px] text-white"
        >
          {t.sprint}
        </span>

        {/* Testing: checklist */}
        <div
          data-checks
          className="invisible absolute top-16 right-5 w-[220px] rounded-[16px] border border-line bg-card p-4 shadow-[0_20px_40px_-20px_rgb(16_27_43/0.35)]"
        >
          <p className="text-[14px] font-semibold text-ink">{t.checklist}</p>
          <ul className="mt-2 grid gap-2">
            {t.checks.map((c) => (
              <li
                key={c}
                data-check
                data-done="true"
                className="group flex items-center gap-2.5 text-[14px]"
              >
                <span className="grid size-5 place-items-center rounded-full border border-line text-white transition-colors duration-200 group-data-[done=true]:border-mint group-data-[done=true]:bg-mint">
                  <Check
                    size={12}
                    weight="bold"
                    className="opacity-0 group-data-[done=true]:opacity-100"
                  />
                </span>
                {c}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Launch: deployment badge */}
      <div
        data-deploy
        className="absolute -bottom-5 left-6 flex items-center gap-2 rounded-[14px] border border-sky-100 bg-sky-50 px-4 py-2.5 text-[14px] shadow-[0_12px_30px_-16px_rgb(16_27_43/0.4)]"
      >
        <CloudCheck size={20} weight="duotone" className="text-blue" />
        {t.deployed}
      </div>
    </div>
  );
}

/** A layout block: dashed outline while it's a wireframe, filled once it's built. */
function Box({
  className = "",
  fill = "bg-line",
}: {
  className?: string;
  fill?: string;
}) {
  return (
    <div
      className={`relative rounded-[8px] border border-dashed border-[#c5d0db] ${className}`}
    >
      <div data-fill className={`absolute -inset-px rounded-[8px] ${fill}`} />
    </div>
  );
}
