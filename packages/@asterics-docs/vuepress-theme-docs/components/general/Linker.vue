<template>
  <div>
    <a
      :tabindex="tab ? 0 : -1"
      v-if="external"
      :href="to"
      :rel="tab ? 'noopener' : ''"
      :target="tab ? '_blank' : ''"
      style="display: block;"
    >
      <slot></slot>
    </a>
    <router-link v-else-if="to" style="display: block;" :to="to">
      <slot></slot>
    </router-link>
    <slot v-else></slot>
  </div>
</template>

<script>
export default {
  name: "Linker",
  props: {
    to: {
      type: [String, Boolean],
      default: false,
    },
    tab: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    external() {
      return /^https?\:\/\//.exec(this.to) === null ? false : true;
    },
  },
};
</script>

<style lang="stylus" scoped></style>
