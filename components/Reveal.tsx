import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

const EASE = [0.22, 0.68, 0.18, 1] as const;

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  amount?: number;
  /** Animate from a clipped line instead of a plain offset. */
  clip?: boolean;
};

export default function Reveal({
  children,
  className,
  delay = 0,
  y = 28,
  amount = 0.25,
  clip = false,
}: RevealProps) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={
        reduce
          ? false
          : {
              opacity: 0,
              y: clip ? 0 : y,
              clipPath: clip
                ? "inset(0 0 110% 0)"
                : "inset(0 0 0% 0)",
            }
      }
      whileInView={{
        opacity: 1,
        y: 0,
        clipPath: "inset(0 0 0% 0)",
      }}
      viewport={{ once: true, amount }}
      transition={{ duration: 0.85, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}
