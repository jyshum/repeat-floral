"use client";

import Image from "next/image";
import Navbar from "./components/Navbar";
import FloralAnimation from "./components/FloralAnimation";

const displayFont = { fontFamily: "var(--font-cormorant)", fontWeight: 400 };
const bodyFont    = { fontFamily: "var(--font-lato)" };

export default function Home() {
  return (
    <>
      <Navbar />

      {/* z-1: falling flowers layer */}
      <FloralAnimation />

      {/* z-2: heavy frosted-glass shield — blurs + whites-out flowers
               so only a ghost of colour is visible behind the hero. */}
      <div
        className="fixed pointer-events-none"
        style={{
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -47%)",
          width:  "min(660px, 68vw)",
          height: "min(720px, 80vh)",
          backdropFilter:         "blur(22px)",
          WebkitBackdropFilter:   "blur(22px)",
          background:             "radial-gradient(ellipse at center, rgba(255,255,255,0.82) 28%, rgba(255,255,255,0) 70%)",
          maskImage:              "radial-gradient(ellipse at center, white 38%, transparent 72%)",
          WebkitMaskImage:        "radial-gradient(ellipse at center, white 38%, transparent 72%)",
          zIndex: 2,
        }}
      />

      {/* z-3: hero content — always crisp above the blur shield */}
      <section
        id="hero"
        className="relative flex flex-col items-center justify-center min-h-screen bg-transparent overflow-hidden pt-16"
        style={{ zIndex: 3 }}
      >
        <div className="relative flex items-center justify-center w-72 h-72 md:w-96 md:h-96">
          <div className="hero-circle absolute inset-0 rounded-full bg-[#fad4d8]" />
          <div className="hero-logo relative z-10 w-52 h-52 md:w-68 md:h-68 flex items-center justify-center">
            <Image
              src="/repeatFloralLOGO.png"
              alt="Repeat Floral logo"
              width={240}
              height={240}
              className="w-full h-full object-contain"
              priority
            />
          </div>
        </div>

        <h1
          className="hero-title mt-8 text-center text-5xl md:text-6xl tracking-[0.1em] uppercase font-light text-[#2d2d2d] whitespace-nowrap"
          style={displayFont}
        >
          Repeat Floral
        </h1>

        <p
          className="hero-slogan mt-1 max-w-4xl text-center text-sm md:text-base tracking-[0.15em] text-[#f8a9c8]"
          style={bodyFont}
        >
          Up-cycling wedding flowers to promote sustainability
          <br />
          and lengthen the joy that nature brings to our communities!
        </p>
      </section>
    </>
  );
}
