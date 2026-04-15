"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

type FormType = "donate" | "request" | null;

interface DonateData {
  name: string;
  email: string;
  eventDate: string;
  pickupAddress: string;
  flowerDescription: string;
  notes: string;
}

interface RequestData {
  name: string;
  organization: string;
  deliveryAddress: string;
  bouquetCount: string;
  preferredDate: string;
  notes: string;
}

const emptyDonate: DonateData = {
  name: "",
  email: "",
  eventDate: "",
  pickupAddress: "",
  flowerDescription: "",
  notes: "",
};

const emptyRequest: RequestData = {
  name: "",
  organization: "",
  deliveryAddress: "",
  bouquetCount: "",
  preferredDate: "",
  notes: "",
};

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "0.75rem 1rem",
  borderRadius: "8px",
  border: "1px solid rgba(0,0,0,0.1)",
  background: "rgba(255,255,255,0.7)",
  fontFamily: "var(--font-dm-sans)",
  fontWeight: 300,
  fontSize: "0.95rem",
  color: "#2d2d2d",
  outline: "none",
  boxSizing: "border-box",
};

const labelStyle: React.CSSProperties = {
  fontFamily: "var(--font-dm-sans)",
  fontWeight: 500,
  fontSize: "0.75rem",
  letterSpacing: "0.12em",
  textTransform: "uppercase",
  color: "#5a5a5a",
  display: "block",
  marginBottom: "0.4rem",
};

