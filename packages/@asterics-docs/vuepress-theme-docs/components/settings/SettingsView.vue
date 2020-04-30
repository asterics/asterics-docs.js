<template>
  <div class="settings-view" v-show="display">
    <component v-bind:is="view" :key="view"></component>
  </div>
</template>

<script>
import bowser from "bowser";
import { mapState } from "vuex";
import { defaults } from "@theme/plugins/store";

import PageSettings from "@theme/components/settings/PageSettings.vue";
import SolutionSettings from "@theme/components/solutions/SolutionsSettings.vue";

export default {
  name: "SettingsView",
  components: {
    PageSettings,
    SolutionSettings,
  },
  data() {
    return {
      browser: "default",
    };
  },
  computed: {
    ...mapState(["settings"]),
    display() {
      return this.settings.page.settings.display;
    },
    view() {
      return this.settings.page.settings.component;
    },
  },
  methods: {
    isAREConfigured() {
      if (!localStorage) return false;
      const settings = JSON.parse(localStorage.getItem("asterics-docs-settings"));
      return settings && typeof settings.are.host !== "undefined" ? true : false;
    },
    isSecureConnection() {
      return !this.isAREConfigured() && this.browser === "Firefox" ? false : true;
    },
  },
  created() {
    this.$store.commit("load");
  },
  mounted() {
    if (!this.isSecureConnection()) {
      console.log(
        "Detected Firefox browser. " +
          `Setting default ARE URL from ${this.settings.are.host} to ${defaults.are.host.secure}.\n` +
          "Open the solution settings to configure the URL manually."
      );
      this.$store.commit("updateARE", defaults.are.host.secure);
    }
  },
  beforeMount() {
    this.browser = bowser.getParser(window.navigator.userAgent).getBrowserName();
  },
};
</script>

<style lang="stylus">
.settings-view
  position absolute
  top $navbarHeight
  height calc(100% - 3.6rem)
  width 100%
  background-color lighten($borderColor,20%)
  // margin-top $navbarHeight
  // height calc(100vh - 3.6rem)
  .dark-mode &
    background-color $darkModeBg
</style>
