<template>
  <div class="plugins-search-wrapper">
    <Search />
    <Filters />
    <Plugins />
  </div>
</template>

<script>
import Search from "@theme/components/plugins/Search.vue";
import Filters from "@theme/components/plugins/Filters.vue";
import Plugins from "@theme/components/plugins/Plugins.vue";

export default {
  name: "PluginsSearch",
  components: { Search, Filters, Plugins },
};
</script>

<style lang="stylus" scoped></style>
