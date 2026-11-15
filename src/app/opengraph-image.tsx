import { ImageResponse } from "next/og";

// Branded link-preview card (no photo), used by every page that doesn't set its own image.
export const alt = "Md Shadi Rohan, Software Engineer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background: "radial-gradient(900px 500px at 85% 0%, rgba(34,211,238,0.28), transparent 70%), #0e0e10",
          color: "white",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", fontSize: 30, fontWeight: 700 }}>
          rohan<span style={{ color: "#22D3EE" }}>.</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              alignSelf: "flex-start",
              alignItems: "center",
              gap: 10,
              padding: "8px 18px",
              borderRadius: 999,
              border: "2px solid rgba(34,211,238,0.5)",
              color: "#22D3EE",
              fontSize: 24,
              fontWeight: 600,
            }}
          >
            AI-native engineer
          </div>
          <div style={{ marginTop: 28, fontSize: 84, fontWeight: 800, letterSpacing: -2, lineHeight: 1 }}>Md Shadi Rohan</div>
          <div style={{ marginTop: 14, fontSize: 44, color: "rgba(255,255,255,0.65)", fontWeight: 600 }}>Software Engineer</div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 26, color: "rgba(255,255,255,0.6)" }}>
          <span>Next.js · Node.js · TypeScript · AWS</span>
          <span style={{ color: "#22D3EE", fontWeight: 700 }}>rohanships.com</span>
        </div>
      </div>
    ),
    size,
  );
}
