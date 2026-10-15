/* ==================================================================
   HOMEPAGE
   Hero → stats → work (featured cases + index) → process → reviews
   → contact → footer. All text comes from src/data/site.ts.
   ================================================================== */

import { Link } from "react-router-dom";
import {
  CERTIFICATION,
  CONTACT,
  HERO,
  PROCESS,
  PROFILE,
  REVIEWS,
  SECTIONS,
  SEO,
  STATS,
  demoProjects,
  featuredProjects,
  moreClientProjects,
  type Project,
} from "@/data/site";
import { usePageMeta } from "@/hooks/use-page-meta";
import { cn } from "@/lib/utils";
import {
  BrowserFrame,
  Figure,
  Img,
  InkGrid,
  SiteHeader,
  SpecGrid,
  Stars,
  TimelineGrid,
  TitleBlock,
  ViewLink,
} from "@/components/site/Kit";

const pad = (n: number) => String(n).padStart(2, "0");
const projectUrl = (p: Project) => `/work/${p.slug}`;
const external = { target: "_blank", rel: "noopener noreferrer" } as const;

/* ================= HERO ================= */

function Hero() {
  return (
    <section id="top" aria-label="Introduction">
      <div className="wrap flex flex-col gap-10 pb-12 pt-10 md:pb-[72px] md:pt-24 lg:flex-row lg:items-end lg:gap-16">
        <div className="flex min-w-0 flex-col gap-6 md:gap-8 lg:flex-[7_1_0%]">
          <h1 className="stretch-72 m-0 text-balance text-[clamp(52px,7.4vw,116px)] font-extrabold leading-[0.9] tracking-[-0.025em]">
            {HERO.headline}
          </h1>
          <p className="m-0 max-w-[540px] text-[17px] leading-normal text-lm-body md:text-xl">{HERO.intro}</p>
          <div className="flex flex-col items-start gap-3.5 sm:flex-row sm:items-center sm:gap-8">
            <Link to="/#contact" className="btn btn-lg w-full sm:w-auto">
              Contact me
            </Link>
            <Link to="/#work" className="inline-flex min-h-[32px] items-center text-base font-semibold underline">
              See the work
            </Link>
          </div>
        </div>

        <figure className="flex w-full min-w-0 max-w-[460px] flex-col gap-2.5 lg:flex-[5_1_0%]">
          <Img
            src={PROFILE.portrait}
            fallback={PROFILE.portraitFallback}
            alt={PROFILE.name}
            eager
            className="block aspect-[4/5] w-full border-[1.5px] border-lm-ink bg-white object-cover [object-position:50%_30%]"
            style={{ filter: PROFILE.portraitBlackAndWhite ? "grayscale(1) contrast(1.05)" : undefined }}
          />
          <figcaption className="flex justify-between gap-3 font-mono text-[10.5px] uppercase tracking-[0.04em] md:text-[11.5px]">
            <span>{PROFILE.name}</span>
            <span className="text-lm-muted">
              {PROFILE.location.replace(", Laguna", "")} · {PROFILE.timezone}
            </span>
          </figcaption>
        </figure>
      </div>

      {/* stats strip */}
      <div className="wrap pb-16 md:pb-[104px]">
        <InkGrid className="grid-cols-2 lg:grid-cols-5">
          {STATS.map((s) => (
            <div key={s.label} className="cell flex flex-col gap-2 p-4 md:gap-2.5 md:px-6 md:py-[22px]">
              <span className="label text-[10px] md:text-[11px]">{s.label}</span>
              <span
                className={cn(
                  "stretch-80 font-extrabold tracking-[-0.02em]",
                  s.value.length > 8 ? "text-[22px] leading-[1.05]" : "text-[30px] leading-none",
                  "md:text-[38px] md:leading-none",
                )}
              >
                {s.value}
              </span>
            </div>
          ))}
          <a
            href={CERTIFICATION.href}
            {...external}
            className="cell group col-span-2 flex flex-col gap-1.5 px-4 py-3.5 no-underline hover:bg-lm-paper md:gap-2.5 md:px-6 md:py-[22px] lg:col-span-1"
          >
            <span className="label flex justify-between gap-2 text-[10px] md:text-[11px]">
              {CERTIFICATION.label}
              <span
                aria-hidden="true"
                className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              >
                ↗
              </span>
            </span>
            <span className="text-sm font-semibold leading-[1.35] md:text-[15px]">
              <span className="lg:hidden">{CERTIFICATION.items.join(" · ")}</span>
              <span className="hidden lg:inline">
                {CERTIFICATION.items.map((item) => (
                  <span key={item} className="block">
                    {item}
                  </span>
                ))}
              </span>
            </span>
          </a>
        </InkGrid>
      </div>
    </section>
  );
}

