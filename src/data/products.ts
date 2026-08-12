/**
 * Katalog etalase produk Presisi.
 * Satu sumber data — tambah/ubah item di sini, section landing ikut update.
 *
 * | id            | demo live                          | source mono     |
 * |---------------|------------------------------------|-----------------|
 * | company-profile | https://custom-web-eight.vercel.app/ | custom-web    |
 * | web-app         | https://custom-app-sigma.vercel.app/ | custom-app    |
 */
export type Product = {
  id: "company-profile" | "web-app";
  name: string;
  kindLabel: string;
  tagline: string;
  description: string;
  /** Live demo (Vercel etalase) */
  demoUrl: string;
  /** Folder mono-repo di workspace (untuk tim) */
  source: "custom-web" | "custom-app";
  tags: string[];
  highlights: string[];
  /** Swatch visual di preview card */
  accent: string;
  accentSoft: string;
  previewLabel: string;
  /** Catatan singkat di kartu (opsional), mis. rekomendasi desktop */
  notice?: string;
  /** Harga mulai dari (opsional), ditampilkan di kartu */
  priceFrom?: string;
};

export const products: Product[] = [
  {
    id: "company-profile",
    name: "Custom Company Profile",
    kindLabel: "Website / Landing",
    tagline: "Profil perusahaan yang siap dikustom.",
    description:
      "Template landing multi-halaman: beranda, tentang, program, kontak, dan daftar. Token brand, copy, dan CTA diganti sesuai klien—ideal untuk etalase company profile.",
    demoUrl: "https://custom-web-eight.vercel.app/",
    source: "custom-web",
    tags: ["Display ini hanya contoh", "Design 100% pilihan customer"],
    highlights: [
      "Multi-page siap pakai",
      "Konten lewat token brand",
      "Form kontak & daftar via WA",
    ],
    accent: "#0f766e",
    accentSoft: "#d5f0ed",
    previewLabel: "Company Profile",
    priceFrom: "Start from Rp 500K",
  },
  {
    id: "web-app",
    name: "Custom Web App",
    kindLabel: "Web Application",
    tagline: "LMS & portal operasional institusi.",
    description:
      "Sistem web kustom (contoh: LPK LMS) dengan role guru/staf, siswa, guest/mitra, dan super admin—dashboard, progress, dokumen, hingga etalase kualifikasi.",
    demoUrl: "https://custom-app-sigma.vercel.app/",
    source: "custom-app",
    tags: ["Isi sesuai request", "Modul & alur mengikuti kebutuhan"],
    highlights: [
      "Multi-role (admin, staf, siswa, mitra)",
      "Panel operasional harian",
      "Etalase peserta untuk mitra",
    ],
    accent: "#018dff",
    accentSoft: "#e8f4ff",
    previewLabel: "Web App · LMS",
    notice: "Better experience on desktop",
    priceFrom: "Price depends on request",
  },
] as const;

export function getProduct(id: Product["id"]) {
  return products.find((p) => p.id === id);
}
