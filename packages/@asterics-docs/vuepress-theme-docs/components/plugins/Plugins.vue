<template>
  <div>
    <PluginsHeader />
    <PluginsSearch :items="items" />
    <PluginsActuator :items="items" />
    <PluginsSensor />
    <PluginsProcessor />
  </div>
</template>

<script>
import PluginsHeader from "@theme/components/plugins/PluginsHeader.vue";
import PluginsSearch from "@theme/components/plugins/PluginsSearch.vue";
import PluginsActuator from "@theme/components/plugins/PluginsActuator.vue";
import PluginsSensor from "@theme/components/plugins/PluginsSensor.vue";
import PluginsProcessor from "@theme/components/plugins/PluginsProcessor.vue";

export default {
  name: "Plugins",
  components: { PluginsHeader, PluginsSearch, PluginsActuator, PluginsSensor, PluginsProcessor },
  props: {
    items: {
      type: Array,
      default: () => [],
    },
  },
};
</script>

<style lang="stylus" scoped></style>
