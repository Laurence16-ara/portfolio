import { Reveal } from "./Reveal";
import { ArrowRight } from "lucide-react";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";

const FAQS = [
  {
    q: "What can you help me build in GoHighLevel?",
    a: "I can build funnels, landing pages, forms, calendars, CRM pipelines, workflows, email/SMS automations, and complete lead-generation systems in GoHighLevel.",
  },
  {
    q: "Can you build a complete lead-generation system?",
    a: "Yes. I can connect the entire customer journey, from lead capture and follow-up to appointment booking, CRM management, and automation.",
  },
  {
    q: "Can you work with an existing GoHighLevel account?",
    a: "Yes. I can build, optimize, troubleshoot, and improve existing GHL funnels, workflows, pipelines, and automations.",
  },
  {
    q: "Do you provide strategy as well as the technical setup?",
    a: "Yes. I focus on both the technical implementation and the customer journey, conversion flow, and automation logic behind the system.",
  },
  {
    q: "Are the projects in your portfolio real client projects?",
    a: "Some projects are demonstration builds created to showcase my GoHighLevel capabilities. They demonstrate how I approach funnels, CRM systems, automations, and lead-generation workflows.",
  },
];

export const FAQ = () => {
  return (
    <section id="faq" className="bg-background py-12 sm:py-24">
      <div className="mx-auto max-w-3xl px-5 sm:px-8">
        <Reveal>
          <div className="text-center">
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">
              Frequently Asked Questions
            </span>
            <h2 className="mt-2 text-2xl font-bold tracking-tight text-foreground sm:mt-3 sm:text-[2.5rem] sm:leading-[1.15]">
              Have Questions Before We Get Started?
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-base leading-relaxed text-muted-foreground sm:mt-4 sm:text-lg">
              Here are some of the most common questions about my GoHighLevel
              services, process, and portfolio.
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mt-10 rounded-2xl border border-border bg-card px-6 sm:mt-12 sm:px-8">
            <Accordion type="single" collapsible className="w-full">
              {FAQS.map((faq, i) => (
                <AccordionItem
                  key={i}
                  value={`item-${i}`}
                  className="border-b border-border last:border-b-0"
                >
                  <AccordionTrigger className="py-3.5 text-left text-base font-semibold text-foreground hover:no-underline sm:py-5 sm:text-lg">
                    {faq.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-sm leading-relaxed text-muted-foreground sm:text-base">
                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </Reveal>

        <Reveal delay={0.15}>
          <div className="mt-10 text-center sm:mt-12">
            <h3 className="text-2xl font-bold tracking-tight text-foreground">
              Ready to Build Your GHL System?
            </h3>
            <p className="mx-auto mt-3 max-w-md text-base leading-relaxed text-muted-foreground">
              Let's turn your ideas into a streamlined funnel, CRM, and
              automation system.
            </p>
            <a
              href="/discovery-call"
              className="mt-6 inline-flex items-center gap-2 rounded-lg bg-accent px-6 py-3.5 text-sm font-semibold text-accent-foreground shadow-sm transition-all hover:bg-accent-hover hover:shadow-md"
            >
              Let's Work Together
              <ArrowRight size={16} />
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
};
