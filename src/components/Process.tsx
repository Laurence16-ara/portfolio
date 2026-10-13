import {
  Map,
  Hammer,
  FlaskConical,
  MousePointerClick,
  KanbanSquare,
  Zap,
  Reply,
} from "lucide-react";
import { Reveal } from "./Reveal";
import { SectionCTA } from "./SectionCTA";

const STAGES = [
  {
    num: "01",
    label: "CAPTURE",
    title: "Capture",
    subtitle: "Capture the lead",
    desc: "Turn visitors into identifiable leads.",
    icon: MousePointerClick,
  },
  {
    num: "02",
    label: "ORGANIZE",
    title: "Organize",
    subtitle: "Keep the CRM structured",
    desc: "Structure contacts, tags, and pipelines.",
    icon: KanbanSquare,
  },
  {
    num: "03",
    label: "AUTOMATE",
    title: "Automate",
    subtitle: "Put follow-up on autopilot",
    desc: "Trigger emails, SMS, and pipeline actions.",
    icon: Zap,
  },
  {
    num: "04",
    label: "FOLLOW UP",
    title: "Follow Up",
    subtitle: "Keep prospects moving",
    desc: "Nurture sequences prevent cold leads.",
    icon: Reply,
  },
];

const STEPS = [
  {
    num: "01",
    title: "Understand",
    subtitle: "Map the customer journey",
    desc: "Map the journey before building.",
    icon: Map,
  },
  {
    num: "02",
    title: "Build",
    subtitle: "Build the GHL system",
    desc: "Build the funnel, CRM, and automation.",
    icon: Hammer,
  },
  {
    num: "03",
    title: "Test",
    subtitle: "Test the complete journey",
    desc: "Test the full journey before launch.",
    icon: FlaskConical,
  },
];

export const Process = () => {
  return (
    <section id="services" className="bg-background py-12 sm:py-24">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal className="mx-auto max-w-2xl text-center sm:mx-0 sm:text-left">
          <span className="section-label">How I Build</span>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            From first click to follow-up.
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground">
            I connect the funnel, CRM, and automation so every lead has a clear
            next step.
          </p>
        </Reveal>

        {/* Phase 1 — How I Build It */}
        <Reveal delay={0.1}>
          <div className="mt-12 rounded-2xl border border-border bg-card p-6 sm:p-8">
            <div className="mb-6">
              <span className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">
                Phase 1 — How I Build It
              </span>
            </div>

            {/* Desktop: horizontal flow */}
            <div className="hidden lg:flex lg:items-stretch">
              {STEPS.map((step, i) => {
                const Icon = step.icon;
                return (
                  <div key={step.num} className="flex flex-1 items-stretch">
                    <div className="flex flex-1 flex-col items-center rounded-xl border border-border bg-background p-5 text-center transition-colors hover:border-accent/40">
                      <Icon size={30} className="text-accent" />
                      <h3 className="mt-3 text-base font-semibold text-foreground">
                        {step.title}
                      </h3>
                      <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                        {step.desc}
                      </p>
                    </div>
                    {i < STEPS.length - 1 && (
                      <div className="flex w-10 items-center justify-center">
                        <div className="h-px w-full bg-gradient-to-r from-border to-accent/40" />
                        <span className="ml-[-7px] text-accent/60">→</span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Mobile: vertical flow */}
            <div className="flex flex-col gap-4 lg:hidden">
              {STEPS.map((step) => {
                const Icon = step.icon;
                return (
                  <div key={step.num}>
                    <div className="flex flex-col items-center rounded-xl border border-border bg-background p-3 text-center">
                      <Icon size={24} className="text-accent" />
                      <h3 className="mt-1.5 text-base font-semibold text-foreground">
                        {step.title}
                      </h3>
                      <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                        {step.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </Reveal>

        {/* Connecting line */}
        <Reveal delay={0.12}>
          <div className="mt-6 flex items-center justify-center gap-3 text-center">
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-accent/40" />
            <p className="text-sm font-medium text-muted-foreground">
              That process builds the connected system below:
            </p>
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-accent/40" />
          </div>
        </Reveal>

        {/* Phase 2 — What Gets Built */}
        <Reveal delay={0.15}>
          <div className="mt-6 rounded-2xl border border-border bg-card p-6 sm:p-8">
            <div className="mb-6">
              <span className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">
                Phase 2 — What Gets Built
              </span>
            </div>

            {/* Desktop: horizontal flow */}
            <div className="hidden lg:flex lg:items-stretch">
              {STAGES.map((stage, i) => {
                const Icon = stage.icon;
                return (
                  <div key={stage.label} className="flex flex-1 items-stretch">
                    <div className="flex flex-1 flex-col items-center rounded-xl border border-border bg-background p-5 text-center transition-colors hover:border-accent/40">
                      <Icon size={30} className="text-accent" />
                      <h3 className="mt-3 text-base font-semibold text-foreground">
                        {stage.title}
                      </h3>
                      <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                        {stage.desc}
                      </p>
                    </div>
                    {i < STAGES.length - 1 && (
                      <div className="flex w-10 items-center justify-center">
                        <div className="h-px w-full bg-gradient-to-r from-border to-accent/40" />
                        <span className="ml-[-7px] text-accent/60">→</span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Mobile: vertical flow */}
            <div className="flex flex-col gap-4 lg:hidden">
              {STAGES.map((stage) => {
                const Icon = stage.icon;
                return (
                  <div key={stage.label}>
                    <div className="flex flex-col items-center rounded-xl border border-border bg-background p-3 text-center">
                      <Icon size={24} className="text-accent" />
                      <h3 className="mt-1.5 text-base font-semibold text-foreground">
                        {stage.title}
                      </h3>
                      <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                        {stage.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </Reveal>

        <SectionCTA subtext="Want this kind of connected system built for your business? Let's map it out together." />
      </div>
    </section>
  );
};
