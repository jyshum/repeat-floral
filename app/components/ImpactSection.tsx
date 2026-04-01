"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";

const stats = [
  { value: 500, suffix: "+", label: "Bouquets Delivered" },
  { value: 3, suffix: "+", label: "Years of Service" },
  { value: 200, suffix: "+", label: "Families Helped" },
  { value: 50, suffix: "+", label: "Volunteers" },
];

function CountUp({ target, suffix, active }: { target: number; suffix: string; active: boolean }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!active) return;
    const duration = 1800;
    const start = performance.now();

    const tick = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * target));
      if (progress < 1) requestAnimationFrame(tick);
    };

    requestAnimationFrame(tick);
  }, [active, target]);

  return (
    <span>
      {count}
      {suffix}
    </span>
  );
}

export default function ImpactSection() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      ref={ref}
      id="impact"
      style={{ background: "#D2E0BF", paddingTop: "80px", paddingBottom: "100px" }}
    >
      <div className="max-w-6xl mx-auto px-8">
        {/* Section heading */}
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          style={{
            fontFamily: "var(--font-cormorant)",
            fontWeight: 400,
            fontSize: "clamp(2.2rem, 4vw, 3rem)",
            color: "#2d2d2d",
            textAlign: "center",
            marginBottom: "56px",
            letterSpacing: "-0.01em",
          }}
        >
          Our Impact
        </motion.h2>

        {/* Stat cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 32 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.65,
                ease: "easeOut" as const,
                delay: 0.15 + i * 0.1,
              }}
              style={{
                background: "#FFFFFF",
                borderRadius: "18px",
                padding: "2rem 1.5rem",
                textAlign: "center",
                boxShadow: "0 4px 24px rgba(0,0,0,0.06)",
              }}
            >
              <p
                style={{
                  fontFamily: "var(--font-cormorant)",
                  fontWeight: 500,
                  fontSize: "clamp(2.4rem, 4vw, 3.2rem)",
                  color: "#E988A6",
                  lineHeight: 1,
                  marginBottom: "0.5rem",
                }}
              >
                <CountUp target={stat.value} suffix={stat.suffix} active={isInView} />
              </p>
              <p
                style={{
                  fontFamily: "var(--font-dm-sans)",
                  fontWeight: 400,
                  fontSize: "0.82rem",
                  letterSpacing: "0.05em",
                  color: "#6b6b6b",
                  textTransform: "uppercase",
                }}
              >
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
