<template>
  <div class="plugin-filter">
    <template v-for="label of ['Featured', 'All']">
      <input
        :id="label"
        :key="label"
        type="radio"
        v-model="radioValue"
        :value="label"
        tabindex="-1"
      />
      <label
        :key="`${label}-label`"
        :for="label"
        tabindex="0"
        @keydown.enter.space.prevent="onSelect(label)"
        >{{ label }}</label
      >
    </template>
  </div>
</template>

<script>
export default {
  name: "Feature",
  props: {
    value: {
      type: String,
      default: "",
    },
  },
  computed: {
    radioValue: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit("input", value);
      },
    },
  },
  methods: {
    onSelect(value) {
      this.$emit("input", value);
    },
  },
};
</script>

<style lang="stylus" scoped></style>
