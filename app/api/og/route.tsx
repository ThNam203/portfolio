import { ImageResponse } from "next/og";
import { profile } from "@/content/profile";

export const runtime = "edge";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const title = searchParams.get("title") ?? profile.name;
  const subtitle = searchParams.get("subtitle") ?? profile.title;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 80,
          background: "#0a0a0a",
          color: "#fafafa",
          fontFamily: "ui-sans-serif, system-ui",
        }}
      >
        <div
          style={{
            fontFamily: "ui-monospace, SFMono-Regular, monospace",
            fontSize: 22,
            letterSpacing: 2,
            color: "#a3a3a3",
            textTransform: "uppercase",
          }}
        >
          ~/sen1or
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div
            style={{
              fontSize: 88,
              lineHeight: 1.05,
              letterSpacing: -2,
              fontWeight: 500,
            }}
          >
            {title}
          </div>
          <div
            style={{
              fontSize: 36,
              color: "#a3a3a3",
              letterSpacing: -1,
            }}
          >
            {subtitle}
          </div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontFamily: "ui-monospace, SFMono-Regular, monospace",
            fontSize: 20,
            color: "#737373",
          }}
        >
          <span>github.com/ThNam203</span>
          <span>{profile.location}</span>
        </div>
      </div>
    ),
    { width: 1200, height: 630 },
  );
}
