<template>
  <div class="description">
    <Media class="description-media" :content="media" :active="true" :zoom="false" />
    <Information
      class="description-information"
      :title="title"
      :os="os"
      :badges="badges"
      :category="category"
      ><slot></slot
    ></Information>
  </div>
</template>

<script>
import Media from "@theme/components/general/Media.vue";
import Information from "@theme/components/solutions/Information.vue";

export default {
  name: "Description",
  components: { Media, Information },
  props: {
    title: {
      type: String,
      default: "",
    },
    category: {
      type: String,
      default: "",
    },
    os: {
      type: String,
      default: "",
    },
    badges: {
      type: String,
      default: "",
    },
    media: {
      type: String,
      default: null,
    },
  },
};
</script>

<style lang="stylus" scoped>
.description
  // cursor pointer
  display flex
  flex-flow row nowrap
  height ($mediaHeight*3/4)px
  // background-color lighten($borderColor,80%)
  background linear-gradient(lighten($borderColor,80%), transparent 60%)
  .dark-mode &
    background linear-gradient($darkModeTextColor -150%, transparent 60%)
  // background linear-gradient(transparent 60%, lighten($borderColor,80%))
  .description-media, .description-information
    height unset
    // transition width 1s ease
    transition width 3s 0s ease
  .description-media
    transition width 2s 0s ease
    width 60%
  .description-information
    width 40%
  // .description-media
    // height unset
    // height 100%
    // width 50%
    // & img
    //   object-fit contain !important
  .description-media, .description-information
    &:hover
      transition width 3s 1s ease
      width 80% !important
  .description-media
    box-shadow 3px 2px 3px 1px darken($borderColor,50%)
    .dark-mode &
      box-shadow 3px 2px 3px 1px darken($darkModeTextColor,20%)

@media (max-width: $MQMobile)
  .description
    height unset
    flex-flow column nowrap
    .description-media
      margin auto
      width 100% !important
      order 2
      height ($mediaHeight/3*2)px
      max-height $mediaHeight
    .description-information
      min-height ($mediaHeight/2)px
      order 1
      width fit-content
@media (max-width: $MQMobileNarrow)
  .description
    .description-media
      box-shadow none
    .description-information
      min-height 30vh
</style>
