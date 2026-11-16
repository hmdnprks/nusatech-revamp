# DESIGN.md: Nusantara Tech Solution company profile

Design direction for this site. Read it before any UI work; `anti-slop/` audits check the site against it.

## Direction

Chosen by the owner on 2026-11-16 (oil-ui round 02, option C "Bento"), as a fresh take on the previous `nusantaratech-landing-page` with the same sections and content.

- **Who it's for:** procurement and programme staff at universities and foundations, and owners of growing businesses, deciding whether to trust a small software house.
- **What it must say:** a real, certified team that has shipped systems for UGM, Universitas Brawijaya, Inisiatif Zakat Indonesia and Rora, and that is easy to reach.
- **Personality:** friendly and capable. Plain language, no hype.

Design Read: *company profile landing page for institutional and SME buyers, in a soft-tile "bento" language built on the logo's blues, dial ENERGY 2 / RHYTHM 2 / MOTION 3.*

| Dial | Value | Why |
|---|---|---|
| ENERGY | 2 | Approachable for non-technical buyers, but not loud: the audience is institutions. |
| RHYTHM | 2 | Mostly a tile system, with deliberate breaks: the dark contact block, the navy "Why" panel and the pinned process story. |
| MOTION | 3 | One choreographed moment (the pinned process story) carries the narrative; everything else moves once on reveal and stays still. |

## Decisions and reasons

- **Layout (bento tiles):** owner-selected direction. The tiles let each commitment show itself (code, 24/7 clock, service status) instead of being listed. Recorded as a deliberate override of antislop R-05's "bento as default" lock (audit 001, item 12).
- **Typeface, Outfit (400/500/600):** round, geometric and friendly at display sizes while staying readable at 15 to 17px; it matches the soft tile radius and the approachable ENERGY 2 tone. Self-hosted via `next/font`.
- **Colour:** brand blues from the logo are the core (`navy #1B5A8A`, `blue #1A7CC0`, `sky #3DB8FF`), ink `#101B2B` for text and dark surfaces, one warm accent `sun #FFD66B` used for the 24H tile, sticky notes and community/commerce project cards. `mint #11845A` is semantic only (healthy, done, live). No gradients.
- **Project thumbnails:** flat tints, sky for institutional clients and sun for community and commerce clients. They show client initials until real screenshots arrive (TODO in `components/Work.tsx`).
- **Theme:** light only. The audience reads this during office hours on work machines, and the logo's navy stroke disappears on dark backgrounds. No dark toggle is planned.
- **Icons, Phosphor duotone:** its rounded two-tone glyphs match the soft tiles; used only where they speed recognition (feature tiles, contact channels, menu). WhatsApp and the cloud check icon carry real meaning.
- **Monospace:** only inside the code tile and the sprint chip, where it represents real code and tooling.
- **Radius:** 14px buttons, 24px tiles, 32px for the closing contact block; pills only for labels and status.
- **Shadow:** only on elements that float above another surface inside the process card (checklist, deploy badge) and on the app card itself.
- **Identity motif:** the logo's angular N, used as the favicon, the header mark, a watermark on project thumbnails and in the contact block.

## Motion

- **Hero:** words rise from a line mask; tiles set down in reading order; the 24 counts up; service statuses report in. First load only.
- **Sections:** one reveal each, matched to content (cards set down, thumbnails unmask, labels pop). Never replayed.
- **Process:** on screens 1024px and wider, the section pins and scrolling moves one client app from wireframe to live; scrolling back reverses it.
- **Reduced motion:** all of the above is off; content is shown in its final state and smooth scrolling is disabled.

## Copy rules

- English and Indonesian copy live in `i18n/dictionaries/`; Indonesian is the default.
- No em dashes. No numbers or claims without a source in the company's own documents.
- Calls to action name the action ("Discuss your project", "See our work").
