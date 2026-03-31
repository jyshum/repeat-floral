"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

const links = [
  { label: "About us", href: "#about" },
  { label: "Register", href: "#register" },
  { label: "Meet the team", href: "#team" },
  { label: "Volunteer", href: "#join" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#F3E7E0] border-b border-[F3E7E0]">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo mark */}
        <Link href="#hero" className="flex items-center gap-2" onClick={() => setOpen(false)}>
          <Image
            src="/repeatFloralLOGO.png"
            alt="Repeat Floral"
            width={47}
            height={47}
            className="object-contain"
          />
          <span
            className="text-lg tracking-widest uppercase"
            style={{ fontFamily: "var(--font-cormorant)", fontWeight: 500, letterSpacing: "0.18em" }}
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
                className="text-sm tracking-widest uppercase text-[#2d2d2d] hover:text-[#E988A6] transition-colors"
                style={{ fontFamily: "var(--font-lato)", fontWeight: 300 }}
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          <span className={`block w-5 h-px bg-[#2d2d2d] transition-all ${open ? "rotate-45 translate-y-2" : ""}`} />
          <span className={`block w-5 h-px bg-[#2d2d2d] transition-all ${open ? "opacity-0" : ""}`} />
          <span className={`block w-5 h-px bg-[#2d2d2d] transition-all ${open ? "-rotate-45 -translate-y-2" : ""}`} />
        </button>
      </div>

      {/* Mobile dropdown */}
      {open && (
        <div className="md:hidden bg-[#B4CEB3] border-t border-[#9ab89a] px-6 py-4 flex flex-col gap-4">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-sm tracking-widest uppercase text-[#2d2d2d] hover:text-[#E988A6] transition-colors"
              style={{ fontFamily: "var(--font-lato)", fontWeight: 300 }}
              onClick={() => setOpen(false)}
            >
              {l.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}
