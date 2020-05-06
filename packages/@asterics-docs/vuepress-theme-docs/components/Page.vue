<template>
  <main v-show="!settings.page.settings.display" class="page">
    <slot name="top" />

    <Content class="theme-default-content" />
    <PageEdit />

    <PageNav v-bind="{ sidebarItems }" />
    <slot name="bottom" />
  </main>
</template>

<script>
import { mapState } from "vuex";

import PageEdit from "@theme/components/PageEdit.vue";
import PageNav from "@parent-theme/components/PageNav.vue";

export default {
  components: { PageEdit, PageNav },
  props: ["sidebarItems"],
  computed: mapState(["settings"]),
};
</script>

<style lang="stylus" scoped></style>
