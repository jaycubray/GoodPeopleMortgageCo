import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Good People Mortgage Company";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "linear-gradient(135deg, #273C2E 0%, #3B5A44 40%, #41644C 100%)",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "60px",
        }}
      >
        {/* Logo area */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: "40px",
          }}
        >
          <div
            style={{
              fontSize: "64px",
              fontWeight: "bold",
              color: "#ffffff",
              textAlign: "center",
              lineHeight: 1.2,
              fontFamily: "serif",
            }}
          >
            Good People
          </div>
        </div>
        <div
          style={{
            fontSize: "64px",
            fontWeight: "bold",
            color: "#E1B77E",
            textAlign: "center",
            lineHeight: 1.2,
            fontFamily: "serif",
            marginBottom: "30px",
          }}
        >
          Mortgage Company
        </div>
        <div
          style={{
            fontSize: "24px",
            color: "#B3C1B7",
            textAlign: "center",
            maxWidth: "800px",
            lineHeight: 1.5,
          }}
        >
          Home loan experts dedicated to making your home purchase or refinance experience top-notch.
        </div>
        {/* Bottom bar */}
        <div
          style={{
            position: "absolute",
            bottom: "40px",
            display: "flex",
            alignItems: "center",
            gap: "20px",
          }}
        >
          <div style={{ fontSize: "16px", color: "#7A9382" }}>
            NMLS #2409276
          </div>
          <div style={{ fontSize: "16px", color: "#7A9382" }}>
            |
          </div>
          <div style={{ fontSize: "16px", color: "#7A9382" }}>
            Saint Petersburg, FL
          </div>
          <div style={{ fontSize: "16px", color: "#7A9382" }}>
            |
          </div>
          <div style={{ fontSize: "16px", color: "#7A9382" }}>
            (727) 543-7398
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
