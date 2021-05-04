<template>
  <footer class="page-edit">
    <div v-if="$page.editLink" class="edit-link">
      <div class="edit-preamble" v-if="editPreambleText">{{ editPreambleText }}</div>
      <div class="edit-text">
        <a :href="$page.editLink" target="_blank" rel="noopener noreferrer">{{ editLinkText }}</a>
        <OutboundLink />
        <span class="edit-guides">
          <EditorGuide />
          <MarkdownGuide />
          <DocsGuide />
        </span>
      </div>
    </div>

    <div v-if="lastUpdated" class="last-updated">
      <div class="prefix">{{ lastUpdatedText }}</div>
      <div class="time">{{ lastUpdated }}</div>
    </div>
  </footer>
</template>

<script>
import EditorGuide from "@theme/components/EditorGuide.vue";
import MarkdownGuide from "@theme/components/MarkdownGuide.vue";
import DocsGuide from "@theme/components/DocsGuide.vue";

export default {
  name: "PageEdit",

  components: {
    MarkdownGuide,
    EditorGuide,
    DocsGuide,
  },

  computed: {
    lastUpdated() {
      return this.$page.lastUpdated;
    },

    lastUpdatedText() {
      if (typeof this.$themeLocaleConfig.lastUpdated === "string") {
        return this.$themeLocaleConfig.lastUpdated;
      }
      if (typeof this.$site.themeConfig.lastUpdated === "string") {
        return this.$site.themeConfig.lastUpdated;
      }
      return "Last Updated";
    },

    editLinkText() {
      return this.$themeLocaleConfig.editLinkText || this.$site.themeConfig.editLinkText || `Edit this page`;
    },

    editPreambleText() {
      return this.$themeLocaleConfig.editPreambleText || this.$site.themeConfig.editPreambleText || "";
    },
  },
};
</script>

<style lang="stylus">
$wrapper
  max-width $contentWidth
  margin 0 auto
  padding 2rem 2.5rem
  @media (max-width: $MQNarrow)
    padding 2rem
  @media (max-width: $MQMobileNarrow)
    padding 1.5rem

.page-edit
  @extend $wrapper
  padding-top 1rem
  padding-bottom 1rem
  overflow auto
  transition color 1s ease

  .edit-link
    display inline-block
    a
      color lighten($textColor, 25%)
    a, svg
      margin-right 0.25rem
    a > svg
      margin-right 0rem
    .edit-preamble
      font-style italic
      color lighten($textColor, 50%)

  // & .edit-guides
  //   opacity 0

  // &:hover .edit-guides
  //   opacity 1

  .last-updated
    float right
    text-align right
    font-size 0.9em
    .prefix
      font-weight 500
      color lighten($textColor, 25%)
    .time
      font-weight 400
      color #aaa

@media (max-width: $MQMobile)
  .page-edit
    .edit-link
      margin-bottom 0.5rem
    .last-updated
      font-size 0.8em
      float none
      text-align left
</style>
