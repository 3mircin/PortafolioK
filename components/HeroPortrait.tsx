import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "framer-motion";
import Image from "next/image";
import { useRef, type PointerEvent as ReactPointerEvent } from "react";

const MASK_RADIUS = 130;

export default function HeroPortrait() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  const maskX = useMotionValue(165);
  const maskY = useMotionValue(165);
  const maskRadius = useSpring(0, { stiffness: 170, damping: 24 });
  const maskImage = useMotionTemplate`radial-gradient(circle ${maskRadius}px at ${maskX}px ${maskY}px, #000 56%, transparent 100%)`;

  const offsetX = useMotionValue(0);
  const offsetY = useMotionValue(0);
  const x = useSpring(offsetX, { stiffness: 130, damping: 20, mass: 0.6 });
  const y = useSpring(offsetY, { stiffness: 130, damping: 20, mass: 0.6 });

  const handleMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (reduce || event.pointerType !== "mouse" || !ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const nx = (event.clientX - rect.left) / rect.width;
    const ny = (event.clientY - rect.top) / rect.height;

    maskX.set(event.clientX - rect.left);
    maskY.set(event.clientY - rect.top);
    offsetX.set((nx - 0.5) * 12);
    offsetY.set((ny - 0.5) * 12);
  };

  const handleEnter = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (reduce || event.pointerType !== "mouse") return;
    maskRadius.set(MASK_RADIUS);
  };

  const handleLeave = () => {
    maskRadius.set(0);
    offsetX.set(0);
    offsetY.set(0);
  };

  return (
    <figure className="relative mx-auto w-full max-w-[330px] lg:mx-0 lg:ml-auto">
      <div
        ref={ref}
        className="relative"
        onPointerMove={handleMove}
        onPointerEnter={handleEnter}
        onPointerLeave={handleLeave}
      >
        <div
          aria-hidden="true"
          className="absolute -right-3 -bottom-3 h-full w-full border border-ink bg-signal"
        />

        <div className="relative border border-ink bg-paper p-2">
          <div className="relative aspect-square w-full overflow-hidden">
            <motion.div
              className="absolute inset-0"
              style={{ x, y, scale: 1.05, willChange: "transform" }}
            >
              <Image
                src="/portrait.jpg"
                alt="Portrait of Cristian Emir Lujan de la Rosa"
                fill
                priority
                sizes="(min-width: 1024px) 330px, 80vw"
                className="object-cover grayscale"
              />
              <motion.div
                aria-hidden="true"
                className="absolute inset-0"
                style={{
                  maskImage,
                  WebkitMaskImage: maskImage,
                }}
              >
                <Image
                  src="/portrait.jpg"
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 330px, 80vw"
                  className="object-cover saturate-[1.05]"
                />
              </motion.div>
            </motion.div>
          </div>

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
        <span className="hidden text-ink [@media(hover:hover)]:inline">
          [ hover ]
        </span>
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
  );
}
