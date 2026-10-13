import { useEffect, useRef, useState } from "react";
import { Reveal } from "./Reveal";

const TESTIMONIALS = [
  {
    quote:
      "Responsive, proactive, protective of your brand. Very good at what he does.",
    attribution: "— Upwork Client",
  },
  {
    quote:
      "Laurence was fantastic to work with. He was very attentive and flexible. I highly recommend him and will be hiring him again!",
    attribution: "— Upwork Client",
  },
  {
    quote: "Amazing to work with! Would highly recommend.",
    attribution: "— Upwork Client",
  },
];

export const Testimonials = () => {
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeDot, setActiveDot] = useState(0);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const handleScroll = () => {
      const cards = track.children;
      if (cards.length === 0) return;
      const cardWidth = cards[0].getBoundingClientRect().width;
      const idx = Math.round(track.scrollLeft / (cardWidth || 1));
      setActiveDot(Math.min(Math.max(idx, 0), TESTIMONIALS.length - 1));
    };

    track.addEventListener("scroll", handleScroll, { passive: true });
    return () => track.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section id="testimonials" className="bg-secondary/40 py-12 sm:py-24">
      <div className="mx-auto max-w-5xl px-5 sm:px-8">
        <Reveal>
          <div className="mx-auto max-w-2xl text-center sm:mx-0 sm:text-left">
            <span className="section-label">What Clients Say</span>
            <h2 className="mt-3 text-2xl font-bold tracking-tight text-foreground sm:text-4xl">
              Trusted by clients throughout my freelance career.
            </h2>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              Real feedback from previous clients on communication, reliability,
              and execution.
            </p>
          </div>
        </Reveal>

        {/* Mobile — horizontal swipeable carousel */}
        <div className="mt-12 sm:hidden">
          <div
            ref={trackRef}
            className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {TESTIMONIALS.map((t, i) => (
              <figure
                key={i}
                className="flex w-[85%] shrink-0 snap-start flex-col rounded-2xl border border-border bg-card p-7 shadow-sm"
              >
                <span
                  className="text-3xl leading-none text-accent"
                  aria-hidden="true"
                >
                  &ldquo;
                </span>
                <blockquote className="mt-3 text-base leading-relaxed text-foreground">
                  {t.quote}
                </blockquote>
                <figcaption className="mt-6 text-sm font-medium text-muted-foreground">
                  {t.attribution}
                </figcaption>
              </figure>
            ))}
          </div>

          {/* Dot indicators */}
          <div className="mt-5 flex justify-center gap-2">
            {TESTIMONIALS.map((_, i) => (
              <span
                key={i}
                className={`h-2 rounded-full transition-all duration-300 ${
                  i === activeDot ? "w-6 bg-accent" : "w-2 bg-border"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Desktop — grid */}
        <div className="mt-12 hidden gap-6 sm:grid sm:grid-cols-2 lg:grid-cols-3">
          {TESTIMONIALS.map((t, i) => (
            <Reveal key={i} delay={i * 0.08}>
              <figure className="flex h-full flex-col rounded-2xl border border-border bg-card p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-accent/40">
                <span
                  className="text-3xl leading-none text-accent"
                  aria-hidden="true"
                >
                  &ldquo;
                </span>
                <blockquote className="mt-3 flex-1 text-base leading-relaxed text-foreground">
                  {t.quote}
                </blockquote>
                <figcaption className="mt-6 text-sm font-medium text-muted-foreground">
                  {t.attribution}
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};
