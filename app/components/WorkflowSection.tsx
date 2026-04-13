"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, animate, useMotionValue, useSpring, useTransform } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

// ── Card data ────────────────────────────────────────────────────────────────

const CARDS = [
  {
    id: 0,
    image: "/wedding1.png",
    imagePosition: "center",
    text: "Weddings generate thousands of flowers that end up thrown away. We collect and upcycle them — giving every arrangement a second life instead of a landfill.",
    buttonLabel: "Donate Flowers",
    buttonHref: "/request?form=donate",
  },
  {
    id: 1,
    image: "/team4.png",
    imagePosition: "50% 25%",
    text: "Our volunteers and executives coordinate pickups from venues across the city, carefully transporting each bouquet to where it's needed most.",
    buttonLabel: "Join the Team",
    buttonHref: "/volunteer",
  },
  {
    id: 2,
    image: "/seniors.png",
    imagePosition: "top",
    text: "From senior homes to community centers, we hand-deliver fresh bouquets to people who could use a little more beauty in their day.",
    buttonLabel: "Request Flowers",
    buttonHref: "/request?form=request",
  },
];

// ── Animation variants ────────────────────────────────────────────────────────

const slideVariants = {
  enter: (dir: number) => ({ opacity: 0, y: dir > 0 ? 40 : -40 }),
  center: { opacity: 1, y: 0 },
  exit: (dir: number) => ({ opacity: 0, y: dir > 0 ? -40 : 40 }),
};

// ── Helpers ───────────────────────────────────────────────────────────────────

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 28 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, ease: "easeOut" as const, delay },
});

// ── Component ─────────────────────────────────────────────────────────────────

