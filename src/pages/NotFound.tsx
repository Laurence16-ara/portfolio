import { Link } from "react-router-dom";
import { PROFILE, SEO } from "@/data/site";
import { usePageMeta } from "@/hooks/use-page-meta";
import { SiteHeader, TitleBlock } from "@/components/site/Kit";

const NotFound = () => {
  usePageMeta({
    title: `Page not found | ${PROFILE.name}`,
    description: SEO.description,
    path: "/",
  });

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex flex-1 items-center">
        <div className="wrap flex flex-col items-start gap-6 py-20 md:gap-8 md:py-32">
          <span className="label">Error 404</span>
          <h1 className="stretch-68 m-0 text-[clamp(96px,18vw,240px)] font-extrabold leading-[0.8] tracking-[-0.03em]">
            404
          </h1>
          <p className="m-0 max-w-[460px] text-lg leading-normal text-lm-body md:text-xl">
            This page isn't in the drawing set. It may have moved, or the link has a typo.
          </p>
          <div className="flex flex-wrap items-center gap-x-8 gap-y-4">
            <Link to="/" className="btn btn-lg">
              Back to the homepage
            </Link>
            <Link to="/#work" className="text-base font-semibold underline">
              See the work
            </Link>
          </div>
        </div>
      </main>
      <TitleBlock
        cells={[
          { label: "Project", value: PROFILE.domain },
          { label: "Sheet", value: "404 · not found" },
        ]}
      />
    </div>
  );
};

export default NotFound;
