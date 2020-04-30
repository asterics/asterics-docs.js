<template>
  <div id="header">
    <slot>DefaultHeader</slot>
  </div>
</template>

<script>
export default {
  name: "Header",
};
</script>

<style lang="stylus" scoped>
#header
  font-size 6rem
  font-weight 500

@media (max-width: $MQMobile)
  #header
    font-size 5rem

@media (max-width: $MQMobileNarrow)
  #header
    font-size 2.5rem
    padding-bottom 0.5rem
</style>
