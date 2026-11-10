import Head from "next/head";
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
} from "framer-motion";
import { useEffect, useState } from "react";
import ContextCursor from "@/components/ContextCursor";
import HeroPortrait from "@/components/HeroPortrait";
import Reveal from "@/components/Reveal";
import StackSection from "@/components/StackSection";

const EMAIL = "emirlujan3@gmail.com";

const nav = [
  { id: "stack", n: "01", label: "stack" },
  { id: "work", n: "02", label: "work" },
  { id: "roadmap", n: "03", label: "roadmap" },
  { id: "contact", n: "04", label: "contact" },
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

const tickerItems = [
  "Backend engineering",
  "Linux native",
  "PostgreSQL",
  "Python",
  "Systems design",
  "IoT in progress",
];

function SiteHeader() {
  const [time, setTime] = useState("");
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, {
    stiffness: 160,
    damping: 30,
    restDelta: 0.001,
  });

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
          data-cursor="top"
          className="flex items-center gap-2.5 whitespace-nowrap font-mono text-[11px] tracking-[0.16em] uppercase"
        >
          <span className="h-2.5 w-2.5 border border-ink bg-signal" />
          <span className="font-medium">ce/lujan</span>
          <span className="hidden text-muted lg:inline">— portfolio</span>
        </a>

        <nav aria-label="Sections" className="hidden items-center gap-5 md:flex">
          {nav.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              data-cursor="go"
              className="group whitespace-nowrap font-mono text-[10px] tracking-[0.18em] uppercase text-muted transition-colors hover:text-ink"
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
          <span className="flex items-center gap-2 whitespace-nowrap">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-ink opacity-40" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-ink" />
            </span>
            <span>open to work</span>
          </span>
          {time && (
            <span className="hidden text-muted lg:inline">OAX {time}</span>
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
              data-cursor="go"
              className="transition-colors hover:text-ink"
            >
              <span className="mr-1 text-line">{item.n}</span>
              {item.label}
            </a>
          ))}
        </div>
      </nav>

      <motion.span
        aria-hidden="true"
        style={{ scaleX: progress }}
        className="absolute bottom-0 left-0 block h-[2px] w-full origin-left bg-ink"
      />
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
    <div className="flex items-center gap-4 border-b border-ink pb-3.5">
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

function GhostNumeral({
  n,
  dark = false,
  className = "",
}: {
  n: string;
  dark?: boolean;
  className?: string;
}) {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      <span
        className={`ghost-num absolute right-0 ${
          dark ? "ghost-num-light" : ""
        } ${className}`}
      >
        {n}
      </span>
    </div>
  );
}

