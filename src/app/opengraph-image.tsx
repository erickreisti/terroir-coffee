import { ImageResponse } from "next/og";

export const alt = "Terroir Coffee Co. — Cafés especiais de micro-lotes";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Imagem de prévia ao compartilhar o link (WhatsApp, LinkedIn, X...)
export default function OpengraphImage() {
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
          color: "#f9f6f0",
          backgroundColor: "#160b06",
          backgroundImage:
            "radial-gradient(ellipse 60% 70% at 85% 20%, rgba(184,115,51,0.45) 0%, transparent 70%), radial-gradient(ellipse 50% 60% at 10% 100%, rgba(139,69,19,0.35) 0%, transparent 70%)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", fontSize: 30, letterSpacing: "0.3em", fontWeight: 700 }}>
          TERROIR<span style={{ color: "#f0c48f" }}>.</span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div style={{ fontSize: 22, letterSpacing: "0.3em", textTransform: "uppercase", color: "#f0c48f" }}>
            Cafés especiais · Micro-lotes
          </div>
          <div style={{ display: "flex", flexDirection: "column", fontSize: 88, fontWeight: 700, lineHeight: 1.02, letterSpacing: "-0.02em" }}>
            <span>Da fazenda</span>
            <span style={{ color: "#f0c48f" }}>à sua xícara.</span>
          </div>
        </div>

        <div style={{ display: "flex", fontSize: 24, color: "rgba(249,246,240,0.7)" }}>
          Assinaturas, acessórios e um quiz para achar o seu café.
        </div>
      </div>
    ),
    size,
  );
}
