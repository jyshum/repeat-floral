"use client";

import { useEffect, useRef } from "react";

const PETAL_COLORS = [
  "#F6EFA6", "#FDE38E", "#D2E0BF", "#B4CEB3", "#BFD7EA",
  "#E988A6", "#F8A9C8", "#FAD4D8", "#C692C7",
];

const CENTER_PALETTE: Record<string, string[]> = {
  "#F6EFA6": ["#E988A6", "#C692C7", "#B4CEB3"],
  "#FDE38E": ["#E988A6", "#FAD4D8", "#C692C7"],
  "#D2E0BF": ["#E988A6", "#F8A9C8", "#C692C7"],
  "#B4CEB3": ["#FAD4D8", "#E988A6", "#F6EFA6"],
  "#BFD7EA": ["#E988A6", "#C692C7", "#FAD4D8"],
  "#E988A6": ["#F6EFA6", "#FDE38E", "#FAD4D8"],
  "#F8A9C8": ["#C692C7", "#B4CEB3", "#FDE38E"],
  "#FAD4D8": ["#C692C7", "#E988A6", "#B4CEB3"],
  "#C692C7": ["#F8A9C8", "#FAD4D8", "#FDE38E"],
};

const NAVBAR_HEIGHT = 80;         // nav height + buffer
const MAX_FLOWERS = 30;
const SPAWN_INTERVAL_MS = 400;
const STAY_MS = 1000;
const IN_MS = 1000;
const OUT_MS = 500;
const CHECK_RADIUS = 22;          // collision padding around flower center
const PAGE_BG_RGB = "rgb(243, 231, 224)";
const CONTAINER_ID = "floral-bg-canvas";

const CONTENT_TAGS = new Set([
  "img", "video", "canvas", "input", "button", "textarea", "select",
  "p", "h1", "h2", "h3", "h4", "h5", "h6", "li", "span", "label",
  "strong", "em", "a", "nav",
]);

let uid = 0;

type Flower = {
  id: number;
  x: number;
  y: number;
  size: number;
};

function rand<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function isContentAt(x: number, y: number): boolean {
  const checkPoints: [number, number][] = [
    [x, y],
    [x - CHECK_RADIUS, y],
    [x + CHECK_RADIUS, y],
    [x, y - CHECK_RADIUS],
    [x, y + CHECK_RADIUS],
  ];

  for (const [px, py] of checkPoints) {
    const els = document.elementsFromPoint(px, py);
    for (const el of els) {
      if (el.id === CONTAINER_ID) continue;
      const tag = el.tagName.toLowerCase();
      if (tag === "html" || tag === "body") break;
      if (CONTENT_TAGS.has(tag)) return true;

      const style = window.getComputedStyle(el);
      if (style.backgroundImage && style.backgroundImage !== "none") return true;
      const bg = style.backgroundColor;
      if (
        bg &&
        bg !== "rgba(0, 0, 0, 0)" &&
        bg !== "transparent" &&
        bg !== PAGE_BG_RGB
      )
        return true;
    }
  }
  // Check explicitly marked exclusion zones (e.g. the hero flower image)
  const exclusionZones = document.querySelectorAll<Element>("[data-no-flowers]");
  for (const zone of exclusionZones) {
    const rect = zone.getBoundingClientRect();
    if (
      x >= rect.left - CHECK_RADIUS &&
      x <= rect.right + CHECK_RADIUS &&
      y >= rect.top - CHECK_RADIUS &&
      y <= rect.bottom + CHECK_RADIUS
    ) return true;
  }

  return false;
}

function overlapsFlower(x: number, y: number, size: number, flowers: Flower[]): boolean {
  for (const f of flowers) {
    const minDist = (size + f.size) / 2 + CHECK_RADIUS;
    const dx = x - f.x;
    const dy = y - f.y;
    if (dx * dx + dy * dy < minDist * minDist) return true;
  }
  return false;
}

// Rotund rounded petal: wide cubic bezier teardrop from center (10,10) to tip (10,3.5)
const PETAL_PATH = "M 10 10 C 6.5 9, 7.2 3.8, 10 3.8 C 12.8 3.8, 13.5 9, 10 10 Z";

