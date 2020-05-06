<template>
  <div>
    <transition-group name="list" tag="ul" id="toaster">
      <Toast
        v-for="(item, index) of items"
        :is="item.component"
        :key="item.key"
        v-bind="item"
        v-on:delete-toast="onDelete(index)"
        class="list-item"
      ></Toast>
    </transition-group>
  </div>
</template>

<script>
import Toast from "@theme/components/toasts/Toast.vue";
import InternalServerError from "@theme/components/solutions/InternalServerError.vue";
import NetworkError from "@theme/components/solutions/NetworkError.vue";

export default {
  name: "Toaster",
  components: { Toast, InternalServerError, NetworkError },
  props: {
    items: {
      type: Array,
      default: () => [],
    },
  },
  methods: {
    onDelete(index) {
      this.$emit("delete-toast", index);
    },
  },
};
</script>

<style lang="stylus" scoped>
#toaster
  pointer-events all
  list-style-type none
  flex-flow column nowrap
  padding 0
  margin 0

.ps
  height 100%

.list-item
  transition all 0.5s
.list-enter, .list-leave-to
/* .list-leave-active below version 2.1.8 */
  opacity 0
  transform translateY(30px)

.list-leave-active
  position absolute
</style>
