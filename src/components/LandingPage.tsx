import Image from "next/image";
import { ChevronDown } from "lucide-react";
import ProductsSection from "@/components/ProductsSection";
import HorizontalSnapCarousel from "@/components/HorizontalSnapCarousel";
import ContactProposalForm from "@/components/ContactProposalForm";
import { products } from "@/data/products";

const pillars = [
  {
    title: "Simple",
    tagline: "Tidak perlu rumit untuk menjadi powerful.",
    body: "Kami membangun alur yang jelas dan mudah digunakan, bahkan untuk pengguna pertama kali.",
  },
  {
    title: "Secure",
    tagline: "Security bukan fitur tambahan.",
    body: "Akses, data, dan infrastruktur dirancang dengan keamanan sebagai bagian dari proses sejak awal.",
  },
  {
    title: "Fast",
    tagline: "Setiap detik diperhitungkan.",
    body: "Kami membangun sistem yang ringan, responsif, dan siap menangani pertumbuhan penggunaan.",
  },
  {
    title: "Flexible",
    tagline: "Bisnis berubah. Sistem harus ikut berkembang.",
    body: "Arsitektur, role, data, dan workflow dirancang agar dapat disesuaikan ketika kebutuhan berubah.",
  },
  {
    title: "Delightful",
    tagline: "Good UX terasa tanpa perlu dijelaskan.",
    body: "Kami menghilangkan friksi dari setiap interaksi agar pengguna dapat menyelesaikan pekerjaan dengan lebih mudah.",
  },
] as const;

const faqs = [
  {
    q: "Apakah bisa mulai dari landing page dulu?",
    a: "Bisa. Banyak klien memulai dari identitas digital, lalu naik ke aplikasi kustom saat alur bisnis matang.",
  },
  {
    q: "Apakah maintenance tersedia untuk sistem pihak lain?",
    a: "Tidak. Kami hanya merawat sistem yang kami bangun sendiri agar kualitas dan keamanan tetap utuh.",
  },
  {
    q: "Berapa lama rata-rata pengerjaan?",
    a: "Landing page: 1–3 minggu. Web App: 4–12 minggu, tergantung modul, dengan milestone jelas.",
  },
  {
    q: "Apakah source code dan akses diserahkan ke kami?",
    a: "Ya. Setelah serah terima, dokumentasi, akses, dan code base berada di pihak Anda agar tim dapat mengoperasikan sistem secara mandiri.",
  },
] as const;

/**
 * HD iPhone emoji — random-looking scatter, non-overlapping by construction.
 * Motion runs on an INNER .emoji-float layer so placement never kills animation.
 */
const HD = (name: string) => `/assets/emoji-hd/${name}.png`;

type EmojiSpec = {
  src: string;
  bg: string;
  halo: string;
  top: string;
  left: string;
  size: "sm" | "md" | "lg";
  duration: string;
  delay: string;
  amp: string;
};

/** Left constellation — % coords leave ≥22% gaps between centers */
const leftBubbles: EmojiSpec[] = [
  { src: HD("star-eyes"), bg: "#DCEBFF", halo: "#EAF3FF", top: "2%", left: "48%", size: "lg", duration: "3.2s", delay: "0s", amp: "-22px" },
  { src: HD("robot"), bg: "#EDE4FF", halo: "#F4EEFF", top: "8%", left: "8%", size: "sm", duration: "3.8s", delay: "0.4s", amp: "-16px" },
  { src: HD("octopus"), bg: "#FFE4D6", halo: "#FFF0E8", top: "32%", left: "58%", size: "md", duration: "3.5s", delay: "0.2s", amp: "-20px" },
  { src: HD("virus"), bg: "#FFE0EA", halo: "#FFF0F5", top: "36%", left: "4%", size: "sm", duration: "4.1s", delay: "0.7s", amp: "-18px" },
  { src: HD("graduated-man"), bg: "#D8F7E8", halo: "#EAFBF2", top: "58%", left: "28%", size: "md", duration: "3.6s", delay: "0.15s", amp: "-19px" },
  { src: HD("cold"), bg: "#D9F4FF", halo: "#EAF9FF", top: "68%", left: "62%", size: "sm", duration: "4.4s", delay: "0.55s", amp: "-15px" },
  { src: HD("horse"), bg: "#FFF1D6", halo: "#FFF7E8", top: "82%", left: "12%", size: "md", duration: "3.9s", delay: "0.3s", amp: "-21px" },
];

