import { render, screen } from "@testing-library/react";
import App from "@/App";
import { HERO, PROJECTS } from "@/data/site";

beforeAll(() => {
  window.scrollTo = vi.fn() as unknown as typeof window.scrollTo;
  Element.prototype.scrollIntoView = vi.fn();
});

const visit = (path: string) => {
  window.history.pushState({}, "", path);
  return render(<App />);
};

describe("site data (src/data/site.ts)", () => {
  it("has a unique slug and code for every project", () => {
    const slugs = PROJECTS.map((p) => p.slug);
    const codes = PROJECTS.map((p) => p.code);
    expect(new Set(slugs).size).toBe(slugs.length);
    expect(new Set(codes).size).toBe(codes.length);
    slugs.forEach((s) => expect(s).toMatch(/^[a-z0-9-]+$/));
  });

  it("gives every numbered workflow step a matching note", () => {
    PROJECTS.flatMap((p) => p.workflows ?? []).forEach((w) => {
      w.steps.forEach((s) => {
        if (s.note) expect(w.notes?.[s.note - 1], `${w.title}: note ${s.note}`).toBeDefined();
      });
    });
  });
});

describe("pages", () => {
  it("renders the homepage with every project in it", () => {
    visit("/");
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(HERO.headline);
    PROJECTS.forEach((p) => {
      expect(document.querySelector(`a[href="/work/${p.slug}"]`), p.slug).not.toBeNull();
    });
  });

  it.each(PROJECTS.map((p) => [p.name, p]))("renders the %s project page", (_, p) => {
    visit(`/work/${p.slug}`);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(p.name);
    expect(document.title).toContain(p.name);
  });

  it("shows the 404 page for unknown addresses", () => {
    visit("/work/not-a-project");
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("404");
  });

  it("sends the old booking pages to the contact section", () => {
    visit("/discovery-call");
    expect(window.location.pathname).toBe("/");
    expect(window.location.hash).toBe("#contact");
  });
});
