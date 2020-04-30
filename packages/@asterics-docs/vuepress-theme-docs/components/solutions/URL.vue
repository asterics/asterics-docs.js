<template>
  <div class="url">
    <div class="title"><slot>URL</slot></div>
    <div>
      <form class="input" @submit.prevent="onSubmit">
        <input
          :value="value"
          type="text"
          aria-label="Change URL"
          autocomplete="off"
          spellcheck="false"
          @input="onInput($event)"
        />
        <div class="controls">
          <!-- <font-awesome-icon icon="times"></font-awesome-icon> -->
          <!-- <font-awesome-icon icon="save"></font-awesome-icon> -->
          <font-awesome-icon
            tabindex="0"
            icon="undo"
            @click="onRestore"
            @keydown.enter.space.prevent="onRestore"
          ></font-awesome-icon>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: "URL",
  props: {
    value: {
      type: String,
      default: "",
    },
  },
  methods: {
    onSubmit() {},
    onInput(e) {
      this.$emit("input-url", e.target.value);
    },
    onRestore() {
      this.$emit("restore-url");
    },
  },
};
</script>

<style lang="stylus" scoped>
.title
  margin-bottom 0.5rem
form
  display flex
  flex-flow row nowrap
  input
    padding-left 0.6rem
  .controls
    display flex
    flex-flow row nowrap
    align-items center
    position absolute
    opacity 0
    transition opacity 2s ease-in !important
    transition padding 1s ease-in !important
    svg
      cursor pointer
      padding 0.5rem 0.7rem
      width 1rem
  &:hover, &:focus-within
    input
      padding-left 2.2rem
    .controls
      opacity 1
</style>
