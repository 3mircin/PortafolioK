import Head from "next/head";
import Image from "next/image";
import { useEffect, useState } from "react";

const EMAIL = "emirlujan3@gmail.com";

const nav = [
  { id: "stack", n: "01", label: "stack" },
  { id: "work", n: "02", label: "work" },
  { id: "roadmap", n: "03", label: "roadmap" },
  { id: "contact", n: "04", label: "contact" },
];

const stack = [
  { name: "PostgreSQL", kind: "database", note: "queries that scale", level: 5 },
  { name: "MongoDB", kind: "database", note: "documents & indexes", level: 4 },
  { name: "Python", kind: "language", note: "scripts & services", level: 5 },
  { name: "C", kind: "language", note: "close to the metal", level: 4 },
  { name: "Linux", kind: "system", note: "daily driver", level: 5 },
  { name: "Git", kind: "tooling", note: "history nerd", level: 4 },
];

const roadmap = [
  {
    name: "MQTT",
    desc: "Lightweight messaging between devices, sensors and the backend.",
    tag: "protocol",
  },
  {
    name: "ESP32",
    desc: "Firmware on real hardware: sensors, relays, low-power modes.",
    tag: "hardware",
  },
  {
    name: "MicroPython",
    desc: "Fast iteration on microcontrollers without losing the Python brain.",
    tag: "runtime",
  },
];

const projects = [
  {
    n: "P—01",
    title: "Hackathon ISAC 2026",
    desc: "Built under pressure: technical relevance, teamwork and a working demo by the deadline.",
    tags: ["hackathon", "team", "problem solving"],
    year: "2026",
    href: "https://github.com/3mircin/Hackathon-ISAC-2026",
  },
  {
    n: "P—02",
    title: "HacktoberFest MLH",
    desc: "Open-source contributions with a 3rd place finish. Small patches, real repositories.",
    tags: ["open source", "mlh", "3rd place"],
    year: "2025",
    href: "https://github.com/3mircin/HacktoberFest_MLH",
  },
];

const socials = [
  { label: "GitHub", handle: "@3mircin", href: "https://github.com/3mircin" },
  {
    label: "LinkedIn",
    handle: "cristian emir",
    href: "https://www.linkedin.com/in/cristian-emir-lujan-de-la-rosa-281a37365/",
  },
  {
    label: "Instagram",
    handle: "@emirjj.c",
    href: "https://www.instagram.com/emirjj.c/",
  },
];

function SiteHeader() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const tick = () =>
      setTime(
        new Intl.DateTimeFormat("en-GB", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
          timeZone: "America/Mexico_City",
        }).format(new Date()),
      );

    tick();
    const id = window.setInterval(tick, 30_000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-line bg-paper/85 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-6 px-5 md:px-8">
        <a
          href="#top"
          className="flex items-center gap-2.5 font-mono text-[11px] tracking-[0.16em] uppercase"
        >
          <span className="h-2.5 w-2.5 border border-ink bg-signal" />
          <span className="font-medium">ce/lujan</span>
          <span className="hidden text-muted sm:inline">— portfolio</span>
        </a>

        <nav aria-label="Sections" className="hidden items-center gap-5 md:flex">
          {nav.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className="group font-mono text-[10px] tracking-[0.18em] uppercase text-muted transition-colors hover:text-ink"
            >
              <span className="text-line transition-colors group-hover:text-ink">
                {item.n}
              </span>
              <span className="mx-1.5 text-line">/</span>
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-4 font-mono text-[10px] tracking-[0.14em] uppercase">
          <span className="flex items-center gap-2">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-ink opacity-40" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-ink" />
            </span>
            <span>open to work</span>
          </span>
          {time && (
            <span className="hidden text-muted lg:inline">MX {time}</span>
          )}
        </div>
      </div>

      <nav
        aria-label="Sections, compact"
        className="border-t border-line md:hidden"
      >
        <div className="mx-auto flex h-9 max-w-6xl items-center justify-between px-5 font-mono text-[9px] uppercase tracking-[0.1em] text-muted">
          {nav.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className="transition-colors hover:text-ink"
            >
              <span className="mr-1 text-line">{item.n}</span>
              {item.label}
            </a>
          ))}
        </div>
      </nav>
    </header>
  );
}

function SectionHead({
  n,
  title,
  note,
}: {
  n: string;
  title: string;
  note: string;
}) {
  return (
    <div className="mb-2 flex items-center gap-4 border-b border-ink pb-3.5">
      <span className="font-mono text-[10px] tracking-[0.16em] text-muted">
        {n}
      </span>
      <h2 className="font-mono text-[10px] font-medium uppercase tracking-[0.24em] md:text-[11px]">
        / {title}
      </h2>
      <span className="leader" />
      <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-muted md:text-[10px]">
        {note}
      </span>
    </div>
  );
}

