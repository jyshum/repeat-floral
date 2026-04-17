"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, ease: "easeOut" as const, delay },
});

function FadeSection({ children, className, style }: { children: React.ReactNode; className?: string; style?: React.CSSProperties }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.85, ease: "easeOut" }}
      className={className}
      style={style}
    >
      {children}
    </motion.div>
  );
}

export default function AboutPage() {
  return (
    <main style={{ background: "#F3E7E0", minHeight: "100vh" }}>

      {/* ── NAV ── */}
      <nav
        style={{
          position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
          padding: "1.25rem 3rem",
          display: "flex", alignItems: "center", justifyContent: "space-between",
          background: "rgba(243,231,224,0.88)",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
          borderBottom: "1px solid rgba(210,224,191,0.4)",
        }}
      >
        <Link
          href="/"
          style={{
            fontFamily: "var(--font-cormorant)",
            fontSize: "1rem", fontWeight: 500,
            letterSpacing: "0.18em", textTransform: "uppercase",
            color: "#2d2d2d", textDecoration: "none",
            display: "flex", alignItems: "center", gap: "0.6rem",
          }}
        >
          <Image src="/repeatFloralLOGO.png" alt="Repeat Floral" width={28} height={28} className="object-contain" />
          Repeat Floral
        </Link>
        <Link
          href="/"
          style={{
            fontFamily: "var(--font-dm-sans)",
            fontSize: "0.72rem", letterSpacing: "0.14em",
            textTransform: "uppercase", color: "#5a5a5a",
            textDecoration: "none", fontWeight: 300,
          }}
        >
          ← Back to Home
        </Link>
      </nav>

      {/* ── HERO ── */}
      <section
        style={{
          minHeight: "100vh",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          paddingTop: "72px",
        }}
      >
        {/* Left: text */}
        <div
          style={{
            display: "flex", flexDirection: "column", justifyContent: "center",
            padding: "5rem 3.5rem 5rem 5rem", gap: "1.5rem",
          }}
        >
          {/* Badge */}
          <motion.div {...fadeUp(0.1)} style={{ display: "inline-flex" }}>
            <div
              style={{
                display: "inline-flex", alignItems: "center", gap: "0.5rem",
                padding: "0.4rem 1rem", borderRadius: "999px",
                background: "rgba(191,215,234,0.28)", border: "1px solid rgba(191,215,234,0.75)",
                fontFamily: "var(--font-dm-sans)", fontSize: "0.72rem",
                letterSpacing: "0.16em", color: "#7aaac5",
                textTransform: "uppercase", fontWeight: 500,
              }}
            >
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#BFD7EA", flexShrink: 0 }} />
              Since 2021 &nbsp;·&nbsp; Coquitlam, BC
            </div>
          </motion.div>

          {/* Title */}
          <motion.h1
            {...fadeUp(0.2)}
            style={{
              fontFamily: "var(--font-cormorant)",
              fontSize: "clamp(4.5rem, 7vw, 6.5rem)",
              fontWeight: 400, lineHeight: 0.9,
              letterSpacing: "-0.02em", color: "#000",
            }}
          >
            Our<br />
            <em style={{ fontStyle: "italic" }}>Story</em>
          </motion.h1>

          <motion.p
            {...fadeUp(0.35)}
            style={{
              fontFamily: "var(--font-dm-sans)",
              fontSize: "1rem", fontWeight: 300,
              lineHeight: 1.75, color: "#5a5a5a", maxWidth: "360px",
            }}
          >
            A youth-led nonprofit giving discarded wedding flowers a second life — and delivering beauty to those who need it most.
          </motion.p>
        </div>

        {/* Right: image */}
        <div style={{ position: "relative", overflow: "hidden", minHeight: "500px" }}>
          {/* Replace with real image later */}
          <div
            style={{
              width: "100%", height: "100%",
              background: "linear-gradient(145deg, #D2E0BF 0%, #FAD4D8 50%, rgba(233,136,166,0.3) 100%)",
              display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: "0.5rem",
            }}
          >
            <span style={{ fontFamily: "var(--font-dm-sans)", fontSize: "0.65rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(90,90,90,0.5)" }}>
              Hero image placeholder
            </span>
          </div>
        </div>
      </section>

      {/* ── PULL QUOTE ── */}
      <FadeSection>
        <section
          style={{
            padding: "7rem 5rem",
            background: "#fff8f5",
            borderTop: "1px solid rgba(210,224,191,0.3)",
            borderBottom: "1px solid rgba(210,224,191,0.3)",
            display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center",
            gap: "1.5rem", position: "relative", overflow: "hidden",
          }}
        >
          {/* Decorative quote mark */}
          <span
            aria-hidden
            style={{
              fontFamily: "var(--font-cormorant)", fontSize: "18rem", lineHeight: 1,
              color: "rgba(210,224,191,0.35)", position: "absolute", top: "-2rem", left: "3rem",
              pointerEvents: "none", fontStyle: "italic", userSelect: "none",
            }}
          >
            &ldquo;
          </span>

          <p
            style={{
              fontFamily: "var(--font-cormorant)",
              fontSize: "clamp(2rem, 4vw, 3rem)",
              fontWeight: 400, fontStyle: "italic", lineHeight: 1.35,
              color: "#2d2d2d", maxWidth: "800px", position: "relative", zIndex: 1,
            }}
          >
            &ldquo;We saw an opportunity to extend their life — to carry that beauty beyond a single event and into spaces where it could mean something more.&rdquo;
          </p>
          <span
            style={{
              fontFamily: "var(--font-dm-sans)", fontSize: "0.72rem",
              letterSpacing: "0.2em", textTransform: "uppercase",
              color: "#9a9a9a", fontWeight: 400, position: "relative", zIndex: 1,
            }}
          >
            — The Repeat Floral team, 2021
          </span>
        </section>
      </FadeSection>

      {/* ── ORIGIN STORY ── */}
      <section style={{ display: "grid", gridTemplateColumns: "1fr 1fr", minHeight: "70vh" }}>
        {/* Image */}
        <div style={{ position: "relative", overflow: "hidden" }}>
          <div
            style={{
              width: "100%", height: "100%", minHeight: "560px",
              background: "linear-gradient(135deg, #FAD4D8 0%, #F3E7E0 60%, #D2E0BF 100%)",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}
          >
            <span style={{ fontFamily: "var(--font-dm-sans)", fontSize: "0.65rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(90,90,90,0.5)" }}>
              Team or event photo placeholder
            </span>
          </div>
        </div>

        {/* Text */}
        <FadeSection
          style={{
            padding: "6rem 5rem",
            display: "flex", flexDirection: "column", justifyContent: "center", gap: "1.75rem",
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-dm-sans)", fontSize: "0.65rem",
              letterSpacing: "0.22em", textTransform: "uppercase",
              color: "#8ab58a", fontWeight: 600,
            }}
          >
            How It Started
          </span>
          <div style={{ width: 40, height: 1, background: "#D2E0BF" }} />
          <h2
            style={{
              fontFamily: "var(--font-cormorant)",
              fontSize: "clamp(2.2rem, 3.5vw, 3rem)",
              fontWeight: 400, lineHeight: 1.1, color: "#2d2d2d",
            }}
          >
            From a simple<br />
            <em style={{ fontStyle: "italic" }}>realization</em>
          </h2>
          <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: "1rem", fontWeight: 300, lineHeight: 1.85, color: "#5a5a5a" }}>
            Repeat Floral started in 2021 by local highschoolers from Coquitlam, British Columbia. After hours of planning and celebration, beautiful flowers are often discarded at the end of the night.
          </p>
          <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: "1rem", fontWeight: 300, lineHeight: 1.85, color: "#5a5a5a" }}>
            We saw an opportunity to extend their life — to carry that beauty beyond a single event and into spaces where it could mean something more.
          </p>
        </FadeSection>
      </section>

      {/* ── FULL-BLEED IMAGE STRIP ── */}
      <FadeSection>
        <div
          style={{
            height: "55vh",
            background: "linear-gradient(160deg, #D2E0BF 0%, #BFD7EA 40%, #FAD4D8 100%)",
            display: "flex", alignItems: "center", justifyContent: "center",
            position: "relative", overflow: "hidden",
          }}
        >
          <div
            style={{
              position: "absolute", inset: 0,
              background: "linear-gradient(to bottom, transparent 60%, rgba(243,231,224,0.5) 100%)",
            }}
          />
          <span
            style={{
              fontFamily: "var(--font-dm-sans)", fontSize: "0.65rem",
              letterSpacing: "0.2em", textTransform: "uppercase",
              color: "rgba(90,90,90,0.5)", position: "relative", zIndex: 1,
            }}
          >
            Full-width photo placeholder — flowers, volunteers, delivery
          </span>
        </div>
      </FadeSection>

      {/* ── HASTI ── */}
      <section style={{ display: "grid", gridTemplateColumns: "1fr 1fr", minHeight: "70vh" }}>
        {/* Text */}
        <FadeSection
          style={{
            padding: "6rem 5rem",
            display: "flex", flexDirection: "column", justifyContent: "center", gap: "1.75rem",
            background: "#F3E7E0",
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-dm-sans)", fontSize: "0.65rem",
              letterSpacing: "0.22em", textTransform: "uppercase",
              color: "#C692C7", fontWeight: 600,
            }}
          >
            A Mentor We&apos;re Grateful For
          </span>
          <div style={{ width: 40, height: 1, background: "rgba(198,146,199,0.4)" }} />
          <h2
            style={{
              fontFamily: "var(--font-cormorant)",
              fontSize: "clamp(2.2rem, 3.5vw, 3rem)",
              fontWeight: 400, lineHeight: 1.1, color: "#2d2d2d",
            }}
          >
            Shoutout<br />
            <em style={{ fontStyle: "italic" }}>Hasti</em>
          </h2>
          <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: "1rem", fontWeight: 300, lineHeight: 1.85, color: "#5a5a5a" }}>
            We&apos;re incredibly grateful to Hasti, a wedding planner who supported us from the very beginning. Her guidance and insight played a meaningful role in shaping how Repeat Floral operates today.
          </p>
          <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: "1rem", fontWeight: 300, lineHeight: 1.85, color: "#5a5a5a" }}>
            She continues to be a valued mentor to our team — and we wouldn&apos;t be where we are without her.
          </p>
        </FadeSection>

        {/* Image */}
        <div style={{ position: "relative", overflow: "hidden" }}>
          <div
            style={{
              width: "100%", height: "100%", minHeight: "560px",
              background: "linear-gradient(160deg, rgba(198,146,199,0.2) 0%, #FAD4D8 40%, rgba(233,136,166,0.15) 100%)",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}
          >
            <span style={{ fontFamily: "var(--font-dm-sans)", fontSize: "0.65rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(90,90,90,0.5)" }}>
              Hasti photo placeholder
            </span>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <FadeSection>
        <section
          style={{
            padding: "8rem 5rem",
            background: "linear-gradient(150deg, #F3E7E0 0%, #FAD4D8 45%, #D2E0BF 100%)",
            display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", gap: "2rem",
          }}
        >
          <h2
            style={{
              fontFamily: "var(--font-cormorant)",
              fontSize: "clamp(2.5rem, 4vw, 3.5rem)",
              fontWeight: 400, lineHeight: 1.1, color: "#2d2d2d",
            }}
          >
            Want to be part<br />of the <em style={{ fontStyle: "italic" }}>story?</em>
          </h2>
          <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: "0.95rem", fontWeight: 300, color: "#5a5a5a", lineHeight: 1.75, maxWidth: "420px" }}>
            We&apos;re always looking for passionate volunteers and community partners to help us grow.
          </p>
          <Link href="/volunteer" style={{ textDecoration: "none" }}>
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              transition={{ duration: 0.18, ease: "easeOut" }}
              style={{
                display: "inline-flex", alignItems: "center", gap: "1rem",
                padding: "1rem 2.2rem 1rem 2rem",
                background: "#D2E0BF", borderRadius: "6px", cursor: "pointer",
                boxShadow: "0 8px 32px rgba(210,224,191,0.4)",
              }}
            >
              <span
                style={{
                  fontFamily: "var(--font-cormorant)", fontStyle: "italic",
                  fontSize: "1.55rem", color: "#1e2e1e", lineHeight: 1,
                }}
              >
                Join the Team
              </span>
              <span
                style={{
                  display: "inline-flex", alignItems: "center", justifyContent: "center",
                  width: 28, height: 28, borderRadius: "50%",
                  border: "1px solid rgba(30,46,30,0.25)", color: "#1e2e1e", fontSize: "0.85rem",
                }}
              >
                →
              </span>
            </motion.div>
          </Link>
        </section>
      </FadeSection>

      {/* ── FOOTER ── */}
      <footer
        style={{
          padding: "3rem 5rem",
          borderTop: "1px solid rgba(210,224,191,0.4)",
          display: "flex", alignItems: "center", justifyContent: "center", gap: "0.6rem",
        }}
      >
        <Image
          src="/repeatFloralLOGO.png"
          alt="Repeat Floral"
          width={22}
          height={22}
          className="object-contain"
          style={{ opacity: 0.6 }}
        />
        <p
          style={{
            fontFamily: "var(--font-dm-sans)", fontSize: "0.75rem",
            color: "#8a9e89", fontWeight: 300, letterSpacing: "0.06em",
          }}
        >
          Repeat Floral · Spreading joy, one bouquet at a time.
        </p>
      </footer>

    </main>
  );
}
