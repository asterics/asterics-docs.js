<template>
  <font-awesome-icon :icon="[type, icon]" size="8x" />
</template>

<script>
export default {
  name: "GridIcon",
  props: {
    icon: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      default: "fas",
    },
  },
};
</script>

<style lang="stylus" scoped></style>
