import {
  EnvelopeSimple,
  MapPin,
  Phone,
  WhatsappLogo,
} from "@phosphor-icons/react/ssr";
import { LogoMark } from "@/components/Logo";
import { getDictionary } from "@/i18n/get-dictionary";
import { contact, whatsappHref } from "@/lib/content";

export async function Contact() {
  const dict = await getDictionary();
  const t = dict.contact;

  return (
    <>
      <section
        id="contact"
        className="mx-auto max-w-[1240px] px-5 pt-24 md:px-8 md:pt-32"
      >
        <div
          data-reveal="drop"
          className="relative overflow-hidden rounded-[32px] bg-ink px-7 py-12 text-white md:px-16 md:py-16"
        >
          <LogoMark
            tone="light"
            className="pointer-events-none absolute -right-10 -bottom-16 w-[340px] opacity-[0.07]"
          />
          <div className="relative grid gap-10 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <h2 className="text-[36px] leading-[1.08] md:text-[46px]">
                {t.title}
              </h2>
              <p className="mt-3 max-w-[560px] text-[#b5c2d1]">{t.body}</p>
            </div>
            <a
              href={whatsappHref(dict.whatsappMessage)}
              target="_blank"
              rel="noopener"
              className="btn btn-sky h-[58px] self-start lg:self-auto"
            >
              <WhatsappLogo size={22} weight="fill" /> {t.cta}
            </a>
          </div>

          <ul className="relative mt-12 grid gap-6 border-t border-white/10 pt-8 text-[15px] sm:grid-cols-3">
            <li className="flex gap-3">
              <Phone size={20} className="mt-0.5 shrink-0 text-sky" />
              <div>
                <p className="text-[#b5c2d1]">{t.phone}</p>
                <a href={contact.phoneHref} className="hover:underline">
                  {contact.phoneDisplay}
                </a>
              </div>
            </li>
            <li className="flex gap-3">
              <EnvelopeSimple size={20} className="mt-0.5 shrink-0 text-sky" />
              <div>
                <p className="text-[#b5c2d1]">{t.email}</p>
                <a
                  href={`mailto:${contact.email}`}
                  className="break-all hover:underline"
                >
                  {contact.email}
                </a>
              </div>
            </li>
            <li className="flex gap-3">
              <MapPin size={20} className="mt-0.5 shrink-0 text-sky" />
              <div>
                <p className="text-[#b5c2d1]">{t.office}</p>
                <a
                  href={contact.mapsHref}
                  target="_blank"
                  rel="noopener"
                  className="hover:underline"
                >
                  {contact.addressLines.join(", ")}
                </a>
              </div>
            </li>
          </ul>
        </div>
      </section>

      <footer className="mx-auto flex max-w-[1240px] flex-col gap-3 px-5 pt-12 pb-10 text-[15px] text-body md:flex-row md:items-center md:justify-between md:px-8">
        <div className="flex items-center gap-2.5">
          <LogoMark className="h-[22px] w-[29px]" />
          <span className="font-medium text-ink">
            CV Nusantara Tech Solution
          </span>
        </div>
        <p>{t.tagline}</p>
        <p>© 2026</p>
      </footer>
    </>
  );
}
