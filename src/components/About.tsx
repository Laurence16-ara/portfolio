import { ExternalLink } from "lucide-react";
import { Reveal } from "./Reveal";

const FOUNDATION = [
  { area: "Lead List Building", detail: "5+ years" },
  { area: "Chatter / DM Sales", detail: "3+ years" },
  { area: "CRM & Data Work", detail: "Freelance background" },
  { area: "GoHighLevel", detail: "1 completed client project (Bemunchie)" },
  { area: "Upwork (overall)", detail: "7,000+ hours · 17 completed jobs" },
];

export const About = () => {
  return (
    <section id="about" className="bg-background py-12 sm:py-24">
      <div className="mx-auto max-w-5xl px-5 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
          {/* Left — story */}
          <Reveal>
            <div className="text-center sm:text-left">
              <span className="section-label">About Laurence</span>
              <h2 className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                GoHighLevel specialist. Systems that keep leads moving.
              </h2>
            </div>

            <div className="mt-6 space-y-4 text-base leading-relaxed text-muted-foreground">
              <p>
                I'm Laurence, a GoHighLevel specialist building funnels, CRM
                structures, and automation that capture, organize, and follow up
                on leads without manual work. Before specializing in GHL, I
                spent 3+ years in freelance lead generation and CRM/data work,
                which taught me to map real business workflows, not just
                configure software.
              </p>
              <p>
                Recent work includes rebuilding a client's broken, misaligned
                funnel across 3 pages and fixing their SEO setup. That's the
                kind of hands-on problem-solving I bring to every project.
              </p>
            </div>

            <a
              href="https://www.upwork.com/freelancers/~011be8c77f9d0a9870"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-7 inline-flex items-center gap-2 rounded-lg border border-border bg-card px-5 py-3 text-sm font-semibold text-foreground transition-colors hover:border-accent hover:text-accent"
            >
              View My Upwork Profile
              <ExternalLink size={15} />
            </a>
          </Reveal>

          {/* Right — freelance foundation panel */}
          <Reveal delay={0.1}>
            <div className="rounded-2xl border border-border bg-card p-6 shadow-sm sm:p-7">
              <span className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">
                Freelance Track Record
              </span>
              <div className="mt-5 divide-y divide-border">
                {FOUNDATION.map((item) => (
                  <div
                    key={item.area}
                    className="flex flex-col gap-0.5 py-3.5 first:pt-0 last:pb-0 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4"
                  >
                    <span className="text-sm font-semibold text-foreground">
                      {item.area}
                    </span>
                    <span className="text-sm text-muted-foreground">
                      {item.detail}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
};
