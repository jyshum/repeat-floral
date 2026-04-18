"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

const links = [
  { label: "Request", href: "/request" },
  { label: "About Us", href: "/about" },
  { label: "Join The Team", href: "#jointheteam" },
];

// ── Flower config ─────────────────────────────────────────────────────────────
const PETAL_PATH = "M 10 10 C 6.5 9, 7.2 3.8, 10 3.8 C 12.8 3.8, 13.5 9, 10 10 Z";
const NAV_H = 64;          // matches h-16
const INSIDE_FRAC = 0.38;  // fraction of flower height tucked inside nav

// More of these — they sit BEHIND the navbar (z-48)
const BEHIND_FLOWERS = [
  // Left edge cluster
  { left: "0.4%",  size: 52, rot: -22, petalColor: "#E988A6", centerColor: "#F6EFA6", swayDir:  1 as const, delay: 0.0 },
  { left: "2.5%",  size: 40, rot:  14, petalColor: "#FAD4D8", centerColor: "#C692C7", swayDir: -1 as const, delay: 0.5 },
  { left: "4.8%",  size: 58, rot:  -7, petalColor: "#D2E0BF", centerColor: "#E988A6", swayDir:  1 as const, delay: 1.0 },
  { left: "7.2%",  size: 44, rot:  20, petalColor: "#C692C7", centerColor: "#FAD4D8", swayDir: -1 as const, delay: 0.3 },
  { left: "9.6%",  size: 36, rot: -30, petalColor: "#F8A9C8", centerColor: "#B4CEB3", swayDir:  1 as const, delay: 0.8 },
  // Right edge cluster
  { left: "87.5%", size: 50, rot:  18, petalColor: "#B4CEB3", centerColor: "#E988A6", swayDir: -1 as const, delay: 0.2 },
  { left: "90.0%", size: 38, rot: -14, petalColor: "#FAD4D8", centerColor: "#C692C7", swayDir:  1 as const, delay: 0.7 },
  { left: "92.4%", size: 56, rot:   8, petalColor: "#E988A6", centerColor: "#FDE38E", swayDir: -1 as const, delay: 0.1 },
  { left: "95.2%", size: 42, rot: -26, petalColor: "#D2E0BF", centerColor: "#E988A6", swayDir:  1 as const, delay: 0.6 },
  { left: "97.5%", size: 34, rot:  16, petalColor: "#C692C7", centerColor: "#FAD4D8", swayDir: -1 as const, delay: 1.1 },
];

// Fewer of these — sit IN FRONT of the navbar (inside nav, high z-index)
const FRONT_FLOWERS = [
  // Left edge
  { left: "1.8%",  size: 38, rot:  10, petalColor: "#FDE38E", centerColor: "#E988A6", swayDir: -1 as const, delay: 0.6 },
  { left: "6.0%",  size: 32, rot: -18, petalColor: "#BFD7EA", centerColor: "#C692C7", swayDir:  1 as const, delay: 1.3 },
  // Right edge
  { left: "89.5%", size: 35, rot:  22, petalColor: "#F6EFA6", centerColor: "#E988A6", swayDir:  1 as const, delay: 0.4 },
  { left: "96.0%", size: 30, rot: -12, petalColor: "#F8A9C8", centerColor: "#B4CEB3", swayDir: -1 as const, delay: 0.9 },
];

type FlowerDef = typeof BEHIND_FLOWERS[0];

function flowerSVG(size: number, petalColor: string, centerColor: string) {
  return (
    <svg viewBox="0 0 20 20" width={size} height={size}>
      {[0, 1, 2, 3, 4].map((i) => (
        <path key={i} d={PETAL_PATH} fill={petalColor} transform={`rotate(${i * 72}, 10, 10)`} />
      ))}
      <circle cx="10" cy="10" r="1.8" fill={centerColor} />
    </svg>
  );
}

// Behind: fixed-positioned sibling, z-index 48 (below nav at z-50)
function BehindFlower({ left, size, rot, petalColor, centerColor, swayDir, delay }: FlowerDef) {
  const ty = NAV_H - size * INSIDE_FRAC;
  const anim = swayDir > 0 ? "navSwayR" : "navSwayL";
  return (
    <div
      aria-hidden
      className="nav-flower"
      style={{
        position: "fixed", top: 0, left, zIndex: 48,
        width: size, height: size,
        ["--ty" as string]: `${ty}px`,
        ["--r"  as string]: `${rot}deg`,
        transformOrigin: "50% 40%",
        pointerEvents: "none",
        animation: `${anim} ${3.8 + delay}s ease-in-out infinite ${delay}s both`,
      }}
    >
      {flowerSVG(size, petalColor, centerColor)}
    </div>
  );
}

