<template>
  <div id="action-group">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "ActionGroup",
};
</script>

<style lang="stylus" scoped>
#action-group
  font-size 1.4rem
  & > div
    padding 4px 0

@media (max-width: $MQMobile)
  #action-group
    font-size 1.3rem

@media (max-width: $MQMobileNarrow)
  #action-group
    font-size 1rem
</style>
