<template>
  <div :id="`plugins-${type}-grid`" class="plugins-grid">
    <div>
      <h2><slot name="title">Plugins</slot></h2>
    </div>
    <form @submit.prevent="onSubmit">
      <fieldset>
        <div class="radio-group featured">
          <template class="button" v-for="label of ['Featured', 'All']">
            <input
              :key="`radio-feature-${label}`"
              :id="`${type}-featured-${label}`"
              type="radio"
              :value="label"
              :name="`${type}-filter-selection`"
              @change="onFeaturedChange"
              :checked="label === 'Featured'"
              v-model="selection"
            />
            <label
              tabindex="0"
              :key="`label-${label}`"
              :for="`${type}-featured-${label}`"
              @keydown.enter="onEnterFeatured(label)"
              class="action-button"
            >
              <div class="action-button">
                {{ label }}
              </div>
            </label>
          </template>
        </div>
        <div class="radio-group subcategory">
          <div :class="{ 'subcategory-title': true, open: showCategories }">
            <h4 @click="onCategoryClick">
              <span>Categories</span>
              <font-awesome-icon v-if="!showCategories" icon="caret-down"></font-awesome-icon>
              <font-awesome-icon v-else icon="caret-right"></font-awesome-icon>
            </h4>
          </div>
          <div class="subcategory-container" v-show="showCategories">
            <template class="button" v-for="label of categories">
              <input
                :key="`radio-subcategory-${label}`"
                :id="`${type}-category-${label}`"
                type="radio"
                :value="label"
                :name="`${type}-filter-selection`"
                @change="onSubcategoryChange"
                v-model="selection"
              />
              <label
                tabindex="0"
                :key="`${type}-label-${label}`"
                :for="`${type}-category-${label}`"
                @keydown.enter="onEnterCategory(label)"
                class="action-button"
              >
                <div>
                  {{ label }}
                </div>
              </label>
            </template>
          </div>
        </div>
      </fieldset>
    </form>
    <div class="plugins-grid">
      <ul v-if="filteredPlugins.length > 0">
        <!-- <transition-group name="list" tag="ul" v-if="filteredPlugins.length > 0"> -->
        <GridElement
          style="background-color: white;"
          v-for="actuator of filteredPlugins"
          :key="actuator"
          :path="actuator"
        />
        <!-- </transition-group> -->
      </ul>
      <div class="no-results" v-else>
        {{ `No ${pluginsType} plugins found.` }}
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import FuzzySearch from "fuzzy-search";

import GridElement from "@theme/components/plugins/grid/GridElement.vue";
export default {
  name: "GridSearch",
  components: { GridElement },
  props: {
    type: {
      type: String,
      default: "plugins",
    },
    dirname: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      radioSelectedPlugins: [],
      selection: null,
      showCategories: false,
    };
  },
  computed: {
    ...mapState(["search"]),
    allPlugins() {
      const { path } = this.$route;
      return this.$frontmatter.indexed.filter((item) => item.startsWith(path + this.dirname));
    },
    allPluginPages() {
      return this.$site.pages.filter(({ regularPath }) => this.allPlugins.includes(regularPath));
    },
    categories() {
      return this.allPluginPages
        .map(({ frontmatter }) => frontmatter.subcategory)
        .filter((value, index, self) => self.indexOf(value) === index)
        .sort();
    },
    filteredPlugins() {
      return this.search.plugins === ""
        ? this.radioSelectedPlugins
        : fuzzySearch(this.allPluginPages, this.radioSelectedPlugins, this.search.plugins);
    },
    pluginsType() {
      return this.type.replace(/s$/, "");
    },
  },
  methods: {
    onEnterFeatured(label) {
      this.selection = label;
      this.radioSelectedPlugins =
        label === "Featured" ? filterFeatured(this.allPluginPages) : this.allPlugins;
    },
    onEnterCategory(category) {
      this.selection = category;
      this.radioSelectedPlugins = filterByCategory(category, this.allPluginPages);
    },
    onFeaturedChange(e) {
      this.radioSelectedPlugins =
        e.target.value === "Featured" ? filterFeatured(this.allPluginPages) : this.allPlugins;
    },
    onSubcategoryChange(e) {
      this.radioSelectedPlugins = filterByCategory(e.target.value, this.allPluginPages);
    },
    onCategoryClick() {
      if (this.showCategories && this.categories.includes(this.selection)) {
        this.selection = "Featured";
        this.radioSelectedPlugins = filterFeatured(this.allPluginPages);
      }
      this.showCategories = !this.showCategories;
    },
    onSubmit() {},
  },
  mounted() {
    this.radioSelectedPlugins = filterFeatured(this.allPluginPages);
    this.selection = "Featured";
  },
};

