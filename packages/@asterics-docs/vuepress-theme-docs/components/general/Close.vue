<template>
  <div id="settings-close">
    <font-awesome-icon
      @click="onClose"
      id="toolbar-close-icon"
      icon="times"
      tabindex="0"
      @keydown.enter.space.prevent="onClose"
    />
  </div>
</template>

<script>
export default {
  name: "Close",
  methods: {
    onClose(e) {
      this.$emit("click-close", e);
    },
  },
};
</script>

<style lang="stylus" scoped>

#toolbar-close-icon
  cursor pointer
</style>
