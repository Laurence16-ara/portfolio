import { Reveal } from "./Reveal";

export const Contact = () => {
  return (
    <section id="contact" className="bg-secondary/40 py-20 sm:py-24">
      <div className="mx-auto max-w-[1100px] px-5 sm:px-8">
        <Reveal>
          <div className="text-center">
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">
              Let's Talk
            </span>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-[2.5rem] sm:leading-[1.15]">
              Have a GHL Project in Mind?
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              Let's discuss your funnel, CRM, or automation needs and find the
              right solution for your business.
            </p>
            <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <a
                href="/discovery-call"
                className="inline-flex items-center justify-center rounded-lg bg-accent px-6 py-3 text-sm font-semibold text-accent-foreground transition-colors hover:bg-accent-hover"
              >
                Book a Free Discovery Call →
              </a>
              <a
                href="#work"
                className="inline-flex items-center justify-center rounded-lg border border-border bg-card px-6 py-3 text-sm font-semibold text-foreground transition-colors hover:border-accent hover:text-accent"
              >
                View My Work →
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
};
