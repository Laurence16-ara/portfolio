// Pre-render every page of the built site into static HTML for GitHub Pages.
// usage: npm run build, run "npx vite preview --port 4173" in another terminal, then:
//   CHROME_PATH=/path/to/chrome node scripts/prerender.mjs dist site http://localhost:4173
// Upload the contents of the "site" folder to the GitHub repository.
import { chromium } from "playwright-core";
import fs from "node:fs";
import path from "node:path";

const [, , dist, out, base] = process.argv;
const slugs = ["the-french-perspective", "desert-flour-desserts", "bemunchie", "apex-roofing", "truecare-dental", "vantage-product-systems", "funnelup"];
const pixel = Buffer.from("iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=", "base64");

fs.rmSync(out, { recursive: true, force: true });
fs.cpSync(dist, out, { recursive: true });
const shell = fs.readFileSync(path.join(dist, "index.html"), "utf8");

const browser = await chromium.launch({ executablePath: process.env.CHROME_PATH });
async function render(route) {
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.route("https://fonts.googleapis.com/**", (r) => r.fulfill({ contentType: "text/css", body: "" }));
  await page.route(/filesafe\.space/, (r) => r.fulfill({ contentType: "image/png", body: pixel }));
  await page.goto(base + route, { waitUntil: "load" });
  await page.waitForSelector("h1");
  await page.waitForTimeout(600);
  const html = "<!doctype html>\n" + (await page.evaluate(() => document.documentElement.outerHTML));
  await page.close();
  return html;
}
const write = (rel, html) => {
  const file = path.join(out, rel);
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, html);
  console.log("wrote", rel, Math.round(html.length / 1024) + "KB");
};

write("index.html", await render("/"));
for (const s of slugs) {
  const html = await render(`/work/${s}`);
  write(`work/${s}.html`, html); // GitHub Pages serves /work/<slug> from this
  write(`work/${s}/index.html`, html); // and /work/<slug>/ from this
}
write("404.html", await render("/this-page-does-not-exist"));
// old pages: the app forwards these to the contact section
write("discovery-call.html", shell);
write("thank-you.html", shell);
await browser.close();
