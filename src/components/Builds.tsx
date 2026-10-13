import { ArrowRight } from "lucide-react";
import { Reveal } from "./Reveal";
import {
  ProjectModal,
  apexRoofingData,
  trueCareDentalData,
  vantageProductData,
  funnelUpData,
  bemunchieData,
} from "./ProjectModal";
import { useState } from "react";

interface Build {
  name: string;
  category: string;
  desc: string;
  capabilities: string[];
  flow: string[];
  visualLabel: string;
  url: string;
  screenshot: string;
  isClientProject?: boolean;
  clientBadge?: string;
  clientQuote?: { text: string; author: string };
  urls?: { label: string; url: string }[];
}

const BUILDS: Build[] = [
  {
    name: "Bemunchie: Funnel Redesign & SEO Fix",
    category: "Mobile & Tablet Responsive Optimization",
    desc: "Client's existing GoHighLevel funnel had broken buttons, misaligned elements on tablet and mobile, and a layout that didn't match their site design. I rebuilt the responsive layout across 3 pages, fixed the broken elements, redesigned sections to match their brand, corrected the page slugs, and added SEO titles and descriptions.",
    capabilities: [
      "Real Client Project",
      "Mobile & Tablet Fix",
      "Responsive Redesign",
      "Button/Element Fixes",
      "SEO Title & Description",
      "URL Slug Cleanup",
    ],
    flow: ["SEO Funnel", "Responsive Layout", "Form QA"],
    visualLabel: "SEO Funnel",
    url: "https://offer.bemunchie.co.uk/lp-seo",
    screenshot:
      "https://vibe.filesafe.space/1786158431853345748/assets/7e9389cc-71e0-45ea-b05f-109620fa1d15.gif",
    isClientProject: true,
    clientBadge: "CLIENT PROJECT · AUGUST 2026",
    clientQuote: {
      text: "Thanks for the improvements so far.",
      author: "Bemunchie",
    },
    urls: [
      { label: "SEO LP 1", url: "https://offer.bemunchie.co.uk/lp-seo" },
      { label: "SEO LP 2", url: "https://offer.bemunchie.co.uk/seo-jobs-1k" },
      {
        label: "SEO LP 3",
        url: "https://offer.bemunchie.co.uk/guaranteed-rankings",
      },
    ],
  },
  {
    name: "Apex Roofing",
    category: "Lead Generation & Automated Booking System",
    desc: "A lead-generation system designed to capture roofing leads, organize them in the CRM, nurture prospects, and convert them into scheduled roof inspections.",
    capabilities: [
      "Landing Page",
      "Lead Capture",
      "CRM Pipeline",
      "Email Automation",
      "Lead Nurture",
      "Appointment Booking",
    ],
    flow: ["Landing", "Lead Capture", "CRM"],
    visualLabel: "Lead Funnel",
    url: "https://apex-roofing-guide.laurencemaligaya.com/",
    screenshot:
      "https://vibe.filesafe.space/1786158431853345748/assets/ff1a82cc-2445-49e3-b352-1584d4c5b557.png",
  },
  {
    name: "TrueCare Dental",
    category: "Appointment Booking & Follow-Up System",
    desc: "An appointment funnel designed to guide prospective patients from service selection to consultation booking, with automated reminders and follow-up built into the customer journey.",
    capabilities: [
      "Booking Page",
      "Calendar",
      "Email Reminders",
      "CRM Pipeline",
      "Follow-Up Automation",
    ],
    flow: ["Landing", "Booking", "Confirmation"],
    visualLabel: "Appointment Funnel",
    url: "https://truecare-dental.laurencemaligaya.com/",
    screenshot:
      "https://vibe.filesafe.space/1786158431853345748/assets/d74953d9-28b4-40ac-aecc-d3b8092cc5a5.png",
  },
  {
    name: "Vantage Product Systems",
    category: "Sales Funnel & Customer Follow-Up System",
    desc: "A sales funnel designed to guide customers from product discovery through checkout and payment, followed by automated product delivery and post-purchase follow-up.",
    capabilities: [
      "Sales Page",
      "Checkout",
      "Payment",
      "Product Delivery",
      "Follow-Up Automation",
    ],
    flow: ["Sales Page", "Checkout", "Payment", "Delivery", "Follow-Up"],
    visualLabel: "Sales Funnel",
    url: "https://product-launch-systems.laurencemaligaya.com/",
    screenshot:
      "https://vibe.filesafe.space/1786158431853345748/assets/e3d30502-d711-426f-b535-89915525eea0.png",
  },
  {
    name: "FunnelUp",
    category: "Lead Generation & Referral Automation",
    desc: "A lead-generation system that captures leads through AI Studio forms, identifies the lead source, tags contacts accordingly, and automates referral voucher delivery via webhooks.",
    capabilities: [
      "Lead Capture",
      "Source Identification",
      "Tagging",
      "Referral Automation",
      "Webhooks",
    ],
    flow: ["Lead Capture", "Source ID", "Tagging", "Referral"],
    visualLabel: "Lead Generation Funnel",
    url: "https://funnel-up.laurencemaligaya.com/",
    screenshot:
      "https://vibe.filesafe.space/1786158431853345748/assets/e9d7a745-987c-4126-ab96-73ddfdf38314.png",
  },
];

