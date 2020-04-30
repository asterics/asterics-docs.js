<template>
  <div class="plugin-search">
    <font-awesome-icon id="plugin-search-icon" icon="search"></font-awesome-icon>
    <input
      id="plugin-search-input"
      type="text"
      aria-label="Search Plugins"
      autocomplete="off"
      spellcheck="false"
      :value="search.plugins"
      @input="updateSearch"
      :placeholder="`Search ${plugins.sensor} sensors, ${plugins.processor} processors plugins &amp; ${plugins.actuator} actuators`"
    />
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "PluginsSearch",
  computed: {
    ...mapState(["search"]),
    plugins() {
      const { path } = this.$route;
      const plugins = [
        { type: "actuator", count: 0 },
        { type: "sensor", count: 0 },
        { type: "processor", count: 0 },
      ];
      this.$frontmatter.indexed.forEach((item) => {
        const plugin = plugins.find(({ type }) => item.startsWith(path + type + "s/"));
        plugin && plugin.count++;
      });
      return plugins.reduce((result, { type, count }) => {
        result[type] = count;
        return result;
      }, {});
    },
  },
  methods: {
    updateSearch(e) {
      this.$store.commit("updatePluginSearch", e.target.value);
    },
  },
};
</script>

<style lang="stylus" scoped>
.plugin-search
  display flex
  flex-flow row nowrap
  font-size 1.2rem

#plugin-search-icon
  position absolute
  padding 1rem
  color darken($borderColor,10%)
  .dark-mode &
    color lighten($darkModeTextColor,20%)

#plugin-search-input
  width 100%
  padding .8rem
  padding-left 3rem
  &:focus
    border 2px solid $accentColor
  .dark-mode &
    border-color darken($darkModeTextColor,10%)
  border-radius 2rem
  font-size inherit
  &::placeholder
    color $darkModeTextColor
  outline none
</style>
