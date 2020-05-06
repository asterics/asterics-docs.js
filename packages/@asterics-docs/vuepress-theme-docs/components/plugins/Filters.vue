<template>
  <div v-if="!search.plugins" class="plugin-filters">
    <form action="">
      <fieldset>
        <Feature v-model="selection" />
        <Categories v-model="selection" />
      </fieldset>
    </form>
  </div>
</template>

<script>
import { mapState } from "vuex";

import Feature from "@theme/components/plugins/filter/Feature.vue";
import Categories from "@theme/components/plugins/filter/Categories.vue";

export default {
  name: "Filters",
  components: { Feature, Categories },
  data() {
    return {
      selection: "Featured",
    };
  },
  watch: {
    selection(value /*, oldValue*/) {
      this.$store.commit("updatePluginFilter", value);
    },
  },
  computed: {
    ...mapState(["search"]),
  },
  methods: {},
  mounted() {
    this.$store.commit("updatePluginFilter", "Featured");
  },
};
</script>

<style lang="stylus" scoped>
form
  margin 8px 0
  fieldset
    display flex
    flex-flow column nowrap
    border none
    background-color lighten($borderColor, 80%)
    box-shadow 1px 1px 3px 1px darken($borderColor, 40%)
    .dark-mode &
      background-color lighten($darkModeBg, 5%)
      box-shadow 1px 1px 3px 1px lighten($darkModeBg, 10%)
</style>

<style lang="stylus">
.plugin-filter
  display flex
  flex-flow row wrap
  // justify-content space-around
  input[type="radio"]
    opacity 0
    position fixed
    width 0
    &:checked + label
      background-color $accentColor
      color white
      .dark-mode &
        background-color darken($accentColor, 25%)
      &:hover
        font-weight normal
    & + label:hover
      background-color lighten($accentColor, 20%)
      color white
      .dark-mode &
        background-color darken($accentColor, 5%)
  label
    font-size 1.2rem
    margin 2px
    padding 9px
    cursor pointer
    display inline-block
    text-align center
    flex 2 1 46%
    background-color white
    box-shadow 1px 1px 3px 1px darken($borderColor, 20%)
    .dark-mode &
      background-color darken($darkModeTextColor, 60%)
      box-shadow 1px 1px 3px 1px darken($darkModeBg, 20%)
      color darken(white, 40%)
</style>
