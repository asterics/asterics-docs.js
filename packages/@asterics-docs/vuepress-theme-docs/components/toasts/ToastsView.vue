<template>
  <div id="toasts-view" v-if="items.length > 0">
    <Toaster class="toaster" :items="items" v-on:delete-toast="onDelete"></Toaster>
  </div>
</template>

<script>
import eventBus from "@theme/utils/event-bus.js";

import Toaster from "@theme/components/toasts/Toaster.vue";

export default {
  name: "ToastsView",
  components: { Toaster },
  data() {
    return {
      items: [],
    };
  },
  computed: {
    list() {
      return this.items.reverse();
    },
  },
  methods: {
    handleToasterPush(toast) {
      // this.items.push({ ...toast, note: toast.message, key: Date.now() });
      this.items.unshift({ ...toast, key: Date.now() });
    },
    onDelete(index) {
      // const pos = this.items.findIndex((element, index) => `toast-${index}` === key);
      // pos >= 0 && this.items.splice(pos, 1);
      if (index >= 0 && index < this.items.length) {
        this.items.splice(index, 1);
      }
    },
  },
  created() {
    eventBus.$on("toaster-push", this.handleToasterPush);
    this.items = [];
  },
  beforeDestroy() {
    eventBus.$off("toaster-push", this.handleToasterPush);
  },
};
</script>

<style lang="stylus" scoped>
#toasts-view
  z-index 15
  position fixed
  height calc(100% - 3.6rem)
  top $navbarHeight
  right 0
  margin 15px
  margin-left 0
  width $toasterWidth
  pointer-events none

@media (max-width: $MQMobileNarrow)
  #toasts-view
    width 100%
    margin-left auto
    margin-right auto
</style>