/* ---------- Project Screenshot Preview ---------- */
function ProjectPreview({ build }: { build: Build }) {
  return (
    <div className="relative h-full w-full bg-primary overflow-hidden group/img">
      <img
        src={build.screenshot}
        alt={`${build.name} preview`}
        className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-primary/60 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover/img:opacity-100" />

      {build.isClientProject && build.clientBadge && (
        <span className="absolute top-3 left-4 rounded-md bg-accent px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-white shadow-sm border border-white/20">
          {build.clientBadge}
        </span>
      )}

      <span className="absolute bottom-3 left-4 rounded-md bg-primary/80 backdrop-blur-md px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider text-white border border-white/10">
        {build.visualLabel}
      </span>
    </div>
  );
}

function CardBody({
  build,
  onProjectClick,
}: {
  build: Build;
  onProjectClick?: () => void;
}) {
  return (
    <div className="flex flex-1 flex-col p-7">
      <div className="flex items-center justify-between gap-2">
        <span className="text-xs font-medium text-muted-foreground">
          {build.category}
        </span>
        {build.isClientProject && (
          <span className="inline-flex shrink-0 items-center whitespace-nowrap rounded-full bg-accent/10 px-2 py-0.5 text-[9px] font-semibold text-accent border border-accent/20">
            Client Work
          </span>
        )}
      </div>

      <h3 className="mt-4 text-2xl font-bold tracking-tight text-foreground">
        {build.name}
      </h3>
      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
        {build.desc}
      </p>

      {build.clientQuote && (
        <blockquote className="mt-3 border-l-2 border-accent/40 pl-3 text-xs italic text-muted-foreground">
          "{build.clientQuote.text}" —{" "}
          <span className="font-semibold not-italic text-foreground">
            {build.clientQuote.author}
          </span>
        </blockquote>
      )}

      {/* GHL Skills / Technologies as small tags */}
      <div className="mt-5 flex flex-wrap gap-2">
        {build.capabilities.map((cap) => (
          <span
            key={cap}
            className="inline-block rounded-md border border-border bg-secondary/60 px-2.5 py-1 text-[11px] font-medium text-secondary-foreground"
          >
            {cap}
          </span>
        ))}
      </div>

      <div className="mt-auto pt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-t border-border">
        <span className="text-[11px] font-medium text-muted-foreground">
          Platform: GoHighLevel
        </span>

        {onProjectClick ? (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onProjectClick();
            }}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-accent transition-colors hover:text-accent-hover"
          >
            View Project
            <ArrowRight
              size={15}
              className="transition-transform group-hover:translate-x-0.5"
            />
          </button>
        ) : build.urls ? (
          <div className="flex flex-wrap items-center gap-2">
            {build.urls.map((item) => (
              <a
                key={item.label}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="inline-flex items-center gap-1 rounded-md border border-border bg-background px-2.5 py-1 text-xs font-semibold text-accent transition-colors hover:bg-accent hover:text-white"
              >
                {item.label}
                <ArrowRight size={12} />
              </a>
            ))}
          </div>
        ) : (
          <a
            href={build.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-accent transition-colors hover:text-accent-hover"
          >
            View Project
            <ArrowRight
              size={15}
              className="transition-transform group-hover:translate-x-0.5"
            />
          </a>
        )}
      </div>
    </div>
  );
}

