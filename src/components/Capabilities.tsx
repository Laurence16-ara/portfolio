import {
  MousePointerClick,
  KanbanSquare,
  Zap,
  CalendarClock,
  Plug,
  MonitorSmartphone,
} from "lucide-react";
import { Reveal } from "./Reveal";
import { SectionCTA } from "./SectionCTA";

const CAPABILITIES = [
  {
    title: "Lead Generation",
    desc: "Landing pages, forms, and funnel flows.",
    icon: MousePointerClick,
  },
  {
    title: "CRM & Pipeline",
    desc: "Contacts, tags, and pipelines.",
    icon: KanbanSquare,
  },
  {
    title: "Automation",
    desc: "Email, SMS, and nurture sequences.",
    icon: Zap,
  },
  {
    title: "Appointment Systems",
    desc: "Calendars, booking, and reminders.",
    icon: CalendarClock,
  },
  {
    title: "Integrations & Fixes",
    desc: "Apollo, Zapier, plus funnel fixes.",
    icon: Plug,
  },
  {
    title: "Website & Funnel Design",
    desc: "Responsive design and SEO setup.",
    icon: MonitorSmartphone,
  },
];

export const Capabilities = () => {
  return (
    <section id="services" className="bg-secondary/40 py-12 sm:py-24">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal className="mx-auto max-w-2xl text-center sm:mx-0 sm:text-left">
          <span className="section-label">Capabilities</span>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            What I Can Build in GoHighLevel
          </h2>
        </Reveal>

        <div className="mt-12 grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-3">
          {CAPABILITIES.map((cap, i) => {
            const Icon = cap.icon;
            return (
              <Reveal key={cap.title} delay={i * 0.08}>
                <div className="flex h-full flex-col items-center rounded-2xl border border-border bg-card p-4 text-center shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-accent/40 sm:p-6">
                  <Icon size={24} className="text-accent sm:size-[30px]" />
                  <h3 className="mt-2 text-sm font-semibold text-foreground sm:mt-4 sm:text-base">
                    {cap.title}
                  </h3>
                  <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground sm:mt-3 sm:text-sm">
                    {cap.desc}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </div>

        <SectionCTA subtext="Need any of these built or fixed in your GoHighLevel account? Book a call and let's scope it out." />
      </div>
    </section>
  );
};
