<template>
  <router-link :to="target" :target="valid ? '_blank' : ''" :rel="valid ? 'noopener' : ''" title="Open Markdown Guide">
    <font-awesome-icon id="markdown-guide" class="icon outbound" :icon="['fab', 'markdown']"></font-awesome-icon>
  </router-link>
</template>

<script>
export default {
  name: "EditorGuide",
  data() {
    return {
      path: "/guide/markdown.html",
    };
  },
  computed: {
    target() {
      return this.valid ? this.path : "#";
    },
    valid() {
      return typeof this.$site.pages.find(({ regularPath }) => regularPath === this.path) !== "undefined";
    },
  },
};
</script>

<style lang="stylus" scoped>
#markdown-guide
  height 0.9rem
  .dark-mode &
    color $darkModeTextColor
  &:hover, /.page-edit:hover &
    color $accentColor
    .dark-mode &
      color $darkModeTextColor
</style>
