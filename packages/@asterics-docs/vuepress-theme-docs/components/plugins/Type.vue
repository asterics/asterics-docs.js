<template>
  <div class="plugins">
    <h2 class="title">{{ label }}</h2>
    <ul v-if="filteredPlugins.length > 0">
      <GridElement v-for="plugin of filteredPlugins" :key="plugin" :path="plugin" />
    </ul>
    <div class="no-results" v-else>
      {{ `No ${label.toLowerCase()} plugins found.` }}
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import FuzzySearch from "fuzzy-search";

import GridElement from "@theme/components/plugins/grid/GridElement.vue";

export default {
  name: "Type",
  components: { GridElement },
  props: {
    label: {
      type: String,
      default: "Plugins",
    },
    dirname: {
      type: String,
      default: "",
    },
  },
  computed: {
    ...mapState(["search"]),
    plugins() {
      return this.$frontmatter.indexed.filter((path) => path.includes(this.dirname));
    },
    pages() {
      return this.$site.pages.filter(({ regularPath }) => this.plugins.includes(regularPath));
    },
    filteredPlugins() {
      let plugins;
      if (this.search.plugins) {
        plugins = fuzzySearch(this.pages, this.plugins, this.search.plugins);
      } else {
        if (this.search.filter === "Featured") {
          plugins = this.pages
            .filter(({ frontmatter }) => frontmatter.featured)
            .map(({ regularPath }) => regularPath);
        } else if (this.search.filter === "All") {
          plugins = this.plugins;
        } else {
          plugins = this.pages
            .filter(({ frontmatter }) => frontmatter.subcategory === this.search.filter)
            .map(({ regularPath }) => regularPath);
        }
      }
      return plugins;
    },
  },
};

function fuzzySearch(pages, paths, input) {
  const filteredPages = pages.filter(({ regularPath }) => paths.includes(regularPath));
  const searcher = new FuzzySearch(
    filteredPages,
    ["frontmatter.title", "frontmatter.subcategory"],
    { caseSensitive: false }
  );
  const results = searcher.search(input);
  return results.map(({ regularPath }) => regularPath);
}
</script>

<style lang="stylus" scoped>
.plugins
  margin 2em 0
  width 100%
  padding 0
  // .title
  //   padding 0.5rem 0
  //   font-size 1.6rem
  //   font-weight 600
  ul
    list-style-type none
    padding 0
    margin 0
    display flex
    flex-flow row wrap
    justify-content flex-start
    li
      margin-left 0
  .no-results
    background-color $borderColor
    padding 1rem
    .dark-mode &
      background-color lighten($darkModeBg, 5%)
      box-shadow 1px 1px 3px 1px lighten($darkModeBg, 10%)
    margin 8px 0
    box-shadow 1px 1px 3px 1px darken($borderColor, 20%)
</style>
