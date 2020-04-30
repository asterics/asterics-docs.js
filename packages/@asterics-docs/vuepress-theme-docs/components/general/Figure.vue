<template>
  <div class="container" :class="{ 'no-zoom': !zoom }">
    <img :src="source" :alt="alt" />
  </div>
</template>

<script>
export default {
  name: "Figure",
  props: {
    src: {
      type: String,
      required: true,
    },
    zoom: {
      type: Boolean,
      default: true,
    },
    alt: {
      type: String,
      default: "",
    },
  },
  computed: {
    source() {
      return this.src;
    },
  },
};
</script>

<style lang="stylus" scoped>
.container, img
  width 100%
  height 100%
  // width fill-content
  // height fill-content
  // padding 0
  // margin 0 4px
img
  object-fit cover

@media (max-width: $MQMobileNarrow)
  .container, img
    box-shadow unset
    max-width unset
    max-height unset
</style>
