import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Reveal } from "@/components/Reveal";
import { Check, Calendar, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const ThankYou = () => {
  const steps = [
    {
      n: "01",
      title: "Come Prepared",
      desc: "Think about your current funnel, CRM, lead-generation process, or automation challenges.",
    },
    {
      n: "02",
      title: "We'll Review Your Needs",
      desc: "We'll discuss your current setup, goals, and biggest bottlenecks.",
    },
    {
      n: "03",
      title: "We'll Discuss the Next Step",
      desc: "We'll identify practical ways GoHighLevel can help improve your process.",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-16">
        <section className="py-16 sm:py-24">
          <div className="mx-auto max-w-2xl px-5 sm:px-8">
            {/* Confirmation */}
            <Reveal>
              <div className="text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-accent/10">
                  <Check size={30} className="text-accent" strokeWidth={2.5} />
                </div>
                <span className="mt-6 block text-xs font-semibold uppercase tracking-[0.18em] text-accent">
                  Booking Confirmed
                </span>
                <h1 className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                  Your Discovery Call Is Booked!
                </h1>
                <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-muted-foreground">
                  Thanks for scheduling a call with me. I'm looking forward to
                  learning more about your business and your GoHighLevel goals.
                </p>
              </div>
            </Reveal>

            {/* Meeting details note */}
            <Reveal>
              <div className="mt-10 rounded-2xl border border-border bg-card p-6 sm:p-8 text-center">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-lg bg-accent/10">
                  <Calendar size={22} className="text-accent" />
                </div>
                <p className="mt-4 text-base font-medium text-foreground">
                  A confirmation email is on its way to your inbox.
                </p>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  Your meeting details — including the date, time, time zone,
                  and meeting link — have been sent to the email address you
                  used to book.
                </p>
              </div>
            </Reveal>

            {/* What happens next */}
            <Reveal>
              <div className="mt-12">
                <h2 className="text-center text-xl font-semibold text-foreground">
                  What Happens Next
                </h2>
                <div className="mt-6 space-y-5">
                  {steps.map((s) => (
                    <div
                      key={s.n}
                      className="flex items-start gap-4 rounded-xl border border-border bg-card px-5 py-4"
                    >
                      <span className="text-sm font-bold text-accent">
                        {s.n}
                      </span>
                      <div>
                        <p className="text-sm font-semibold text-foreground">
                          {s.title}
                        </p>
                        <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                          {s.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>

            {/* CTA */}
            <div className="mt-8 text-center">
              <Link
                to="/"
                className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-5 py-2.5 text-sm font-semibold text-foreground transition-colors hover:border-accent hover:text-accent"
              >
                Back to My Portfolio
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default ThankYou;
