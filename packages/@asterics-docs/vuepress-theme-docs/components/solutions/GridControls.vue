<template>
  <div class="model-controls-wrapper">
    <div class="control edit" :class="{ disabled: !grid }">
      <Linker :to="gridEditURL" :tab="Boolean(grid)">
        <div class="icon-background small external">
          <div class="icon small">
            <!-- <font-awesome-icon icon="tools"></font-awesome-icon> -->
            <font-awesome-icon icon="pencil-alt"></font-awesome-icon>
          </div>
        </div>
      </Linker>
    </div>
    <div class="control grid" :class="{ disabled: !grid }">
      <Linker :to="gridURL" :tab="Boolean(grid)">
        <div class="icon-background">
          <div class="icon">
            <!-- <font-awesome-icon icon="tools"></font-awesome-icon> -->
            <font-awesome-icon icon="rocket"></font-awesome-icon>
          </div>
        </div>
      </Linker>
    </div>
    <div class="control settings">
      <div
        class="icon-background small dark"
        @click="openSolutionSettings"
        @keydown.enter="openSolutionSettings"
        tabindex="0"
      >
        <div class="icon small">
          <font-awesome-icon icon="cog"></font-awesome-icon>
        </div>
      </div>
    </div>
    <div class="control docs" :class="{ disabled: !docs }">
      <Linker :to="docs" :tab="Boolean(docs)">
        <div class="icon-background small dark">
          <div class="icon small">
            <font-awesome-icon :icon="['fab', 'readme']"></font-awesome-icon>
          </div>
        </div>
      </Linker>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

import Linker from "@theme/components/general/Linker.vue";

export default {
  name: "GridControls",
  components: { Linker },
  props: {
    grid: {
      type: String,
      default: null,
    },
    docs: {
      type: String,
      default: null,
    },
  },
  methods: {
    openSolutionSettings() {
      this.$store.commit("setSettingsView", "SolutionSettings");
      this.$store.commit("showSettings");
    },
  },
  computed: {
    ...mapState(["settings"]),
    gridURL() {
      return this.grid ? this.settings.grid.host + "/" + this.grid : false;
    },
    gridEditURL() {
      return this.grid ? this.settings.grid.host + "/edit/" + this.grid : false;
    },
  },
};
</script>

<style lang="stylus" scoped>
@import "./controls.styl"
</style>
