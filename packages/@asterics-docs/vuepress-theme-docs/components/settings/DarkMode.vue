<template>
  <div id="dark-mode">
    <div>
      <span><slot>Dark Mode</slot></span>
    </div>
    <div id="dark-mode-buttons">
      <button :disabled="!darkMode" @click="onClickOff" id="dark-mode-off">Light</button>
      <button :disabled="darkMode" @click="onClickOn" id="dark-mode-on">Dark</button>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "DarkMode",
  computed: {
    ...mapState(["settings"]),
    darkMode() {
      return this.settings.page.dark;
    },
  },
  methods: {
    onClickOn() {
      this.$store.commit("toggleDarkMode");
      this.$store.commit("save");
    },
    onClickOff() {
      this.$store.commit("toggleDarkMode");
      this.$store.commit("save");
    },
  },
  watch: {
    darkMode(state) {
      if (document && state) {
        // document.body.classList.add("dark-mode");
        document.documentElement.classList.add("dark-mode");
      } else {
        // document.body.classList.remove("dark-mode");
        document.documentElement.classList.remove("dark-mode");
      }
    },
  },
  created() {
    if (this.darkMode) {
      document.documentElement.classList.add("dark-mode");
    }
  },
};
</script>

<style lang="stylus" scoped>
#dark-mode-buttons
  margin-top 1rem
  display flex
  flex-flow row nowrap
  justify-content space-evenly
  button
    cursor pointer
    background-color darken($borderColor,40%)
    color white
    border none
    border-radius 2px
    padding 16px
    font-size 1.4rem
    margin-right 1rem
    width 100%
    &:last-child
      margin-right 0
    &:hover
      background-color darken($accentColor,20%)
      background-color darken($borderColor,60%)
    &[disabled="disabled"]
      cursor default
      background-color $accentColor
</style>
