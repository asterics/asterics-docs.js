<template>
  <GridSearch type="processors" dirname="processors/">
    <template v-slot:title>Processors</template>
  </GridSearch>
</template>

<script>
import GridSearch from "@theme/components/plugins/grid/GridSearch.vue";
export default {
  name: "PluginsProcessor",
  components: { GridSearch },
};
</script>

<style lang="stylus" scoped></style>