export default function Home() {
  const [copied, setCopied] = useState(false);
  const reduce = useReducedMotion();

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
    } catch {
      const field = document.createElement("textarea");
      field.value = EMAIL;
      field.setAttribute("readonly", "");
      field.style.position = "fixed";
      field.style.opacity = "0";
      document.body.appendChild(field);
      field.select();
      document.execCommand("copy");
      field.remove();
    }

    setCopied(true);
    window.setTimeout(() => setCopied(false), 2200);
  };

  return (
    <div id="top" className="min-h-screen bg-paper text-ink">
      <Head>
        <title>Cristian Emir Lujan de la Rosa — Backend & Systems</title>
        <meta
          name="description"
          content="Backend and systems developer based in Oaxaca, Mexico. Linux native, PostgreSQL, Python and a growing IoT practice."
        />
        <meta name="theme-color" content="#f3f0e8" />
        <meta property="og:title" content="Cristian Emir Lujan de la Rosa" />
        <meta
          property="og:description"
          content="Backend & systems developer based in Oaxaca. Linux, databases and a growing IoT practice."
        />
        <meta property="og:type" content="website" />
      </Head>

      <a href="#main" className="skip-link">
        Skip to content
      </a>

      <ContextCursor />
      <SiteHeader />

      <main id="main">
        {/* ── Hero ───────────────────────────────────────────── */}
        <section className="relative">
          <div className="hero-grid pointer-events-none absolute inset-0" />

          <div className="relative mx-auto max-w-6xl px-5 pt-28 pb-16 md:px-8 md:pt-36 md:pb-20">
            <motion.div
              initial={reduce ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.22, 0.68, 0.18, 1] }}
              className="flex flex-wrap items-center justify-between gap-3 font-mono text-[9px] uppercase tracking-[0.22em] text-muted md:text-[10px]"
            >
              <span className="flex items-center gap-3">
                <span className="h-2 w-2 bg-signal ring-1 ring-ink" />
                <span>Portfolio / 2026</span>
                <span className="h-px w-6 bg-line" />
                <span>Oaxaca, MX</span>
              </span>
              <span className="hidden items-center gap-3 sm:flex">
                <span className="h-px w-6 bg-line" />
                <span>Backend &amp; systems</span>
              </span>
            </motion.div>

            <h1 className="mt-6 font-serif text-[clamp(3rem,13vw,8.5rem)] leading-[0.84] tracking-[-0.03em]">
              <span className="block overflow-hidden pb-[0.1em]">
                <motion.span
                  className="block"
                  initial={reduce ? false : { y: "112%" }}
                  animate={{ y: 0 }}
                  transition={{
                    duration: 0.95,
                    ease: [0.22, 0.68, 0.18, 1],
                    delay: 0.05,
                  }}
                >
                  Cristian Emir
                </motion.span>
              </span>
              <span className="block overflow-hidden pb-[0.12em]">
                <motion.span
                  className="block italic"
                  initial={reduce ? false : { y: "112%" }}
                  animate={{ y: 0 }}
                  transition={{
                    duration: 0.95,
                    ease: [0.22, 0.68, 0.18, 1],
                    delay: 0.16,
                  }}
                >
                  Lujan de la Rosa
                  <span className="caret" aria-hidden="true" />
                </motion.span>
              </span>
            </h1>

            <div className="mt-12 grid gap-12 border-t border-ink pt-8 lg:grid-cols-[1.25fr_0.75fr] lg:items-start lg:gap-16">
              <div>
                <p className="max-w-md text-[13px] leading-[1.8] text-ink/75">
                  <span className="mr-2 text-muted">&gt;</span>
                  Backend &amp; systems developer. I build services that stay
                  up, query databases that keep their promises, and I&apos;m
                  currently wiring my way into IoT.
                </p>

                <dl className="mt-8 max-w-md space-y-2.5 border-t border-line pt-4 font-mono text-[10px] uppercase tracking-[0.12em]">
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

                <div className="mt-9 flex flex-wrap items-center gap-4">
                  <a
                    href={`mailto:${EMAIL}`}
                    data-cursor="mail"
                    className="group inline-flex items-center gap-3 bg-ink px-5 py-3.5 font-mono text-[10px] uppercase tracking-[0.16em] text-paper transition-colors hover:bg-ink/85"
                  >
                    Start a project
                    <span className="transition-transform duration-300 group-hover:translate-x-1">
                      →
                    </span>
                  </a>
                  <a
                    href="#work"
                    data-cursor="scroll"
                    className="group inline-flex items-center gap-2 border-b border-ink/30 pb-1 font-mono text-[10px] uppercase tracking-[0.16em] transition-colors hover:border-ink"
                  >
                    Selected work
                    <span className="transition-transform duration-300 group-hover:translate-y-0.5">
                      ↓
                    </span>
                  </a>
                </div>
              </div>

              <HeroPortrait />
            </div>
          </div>
        </section>

        {/* ── Ticker ──────────────────────────────────────────── */}
        <div className="overflow-hidden border-y border-ink bg-ink py-3.5 text-paper">
          <div className="marquee-track" aria-hidden="true">
            {[0, 1].map((copy) => (
              <div key={copy} className="flex shrink-0 items-center">
                {tickerItems.map((item) => (
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

        {/* ── Manifesto ───────────────────────────────────────── */}
        <section aria-labelledby="manifesto" className="border-b border-line">
          <div className="mx-auto max-w-6xl px-5 py-24 md:px-8 md:py-32">
            <Reveal>
              <div className="flex items-center justify-between font-mono text-[9px] uppercase tracking-[0.22em] text-muted">
                <span>{"// operating principle"}</span>
                <span className="hidden sm:block">no shortcuts</span>
              </div>
            </Reveal>

            <Reveal delay={0.04}>
              <h2
                id="manifesto"
                className="mt-8 font-serif text-[clamp(2.75rem,8vw,7rem)] leading-[0.92] tracking-[-0.03em]"
              >
                Less noise.
                <br />
                <span className="italic">
                  More{" "}
                  <span className="relative inline-block">
                    <span
                      aria-hidden="true"
                      className="absolute inset-x-0 bottom-[0.08em] h-[0.16em] bg-signal"
                    />
                    <span className="relative">uptime</span>
                  </span>
                  .
                </span>
              </h2>
            </Reveal>

            <Reveal delay={0.08}>
              <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                <p className="max-w-xs text-[11px] leading-[1.8] text-muted">
                  I care about the boring parts: clean data, readable code,
                  predictable deployments. That is what lets the interesting
                  parts happen.
                </p>
                <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-muted">
                  build / ship / maintain
                </span>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ── Stack ───────────────────────────────────────────── */}
        <StackSection />

        {/* ── Work ────────────────────────────────────────────── */}
        <section
          id="work"
          className="relative scroll-mt-28 md:scroll-mt-20"
        >
          <GhostNumeral n="02" className="-top-6 md:-top-10" />

          <div className="relative mx-auto max-w-6xl px-5 py-20 md:px-8 md:py-28">
            <Reveal>
              <SectionHead n="02" title="Selected Work" note="02 projects" />
            </Reveal>

            <div className="mt-4">
              {projects.map((project, i) => (
                <Reveal key={project.title} delay={i * 0.06}>
                  <a
                    href={project.href}
                    target="_blank"
                    rel="noreferrer"
                    data-cursor="view"
                    className="group block border-b border-line"
                  >
                    <div className="grid grid-cols-[1fr_auto] items-start gap-x-4 gap-y-5 px-2 py-8 transition-colors duration-300 group-hover:bg-signal md:grid-cols-[5rem_1fr_7rem_2.5rem] md:items-center md:gap-x-6 md:px-4 md:py-10">
                      <span className="hidden font-mono text-[10px] leading-[1.7] tracking-[0.12em] text-muted transition-colors group-hover:text-ink md:block">
                        {project.n}
                        <br />
                        {project.year}
                      </span>

                      <div>
                        <h3 className="font-serif text-[clamp(2rem,4.4vw,3.5rem)] leading-[0.95] tracking-[-0.02em] transition-transform duration-500 group-hover:translate-x-2">
                          {project.title}
                        </h3>
                        <p className="mt-4 max-w-xl text-[12px] leading-relaxed text-ink/60 md:text-[13px]">
                          {project.desc}
                        </p>
                        <div className="mt-4 flex flex-wrap gap-x-4 gap-y-1 font-mono text-[9px] uppercase tracking-[0.14em] text-muted transition-colors group-hover:text-ink/60">
                          {project.tags.map((tag) => (
                            <span key={tag}>[{tag}]</span>
                          ))}
                        </div>
                      </div>

                      <span className="hidden font-mono text-[10px] uppercase tracking-[0.14em] text-muted group-hover:text-ink md:inline md:text-right">
                        {project.year}
                      </span>

                      <span
                        aria-hidden="true"
                        className="mt-1 font-mono text-2xl transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 md:mt-0 md:text-3xl md:text-right"
                      >
                        ↗
                      </span>
                    </div>
                  </a>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ── Roadmap ─────────────────────────────────────────── */}
        <section
          id="roadmap"
          className="relative scroll-mt-28 border-y border-line bg-white/40 md:scroll-mt-20"
        >
          <GhostNumeral n="03" className="top-2 md:top-6" />

          <div className="relative mx-auto max-w-6xl px-5 py-20 md:px-8 md:py-28">
            <Reveal>
              <SectionHead n="03" title="Next 6 Months" note="IoT roadmap" />
            </Reveal>

            <div className="mt-8 grid gap-4 md:grid-cols-3">
              {roadmap.map((item, i) => (
                <Reveal key={item.name} delay={i * 0.08}>
                  <article className="group flex min-h-[250px] flex-col border border-dashed border-ink/25 bg-paper p-5 transition-all duration-300 hover:-translate-y-1 hover:border-solid hover:border-ink md:p-6">
                    <div className="flex items-center justify-between font-mono text-[9px] uppercase tracking-[0.16em]">
                      <span className="text-muted">phase {i + 1}</span>
                      <span className="border border-ink/30 px-2 py-1 transition-colors group-hover:border-ink group-hover:bg-signal">
                        planned
                      </span>
                    </div>

                    <div className="mt-auto pt-14">
                      <h3 className="font-serif text-[clamp(2.25rem,4vw,3.25rem)] leading-[0.9] tracking-[-0.02em]">
                        {item.name}
                      </h3>
                      <p className="mt-4 max-w-[26ch] text-[11px] leading-[1.8] text-muted">
                        {item.desc}
                      </p>
                    </div>

                    <div className="mt-6 flex items-center justify-between border-t border-line pt-3 font-mono text-[9px] uppercase tracking-[0.12em] text-muted">
                      <span>[□□□□□□□□]</span>
                      <span>{item.tag}</span>
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ── Contact ─────────────────────────────────────────── */}
        <section
          id="contact"
          className="relative scroll-mt-28 bg-ink text-paper md:scroll-mt-20"
        >
          <GhostNumeral n="04" dark className="-top-4 md:top-2" />

          <div className="relative mx-auto max-w-6xl px-5 py-20 md:px-8 md:py-28">
            <Reveal>
              <div className="flex items-center gap-4 border-b border-paper/20 pb-3.5 font-mono text-[10px] uppercase tracking-[0.2em]">
                <span className="text-paper/40">04</span>
                <span>/ contact</span>
                <span className="leader !border-paper/20" />
                <span className="text-paper/40">Say hello</span>
              </div>
            </Reveal>

            <div className="mt-12 grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
              <Reveal>
                <h2 className="font-serif text-[clamp(3rem,7vw,5.75rem)] leading-[0.92] tracking-[-0.02em]">
                  Let&apos;s build
                  <br />
                  <span className="italic text-signal">something solid.</span>
                </h2>
              </Reveal>

              <Reveal delay={0.08}>
                <p className="max-w-sm text-[13px] leading-[1.75] text-paper/60">
                  Available for backend work, systems projects and anything
                  involving a terminal, a database or a soldering iron.
                </p>

                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <a
                    href={`mailto:${EMAIL}`}
                    data-cursor="mail"
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
                    data-cursor="copy"
                    aria-live="polite"
                    className="cursor-pointer border border-paper/30 px-5 py-4 font-mono text-[10px] uppercase tracking-[0.16em] transition-colors hover:border-paper hover:bg-paper/5"
                  >
                    {copied ? "copied ✓" : "[ copy address ]"}
                  </button>
                </div>
              </Reveal>
            </div>

            <div className="mt-16 grid grid-cols-1 gap-px border-t border-paper/20 bg-paper/20 sm:grid-cols-3">
              {socials.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  data-cursor="open"
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

          <a
            href={`mailto:${EMAIL}`}
            data-cursor="mail"
            aria-label="Email Cristian Emir Lujan de la Rosa"
            className="relative block overflow-hidden border-t border-ink bg-signal py-3 text-ink"
          >
            <div className="marquee-track marquee-fast" aria-hidden="true">
              {[0, 1].map((copy) => (
                <div key={copy} className="flex shrink-0 items-center">
                  {Array.from({ length: 4 }).map((_, i) => (
                    <span
                      key={i}
                      className="flex items-center gap-6 pr-6 font-serif text-[clamp(2rem,4.5vw,3.5rem)] leading-none italic"
                    >
                      Let&apos;s talk
                      <span className="text-[0.7em] not-italic">→</span>
                    </span>
                  ))}
                </div>
              ))}
            </div>
          </a>
        </section>
      </main>

      <footer className="border-t border-line">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 px-5 py-6 font-mono text-[9px] uppercase tracking-[0.14em] text-muted sm:flex-row sm:items-center sm:justify-between md:px-8">
          <span>© 2026 Cristian Emir Lujan de la Rosa</span>
          <span className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <span>Built with Next.js</span>
            <span className="hidden h-3 w-px bg-line sm:block" />
            <span className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 bg-ink" />
              Handcrafted in Oaxaca
            </span>
          </span>
        </div>
      </footer>
    </div>
  );
}
