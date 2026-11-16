import { LogoMark } from "@/components/Logo";
import { getDictionary } from "@/i18n/get-dictionary";
import { projects, type Tint } from "@/lib/content";

// Sky marks institutional clients (universities), sun marks community and
// commerce clients. Flat tints only, see DESIGN.md.
const thumb: Record<Tint, string> = {
  sky: "bg-sky-50",
  sun: "bg-sun-50",
};

export async function Work() {
  const t = (await getDictionary()).work;
  const names: Partial<Record<string, string>> = t.names;

  return (
    <section
      id="work"
      className="mx-auto max-w-[1240px] px-5 pt-24 md:px-8 md:pt-32"
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

      <ul
        data-reveal-group
        className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
      >
        {projects.map((p) => (
          <li
            key={p.key}
            data-reveal="drop"
            className="tile flex flex-col p-2.5"
          >
            {/* TODO: replace with real project screenshots once provided.
                Until then the thumbnail is typographic (client initials),
                so nothing pretends to be a product shot. */}
            <div data-reveal="mask" className="overflow-hidden rounded-[16px]">
              <div
                className={`relative flex h-[180px] items-end p-5 ${thumb[p.tint]}`}
              >
                <span className="absolute top-3.5 left-3.5 rounded-full bg-white/90 px-3 py-1 text-[13px]">
                  {t.sectors[p.sector]}
                </span>
                <LogoMark className="pointer-events-none absolute -right-6 -bottom-8 w-[170px] opacity-[0.12]" />
                <span
                  aria-hidden="true"
                  className="relative text-[56px] leading-none font-semibold tracking-[-0.03em] text-navy"
                >
                  {p.short}
                </span>
              </div>
            </div>
            <div className="flex flex-1 flex-col px-3 pt-4 pb-3">
              <div className="flex items-start justify-between gap-4">
                <h3 className="text-[20px] leading-snug">
                  {names[p.key] ?? p.name}
                </h3>
                <span className="pt-0.5 text-[15px] text-body tabular-nums">
                  {p.year}
                </span>
              </div>
              <p className="text-[15px] font-medium text-ink/80">{p.client}</p>
              <p className="mt-2 text-[15px] text-body">{t.summaries[p.key]}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
