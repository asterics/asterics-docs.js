<template>
  <div class="plugins-grid">
    <Type v-for="[label, dirname] of types" :label="label" :dirname="dirname" :key="label" />
  </div>
</template>

<script>
import Type from "@theme/components/plugins/Type.vue";
export default {
  name: "Plugins",
  components: { Type },
  data() {
    return {
      types: [
        ["Actuators", "actuators/"],
        ["Processors", "processors/"],
        ["Sensors", "sensors/"],
      ],
    };
  },
};
</script>

<style lang="stylus" scoped></style>