/** Right constellation — separate set, scattered, non-overlapping */
const rightBubbles: EmojiSpec[] = [
  { src: HD("handshake"), bg: "#FFF0D8", halo: "#FFF7EA", top: "4%", left: "6%", size: "md", duration: "3.4s", delay: "0.1s", amp: "-20px" },
  { src: HD("people"), bg: "#FFF0F5", halo: "#FFF6FA", top: "6%", left: "56%", size: "sm", duration: "4s", delay: "0.5s", amp: "-16px" },
  { src: HD("party-face"), bg: "#D6F6E5", halo: "#E8FAF1", top: "30%", left: "24%", size: "lg", duration: "3.3s", delay: "0.25s", amp: "-22px" },
  { src: HD("exploding-face"), bg: "#FFE8D4", halo: "#FFF3EA", top: "34%", left: "68%", size: "sm", duration: "3.7s", delay: "0.65s", amp: "-17px" },
  { src: HD("whale"), bg: "#DCEBFF", halo: "#EAF3FF", top: "56%", left: "2%", size: "md", duration: "4.2s", delay: "0.05s", amp: "-19px" },
  { src: HD("alien"), bg: "#E0FFF0", halo: "#EEFFF6", top: "62%", left: "52%", size: "sm", duration: "3.8s", delay: "0.8s", amp: "-15px" },
  { src: HD("loud-cry"), bg: "#E4E8FF", halo: "#F0F2FF", top: "84%", left: "28%", size: "md", duration: "3.6s", delay: "0.35s", amp: "-18px" },
];

const mobileBubbles: Omit<EmojiSpec, "top" | "left">[] = [
  { src: HD("star-eyes"), bg: "#DCEBFF", halo: "#EAF3FF", size: "lg", duration: "3.2s", delay: "0s", amp: "-14px" },
  { src: HD("handshake"), bg: "#FFF0D8", halo: "#FFF7EA", size: "md", duration: "3.6s", delay: "0.2s", amp: "-12px" },
  { src: HD("party-face"), bg: "#D6F6E5", halo: "#E8FAF1", size: "md", duration: "3.4s", delay: "0.4s", amp: "-15px" },
  { src: HD("whale"), bg: "#DCEBFF", halo: "#EAF3FF", size: "sm", duration: "3.9s", delay: "0.15s", amp: "-13px" },
  { src: HD("robot"), bg: "#EDE4FF", halo: "#F4EEFF", size: "sm", duration: "3.5s", delay: "0.55s", amp: "-14px" },
];

