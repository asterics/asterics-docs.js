<template>
  <router-link class="fancy-link" :to="target" :target="valid ? '_blank' : ''" :rel="valid ? 'noopener' : ''">
    <font-awesome-icon :icon="icon"></font-awesome-icon>
  </router-link>
</template>

<script>
export default {
  name: "FancyLink",
  props: {
    path: {
      type: String,
      required: true,
    },
    icon: {
      type: Array,
      default: ["fas", "question"],
    },
  },
  computed: {
    valid() {
      return typeof this.$site.pages.find(({ regularPath }) => regularPath === this.path) !== "undefined";
    },
    target() {
      return this.valid ? this.path : "#";
    },
  },
};
</script>

<style lang="stylus" scoped></style>