function filterByCategory(category, pages) {
  const filteredPages = pages.filter(({ frontmatter }) => frontmatter.subcategory === category);
  return filteredPages.map(({ regularPath }) => regularPath);
}

function filterFeatured(pages) {
  const filteredPages = pages.filter(({ frontmatter }) => frontmatter.featured);
  return filteredPages.map(({ regularPath }) => regularPath);
}

function fuzzySearch(pages, paths, input) {
  const filteredPages = pages.filter(({ regularPath }) => paths.includes(regularPath));
  const searcher = new FuzzySearch(
    filteredPages,
    ["frontmatter.title", "frontmatter.subcategory"],
    { caseSensitive: false }
  );
  const results = searcher.search(input);
  return results.map(({ regularPath }) => regularPath);
}
</script>

<style lang="stylus" scoped>
.list-item {
  display: inline-block;
  margin-right: 10px;
}
.list-enter-active, .list-leave-active {
  transition: all 1s;
}
.list-enter, .list-leave-to /* .list-leave-active below version 2.1.8 */ {
  opacity: 0;
  transform: translateY(30px);
}

.flip-list-move {
  transition: transform 1s;
}

form
  padding 0 8px
  fieldset
    background-color lighten($borderColor,80%)
    box-shadow 1px 1px 3px 1px darken($borderColor,40%)
    .dark-mode &
      background-color lighten($darkModeBg,5%)
      box-shadow 1px 1px 3px 1px lighten($darkModeBg,10%)
    border none
    padding 4px
    margin 0
    display flex
    flex-flow column nowrap
    .radio-group
      &:nth-child(2)
        padding 12px 0
      display flex
      flex-flow row wrap
      justify-content space-around
      input[type="radio"]
        opacity 0
        position fixed
        width 0
        &:checked + label
          div
            background-color $accentColor
            color white
            .dark-mode &
              background-color darken($accentColor,25%)
            &:hover
              font-weight normal
        & + label:hover
          div
            background-color lighten($accentColor,20%)
            .dark-mode &
              background-color darken($accentColor,5%)
            color white
            font-weight 500
      label
        font-size 1.2rem
        text-overflow ellipsis
        overflow hidden
        white-space nowrap
        cursor pointer
        display inline-block
        text-align center
        flex 2 1 50%
        div
          text-overflow ellipsis
          overflow hidden
          background-color white
          box-shadow 1px 1px 3px 1px darken($borderColor, 20%)
          .dark-mode &
            background-color darken($darkModeTextColor,60%)
            box-shadow 1px 1px 3px 1px darken($darkModeBg, 20%)
            color darken(white,40%)
          margin 2px 3px
          padding 9px
      &.subcategory
        display flex
        flex-flow column nowrap
        .subcategory-title
          h4
            cursor pointer
            margin 0px
            margin-bottom 8px
            padding-left 4px
            background-color none
            & span:first-child
              margin-right 6px
          &:not(.open)
            h4
              margin-bottom -8px
        .subcategory-container
          display flex
          flex-flow row wrap
          justify-content space-around
          label
            display inline-block
            flex 3 1 30%
@media (max-width: $MQMobile)
  .subcategory-container label
    flex 3 1 50% !important
    div
      overflow hidden
      white-space nowrap
      text-overflow ellipsis

.plugins-grid
  margin 1em 0
  width 100%
  margin auto
  padding 0
  ul
    list-style-type none
    padding 0
    display flex
    flex-flow row wrap
    justify-content flex-start
  .no-results
    background-color $borderColor
    .dark-mode &
      background-color lighten($darkModeBg,5%)
      box-shadow 1px 1px 3px 1px lighten($darkModeBg,10%)
    // border 1px solid darken($borderColor,10%)
    margin 0 8px
    margin-top 1rem
    box-shadow 1px 1px 3px 1px darken($borderColor,20%)
    padding 8px
    line-height 2rem
</style>