/* ================= WORK ================= */

/** Case with a spec list on the left (used when a project has a timeline) */
function CaseFile({ p }: { p: Project }) {
  const [first, ...rest] = p.specs;
  const shot = p.images?.[0];
  const dt = "font-mono text-[11px] uppercase tracking-[0.06em] text-lm-muted pt-0.5";
  return (
    <article className="flex flex-col border-[1.5px] border-lm-ink bg-white lg:flex-row">
      <dl className="order-2 grid grid-cols-[auto_1fr] content-start gap-x-5 gap-y-3.5 border-t border-lm-rule p-5 text-[15px] md:p-7 lg:order-none lg:w-[360px] lg:shrink-0 lg:border-r lg:border-t-0">
        <dt className={dt}>No.</dt>
        <dd className="font-mono text-[13px]">{p.code}</dd>
        {first && (
          <>
            <dt className={dt}>{first.label}</dt>
            <dd className="font-bold">{first.value}</dd>
          </>
        )}
        <dt className={dt}>Type</dt>
        <dd>
          <span className="badge">{p.badge}</span>
        </dd>
        {rest.map((s) => (
          <div key={s.label} className="contents">
            <dt className={dt}>{s.label}</dt>
            <dd>
              {s.stars && <Stars className="mr-1.5" />}
              {s.value}
            </dd>
          </div>
        ))}
        {p.links && p.links.length > 0 && (
          <>
            <dt className={dt}>Live</dt>
            <dd className="flex flex-col gap-1.5 font-semibold">
              {p.links.map((l) => (
                <a key={l.href} href={l.href} {...external} className="underline">
                  {l.label}
                </a>
              ))}
            </dd>
          </>
        )}
      </dl>

      <div className="order-1 flex min-w-0 flex-1 flex-col gap-6 p-5 md:p-7 lg:order-none">
        <div className="flex flex-wrap items-start justify-between gap-x-8 gap-y-3">
          <h3 className="stretch-74 m-0 min-w-0 flex-[1_1_420px] text-[34px] font-extrabold uppercase leading-[0.92] tracking-[-0.01em] md:text-[46px]">
            <Link to={projectUrl(p)} className="no-underline hover:underline">
              {p.title}
            </Link>
          </h3>
          <ViewLink to={projectUrl(p)} name={p.name} />
        </div>
        {shot && (
          <Figure
            n={1}
            shot={shot}
            href={p.primaryLink?.href}
            imgClassName="h-auto md:h-[320px] md:object-cover md:object-top"
          />
        )}
        {p.timeline && <TimelineGrid items={p.timeline.items} />}
      </div>
    </article>
  );
}

/** Large showcase with one live screenshot */
function CaseShowcase({ p }: { p: Project }) {
  const shot = p.images?.[0];
  return (
    <article className="flex flex-col gap-6 border-[1.5px] border-lm-ink bg-white p-5 md:p-7">
      <div className="flex flex-wrap items-end justify-between gap-x-8 gap-y-3">
        <div className="flex min-w-0 flex-[1_1_520px] flex-col items-start gap-3.5">
          <span className="flex flex-wrap items-center gap-3">
            <span className="font-mono text-[13px]">{p.code}</span>
            <span className="badge">{p.badge}</span>
          </span>
          <h3 className="stretch-74 m-0 text-[34px] font-extrabold uppercase leading-[0.92] tracking-[-0.01em] md:text-[46px]">
            <Link to={projectUrl(p)} className="no-underline hover:underline">
              {p.title}
            </Link>
          </h3>
        </div>
        <ViewLink to={projectUrl(p)} name={p.name} />
      </div>
      {shot && (
        <figure className="flex flex-col gap-2">
          <figcaption className="font-mono text-[11.5px] uppercase tracking-[0.04em]">Live in GoHighLevel</figcaption>
          <BrowserFrame
            shot={shot}
            href={p.primaryLink?.href}
            imgClassName="h-auto md:h-[440px] md:object-cover md:object-top"
          />
        </figure>
      )}
      <SpecGrid specs={p.caseSpecs ?? p.specs} size="sm" min={170} />
    </article>
  );
}

