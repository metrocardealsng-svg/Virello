import { ImageResponse } from "next/og";
import { queryOne } from "@/lib/db";

export const runtime = "nodejs";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const shareId = searchParams.get("id") ?? "";

  const post = await queryOne<{ body: string }>(`SELECT body FROM posts WHERE share_id = $1`, [
    shareId,
  ]);

  const text = post?.body?.slice(0, 180) ?? "Create once. Reach everywhere.";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px",
          background: "#0a0b14",
          backgroundImage:
            "radial-gradient(circle at 15% 15%, rgba(124,58,237,0.35), transparent 45%), radial-gradient(circle at 85% 10%, rgba(34,211,238,0.3), transparent 45%)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <div
            style={{
              width: 40,
              height: 40,
              borderRadius: 10,
              background: "linear-gradient(120deg, #7C3AED, #22D3EE)",
            }}
          />
          <span style={{ fontSize: 28, fontWeight: 600, color: "#F4F3F8" }}>virello</span>
        </div>
        <div
          style={{
            fontSize: 44,
            fontWeight: 600,
            color: "#F4F3F8",
            lineHeight: 1.3,
            display: "flex",
          }}
        >
          {text}
        </div>
        <div style={{ fontSize: 20, color: "#8B8A99" }}>Posted across 7 platforms with Virello</div>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
