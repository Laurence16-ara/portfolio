/* ==================================================================
   PROJECT PAGE — /work/<slug>
   One template for every project. Sections only appear when the
   project in src/data/site.ts has that content (workflows, timeline,
   order form…), so adding a project never means editing this file.
   ================================================================== */

import { Link, useParams } from "react-router-dom";
import { PROFILE, PROJECTS, getProject, nextProject, type Project } from "@/data/site";
import { usePageMeta } from "@/hooks/use-page-meta";
import { cn } from "@/lib/utils";
import {
  Figure,
  InkGrid,
  ProjectHeader,
  SectionHead,
  SpecGrid,
  Stars,
  TimelineGrid,
  TitleBlock,
} from "@/components/site/Kit";
import { PipelineGrid, WorkflowSection } from "@/components/site/Workflow";
import NotFound from "./NotFound";

const pad = (n: number) => String(n).padStart(2, "0");
const external = { target: "_blank", rel: "noopener noreferrer" } as const;
const hostOf = (href: string) => {
  try {
    return new URL(href).host.replace(/^www\./, "");
  } catch {
    return href;
  }
};

/* ---------- Sections ---------- */

function TitleSection({ p }: { p: Project }) {
  const long = p.name.length > 16;
  return (
    <section aria-label="Overview">
      <div className="wrap flex flex-col gap-8 pb-10 pt-12 md:pb-12 md:pt-[72px] lg:flex-row lg:items-end lg:justify-between lg:gap-16">
        <div className="flex min-w-0 flex-col gap-5 md:gap-6 lg:flex-1">
          <span className="flex flex-wrap items-center gap-3">
            <span className="font-mono text-xs uppercase tracking-[0.06em]">
              {p.code} · {p.category}
            </span>
            {p.kind === "client" && <span className="badge">{p.badge}</span>}
          </span>
          <h1
            className={cn(
              "stretch-68 m-0 text-balance break-words font-extrabold uppercase tracking-[-0.02em]",
              long ? "text-[clamp(52px,8.6vw,140px)]" : "text-[clamp(60px,9.6vw,156px)]",
              "leading-[0.84]",
            )}
          >
            {p.name}
          </h1>
          <p className="m-0 max-w-[640px] text-lg leading-normal text-lm-body md:text-xl">{p.summary}</p>
        </div>

        {(p.primaryLink || p.links) && (
          <div className="flex min-w-0 flex-col items-start gap-3 lg:w-[300px] lg:shrink-0">
            {p.primaryLink && (
              <>
                <a href={p.primaryLink.href} {...external} className="btn min-h-[54px] px-6 text-base">
                  {p.primaryLink.label}
                </a>
                <span className="font-mono text-[11.5px] text-lm-muted">
                  {p.primaryLink.note ?? hostOf(p.primaryLink.href)}
                </span>
              </>
            )}
            {p.links && p.links.length > 1 && (
              <div className="mt-3 flex flex-col gap-2">
                <span className="label">Live pages</span>
                {p.links.map((l) => (
                  <a key={l.href} href={l.href} {...external} className="text-[15px] font-semibold underline">
                    {l.label} ↗
                  </a>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      <div className="wrap pb-12 md:pb-16">
        <SpecGrid specs={p.specs} />
      </div>
    </section>
  );
}

function Gallery({ p }: { p: Project }) {
  const shots = p.images ?? [];
  if (shots.length === 0) return null;
  const [main, ...more] = shots;
  const figures = (
    <div className="flex flex-col gap-6">
      <Figure n={1} shot={main} href={p.primaryLink?.href} eager={!p.gallery} />
      {more.length > 0 && (
        <div className="grid gap-6" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(min(300px, 100%), 1fr))" }}>
          {more.map((s, i) => (
            <Figure key={s.src} n={i + 2} shot={s} imgClassName="h-[230px] object-cover object-top" />
          ))}
        </div>
      )}
    </div>
  );

  if (!p.gallery) {
    return (
      <section aria-label="Screenshots">
        <div className="wrap pb-16 md:pb-[104px]">{figures}</div>
      </section>
    );
  }
  return (
    <section className="border-t border-lm-ink">
      <div className="wrap flex flex-col gap-10 py-16 md:gap-12 md:py-24">
        <SectionHead title={p.gallery.title} intro={p.gallery.intro} />
        {figures}
      </div>
    </section>
  );
}

function ProblemFix({ p }: { p: Project }) {
  if (!p.problem && !p.solution) return null;
  return (
    <section className="border-t border-lm-ink">
      <div className="wrap flex flex-col gap-8 py-16 md:gap-10 md:py-24">
        <SectionHead title="The problem, and the fix." />
        <InkGrid min={320}>
          {p.problem && (
            <div className="cell flex flex-col gap-3 p-6 md:p-8">
              <span className="label">The problem</span>
              <p className="m-0 text-lg leading-[1.55] md:text-xl">{p.problem}</p>
            </div>
          )}
          {p.solution && (
            <div className="flex flex-col gap-3 bg-lm-accent p-6 md:p-8">
              <span className="font-mono text-[11px] uppercase tracking-[0.08em]">What I did</span>
              <p className="m-0 text-lg leading-[1.55] md:text-xl">{p.solution}</p>
            </div>
          )}
        </InkGrid>
      </div>
    </section>
  );
}

function Timeline({ p }: { p: Project }) {
  if (!p.timeline) return null;
  return (
    <section className="border-t border-lm-ink">
      <div className="wrap flex flex-col gap-8 py-16 md:gap-10 md:py-24">
        <SectionHead title={p.timeline.title} intro={p.timeline.intro} />
        <TimelineGrid items={p.timeline.items} />
      </div>
    </section>
  );
}

function OrderForm({ p }: { p: Project }) {
  if (!p.orderForm) return null;
  const items = p.orderForm.items;
  return (
    <section className="border-t border-lm-ink">
      <div className="wrap flex flex-col gap-8 py-16 md:gap-10 md:py-24">
        <SectionHead title={p.orderForm.title} intro={p.orderForm.intro} />
        <InkGrid min={220} twoUp>
          {items.map((it, i) => {
            const last = i === items.length - 1;
            return (
              <div
                key={it.title}
                className={cn("flex flex-col gap-2 px-5 py-[22px]", last ? "bg-lm-accent" : "bg-white")}
              >
                <span className={cn("font-mono text-[11px]", !last && "text-lm-muted")}>{pad(i + 1)}</span>
                <b className="text-lg">{it.title}</b>
                {it.text && <span className={cn("text-sm leading-normal", !last && "text-lm-body")}>{it.text}</span>}
              </div>
            );
          })}
        </InkGrid>
      </div>
    </section>
  );
}

function Steps({ p }: { p: Project }) {
  if (!p.steps) return null;
  const items = p.steps.items;
  return (
    <section className="border-t border-lm-ink">
      <div className="wrap flex flex-col gap-8 py-16 md:gap-10 md:py-24">
        <SectionHead title={p.steps.title} />
        <InkGrid as="ol" min={280}>
          {items.map((s, i) => {
            const last = i === items.length - 1;
            return (
              <li
                key={s.title}
                className={cn(
                  "flex items-start gap-4 p-5 md:flex-col md:gap-3 md:px-[22px] md:pb-[30px] md:pt-[26px]",
                  last ? "bg-lm-accent" : "bg-white",
                )}
              >
                <span className="stretch-68 w-14 shrink-0 text-[48px] font-extrabold leading-[0.82] md:w-auto md:text-[64px]">
                  {pad(i + 1)}
                </span>
                <span className="flex flex-col gap-1 md:gap-3">
                  <b className="text-[17px] md:text-lg">{s.title}</b>
                  <span className={cn("text-[14.5px] leading-[1.55] md:text-[15px]", !last && "text-lm-body")}>
                    {s.text}
                  </span>
                </span>
              </li>
            );
          })}
        </InkGrid>
      </div>
    </section>
  );
}

function Quotes({ p }: { p: Project }) {
  if (!p.quotes || p.quotes.length === 0) return null;
  return (
    <section aria-labelledby="quotes-title" className="border-t border-lm-ink bg-white">
      <div className="wrap flex flex-col gap-8 py-16 md:gap-10 md:py-24">
        <h2 id="quotes-title" className="label m-0 text-[11.5px]">
          What the client said
        </h2>
        <div
          className="grid gap-x-14 gap-y-10"
          style={{ gridTemplateColumns: "repeat(auto-fit, minmax(min(440px, 100%), 1fr))" }}
        >
          {p.quotes.map((q) => (
            <figure key={q.text} className="flex flex-col gap-4">
              {q.rating && (
                <span className="flex items-center gap-2.5 font-mono text-xs font-semibold">
                  <Stars className="text-[17px]" />
                  {q.rating.toFixed(1)}
                </span>
              )}
              <blockquote className="stretch-80 m-0 max-w-[760px] text-[24px] font-bold leading-[1.08] tracking-[-0.01em] md:text-[30px]">
                “{q.text}”
              </blockquote>
              <figcaption className="font-mono text-[11px] uppercase text-lm-muted md:text-[11.5px]">
                {q.source}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

function NextAndContact({ p, next }: { p: Project; next: Project }) {
  return (
    <section className="border-t border-lm-ink">
      <div className="wrap flex flex-col gap-6 py-12 md:py-16">
        <InkGrid min={300}>
          <Link to="/#work" className="group flex flex-col gap-2.5 bg-white p-6 no-underline hover:bg-lm-paper md:p-7">
            <span className="label tracking-[0.06em]">← Back</span>
            <span className="stretch-75 text-[28px] font-extrabold uppercase leading-none group-hover:underline md:text-[34px]">
              All work
            </span>
          </Link>
          <Link
            to={`/work/${next.slug}`}
            className="group flex flex-col items-end gap-2.5 bg-white p-6 text-right no-underline hover:bg-lm-paper md:p-7"
          >
            <span className="label tracking-[0.06em]">Next · {next.code} →</span>
            <span className="stretch-75 text-[28px] font-extrabold uppercase leading-none group-hover:underline md:text-[34px]">
              {next.name}
            </span>
          </Link>
        </InkGrid>
        <div className="flex flex-col items-start gap-5 border-[1.5px] border-lm-ink bg-lm-accent p-6 sm:flex-row sm:items-center sm:justify-between md:p-8">
          <span className="stretch-72 text-[clamp(32px,3.6vw,56px)] font-extrabold leading-[0.92]">{p.ctaLine}</span>
          <Link to="/#contact" className="btn btn-ink min-h-[54px] shrink-0 px-[26px] text-[17px]">
            Contact me
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ---------- Page ---------- */

function ProjectView({ p }: { p: Project }) {
  const next = nextProject(p.slug);
  const sameKind = PROJECTS.filter((x) => x.kind === p.kind);
  const workflows = p.workflows ?? [];

  usePageMeta({
    title: `${p.name} · ${p.kind === "demo" ? "GoHighLevel demo build" : "GoHighLevel client project"} | ${PROFILE.name}`,
    description: p.summary,
    path: `/work/${p.slug}`,
  });

  return (
    <div className="flex min-h-screen flex-col">
      <ProjectHeader next={next} />
      <main className="flex-1">
        <TitleSection p={p} />
        <Gallery p={p} />
        <ProblemFix p={p} />
        <Timeline p={p} />
        {workflows.map((w, i) => (
          <WorkflowSection
            key={w.title}
            workflow={w}
            index={i}
            total={workflows.length}
            pipeline={i === workflows.length - 1 ? p.pipeline : undefined}
          />
        ))}
        {workflows.length === 0 && p.pipeline && (
          <section className="border-t border-lm-ink">
            <div className="wrap py-16 md:py-24">
              <PipelineGrid stages={p.pipeline} />
            </div>
          </section>
        )}
        <OrderForm p={p} />
        <Steps p={p} />
        <Quotes p={p} />
        <NextAndContact p={p} next={next} />
      </main>
      <TitleBlock
        cells={[
          { label: "Project", value: `${p.name} · ${p.code}` },
          { label: "Drawn by", value: PROFILE.name },
          { label: "Platform", value: "GoHighLevel" },
          { label: "Sheet", value: `${p.code} of ${pad(sameKind.length)} · © ${new Date().getFullYear()}` },
        ]}
      />
    </div>
  );
}

const ProjectPage = () => {
  const { slug } = useParams();
  const project = getProject(slug);
  if (!project) return <NotFound />;
  // key: start fresh (images, scroll state) when moving between projects
  return <ProjectView key={project.slug} p={project} />;
};

export default ProjectPage;
