<template>
  <router-link :class="{ action: true, dark: dark }" :to="path">
    <slot>Action</slot>
  </router-link>
</template>

<script>
export default {
  name: "Action",
  props: {
    path: {
      type: String,
      default: "/",
    },
    dark: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style lang="stylus" scoped>
.action
  display inline-block
  color #ffffff
  background-color $accentColor
  .dark-mode &
    background-color darken($accentColor,25%)
    // color darken($darkModeTextColor,75%)
  &.dark
    background-color darken($accentColor,60%)
    // .dark-mode &
    //   color darken($darkModeTextColor,0%)
  padding 0.8rem 1.6rem
  border-radius 4px
  transition background-color .1s ease
  box-sizing border-box
  border-bottom 1px solid darken($accentColor,10%)
  .dark-mode &
    border-bottom 1px solid darken($accentColor,35%)
  &.dark
    border-bottom 1px solid darken($accentColor,70%)
  &:hover
    background-color lighten($accentColor,10%)
    .dark-mode &
      background-color darken($accentColor,15%)
    &.dark:hover
      background-color darken($accentColor,50%)
</style>
