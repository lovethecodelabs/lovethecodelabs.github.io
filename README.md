# GitHub Report: `lovethecodelabs`

---
 
## 1. Summary
 
| Area | Highlights |
| --- | --- |
| **Code4Recovery** | 9 years of contributions to the 12 Step Meeting List (TSML) WordPress plugin, 2017–2026. Created two Angular meeting-finder repos in the `code4recovery` org. Invited as a requested reviewer on the TSML 3.19.20 release. |
| **Shipped upstream** | PR #19 (2017), adding a meeting-count setting to the "closest meetings" widget. PR #2028 (2026), adding schema.org `Event` structured data, released in **TSML v3.19.20**. |
| **JSP / Java** | `webapp-jsp-tomcat`: a hand-built MVC website with a Servlet controller, JSP views, and a MariaDB/MySQL DAO, deployed on Tomcat 8.5. |
| **Stack** | PHP / WordPress, Angular 22 / TypeScript, Java Servlets / JSP, MariaDB, nginx, JSON-LD / schema.org, Meeting Guide and BMLT feed formats |
 
---
 
<div x-data="reveal" markdown="1">
## 2. Repository Inventory
 
| Repository | Owner | Type | Language | Commits by Matthew | Activity |
| --- | --- | --- | --- | --- | --- |
| [`webapp-jsp-tomcat`](https://github.com/lovethecodelabs/webapp-jsp-tomcat) | lovethecodelabs | Original | Java / JSP | 28 of 28 | Jan 2023 (code dated Sep 2021) |
| [`12-step-meeting-list`](https://github.com/lovethecodelabs/12-step-meeting-list) | lovethecodelabs | Copy of TSML (1,636 commits) | PHP | Feature work + PR merges | Oct 2026 |
| [`12-step-meeting-list-1`](https://github.com/lovethecodelabs/12-step-meeting-list-1) | lovethecodelabs | Fork of `code4recovery/12-step-meeting-list` | PHP | 1 (PR source branch) | Oct 2026 |
| [`tsml-angular`](https://github.com/code4recovery/tsml-angular) | **code4recovery** | Original | TypeScript (Angular) | 20 of 20 | Oct 2023 → Oct 2026 |
| [`bmlt-angular`](https://github.com/code4recovery/bmlt-angular) | **code4recovery** | Original | TypeScript (Angular) | 5 of 5 | Oct 2026 |
 
</div>
---
 
<div x-data="reveal" markdown="1">
## 3. Code4Recovery Contributions
 
[Code4Recovery](https://code4recovery.org/) is a volunteer group that builds open-source tools for recovery fellowships (AA, NA, Al-Anon, and others). Its main project is the **12 Step Meeting List** WordPress plugin.
 
</div>
---
 
<div x-data="reveal" markdown="1">
### 3.1 12 Step Meeting List (TSML): upstream contributions
 
**2017: Meeting Guide era (the project's earlier home before Code4Recovery)**
 
| Commit | Date | Change |
| --- | --- | --- |
| `90a56f6`, `3b4418e` | 2017-10-02 | New widget and AJAX code (`widgets.php`, `ajax.php`, `functions.php`, `shortcodes.php`): +222 / −52 |
| `45442ac` | 2017-10-17 | Expanded `closestmeetings.min.js` (+49 lines) |
| `7ab78e9` | 2017-10-17 | **Widget & Ajax expansion**: +213 / −115 across `ajax.php` and `widgets.php` |
| `c55d6f1` | 2017-10-17 | Set the PHP timezone from WordPress settings |
| `717dc05`, `13dbc51` | 2017-10-27 | Widget CSS updates |
| **PR #19** (`a0c5ee4`) | 2017-11-01 | *"update to select # of meetings to display"*, merged by maintainer Josh Reisner |
 
These commits are still in the history of `main` and have been in every release since **v3.9.0**.
 
**2026: Code4Recovery era**
 
| PR | Date | Status | Change |
| --- | --- | --- | --- |
| [**#2028**](https://github.com/code4recovery/12-step-meeting-list/pull/2028) | Opened Oct 8, merged Oct 31, 2026 | ✅ Merged, approved by `joshreisner`, shipped in **v3.19.20** | Adds a top-level `startDate` to each meeting's schema.org `Event` in `templates/archive-locations.php` |
 
*Why #2028 matters:* the locations archive outputs JSON-LD where `startDate` only appeared inside `eventSchedule`. Google and schema.org treat a top-level `startDate` as **required** on an `Event`, so validators flagged every meeting and none qualified for event rich results. The fix is one line that reuses the date value already computed:
 
```php
"startDate" => $meeting['start_date']->format('Y-m-d'),
```
 
The change was first tested in his own copy as PRs #17 and #18 (`feature/better-location-schema`), then submitted upstream from the fork `12-step-meeting-list-1`.
 
**Maintainer role:** on Nov 7, 2026, `lovethecodelabs` was one of five requested reviewers on [PR #2048, "prepare release 3.19.20"](https://github.com/code4recovery/12-step-meeting-list/pull/2048), along with the project's core contributors.
 
</div>
---
 
<div x-data="reveal" markdown="1">
### 3.2 `code4recovery/tsml-angular`: TSML-Ang
 
An Angular 22 version of Code4Recovery's React meeting finder, [`tsml-ui`](https://github.com/code4recovery/tsml-ui). Matthew wrote all 20 commits.
 
- **History:** started in Oct 2023 as a plain HTML/JS/CSS prototype, then rebuilt in Oct 2026 as an Angular app (PR #1, `tsml-ang/translated-from-react`).
- **Behavior matches tsml-ui:** filters live in the URL query string, so links and the back button work. Day, time-window, type (AND-ed), region, attendance, and text filters. A responsive table, and a detail view with join links, directions, and other meetings at the same location.
- **Additions beyond tsml-ui:** *Add to calendar* (Google Calendar and `.ics` download). Events repeat weekly in the meeting's own time zone, and the file includes a generated `VTIMEZONE` block so Outlook desktop handles them correctly (`models/calendar.ts`).
- **PR #2** (Oct 2026): *"Add Central Query API or TSML JSON to feed"*. The app now accepts either a standard TSML / Meeting Guide JSON feed or Code4Recovery's Central (MongoDB) Query API, through a reworked `normalize.ts` (+107 / −9).
- **Size:** 25 source files, about 1,200 lines of TypeScript.
- **Not built yet:** map view, distance sorting, translations.
</div>
---
 
<div x-data="reveal" markdown="1">
### 3.3 `code4recovery/bmlt-angular`: NA meeting finder
 
A version of TSML-Ang for Narcotics Anonymous, built for **BMLT** (Basic Meeting List Toolbox) root servers. Matthew wrote all 5 commits, Oct 4–5, 2026.
 
- Configured for the Southern California NA BMLT feed on todayna.org, and deployed at `matthews.help/na/`.
- `models/bmlt.ts` converts BMLT records into the Meeting Guide format (for example, `weekday_tinyint` 1–7 becomes day 0–6). Meeting-type labels come from the server's own format list (`get_used_formats=1`), with built-in NA labels as a fallback.
- Ships deployment files: `deploy/deploy.sh` and `deploy/nginx-na.conf`.
</div>
---
 
<div x-data="reveal" markdown="1">
### 3.4 What the Code4Recovery work shows
 
1. **He follows the project through its history**, from the Meeting Guide days in 2017 to the current Code4Recovery organization in 2026.
2. **He works across the whole meeting-data pipeline:** the WordPress plugin that publishes feeds (PHP), the front ends that display them (Angular), and the formats in between (Meeting Guide JSON, Central API, BMLT).
3. **His recent upstream work targets SEO and structured data** (schema.org / JSON-LD), which fits his rank-tracking and web-consulting background.
4. **He follows the project's contribution workflow:** test in a copy, branch, open a PR from a fork, get review, ship in a tagged release.
</div>
---
 
<div x-data="reveal" markdown="1">
## 4. JSP / Java Programming: `webapp-jsp-tomcat`
 
> *"This website was build using Java/JSP/Tomcat & a MySQL database. It uses the MVC Paradigm…"* (repo README)
 
A small, hand-written content site for "Matthew's Business". It uses no framework: just Servlets, JSP, and JDBC. The code headers date from **Sep 2021**, and it was uploaded to GitHub in Jan 2023. The README says it runs on **Tomcat 8.5** at `matthews.business` and can be deployed as is or packaged as a `.war` through Tomcat Manager.
 
</div>
---
 
<div x-data="reveal" markdown="1">
### 4.1 Architecture
 
```
WEB-INF/web.xml        → maps "/" to Controller; *.css/*.jpg/*.png to Tomcat's default servlet
src/Controller.java    → front-controller HttpServlet (194 lines)
src/Page.java          → JavaBean (pageName, pageLoc, content)
src/PageDAO.java       → MariaDB/MySQL data access via JDBC (117 lines)
web/View.jsp           → standard page template
web/View_homepage.jsp  → homepage template (adds a 3-column sub-content row)
web/header.jsp, footer.jsp, main_content.jsp, sidebar_1.jsp, sidebar_2.jsp → included fragments
web/t.jsp              → scratch/test page with inline JDBC
```
 
| MVC layer | How it's done |
| --- | --- |
| **Controller** | `Controller.doGet()` takes the last URL segment and routes `/`, `about`/`about.do`, `contact`/`contact.do`, and `t`. Each route sets the request attributes (`Title`, `metaKey`, `metaDesc`, `Name`) and forwards to a template with `RequestDispatcher`. |
| **Model** | `PageDAO.queryPageContent(name, loc)` reads content blocks from a `pagetable` keyed by page and region (`main`, `side1`, `side2`). In effect it's a small database-driven CMS. |
| **View** | JSP templates built from `<jsp:include>` fragments, using Bootstrap 5.1 and an HTML5 layout. The nav bars use scriptlets to highlight the active page. |
 
**Strengths:** clear separation of controller, data, and view; reusable page fragments; per-page SEO meta tags set from the controller; content stored in the database so pages can change without redeploying; built on standard Jakarta/Javax Servlet 3.1 APIs.
 
</div>
---
 
<div x-data="reveal" markdown="1">
### 4.2 What the JSP work shows
 
- He understands the **classic Java web stack** (Servlet lifecycle, `RequestDispatcher` forwarding, JSP includes, JDBC, `web.xml`) without relying on Spring or another framework.
- He built and ran his own Tomcat and MariaDB on his own server, which matches his background in self-hosted infrastructure.
- It's the only public Java/JSP code found under this account, and it's small (one controller, about 350 lines of Java). It's best described as a working, self-built portfolio piece, not production-grade enterprise Java. Fixing the items above, especially the credentials, before pointing employers to it would make it a stronger example for **Java-developer roles**.
</div>
---
  
<div x-data="reveal" markdown="1">
## 5. Utilization of Resources
This site, [lovethecode.cloud](https://lovethecode.cloud/), is a static site. It has no server code and no database. All content is written in Markdown, and GitHub builds and hosts the site every time a change is pushed. Small, focused libraries add the interactive parts.
 
| Resource | Role on this site | Where it lives |
| --- | --- | --- |
| **GitHub Pages + GitHub Actions** | Free hosting with a custom domain. On every push to `main`, a workflow installs Node, builds the Tailwind CSS, runs Jekyll, and deploys the result. | `.github/workflows/jekyll-gh-pages.yml` |
| **Jekyll** with the **Hacker theme** (`pages-themes/hacker` v0.2.0) | Turns the Markdown files into HTML pages, and supplies the dark terminal-style layout through `jekyll-remote-theme`. Site settings such as the title and phone number live in one config file. | `_config.yml`, `_layouts/default.html`, `_includes/` |
| **Markdown** (kramdown, GitHub-flavored) | Stores all content as plain text. This report is `README.md`, so it shows on the GitHub repo page and in the site's GitHub tab. The Overview and Contact tabs are in `index.md`. | `README.md`, `index.md` |
| **Sass** | Compiles the theme's styles plus site overrides: the neon green accent (one `$neon` variable), the tabs, the gold button with its moving sheen, and the scrolling table frames. | `assets/css/style.scss` |
| **Alpine.js** 3.17.5 + **Focus** plugin | Adds behavior directly in the HTML, with no build step: switching tabs (with the tab kept in the URL), sections fading in as you scroll, and the contact modal with copy-to-clipboard. The Focus plugin keeps keyboard focus inside the open modal. | `assets/js/site.js`, `_includes/contact-modal.html` |
| **Tailwind CSS** 4.3.5 | Utility classes for the modal's layout, backdrop and transitions, and for the Overview cards. Compiled during the build so only classes actually used are shipped. Tailwind's CSS reset is left out so the theme's typography stays intact. | `assets/css/tailwind.input.css` → `tailwind.css` |
| **jsDelivr CDN** | Serves the Alpine.js files at a pinned version, so the site's JavaScript doesn't change unexpectedly. | `_includes/head-custom.html` |

</div>
---
  
<div x-data="reveal" markdown="1">
### 5.1 How a page gets built:
 
1. Content is edited in Markdown and pushed to GitHub.
2. GitHub Actions compiles Tailwind, scanning the Markdown and includes for the classes in use.
3. Jekyll converts the Markdown, wraps it in the theme layout, and compiles the Sass.
4. The finished HTML, CSS and JavaScript are deployed to GitHub Pages at lovethecode.cloud.
5. In the browser, Alpine.js starts and runs the tabs, fade-in sections and contact modal.
**Why this stack:** content stays in plain, version-controlled Markdown. There's no server to maintain or patch. Every library is pinned to a specific version. And the page still reads correctly if JavaScript fails to load: the text is all in the HTML, and Alpine only adds behavior on top.
</div>
---
### Sources
 
- [lovethecodelabs/webapp-jsp-tomcat](https://github.com/lovethecodelabs/webapp-jsp-tomcat)
- [lovethecodelabs/12-step-meeting-list](https://github.com/lovethecodelabs/12-step-meeting-list) · [PR #17](https://github.com/lovethecodelabs/12-step-meeting-list/pull/17) · [PR #18](https://github.com/lovethecodelabs/12-step-meeting-list/pull/18)
- [lovethecodelabs/12-step-meeting-list-1](https://github.com/lovethecodelabs/12-step-meeting-list-1)
- [code4recovery/12-step-meeting-list PR #2028](https://github.com/code4recovery/12-step-meeting-list/pull/2028) · [PR #2048](https://github.com/code4recovery/12-step-meeting-list/pull/2048)
- [code4recovery/tsml-angular](https://github.com/code4recovery/tsml-angular) · [PR #2](https://github.com/code4recovery/tsml-angular/pull/2)
- [code4recovery/bmlt-angular](https://github.com/code4recovery/bmlt-angular)
- [Code4Recovery](https://code4recovery.org/)



    {% include contact-modal.html %}
 