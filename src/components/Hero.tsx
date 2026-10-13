import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const STATS = [
  { value: "100%", label: "Job Success Score" },
  { value: "Top Rated Plus", label: "Upwork Status" },
  { value: "5.0", label: "Client Rating" },
  { value: "7,000+", label: "Upwork Hours" },
];

const CERTIFICATIONS = [
  {
    title: "Funnel Building Expert",
    image:
      "https://vibe.filesafe.space/1786158431853345748/attachments/9be99127-06dd-477e-a181-48ea279c2349.jpg",
    url: "#",
  },
  {
    title: "Workflow & Automation Expert",
    image:
      "https://vibe.filesafe.space/1786158431853345748/attachments/987e22e5-468c-4b5a-afd6-e9e67be98d66.jpg",
    url: "#",
  },
  {
    title: "CRM & Pipeline Expert",
    image:
      "https://vibe.filesafe.space/1786158431853345748/attachments/6fb5a8ca-d7f0-44d9-8379-5c74bb9d4c1c.png",
    url: "https://my-certificates.com/certificates/6a64230e8f3630ada9e02d73",
  },
];

export const Hero = () => {
  return (
    <section
      id="top"
      className="relative overflow-hidden bg-background pt-20 pb-8 sm:pt-22 sm:pb-10"
    >
      {/* subtle grid backdrop */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.4]"
        style={{
          backgroundImage:
            "linear-gradient(to right, hsl(var(--border) / 0.5) 1px, transparent 1px), linear-gradient(to bottom, hsl(var(--border) / 0.5) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
          maskImage:
            "radial-gradient(ellipse 80% 60% at 50% 0%, black 30%, transparent 75%)",
        }}
      />

      <div className="relative mx-auto max-w-6xl px-5 sm:px-8">
        <div className="flex flex-col gap-8 lg:grid lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          {/* Left — copy */}
          <div className="order-1 flex flex-col items-center text-center lg:block lg:items-start lg:text-left lg:col-start-1 lg:row-start-1">
            <motion.span
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs font-medium text-muted-foreground"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-accent" />
              GoHighLevel Specialist
            </motion.span>

            <motion.h1
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.05 }}
              className="mt-4 text-[1.9rem] font-bold leading-[1.08] tracking-tight text-foreground sm:text-5xl lg:text-[3.2rem]"
            >
              I Build GoHighLevel Systems That Stop Your Leads{" "}
              <span className="text-accent">From Going Cold.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="mt-5 mx-auto max-w-md text-base leading-relaxed text-muted-foreground sm:mx-0 sm:text-lg"
            >
              Landing pages, CRM pipelines, and automated follow-up, set up so
              every inbound lead gets a next step instead of falling through the
              cracks.
            </motion.p>

            {/* CTA buttons — desktop only (mobile block renders after certifications) */}
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="mt-6 hidden flex-wrap items-center gap-3 lg:flex"
            >
              <a
                href="#work"
                className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-5 py-3 text-sm font-semibold text-foreground transition-colors hover:border-accent hover:text-accent"
              >
                View My Work
                <ArrowRight size={16} />
              </a>
              <a
                href="/discovery-call"
                className="inline-flex items-center gap-2 rounded-lg bg-accent px-5 py-3 text-sm font-semibold text-accent-foreground transition-colors hover:bg-accent-hover"
              >
                Let's Work Together
              </a>
            </motion.div>
          </div>

          {/* Right — portrait + compact credibility (mobile: after CTAs, before certs) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="order-2 mx-auto w-full max-w-sm lg:col-start-2 lg:row-start-1 lg:row-span-2 lg:max-w-none"
          >
            {/* Portrait container — shorter crop on mobile */}
            <div className="relative aspect-[3/2] max-h-[240px] w-full overflow-hidden rounded-2xl border border-border bg-card shadow-sm lg:aspect-[4/5] lg:max-h-[420px]">
              <img
                src="https://assets.cdn.filesafe.space/9tQkDHB9yoFf7gva7zy7/media/6a77e7c703343f290f809c82.png"
                alt="Laurence Maligaya — GoHighLevel Funnel & Automation Specialist"
                className="h-full w-full object-cover object-[center_15%] scale-[1.05] text-left"
              />
            </div>

            {/* Compact credibility panel — 2×2 grid */}
            <div className="mt-3 rounded-xl border border-border bg-card p-3 shadow-sm">
              <p className="mb-2 text-center text-[10px] font-medium uppercase tracking-[0.14em] text-muted-foreground">
                Overall freelance experience on Upwork
              </p>
              <div className="grid grid-cols-2 gap-px overflow-hidden rounded-lg bg-border">
                {STATS.map((s) => (
                  <div key={s.label} className="bg-card px-3 py-2 text-center">
                    <div className="text-lg font-bold tracking-tight text-foreground sm:text-xl">
                      {s.value}
                    </div>
                    <div className="mt-0.5 text-[11px] font-medium text-muted-foreground">
                      {s.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* GHL Certifications — mobile: compact icon row after photo/stats */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.35 }}
            className="order-3 lg:col-start-1 lg:row-start-2"
          >
            <p className="mb-2.5 text-[10px] font-medium uppercase tracking-[0.14em] text-muted-foreground">
              GHL Certifications
            </p>

            {/* Mobile: compact icon row */}
            <div className="flex justify-between gap-2 lg:hidden">
              {CERTIFICATIONS.map((cert) => (
                <a
                  key={cert.title}
                  href={cert.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-1 flex-col items-center text-center"
                >
                  <img
                    src={cert.image}
                    alt={`${cert.title} Badge`}
                    className="h-12 w-12 rounded-lg border border-border bg-secondary/50 p-1 object-contain"
                  />
                  <span className="mt-1.5 text-[10px] font-medium leading-tight text-muted-foreground">
                    {cert.title}
                  </span>
                </a>
              ))}
            </div>

            {/* Desktop: bordered credential cards */}
            <div className="hidden gap-2.5 sm:grid-cols-3 lg:grid">
              {CERTIFICATIONS.map((cert) => (
                <a
                  key={cert.title}
                  href={cert.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-full items-center gap-3 rounded-xl border border-border bg-card p-3 shadow-sm transition-all hover:border-accent hover:shadow-md"
                >
                  <img
                    src={cert.image}
                    alt={`${cert.title} Badge`}
                    className="h-14 w-14 shrink-0 rounded-lg border border-border bg-secondary/50 p-1 object-contain"
                  />
                  <div className="flex min-w-0 flex-col">
                    <span className="text-sm font-semibold leading-tight text-foreground">
                      {cert.title}
                    </span>
                    <span className="mt-0.5 text-[11px] font-medium text-muted-foreground">
                      GHL Champ Certified
                    </span>
                  </div>
                </a>
              ))}
            </div>
          </motion.div>

          {/* Mobile CTA buttons — after certifications */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="order-4 mt-2 flex flex-wrap items-center justify-center gap-3 lg:hidden"
          >
            <a
              href="#work"
              className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-5 py-3 text-sm font-semibold text-foreground transition-colors hover:border-accent hover:text-accent"
            >
              View My Work
              <ArrowRight size={16} />
            </a>
            <a
              href="/discovery-call"
              className="inline-flex items-center gap-2 rounded-lg bg-accent px-5 py-3 text-sm font-semibold text-accent-foreground transition-colors hover:bg-accent-hover"
            >
              Let's Work Together
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
