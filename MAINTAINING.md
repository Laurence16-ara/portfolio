# laurencemaligaya.com: how to update this site

The site has two parts:

- **Content** lives in one file, `src/data/site.ts`. This covers projects, stats, reviews, contact links and headings. Almost every update happens there.
- **Layout** lives in a handful of files that read from `site.ts`. You rarely need to touch them.

---

## 1. Moving the new design into Vibe (one time)

Vibe has no import button, so files go in by copy and paste. Do the steps in this order: the new files have to exist before the files that use them.

### Step 1: Upload the images

These images are new, so they aren't hosted anywhere yet:

| File | What it is | Used in |
|---|---|---|
| `public/images/portrait.jpg` | your photo | `site.ts` → `PROFILE.portrait` |
| `public/images/tfp-vsl.jpg` | The French Perspective VSL page | `site.ts` → the-french-perspective |
| `public/images/dfd-home.jpg` | Desert Flour Desserts homepage | `site.ts` → desert-flour-desserts |
| `public/images/bem-lp1.jpg` | Bemunchie SEO landing page | `site.ts` → bemunchie |
| `public/images/bem-rankings.jpg` | Bemunchie rankings page | `site.ts` → bemunchie |
| `public/images/og.jpg` | link preview (Facebook, LinkedIn, WhatsApp) | `index.html` (3 places) |
| `public/apple-touch-icon.png` | iPhone home-screen icon | `index.html` |

You have two ways to do this:

- **If Vibe lets you add files to `public/`**, put them in the same folders and you're done. The paths already match.
- **If it doesn't**, upload each image the way you uploaded your current screenshots, so you get a `https://vibe.filesafe.space/...` link. Then replace the path in the file listed above. For example, `"/images/tfp-vsl.jpg"` becomes `"https://vibe.filesafe.space/.../abc.jpg"`. In `index.html`, replace `https://laurencemaligaya.com/images/og.jpg` with the new link.

Until an image is uploaded, the site shows a grey hatched box where it should be. If your new portrait is missing, the site uses your current photo instead.

### Step 2: Create the new files

Create each file at exactly this path and paste in its contents:

1. `src/data/site.ts`
2. `src/hooks/use-page-meta.ts`
3. `src/components/site/Kit.tsx`
4. `src/components/site/Workflow.tsx`
5. `src/pages/Project.tsx`
6. `src/test/site.test.tsx` (optional: these are automatic checks)

### Step 3: Replace these files

Select everything in the file and paste the new version over it:

1. `tailwind.config.ts`
2. `src/index.css`
3. `index.html`
4. `public/favicon.svg`
5. `src/pages/Index.tsx`
6. `src/pages/NotFound.tsx`
7. `src/App.tsx` ← do this one last

### Step 4: Delete the old files

The new design no longer uses these. If Vibe won't let you delete files, you can leave **all** of them in place and nothing breaks. Don't delete only some of them, though, because several import each other.

```
src/App.css
src/components/About.tsx        src/components/NavLink.tsx
src/components/Builds.tsx       src/components/Process.tsx
src/components/Capabilities.tsx src/components/ProjectModal.tsx
src/components/Contact.tsx      src/components/Reveal.tsx
src/components/FAQ.tsx          src/components/SectionCTA.tsx
src/components/Footer.tsx       src/components/Testimonials.tsx
src/components/Hero.tsx         src/pages/DiscoveryCall.tsx
src/components/Navbar.tsx       src/pages/ThankYou.tsx
```

Leave `src/components/ui/`, `src/lib/` and `src/hooks/` alone, apart from the one new hook file from Step 2.

### Step 5: Check it

Open the preview and click through:

- `/` is the homepage. "Work", "Process" and "Contact me" should jump to their sections.
- `/work/the-french-perspective`, `/work/desert-flour-desserts`, `/work/bemunchie`
- `/work/apex-roofing`, `/work/truecare-dental`, `/work/vantage-product-systems`, `/work/funnelup`
- `/discovery-call` and `/thank-you` should now land on the contact section (these were the old booking pages).
- `/anything-else` should show the 404 page.
- Check it on your phone too.

---

## 2. Everyday updates (all in `src/data/site.ts`)

The file is split into labelled blocks. Find the block, edit the text between the quotes, and save.

