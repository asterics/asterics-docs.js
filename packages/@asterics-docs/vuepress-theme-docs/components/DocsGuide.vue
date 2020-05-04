<template>
  <router-link :to="target" :target="valid ? '_blank' : ''" :rel="valid ? 'noopener' : ''">
    <font-awesome-icon id="docs-guide" class="icon outbound" icon="info-circle"></font-awesome-icon>
  </router-link>
</template>

<script>
export default {
  name: "DocsGuide",
  data() {
    return {
      path: "/guide/docs-guide.html",
    };
  },
  computed: {
    target() {
      return this.valid ? this.path : "#";
    },
    valid() {
      return (
        typeof this.$site.pages.find((regularPath) => regularPath === this.path) !== "undefined"
      );
    },
  },
};
</script>

<style lang="stylus" scoped>
#docs-guide
  height 0.9rem
  .dark-mode &
    color lighten($darkModeTextColor,25%)
  &:hover, /.page-edit:hover &
    color darken($accentColor,70%)
    .dark-mode &
      color darken($darkModeTextColor,40%)
</style>
