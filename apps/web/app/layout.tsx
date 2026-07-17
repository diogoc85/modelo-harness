import { Providers } from "@/components/providers";
import "./globals.css";

export const metadata = {
  title: "Antigravity App",
  description: "Construído via Harness e Gemini",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className="antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
