<template>
  <img class="no-zoom" :class="{ default: isDefault }" :src="pluginImage" :alt="page.title || ''" />
</template>

<script>
export default {
  name: "GridImage",
  props: {
    page: {
      type: Object,
      require: true,
    },
  },
  data() {
    return {
      isDefault: true,
    };
  },
  computed: {
    pluginImage() {
      let src = this.$withBase("/assets/img/asterics-logo.svg");
      if (this.page.frontmatter.image) {
        this.isDefault = false;
        const { image } = this.page.frontmatter;
        if (image.startsWith("./")) {
          src =
            this.$site.base.replace(/\/$/, "") +
            this.page.regularPath.replace(/[^\/]*?\.html?$/, "") +
            image.replace("./", "");
        }
        if (image.startsWith("/")) {
          // src = this.$site.base.replace(/\/$/, "") + image;
          src = this.$withBase(image);
        }
      }
      return src;
    },
  },
};
</script>

<style lang="stylus" scoped>

img.default
  width 75% !important
  height 75% !important
  object-fit contain !important
</style>
