import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { defaultLocale, hasLocale, type Locale } from "@/i18n/config";
import { getDictionaryFor } from "@/i18n/dictionaries";
import { emailParts, projects } from "@/lib/content";

const size = { width: 1200, height: 630 };
const clientShorts = [...new Set(projects.map((p) => p.short))];

type Params = { lang: string };

const toLocale = (lang: string): Locale =>
  hasLocale(lang) ? lang : defaultLocale;

export async function generateImageMetadata({
  params,
}: {
  params: Params | Promise<Params>;
}) {
  const { meta } = await getDictionaryFor(toLocale((await params).lang));
  return [{ id: "card", alt: meta.ogImageAlt, size, contentType: "image/png" }];
}

const fonts = Promise.all([
  readFile(join(process.cwd(), "assets/fonts/outfit-400.woff")),
  readFile(join(process.cwd(), "assets/fonts/outfit-600.woff")),
]);

/** Link-preview card in the site's tile language: headline tile, ink tile, sun tile. */
export default async function OpenGraphImage({
  params,
}: {
  params: Promise<Params>;
}) {
  const dict = await getDictionaryFor(toLocale((await params).lang));
  const [regular, semibold] = await fonts;

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        gap: 20,
        padding: 40,
        background: "#f6f8fb",
        fontFamily: "Outfit",
        color: "#101b2b",
      }}
    >
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          padding: "44px 48px",
          background: "#ffffff",
          border: "1px solid #e3e9f0",
          borderRadius: 32,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <svg width="54" height="41" viewBox="40 90 420 320">
            <polygon
              fill="#3DB8FF"
              points="104,96 136,96 276,177 276,235 161,169 161,403 104,403 104,252 45,218 45,161 104,195"
            />
            <polygon
              fill="#145A85"
              points="340,96 397,96 397,246 455,280 455,337 397,304 397,403 364,403 223,323 223,265 340,331"
            />
          </svg>
          <span style={{ fontSize: 30, fontWeight: 600 }}>
            Nusantara Tech Solution
          </span>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            marginTop: 44,
            fontSize: 62,
            fontWeight: 600,
            lineHeight: 1.06,
            letterSpacing: "-0.025em",
          }}
        >
          {dict.hero.titleLines.map((line) => (
            <span
              key={line.text}
              style={{ color: line.accent ? "#1a7cc0" : "#101b2b" }}
            >
              {line.text}
            </span>
          ))}
        </div>

        <span style={{ marginTop: "auto", fontSize: 26, color: "#4f5d6d" }}>
          {dict.meta.ogServices}
        </span>
      </div>

      <div
        style={{
          width: 330,
          display: "flex",
          flexDirection: "column",
          gap: 20,
        }}
      >
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end",
            padding: 32,
            background: "#101b2b",
            borderRadius: 32,
            color: "#ffffff",
          }}
        >
          <span style={{ fontSize: 22, color: "#a8b4c3" }}>
            {emailParts[0]}@
          </span>
          <span style={{ fontSize: 26, fontWeight: 600, marginTop: 4 }}>
            {emailParts[1]}
          </span>
        </div>
        <div
          style={{
            height: 230,
            display: "flex",
            flexDirection: "column",
            padding: 32,
            background: "#fff6dc",
            border: "1px solid #f6e3aa",
            borderRadius: 32,
          }}
        >
          <span style={{ fontSize: 24, fontWeight: 600 }}>
            {dict.hero.clients.title}
          </span>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: 10,
              marginTop: "auto",
            }}
          >
            {clientShorts.map((short) => (
              <span
                key={short}
                style={{
                  padding: "8px 16px",
                  background: "#ffffff",
                  borderRadius: 14,
                  fontSize: 30,
                  fontWeight: 600,
                  color: "#1b5a8a",
                }}
              >
                {short}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>,
    {
      ...size,
      fonts: [
        { name: "Outfit", data: regular, weight: 400, style: "normal" },
        { name: "Outfit", data: semibold, weight: 600, style: "normal" },
      ],
    },
  );
}
