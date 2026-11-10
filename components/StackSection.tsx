import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import Reveal from "./Reveal";

const stack = [
  { name: "PostgreSQL", kind: "database", note: "queries that scale", level: 5 },
  { name: "MongoDB", kind: "database", note: "documents & indexes", level: 4 },
  { name: "Python", kind: "language", note: "scripts & services", level: 5 },
  { name: "C", kind: "language", note: "close to the metal", level: 4 },
  { name: "Linux", kind: "system", note: "daily driver", level: 5 },
  { name: "Git", kind: "tooling", note: "history nerd", level: 4 },
];

export default function StackSection() {
  const [active, setActive] = useState(0);
  const rows = useRef<Array<HTMLDivElement | null>>([]);
  const reduce = useReducedMotion();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const index = Number(
              (entry.target as HTMLElement).dataset.index ?? 0,
            );
            setActive(index);
          }
        }
      },
      { rootMargin: "-46% 0px -46% 0px", threshold: 0 },
    );

    const nodes = rows.current.filter(Boolean) as HTMLDivElement[];
    nodes.forEach((node) => observer.observe(node));

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="stack"
      className="relative scroll-mt-28 md:scroll-mt-20"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <span className="ghost-num absolute -top-8 right-0 md:top-6">01</span>
      </div>

      <div className="relative mx-auto max-w-6xl px-5 py-20 md:px-8 md:py-28">
        <Reveal>
          <div className="mb-2 flex items-center gap-4 border-b border-ink pb-3.5">
            <span className="font-mono text-[10px] tracking-[0.16em] text-muted">
              01
            </span>
            <h2 className="font-mono text-[10px] font-medium uppercase tracking-[0.24em] md:text-[11px]">
              / Stack
            </h2>
            <span className="leader" />
            <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-muted md:text-[10px]">
              06 entries
            </span>
          </div>
        </Reveal>

        <div className="mt-12 grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          {/* Sticky index */}
          <div className="hidden lg:block">
            <div className="lg:sticky lg:top-28">
              <p className="font-mono text-[9px] uppercase tracking-[0.22em] text-muted">
                selected_skillset
              </p>

              <div className="mt-6 flex min-h-[5.5rem] items-start overflow-hidden">
                <AnimatePresence mode="wait" initial={false}>
                  <motion.p
                    key={stack[active].name}
                    initial={reduce ? false : { y: 40, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={reduce ? undefined : { y: -40, opacity: 0 }}
                    transition={{ duration: 0.35, ease: [0.22, 0.68, 0.18, 1] }}
                    className="font-serif text-[clamp(3rem,4.4vw,4.75rem)] leading-[0.9] italic tracking-[-0.02em]"
                  >
                    {stack[active].name}
                  </motion.p>
                </AnimatePresence>
              </div>

              <p className="mt-5 font-mono text-[10px] uppercase tracking-[0.16em]">
                {stack[active].kind}
                <span className="mx-2 text-line">/</span>
                <span className="text-muted">{stack[active].note}</span>
              </p>

              <div className="mt-10 flex items-center gap-2">
                {stack.map((item, i) => (
                  <span
                    key={item.name}
                    className={`h-1.5 transition-all duration-500 ${
                      i === active ? "w-10 bg-ink" : "w-3 bg-line"
                    }`}
                  />
                ))}
                <span className="ml-2 font-mono text-[9px] tracking-[0.12em] text-muted">
                  {String(active + 1).padStart(2, "0")} / 06
                </span>
              </div>

              <p className="mt-10 max-w-[19rem] text-[11px] leading-[1.8] text-muted">
                The tools I reach for when something has to keep running after
                the demo ends.
              </p>
            </div>
          </div>

          {/* Rows */}
          <div>
            {stack.map((item, i) => {
              const current = i === active;

              return (
                <div
                  key={item.name}
                  ref={(node) => {
                    rows.current[i] = node;
                  }}
                  data-index={i}
                  className={`group relative border-b border-line transition-colors duration-500 first:border-t ${
                    current ? "bg-ink text-paper" : "hover:bg-white/50"
                  }`}
                >
                  <motion.span
                    aria-hidden="true"
                    className="absolute top-0 left-0 h-full w-[3px] origin-top bg-signal"
                    animate={{ scaleY: current ? 1 : 0 }}
                    transition={{ duration: 0.35, ease: "easeOut" }}
                  />

                  <div className="grid grid-cols-[2rem_1fr_auto] items-center gap-4 px-2 py-6 md:grid-cols-[2.5rem_1fr_7rem] md:px-4 md:py-7">
                    <span
                      className={`font-mono text-[10px] tracking-[0.12em] transition-colors ${
                        current ? "text-signal" : "text-muted"
                      }`}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>

                    <div className="min-w-0">
                      <div className="flex items-baseline gap-3">
                        <span
                          className={`font-mono text-xl tracking-[-0.02em] transition-transform duration-500 md:text-2xl ${
                            current ? "translate-x-1.5 md:translate-x-2" : ""
                          }`}
                        >
                          {item.name}
                        </span>
                        <span
                          className={`hidden font-mono text-[9px] uppercase tracking-[0.14em] transition-colors sm:inline ${
                            current ? "text-paper/50" : "text-muted"
                          }`}
                        >
                          {item.note}
                        </span>
                      </div>
                      <span
                        className={`mt-1 block font-mono text-[9px] uppercase tracking-[0.14em] sm:hidden ${
                          current ? "text-paper/50" : "text-muted"
                        }`}
                      >
                        {item.kind} · {item.note}
                      </span>
                    </div>

                    <div
                      role="img"
                      aria-label={`Proficiency ${item.level} of 5`}
                      className="flex items-center justify-end gap-[3px]"
                    >
                      {Array.from({ length: 5 }).map((_, bar) => (
                        <span
                          key={bar}
                          className={`h-3 w-1.5 transition-colors duration-500 ${
                            bar < item.level
                              ? current
                                ? "bg-signal"
                                : "bg-ink"
                              : current
                                ? "border border-paper/25"
                                : "border border-line"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
