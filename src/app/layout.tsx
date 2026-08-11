import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ICTB Dev",
  description:
    "Kami merancang dan membangun ekosistem aplikasi web kustom—dari LMS terintegrasi hingga profil perusahaan—dengan kecepatan tinggi dan struktur data yang presisi.",
  icons: {
    icon: "/brand/logo.png",
    apple: "/brand/logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body>{children}</body>
    </html>
  );
}
