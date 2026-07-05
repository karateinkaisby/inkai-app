"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { resolveImageUrl } from "@/lib/cms";
import type { MobileCarousel } from "@/lib/types";

type Props = {
  items: MobileCarousel[];
};

export default function CarouselSection({ items }: Props) {
  const slides = items.filter((item) => item.is_active);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (slides.length <= 1) return;
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  if (slides.length === 0) return null;

  const current = slides[index];

  const body = (
    <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-black/30 aspect-[16/10]">
      <Image
        src={resolveImageUrl(current.image_url)}
        alt={current.title ?? "Carousel"}
        fill
        className="object-cover"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 p-4">
        {current.title && (
          <h3 className="text-base font-bold text-white">{current.title}</h3>
        )}
        {current.description && (
          <p className="mt-1 text-sm text-white/70 line-clamp-2">
            {current.description}
          </p>
        )}
      </div>
      {slides.length > 1 && (
        <div className="absolute top-0 inset-x-0 flex gap-1 p-2">
          {slides.map((slide, i) => (
            <div
              key={slide.id}
              className="h-1 flex-1 overflow-hidden rounded-full bg-white/20"
            >
              {i === index && (
                <div
                  key={`${slide.id}-${index}`}
                  className="carousel-progress h-full bg-amber-400"
                />
              )}
              {i < index && <div className="h-full w-full bg-amber-400/70" />}
            </div>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <section className="px-4 pt-4">
      {current.link_url ? (
        <Link href={current.link_url} className="block">
          {body}
        </Link>
      ) : (
        body
      )}
      {slides.length > 1 && (
        <div className="mt-2 flex justify-center gap-1.5">
          {slides.map((slide, i) => (
            <button
              key={slide.id}
              type="button"
              aria-label={`Slide ${i + 1}`}
              onClick={() => setIndex(i)}
              className={`h-1.5 rounded-full transition-all ${
                i === index ? "w-5 bg-amber-400" : "w-1.5 bg-white/25"
              }`}
            />
          ))}
        </div>
      )}
    </section>
  );
}
