"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const contacts = [
  {
    label: "Instagram",
    href: "https://instagram.com/repeatfloral",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    label: "(555) 000-0000",
    href: "tel:+15550000000",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81 19.79 19.79 0 01.07 1.18 2 2 0 012.06 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
      </svg>
    ),
  },
  {
    label: "hello@repeatfloral.org",
    href: "mailto:hello@repeatfloral.org",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
        <polyline points="22,6 12,13 2,6" />
      </svg>
    ),
  },
];

export default function Footer() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <footer
      ref={ref}
      style={{
        background: "#BFD7EA80",
        borderTop: "none",
        paddingTop: "64px",
        paddingBottom: "64px",
      }}
    >
      <div className="max-w-6xl mx-auto px-8 flex flex-col items-center gap-8">
        {/* Contact pills */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-wrap items-center justify-center gap-4"
        >
          {contacts.map((c, i) => (
            <motion.a
              key={c.label}
              href={c.href}
              target={c.href.startsWith("http") ? "_blank" : undefined}
              rel={c.href.startsWith("http") ? "noopener noreferrer" : undefined}
              initial={{ opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 + i * 0.1 }}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                padding: "0.55rem 1.4rem",
                borderRadius: "999px",
                border: "1.5px solid #C692C7",
                color: "#C692C7",
                fontFamily: "var(--font-dm-sans)",
                fontWeight: 400,
                fontSize: "0.82rem",
                letterSpacing: "0.06em",
                textDecoration: "none",
                transition: "background 0.2s, color 0.2s",
                background: "transparent",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "#C692C7";
                e.currentTarget.style.color = "#fff";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "transparent";
                e.currentTarget.style.color = "#C692C7";
              }}
            >
              {c.icon}
              {c.label}
            </motion.a>
          ))}
        </motion.div>

        {/* Copyright */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.7, delay: 0.45 }}
          style={{
            fontFamily: "var(--font-dm-sans)",
            fontWeight: 300,
            fontSize: "0.75rem",
            letterSpacing: "0.06em",
            color: "#8a9e89",
            textAlign: "center",
          }}
        >
          © {new Date().getFullYear()} Repeat Floral · Spreading joy, one bouquet at a time.
        </motion.p>
      </div>
    </footer>
  );
}