// Front: absolute child of nav, z-index 99 (above nav content)
function FrontFlower({ left, size, rot, petalColor, centerColor, swayDir, delay }: FlowerDef) {
  const ty = NAV_H - size * INSIDE_FRAC;
  const anim = swayDir > 0 ? "navSwayR" : "navSwayL";
  return (
    <div
      aria-hidden
      className="nav-flower"
      style={{
        position: "absolute", top: 0, left, zIndex: 99,
        width: size, height: size,
        ["--ty" as string]: `${ty}px`,
        ["--r"  as string]: `${rot}deg`,
        transformOrigin: "50% 40%",
        pointerEvents: "none",
        animation: `${anim} ${3.8 + delay}s ease-in-out infinite ${delay}s both`,
      }}
    >
      {flowerSVG(size, petalColor, centerColor)}
    </div>
  );
}

// ── Component ─────────────────────────────────────────────────────────────────
export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen]         = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Keyframes — shared by both layers */}
      <style>{`
        @keyframes navSwayR {
          0%,100% { transform: translateY(var(--ty)) rotate(var(--r)); }
          50%      { transform: translateY(var(--ty)) rotate(calc(var(--r) + 5deg)); }
        }
        @keyframes navSwayL {
          0%,100% { transform: translateY(var(--ty)) rotate(var(--r)); }
          50%      { transform: translateY(var(--ty)) rotate(calc(var(--r) - 5deg)); }
        }
        @media (max-width: 767px) {
          .nav-flower { display: none; }
        }
      `}</style>

      {/* Behind layer — renders BELOW the nav */}
      {BEHIND_FLOWERS.map((f, i) => <BehindFlower key={i} {...f} />)}

      <nav
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
        style={{
          overflow: "visible",
          background: "rgba(243, 231, 224, 0.92)",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
          borderBottom: scrolled ? "1px solid #D2E0BF" : "1px solid transparent",
          boxShadow: scrolled ? "0 2px 24px rgba(0,0,0,0.04)" : "none",
        }}
      >
        {/* Front layer — renders ABOVE the nav */}
        {FRONT_FLOWERS.map((f, i) => <FrontFlower key={i} {...f} />)}

        <div className="max-w-6xl mx-auto px-8 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3" onClick={() => setOpen(false)}>
            <Image src="/repeatFloralLOGO.png" alt="Repeat Floral" width={36} height={36} className="object-contain" />
            <span
              style={{
                fontFamily: "var(--font-cormorant)",
                fontWeight: 500, letterSpacing: "0.18em",
                fontSize: "1.05rem", color: "#2d2d2d", textTransform: "uppercase",
              }}
            >
              Repeat Floral
            </span>
          </Link>

          {/* Desktop links */}
          <ul className="hidden md:flex items-center gap-10">
            {links.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  style={{
                    fontFamily: "var(--font-dm-sans)", fontWeight: 400,
                    fontSize: "0.8rem", letterSpacing: "0.12em",
                    textTransform: "uppercase", color: "#2d2d2d", transition: "color 0.2s",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "#E988A6")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "#2d2d2d")}
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Mobile hamburger */}
          <button className="md:hidden flex flex-col gap-1.5 p-2" onClick={() => setOpen((v) => !v)} aria-label="Toggle menu">
            <span className="block w-5 h-px bg-[#2d2d2d] transition-all duration-300" style={{ transform: open ? "rotate(45deg) translateY(8px)" : "none" }} />
            <span className="block w-5 h-px bg-[#2d2d2d] transition-all duration-300" style={{ opacity: open ? 0 : 1 }} />
            <span className="block w-5 h-px bg-[#2d2d2d] transition-all duration-300" style={{ transform: open ? "rotate(-45deg) translateY(-8px)" : "none" }} />
          </button>
        </div>

        {/* Mobile dropdown */}
        {open && (
          <div
            className="md:hidden px-8 py-6 flex flex-col gap-5"
            style={{
              background: "rgba(243, 231, 224, 0.97)",
              backdropFilter: "blur(16px)", WebkitBackdropFilter: "blur(16px)",
              borderTop: "1px solid #D2E0BF",
            }}
          >
            {links.map((l) => (
              <Link
                key={l.href} href={l.href}
                style={{
                  fontFamily: "var(--font-dm-sans)", fontWeight: 400,
                  fontSize: "0.8rem", letterSpacing: "0.12em",
                  textTransform: "uppercase", color: "#2d2d2d",
                }}
                onClick={() => setOpen(false)}
              >
                {l.label}
              </Link>
            ))}
          </div>
        )}
      </nav>
    </>
  );
}
