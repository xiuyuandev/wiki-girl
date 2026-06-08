/* 进度条 + 返回顶部 */
window.ProgressBar = {
  template: `<div class="wiki-progress" :style="{ width: pct + '%' }"></div>`,
  data() { return { pct: 0, ticking: false }; },
  mounted() {
    window.addEventListener('scroll', this.onScroll, { passive: true });
    this.onScroll();
  },
  beforeUnmount() { window.removeEventListener('scroll', this.onScroll); },
  methods: {
    onScroll() {
      if (this.ticking) return;
      this.ticking = true;
      requestAnimationFrame(() => {
        const h = document.documentElement;
        const total = h.scrollHeight - h.clientHeight;
        this.pct = total > 0 ? Math.min((h.scrollTop / total) * 100, 100) : 0;
        this.ticking = false;
      });
    }
  }
};

window.ToTop = {
  template: `<button class="wiki-totop" :class="{ visible: visible }" @click="goTop" title="返回顶部">↑</button>`,
  data() { return { visible: false }; },
  mounted() { window.addEventListener('scroll', this.onScroll, { passive: true }); },
  beforeUnmount() { window.removeEventListener('scroll', this.onScroll); },
  methods: {
    onScroll() { this.visible = window.scrollY > 500; },
    goTop() { window.scrollTo({ top: 0, behavior: 'smooth' }); }
  }
};
