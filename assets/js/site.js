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
});
