import { Providers } from "@/components/providers";
import "./globals.css";

export const metadata = {
  title: "Codex Software Template",
  description: "Base moderna para desenvolvimento de software.",
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
