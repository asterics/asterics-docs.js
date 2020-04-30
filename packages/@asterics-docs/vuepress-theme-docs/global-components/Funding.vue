<template>
  <ul id="funding">
    <slot></slot>
  </ul>
</template>

<script>
export default {
  name: "Funding",
};
</script>

<style lang="stylus" scoped>
#funding
  display flex
  flex-flow row nowrap
  align-items center
  padding-left 0
  list-style-type none

@media (max-width: $MQMobileNarrow)
  #funding
    // flex-flow column nowrap
    flex-flow row wrap
    justify-content center
    li
      flex 1 1 40%
      max-width 40%
      &:nth-child(2n-1)
        margin-right 3rem
    // width 40%
</style>
