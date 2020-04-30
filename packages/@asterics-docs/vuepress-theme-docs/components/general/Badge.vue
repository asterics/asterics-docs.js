<template>
  <div class="badge">
    <span>
      <slot></slot>
    </span>
  </div>
</template>

<script>
export default {
  name: "Badge",
};
</script>

<style lang="stylus" scoped>
.badge
  background-color darken($accentColor,60%)
  span
    padding 0 4px
</style>
