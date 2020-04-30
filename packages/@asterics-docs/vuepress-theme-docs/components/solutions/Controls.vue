<template>
  <div class="controls-wrapper" v-show="active">
    <ModelControls
      v-if="model"
      :os="os"
      :model="model"
      :webapp="webapp"
      :docs="docs"
      :active="active"
    />
    <GridControls v-else :grid="grid" :docs="docs" />
  </div>
</template>

<script>
import ModelControls from "@theme/components/solutions/ModelControls.vue";
import GridControls from "@theme/components/solutions/GridControls.vue";

export default {
  name: "Controls",
  components: { ModelControls, GridControls },
  props: {
    os: {
      type: String,
      default: "",
    },
    model: {
      type: String,
      default: null,
    },
    grid: {
      type: String,
      default: null,
    },
    webapp: {
      type: String,
      default: null,
    },
    docs: {
      type: String,
      default: null,
    },
    active: {
      type: Boolean,
      default: true,
    },
  },
};
</script>

<style lang="stylus" scoped></style>
