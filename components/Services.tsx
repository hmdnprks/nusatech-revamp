import { Check, Stack, Wallet, WhatsappLogo } from "@phosphor-icons/react/ssr";
import { getDictionary } from "@/i18n/get-dictionary";
import { certifications, contact, whatsappHref } from "@/lib/content";

export async function Services() {
  const dict = await getDictionary();
  const t = dict.services;

  return (
    <section
      id="services"
      className="mx-auto max-w-[1240px] px-5 pt-20 md:px-8 md:pt-28"
    >
      <div data-reveal-group>
        <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end md:gap-10">
          <h2
            data-reveal="rise"
            className="text-[36px] leading-[1.08] md:text-[46px]"
          >
            {t.title[0]}
            <br />
            {t.title[1]}
          </h2>
          <p data-reveal="rise" className="max-w-[420px] text-body">
            {t.intro}
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div data-reveal="drop" className="tile p-7">
            <div className="grid size-12 place-items-center rounded-[14px] bg-sky-50 text-blue">
              <Stack size={24} weight="duotone" />
            </div>
            <h3 className="mt-6 text-[22px]">{t.modern.title}</h3>
            <p className="mt-1.5 text-[15px] text-body">{t.modern.body}</p>
          </div>

          <div data-reveal="drop" className="tile p-7">
            <div className="grid size-12 place-items-center rounded-[14px] bg-sun-50 text-sun-ink">
              <Wallet size={24} weight="duotone" />
            </div>
            <h3 className="mt-6 text-[22px]">{t.value.title}</h3>
            <p className="mt-1.5 text-[15px] text-body">{t.value.body}</p>
          </div>

          <div
            data-reveal="drop"
            className="tile grid items-center gap-6 p-7 sm:col-span-2 md:grid-cols-2"
          >
            <div>
              <h3 className="text-[22px]">{t.response.title}</h3>
              <p className="mt-1.5 text-[15px] text-body">{t.response.body}</p>
            </div>
            <a
              href={whatsappHref(dict.whatsappMessage)}
              target="_blank"
              rel="noopener"
              className="group flex min-h-11 items-center gap-3.5 rounded-[16px] bg-bg p-4 transition-colors hover:bg-sky-50"
            >
              <span className="grid size-11 shrink-0 place-items-center rounded-[12px] bg-ink text-white">
                <WhatsappLogo size={22} aria-hidden="true" />
              </span>
              <span className="text-[14px] text-body">
                {t.response.channel}
                <b className="block text-[16px] font-semibold text-ink group-hover:underline">
                  {contact.phoneDisplay}
                </b>
              </span>
            </a>
          </div>
        </div>
      </div>

      <div data-reveal-group className="mt-4 grid gap-4 lg:grid-cols-2">
        <div
          data-reveal="drop"
          className="tile flex flex-col border-navy bg-navy p-8 text-white md:p-11"
        >
          <h2 className="text-[32px] leading-[1.1] md:text-[36px]">
            {t.why.title}
          </h2>
          <p className="mt-4 text-[#c6dcec]">{t.why.body}</p>
          <ul className="mt-10 grid gap-2.5 lg:mt-auto">
            {t.why.points.map((item) => (
              <li
                key={item}
                className="flex items-center gap-3 rounded-[14px] bg-white/[.08] px-4.5 py-4"
              >
                <Check size={20} weight="bold" className="text-sky" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div data-reveal="drop" className="tile p-8 md:p-11">
          <h2 className="text-[32px] leading-[1.1] md:text-[36px]">
            {t.certified.title}
          </h2>
          <p className="mt-3.5 text-body">{t.certified.body}</p>
          <ul className="mt-6 flex flex-wrap gap-2">
            {certifications.map((c) => (
              <li
                key={c.org + c.name}
                data-reveal="pop"
                className="rounded-full border border-line bg-bg px-3.5 py-1.5 text-[14px]"
              >
                <b className="font-semibold">{c.org}</b> {c.name}
                {c.count > 1 && <span className="text-body"> ×{c.count}</span>}
              </li>
            ))}
          </ul>
        </div>

        <div
          data-reveal="drop"
          className="tile grid gap-6 p-8 md:p-11 lg:col-span-2 lg:grid-cols-[1fr_1.4fr] lg:items-center"
        >
          <div>
            <h2 className="text-[32px] leading-[1.1] md:text-[36px]">
              {t.audience.title}
            </h2>
            <p className="mt-3.5 text-body">{t.audience.body}</p>
          </div>
          <dl className="grid grid-cols-2 gap-2 sm:grid-cols-4">
            {t.audience.sectors.map(({ term, detail }) => (
              <div
                key={term}
                data-reveal="pop"
                className="rounded-[14px] bg-bg p-3.5"
              >
                <dt className="text-[15px] font-semibold">{term}</dt>
                <dd className="text-[14px] text-body">{detail}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
