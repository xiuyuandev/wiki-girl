/* 侧边栏组件 */
window.Sidebar = {
  props: ['open', 'currentId'],
  emits: ['close'],
  template: `
    <aside class="wiki-sidebar" :class="{ open: open }">
      <div class="wiki-sidebar__intro">
        <span>Navigation</span>
        <strong>按成长阶段阅读，也可以直接查案例与应急场景。</strong>
      </div>

      <div
        v-for="(group, gi) in groups"
        :key="group.key || group.title || gi"
        class="wiki-sidebar__group"
        :class="{
          'is-compact': group.compact,
          'is-collapsible': group.collapsible,
          'is-collapsed': group.collapsible && isCollapsed(group)
        }"
      >
        <button
          v-if="group.collapsible"
          type="button"
          class="wiki-sidebar__head"
          @click="toggleGroup(group)"
        >
          <span>
            <b class="wiki-sidebar__title">{{ group.title }}</b>
            <em v-if="group.desc" class="wiki-sidebar__desc">{{ group.desc }}</em>
          </span>
          <i class="wiki-sidebar__count">{{ group.badge || (group.items.length + '项') }}</i>
          <strong class="wiki-sidebar__chevron">⌄</strong>
        </button>
        <template v-else>
          <div class="wiki-sidebar__title">{{ group.title }}</div>
          <p v-if="group.desc" class="wiki-sidebar__desc">{{ group.desc }}</p>
        </template>

        <div v-if="group.summary" class="wiki-sidebar__summary">{{ group.summary }}</div>

        <div class="wiki-sidebar__links" v-show="!group.collapsible || !isCollapsed(group)">
          <router-link
            v-for="item in group.items"
            :key="item.to || item.id"
            :to="item.to || ('/a/' + item.id)"
            :class="{ active: isActive(item), 'is-entry': item.entry }"
            @click="$emit('close')"
          >
            <span class="wiki-sidebar__link-main">{{ item.name }}</span>
            <span v-if="item.badge" class="wiki-sidebar__badge">{{ item.badge }}</span>
            <small v-if="item.desc">{{ item.desc }}</small>
          </router-link>
        </div>
      </div>
    </aside>
  `,
  data() {
    const groups = window.WIKI.sidebar;
    const collapsed = {};
    groups.forEach((group, index) => {
      if (group.collapsible && group.defaultCollapsed) {
        collapsed[this.groupKey(group, index)] = true;
      }
    });
    return { groups, collapsedGroups: collapsed };
  },
  mounted() {
    this.expandActiveGroup();
  },
  watch: {
    currentId() {
      this.expandActiveGroup();
    },
    '$route.path'() {
      this.expandActiveGroup();
    }
  },
  methods: {
    groupKey(group, index = this.groups.indexOf(group)) {
      return group.key || group.title || String(index);
    },
    isActive(item) {
      if (item.to) return this.$route.path === item.to;
      if (item.id === this.currentId) return true;
      return this.currentId && this.currentId.startsWith(item.id + '-');
    },
    hasActiveItem(group) {
      return group.items.some(item => this.isActive(item));
    },
    isCollapsed(group) {
      if (this.hasActiveItem(group)) return false;
      return !!this.collapsedGroups[this.groupKey(group)];
    },
    toggleGroup(group) {
      const key = this.groupKey(group);
      this.collapsedGroups[key] = !this.isCollapsed(group);
    },
    expandActiveGroup() {
      this.groups.forEach(group => {
        if (group.collapsible && this.hasActiveItem(group)) {
          this.collapsedGroups[group.key || group.title] = false;
        }
      });
    }
  }
};
