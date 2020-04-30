<template>
  <perfect-scrollbar
    v-show="!settings.page.settings.display"
    ref="scrollbar"
    tag="main"
    class="page"
    @ps-scroll-y="onScroll"
  >
    <slot name="top" />

    <Content class="theme-default-content" />
    <PageEdit />

    <PageNav v-bind="{ sidebarItems }" />
    <slot name="bottom" />
  </perfect-scrollbar>
</template>

<script>
import eventBus from "@theme/utils/event-bus.js";
import { mapState } from "vuex";

import PageEdit from "@theme/components/PageEdit.vue";
import PageNav from "@parent-theme/components/PageNav.vue";

export default {
  components: { PageEdit, PageNav },
  props: ["sidebarItems"],
  computed: mapState(["settings"]),
  methods: {
    onScroll() {
      eventBus.$emit("scroll-y", this.$refs.scrollbar);
    },
  },
};
</script>

<style lang="stylus" scoped>
$paddingHeight = 3vh

.ps
  margin-top $navbarHeight
  // screenHeight - $paddingHeight - $navbarHeight
  height calc(100vh - 3vh - 3.6rem)
.page
  padding-bottom $paddingHeight !important
  display block
</style>
