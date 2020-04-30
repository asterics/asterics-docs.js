<template>
  <!-- <transition name="fade"> -->
  <li class="toast">
    <div class="toast-header">
      <slot name="title" class="title">Message</slot>
      <Close v-on:click-close="onClose" />
    </div>
    <div class="toast-content">
      <slot>
        Toast
      </slot>
    </div>
  </li>
  <!-- </transition> -->
</template>

<script>
import Close from "@theme/components/general/Close.vue";
export default {
  name: "Toast",
  components: { Close },
  methods: {
    onClose(e) {
      this.$emit("delete-toast");
    },
  },
};
</script>

<style lang="stylus" scoped>
.toast
  background-color lighten($borderColor,15%)
  border 1px solid darken($borderColor,15%)
  box-shadow 1px 1px 3px 1px darken($borderColor,45%)
  border-radius 0.25rem
  margin 1rem auto
  width $toasterWidth - 45px
  font-size 0.8rem
  // padding 1rem
  &:first-child
    margin-top 0
  &:last-child
    margin-bottom 0
  opacity 0.6
  &:hover
    opacity 1
  .toast-header
    font-weight 500
    display flex
    flex-flow row nowrap
    justify-content space-between
    border-bottom 1px solid darken($borderColor,15%)
  .toast-header, .toast-content
    padding 0.5rem 1rem
@media (max-width: $MQMobile)
  .toast
    opacity 1
</style>
