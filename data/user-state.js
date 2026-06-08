/* 用户本地状态：最近阅读、收藏、阅读进度。仅写入浏览器 localStorage。 */
(function() {
  const KEY = 'wikiUserState.v1';
  const LIMIT_RECENT = 12;

  function now() { return Date.now(); }
  function empty() { return { recent: [], favorites: [], progress: {}, completed: {} }; }
  function read() {
    try {
      const raw = localStorage.getItem(KEY);
      return Object.assign(empty(), raw ? JSON.parse(raw) : {});
    } catch (e) {
      return empty();
    }
  }
  function write(state) {
    try { localStorage.setItem(KEY, JSON.stringify(state)); } catch (e) {}
    return state;
  }
  function titleOf(item) {
    if (item && item.title) return item.title;
    if (item && item.articleId && window.ARTICLES && window.ARTICLES.articles[item.articleId]) return window.ARTICLES.articles[item.articleId].title;
    if (item && item.articleId && window.WIKI) return window.WIKI.titles[item.articleId] || item.articleId;
    return '成长知识库';
  }

  window.WikiUserState = {
    getState: read,
    saveState: write,
    recordVisit(item) {
      if (!item || !item.path) return read();
      const state = read();
      const entry = {
        path: item.path,
        title: titleOf(item),
        type: item.type || 'page',
        articleId: item.articleId || null,
        at: now()
      };
      state.recent = [entry].concat(state.recent.filter(r => r.path !== entry.path)).slice(0, LIMIT_RECENT);
      return write(state);
    },
    getRecent(limit) { return read().recent.slice(0, limit || LIMIT_RECENT); },
    getFavorites() { return read().favorites || []; },
    isFavorite(key) { return (read().favorites || []).some(f => f.key === key); },
    toggleFavorite(item) {
      const state = read();
      const key = item.key || item.path || item.articleId;
      if (!key) return false;
      const exists = (state.favorites || []).some(f => f.key === key);
      if (exists) {
        state.favorites = state.favorites.filter(f => f.key !== key);
      } else {
        state.favorites = [{
          key,
          path: item.path || null,
          articleId: item.articleId || null,
          title: titleOf(item),
          type: item.type || 'page',
          at: now()
        }].concat(state.favorites || []).slice(0, 50);
      }
      write(state);
      return !exists;
    },
    setProgress(articleId, pct) {
      if (!articleId) return;
      const state = read();
      state.progress[articleId] = { pct: Math.max(0, Math.min(100, Math.round(pct || 0))), at: now() };
      if (pct >= 90) state.completed[articleId] = true;
      write(state);
    },
    getProgress(articleId) { return (read().progress || {})[articleId] || null; },
    isCompleted(articleId) { return !!(read().completed || {})[articleId]; }
  };
})();
