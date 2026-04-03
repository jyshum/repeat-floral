import Link from "next/link"

export default function RequestPage() {
  return (
    <main
      style={{
        minHeight: "100vh",
        background: "linear-gradient(150deg, #F3E7E0 0%, #FAD4D8 45%, #D2E0BF 100%)",
        fontFamily: "var(--font-dm-sans)",
      }}
    >
      <nav style={{ padding: "1.75rem 2rem" }}>
        <Link
          href="/"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.4rem",
            padding: "0.6rem 1.5rem",
            borderRadius: "9999px",
            background: "rgba(255,255,255,0.68)",
            backdropFilter: "blur(14px)",
            WebkitBackdropFilter: "blur(14px)",
            color: "#2d2d2d",
            fontSize: "0.76rem",
            fontWeight: 300,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            textDecoration: "none",
            boxShadow: "0 4px 20px rgba(0,0,0,0.06)",
          }}
        >
          ← Back to Home
        </Link>
      </nav>

      <div
        style={{
          maxWidth: "880px",
          margin: "0 auto",
          padding: "0 1.5rem 4rem",
        }}
      >
        <div
          style={{
            background: "rgba(255,255,255,0.70)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            borderRadius: "28px",
            overflow: "hidden",
            boxShadow: "0 4px 40px rgba(0,0,0,0.06)",
          }}
        >
          <iframe
            src="https://tally.so/embed/RGLO94"
            width="100%"
            height="900"
            title="Flower Request Form"
            style={{ display: "block", border: "none" }}
          />
        </div>
      </div>
    </main>
  )
}
