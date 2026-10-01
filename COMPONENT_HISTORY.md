# Portfolio Component Architecture & Change History

> **Last Updated:** 2026-10-01  
> **Repository:** https://github.com/ShashankSurwase/Portfolio.git (`main` branch)  
> **Live Site:** https://shashanksurwase.github.io/Portfolio/

---

## 1. Landing Page Component Map (`app/page.tsx`)

| Order | Component | Purpose | Key Content / State |
| :--- | :--- | :--- | :--- |
| 1 | [`FolioNav.tsx`](file:///home/shashank/Career/portfolio-site/components/folio/FolioNav.tsx) | Sticky header navigation | Brand logo, nav links (`#about`, `#experience`, `#projects`, `#skills`, `#contact`), ThemeToggle |
| 2 | [`FolioHero.tsx`](file:///home/shashank/Career/portfolio-site/components/folio/FolioHero.tsx) | Hero introduction | Headline, 3 core impact bullet points, CTA buttons, photo + motto quote |
| 3 | [`FolioAbout.tsx`](file:///home/shashank/Career/portfolio-site/components/folio/FolioAbout.tsx) | Executive philosophy & approach | CFO quote banner, 3-tab switcher (Mental Models, Patterns That Transfer, How I Operate), Beyond the Terminal |
| 4 | [`FolioStats.tsx`](file:///home/shashank/Career/portfolio-site/components/folio/FolioStats.tsx) | Top-line impact numbers | $1.05M recovered, 131 pipelines, 245 plants, 120+ hours saved |
| 5 | [`FolioJourney.tsx`](file:///home/shashank/Career/portfolio-site/components/folio/FolioJourney.tsx) | Career progression accordion | Delphi Analytics (5 roles, 2021–Present). *Note: Unstaged edits exist—preserve them.* |
| 6 | [`FolioProjects.tsx`](file:///home/shashank/Career/portfolio-site/components/folio/FolioProjects.tsx) | Deep-dive case studies | Multi-Client Ecommerce Platform, EdTech Analytics Suite, Solar EMS Platform |
| 7 | [`FolioSkills.tsx`](file:///home/shashank/Career/portfolio-site/components/folio/FolioSkills.tsx) | Categorized tech stack & portals | Clean tool tags + dedicated Marketplaces & Ingestion Portals UI/backend card |
| 8 | [`FolioCertifications.tsx`](file:///home/shashank/Career/portfolio-site/components/folio/FolioCertifications.tsx) | Upcoming & ongoing learning | Infinite right-to-left marquee ticker with 6 ongoing certificates |
| 9 | [`FolioContact.tsx`](file:///home/shashank/Career/portfolio-site/components/folio/FolioContact.tsx) | Reach out & profiles | Clean LinkedIn/GitHub profiles, Email & Phone with 1-click Copy button, Pune location pill |
| 10 | [`FolioFooter.tsx`](file:///home/shashank/Career/portfolio-site/components/folio/FolioFooter.tsx) | Footer | Copyright, tech stack credits, back to top |

---

## 2. Recent Change History Log (2026-10-01)

### `FolioAbout.tsx` (Major Redesign)
- **Executive Hook**: Added CFO quote: *"My measure of success isn't 'does the pipeline run?' — it's 'can the CFO defend this number in a board meeting?'"* and core belief in audit-grade data.
- **Removed IEC 61724 & Toned Down Solar**: Completely eliminated IEC 61724 references and balanced domain examples evenly across Ecommerce, EdTech, and Enterprise platforms.
- **Interactive 3-Tab Controller**:
  - **Tab 1: How I Think (Mental Models)**: Standards-First, Enablement > Handoff, Domain Before Stack, Reliability > Speed, Systems That Outlive Me.
  - **Tab 2: Patterns That Transfer**: Identity Resolution, Late-Arriving Data, Source of Truth Audit, Stakeholder Translation.
  - **Tab 3: How I Operate (Rigor)**: Go On-Site, Write to Think, Data Quality as a Product, Teach What I Build, Cost & Correctness Co-Optimized.
- **Beyond the Terminal**: Added 3 lightweight discipline cards (Marathon Discipline, The 2-Minute Rule, Hardware & Home Lab).

### `FolioSkills.tsx`
- **Marketplaces & Portals Card**: Added domain description highlighting merchant portal UI/backend navigation, report reconciliation, and automated ingestion.
- **Skill Badges**: Stripped all parenthetical counts (e.g. `(131 DAGs)`). Removed deprecated tools (`R`, `pandas`, `numpy`, `scikit-learn`, `bash/shell`) and added `Fast APIs` & `MIS in Reporting`.

### `FolioContact.tsx`
- **Profiles**: Removed raw URL strings (`linkedin.com/in/...` and `github.com/...`). Displays clean names (`Shashank Surwase`, `ShashankSurwase`) opening externally (`_blank`).
- **No Forced Redirects**: Removed `mailto:` and `tel:` auto-launches. Users can read and copy text with a 1-click **Copy** button showing visual `"Copied!"` green confirmation.
- **Pune Location Badge**: Redesigned into a prominent pill badge with an active green pulse dot: `🟢 Based in Pune, India · Available for Remote & Hybrid Roles`.

### `FolioCertifications.tsx`
- Added infinite rolling right-to-left ticker with 6 ongoing certificates (AWS Data Engineering, Google Data Analytics, dbt Fundamentals, Linux LFS101x, LLM Zoomcamp, AI Agents).

### `FolioHero.tsx`
- Added personal quote below the portrait photo:
  *“Debug your history, open-source what you learn, and keep deploying a better version of yourself.”*

---

## 3. How to Resume & Use This History in Next Sessions (Step-by-Step)

When starting a new session or prompting an AI assistant:

### Step 1: Provide Context Prompt
Say:
> *"Read `COMPONENT_HISTORY.md` in `portfolio-site/` and `SESSION_SUMMARY.md` in `Career/` to understand the current site architecture and recent changes before making updates."*

### Step 2: Component Verification Rule (Lightweight)
**CRITICAL:** NEVER run `npm run dev` or local Next.js background dev servers (they cause 100% RAM lockup and thermal freeze).
Instead, verify any code edit using:
```bash
cd /home/shashank/Career/portfolio-site
npx tsc --noEmit
```

### Step 3: Git & Deployment Rule
1. Check git status to see modified files:
   ```bash
   git status
   ```
2. **DO NOT** stage `components/folio/FolioJourney.tsx` (it contains pre-existing unstaged client confidentiality edits).
3. Stage only the targeted files:
   ```bash
   git add components/folio/<ModifiedComponent>.tsx
   git commit -m "feat/fix: <clear description>"
   git push origin main
   ```
4. Remote GitHub Actions automatically triggers and deploys to GitHub Pages in ~40 seconds:
   - Monitor via:
     `curl -s -H "Authorization: token <PAT>" "https://api.github.com/repos/ShashankSurwase/Portfolio/actions/runs?per_page=1"`
   - Live URL: `https://shashanksurwase.github.io/Portfolio/`

### Step 4: Confidentiality Standing Rule
- **Never** expose real client company names (use industry descriptors: *D2C Apparel Brand*, *K-Beauty Brand*, *Coaching Institutes*, *Solar IPP*). Public marketplace channels (*Amazon*, *Flipkart*, *Shopify*, *Myntra*) are safe to name.
