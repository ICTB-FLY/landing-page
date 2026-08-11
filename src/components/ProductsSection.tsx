"use client";

import { ArrowUpRight } from "lucide-react";
import { products, type Product } from "@/data/products";
import HorizontalSnapCarousel from "@/components/HorizontalSnapCarousel";

function ProductPreview({ product }: { product: Product }) {
  return (
    <div className="relative overflow-hidden rounded-[1.25rem] border border-white/60 bg-white/25 shadow-[inset_0_1px_0_rgb(255_255_255_/_0.7)] backdrop-blur-md">
      <div className="flex items-center gap-2 border-b border-white/50 bg-white/40 px-3 py-2.5 backdrop-blur-md">
        <span className="flex gap-1.5" aria-hidden>
          <span className="h-2 w-2 rounded-full bg-[#ff5f57]/90" />
          <span className="h-2 w-2 rounded-full bg-[#febc2e]/90" />
          <span className="h-2 w-2 rounded-full bg-[#28c840]/90" />
        </span>
        <div className="glass-chip min-w-0 flex-1 truncate px-3 py-1 text-center text-[10px] font-medium tracking-wide text-[var(--body-muted)] sm:text-[11px]">
          {product.demoUrl.replace(/^https?:\/\//, "").replace(/\/$/, "")}
        </div>
      </div>

      <div className="relative aspect-[16/10] sm:aspect-[16/9]">
        <div
          className="absolute inset-0"
          style={{
            background: `radial-gradient(ellipse 80% 70% at 20% 20%, ${product.accent}40, transparent 55%),
              radial-gradient(ellipse 60% 50% at 85% 75%, ${product.accent}28, transparent 50%),
              linear-gradient(160deg, rgb(255 255 255 / 0.55) 0%, ${product.accentSoft}99 100%)`,
          }}
        />

        <div className="absolute inset-4 sm:inset-6 flex flex-col gap-2.5 rounded-xl border border-white/65 bg-white/35 p-3 shadow-[0_16px_40px_-24px_rgba(0,0,0,0.25)] backdrop-blur-md sm:p-4">
          <div className="flex items-center justify-between gap-2">
            <div
              className="h-2.5 w-16 rounded-full sm:w-20"
              style={{ background: product.accent }}
            />
            <div className="flex gap-1.5">
              <div className="h-2 w-8 rounded-full bg-white/50" />
              <div className="h-2 w-8 rounded-full bg-white/50" />
              <div className="h-2 w-10 rounded-full bg-white/50" />
            </div>
          </div>
          <div className="mt-1 grid flex-1 grid-cols-3 gap-2">
            <div className="col-span-2 rounded-lg border border-white/50 bg-white/45 p-2.5 backdrop-blur-sm">
              <div className="mb-2 h-2 w-1/2 rounded-full bg-black/10" />
              <div className="space-y-1.5">
                <div className="h-1.5 w-full rounded-full bg-black/[0.06]" />
                <div className="h-1.5 w-4/5 rounded-full bg-black/[0.06]" />
                <div className="h-1.5 w-3/5 rounded-full bg-black/[0.06]" />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <div
                className="flex-1 rounded-lg border border-white/40 opacity-90"
                style={{ background: `${product.accent}30` }}
              />
              <div className="h-8 rounded-lg border border-white/50 bg-white/45 backdrop-blur-sm" />
            </div>
          </div>
          <p
            className="text-center text-[11px] font-semibold tracking-wide sm:text-xs"
            style={{ color: product.accent }}
          >
            {product.previewLabel}
          </p>
        </div>
      </div>
    </div>
  );
}

function ProductCard({ product, index }: { product: Product; index: number }) {
  return (
    <article className="f-reveal glass-card h-full">
      <div className="p-3 pb-0 sm:p-4 sm:pb-0">
        <ProductPreview product={product} />
      </div>

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <div className="flex flex-wrap items-center gap-2">
          <span
            className="glass-chip px-2.5 py-1 text-[11px] tracking-wide"
            style={{ color: product.accent }}
          >
            {product.kindLabel}
          </span>
          <span className="glass-chip px-2.5 py-1 text-[11px] font-medium tracking-wide text-[var(--body-muted)]">
            {String(index + 1).padStart(2, "0")} · demo live
          </span>
        </div>

        <h3 className="mt-3 text-xl font-semibold tracking-tight text-[var(--heading)] sm:text-[1.35rem]">
          {product.name}
        </h3>
        <p className="mt-1 text-[0.95rem] font-medium text-[var(--heading)]">
          {product.tagline}
        </p>
        <p className="mt-2 text-[0.9rem] leading-relaxed text-[var(--body-muted)]">
          {product.description}
        </p>

        <ul className="mt-4 space-y-1.5">
          {product.highlights.map((h) => (
            <li
              key={h}
              className="flex items-start gap-2 text-[0.88rem] text-[var(--body)]"
            >
              <span
                className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full"
                style={{ background: product.accent }}
              />
              {h}
            </li>
          ))}
        </ul>

        <div className="mt-4 flex flex-wrap gap-1.5">
          {product.tags.map((tag) => (
            <span
              key={tag}
              className="glass-chip px-2.5 py-1 text-[11px] font-medium tracking-wide text-[var(--body-muted)]"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="mt-6 flex flex-wrap items-center gap-3">
          <a
            href={product.demoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="glass-btn-cta"
          >
            Buka demo
            <ArrowUpRight className="h-4 w-4" />
          </a>
          <span className="glass-chip px-2.5 py-1.5 text-xs font-medium text-[var(--body-muted)]">
            sumber:{" "}
            <code className="font-semibold text-[var(--heading)]">
              {product.source}
            </code>
          </span>
        </div>
      </div>
    </article>
  );
}

export default function ProductsSection() {
  return (
    <section id="products" className="glass-stage py-20 md:py-28">
      <div className="mx-auto max-w-[72rem] px-[var(--h-pad)]">
        <div className="f-reveal mx-auto max-w-[36rem] text-center">
          <h2 className="mt-2 text-[1.65rem] font-semibold tracking-[-0.03em] sm:text-3xl">
            Our products
          </h2>
          <p className="mt-3 text-[0.95rem] leading-relaxed text-[var(--body-muted)]">
            Dua foundation yang kami sesuaikan per klien—company profile
            untuk citra brand, web app untuk operasional sehari-hari.
          </p>
          <p className="mt-2 text-xs font-medium text-[var(--body-muted)] lg:hidden">
            Geser atau pakai panah kiri / kanan
          </p>
        </div>
      </div>

      <div className="relative mt-10 lg:mt-12">
        <HorizontalSnapCarousel
          ariaLabel="Produk"
          cardWidth="min(86vw, 22rem)"
          gapPx={14}
          desktopGridClass="lg:grid-cols-2 lg:gap-5"
        >
          {products.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </HorizontalSnapCarousel>
      </div>
    </section>
  );
}
