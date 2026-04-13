"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";

const EASE = "easeOut" as const;

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 28 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, ease: EASE, delay },
});

export default function Hero() {
  const [ctaHovered, setCtaHovered] = useState(false);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-start pt-16"
      style={{ background: "#F3E7E0" }}
    >

      <div className="max-w-6xl mx-auto px-8 w-full relative pt-20 pb-[80px]">
        <div className="flex flex-col gap-5">
          {/* Large two-line serif title — full black, no period */}
          <motion.h1
            {...fadeUp(0.1)}
            style={{
              fontFamily: "var(--font-cormorant)",
              fontWeight: 400,
              fontSize: "clamp(4rem, 9vw, 6.5rem)",
              lineHeight: 0.95,
              color: "#000000",
              letterSpacing: "-0.02em",
            }}
          >
            Repeat
            <br />
            <em style={{ fontStyle: "italic" }}>Floral</em>
          </motion.h1>

          {/* Since 2021 — pill badge */}
          <motion.div
            {...fadeUp(0.3)}
            style={{ display: "inline-flex" }}
          >
            <div
              className="group"
              style={{
                display: "inline-flex",
                alignItems: "center",
                padding: "0.45rem 1.2rem",
                borderRadius: "999px",
                background: "rgba(191, 215, 234, 0.28)",
                border: "1px solid rgba(191, 215, 234, 0.75)",
                cursor: "default",
              }}
            >
              {/* Soft dot accent */}
              <span
                style={{
                  width: "6px",
                  height: "6px",
                  borderRadius: "50%",
                  background: "#BFD7EA",
                  display: "inline-block",
                  marginRight: "0.6rem",
                  flexShrink: 0,
                }}
              />
              <span
                style={{
                  fontFamily: "var(--font-dm-sans)",
                  fontWeight: 500,
                  fontSize: "0.78rem",
                  letterSpacing: "0.16em",
                  color: "#7aaac5",
                  textTransform: "uppercase",
                }}
              >
                Since 2021
              </span>
              <span
                style={{
                  width: "1px",
                  height: "12px",
                  background: "rgba(191, 215, 234, 0.75)",
                  display: "inline-block",
                  margin: "0 0.75rem",
                  flexShrink: 0,
                }}
              />
              <span
                style={{
                  fontFamily: "var(--font-dm-sans)",
                  fontWeight: 500,
                  fontSize: "0.78rem",
                  letterSpacing: "0.16em",
                  color: "#7aaac5",
                  textTransform: "uppercase",
                }}
              >
                Vancouver, BC
              </span>
            </div>
          </motion.div>

          {/* Mission statement */}
          <motion.p
            {...fadeUp(0.5)}
            style={{
              fontFamily: "var(--font-dm-sans)",
              fontWeight: 300,
              fontSize: "1.05rem",
              lineHeight: 1.75,
              color: "#5a5a5a",
              maxWidth: "380px",
            }}
          >
            Give your flowers a second life.
          </motion.p>

          {/* CTA button */}
          <motion.div {...fadeUp(0.7)} style={{ paddingTop: "0.5rem" }}>
            <Link href="/request" style={{ textDecoration: "none" }}>
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                transition={{ duration: 0.18, ease: "easeOut" }}
                onMouseEnter={() => setCtaHovered(true)}
                onMouseLeave={() => setCtaHovered(false)}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "1.2rem",
                  padding: "1.1rem 2.2rem 1.1rem 2rem",
                  background: "#D2E0BF",
                  borderRadius: "6px",
                  cursor: "pointer",
                  boxShadow: ctaHovered
                    ? "0 0 0 6px rgba(210,224,191,0.5), 0 0 0 14px rgba(210,224,191,0.2), 0 8px 32px rgba(210,224,191,0.45)"
                    : "0 8px 32px rgba(210,224,191,0.4)",
                  transition: "box-shadow 0.3s ease",
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-cormorant)",
                    fontStyle: "italic",
                    fontWeight: 400,
                    fontSize: "1.65rem",
                    color: "#1e2e1e",
                    letterSpacing: "0.01em",
                    lineHeight: 1,
                  }}
                >
                  Request?
                </span>
                <span
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "28px",
                    height: "28px",
                    borderRadius: "50%",
                    border: "1px solid rgba(30,46,30,0.25)",
                    color: "#1e2e1e",
                    fontSize: "0.85rem",
                    flexShrink: 0,
                  }}
                >
                  →
                </span>
              </motion.div>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
