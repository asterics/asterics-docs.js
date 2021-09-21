<template>
  <footer class="page-edit">
    <div v-if="$page.editLink" class="edit-link">
      <div class="edit-preamble" v-if="editPreambleText">{{ editPreambleText }}</div>
      <div class="edit-text">
        <a :href="$page.editLink" target="_blank" rel="noopener noreferrer">{{ editLinkText }}</a>
        <OutboundLink />
        <span class="edit-guides">
          <FancyLink
            id="editor-guide"
            path="/guide/editor.html"
            :icon="['fas', 'pencil-alt']"
            title="Open Website Editor Guide"
          />
          <FancyLink
            id="markdown-guide"
            path="/guide/markdown.html"
            :icon="['fab', 'markdown']"
            title="Open Website Markdown Guide"
          />
          <FancyLink
            id="developer-guide"
            path="/guide/docs.html"
            :icon="['fas', 'info-circle']"
            title="Open Website Developer Guide"
          />
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
import FancyLink from "@theme/components/FancyLink.vue";

export default {
  name: "PageEdit",

  components: { FancyLink },

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
    svg, .edit-guides a
      margin-right 0.25rem
    a > svg
      margin-right 0rem
    .edit-preamble, .edit-text
      font-style italic
    .edit-preamble, .edit-guides a
      color lighten($textColor, 66.6%)

  &:hover
    #editor-guide
      color #45b784
    #markdown-guide
      color $accentColor
    #developer-guide
      color darken($accentColor,70%)

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
