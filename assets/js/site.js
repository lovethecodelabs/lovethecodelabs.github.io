// Alpine.js components for lovethecode.cloud
// Loaded before Alpine (see _includes/head-custom.html), so components are
// registered on the alpine:init event and available everywhere on the site.
//
// Write Alpine attributes in Markdown as x-on:click / x-bind:class rather than
// the @click / :class shorthands, so kramdown passes them through untouched.

document.addEventListener('alpine:init', () => {
  // Live filter for a Markdown table.
  // Usage in a .md file:
  //
  //   <div x-data="tableFilter" markdown="1">
  //   <input type="search" x-model="q" placeholder="Filter…" aria-label="Filter table">
  //   <span class="filter-count" x-text="summary"></span>
  //
  //   | Col A | Col B |
  //   | ----- | ----- |
  //   | ...   | ...   |
  //
  //   </div>
  Alpine.data('tableFilter', () => ({
    q: '',
    shown: 0,
    total: 0,

    init() {
      this.$watch('q', () => this.apply());
      this.apply();
    },

    apply() {
      const needle = this.q.trim().toLowerCase();
      const rows = this.$el.querySelectorAll('table tbody tr');
      let shown = 0;
      rows.forEach((row) => {
        const match = !needle || row.textContent.toLowerCase().includes(needle);
        row.style.display = match ? '' : 'none';
        if (match) shown++;
      });
      this.shown = shown;
      this.total = rows.length;
    },

    get summary() {
      return this.q.trim() ? `${this.shown} of ${this.total} rows` : `${this.total} rows`;
    },
  }));

  // Show/hide a section with a button.
  // Usage:
  //
  //   <div x-data="toggle" markdown="1">
  //   <button type="button" x-on:click="open = !open" x-text="open ? 'Hide details' : 'Show details'"></button>
  //   <div x-show="open" x-cloak markdown="1">
  //
  //   ...any Markdown...
  //
  //   </div>
  //   </div>
  Alpine.data('toggle', (startOpen = false) => ({
    open: startOpen,
  }));
// Fades a section in as it scrolls into view, and back out as it leaves.
// Usage in Markdown: <div x-data="reveal" markdown="1"> ... </div>
// To fade in once and stay visible: <div x-data="reveal(true)" markdown="1">
	Alpine.data('reveal', (once = false) => ({
	  init() {
		const el = this.$el;
		if (!('IntersectionObserver' in window)) return; // old browsers: just show it
		el.classList.add('reveal');
		const io = new IntersectionObserver(([entry]) => {
		  el.classList.toggle('is-shown', entry.isIntersecting);
		  if (once && entry.isIntersecting) io.disconnect();
		}, {
		  // Trim 10% off the top and bottom of the viewport, so a section starts
		  // fading just before it scrolls off. Works for sections of any height.
		  rootMargin: '-10% 0px -10% 0px',
		  threshold: 0,
		});
		io.observe(el);
	  },
	}));

  // Contact modal: see _includes/contact-modal.html.
  // The address is assembled here instead of written in the HTML, which keeps it
  // away from simple scrapers that harvest emails from page source.
  Alpine.data('contactModal', () => ({
    open: false,
    copied: false,
    email: ['info', 'lovethecode.net'].join('@'),

    get mailto() {
      return 'mailto:' + this.email + '?subject=' + encodeURIComponent('Hello from your GitHub page');
    },

    show() {
      this.open = true;
    },

    hide() {
      this.open = false;
      this.copied = false;
    },

    async copy() {
      try {
        await navigator.clipboard.writeText(this.email);
      } catch (e) {
        // Fallback for browsers without the async clipboard API
        const t = document.createElement('textarea');
        t.value = this.email;
        document.body.appendChild(t);
        t.select();
        document.execCommand('copy');
        t.remove();
      }
      this.copied = true;
      setTimeout(() => (this.copied = false), 2000);
    },
  }));
});

// Horizontal scroll frames for tables.
// Wraps every table in the page content in <div class="table-scroll">, so wide
// tables scroll sideways on small screens instead of overflowing the viewport.
// Styles: .table-scroll in assets/css/style.scss.
(function () {
  function labelFor(wrapper) {
    // Name the scroll region after the nearest heading above it (for screen readers)
    let el = wrapper;
    while (el && el.id !== 'main_content') {
      let prev = el.previousElementSibling;
      while (prev) {
        if (/^H[1-6]$/.test(prev.tagName)) return prev.textContent.trim() + ' (table)';
        const inner = prev.querySelector && prev.querySelector('h1,h2,h3,h4,h5,h6');
        if (inner) return inner.textContent.trim() + ' (table)';
        prev = prev.previousElementSibling;
      }
      el = el.parentElement;
    }
    return 'Table';
  }

  function wrapTables() {
    document.querySelectorAll('#main_content table').forEach((table) => {
      if (table.parentElement.classList.contains('table-scroll')) return;
      const wrapper = document.createElement('div');
      wrapper.className = 'table-scroll';
      wrapper.tabIndex = 0; // lets keyboard users scroll it with the arrow keys
      wrapper.setAttribute('role', 'region');
      table.before(wrapper);
      wrapper.append(table);
      wrapper.setAttribute('aria-label', labelFor(wrapper));
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', wrapTables);
  } else {
    wrapTables();
  }
})();

// Tabs (index.md): pick the tab named in the URL hash.
// - #overview, #github, #contact  -> that tab
// - #some-heading inside a tab    -> open that tab, then scroll to the heading
// - anything else / no hash       -> keep the current tab
window.tabFromHash = function (root, current) {
  const id = decodeURIComponent(location.hash.slice(1));
  if (!id) return current;
  if (root.querySelector('[data-tab="' + CSS.escape(id) + '"]')) return id;
  const target = document.getElementById(id);
  const panel = target && target.closest('[data-tab]');
  if (panel && root.contains(panel)) {
    // Wait for Alpine to show the panel before scrolling to the heading
    requestAnimationFrame(() => requestAnimationFrame(() => target.scrollIntoView()));
    return panel.dataset.tab;
  }
  return current;
};