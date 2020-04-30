<template>
  <div class="settings-button" @click="onClick" tabindex="0" @keydown.enter="onClick">
    <span id="settings-label">Settings</span>
    <font-awesome-icon id="settings-icon" icon="cog" />
  </div>
</template>

<script>
export default {
  name: "SettingsButton",
  methods: {
    onClick() {
      this.$emit("toggle-sidebar");
      this.$store.commit("setSettingsView", "PageSettings");
      this.$store.commit("showSettings");
    },
  },
};
</script>

<style lang="stylus" scoped>
.settings-button
  cursor pointer

#settings-label
  display none
  font-weight bold
#settings-icon
  display block

@media (max-width: $MQMobile)
  #settings-label
    display block
  #settings-icon
    display none
</style>