export default function WorkflowSection() {
  const [hintVisible, setHintVisible] = useState(true);
  const [ctaHovered, setCtaHovered] = useState(false);
  const [cardIndex, setCardIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  // Progress drives the spring-animated progress bar (0 = card 0, 1 = card 1, 2 = card 2)
  const progressMV = useMotionValue(0);
  const progressSpring = useSpring(progressMV, { stiffness: 120, damping: 20 });
  const barWidth = useTransform(progressSpring, (p) => `${(p / 2) * 100}%`);
  const flowerLeft = useTransform(progressSpring, (p) => `${(p / 2) * 100}%`);
  const flowerRotation = useMotionValue(0);
  const spinMountRef = useRef(false);

  useEffect(() => {
    if (!spinMountRef.current) { spinMountRef.current = true; return; }
    animate(flowerRotation, flowerRotation.get() + 360, { duration: 0.5, ease: "easeInOut" });
  }, [cardIndex, flowerRotation]);

  // Refs for event handlers — avoid stale closures
  const phaseRef = useRef<"hijacked" | "released">("hijacked");
  const cardIndexRef = useRef(0);
  const hintVisibleRef = useRef(true);
  const isTransitioningRef = useRef(false);
  const deltaAccumRef = useRef(0);

  useEffect(() => {
    const startTransition = () => {
      isTransitioningRef.current = true;
      setTimeout(() => { isTransitioningRef.current = false; }, 1050);
    };

    const dismissHint = () => {
      if (hintVisibleRef.current) {
        hintVisibleRef.current = false;
        setHintVisible(false);
      }
    };

    const advance = (dir: 1 | -1) => {
      if (isTransitioningRef.current) return;
      if (phaseRef.current !== "hijacked") return;

      if (dir === 1) {
        if (cardIndexRef.current < 2) {
          const next = cardIndexRef.current + 1;
          cardIndexRef.current = next;
          setCardIndex(next);
          setDirection(1);
          progressMV.set(next);
          startTransition();
        } else {
          // Already at card 2, next scroll down releases
          phaseRef.current = "released";
        }
      } else {
        if (cardIndexRef.current > 0) {
          const prev = cardIndexRef.current - 1;
          cardIndexRef.current = prev;
          setCardIndex(prev);
          setDirection(-1);
          progressMV.set(prev);
          startTransition();
        }
        // At card 0 scrolling up: stay, no-op
      }
    };

    const handleWheel = (e: WheelEvent) => {
      if (phaseRef.current === "released") return;
      e.preventDefault();
      dismissHint();
      // Drain momentum while transitioning — prevents trackpad flick from
      // auto-advancing through multiple cards
      if (isTransitioningRef.current) {
        deltaAccumRef.current = 0;
        return;
      }
      deltaAccumRef.current += e.deltaY;
      if (Math.abs(deltaAccumRef.current) >= 50) {
        const dir = deltaAccumRef.current > 0 ? 1 : -1;
        deltaAccumRef.current = 0;
        advance(dir);
      }
    };

    const handleScroll = () => {
      if (phaseRef.current === "released" && window.scrollY === 0) {
        phaseRef.current = "hijacked";
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (phaseRef.current === "released") return;
      if (e.key === "ArrowDown") {
        e.preventDefault();
        dismissHint();
        advance(1);
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        advance(-1);
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [progressMV]);

  // ── Render ─────────────────────────────────────────────────────────────────
  return (
    <>
      {/* ════════════════════════════════════════════════════════════════════
          DESKTOP LAYOUT  (md and above)
      ════════════════════════════════════════════════════════════════════ */}
      <section
        className="hidden md:flex h-screen relative"
        style={{ background: "#F3E7E0" }}
      >
        {/* ── LEFT: Hero content (untouched) ── */}
        <div className="w-1/2 h-screen flex items-start pt-16">
          <div className="max-w-xl mx-auto px-8 w-full flex flex-col gap-5 pt-20">
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

            <motion.div {...fadeUp(0.3)} style={{ display: "inline-flex" }}>
              <div
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

            <motion.div {...fadeUp(0.5)} style={{ display: "flex", flexDirection: "column", gap: "0.6rem", maxWidth: "400px" }}>
              <p
                style={{
                  fontFamily: "var(--font-cormorant)",
                  fontWeight: 400,
                  fontStyle: "italic",
                  fontSize: "1.6rem",
                  lineHeight: 1.2,
                  color: "#2d2d2d",
                  margin: 0,
                }}
              >
                Give your flowers a second life
              </p>
              <p
                style={{
                  fontFamily: "var(--font-dm-sans)",
                  fontWeight: 300,
                  fontSize: "0.95rem",
                  lineHeight: 1.75,
                  color: "#5a5a5a",
                  margin: 0,
                }}
              >
                We repurpose wedding and event florals and deliver them to community spaces like seniors&apos; homes, turning beauty into lasting impact.
              </p>
            </motion.div>

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
                    Donate or Request
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

            {/* Scroll-to-explore hint — left column, fades out on first scroll */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: hintVisible ? 1 : 0 }}
              transition={
                hintVisible
                  ? { delay: 1.2, duration: 0.8 }
                  : { duration: 0.35 }
              }
              className="flex flex-row items-center gap-3 pointer-events-none"
            >
              <motion.div
                animate={{ y: [0, 4, 0] }}
                transition={{ repeat: Infinity, duration: 1.4, ease: "easeInOut" }}
              >
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                  <path
                    d="M3 5.5L8 10.5L13 5.5"
                    stroke="#b0b0b0"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </motion.div>
              <span
                style={{
                  fontFamily: "var(--font-dm-sans)",
                  fontWeight: 300,
                  fontSize: "0.72rem",
                  letterSpacing: "0.22em",
                  textTransform: "uppercase",
                  color: "#b0b0b0",
                }}
              >
                Scroll to explore
              </span>
            </motion.div>
          </div>
        </div>

        {/* ── RIGHT: Crossfade cards + progress bar ── */}
        <div className="w-1/2 h-screen flex items-center justify-start pl-4 pr-10">
          <div className="w-full max-w-lg flex flex-col gap-4">

            {/* Card area — invisible Card 0 reference holds the container height;
                animated cards are absolute on top of it */}
            <div className="relative w-full">

              {/* Invisible size reference (uses longest card — Card 0) */}
              <div style={{ visibility: "hidden", pointerEvents: "none" }} aria-hidden="true">
                <div
                  className="w-full flex flex-col gap-6 p-8"
                  style={{
                    background: "rgba(255,255,255,0.62)",
                    backdropFilter: "blur(12px)",
                    WebkitBackdropFilter: "blur(12px)",
                    boxShadow: "none",
                  }}
                >
                  <div className="w-full" style={{ height: "220px", background: "#e8e4e0" }} />
                  <span style={{ fontSize: "0.7rem" }}>Step 1 of 3</span>
                  <p style={{ fontFamily: "var(--font-dm-sans)", fontWeight: 300, fontSize: "1rem", lineHeight: 1.75 }}>
                    {CARDS[0].text}
                  </p>
                  <div style={{ padding: "0.6rem 1.5rem" }}>Donate</div>
                </div>
              </div>

              {/* Animated cards — simultaneous crossfade with directional drift */}
              <AnimatePresence mode="sync" custom={direction}>
                <motion.div
                  key={cardIndex}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.6, ease: "easeInOut" }}
                  style={{ position: "absolute", top: 0, left: 0, right: 0 }}
                  data-no-flowers="true"
                >
                  <div
                    className="w-full flex flex-col gap-6 p-8"
                    style={{
                      background: "rgba(255,255,255,0.62)",
                      backdropFilter: "blur(12px)",
                      WebkitBackdropFilter: "blur(12px)",
                      boxShadow: "none",
                    }}
                  >
                    {/* Card image */}
                    <div
                      className="w-full overflow-hidden"
                      style={{ height: "220px", position: "relative", background: "#e8e4e0" }}
                      data-no-flowers="true"
                    >
                      <Image
                        src={CARDS[cardIndex].image}
                        alt={`Step ${cardIndex + 1}`}
                        fill
                        className="object-cover"
                        style={{ objectPosition: CARDS[cardIndex].imagePosition, transform: "scale(1.04)", transformOrigin: "center top" }}
                        sizes="(max-width: 768px) 100vw, 400px"
                      />
                    </div>

                    {/* Step label */}
                    <span
                      style={{
                        fontFamily: "var(--font-dm-sans)",
                        fontWeight: 600,
                        fontSize: "0.72rem",
                        letterSpacing: "0.2em",
                        textTransform: "uppercase",
                        color: "#8ab58a",
                      }}
                    >
                      Step {cardIndex + 1} of 3
                    </span>

                    {/* Body text */}
                    <p
                      style={{
                        fontFamily: "var(--font-dm-sans)",
                        fontWeight: 300,
                        fontSize: "1rem",
                        lineHeight: 1.75,
                        color: "#5a5a5a",
                      }}
                    >
                      {CARDS[cardIndex].text}
                    </p>

                    {/* Button */}
                    <Link
                      href={CARDS[cardIndex].buttonHref}
                      style={{ textDecoration: "none", display: "inline-flex" }}
                    >
                      <div
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "0.5rem",
                          padding: "0.6rem 1.5rem",
                          borderRadius: "999px",
                          background: "#D2E0BF",
                          color: "#1e2e1e",
                          fontFamily: "var(--font-dm-sans)",
                          fontWeight: 400,
                          fontSize: "0.8rem",
                          letterSpacing: "0.08em",
                          boxShadow: "0 2px 12px rgba(210,224,191,0.5)",
                          cursor: "pointer",
                        }}
                      >
                        {CARDS[cardIndex].buttonLabel}
                        <span style={{ fontSize: "0.75rem" }}>→</span>
                      </div>
                    </Link>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Progress bar — shortened, thicker, flower tracker */}
            <motion.div
              className="mx-auto"
              data-no-flowers="true"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 1.0, ease: "easeOut" }}
              style={{ width: "240px", position: "relative" }}
            >
              {/* Track */}
              <div style={{ height: "10px", borderRadius: "999px", background: "rgba(180,206,179,0.25)", position: "relative", overflow: "visible" }}>
                {/* Fill */}
                <motion.div style={{ height: "100%", borderRadius: "999px", background: "#B4CEB3", width: barWidth }} />
                {/* Flower tracker */}
                <motion.div
                  style={{
                    position: "absolute",
                    top: "50%",
                    left: flowerLeft,
                    x: "-50%",
                    y: "-50%",
                    rotate: flowerRotation,
                    pointerEvents: "none",
                  }}
                >
                  <svg width="28" height="28" viewBox="0 0 20 20">
                    {[0, 1, 2, 3, 4].map((i) => (
                      <path
                        key={i}
                        d="M 10 10 C 7.2 9.2, 7.2 3.8, 10 3.8 C 12.8 3.8, 12.8 9.2, 10 10 Z"
                        fill="#E988A6"
                        transform={`rotate(${i * 72}, 10, 10)`}
                      />
                    ))}
                    <circle cx="10" cy="10" r="2" fill="#F3E7E0" />
                  </svg>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          MOBILE LAYOUT  (below md) — untouched
      ════════════════════════════════════════════════════════════════════ */}
      <section
        className="md:hidden flex flex-col"
        style={{ background: "#F3E7E0" }}
      >
        {/* Hero content */}
        <div className="px-6 pt-28 pb-12 flex flex-col gap-5">
          <h1
            style={{
              fontFamily: "var(--font-cormorant)",
              fontWeight: 400,
              fontSize: "clamp(3.5rem, 14vw, 5rem)",
              lineHeight: 0.95,
              color: "#000000",
              letterSpacing: "-0.02em",
            }}
          >
            Repeat
            <br />
            <em style={{ fontStyle: "italic" }}>Floral</em>
          </h1>

          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              padding: "0.45rem 1.2rem",
              borderRadius: "999px",
              background: "rgba(191, 215, 234, 0.28)",
              border: "1px solid rgba(191, 215, 234, 0.75)",
              alignSelf: "flex-start",
            }}
          >
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
                fontSize: "0.75rem",
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
                fontSize: "0.75rem",
                letterSpacing: "0.16em",
                color: "#7aaac5",
                textTransform: "uppercase",
              }}
            >
              Vancouver, BC
            </span>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
            <p
              style={{
                fontFamily: "var(--font-cormorant)",
                fontWeight: 400,
                fontStyle: "italic",
                fontSize: "1.4rem",
                lineHeight: 1.2,
                color: "#2d2d2d",
                margin: 0,
              }}
            >
              Give your flowers a second life
            </p>
            <p
              style={{
                fontFamily: "var(--font-dm-sans)",
                fontWeight: 300,
                fontSize: "0.95rem",
                lineHeight: 1.75,
                color: "#5a5a5a",
                margin: 0,
              }}
            >
              We repurpose wedding and event florals and deliver them to community spaces like seniors&apos; homes, turning beauty into lasting impact.
            </p>
          </div>

          <Link href="/request" style={{ textDecoration: "none", display: "inline-flex" }}>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "1rem",
                padding: "1rem 1.8rem 1rem 1.6rem",
                background: "#D2E0BF",
                borderRadius: "6px",
                cursor: "pointer",
                boxShadow: "0 8px 32px rgba(210,224,191,0.4)",
              }}
            >
              <span
                style={{
                  fontFamily: "var(--font-cormorant)",
                  fontStyle: "italic",
                  fontWeight: 400,
                  fontSize: "1.4rem",
                  color: "#1e2e1e",
                  lineHeight: 1,
                }}
              >
                Donate or Request
              </span>
              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "24px",
                  height: "24px",
                  borderRadius: "50%",
                  border: "1px solid rgba(30,46,30,0.25)",
                  color: "#1e2e1e",
                  fontSize: "0.8rem",
                }}
              >
                →
              </span>
            </div>
          </Link>
        </div>

        {/* 3 cards stacked */}
        <div className="px-6 pb-16 flex flex-col gap-6">
          {CARDS.map((card, i) => (
            <div
              key={card.id}
              className="w-full flex flex-col gap-5 p-6"
              style={{
                background: "rgba(255,255,255,0.62)",
                backdropFilter: "blur(12px)",
                WebkitBackdropFilter: "blur(12px)",
                boxShadow: "0 8px 40px rgba(0,0,0,0.07)",
              }}
            >
              <div
                className="w-full overflow-hidden"
                style={{ aspectRatio: "4/3", position: "relative" }}
                data-no-flowers="true"
              >
                <Image
                  src={card.image}
                  alt={`Step ${i + 1}`}
                  fill
                  className="object-cover"
                  style={{ objectPosition: card.imagePosition, transform: "scale(1.04)", transformOrigin: "center top" }}
                  sizes="(max-width: 768px) 100vw, 400px"
                />
              </div>

              <span
                style={{
                  fontFamily: "var(--font-dm-sans)",
                  fontWeight: 600,
                  fontSize: "0.7rem",
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: "#8ab58a",
                }}
              >
                Step {i + 1} of 3
              </span>

              <p
                style={{
                  fontFamily: "var(--font-dm-sans)",
                  fontWeight: 300,
                  fontSize: "0.95rem",
                  lineHeight: 1.75,
                  color: "#5a5a5a",
                }}
              >
                {card.text}
              </p>

              <Link href={card.buttonHref} style={{ textDecoration: "none", display: "inline-flex" }}>
                <div
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    padding: "0.55rem 1.3rem",
                    borderRadius: "999px",
                    background: "#D2E0BF",
                    color: "#1e2e1e",
                    fontFamily: "var(--font-dm-sans)",
                    fontWeight: 400,
                    fontSize: "0.78rem",
                    letterSpacing: "0.08em",
                    boxShadow: "0 2px 12px rgba(210,224,191,0.5)",
                  }}
                >
                  {card.buttonLabel}
                  <span style={{ fontSize: "0.72rem" }}>→</span>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
