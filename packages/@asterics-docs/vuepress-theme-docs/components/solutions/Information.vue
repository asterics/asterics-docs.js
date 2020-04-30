<template>
  <div class="information">
    <div class="category">
      {{ category }}
    </div>
    <div class="title">{{ title }}</div>
    <div v-if="os" class="os">
      <OS v-for="variant of os.split(',')" :key="variant" :type="variant" />
    </div>
    <div v-if="badges" class="badges">
      <Badge v-for="badge of badges.split(',')" :key="badge">{{ badge }}</Badge>
    </div>
    <div class="description">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import OS from "@theme/components/solutions/OS.vue";
import Badge from "@theme/components/general/Badge.vue";

export default {
  name: "Information",
  components: { OS, Badge },
  props: {
    title: {
      type: String,
      default: "",
    },
    os: {
      type: String,
      default: "",
    },
    badges: {
      type: String,
      default: "",
    },
    category: {
      type: String,
      default: "",
    },
  },
};
</script>

<style lang="stylus" scoped>
.information
  display flex
  flex-flow column nowrap
  margin 1rem
  min-width 30%
  & > div
    padding 5px 0
  .category
    margin 0 0 0.5rem 0
    font-size 1.1rem
    font-weight 500
    color darken($accentColor,70%)
    border-bottom 1px solid darken($accentColor,70%)
    .dark-mode &
      color lighten($darkModeTextColor,25%)
      border-bottom-color lighten($darkModeTextColor,25%)
  .title
    font-size 1.4rem
    font-weight 600
  .os, .badges
    display flex
    flex-flow row nowrap
  .os
    flex-flow row wrap
  .description
    margin-top 1rem
    line-height 1.7
</style>