const ROW = "lg:grid-cols-[64px_168px_minmax(0,1.3fr)_minmax(0,1fr)_minmax(0,1.2fr)_96px]";

function IndexRow({ p }: { p: Project }) {
  const thumb = p.thumbnail ?? p.images?.[0]?.src;
  const frame = p.images?.[0]?.frame ?? p.name;
  return (
    <li>
      {/* desktop: table row */}
      <Link
        to={projectUrl(p)}
        className={cn("group hidden items-center gap-6 border-b border-lm-rule py-[18px] no-underline lg:grid", ROW)}
      >
        <span className="font-mono text-[13px]">{p.code}</span>
        {thumb ? (
          <Img
            src={thumb}
            alt=""
            className="block h-[92px] w-[168px] border border-lm-ink object-cover object-left-top"
          />
        ) : (
          <span className="ph block h-[92px] w-[168px] border border-lm-ink" />
        )}
        <span className="stretch-75 text-[30px] font-extrabold uppercase leading-[0.95] group-hover:underline">
          {p.name}
        </span>
        <span className="text-[15px]">{p.system}</span>
        <span className="font-mono text-xs leading-normal text-lm-body">{p.inside}</span>
        <span className="inline-flex items-center gap-2.5 justify-self-end font-mono text-[11.5px] font-semibold">
          VIEW
          <span className="icon-box group-hover:bg-lm-accent" aria-hidden="true">
            +
          </span>
        </span>
      </Link>

      {/* phones + tablets: card */}
      <Link to={projectUrl(p)} className="group flex flex-col gap-2.5 no-underline lg:hidden">
        <span className="flex flex-col border-[1.5px] border-lm-ink bg-white">
          <span className="truncate border-b-[1.5px] border-lm-ink px-3 py-[7px] font-mono text-[10px]">{frame}</span>
          {thumb ? (
            <Img src={thumb} alt="" className="block h-[190px] w-full object-cover object-left-top sm:h-[220px]" />
          ) : (
            <span className="ph block h-[190px]" />
          )}
        </span>
        <span className="flex items-baseline gap-2.5">
          <span className="font-mono text-[11px] text-lm-muted">{p.code}</span>
          <span className="stretch-78 text-[26px] font-extrabold leading-none group-hover:underline">{p.name}</span>
        </span>
        <span className="font-mono text-[10.5px] uppercase tracking-[0.03em] text-lm-muted">{p.inside}</span>
      </Link>
    </li>
  );
}

function IndexGroup({
  title,
  note,
  projects,
  first,
}: {
  title: string;
  note?: string;
  projects: Project[];
  first?: boolean;
}) {
  if (projects.length === 0) return null;
  return (
    <div className="flex flex-col">
      <h3
        className={cn(
          "m-0 pb-4 font-mono text-[11px] font-normal uppercase tracking-[0.06em] lg:pb-1",
          first ? "lg:pt-[18px]" : "border-t border-lm-rule pt-8 lg:border-t-0",
        )}
      >
        {title}
        {note && <span className="text-lm-muted"> · {note}</span>}
      </h3>
      <ul className="grid gap-x-6 gap-y-8 md:grid-cols-2 lg:flex lg:flex-col lg:gap-0">
        {projects.map((p) => (
          <IndexRow key={p.slug} p={p} />
        ))}
      </ul>
    </div>
  );
}