export const Builds = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [activeProject, setActiveProject] = useState<
    "apex" | "truecare" | "vantage" | "funnelup" | "bemunchie"
  >("apex");

  const projectData =
    activeProject === "apex"
      ? apexRoofingData
      : activeProject === "truecare"
        ? trueCareDentalData
        : activeProject === "vantage"
          ? vantageProductData
          : activeProject === "funnelup"
            ? funnelUpData
            : bemunchieData;

  return (
    <section id="work" className="bg-secondary/40 py-12 sm:py-24">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal className="max-w-2xl">
          <span className="section-label">Selected GHL Builds</span>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            What I Build in GoHighLevel
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground">
            I build the systems behind the customer journey, from capturing a
            new lead to organizing it in the CRM, automating follow-up, and
            moving prospects toward the next step.
          </p>
        </Reveal>

        {/* Two-column row — wider, more prominent cards */}
        <div className="mt-12 grid gap-8 md:grid-cols-2">
          {BUILDS.map((build, i) => (
            <Reveal key={build.name} delay={i * 0.08}>
              <article
                onClick={() => {
                  if (build.name === "Apex Roofing") {
                    setActiveProject("apex");
                    setModalOpen(true);
                  } else if (build.name === "TrueCare Dental") {
                    setActiveProject("truecare");
                    setModalOpen(true);
                  } else if (build.name === "Vantage Product Systems") {
                    setActiveProject("vantage");
                    setModalOpen(true);
                  } else if (build.name === "FunnelUp") {
                    setActiveProject("funnelup");
                    setModalOpen(true);
                  } else if (
                    build.name === "Bemunchie: Funnel Redesign & SEO Fix"
                  ) {
                    setActiveProject("bemunchie");
                    setModalOpen(true);
                  } else if (build.url) {
                    window.open(build.url, "_blank", "noopener,noreferrer");
                  }
                }}
                className={`group flex h-full flex-col overflow-hidden rounded-2xl border bg-card shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-accent/40 hover:shadow-md ${
                  build.isClientProject
                    ? "border-accent/30 ring-1 ring-accent/20"
                    : "border-border"
                } cursor-pointer`}
              >
                <div className="relative h-64 overflow-hidden border-b border-border">
                  <ProjectPreview build={build} />
                </div>
                <CardBody
                  build={build}
                  onProjectClick={() => {
                    if (build.name === "Apex Roofing") {
                      setActiveProject("apex");
                      setModalOpen(true);
                    } else if (build.name === "TrueCare Dental") {
                      setActiveProject("truecare");
                      setModalOpen(true);
                    } else if (build.name === "Vantage Product Systems") {
                      setActiveProject("vantage");
                      setModalOpen(true);
                    } else if (build.name === "FunnelUp") {
                      setActiveProject("funnelup");
                      setModalOpen(true);
                    } else if (
                      build.name === "Bemunchie: Funnel Redesign & SEO Fix"
                    ) {
                      setActiveProject("bemunchie");
                      setModalOpen(true);
                    }
                  }}
                />
              </article>
            </Reveal>
          ))}
        </div>
      </div>

      {/* Project Modal */}
      <ProjectModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        project={projectData}
      />
    </section>
  );
};
