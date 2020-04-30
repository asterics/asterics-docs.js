<template>
  <div id="subtitle">
    <slot>DefaultSubtitle</slot>
  </div>
</template>

<script>
export default {
  name: "Subtitle",
};
</script>

<style lang="stylus" scoped>
#subtitle
  font-size 1.8rem
  font-weight normal
  margin-bottom 2rem
  border-bottom 0.1rem solid darken($borderColor,5%)
  .dark-mode &
    border-bottom 1px solid darken($borderColor,40%)

@media (max-width: $MQMobile)
  #subtitle
    font-size 1.6rem

@media (max-width: $MQMobileNarrow)
  #subtitle
    font-size 1.2rem
    margin-bottom 0.5rem
</style>
