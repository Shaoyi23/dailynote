import { ImageResponse } from "next/og";
import { siteConfig } from "@/data/site";

export const alt = `${siteConfig.name} — ${siteConfig.role}`;
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          width: "100%",
          height: "100%",
          flexDirection: "column",
          justifyContent: "space-between",
          overflow: "hidden",
          background: "#f7f3ea",
          color: "#2c2923",
          padding: "70px 82px",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: -220,
            right: -120,
            width: 640,
            height: 640,
            borderRadius: 9999,
            background: "rgba(236, 197, 166, 0.5)",
            display: "flex",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: -300,
            left: -160,
            width: 700,
            height: 700,
            borderRadius: 9999,
            background: "rgba(176, 200, 170, 0.5)",
            display: "flex",
          }}
        />

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 20,
            position: "relative",
          }}
        >
          <div
            style={{
              display: "flex",
              width: 62,
              height: 62,
              borderRadius: 9999,
              background: "linear-gradient(145deg, #ecd2b2 0%, #a6c1a0 100%)",
            }}
          />
          <div
            style={{
              display: "flex",
              fontSize: 30,
              letterSpacing: "-0.02em",
              color: "#625c51",
            }}
          >
            {siteConfig.name.toLowerCase()}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 22,
            position: "relative",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              maxWidth: 1000,
              fontSize: 78,
              lineHeight: 1.04,
              letterSpacing: "-0.045em",
            }}
          >
            <div style={{ display: "flex" }}>calm interfaces,</div>
            <div style={{ display: "flex" }}>thoughtful software.</div>
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 30,
              color: "#625c51",
            }}
          >
            {siteConfig.role.toLowerCase()} · {siteConfig.location.toLowerCase()}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderTop: "1px solid #ded5c6",
            paddingTop: 24,
            fontSize: 22,
            color: "#786f62",
            position: "relative",
          }}
        >
          <div style={{ display: "flex" }}>
            {siteConfig.url.replace(/^https?:\/\//, "").replace(/\/$/, "")}
          </div>
          <div style={{ display: "flex" }}>portfolio</div>
        </div>
      </div>
    ),
    {
      ...size,
    },
  );
}
