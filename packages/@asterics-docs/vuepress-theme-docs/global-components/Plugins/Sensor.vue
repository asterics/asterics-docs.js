<template>
  <GridSearch type="sensors" dirname="sensors/">
    <template v-slot:title>Sensors</template>
  </GridSearch>
</template>

<script>
import GridSearch from "@theme/components/plugins/grid/GridSearch.vue";
export default {
  name: "PluginsSensor",
  components: { GridSearch },
};
</script>

<style lang="stylus" scoped></style>
