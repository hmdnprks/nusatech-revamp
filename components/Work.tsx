import { getDictionary } from "@/i18n/get-dictionary";
import { projects, type Tint } from "@/lib/content";

const thumb: Record<Tint, string> = {
  sky: "bg-[linear-gradient(135deg,#cfebff,#e9f6ff)]",
  mint: "bg-[linear-gradient(135deg,#ddf4e9,#f0faf5)]",
  sun: "bg-[linear-gradient(135deg,#ffefc2,#fff8e4)]",
};

const accent: Record<Tint, string> = {
  sky: "bg-blue",
  mint: "bg-mint",
  sun: "bg-sun",
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
        {projects.map((p, i) => (
          <li
            key={p.key}
            data-reveal="drop"
            className="tile flex flex-col p-2.5"
          >
            <div data-reveal="mask" className="overflow-hidden rounded-[16px]">
              <div className={`relative h-[180px] ${thumb[p.tint]}`}>
                <span className="absolute top-3.5 left-3.5 rounded-full bg-white/90 px-3 py-1 text-[13px]">
                  {t.sectors[p.sector]}
                </span>
                <div
                  aria-hidden="true"
                  className="absolute right-10 -bottom-2.5 left-10 h-[112px] rounded-t-[12px] bg-white p-3.5 shadow-[0_10px_30px_-10px_rgb(16_27_43/0.2)]"
                >
                  <div className="flex items-center gap-2">
                    <i className={`size-3 rounded-full ${accent[p.tint]}`} />
                    <i className="h-2.5 w-1/3 rounded-full bg-line" />
                  </div>
                  <i
                    className="mt-3 block h-2.5 rounded-full bg-line"
                    style={{ width: `${70 + ((i * 13) % 25)}%` }}
                  />
                  <i
                    className="mt-2 block h-2.5 rounded-full bg-line"
                    style={{ width: `${45 + ((i * 17) % 40)}%` }}
                  />
                  <i className="mt-2 block h-2.5 w-full rounded-full bg-line" />
                </div>
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
