<template>
  <div>{{ (page.title || "") }}</div>
</template>

<script>
export default {
  name: "GridBar",
  props: {
    page: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style lang="stylus" scoped>
div
  padding 4px 8px
  font-size 1.2rem
  font-weight 500
  border-top 1px solid $borderColor
  .dark-mode &
    border-top 1px solid $darkModeTextColor
  overflow hidden
  white-space nowrap
  text-overflow ellipsis
</style>