function buildFlowerSVG(
  size: number,
  petalColor: string,
  centerColor: string,
  baseRotation: number
): SVGSVGElement {
  const ns = "http://www.w3.org/2000/svg";
  const svg = document.createElementNS(ns, "svg");
  svg.setAttribute("viewBox", "0 0 20 20");
  svg.setAttribute("width", String(size));
  svg.setAttribute("height", String(size));

  for (let i = 0; i < 5; i++) {
    const angle = i * 72 + baseRotation;
    const path = document.createElementNS(ns, "path");
    path.setAttribute("d", PETAL_PATH);
    path.setAttribute("fill", petalColor);
    path.setAttribute("transform", `rotate(${angle}, 10, 10)`);
    svg.appendChild(path);
  }

  const circle = document.createElementNS(ns, "circle");
  circle.setAttribute("cx", "10");
  circle.setAttribute("cy", "10");
  circle.setAttribute("r", "1.8");
  circle.setAttribute("fill", centerColor);
  svg.appendChild(circle);

  return svg;
}

export default function FlowerBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const flowersRef = useRef<Flower[]>([]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    function spawnFlower() {
      if (!container) return;
      if (flowersRef.current.length >= MAX_FLOWERS) return;

      const vw = window.innerWidth;
      const vh = window.innerHeight;

      for (let attempt = 0; attempt < 12; attempt++) {
        const x = Math.random() * vw;
        const y = NAVBAR_HEIGHT + Math.random() * (vh - NAVBAR_HEIGHT - 12);

        if (isContentAt(x, y)) continue;

        const size = 35 + Math.random() * 18; // 15–33 px
        if (overlapsFlower(x, y, size, flowersRef.current)) continue;

        const petalColor = rand(PETAL_COLORS);
        const centerColor = rand(CENTER_PALETTE[petalColor] ?? ["#E988A6"]);
        const baseRotation = Math.random() * 72;
        const jitterRot = -12 + Math.random() * 24;

        const id = ++uid;
        flowersRef.current.push({ id, x, y, size });

        const wrapper = document.createElement("div");
        wrapper.dataset.flowerId = String(id);
        // Convert viewport y → document y so flowers scroll with the page
        const docY = y + window.scrollY;
        wrapper.style.cssText = `
          position: absolute;
          left: ${x - size / 2}px;
          top: ${docY - size / 2}px;
          width: ${size}px;
          height: ${size}px;
          opacity: 0;
          transform: scale(0.1) rotate(${jitterRot + 720}deg);
          transition: opacity ${IN_MS}ms ease, transform ${IN_MS}ms cubic-bezier(0.34, 1.56, 0.64, 1);
          pointer-events: none;
        `;

        const svg = buildFlowerSVG(size, petalColor, centerColor, baseRotation);
        wrapper.appendChild(svg);
        container.appendChild(wrapper);

        // Pop in
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            wrapper.style.opacity = "1";
            wrapper.style.transform = `scale(1) rotate(${jitterRot * 0.1}deg)`;
          });
        });

        // Pop out
        const outTimer = setTimeout(() => {
          wrapper.style.transition = `opacity ${OUT_MS}ms ease, transform ${OUT_MS}ms ease`;
          wrapper.style.opacity = "0";
          wrapper.style.transform = `scale(0.15) rotate(${jitterRot - 360}deg)`;

          const removeTimer = setTimeout(() => {
            wrapper.remove();
            flowersRef.current = flowersRef.current.filter((f) => f.id !== id);
          }, OUT_MS + 60);

          return () => clearTimeout(removeTimer);
        }, IN_MS + STAY_MS);

        // Store cleanup on wrapper for early teardown
        (wrapper as HTMLDivElement & { _out?: number })._out = outTimer as unknown as number;

        break; // placed successfully
      }
    }

    const interval = setInterval(spawnFlower, SPAWN_INTERVAL_MS);

    return () => {
      clearInterval(interval);
      // Cancel pending timers and purge DOM
      container.querySelectorAll<HTMLDivElement & { _out?: number }>("[data-flower-id]").forEach((el) => {
        if (el._out) clearTimeout(el._out);
        el.remove();
      });
      flowersRef.current = [];
    };
  }, []);

  return (
    <div
      id={CONTAINER_ID}
      ref={containerRef}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: 1,
        pointerEvents: "none",
        overflow: "visible",
      }}
      aria-hidden="true"
    />
  );
}
