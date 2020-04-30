<template>
  <div :id="id">
    <slot>Default</slot>
  </div>
</template>

<script>
export default {
  name: "JumboTron",
  props: {
    id: {
      type: String,
      default: "jumbotron",
    },
  },
};
</script>

<style lang="stylus" scoped></style>
