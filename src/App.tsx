import { useEffect, useRef } from "react";
import { BrowserRouter, Navigate, Route, Routes, useLocation, useNavigationType } from "react-router-dom";
import Index from "./pages/Index";
import ProjectPage from "./pages/Project";
import NotFound from "./pages/NotFound";

/* Scrolls to the top on a new page, or to #section when the link has one
   (e.g. "/#contact" from a project page). Back/forward keeps your place. */
function ScrollManager() {
  const { pathname, hash, key } = useLocation();
  const navType = useNavigationType();
  const lastPath = useRef<string | null>(null);

  useEffect(() => {
    const firstLoad = lastPath.current === null;
    const samePage = lastPath.current === pathname;
    lastPath.current = pathname;

    if (navType === "POP" && !firstLoad) return;

    if (hash) {
      const id = decodeURIComponent(hash.slice(1));
      const behavior: ScrollBehavior = samePage ? "smooth" : "instant";
      const go = () => document.getElementById(id)?.scrollIntoView({ behavior, block: "start" });
      go();
      if (!samePage) {
        // run again once fonts and images have settled the layout
        const t = window.setTimeout(go, 250);
        return () => window.clearTimeout(t);
      }
      return;
    }

    if (!samePage) window.scrollTo({ top: 0, behavior: "instant" });
  }, [pathname, hash, key, navType]);

  return null;
}

const App = () => (
  <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
    <ScrollManager />
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/work/:slug" element={<ProjectPage />} />
      {/* old pages from the previous site now land on the contact section */}
      <Route path="/discovery-call" element={<Navigate to="/#contact" replace />} />
      <Route path="/thank-you" element={<Navigate to="/#contact" replace />} />
      {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  </BrowserRouter>
);

export default App;
