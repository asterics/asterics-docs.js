<template>
  <div>
    <div class="title">
      <div @click="onClick" @keydown.enter.space.prevent="onClick" tabindex="0">
        <span>Categories</span>
        <font-awesome-icon v-if="!show" icon="caret-down"></font-awesome-icon>
        <font-awesome-icon v-else icon="caret-right"></font-awesome-icon>
      </div>
      <div v-if="categories.includes(value) && !show" class="plugin-filter display">
        <input :id="value" type="radio" :value="value" v-model="radioValue" />
        <label class="category" :for="value">
          {{ value }}
        </label>
      </div>
    </div>
    <div v-if="show" class="plugin-filter">
      <template v-for="label of categories">
        <input
          :key="label"
          :id="label"
          type="radio"
          v-model="radioValue"
          :value="label"
          tabindex="-1"
        />
        <label
          tabindex="0"
          :key="`${label}-label`"
          :for="label"
          @keydown.enter.space.prevent="onSelect(label)"
          >{{ label }}</label
        >
      </template>
    </div>
  </div>
</template>

<script>
export default {
  name: "Categories",
  props: {
    value: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      show: false,
    };
  },
  computed: {
    allPluginPages() {
      return this.$site.pages.filter(({ regularPath }) =>
        this.$frontmatter.indexed.includes(regularPath)
      );
    },
    categories() {
      return this.allPluginPages
        .map(({ frontmatter }) => frontmatter.subcategory)
        .filter((value, index, self) => self.indexOf(value) === index)
        .sort();
    },
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
    onClick() {
      this.show = !this.show;
    },
    onSelect(value) {
      this.$emit("input", value);
    },
  },
  mounted() {},
};
</script>

<style lang="stylus" scoped>
.title
  cursor pointer
  padding 0.5rem 0
  font-size 1.2rem
  display flex
  flex-flow row nowrap
  justify-content space-between
  align-items center
  div
    flex 2 1 46%
    &:first-child
      margin 1%
      flex 2 1 44%
    &:last-child
      label
        cursor auto
</style>
