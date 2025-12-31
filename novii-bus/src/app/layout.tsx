import type { Metadata } from "next"
import "./globals.css";

export const metadata: Metadata = {
  title: "TemanBus - Booking Bus Online Sulawesi",
  description: "Pesan tiket bus Anda dengan mudah dan cepat di seluruh wilayah Sulawesi",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
