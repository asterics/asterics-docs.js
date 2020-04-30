<template>
  <div class="google-translate">
    <DropdownLink :item="items" />
  </div>
</template>

<script>
import DropdownLink from "@theme/components/DropdownLink.vue";
export default {
  name: "GoogleTranslate",
  components: { DropdownLink },
  data() {
    return {
      items: null,
      favorites: null,
    };
  },
  computed: {
    route() {
      return (
        this.$themeConfig.host.replace(/\/$/, "") +
        this.$site.base.replace(/\/$/, "") +
        this.$route.path
      );
    },
  },
  methods: {
    loadTranslationLinks() {
      if (typeof this.$themeConfig.translate === "undefined") return;

      const sourceLanguage = this.getSourceLanguage();
      let text = "EN";
      let items = [];

      for (const [language, navLabel, dropdownLabel] of this.$themeConfig.translate.codes) {
        if (language === sourceLanguage) {
          text = navLabel.toUpperCase();
        } else {
          items.push({
            text: dropdownLabel,
            link: this.generateLink(this.isConfigured() ? sourceLanguage : "auto", language),
          });
        }
      }

      const { favorites } = this.$themeConfig.translate;
      this.items = favorites
        ? {
            text,
            items: [
              {
                // text: "Favorites",
                items: items.slice(0, favorites.length - 1),
                type: "links",
              },
              {
                // text: "Others",
                items: items.slice(favorites.length - 1, items.length),
                type: "links",
              },
            ],
          }
        : { text, items };
    },
    generateLink(sourceLanguage, targetLanguage) {
      const content = encodeURIComponent(this.route);
      const prefix = "https://translate.google.com/translate";
      return `${prefix}?sl=${sourceLanguage}&tl=${targetLanguage}&u=${content}`;
    },
    isConfigured() {
      return this.$page.frontmatter && this.$page.frontmatter.lang;
    },
    getSourceLanguage() {
      return this.isConfigured() ? this.$page.frontmatter.lang : "en";
    },
  },
  watch: {
    $route(/*to, from*/) {
      this.loadTranslationLinks();
    },
  },
  created() {
    this.loadTranslationLinks();
  },
};
</script>

<style lang="stylus" scoped></style>
