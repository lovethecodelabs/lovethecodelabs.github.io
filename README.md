# GitHub Report: `lovethecodelabs`

**Focus:** Code4Recovery contributions and JSP/Java programming
**Compiled:** November 13, 2026
**Method:** Repositories cloned and git history read directly; pull-request metadata taken from public GitHub pages. All commits under the account are authored as *Matthew &lt;info@lovethecode.net&gt;*.

---

## 1. Summary

| Area | Highlights |
| --- | --- |
| **Code4Recovery** | 9 years of contributions to the 12 Step Meeting List (TSML) WordPress plugin, 2017–2026. Created two Angular meeting-finder repos in the `code4recovery` org. Invited as a requested reviewer on the TSML 3.19.20 release. |
| **Shipped upstream** | PR #19 (2017), adding a meeting-count setting to the "closest meetings" widget. PR #2028 (2026), adding schema.org `Event` structured data, released in **TSML v3.19.20**. |
| **JSP / Java** | `webapp-jsp-tomcat`: a hand-built MVC website with a Servlet controller, JSP views, and a MariaDB/MySQL DAO, deployed on Tomcat 8.5. |
| **Stack** | PHP / WordPress, Angular 22 / TypeScript, Java Servlets / JSP, MariaDB, nginx, JSON-LD / schema.org, Meeting Guide and BMLT feed formats |

---

<div x-data="{ shown: false }" x-intersect.once="shown = true" class="transition-opacity duration-700" class="shown ? 'opacity-100' : 'opacity-0'">

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

<div x-data="{ shown: false }" x-intersect.once="shown = true" class="transition-opacity duration-700" class="shown ? 'opacity-100' : 'opacity-0'">

## 3. Code4Recovery Contributions

[Code4Recovery](https://code4recovery.org/) is a volunteer group that builds open-source tools for recovery fellowships (AA, NA, Al-Anon, and others). Its main project is the **12 Step Meeting List** WordPress plugin.

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