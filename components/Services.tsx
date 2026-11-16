import { Check, Stack, Wallet } from "@phosphor-icons/react/ssr";
import { certifications } from "@/lib/content";

export function Services() {
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
            What you can
            <br />
            expect from us
          </h2>
          <p data-reveal="rise" className="max-w-[420px] text-body">
            Six commitments behind every project — from the first line of code
            to long after launch.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div data-reveal="drop" className="tile p-7">
            <div className="grid size-12 place-items-center rounded-[14px] bg-sky-50 text-blue">
              <Stack size={24} weight="duotone" />
            </div>
            <h3 className="mt-6 text-[22px]">Modern Development</h3>
            <p className="mt-1.5 text-[15px] text-body">
              Current frameworks and practices, so your product stays ahead of
              the curve.
            </p>
          </div>

          <div data-reveal="drop" className="tile p-7">
            <div className="grid size-12 place-items-center rounded-[14px] bg-sun-50 text-sun-ink">
              <Wallet size={24} weight="duotone" />
            </div>
            <h3 className="mt-6 text-[22px]">Value for Money</h3>
            <p className="mt-1.5 text-[15px] text-body">
              Cost-effective solutions, without compromising on quality.
            </p>
          </div>

          <div
            data-reveal="drop"
            className="tile grid items-center gap-6 p-7 sm:col-span-2 md:grid-cols-2"
          >
            <div>
              <h3 className="text-[22px]">Faster Response</h3>
              <p className="mt-1.5 text-[15px] text-body">
                Quick turnaround on your requests, and fast-loading applications
                for your users.
              </p>
            </div>
            <div
              aria-hidden="true"
              className="grid gap-2 rounded-[16px] bg-bg p-4 text-[14px]"
            >
              <div className="mr-8 rounded-[12px] rounded-bl-[4px] bg-card px-3.5 py-2.5">
                Can we add an export button to the report page?
              </div>
              <div className="ml-8 rounded-[12px] rounded-br-[4px] bg-ink px-3.5 py-2.5 text-white">
                On it — you&apos;ll get a preview link to try first.
              </div>
            </div>
          </div>
        </div>
      </div>

      <div data-reveal-group className="mt-4 grid gap-4 lg:grid-cols-2">
        <div
          data-reveal="drop"
          className="tile flex flex-col border-navy bg-navy p-8 text-white md:p-11"
        >
          <h2 className="text-[32px] leading-[1.1] md:text-[36px]">
            Why Nusatech?
          </h2>
          <p className="mt-4 text-[#c6dcec]">
            We&apos;re your partner for IT consulting and custom application
            development. Collaborators, not just vendors — we start from your
            goals, build what fits, and stay with you after launch.
          </p>
          <ul className="mt-10 grid gap-2.5 lg:mt-auto">
            {[
              "Client-centric from day one",
              "Built for long-term growth",
              "Ongoing support after go-live",
            ].map((item) => (
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
            Experienced and certified professionals
          </h2>
          <p className="mt-3.5 text-body">
            More than five years of app development experience across the team,
            with certifications from leading cloud and agile organisations.
          </p>
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
              Who we build for
            </h2>
            <p className="mt-3.5 text-body">
              Technology with a positive social impact — for institutions and
              businesses alike.
            </p>
          </div>
          <dl className="grid grid-cols-2 gap-2 sm:grid-cols-4">
            {[
              ["Education", "Universities"],
              ["Health", "Screening & care"],
              ["Social", "Zakat & giving"],
              ["Business", "Retail & SMEs"],
            ].map(([term, detail]) => (
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
