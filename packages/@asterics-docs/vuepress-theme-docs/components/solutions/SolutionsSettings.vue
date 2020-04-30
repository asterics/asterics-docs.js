<template>
  <Settings>
    <div slot="title">Solution Settings</div>
    <URL :value="settings.are.host" @input-url="onInputARE" @restore-url="onRestoreARE"
      >AsTeRICS Runtime Environment</URL
    >
    <URL :value="settings.webacs.host" @input-url="onInputWebACS" @restore-url="onRestoreWebACS"
      >WebACS</URL
    >
    <URL :value="settings.grid.host" @input-url="onInputGrid" @restore-url="onRestoreGrid"
      >AsTeRICS Grid</URL
    >
  </Settings>
</template>

<script>
import { defaults } from "@theme/plugins/store";
import { mapState } from "vuex";

import Settings from "@theme/components/settings/Settings.vue";
import URL from "@theme/components/solutions/URL.vue";

export default {
  name: "SolutionsSettings",
  components: { Settings, URL },
  computed: mapState(["settings"]),
  methods: {
    onInputARE(host) {
      this.$store.commit("updateARE", host);
      this.$store.commit("save");
    },
    onInputWebACS(host) {
      this.$store.commit("updateWebACS", host);
      this.$store.commit("save");
    },
    onInputGrid(host) {
      this.$store.commit("updateGrid", host);
      this.$store.commit("save");
    },
    onRestoreARE() {
      this.$store.commit("updateARE", defaults.are.host.default);
      this.$store.commit("save");
    },
    onRestoreWebACS() {
      this.$store.commit("updateWebACS", defaults.webacs.host.default);
      this.$store.commit("save");
    },
    onRestoreGrid() {
      this.$store.commit("updateGrid", defaults.grid.host.default);
      this.$store.commit("save");
    },
  },
};
</script>

<style lang="stylus" scoped></style>
