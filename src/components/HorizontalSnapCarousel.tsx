"use client";

import {
  Children,
  useCallback,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

type HorizontalSnapCarouselProps = {
  children: ReactNode;
  /** Lebar kartu mobile, mis. "min(78vw, 19.5rem)" */
  cardWidth?: string;
  gapPx?: number;
  className?: string;
  trackClassName?: string;
  /**
   * Di breakpoint lg: tampil grid alih-alih carousel.
   * Contoh: "lg:grid-cols-4" atau "lg:grid-cols-2"
   */
  desktopGridClass?: string;
  ariaLabel?: string;
};

export default function HorizontalSnapCarousel({
  children,
  cardWidth = "min(82vw, 20rem)",
  gapPx = 12,
  className = "",
  trackClassName = "",
  desktopGridClass = "lg:grid-cols-2",
  ariaLabel = "Slider",
}: HorizontalSnapCarouselProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);
  const items = Children.toArray(children);

  const updateArrows = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    const { scrollLeft, scrollWidth, clientWidth } = el;
    const max = scrollWidth - clientWidth;
    setCanPrev(scrollLeft > 8);
    setCanNext(scrollLeft < max - 8);
  }, []);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    updateArrows();
    el.addEventListener("scroll", updateArrows, { passive: true });
    window.addEventListener("resize", updateArrows);
    return () => {
      el.removeEventListener("scroll", updateArrows);
      window.removeEventListener("resize", updateArrows);
    };
  }, [updateArrows, items.length]);

  const scrollByDir = (dir: -1 | 1) => {
    const el = trackRef.current;
    if (!el) return;
    const slide = el.querySelector<HTMLElement>("[data-snap-slide]");
    const step = (slide?.offsetWidth ?? el.clientWidth * 0.8) + gapPx;
    el.scrollBy({ left: dir * step, behavior: "smooth" });
  };

  const pad = `max(0px, calc(50% - (${cardWidth}) / 2))`;

  return (
    <div className={`relative ${className}`}>
      {/* Prev / Next — mobile/tablet only when carousel active */}
      <div className="pointer-events-none absolute inset-y-0 left-0 right-0 z-20 flex items-center justify-between px-1 sm:px-2 lg:hidden">
        <button
          type="button"
          onClick={() => scrollByDir(-1)}
          disabled={!canPrev}
          aria-label="Sebelumnya"
          className="snap-nav-btn pointer-events-auto disabled:opacity-30 disabled:pointer-events-none"
        >
          <ChevronLeft className="h-5 w-5" strokeWidth={2.25} />
        </button>
        <button
          type="button"
          onClick={() => scrollByDir(1)}
          disabled={!canNext}
          aria-label="Berikutnya"
          className="snap-nav-btn pointer-events-auto disabled:opacity-30 disabled:pointer-events-none"
        >
          <ChevronRight className="h-5 w-5" strokeWidth={2.25} />
        </button>
      </div>

      <div
        ref={trackRef}
        role="region"
        aria-label={ariaLabel}
        className={`snap-carousel-track explore-slider flex overflow-x-auto scroll-smooth snap-x snap-mandatory pb-3 lg:mx-auto lg:max-w-[72rem] lg:grid lg:overflow-visible lg:pb-0 lg:snap-none ${desktopGridClass} ${trackClassName}`}
        style={
          {
            gap: gapPx,
            WebkitOverflowScrolling: "touch",
            ["--snap-card-w" as string]: cardWidth,
            ["--snap-pad" as string]: pad,
          } as CSSProperties
        }
      >
        {items.map((child, i) => (
          <div
            key={i}
            data-snap-slide
            className="snap-carousel-slide shrink-0 snap-center lg:w-auto lg:min-w-0 lg:max-w-none lg:shrink"
            style={{ width: cardWidth }}
          >
            {child}
          </div>
        ))}
      </div>
    </div>
  );
}
