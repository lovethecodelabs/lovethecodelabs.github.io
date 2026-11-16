---
layout: default
---

<!-- Tabbed home page. The GitHub tab pulls in README.md, so edit the report there.
     The active tab is kept in the URL (#overview, #github, #contact); links to
     headings inside a tab (e.g. #repository-inventory) open that tab first. -->
<div x-data="{ tab: 'overview' }"
     x-init="tab = tabFromHash($el, tab)"
     x-on:hashchange.window="tab = tabFromHash($el, tab)"
     class="site-tabs" markdown="1">

<div class="tab-list" role="tablist" aria-label="Site sections">
  <button type="button" role="tab" class="tab-btn" id="tab-overview" aria-controls="panel-overview"
          x-bind:aria-selected="tab === 'overview'" x-bind:class="{ 'is-active': tab === 'overview' }"
          x-on:click="tab = 'overview'; history.replaceState(null, '', '#overview')">Overview</button>
  <button type="button" role="tab" class="tab-btn" id="tab-github" aria-controls="panel-github"
          x-bind:aria-selected="tab === 'github'" x-bind:class="{ 'is-active': tab === 'github' }"
          x-on:click="tab = 'github'; history.replaceState(null, '', '#github')">GitHub</button>
  <button type="button" role="tab" class="tab-btn" id="tab-contact" aria-controls="panel-contact"
          x-bind:aria-selected="tab === 'contact'" x-bind:class="{ 'is-active': tab === 'contact' }"
          x-on:click="tab = 'contact'; history.replaceState(null, '', '#contact')">Contact</button>
</div>

<div x-show="tab === 'overview'" data-tab="overview" id="panel-overview" role="tabpanel" aria-labelledby="tab-overview" class="tab-panel" markdown="1">

# Matthew · Love the Code

Web software for recovery fellowships and small businesses: WordPress plugins, Angular front ends and Java web apps, plus the self-hosted servers they run on.

<div class="grid gap-4 md:grid-cols-3 my-6" markdown="1">
<div class="rounded-lg border border-edge bg-panel p-4" markdown="1">

### Code4Recovery

Contributor to the 12 Step Meeting List plugin since 2017. Author of the TSML-Ang and BMLT-Angular meeting finders.

</div>
<div class="rounded-lg border border-edge bg-panel p-4" markdown="1">

### Shipped upstream

schema.org `Event` data for meetings (PR #2028), released in **TSML v3.19.20**.

</div>
<div class="rounded-lg border border-edge bg-panel p-4" markdown="1">

### JSP / Java

A hand-built Servlet/JSP site with a MariaDB backend, running on Tomcat.

</div>
<div class="rounded-lg border border-edge bg-panel p-4" markdown="1">

### Linux Server Automation

Bash Scripting and SystemD Service installations and custom authoring.

</div>
<div class="rounded-lg border border-edge bg-panel p-4" markdown="1">

### WHM/cPanel & Webmin/VirtualMin

Fine tuned and optimized experience managing multi tenant self-hosted solutions.

</div>
<div class="rounded-lg border border-edge bg-panel p-4" markdown="1">

### WordPress/CMS

Managed SQL Databases, PHP Optimization, to emergency remediation, and Plugin and Template creation.

</div>
</div>

<p>
  <button type="button" class="tab-link" x-on:click="tab = 'github'; history.replaceState(null, '', '#github'); window.scrollTo({ top: 0 })">Read the full GitHub report →</button>
</p>

</div>

<div x-show="tab === 'github'" x-cloak data-tab="github" id="panel-github" role="tabpanel" aria-labelledby="tab-github" class="tab-panel" markdown="1">

{% include_relative README.md %}

</div>

<div x-show="tab === 'contact'" x-cloak data-tab="contact" id="panel-contact" role="tabpanel" aria-labelledby="tab-contact" class="tab-panel" markdown="1">

## Contact

Feel free to contact Matthew about any matters of web development: a project, this work, or a role.

{% include contact-modal.html %}

</div>

</div>