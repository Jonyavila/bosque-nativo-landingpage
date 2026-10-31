import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Bosque Nativo — Un refugio para volver a lo esencial",
  description:
    "Cabañas entre árboles, senderos guiados y noches bajo las estrellas. Descubrí Bosque Nativo y reservá tu próxima escapada.",
  applicationName: "Bosque Nativo",
  keywords: ["cabañas", "bosque nativo", "naturaleza", "escapada", "senderismo"],
  openGraph: {
    title: "Bosque Nativo — Un refugio para volver a lo esencial",
    description: "Una pausa entre árboles. Experiencias para reconectar.",
    locale: "es_AR",
    type: "website",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}