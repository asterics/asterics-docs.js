<template>
  <div class="container">
    <div class="title">
      {{ title }}
    </div>
    <div class="description">
      <slot>Description</slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "Description",
  props: {
    title: {
      type: String,
      default: "",
    },
  },
};
</script>

<style lang="stylus" scoped>
.container
  & > div
    margin 20px 0
  .title
    font-size 1.4rem
    font-weight 600
  .description
    line-height 1.7
</style>