function Work() {
  return (
    <section id="work" className="border-t border-lm-ink">
      <div className="wrap flex flex-col gap-10 py-16 md:gap-14 md:py-28">
        <h2 className="h-section max-w-[900px]">{SECTIONS.work}</h2>

        {featuredProjects.map((p) =>
          p.timeline ? <CaseFile key={p.slug} p={p} /> : <CaseShowcase key={p.slug} p={p} />,
        )}

        <div className="flex flex-col gap-8 lg:gap-0">
          <div
            className={cn("label hidden gap-6 border-b-[1.5px] border-lm-ink pb-3 tracking-[0.06em] lg:grid", ROW)}
            aria-hidden="true"
          >
            <span>No.</span>
            <span />
            <span>Project</span>
            <span>System</span>
            <span>What's inside</span>
            <span />
          </div>
          <IndexGroup title={SECTIONS.moreClientWork} projects={moreClientProjects} first />
          <IndexGroup
            title={SECTIONS.demos}
            note={SECTIONS.demosNote}
            projects={demoProjects}
            first={moreClientProjects.length === 0}
          />
        </div>
      </div>
    </section>
  );
}

/* ================= PROCESS ================= */

function Process() {
  return (
    <section id="process" className="border-t border-lm-ink">
      <div className="wrap flex flex-col gap-8 py-16 md:gap-12 md:py-28">
        <h2 className="h-section">{SECTIONS.process}</h2>
        <InkGrid as="ol" min={280}>
          {PROCESS.map((s, i) => {
            const last = i === PROCESS.length - 1;
            return (
              <li
                key={s.title}
                className={cn(
                  "flex items-start gap-4 p-5 md:flex-col md:gap-3.5 md:px-6 md:pb-8 md:pt-7",
                  last ? "bg-lm-accent" : "bg-white",
                )}
              >
                <span className="stretch-68 w-14 shrink-0 text-[52px] font-extrabold leading-[0.82] tracking-[-0.02em] md:w-auto md:text-[76px]">
                  {pad(i + 1)}
                </span>
                <span className="flex flex-col gap-1 md:gap-3.5">
                  <b className="text-[17px] md:text-[19px]">{s.title}</b>
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

/* ================= REVIEWS ================= */

function Reviews() {
  return (
    <section aria-labelledby="reviews-title" className="border-t border-lm-ink bg-white">
      <div className="wrap flex flex-col gap-8 py-16 md:gap-10 md:py-28">
        <h2 id="reviews-title" className="label m-0 text-[10.5px] md:text-[11.5px]">
          {SECTIONS.reviewsGhl}
        </h2>
        {/* one column on phones and tablets, three side by side on desktop */}
        <div className="grid gap-y-10 lg:grid-cols-3 lg:gap-x-10 xl:gap-x-14">
          {REVIEWS.ghl.map((r) => (
            <figure key={r.source} className="flex flex-col gap-4 md:gap-[18px]">
              <span className="flex items-center gap-2.5 font-mono text-xs font-semibold">
                <Stars className="text-[17px]" />
                {r.rating.toFixed(1)}
              </span>
              <blockquote className="stretch-80 m-0 max-w-[760px] text-[24px] font-bold leading-[1.08] tracking-[-0.01em] md:text-[30px] lg:text-[24px] xl:text-[27px]">
                “{r.text}”
              </blockquote>
              <figcaption className="font-mono text-[10.5px] uppercase text-lm-muted md:text-[11.5px]">
                {r.source}
              </figcaption>
            </figure>
          ))}
        </div>

        <div className="flex flex-col gap-5 border-t border-lm-rule pt-8">
          <h3 className="label m-0 font-normal">{SECTIONS.reviewsEarlier}</h3>
          <div
            className="grid gap-x-10 gap-y-6"
            style={{ gridTemplateColumns: "repeat(auto-fit, minmax(min(280px, 100%), 1fr))" }}
          >
            {REVIEWS.earlier.map((r) => (
              <figure key={r.text} className="flex flex-col gap-2.5">
                <blockquote className="m-0 text-[17px] font-medium leading-[1.45] md:text-lg">“{r.text}”</blockquote>
                <figcaption className="font-mono text-[11px] uppercase text-lm-muted">{r.source}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ================= CONTACT ================= */

function ContactCell({
  label,
  title,
  sub,
  href,
  highlight,
}: {
  label: string;
  title: string;
  sub: string;
  href: string;
  highlight?: boolean;
}) {
  const isMail = href.startsWith("mailto:");
  return (
    <a
      href={href}
      {...(isMail ? {} : external)}
      className={cn(
        "group flex flex-col justify-between gap-6 p-5 no-underline md:p-[26px]",
        highlight ? "col-span-full bg-lm-accent md:min-h-[150px]" : "bg-white hover:bg-lm-paper md:min-h-[190px]",
      )}
    >
      <span
        className={cn(
          "flex justify-between gap-3 font-mono text-[10.5px] uppercase tracking-[0.1em] md:text-[11px]",
          !highlight && "text-lm-muted",
        )}
      >
        {label}
        <span
          aria-hidden="true"
          className="text-sm text-lm-ink transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
        >
          ↗
        </span>
      </span>
      <span className="flex flex-col gap-1.5">
        <span className="stretch-85 break-words text-[22px] font-bold leading-[1.1] md:text-[26px]">{title}</span>
        <span className={cn("text-[13.5px] md:text-[14.5px]", !highlight && "text-lm-muted")}>{sub}</span>
      </span>
    </a>
  );
}

function Contact() {
  return (
    <section id="contact" className="border-t border-lm-ink">
      <div className="wrap flex flex-col gap-10 py-16 md:gap-12 md:pb-[104px] md:pt-28 lg:flex-row lg:items-start lg:gap-16">
        <div className="flex min-w-0 flex-col gap-6 md:gap-7 lg:flex-[5_1_0%]">
          <h2 className="stretch-70 m-0 text-balance text-[clamp(56px,6.6vw,104px)] font-extrabold leading-[0.88] tracking-[-0.025em]">
            {SECTIONS.contact}
          </h2>
          <p className="m-0 max-w-[460px] text-base leading-[1.55] text-lm-body md:text-lg">{SECTIONS.contactIntro}</p>
          <div className="flex flex-col gap-2 font-mono text-[11px] tracking-[0.03em] md:text-xs">
            <span>
              <span className="text-lm-muted">REPLIES</span> · {CONTACT.replyTime}
            </span>
            <span>
              <span className="text-lm-muted">BASED IN</span> · {PROFILE.location} ({PROFILE.timezone})
            </span>
          </div>
        </div>

        <InkGrid min={260} className="min-w-0 lg:flex-[7_1_0%]">
          <ContactCell
            highlight
            label="Upwork"
            title="Hire me on Upwork"
            sub="Top Rated Plus · 100% Job Success"
            href={CONTACT.upwork}
          />
          <ContactCell
            label="Email"
            title={CONTACT.email}
            sub="Project details, files and quotes"
            href={`mailto:${CONTACT.email}`}
          />
          <ContactCell label="WhatsApp" title="Chat on WhatsApp" sub={CONTACT.whatsapp} href={CONTACT.whatsappLink} />
          <ContactCell
            label="LinkedIn"
            title="Connect on LinkedIn"
            sub={CONTACT.linkedinShort}
            href={CONTACT.linkedin}
          />
          <ContactCell
            label="Facebook"
            title="Message on Facebook"
            sub={CONTACT.facebookShort}
            href={CONTACT.facebook}
          />
        </InkGrid>
      </div>
    </section>
  );
}

/* ================= PAGE ================= */

const Index = () => {
  usePageMeta({ title: SEO.title, description: SEO.description, path: "/" });
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main>
        <Hero />
        <Work />
        <Process />
        <Reviews />
        <Contact />
      </main>
      <TitleBlock
        nav
        cells={[
          { label: "Project", value: PROFILE.domain },
          { label: "Drawn by", value: PROFILE.name },
          { label: "Scope", value: "GHL funnels, CRM & automation" },
          { label: "Location", value: PROFILE.location },
          { label: "Sheet", value: `01 of 01 · © ${new Date().getFullYear()}` },
        ]}
      />
    </div>
  );
};

export default Index;
