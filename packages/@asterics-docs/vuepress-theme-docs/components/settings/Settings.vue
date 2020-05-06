<template>
  <div class="settings-page">
    <div class="toolbar">
      <div class="title">
        <slot name="title">Settings</slot>
      </div>
      <Close @click-close="onClose" />
    </div>
    <div key="setting-scroll" class="settings">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import Close from "@theme/components/general/Close.vue";
export default {
  name: "Settings",
  components: { Close },
  methods: {
    onClose() {
      this.$store.commit("hideSettings");
    },
  },
};
</script>

<style lang="stylus" scoped></style>

<style lang="stylus">

.settings-page
  z-index 19
  height 100%
  display flex
  flex-flow column nowrap
  background-color lighten($borderColor,20%)
  .dark-mode &
    background-color $darkModeBg
  & > .toolbar, & > :not(.toolbar) > div:not(.ps__thumb-x):not(.ps__thumb-y)
    padding 1rem 2rem
    border-bottom 1px solid darken($borderColor,10%)
    height unset
  & .toolbar
    max-height 2rem
  input
    white-space nowrap
    color #404040
    display inline-block
    border 1px solid #cfd4db
    border-radius 1rem
    width 100%
    font-size 0.9rem
    line-height 2rem
    outline none
    transition all 0.2s ease
  & > div.toolbar
    border-top 1px solid darken($borderColor, 50%)
    display flex
    flex-flow row nowrap
    align-items baseline
    justify-content space-between
    flex 1 1 100%
    font-size 1.4rem
    font-weight 500
    color $textColor
    .dark-mode &
      color $darkModeTextColor

  & > div:not(.toolbar)
    font-size 1.2rem

@media (max-width: $MQMobileNarrow)
  .settings-page
    & > .toolbar, & > :not(.toolbar) > div
      padding 1rem 0.75rem
    & > div:not(.toolbar)
      font-size 1rem
      div.title
        margin-left 0.25rem
</style>
