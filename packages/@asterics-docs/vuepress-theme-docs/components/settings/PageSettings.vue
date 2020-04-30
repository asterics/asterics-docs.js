<template>
  <Settings>
    <span slot="title" class="settings-title">Page Settings</span>
    <DarkMode>Theme</DarkMode>
  </Settings>
</template>

<script>
import Settings from "@theme/components/settings/Settings.vue";
import DarkMode from "@theme/components/settings/DarkMode.vue";
export default {
  name: "PageSettings",
  components: { Settings, DarkMode },
};
</script>

<style lang="stylus" scoped></style>