export default function Home() {
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2200);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div id="top" className="min-h-screen bg-paper text-ink">
      <Head>
        <title>Cristian Emir Luján de la Rosa — Backend & Systems</title>
        <meta
          name="description"
          content="Backend and systems developer based in Mexico City. Linux native, PostgreSQL, Python and a growing IoT practice."
        />
        <meta name="theme-color" content="#f3f0e8" />
        <meta property="og:title" content="Cristian Emir Luján de la Rosa" />
        <meta
          property="og:description"
          content="Backend & systems developer. Linux, databases and a growing IoT practice."
        />
        <meta property="og:type" content="website" />
      </Head>

      <a href="#main" className="skip-link">
        Skip to content
      </a>

      <SiteHeader />

      <main id="main">
        {/* ── Hero ───────────────────────────────────────────── */}
        <section className="relative overflow-hidden">
          <div className="hero-grid pointer-events-none absolute inset-0" />

          <div className="relative mx-auto grid max-w-6xl grid-cols-1 items-end gap-14 px-5 pt-36 pb-16 md:px-8 md:pt-36 md:pb-24 lg:grid-cols-[1.4fr_0.6fr] lg:gap-10">
            <div>
              <div className="rise flex items-center gap-3 font-mono text-[9px] uppercase tracking-[0.22em] text-muted md:text-[10px]">
                <span className="h-2 w-2 bg-signal ring-1 ring-ink" />
                <span>Portfolio / 2026</span>
                <span className="h-px w-6 bg-line" />
                <span>Mexico City, MX</span>
              </div>

              <h1 className="rise rise-1 mt-6 font-serif text-[clamp(3.25rem,7.4vw,6.5rem)] leading-[0.87] tracking-[-0.025em]">
                Cristian Emir
                <br />
                <span className="italic">Luján de la Rosa</span>
                <span className="caret" aria-hidden="true" />
              </h1>

              <p className="rise rise-2 mt-8 max-w-md text-[13px] leading-[1.75] text-ink/75">
                <span className="mr-2 text-muted">&gt;</span>
                Backend &amp; systems developer. I build services that stay up,
                query databases that keep their promises, and I&apos;m currently
                wiring my way into IoT.
              </p>

              <dl className="rise rise-2 mt-8 max-w-md space-y-2.5 border-t border-line pt-4 font-mono text-[10px] uppercase tracking-[0.12em]">
                {[
                  ["role", "Backend / Systems"],
                  ["focus", "APIs · data · infra"],
                  ["status", "Open to work"],
                ].map(([key, value]) => (
                  <div key={key} className="flex items-baseline gap-3">
                    <dt className="w-14 shrink-0 text-muted">{key}</dt>
                    <span className="leader" />
                    <dd className="text-right">{value}</dd>
                  </div>
                ))}
              </dl>

              <div className="rise rise-3 mt-9 flex flex-wrap items-center gap-4">
                <a
                  href={`mailto:${EMAIL}`}
                  className="group inline-flex items-center gap-3 bg-ink px-5 py-3.5 font-mono text-[10px] uppercase tracking-[0.16em] text-paper transition-colors hover:bg-ink/85"
                >
                  Start a project
                  <span className="transition-transform duration-300 group-hover:translate-x-1">
                    →
                  </span>
                </a>
                <a
                  href="#work"
                  className="group inline-flex items-center gap-2 border-b border-ink/30 pb-1 font-mono text-[10px] uppercase tracking-[0.16em] transition-colors hover:border-ink"
                >
                  Selected work
                  <span className="transition-transform duration-300 group-hover:translate-y-0.5">
                    ↓
                  </span>
                </a>
              </div>
            </div>

            {/* Portrait */}
            <figure className="rise rise-3 relative mx-auto w-full max-w-[300px] lg:mx-0 lg:ml-auto">
              <div className="relative">
                <div
                  aria-hidden="true"
                  className="absolute -right-3 -bottom-3 h-full w-full border border-ink bg-signal"
                />
                <div className="relative border border-ink bg-paper p-2">
                  <Image
                    src="/portrait.jpg"
                    alt="Portrait of Cristian Emir Luján de la Rosa"
                    width={1080}
                    height={1080}
                    priority
                    className="aspect-square w-full object-cover grayscale transition duration-700 hover:grayscale-0"
                  />
                  <span
                    aria-hidden="true"
                    className="absolute top-4 left-4 h-2 w-2 border-t border-l border-paper/80"
                  />
                  <span
                    aria-hidden="true"
                    className="absolute right-4 bottom-4 h-2 w-2 border-r border-b border-paper/80"
                  />
                </div>
              </div>

              <figcaption className="relative mt-4 flex items-center justify-between font-mono text-[9px] uppercase tracking-[0.14em] text-muted">
                <span>fig. 01 — the human</span>
                <span>1:1</span>
              </figcaption>

              <div className="relative mt-3 border border-ink bg-paper px-3.5 py-2.5 shadow-[3px_3px_0_0_var(--ink)]">
                <div className="flex items-center justify-between gap-3 font-mono text-[8px] uppercase tracking-[0.18em] text-muted">
                  <span>&gt; current_focus</span>
                  <span className="h-1.5 w-1.5 bg-signal ring-1 ring-ink" />
                </div>
                <p className="mt-1.5 font-mono text-[10px] tracking-[0.04em]">
                  ESP32 · MQTT · MicroPython
                </p>
              </div>
            </figure>
          </div>
        </section>

        {/* ── Ticker ──────────────────────────────────────────── */}
        <div className="border-y border-ink bg-ink py-3.5 text-paper">
          <div className="marquee-track" aria-hidden="true">
            {[0, 1].map((copy) => (
              <div key={copy} className="flex shrink-0 items-center">
                {[
                  "Backend engineering",
                  "Linux native",
                  "PostgreSQL",
                  "Python",
                  "Systems design",
                  "IoT in progress",
                ].map((item) => (
                  <span
                    key={`${copy}-${item}`}
                    className="flex items-center gap-6 pr-6 font-mono text-[10px] uppercase tracking-[0.24em]"
                  >
                    {item}
                    <span className="text-signal">✦</span>
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* ── Stack ───────────────────────────────────────────── */}
        <section id="stack" className="mx-auto max-w-6xl scroll-mt-28 md:scroll-mt-20 px-5 py-20 md:px-8 md:py-24">
          <SectionHead n="01" title="Stack" note="06 entries" />
          <ul className="border-b border-line">
            {stack.map((item, i) => (
              <li
                key={item.name}
                className="group border-b border-line last:border-b-0"
              >
                <div className="grid grid-cols-[1.5rem_1fr_auto] items-center gap-x-4 py-5 transition-colors group-hover:bg-white/50 md:grid-cols-[2.5rem_1fr_10rem_9rem] md:py-6">
                  <span className="font-mono text-[10px] tracking-[0.12em] text-muted transition-colors group-hover:text-ink">
                    {String(i + 1).padStart(2, "0")}
                  </span>

                  <div className="flex min-w-0 items-baseline gap-3">
                    <span className="font-mono text-lg tracking-[-0.02em] transition-transform duration-300 group-hover:translate-x-1 md:text-2xl">
                      {item.name}
                    </span>
                    <span className="hidden truncate font-mono text-[9px] uppercase tracking-[0.14em] text-muted md:inline">
                      {item.note}
                    </span>
                  </div>

                  <span className="hidden font-mono text-[9px] uppercase tracking-[0.16em] text-muted md:inline md:text-right">
                    {item.kind}
                  </span>

                  <div
                    className="hidden items-center justify-end gap-[3px] md:flex"
                    aria-label={`Proficiency ${item.level} of 5`}
                  >
                    {Array.from({ length: 5 }).map((_, bar) => (
                      <span
                        key={bar}
                        className={`h-3 w-1.5 ${
                          bar < item.level
                            ? "bg-ink transition-colors group-hover:bg-signal"
                            : "border border-line"
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </section>

        {/* ── Work ────────────────────────────────────────────── */}
        <section id="work" className="mx-auto max-w-6xl scroll-mt-28 md:scroll-mt-20 px-5 pb-20 md:px-8 md:pb-24">
          <SectionHead n="02" title="Selected Work" note="02 projects" />
          <div>
            {projects.map((project) => (
              <a
                key={project.title}
                href={project.href}
                target="_blank"
                rel="noreferrer"
                className="group grid grid-cols-[1fr_auto] items-start gap-x-4 gap-y-5 border-b border-line py-7 transition-colors first:border-t-0 hover:bg-signal/70 md:grid-cols-[4.5rem_1fr_7rem_2rem] md:items-center md:gap-x-6 md:py-9"
              >
                <span className="hidden font-mono text-[10px] tracking-[0.14em] text-muted transition-colors group-hover:text-ink md:inline">
                  {project.n}
                </span>

                <div>
                  <h3 className="font-mono text-xl leading-snug tracking-[-0.02em] md:text-[28px]">
                    {project.title}
                  </h3>
                  <p className="mt-2 max-w-xl text-[12px] leading-relaxed text-ink/60 md:text-[13px]">
                    {project.desc}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-x-4 gap-y-1 font-mono text-[9px] uppercase tracking-[0.14em] text-muted">
                    {project.tags.map((tag) => (
                      <span key={tag}>[{tag}]</span>
                    ))}
                  </div>
                </div>

                <span className="hidden font-mono text-[10px] uppercase tracking-[0.14em] text-muted md:inline md:text-right">
                  {project.year}
                </span>

                <span
                  aria-hidden="true"
                  className="mt-1 font-mono text-xl transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 md:mt-0 md:text-right"
                >
                  ↗
                </span>
              </a>
            ))}
          </div>
        </section>

        {/* ── Roadmap ─────────────────────────────────────────── */}
        <section id="roadmap" className="scroll-mt-28 md:scroll-mt-20 border-y border-line bg-white/40">
          <div className="mx-auto max-w-6xl px-5 py-20 md:px-8 md:py-24">
            <SectionHead n="03" title="Next 6 Months" note="IoT roadmap" />

            <div className="mt-8 grid gap-4 md:grid-cols-3">
              {roadmap.map((item, i) => (
                <article
                  key={item.name}
                  className="group flex min-h-[196px] flex-col border border-dashed border-ink/25 bg-paper p-5 transition-colors hover:border-solid hover:border-ink md:p-6"
                >
                  <div className="flex items-center justify-between font-mono text-[9px] uppercase tracking-[0.16em]">
                    <span className="text-muted">phase {i + 1}</span>
                    <span className="border border-ink/30 px-2 py-1 transition-colors group-hover:border-ink group-hover:bg-signal">
                      planned
                    </span>
                  </div>

                  <div className="mt-auto pt-10">
                    <h3 className="font-mono text-xl tracking-[-0.02em]">
                      {item.name}
                    </h3>
                    <p className="mt-2 text-[11px] leading-relaxed text-muted">
                      {item.desc}
                    </p>
                  </div>

                  <div className="mt-6 flex items-center justify-between border-t border-line pt-3 font-mono text-[9px] uppercase tracking-[0.12em] text-muted">
                    <span>[□□□□□□□□]</span>
                    <span>{item.tag}</span>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ── Contact ─────────────────────────────────────────── */}
        <section id="contact" className="scroll-mt-28 md:scroll-mt-20 bg-ink text-paper">
          <div className="mx-auto max-w-6xl px-5 py-20 md:px-8 md:py-28">
            <div className="flex items-center gap-4 border-b border-paper/20 pb-3.5 font-mono text-[10px] uppercase tracking-[0.2em]">
              <span className="text-paper/40">04</span>
              <span>/ contact</span>
              <span className="leader !border-paper/20" />
              <span className="text-paper/40">Say hello</span>
            </div>

            <div className="mt-12 grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
              <h2 className="font-serif text-[clamp(3rem,7vw,5.75rem)] leading-[0.92] tracking-[-0.02em]">
                Let&apos;s build
                <br />
                <span className="italic text-signal">something solid.</span>
              </h2>

              <div className="lg:pb-2">
                <p className="max-w-sm text-[13px] leading-[1.75] text-paper/60">
                  Available for backend work, systems projects and anything
                  involving a terminal, a database or a soldering iron.
                </p>

                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <a
                    href={`mailto:${EMAIL}`}
                    className="group inline-flex items-center justify-between gap-4 bg-signal px-5 py-4 font-mono text-[11px] tracking-[0.04em] text-ink transition-colors hover:bg-paper sm:flex-1"
                  >
                    {EMAIL}
                    <span
                      aria-hidden="true"
                      className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    >
                      ↗
                    </span>
                  </a>
                  <button
                    type="button"
                    onClick={copyEmail}
                    aria-live="polite"
                    className="cursor-pointer border border-paper/30 px-5 py-4 font-mono text-[10px] uppercase tracking-[0.16em] transition-colors hover:border-paper hover:bg-paper/5"
                  >
                    {copied ? "copied ✓" : "[ copy address ]"}
                  </button>
                </div>
              </div>
            </div>

            <div className="mt-16 grid grid-cols-1 gap-px border-t border-paper/20 bg-paper/20 sm:grid-cols-3">
              {socials.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  className="group flex items-center justify-between gap-4 bg-ink px-1 py-5 sm:px-4 sm:first:pl-0"
                >
                  <span className="font-mono text-[10px] uppercase tracking-[0.16em] transition-colors group-hover:text-signal">
                    {social.label}
                  </span>
                  <span className="flex items-center gap-2 font-mono text-[9px] tracking-[0.08em] text-paper/40">
                    {social.handle}
                    <span
                      aria-hidden="true"
                      className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    >
                      ↗
                    </span>
                  </span>
                </a>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-line">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 px-5 py-6 font-mono text-[9px] uppercase tracking-[0.14em] text-muted sm:flex-row sm:items-center sm:justify-between md:px-8">
          <span>© 2026 Cristian Emir Luján de la Rosa</span>
          <span className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <span>Built with Next.js</span>
            <span className="hidden h-3 w-px bg-line sm:block" />
            <span className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 bg-ink" />
              Handcrafted in CDMX
            </span>
          </span>
        </div>
      </footer>
    </div>
  );
}