function EmojiBubble({
  src,
  bg,
  halo,
  size = "md",
  duration = "3.5s",
  delay = "0s",
  amp = "-18px",
  top,
  left,
  mode = "absolute",
}: {
  src: string;
  bg: string;
  halo: string;
  size?: "sm" | "md" | "lg";
  duration?: string;
  delay?: string;
  amp?: string;
  top?: string;
  left?: string;
  mode?: "absolute" | "inline";
}) {
  return (
    <div
      className={`emoji-orbit emoji-orbit--${size} ${
        mode === "inline" ? "emoji-orbit--inline" : ""
      }`}
      style={
        mode === "absolute"
          ? { top, left }
          : undefined
      }
    >
      {/* Motion layer — never share transform with absolute placement */}
      <div
        className="emoji-float"
        style={{
          background: bg,
          ["--halo" as string]: halo,
          ["--amp" as string]: amp,
          animationDuration: duration,
          animationDelay: delay,
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={src} alt="" draggable={false} decoding="async" />
      </div>
    </div>
  );
}

function Star({ size = 18, className = "" }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden
    >
      <path d="M12 0.8 14.2 9.8 23.2 12 14.2 14.2 12 23.2 9.8 14.2 0.8 12 9.8 9.8Z" />
    </svg>
  );
}

function HeroDecor() {
  return (
    <div className="hero-decor" aria-hidden>
      {/* Soft pastel blobs — reference art “halos” */}
      <span
        className="hero-decor-item hero-blob"
        style={{
          top: "8%",
          left: "6%",
          width: 120,
          height: 120,
          background: "#EAF3FF",
          ["--dur" as string]: "8s",
          ["--delay" as string]: "0.2s",
        }}
      />
      <span
        className="hero-decor-item hero-blob"
        style={{
          top: "62%",
          left: "12%",
          width: 88,
          height: 88,
          background: "#FFF0E8",
          ["--dur" as string]: "7s",
        }}
      />
      <span
        className="hero-decor-item hero-blob"
        style={{
          top: "18%",
          right: "8%",
          width: 104,
          height: 104,
          background: "#EAFBF2",
          ["--dur" as string]: "9s",
          ["--delay" as string]: "0.4s",
        }}
      />
      <span
        className="hero-decor-item hero-blob"
        style={{
          top: "70%",
          right: "14%",
          width: 76,
          height: 76,
          background: "#FFF4DC",
          ["--dur" as string]: "6.5s",
        }}
      />
      <span
        className="hero-decor-item hero-blob"
        style={{
          top: "42%",
          left: "42%",
          width: 160,
          height: 160,
          background: "#F7F4EE",
          opacity: 0.7,
          ["--dur" as string]: "10s",
        }}
      />

      {/* Sparkles / 4-point stars */}
      <span className="hero-decor-item hero-star" style={{ top: "12%", left: "28%", color: "#F0D48A", ["--delay" as string]: "0.1s" }}>
        <Star size={16} />
      </span>
      <span className="hero-decor-item hero-star" style={{ top: "28%", left: "8%", color: "#FFB4C8", ["--delay" as string]: "0.5s" }}>
        <Star size={12} />
      </span>
      <span className="hero-decor-item hero-star" style={{ top: "8%", right: "26%", color: "#9ED3FF", ["--delay" as string]: "0.3s" }}>
        <Star size={18} />
      </span>
      <span className="hero-decor-item hero-star" style={{ top: "55%", right: "6%", color: "#F0D48A", ["--delay" as string]: "0.8s" }}>
        <Star size={14} />
      </span>
      <span className="hero-decor-item hero-star" style={{ top: "78%", left: "40%", color: "#A8E6C3", ["--delay" as string]: "0.2s" }}>
        <Star size={11} />
      </span>
      <span className="hero-decor-item hero-star" style={{ top: "20%", right: "38%", color: "#FFD38A", ["--delay" as string]: "1s" }}>
        <Star size={10} />
      </span>
      <span className="hero-decor-item hero-star" style={{ top: "85%", right: "32%", color: "#C5B6FF", ["--delay" as string]: "0.45s" }}>
        <Star size={13} />
      </span>

      {/* Colored confetti dots */}
      {(
        [
          { t: "16%", l: "22%", c: "#34C759", s: 8 },
          { t: "36%", l: "3%", c: "#018DFF", s: 6 },
          { t: "70%", l: "28%", c: "#FF6B6B", s: 7 },
          { t: "14%", r: "18%", c: "#F966AC", s: 9 },
          { t: "48%", r: "28%", c: "#F5C842", s: 6 },
          { t: "82%", r: "22%", c: "#018DFF", s: 8 },
          { t: "58%", l: "48%", c: "#F0C040", s: 5 },
          { t: "90%", l: "18%", c: "#44C67F", s: 6 },
        ] as const
      ).map((d, i) => (
        <span
          key={i}
          className="hero-decor-item hero-dot"
          style={{
            top: d.t,
            left: "l" in d ? d.l : undefined,
            right: "r" in d ? d.r : undefined,
            width: d.s,
            height: d.s,
            background: d.c,
            ["--delay" as string]: `${i * 0.11}s`,
            ["--dur" as string]: `${5.5 + (i % 3)}s`,
          }}
        />
      ))}

      {/* Mini flat icons (busy art language like references) */}
      <span
        className="hero-decor-item hero-icon-chip"
        style={{
          top: "86%",
          left: "4%",
          width: 42,
          height: 42,
          background: "#E8F8EF",
          transform: "rotate(-12deg)",
          ["--delay" as string]: "0.35s",
        }}
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
          <path d="M5 13l4 4L19 7" stroke="#34C759" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
      <span
        className="hero-decor-item hero-icon-chip"
        style={{
          top: "88%",
          right: "8%",
          width: 44,
          height: 44,
          background: "#EAF3FF",
          transform: "rotate(10deg)",
          ["--delay" as string]: "0.55s",
        }}
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
          <circle cx="11" cy="11" r="6.5" stroke="#018DFF" strokeWidth="2.4" />
          <path d="M16 16l4.2 4.2" stroke="#018DFF" strokeWidth="2.4" strokeLinecap="round" />
        </svg>
      </span>
      <span
        className="hero-decor-item hero-icon-chip"
        style={{
          top: "76%",
          right: "5%",
          width: 40,
          height: 40,
          background: "#FFE8EE",
          transform: "rotate(8deg)",
          ["--delay" as string]: "0.2s",
        }}
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="#FF5A7A" aria-hidden>
          <path d="M12 21s-7-4.4-9.3-8.1C.7 9.7 2.4 6.5 5.6 6c1.7-.3 3.3.5 4.2 1.8C10.7 6.5 12.3 5.7 14 6c3.2.5 4.9 3.7 2.9 6.9C19 16.6 12 21 12 21z" />
        </svg>
      </span>
      <span
        className="hero-decor-item hero-icon-chip"
        style={{
          top: "82%",
          left: "6%",
          width: 46,
          height: 46,
          background: "#FFF3DC",
          transform: "rotate(-8deg)",
          ["--delay" as string]: "0.7s",
        }}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
          <path d="M4 14l8-10 2.5 6H20l-8 10-1.5-6H4z" fill="#FF6A3D" />
        </svg>
      </span>
      <span
        className="hero-decor-item hero-icon-chip"
        style={{
          top: "48%",
          right: "2%",
          width: 40,
          height: 40,
          background: "#F0ECFF",
          transform: "rotate(-6deg)",
          ["--delay" as string]: "0.9s",
        }}
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
          <path d="M4 12h12M12 6l6 6-6 6" stroke="#5F5DE7" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
      <span
        className="hero-decor-item hero-icon-chip"
        style={{
          top: "88%",
          left: "8%",
          width: 38,
          height: 38,
          background: "#EAF9FF",
          transform: "rotate(14deg)",
          ["--delay" as string]: "0.15s",
        }}
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
          <path d="M4 10l16-5-5 16-3-7-8-4z" fill="#018DFF" />
        </svg>
      </span>
      <span
        className="hero-decor-item hero-icon-chip"
        style={{
          bottom: "6%",
          left: "46%",
          width: 40,
          height: 40,
          background: "#FFF0D6",
          transform: "rotate(-4deg)",
          ["--delay" as string]: "0.65s",
        }}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
          <rect x="5" y="10" width="14" height="10" rx="2" stroke="#CA9230" strokeWidth="2.2" />
          <path d="M8 10V8a4 4 0 0 1 8 0v2" stroke="#CA9230" strokeWidth="2.2" strokeLinecap="round" />
        </svg>
      </span>
    </div>
  );
}

export default function LandingPage() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-white">
      {/* Floating glass nav — logo once, clear of emojis */}
      <header className="pointer-events-none fixed inset-x-0 top-0 z-[60] flex justify-center px-4 pt-4 sm:pt-5">
        <nav className="glass-nav pointer-events-auto" aria-label="Utama">
          <a href="#" className="glass-nav-brand" aria-label="Presisi — beranda">
            <Image
              src="/brand/logo-nav.png"
              alt="Presisi"
              width={160}
              height={40}
              priority
              className="glass-nav-logo"
            />
          </a>
          <span className="glass-nav-sep" aria-hidden />
          {[
            ["#products", "Products"],
            ["#explore", "Resources"],
            ["#faq", "Support"],
          ].map(([href, label]) => (
            <a key={href} href={href} className="glass-nav-link">
              {label}
            </a>
          ))}
        </nav>
      </header>

      <main>
        {/* HERO — floating HD emoji + motion, 2-line title */}
        <section className="hero-stage px-4 pb-20 pt-[7.5rem] max-[580px]:pb-12 max-[580px]:pt-[6.5rem] sm:px-6 sm:pt-36">
          <HeroDecor />

          {/* Mobile emoji strip — floating */}
          <div
            className="relative z-[1] mb-8 flex items-center justify-center gap-4 lg:hidden"
            aria-hidden
          >
            {mobileBubbles.map((b) => (
              <EmojiBubble key={`${b.src}-m`} mode="inline" {...b} />
            ))}
          </div>

          <div className="relative z-[1] mx-auto grid max-w-[74rem] items-center gap-2 lg:grid-cols-[minmax(0,1fr)_minmax(0,34rem)_minmax(0,1fr)] xl:grid-cols-[minmax(0,1.05fr)_minmax(0,36rem)_minmax(0,1.05fr)] xl:gap-4">
            {/* Left scatter + float */}
            <div className="emoji-field hidden lg:block" aria-hidden>
              {leftBubbles.map((b) => (
                <EmojiBubble key={`${b.src}-l`} mode="absolute" {...b} />
              ))}
            </div>

            {/* Center — exactly 2 title lines on desktop */}
            <div className="relative z-10 mx-auto w-full max-w-[36rem] text-center">
              <p
                className="mb-3 text-[1.05rem] font-medium tracking-[0.2em] text-[var(--body-muted)] sm:mb-4 sm:text-[1.15rem]"
                style={{
                  fontFamily: "var(--font-brand)",
                  animation:
                    "family-word-in 0.7s cubic-bezier(0.19,1,0.22,1) 0s both",
                }}
                lang="ja"
              >
                こんにちは
              </p>
              <h1 className="family-hero-title">
                <span className="family-hero-line">
                  <span
                    className="family-hero-word"
                    style={{ ["--d" as string]: "0.05s" }}
                  >
                    Your
                  </span>{" "}
                  <span
                    className="family-hero-word"
                    style={{ ["--d" as string]: "0.12s" }}
                  >
                    favorite
                  </span>
                </span>
                <span className="family-hero-line">
                  <span
                    className="family-hero-word"
                    style={{ ["--d" as string]: "0.2s" }}
                  >
                    digital
                  </span>{" "}
                  <span
                    className="family-hero-word"
                    style={{ ["--d" as string]: "0.28s" }}
                  >
                    partner.
                  </span>
                </span>
              </h1>
              <p
                className="family-hero-sub mt-2"
                style={{
                  animation:
                    "family-word-in 0.7s cubic-bezier(0.19,1,0.22,1) 0.35s both",
                }}
              >
                Digitalisasi system institusi Anda. Bangun company
                profile, landing page, LMS, dan aplikasi kustom yang
                mengefisienkan operasional.
              </p>
            </div>

            {/* Right scatter + float */}
            <div className="emoji-field hidden lg:block" aria-hidden>
              {rightBubbles.map((b) => (
                <EmojiBubble key={`${b.src}-r`} mode="absolute" {...b} />
              ))}
            </div>
          </div>
        </section>

        {/* EXPLORE — glass tiles: swipe + arrow + IG-style center on mobile */}
        <section id="explore" className="glass-stage py-20 md:py-28">
          <div className="mx-auto max-w-[72rem] px-[var(--h-pad)]">
            <h2
              className="f-reveal mx-auto max-w-[36rem] text-center text-[32px] font-medium leading-[35px] tracking-[-0.69px] text-[var(--heading)] sm:text-[44px] sm:leading-[48px] sm:tracking-[-1.35px]"
              style={{ fontFamily: "var(--font-brand)" }}
            >
              Bangun system digital
              <br className="hidden sm:block" />
              dengan cara yang baru.
            </h2>
            <p className="mt-3 text-center text-xs font-medium text-[var(--body-muted)] lg:hidden">
              Geser atau pakai panah kiri / kanan
            </p>
          </div>

          <div className="relative mt-8 lg:mt-12">
            <HorizontalSnapCarousel
              ariaLabel="Langkah proses"
              cardWidth="min(78vw, 19.5rem)"
              gapPx={12}
              desktopGridClass="lg:grid-cols-4"
            >
              {[
                {
                  t: "Discuss",
                  sub: "Start with clarity.",
                  d: "Tujuan, kebutuhan, ruang lingkup, dan alur kerja disepakati sebelum kami mulai membangun.",
                  n: "01",
                  img: "/assets/process/discuss.png",
                },
                {
                  t: "Design",
                  sub: "Make it make sense.",
                  d: "Kami merancang struktur, interface, dan identitas visual yang jelas, konsisten, dan mudah digunakan.",
                  n: "02",
                  img: "/assets/process/design.png",
                },
                {
                  t: "Build",
                  sub: "Turn ideas into systems.",
                  d: "Kami membangun LMS, landing page, dan aplikasi kustom dari konsep hingga siap digunakan.",
                  n: "03",
                  img: "/assets/process/build.png",
                },
                {
                  t: "Care",
                  sub: "Built to keep running.",
                  d: "Maintenance, monitoring, security, dan improvement untuk sistem yang kami bangun.",
                  n: "04",
                  img: "/assets/process/care.png",
                },
              ].map((item) => (
                <article key={item.t} className="f-reveal glass-card h-full">
                  <div className="glass-card-media relative aspect-[4/3]">
                    <Image
                      src={item.img}
                      alt={item.t}
                      fill
                      className="object-cover object-center transition-transform duration-500 group-hover:scale-[1.03]"
                      sizes="(max-width:1024px) 78vw, 25vw"
                    />
                    <span className="glass-chip absolute left-3 top-3 z-[2] px-2.5 py-1 text-[11px] tracking-wide">
                      {item.n}
                    </span>
                  </div>
                  <div className="p-5 pt-4">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[var(--body-muted)]">
                      {item.n} — {item.t}
                    </p>
                    <h3 className="mt-1.5 text-lg font-semibold tracking-tight text-[var(--heading)]">
                      {item.sub}
                    </h3>
                    <p className="mt-1.5 text-[0.9rem] leading-relaxed text-[var(--body-muted)]">
                      {item.d}
                    </p>
                  </div>
                </article>
              ))}
            </HorizontalSnapCarousel>
          </div>
        </section>

        {/* PILLARS — mobile carousel, desktop 5-col */}
        <section className="border-y border-black/[0.05] bg-[var(--beige)] py-10 lg:py-0">
          <p className="mb-5 px-[var(--h-pad)] text-center text-xs font-medium text-[var(--body-muted)] lg:hidden">
            Nilai kami · geser atau panah kiri / kanan
          </p>
          <HorizontalSnapCarousel
            ariaLabel="Nilai Product"
            cardWidth="min(78vw, 17.5rem)"
            gapPx={12}
            desktopGridClass="lg:grid-cols-5 lg:gap-0 lg:divide-x lg:divide-black/[0.05]"
            trackClassName="lg:max-w-[72rem]"
          >
            {pillars.map((p, i) => (
              <div
                key={p.title}
                className="f-reveal flex h-full flex-col rounded-[1.35rem] border border-black/[0.05] bg-white px-5 py-6 shadow-[0_10px_30px_-20px_rgba(52,52,51,0.25)] lg:rounded-none lg:border-0 lg:bg-transparent lg:px-6 lg:py-12 lg:shadow-none"
              >
                <p className="text-[11px] font-semibold tracking-[0.12em] text-[var(--body-muted)] lg:hidden">
                  {String(i + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-1 text-[1.25rem] font-semibold tracking-tight text-[var(--heading)] lg:mt-0 lg:text-[1.2rem]">
                  {p.title}
                </h3>
                <p className="mt-2 text-[0.9rem] font-medium leading-snug text-[var(--heading)] sm:mt-3 sm:text-[0.95rem]">
                  {p.tagline}
                </p>
                <p className="mt-2 text-[0.85rem] leading-relaxed text-[var(--body-muted)] sm:text-[0.9rem]">
                  {p.body}
                </p>
              </div>
            ))}
          </HorizontalSnapCarousel>
        </section>

        <ProductsSection />

        {/* FAQ */}
        <section id="faq" className="border-y border-black/[0.05] bg-[var(--beige)] py-20 md:py-28">
          <div className="mx-auto max-w-2xl px-[var(--h-pad)]">
            <h2 className="f-reveal text-center text-[1.85rem] font-semibold tracking-[-0.03em] sm:text-4xl">
              Frequently Asked Questions
            </h2>
            <div className="mt-10 space-y-2.5">
              {faqs.map((item) => (
                <details
                  key={item.q}
                  className="faq-item f-reveal group rounded-[1.15rem] bg-white px-5 f-shadow"
                >
                  <summary className="flex items-center justify-between gap-4 py-4 text-left text-[0.95rem] font-semibold tracking-tight text-[var(--heading)]">
                    {item.q}
                    <ChevronDown className="faq-chevron h-4 w-4 shrink-0 text-[var(--body-muted)] transition-transform duration-200" />
                  </summary>
                  <p className="pb-5 text-[0.9rem] leading-relaxed text-[var(--body-muted)]">
                    {item.a}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* CONTACT → WhatsApp */}
        <section id="kontak" className="px-[var(--h-pad)] py-20 md:py-28">
          <div className="f-reveal mx-auto max-w-xl rounded-[1.75rem] border border-black/[0.05] bg-white p-8 f-shadow-lg sm:p-10 md:p-12">
            <h2 className="text-[1.75rem] font-semibold tracking-[-0.03em] text-[var(--heading)] sm:text-3xl">
              Upgrade my system
            </h2>
            <p className="mt-3 text-[0.95rem] leading-relaxed text-[var(--body-muted)]">
              Ceritakan sistem atau kebutuhan Anda—kami bantu tingkatkan.
              Submit langsung mengarah ke WhatsApp.
            </p>
            <ContactProposalForm />
          </div>
        </section>
      </main>

      <footer className="border-t border-black/[0.05]">
        <div className="mx-auto flex max-w-[72rem] flex-col gap-10 px-[var(--h-pad)] py-14 md:flex-row md:justify-between">
          <div>
            <a href="#" className="inline-block">
              <Image
                src="/brand/logo.png"
                alt="Presisi"
                width={160}
                height={48}
                className="h-8 w-auto object-contain object-left"
              />
            </a>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-[var(--body-muted)]">
              Your favorite digital partner.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-10 sm:grid-cols-3">
            <div>
              <p className="text-xs font-semibold tracking-wide text-[var(--body-muted)]">
                Product
              </p>
              <ul className="mt-3 space-y-2 text-sm text-[var(--heading)]">
                {products.map((p) => (
                  <li key={p.id}>
                    <a
                      href={p.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:opacity-60"
                    >
                      {p.name}
                    </a>
                  </li>
                ))}
                <li>
                  <a href="#products" className="hover:opacity-60">
                    All products
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <p className="text-xs font-semibold tracking-wide text-[var(--body-muted)]">
                Company
              </p>
              <ul className="mt-3 space-y-2 text-sm text-[var(--heading)]">
                <li>
                  <a href="#kontak" className="hover:opacity-60">
                    Kontak
                  </a>
                </li>
                <li>
                  <a href="#faq" className="hover:opacity-60">
                    FAQ
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <p className="text-xs font-semibold tracking-wide text-[var(--body-muted)]">
                Status
              </p>
              <p className="mt-3 flex items-center gap-2 text-sm text-[var(--heading)]">
                <span className="f-pulse h-2 w-2 rounded-full bg-[var(--app-green)]" />
                System Status: Normal
              </p>
            </div>
          </div>
        </div>
        <div className="border-t border-black/[0.05]">
          <div className="mx-auto flex max-w-[72rem] justify-between px-[var(--h-pad)] py-5 text-xs text-[var(--body-muted)]">
            <p>© 2026 Presisi. All rights reserved.</p>
            <p className="hidden sm:block">Built with care.</p>
          </div>
        </div>
      </footer>

      {/* Floating WhatsApp */}
      <a
        href="https://wa.me/6282295495489"
        target="_blank"
        rel="noopener noreferrer"
        className="wa-float"
        aria-label="Chat WhatsApp 082295495489"
      >
        <svg viewBox="0 0 32 32" width="28" height="28" aria-hidden fill="currentColor">
          <path d="M16.04 3C9.4 3 4 8.35 4 14.92c0 2.1.55 4.14 1.6 5.95L4 29l8.35-1.53a12.2 12.2 0 0 0 3.69.57c6.64 0 12.04-5.35 12.04-11.92C28.08 8.35 22.68 3 16.04 3zm0 21.73c-1.15 0-2.28-.28-3.28-.82l-.24-.13-4.95.9.94-4.75-.15-.25a9.66 9.66 0 0 1-1.49-5.15c0-5.37 4.44-9.74 9.9-9.74s9.9 4.37 9.9 9.74-4.44 9.74-9.9 9.74zm5.43-7.29c-.3-.15-1.76-.86-2.03-.96-.27-.1-.47-.15-.67.15-.2.3-.77.96-.94 1.16-.17.2-.35.22-.64.07-.3-.15-1.25-.45-2.38-1.45-.88-.77-1.47-1.72-1.64-2.01-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.6-.92-2.19-.24-.57-.49-.49-.67-.5h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.01-1.04 2.46s1.07 2.85 1.22 3.05c.15.2 2.1 3.16 5.08 4.43.71.3 1.26.48 1.69.62.71.23 1.36.2 1.87.12.57-.08 1.76-.71 2.01-1.4.25-.69.25-1.28.17-1.4-.07-.13-.27-.2-.57-.35z" />
        </svg>
      </a>
    </div>
  );
}
