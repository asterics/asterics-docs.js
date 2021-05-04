<template>
  <router-link :to="target" :target="valid ? '_blank' : ''" :rel="valid ? 'noopener' : ''" title="Open Editor Guide">
    <font-awesome-icon id="editor-guide" class="icon outbound" :icon="['fas', 'hands-helping']"> </font-awesome-icon>
  </router-link>
</template>

<script>
export default {
  name: "EditorGuide",
  data() {
    return {
      path: "/guide/editor.html",
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
#editor-guide
  height 0.9rem
  .dark-mode &
    color $darkModeTextColor
  &:hover, /.page-edit:hover &
    // color $accentColor
    color #45b784
    .dark-mode &
      color $darkModeTextColor
</style>
