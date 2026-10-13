import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Reveal } from "@/components/Reveal";
import { Check } from "lucide-react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const DiscoveryCall = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const existing = document.querySelector(
      'script[src="https://link.funnelgenie.io/js/form_embed.js"]',
    );
    if (!existing) {
      const script = document.createElement("script");
      script.src = "https://link.funnelgenie.io/js/form_embed.js";
      script.type = "text/javascript";
      document.body.appendChild(script);
    }

    // Listen for postMessage events from the GHL calendar iframe.
    // Log EVERYTHING to identify the exact event format the CRM widget uses.
    const handleMessage = (event: MessageEvent) => {
      // Log ALL messages from any origin for debugging
      console.log("[GHL RAW MESSAGE]", {
        origin: event.origin,
        type: typeof event.data,
        dataType: event.data?.constructor?.name,
        data: event.data,
        keys:
          event.data && typeof event.data === "object"
            ? Object.keys(event.data)
            : null,
      });

      // Accept messages from any origin — the CRM may use multiple domains
      const allowedOrigins = [
        "funnelgenie.io",
        "leadconnector.io",
        "gohighlevel.com",
        "ghl.com",
        window.location.origin,
      ];

      const isAllowed = allowedOrigins.some(
        (origin) => event.origin?.includes(origin) || event.origin === origin,
      );

      if (!isAllowed) return;

      const data = event.data;
      let bookingData: Record<string, unknown> = {};

      // GHL may send data as a JSON string or an object
      if (typeof data === "string") {
        try {
          const parsed = JSON.parse(data);
          bookingData = parsed;
        } catch {
          bookingData = { _raw: data };
        }
      } else if (data && typeof data === "object") {
        bookingData = data;
      }

      // If we got ANY object-like data from the CRM domain, treat it as potential booking data
      // and store it. We'll extract fields on the thank-you page.
      if (Object.keys(bookingData).length > 0) {
        console.log("[GHL BOOKING DATA CAPTURED]", bookingData);

        // Store raw data + timestamp
        const payload = {
          ...bookingData,
          _capturedAt: new Date().toISOString(),
          _origin: event.origin,
        };

        // Merge with any previously stored data
        try {
          const prev = sessionStorage.getItem("ghl_booking");
          if (prev) {
            const prevData = JSON.parse(prev);
            Object.assign(payload, prevData, payload);
          }
        } catch {
          // ignore
        }
        sessionStorage.setItem("ghl_booking", JSON.stringify(payload));

        // Don't auto-redirect on every message — let the iframe redirect handle that.
        // Only redirect if this looks like a final confirmation.
        const confirmationKeywords = [
          "confirm",
          "success",
          "complete",
          "booked",
          "thank",
        ];
        const dataStr = JSON.stringify(bookingData).toLowerCase();
        const looksLikeConfirmation = confirmationKeywords.some((kw) =>
          dataStr.includes(kw),
        );

        if (looksLikeConfirmation) {
          setTimeout(() => navigate("/thank-you"), 500);
        }
      }
    };

    window.addEventListener("message", handleMessage);

    // Poll the iframe's contentWindow URL — when GHL redirects the iframe
    // to /thank-you (via thankYouUrl param), we redirect the parent page.
    const iframe = document.getElementById(
      "XOrKrrBf0OlB8UZInaZ3_1786523800594",
    ) as HTMLIFrameElement | null;

    const pollInterval = setInterval(() => {
      try {
        // Accessing contentWindow.location throws a cross-origin error
        // if the iframe is still on the GHL domain. But once GHL redirects
        // the iframe to our own /thank-you (same origin), we can read it.
        const iframeUrl = iframe?.contentWindow?.location?.href;
        if (iframeUrl && iframeUrl.includes("/thank-you")) {
          clearInterval(pollInterval);
          // Capture the FULL URL — GHL may append appointment data as query params
          console.log("[GHL IFRAME REDIRECT]", iframeUrl);
          const url = new URL(iframeUrl);
          const qs = url.search ? url.search : "";

          // Store any query params from the redirect URL
          if (qs) {
            const redirectParams: Record<string, string> = {};
            url.searchParams.forEach((value, key) => {
              redirectParams[key] = value;
            });
            sessionStorage.setItem(
              "ghl_redirect_params",
              JSON.stringify(redirectParams),
            );
            console.log("[GHL REDIRECT PARAMS]", redirectParams);
          }

          sessionStorage.setItem("ghl_redirect", "1");
          navigate("/thank-you" + qs);
        }
      } catch {
        // Cross-origin — iframe still on GHL domain, keep polling
      }
    }, 300);

    return () => {
      window.removeEventListener("message", handleMessage);
      clearInterval(pollInterval);
    };
  }, [navigate]);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-16">
        <section className="py-16 sm:py-20">
          <div className="mx-auto max-w-[1200px] px-5 sm:px-8">
            {/* Introduction */}
            <Reveal>
              <div className="text-center">
                <span className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">
                  Let's Talk
                </span>
                <h1 className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-[2.5rem] sm:leading-[1.15]">
                  Let's Build Your GHL System
                </h1>
                <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
                  Book a free 30-minute discovery call to discuss your funnel,
                  CRM, automation, or GoHighLevel project.
                </p>
                <p className="mt-3 text-sm font-medium text-muted-foreground/70">
                  30-minute call · No obligation · GHL-focused consultation
                </p>
              </div>
            </Reveal>

            {/* Calendar */}
            <div className="mt-10">
              <iframe
                src="https://link.funnelgenie.io/widget/booking/XOrKrrBf0OlB8UZInaZ3?thankYouUrl=/thank-you"
                allow="payment"
                style={{ width: "100%", border: "none", minHeight: "820px" }}
                scrolling="auto"
                id="XOrKrrBf0OlB8UZInaZ3_1786523800594"
                title="Discovery Call with Laurence Maligaya"
                className="rounded-lg"
              />
            </div>

            {/* What we'll cover */}
            <Reveal>
              <div className="mt-12 text-center">
                <h2 className="text-xl font-semibold text-foreground">
                  What We'll Cover
                </h2>
                <ul className="mx-auto mt-6 grid max-w-2xl gap-3 text-left sm:grid-cols-2">
                  {[
                    "Your current funnel or lead-generation process",
                    "Your CRM and automation needs",
                    "Your biggest workflow bottlenecks",
                    "The best next step for your GoHighLevel system",
                  ].map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-3 rounded-xl border border-border bg-card px-4 py-3"
                    >
                      <Check
                        size={18}
                        className="mt-0.5 shrink-0 text-accent"
                      />
                      <span className="text-sm leading-relaxed text-muted-foreground">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
                <p className="mt-8 text-sm text-muted-foreground/70">
                  No obligation. Just a straightforward conversation about what
                  you're trying to build.
                </p>
              </div>
            </Reveal>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default DiscoveryCall;