| To change… | Edit this block |
|---|---|
| Headline and intro under your name | `HERO` |
| Stats strip (100%, Top Rated Plus…) | `STATS` |
| Certificate | `CERTIFICATION` |
| Email, WhatsApp, Upwork, LinkedIn, Facebook, reply time | `CONTACT` |
| Section headings ("How a build runs.", contact heading…) | `SECTIONS` |
| The 4 process steps | `PROCESS` |
| Reviews on the homepage | `REVIEWS` (`ghl` = big quotes, `earlier` = small quotes) |
| Google title and description | `SEO` |
| Photo, or black & white vs colour | `PROFILE.portrait`, `PROFILE.portraitBlackAndWhite` |
| Projects | `PROJECTS` (see below) |

### Adding a project

Copy an existing project block from `{` to `},` and paste it where you want it in the list. The order in the list is the order on the site. Then change:

- `slug`: the web address. `"roof-co"` becomes `/work/roof-co`. Use lowercase letters, numbers and dashes only, and make it unique.
- `code`: for example `"C-04"` for client work or `"D-05"` for a demo.
- `kind`: `"client"` or `"demo"`. Client work is listed before demos.
- `featured: true`: gives a client project the big case on the homepage. Leave it out to list the project in the index table.
- `name`, `title`, `category`, `system`, `inside`, `badge`, `summary`, `ctaLine`: the text.
- `thumbnail` and `images`: image links. The first image is shown large. `frame` is the text in the fake browser bar.
- `primaryLink`: the orange button, for example `{ label: "View live site", href: "https://..." }`.
- `specs`: the label and value boxes under the title.

Optional sections only appear when you fill them in:

- `workflows`: GHL workflows. Each step has a `kind`: `"trigger"`, `"action"`, `"wait"`, `"check"` or `"end"`.
- `pipeline`: CRM stages, for example `["New Lead", "Booked", "Won"]`. The stage called "Won" is highlighted.
- `timeline`: numbered phases for repeat clients. A featured project with a timeline gets the case-file layout on the homepage.
- `problem` / `solution`, `orderForm`, `steps`, `quotes`.

Every project page is built from this data, so adding a project never means creating a new page.

### Changing the orange

Edit `--lm-accent` near the top of `src/index.css`. The favicon, the iPhone icon and the link-preview image have the orange baked in, so those three stay orange.

### Apex diagram

The drawn flowchart on the Apex Roofing page is hand-placed in `src/components/site/Workflow.tsx`, so it doesn't update from `site.ts`. If you change that workflow, edit the steps in `site.ts`, which phones use. Then tell me, and I'll redraw the diagram for desktop.

---

## 3. Before you publish, please confirm

- **Process step 04 ("Launch")** says: "We go live, and everything stays in your account." Change it in `PROCESS` if you hand over something specific, such as a walkthrough video or docs.
- **Desert Flour Desserts link** points to a GHL preview URL (`api.chhomeservices.com/preview/...`). Swap it for the client's real domain once it's live.
- **The second French Perspective review** ends in "…". Paste the full text from Upwork into `REVIEWS.ghl` and into the project's `quotes`.
- **FAQ and About sections** were dropped, following the approved mockup. Their old text is still in the original export if you want any of it back.
- **Link previews**: Facebook and LinkedIn cache old previews. After publishing, paste your URL into the Facebook Sharing Debugger and LinkedIn Post Inspector to refresh them.

---

## File map

```
src/data/site.ts               ← all content (edit this)
src/pages/Index.tsx            homepage layout
src/pages/Project.tsx          project page template (/work/<slug>)
src/pages/NotFound.tsx         404 page
src/components/site/Kit.tsx    logo, header, footer, grids, browser frames
src/components/site/Workflow.tsx  workflow steps, pipeline, Apex diagram
src/hooks/use-page-meta.ts     browser-tab title + Google description per page
src/App.tsx                    page addresses + old-page redirects
src/index.css                  colours, fonts, shared styles
tailwind.config.ts             font + colour names used in the layout files
index.html                     SEO tags, fonts, link preview, favicon
```

---

## Publishing on GitHub Pages (free)

The live site is a folder of plain files on GitHub Pages, using your domain from Namecheap.

To publish a change:

1. Edit `src/data/site.ts` (or ask Claude to).
2. Build the upload folder: `npm run build`, then run `scripts/prerender.mjs` (instructions at the top of that file). It writes a `site` folder with one ready-made page per project.
3. In your GitHub repository, choose **Add file → Upload files**, drag in everything from the `site` folder, and commit. Same-named files are replaced.

If you add a project, also add its address to `public/sitemap.xml` and to the `slugs` list in `scripts/prerender.mjs`.
