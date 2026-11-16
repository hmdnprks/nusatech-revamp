import { ArrowRight, WhatsappLogo } from "@phosphor-icons/react/ssr";
import { Fragment } from "react";
import { getDictionary } from "@/i18n/get-dictionary";
import { whatsappHref } from "@/lib/content";

const code = [
  <span key="1" className="text-[#7f8ea0]">
    {"// screening.ts"}
  </span>,
  <>
    <span className="text-sky">export async function</span> score(answers) {"{"}
  </>,
  <>
    {"  "}
    <span className="text-sky">const</span> total = answers.reduce(sum, 0);
  </>,
  <>
    {"  "}
    <span className="text-sky">return</span> total &gt; cutoff
  </>,
  <>
    {"    "}? <span className="text-sun">&apos;follow-up&apos;</span>
  </>,
  <>
    {"    "}: <span className="text-sun">&apos;healthy&apos;</span>;
  </>,
  <>{"}"}</>,
];

export async function Hero() {
  const dict = await getDictionary();
  const t = dict.hero;
  const whatsapp = whatsappHref(dict.whatsappMessage);

  return (
    <section id="home" className="mx-auto max-w-[1240px] px-5 pt-3 md:px-8">
      <div className="grid gap-4 lg:grid-cols-[1.25fr_1fr_1fr] lg:grid-rows-[minmax(300px,auto)_minmax(280px,auto)]">
        {/* Headline tile */}
        <div className="tile flex flex-col p-7 sm:p-10 lg:row-span-2 lg:p-12">
          <h1
            data-hero-item="title"
            className="text-[40px] leading-[1.06] sm:text-[52px] xl:text-[54px] xl:leading-[1.05]"
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
              {t.contact} <ArrowRight size={20} />
            </a>
            <a
              href={whatsapp}
              target="_blank"
              rel="noopener"
              className="btn btn-soft"
            >
              <WhatsappLogo size={20} /> {t.whatsapp}
            </a>
          </div>
        </div>

        {/* Clean code */}
        <div
          data-hero-item="tile"
          className="tile relative flex flex-col justify-end sm:min-h-[300px] overflow-hidden border-ink bg-ink p-6 text-white sm:p-7 lg:col-span-2"
        >
          <pre
            aria-hidden="true"
            className="mb-6 overflow-hidden rounded-[14px] bg-code px-4 py-4 font-mono text-[12px] leading-[1.75] text-[#cfe3f2] sm:absolute sm:top-6 sm:right-6 sm:mb-0 sm:w-[420px] sm:px-5 sm:text-[13px]"
          >
            {code.map((line, i) => (
              <span key={i} data-code-line className="block">
                {line}
              </span>
            ))}
          </pre>
          <div className="relative">
            <h3 className="text-[22px]">{t.cleanCode.title}</h3>
            <p className="mt-1 text-[15px] text-[#a8b4c3]">
              {t.cleanCode.body}
            </p>
          </div>
        </div>

        {/* 24H service */}
        <div
          data-hero-item="tile"
          className="tile border-sun-100 bg-sun-50 p-6 sm:p-7"
        >
          <h3 className="text-[22px]">{t.service.title}</h3>
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
          <h3 className="text-[22px]">{t.cloud.title}</h3>
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

      <div
        data-reveal="rise"
        className="flex flex-wrap items-center gap-x-10 gap-y-3 px-2 pt-9 pb-2 text-[15px] text-body md:gap-x-14"
      >
        <span>{t.certifiedBy}</span>
        {["AWS", "Google Cloud", "Scrum.org", "Oracle", "Hacktiv8"].map(
          (name) => (
            <b key={name} className="text-[19px] font-semibold text-[#5c6b7b]">
              {name}
            </b>
          ),
        )}
      </div>
    </section>
  );
}
