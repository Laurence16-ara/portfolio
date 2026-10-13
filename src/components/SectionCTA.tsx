import { ArrowRight } from "lucide-react";
import { Reveal } from "./Reveal";

interface SectionCTAProps {
  /** Optional override for the supporting line */
  subtext?: string;
  /** Center the CTA (default) — kept for future flexibility */
  align?: "center" | "left";
}

/**
 * Reusable "Let's Work Together" call-to-action used at the end of every
 * section so the page reads as a single funnel toward booking a call.
 */
export const SectionCTA = ({
  subtext = "Book a free 30-minute discovery call and let's map out your funnel, CRM, and automation.",
  align = "center",
}: SectionCTAProps) => {
  return null;
};
