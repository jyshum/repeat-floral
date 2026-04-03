"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useState, useRef } from "react";

const EASE = "easeOut" as const;
const BACKDROP_DURATION = 0.18; // seconds

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 28 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, ease: EASE, delay },
});

export default function Hero() {
  // `hovered` drives the backdrop opacity
  const [hovered, setHovered] = useState<"top" | "bottom" | null>(null);
  // `elevated` drives the card z-index — resets only after backdrop has faded
  const [elevated, setElevated] = useState<"top" | "bottom" | null>(null);
  const exitTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  const handleHoverStart = (card: "top" | "bottom") => {
    clearTimeout(exitTimer.current);
    setHovered(card);
    setElevated(card);
  };

  const handleHoverEnd = () => {
    setHovered(null); // backdrop starts fading immediately
    // keep card above backdrop until fade completes + small buffer
    exitTimer.current = setTimeout(
      () => setElevated(null),
      BACKDROP_DURATION * 1000 + 40
    );
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-start pt-16"
      style={{ background: "#F3E7E0" }}
    >
      {/* Subtle radial background glows */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: [
            "radial-gradient(ellipse 70% 60% at 70% 40%, rgba(210,224,191,0.35) 0%, transparent 70%)",
            "radial-gradient(ellipse 55% 45% at 12% 88%, rgba(248,169,200,0.13) 0%, transparent 68%)",
          ].join(", "),
        }}
      />

      <div className="max-w-6xl mx-auto px-8 w-full grid grid-cols-1 md:grid-cols-2 gap-12 relative pt-20 pb-[80px]">
        {/* ── LEFT COLUMN ── */}
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
                transition: "background 0.4s, border-color 0.4s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(191, 215, 234, 0.45)";
                e.currentTarget.style.borderColor = "rgba(191, 215, 234, 1)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "rgba(191, 215, 234, 0.28)";
                e.currentTarget.style.borderColor = "rgba(191, 215, 234, 0.75)";
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
            We up-cycle wedding flowers to promote sustainability and spread the
            joy of nature to families in our community — one bouquet at a time.
          </motion.p>
        </div>

        {/* ── RIGHT COLUMN — asymmetric cards ── */}
        <div className="relative flex flex-col gap-6 min-h-[460px]">
          {/* TOP card — offset right, pink border */}
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.06, transition: { duration: 0.18, ease: "easeOut" } }}
            transition={{ duration: 0.9, ease: EASE, delay: 0.4, scale: { duration: 0.18, ease: "easeOut", delay: 0 } }}
            onHoverStart={() => handleHoverStart("top")}
            onHoverEnd={handleHoverEnd}
            className="self-end"
            style={{
              width: "80%",
              position: "relative",
              zIndex: elevated === "top" ? 50 : "auto",
              cursor: "default",
            }}
          >
            {/* Rounded pink border frame — filled with color, photo sits on top */}
            <div
              style={{
                borderRadius: "8px",
                padding: "8px",
                background: "#A9B8E8",
                boxShadow: hovered === "top"
                  ? "0 0 0 3px rgba(169,184,232,0.3), 0 20px 52px rgba(169,184,232,0.3)"
                  : "0 4px 20px rgba(169,184,232,0.22)",
                transition: "box-shadow 0.18s ease",
              }}
            >
              <div
                style={{
                  width: "100%",
                  aspectRatio: "4/3",
                  borderRadius: "8px",
                  overflow: "hidden",
                  position: "relative",
                }}
              >
                <Image
                  src="/pickup1.jpeg"
                  alt="Volunteer picking up wedding flowers"
                  fill
                  className="object-cover"
                  sizes="40vw"
                />
              </div>
            </div>
            <span
              style={{
                position: "absolute",
                bottom: "18px",
                left: "18px",
                background: "#A9B8E8",
                color: "#fff",
                fontFamily: "var(--font-dm-sans)",
                fontWeight: 500,
                fontSize: "0.72rem",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                padding: "0.35rem 1rem",
                borderRadius: "999px",
                boxShadow: "0 2px 12px rgba(169,184,232,0.4)",
              }}
            >
              Want to Deliver?
            </span>
          </motion.div>

          {/* BOTTOM card — offset left, green border */}
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.06, transition: { duration: 0.18, ease: "easeOut" } }}
            transition={{ duration: 0.9, ease: EASE, delay: 0.6, scale: { duration: 0.18, ease: "easeOut", delay: 0 } }}
            onHoverStart={() => handleHoverStart("bottom")}
            onHoverEnd={handleHoverEnd}
            className="self-start"
            style={{
              width: "80%",
              position: "relative",
              zIndex: elevated === "bottom" ? 50 : "auto",
              cursor: "default",
            }}
          >
            {/* Rounded green border frame — filled with color, photo sits on top */}
            <div
              style={{
                borderRadius: "8px",
                padding: "8px",
                background: "#B4CEB3",
                boxShadow: hovered === "bottom"
                  ? "0 0 0 3px rgba(180,206,179,0.35), 0 20px 52px rgba(180,206,179,0.35)"
                  : "0 4px 20px rgba(180,206,179,0.25)",
                transition: "box-shadow 0.18s ease",
              }}
            >
              <div
                style={{
                  width: "100%",
                  aspectRatio: "4/3",
                  borderRadius: "8px",
                  overflow: "hidden",
                  position: "relative",
                }}
              >
                <Image
                  src="/pplFlower2.jpeg"
                  alt="Person receiving flower delivery"
                  fill
                  className="object-cover"
                  sizes="40vw"
                />
              </div>
            </div>
            <span
              style={{
                position: "absolute",
                bottom: "18px",
                right: "18px",
                background: "#B4CEB3",
                color: "#fff",
                fontFamily: "var(--font-dm-sans)",
                fontWeight: 500,
                fontSize: "0.72rem",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                padding: "0.35rem 1rem",
                borderRadius: "999px",
                boxShadow: "0 2px 12px rgba(180,206,179,0.45)",
              }}
            >
              Need Flowers?
            </span>
          </motion.div>
        </div>
      </div>

      {/* ── BLUR BACKDROP — always in DOM, opacity driven by hovered state ── */}
      <motion.div
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: BACKDROP_DURATION }}
        style={{
          position: "fixed",
          inset: 0,
          backdropFilter: "blur(8px)",
          WebkitBackdropFilter: "blur(8px)",
          background: "rgba(243,231,224,0.45)",
          zIndex: 40,
          pointerEvents: "none",
        }}
      />

      {/* ── FLOWER IMAGE — flush against left wall, sized to be visible on first load ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, delay: 0.6 }}
        className="absolute pointer-events-none"
        data-no-flowers="true"
        style={{
          bottom: -85,
          left: -90,
          width: "50vw",
          maxWidth: "620px",
          height: "52vh",
          minHeight: "340px",
        }}
      >
        {/* Only the right edge fades out; left is hard against the wall, top softly appears */}
        <div
          style={{
            position: "relative",
            width: "100%",
            height: "100%",
            maskImage: "linear-gradient(to bottom, transparent 0%, black 12%)",
            WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, black 12%)",
          }}
        >
          <Image
            src="/flowers2.png"
            alt="Flower arrangement"
            fill
            className="object-cover"
            style={{ objectPosition: "left center" }}
            sizes="58vw"
            priority
          />
        </div>
      </motion.div>
    </section>
  );
}
