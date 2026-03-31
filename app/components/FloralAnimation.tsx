"use client";

import { useMemo } from "react";

const PALETTE = [
  "#E988A6", "#F8A9C8", "#FAD4D8",
  "#F6EFA6", "#FDE38E",
  "#C692C7",
  "#D2E0BF", "#B4CEB3",
];

const PISTIL: Record<string, string> = {
  "#E988A6": "#FDE38E",
  "#F8A9C8": "#FDE38E",
  "#FAD4D8": "#C692C7",
  "#F6EFA6": "#E988A6",
  "#FDE38E": "#E988A6",
  "#C692C7": "#FDE38E",
  "#D2E0BF": "#F8A9C8",
  "#B4CEB3": "#FDE38E",
};

const FLOWER_SIZE = 52;
const PETAL_SIZE  = 36;
const TOTAL       = 23;

function rand(seed: number) {
  const x = Math.sin(seed) * 73856;
  return x - Math.floor(x);
}
const fix = (n: number, d = 4) => parseFloat(n.toFixed(d));

type Item = {
  id: number;
  type: "flower" | "petal";
  x: number;
  marginLeft: number;
  tilt: number;
  fallDuration: number;
  fallDelay: number;
  swayDuration: number;
  swayDelay: number;
  color: string;
  pistilColor: string;
};

function buildItems(): Item[] {
  const slotW = 92 / TOTAL;
  const xSlots = Array.from({ length: TOTAL }, (_, i) => {
    const base   = 4 + (i + 0.5) * slotW;
    const jitter = (rand(i * 31 + 7) - 0.5) * slotW * 0.5;
    return fix(Math.max(3, Math.min(97, base + jitter)));
  });
  for (let i = xSlots.length - 1; i > 0; i--) {
    const j = Math.floor(rand(i * 53 + 11) * (i + 1));
    [xSlots[i], xSlots[j]] = [xSlots[j], xSlots[i]];
  }

  return Array.from({ length: TOTAL }, (_, i) => {
    const s    = i * 17 + 3;
    const type: "flower" | "petal" = i < 9 ? "flower" : "petal";
    // Width used for horizontal centering
    const w    = type === "flower" ? FLOWER_SIZE : fix(PETAL_SIZE * 0.65);
    const fallDuration = fix(20 + rand(s * 3) * 10);  // 20–30 s slow drift
    const color = PALETTE[Math.floor(rand(s * 5) * PALETTE.length)];

    return {
      id: i,
      type,
      x: xSlots[i],
      marginLeft: fix(-(w / 2)),
      tilt:         fix((rand(s * 11) - 0.5) * 24),
      fallDuration,
      fallDelay:    fix(-(rand(s * 7)  * fallDuration)),
      swayDuration: fix(3.5 + rand(s * 23) * 2.5),         // 3.5–6 s per sway
      swayDelay:    fix(-(rand(s * 29) * 5)),               // random phase
      color,
      pistilColor:  PISTIL[color] ?? "#FDE38E",
    };
  });
}

/* ── Plump 4-petal flower — wide rounded petals ── */
function FlowerSVG({ color, pistilColor, size }: {
  color: string; pistilColor: string; size: number;
}) {
  const r = size / 2;
  return (
    <svg width={size} height={size} viewBox={`${-r} ${-r} ${size} ${size}`}>
      {[0, 90, 180, 270].map((angle) => (
        <ellipse
          key={angle}
          cx={0}
          cy={-(r * 0.38)}   // closer to centre = more overlap = fuller look
          rx={r * 0.46}       // wide petals
          ry={r * 0.46}       // same as rx → circular petals, not pointy
          fill={color}
          opacity={0.92}
          transform={`rotate(${angle})`}
        />
      ))}
      <circle cx={0} cy={0} r={r * 0.26} fill={pistilColor} />
      <circle cx={0} cy={0} r={r * 0.11} fill="rgba(255,255,255,0.55)" />
    </svg>
  );
}

/* ── Standalone petal — tapered tip at top, rounded base at bottom ── */
function PetalSVG({ color, size }: { color: string; size: number }) {
  const w = size * 0.65;
  return (
    <svg width={w} height={size} viewBox="0 0 65 100">
      {/*
        Two quadratic bezier segments meeting at a sharp top tip (32.5, 4)
        and curving through a wide middle into a fully rounded bottom.
        Right path: (32.5,4) → bulges to (62,35) → lands at (55,78) → rounds to (32.5,96)
        Left path mirrors it back to the tip.
      */}
      <path
        d="M32.5,4 Q65,38 55,78 Q46,97 32.5,97 Q19,97 10,78 Q0,38 32.5,4 Z"
        fill={color}
        opacity={0.88}
      />
    </svg>
  );
}

export default function FloralAnimation() {
  const items = useMemo(buildItems, []);

  return (
    <>
      {items.map((item) => (
        /* Layer 1: position only — no transform, no animation */
        <div
          key={item.id}
          style={{
            position:   "fixed",
            left:       `${item.x}%`,
            top:        0,
            marginLeft: item.marginLeft,
            zIndex:     1,
          }}
        >
          {/* Layer 2: horizontal sway via transform: translateX().
              Hardcoded px values in the keyframe so browsers interpolate reliably. */}
          <div
            style={{
              animationName:           "floralSway",
              animationDuration:       `${item.swayDuration}s`,
              animationTimingFunction: "ease-in-out",
              animationDelay:          `${item.swayDelay}s`,
              animationIterationCount: "infinite",
            }}
          >
            {/* Layer 3: tilt + vertical fall via `translate` (Y only).
                `transform: rotate` is separate from `translate` so both apply. */}
            <div
              style={{
                transform:               `rotate(${item.tilt}deg)`,
                animationName:           "floralFall",
                animationDuration:       `${item.fallDuration}s`,
                animationTimingFunction: "ease-in",
                animationDelay:          `${item.fallDelay}s`,
                animationIterationCount: "infinite",
                animationFillMode:       "both",
              }}
            >
              {item.type === "flower"
                ? <FlowerSVG color={item.color} pistilColor={item.pistilColor} size={FLOWER_SIZE} />
                : <PetalSVG  color={item.color} size={PETAL_SIZE} />}
            </div>
          </div>
        </div>
      ))}
    </>
  );
}
