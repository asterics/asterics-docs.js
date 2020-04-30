<template>
  <GridSearch type="actuator" dirname="actuators/">
    <template v-slot:title>Actuators</template>
  </GridSearch>
</template>

<script>
import GridSearch from "@theme/components/plugins/grid/GridSearch.vue";
export default {
  name: "PluginsActuator",
  components: { GridSearch },
};
</script>

<style lang="stylus" scoped></style>
