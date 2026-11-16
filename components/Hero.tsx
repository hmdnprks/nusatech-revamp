import { ArrowDown, WhatsappLogo } from "@phosphor-icons/react/ssr";
import { Fragment } from "react";
import { LogoScene } from "@/components/LogoScene";
import { getDictionary } from "@/i18n/get-dictionary";
import { whatsappHref } from "@/lib/content";

export async function Hero() {
  const dict = await getDictionary();
  const t = dict.hero;
  const whatsapp = whatsappHref(dict.whatsappMessage);

  return (
    <section id="home" className="mx-auto max-w-[1240px] px-5 pt-3 md:px-8">
      <div className="grid gap-4 lg:grid-cols-[1.25fr_1fr_1fr] lg:grid-rows-[minmax(300px,auto)_minmax(280px,auto)]">
        {/* Headline tile */}
        <div className="tile flex min-w-0 flex-col p-6 sm:p-10 lg:row-span-2 xl:p-12">
          {/* Sized so the longest Indonesian word ("pengembangan") fits its
              column at every width, down to 320px. */}
          <h1
            data-hero-item="title"
            className="text-[clamp(30px,9.6vw,40px)] leading-[1.06] sm:text-[52px] lg:text-[40px] xl:text-[48px] xl:leading-[1.05]"
          >
            {t.titleLines.map((line, i) => (
              <span key={i} className={line.accent ? "text-blue" : undefined}>
                {line.text.split(" ").map((word, j) => (
                  <Fragment key={j}>
                    <span className="-mb-[0.12em] inline-block overflow-hidden pb-[0.12em] align-bottom">
                      <span data-hero-word className="inline-block">
                        {word}
                      </span>
                    </span>{" "}
                  </Fragment>
                ))}
              </span>
            ))}
          </h1>
          <p data-hero-item="copy" className="mt-6 max-w-[460px] text-body">
            {t.body}
          </p>
          <div
            data-hero-item="copy"
            className="mt-8 flex flex-wrap gap-2.5 lg:mt-auto lg:pt-8"
          >
            <a
              href={whatsapp}
              target="_blank"
              rel="noopener"
              className="btn btn-dark"
            >
              <WhatsappLogo size={20} aria-hidden="true" /> {t.primary}
            </a>
            <a href="#work" className="btn btn-soft">
              {t.secondary} <ArrowDown size={18} aria-hidden="true" />
            </a>
          </div>
        </div>

        {/* Brand tile: the logo as a 3D object, the company's own tagline beside it */}
        <div
          data-hero-item="tile"
          data-logo-tile
          className="tile relative grid min-w-0 overflow-hidden border-ink bg-ink text-white sm:grid-cols-[1fr_1.1fr] lg:col-span-2"
        >
          <div className="order-2 flex flex-col justify-end p-6 sm:order-1 sm:p-7">
            <h2 className="text-[24px] leading-[1.15] sm:text-[26px]">
              {t.brand.title}
            </h2>
            <p className="mt-2 text-[15px] text-[#a8b4c3]">{t.brand.body}</p>
          </div>
          <LogoScene className="order-1 h-[220px] sm:order-2 sm:h-auto sm:min-h-[300px]" />
        </div>

        {/* 24H service */}
        <div
          data-hero-item="tile"
          className="tile border-sun-100 bg-sun-50 p-6 sm:p-7"
        >
          <h2 className="text-[22px]">{t.service.title}</h2>
          <p className="mt-4 text-[76px] leading-none font-semibold tracking-[-0.04em] text-ink tabular-nums">
            <span data-count="24">24</span>/7
          </p>
          <p className="mt-2 text-[15px]">{t.service.body}</p>
        </div>

        {/* Cloud support */}
        <div
          data-hero-item="tile"
          className="tile border-sky-100 bg-sky-50 p-6 sm:p-7"
        >
          <h2 className="text-[22px]">{t.cloud.title}</h2>
          <ul className="mt-4 grid gap-2">
            {t.cloud.services.map((s) => (
              <li
                key={s.name}
                data-status
                data-state="ok"
                className="group flex items-center justify-between rounded-[12px] bg-card px-3.5 py-2 text-[14px]"
              >
                {s.name}
                <span className="flex items-center gap-1.5 font-medium text-mint group-data-[state=wait]:text-body">
                  <i className="size-2 rounded-full bg-mint transition-colors duration-300 group-data-[state=wait]:animate-pulse group-data-[state=wait]:bg-line" />
                  <span className="group-data-[state=wait]:hidden">{s.ok}</span>
                  <span className="hidden group-data-[state=wait]:inline">
                    {t.cloud.checking}
                  </span>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
