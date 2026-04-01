"use client";

export default function GradientDivider() {
  return (
    <div className="relative w-full overflow-hidden" style={{ height: "120px", marginTop: "-1px" }}>
      {/* Wave SVG that transitions from warm cream to sage */}
      <svg
        viewBox="0 0 1440 120"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ width: "100%", height: "100%", display: "block" }}
      >
        <defs>
          <linearGradient id="dividerGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#F3E7E0" />
            <stop offset="100%" stopColor="#D2E0BF" />
          </linearGradient>
        </defs>
        {/* Smooth wave path */}
        <path
          d="M0,0 L0,60 Q180,110 360,70 Q540,30 720,80 Q900,120 1080,65 Q1260,20 1440,75 L1440,0 Z"
          fill="url(#dividerGrad)"
        />
      </svg>
    </div>
  );
}
