<template>
  <div id="actions">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "Actions",
};
</script>

<style lang="stylus" scoped>
#actions
  display flex
  flex-flow row nowrap
  margin-top 4px
  & > a
    margin-right 1rem
    &:last-child
      margin-right 0
@media (max-width: $MQMobileNarrow)
  #actions
    flex-flow column nowrap
    & > a
      margin 0.25em 0
      width 100%
      font-size 1.2rem
      padding 0.8rem
</style>
