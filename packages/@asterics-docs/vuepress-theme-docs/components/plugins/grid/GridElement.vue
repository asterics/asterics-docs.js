<template>
  <li class="search-grid-link">
    <router-link tabindex="0" :to="page.regularPath" style="display: block;">
      <div class="search-grid-element">
        <div class="search-grid-image-container">
          <GridImage v-if="image" :page="page" />
          <GridIcon v-else :icon="icon.name" :type="icon.type" />
        </div>
        <GridBar :page="page" />
      </div>
    </router-link>
  </li>
</template>

<script>
import GridIcon from "@theme/components/plugins/grid/GridIcon.vue";
import GridImage from "@theme/components/plugins/grid/GridImage.vue";
import GridBar from "@theme/components/plugins/grid/GridBar.vue";

export default {
  name: "GridElement",
  components: { GridIcon, GridImage, GridBar },
  props: {
    path: {
      type: String,
      required: true,
    },
  },
  computed: {
    page() {
      return this.$site.pages.find(({ path }) => path === this.path);
    },
    icon() {
      const m = [
        ["fa-icon", "fas"],
        ["fas-icon", "fas"],
        ["far-icon", "far"],
        ["fab-icon", "fab"],
      ];
      const i = m.find(([name, label]) => this.page.frontmatter[name]);
      return i ? { name: this.page.frontmatter[i[0]], type: i[1] } : false;
    },
    image() {
      return typeof this.page.frontmatter.image !== "undefined" || this.icon === false;
    },
  },
};
</script>

<style lang="stylus" scoped>

$borderWidth = 0px
$labelHeight = 40px
$gridMargin = 8px
$grid = ($contentWidth/3 - 2 * ($borderWidth + $gridMargin))px

.search-grid-link
  cursor pointer
  width $grid
  height $grid
  margin $gridMargin
  border none
  box-shadow 1px 1px 2px 1px darken($borderColor,40%)
  .dark-mode &
    box-shadow 1px 1px 2px 1px lighten($darkModeBg,40%)
    background-color lighten($darkModeBg,5%) !important
  a
    color $textColor
    .dark-mode &
      color $darkModeTextColor
  & > a:hover
    text-decoration none !important
    box-shadow 1px 1px 2px 1px darken($accentColor,20%)
    color $accentColor
.search-grid-element
  display flex
  flex-flow column nowrap
  border none
  list-style-type none
  padding 0
  .dark-mode &
    box-shadow 1px 1px 2px 1px darken($darkModeTextColor,0%)

  .search-grid-image-container
    img
      object-fit cover
      // object-fit contain
      object-position 50% 50%
      width 100%
      height 100%
    display flex
    flex-flow row
    justify-content space-around
    align-items center
    width 100%
    height $grid - $labelHeight
    margin auto
    // background-color $accentColor

@media (max-width: $MQNarrow)
  .search-grid-link
    width 328px
    height 328px
    .search-grid-image-container
      height 328px - $labelHeight
@media (max-width: $MQMobile)
  .search-grid-link
    width 314px
    height 314px
    .search-grid-image-container
      height 314px - $labelHeight
@media (max-width: $MQMobileNarrow)
  .search-grid-link
    width 100vw
    max-height 40vh
    .search-grid-image-container
      height 314px - $labelHeight
      max-height 32vh
</style>
