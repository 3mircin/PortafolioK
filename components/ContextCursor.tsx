import {
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "framer-motion";
import { useEffect, useState, useSyncExternalStore } from "react";

const FAST = { stiffness: 1300, damping: 80, mass: 0.22 };
const LAG = { stiffness: 420, damping: 34, mass: 0.45 };

function subscribeToPointer(callback: () => void) {
  const query = window.matchMedia("(pointer: fine)");
  query.addEventListener("change", callback);
  return () => query.removeEventListener("change", callback);
}

function useFinePointer() {
  return useSyncExternalStore(
    subscribeToPointer,
    () => window.matchMedia("(pointer: fine)").matches,
    () => false,
  );
}

export default function ContextCursor() {
  const reduce = useReducedMotion();
  const finePointer = useFinePointer();
  const [visible, setVisible] = useState(false);
  const [label, setLabel] = useState("");
  const [hovering, setHovering] = useState(false);
  const [pressed, setPressed] = useState(false);
  const enabled = finePointer && !reduce;

  const x = useMotionValue(-200);
  const y = useMotionValue(-200);
  const dotX = useSpring(x, FAST);
  const dotY = useSpring(y, FAST);
  const ringX = useSpring(x, LAG);
  const ringY = useSpring(y, LAG);

  useEffect(() => {
    if (!enabled) return;

    document.documentElement.classList.add("custom-cursor");

    const onMove = (event: PointerEvent) => {
      x.set(event.clientX);
      y.set(event.clientY);
      setVisible(true);

      const target = event.target as Element | null;
      const cursorTarget = target?.closest<HTMLElement>("[data-cursor]");
      const interactive = target?.closest(
        "a, button, [role='button'], summary",
      );

      setLabel(cursorTarget?.dataset.cursor ?? "");
      setHovering(Boolean(interactive || cursorTarget));
    };

    const onLeave = () => setVisible(false);
    const onEnter = () => setVisible(true);
    const onDown = () => setPressed(true);
    const onUp = () => setPressed(false);

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerdown", onDown);
    window.addEventListener("pointerup", onUp);
    document.addEventListener("pointerleave", onLeave);
    document.addEventListener("pointerenter", onEnter);

    return () => {
      document.documentElement.classList.remove("custom-cursor");
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      document.removeEventListener("pointerleave", onLeave);
      document.removeEventListener("pointerenter", onEnter);
    };
  }, [enabled, x, y]);

  if (!enabled) return null;

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[200]"
    >
      <motion.div
        className="absolute top-0 left-0"
        style={{ x: dotX, y: dotY, opacity: visible ? 1 : 0 }}
      >
        <span className="block h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-signal ring-1 ring-ink" />
      </motion.div>

      <motion.div
        className="absolute top-0 left-0"
        style={{ x: ringX, y: ringY }}
      >
        <motion.span
          className="block h-9 w-9 -translate-x-1/2 -translate-y-1/2 rounded-full border border-ink/30"
          animate={{
            opacity: visible ? 1 : 0,
            scale: pressed ? 0.72 : hovering ? 1.45 : 1,
          }}
          transition={{ duration: 0.25, ease: "easeOut" }}
        />

        <AnimatePresence>
          {visible && label ? (
            <motion.span
              key={label}
              initial={{ opacity: 0, y: 4, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -4, scale: 0.9 }}
              transition={{ duration: 0.18, ease: "easeOut" }}
              className="absolute top-5 left-5 border border-ink bg-signal px-1.5 py-0.5 font-mono text-[8px] leading-none tracking-[0.16em] text-ink uppercase"
            >
              {label}
            </motion.span>
          ) : null}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