export default function RequestPage() {
  const searchParams = useSearchParams();
  const [formType, setFormType] = useState<FormType>(null);
  const [donateData, setDonateData] = useState<DonateData>(emptyDonate);
  const [requestData, setRequestData] = useState<RequestData>(emptyRequest);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const param = searchParams.get("form");
    if (param === "donate" || param === "request") setFormType(param);
  }, [searchParams]);

  const handleDonateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: wire up to Google Sheets API
    console.log("Donate submission:", donateData);
    setSubmitted(true);
  };

  const handleRequestSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: wire up to Google Sheets API
    console.log("Request submission:", requestData);
    setSubmitted(true);
  };

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

      <div style={{ maxWidth: "680px", margin: "0 auto", padding: "0 1.5rem 6rem" }}>

        {/* Page title */}
        <div style={{ textAlign: "center", marginBottom: "3rem" }}>
          <h1
            style={{
              fontFamily: "var(--font-cormorant)",
              fontWeight: 400,
              fontSize: "clamp(2.5rem, 6vw, 4rem)",
              lineHeight: 1.0,
              color: "#2d2d2d",
              letterSpacing: "-0.02em",
              margin: "0 0 0.75rem",
            }}
          >
            {formType === "donate"
              ? "Donate Flowers"
              : formType === "request"
              ? <>Request <em style={{ fontStyle: "italic" }}>Flowers</em></>
              : <>Get <em style={{ fontStyle: "italic" }}>Involved</ em></>}
          </h1>
          {!formType && (
            <p
              style={{
                fontFamily: "var(--font-dm-sans)",
                fontWeight: 300,
                fontSize: "1rem",
                color: "#5a5a5a",
                lineHeight: 1.7,
                margin: 0,
              }}
            >
              Choose how you&apos;d like to participate.
            </p>
          )}
        </div>

        {/* Form picker */}
        {!formType && (
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.25rem", marginBottom: "2.5rem" }}>
            {/* Donate card */}
            <button
              onClick={() => setFormType("donate")}
              style={{
                background: "rgba(255,255,255,0.65)",
                backdropFilter: "blur(16px)",
                WebkitBackdropFilter: "blur(16px)",
                border: "1px solid rgba(255,255,255,0.5)",
                borderRadius: "20px",
                padding: "2rem 1.5rem",
                cursor: "pointer",
                textAlign: "left",
                boxShadow: "0 4px 30px rgba(0,0,0,0.06)",
                transition: "transform 0.2s ease, box-shadow 0.2s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-3px)";
                e.currentTarget.style.boxShadow = "0 8px 40px rgba(0,0,0,0.1)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 4px 30px rgba(0,0,0,0.06)";
              }}
            >
              <div
                style={{
                  fontFamily: "var(--font-cormorant)",
                  fontWeight: 400,
                  fontSize: "1.5rem",
                  color: "#2d2d2d",
                  marginBottom: "0.5rem",
                }}
              >
                Donate Flowers
              </div>
              <div
                style={{
                  fontFamily: "var(--font-dm-sans)",
                  fontWeight: 300,
                  fontSize: "0.85rem",
                  color: "#5a5a5a",
                  lineHeight: 1.6,
                }}
              >
                Give your event florals a second life in the community.
              </div>
            </button>

            {/* Request card */}
            <button
              onClick={() => setFormType("request")}
              style={{
                background: "rgba(255,255,255,0.65)",
                backdropFilter: "blur(16px)",
                WebkitBackdropFilter: "blur(16px)",
                border: "1px solid rgba(255,255,255,0.5)",
                borderRadius: "20px",
                padding: "2rem 1.5rem",
                cursor: "pointer",
                textAlign: "left",
                boxShadow: "0 4px 30px rgba(0,0,0,0.06)",
                transition: "transform 0.2s ease, box-shadow 0.2s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-3px)";
                e.currentTarget.style.boxShadow = "0 8px 40px rgba(0,0,0,0.1)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 4px 30px rgba(0,0,0,0.06)";
              }}
            >
              <div
                style={{
                  fontFamily: "var(--font-cormorant)",
                  fontWeight: 400,
                  fontSize: "1.5rem",
                  color: "#2d2d2d",
                  marginBottom: "0.5rem",
                }}
              >
                Request Flowers
              </div>
              <div
                style={{
                  fontFamily: "var(--font-dm-sans)",
                  fontWeight: 300,
                  fontSize: "0.85rem",
                  color: "#5a5a5a",
                  lineHeight: 1.6,
                }}
              >
                Request a delivery for your organization or community space.
              </div>
            </button>
          </div>
        )}

        {/* Forms */}
        {formType && !submitted && (
          <div
            style={{
              background: "rgba(255,255,255,0.65)",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
              borderRadius: "24px",
              padding: "2.5rem",
              boxShadow: "0 4px 40px rgba(0,0,0,0.06)",
            }}
          >
            {/* Back to picker */}
            <button
              onClick={() => setFormType(null)}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                fontFamily: "var(--font-dm-sans)",
                fontWeight: 300,
                fontSize: "0.8rem",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "#9a9a9a",
                padding: 0,
                marginBottom: "2rem",
                display: "flex",
                alignItems: "center",
                gap: "0.3rem",
              }}
            >
              ← Back
            </button>

            {formType === "donate" && (
              <form onSubmit={handleDonateSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                  <div>
                    <label style={labelStyle}>Full Name *</label>
                    <input
                      required
                      style={inputStyle}
                      value={donateData.name}
                      onChange={(e) => setDonateData({ ...donateData, name: e.target.value })}
                      placeholder="Jane Smith"
                    />
                  </div>
                  <div>
                    <label style={labelStyle}>Email *</label>
                    <input
                      required
                      type="email"
                      style={inputStyle}
                      value={donateData.email}
                      onChange={(e) => setDonateData({ ...donateData, email: e.target.value })}
                      placeholder="jane@email.com"
                    />
                  </div>
                </div>

                <div>
                  <label style={labelStyle}>Event Date *</label>
                  <input
                    required
                    type="date"
                    style={inputStyle}
                    value={donateData.eventDate}
                    onChange={(e) => setDonateData({ ...donateData, eventDate: e.target.value })}
                  />
                </div>

                <div>
                  <label style={labelStyle}>Pickup Address *</label>
                  <input
                    required
                    style={inputStyle}
                    value={donateData.pickupAddress}
                    onChange={(e) => setDonateData({ ...donateData, pickupAddress: e.target.value })}
                    placeholder="Venue name and address"
                  />
                </div>

                <div>
                  <label style={labelStyle}>Flower Description *</label>
                  <textarea
                    required
                    rows={3}
                    style={{ ...inputStyle, resize: "vertical" }}
                    value={donateData.flowerDescription}
                    onChange={(e) => setDonateData({ ...donateData, flowerDescription: e.target.value })}
                    placeholder="e.g. 20 table centrepieces, mixed roses and greenery"
                  />
                </div>

                <div>
                  <label style={labelStyle}>Additional Notes</label>
                  <textarea
                    rows={2}
                    style={{ ...inputStyle, resize: "vertical" }}
                    value={donateData.notes}
                    onChange={(e) => setDonateData({ ...donateData, notes: e.target.value })}
                    placeholder="Anything else we should know?"
                  />
                </div>

                <button
                  type="submit"
                  style={{
                    marginTop: "0.5rem",
                    padding: "1rem 2rem",
                    background: "#D2E0BF",
                    border: "none",
                    borderRadius: "8px",
                    fontFamily: "var(--font-cormorant)",
                    fontStyle: "italic",
                    fontWeight: 400,
                    fontSize: "1.4rem",
                    color: "#1e2e1e",
                    cursor: "pointer",
                    boxShadow: "0 4px 20px rgba(210,224,191,0.5)",
                  }}
                >
                  Submit Donation →
                </button>
              </form>
            )}

            {formType === "request" && (
              <form onSubmit={handleRequestSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                  <div>
                    <label style={labelStyle}>Full Name *</label>
                    <input
                      required
                      style={inputStyle}
                      value={requestData.name}
                      onChange={(e) => setRequestData({ ...requestData, name: e.target.value })}
                      placeholder="Jane Smith"
                    />
                  </div>
                  <div>
                    <label style={labelStyle}>Organization *</label>
                    <input
                      required
                      style={inputStyle}
                      value={requestData.organization}
                      onChange={(e) => setRequestData({ ...requestData, organization: e.target.value })}
                      placeholder="Sunrise Senior Centre"
                    />
                  </div>
                </div>

                <div>
                  <label style={labelStyle}>Delivery Address *</label>
                  <input
                    required
                    style={inputStyle}
                    value={requestData.deliveryAddress}
                    onChange={(e) => setRequestData({ ...requestData, deliveryAddress: e.target.value })}
                    placeholder="Full address"
                  />
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                  <div>
                    <label style={labelStyle}>Number of Bouquets *</label>
                    <input
                      required
                      type="number"
                      min="1"
                      style={inputStyle}
                      value={requestData.bouquetCount}
                      onChange={(e) => setRequestData({ ...requestData, bouquetCount: e.target.value })}
                      placeholder="5"
                    />
                  </div>
                  <div>
                    <label style={labelStyle}>Preferred Delivery Date</label>
                    <input
                      type="date"
                      style={inputStyle}
                      value={requestData.preferredDate}
                      onChange={(e) => setRequestData({ ...requestData, preferredDate: e.target.value })}
                    />
                  </div>
                </div>

                <div>
                  <label style={labelStyle}>Additional Notes</label>
                  <textarea
                    rows={3}
                    style={{ ...inputStyle, resize: "vertical" }}
                    value={requestData.notes}
                    onChange={(e) => setRequestData({ ...requestData, notes: e.target.value })}
                    placeholder="Any accessibility needs, preferences, or other details"
                  />
                </div>

                <button
                  type="submit"
                  style={{
                    marginTop: "0.5rem",
                    padding: "1rem 2rem",
                    background: "#D2E0BF",
                    border: "none",
                    borderRadius: "8px",
                    fontFamily: "var(--font-cormorant)",
                    fontStyle: "italic",
                    fontWeight: 400,
                    fontSize: "1.4rem",
                    color: "#1e2e1e",
                    cursor: "pointer",
                    boxShadow: "0 4px 20px rgba(210,224,191,0.5)",
                  }}
                >
                  Submit Request →
                </button>
              </form>
            )}
          </div>
        )}

        {/* Thank you state */}
        {submitted && (
          <div
            style={{
              background: "rgba(255,255,255,0.65)",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
              borderRadius: "24px",
              padding: "3rem 2.5rem",
              boxShadow: "0 4px 40px rgba(0,0,0,0.06)",
              textAlign: "center",
            }}
          >
            <div style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>🌿</div>
            <h2
              style={{
                fontFamily: "var(--font-cormorant)",
                fontWeight: 400,
                fontSize: "2rem",
                color: "#2d2d2d",
                marginBottom: "0.75rem",
              }}
            >
              Thank you!
            </h2>
            <p
              style={{
                fontFamily: "var(--font-dm-sans)",
                fontWeight: 300,
                fontSize: "0.95rem",
                color: "#5a5a5a",
                lineHeight: 1.7,
                marginBottom: "2rem",
              }}
            >
              We&apos;ve received your {formType === "donate" ? "donation" : "request"} and will be in touch soon.
            </p>
            <Link
              href="/"
              style={{
                fontFamily: "var(--font-dm-sans)",
                fontWeight: 300,
                fontSize: "0.8rem",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "#5a5a5a",
                textDecoration: "none",
              }}
            >
              ← Back to Home
            </Link>
          </div>
        )}
      </div>
    </main>
  );
}
