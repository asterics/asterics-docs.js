<template>
  <div class="media">
    <Figure v-if="content && !isYoutube" :src="content" :zoom="zoom" />
    <Video v-else-if="isYoutube" :code="isYoutube" :stop="stop" :active="active" nocookie />
    <div v-else class="media-default"></div>
  </div>
</template>

<script>
import Figure from "@theme/components/general/Figure.vue";
import Video from "@theme/components/general/Video.vue";
export default {
  name: "Media",
  components: { Figure, Video },
  props: {
    content: {
      type: String,
      default: null,
    },
    active: {
      type: Boolean,
      default: false,
    },
    stop: {
      type: Boolean,
      default: false,
    },
    zoom: {
      type: Boolean,
      default: true,
    },
  },
  computed: {
    isYoutube() {
      const patterns = [
        /https:\/\/.*youtube\.com.*v=(.*?)(&.*)?$/,
        /https?:\/\/.*youtu\.be\/(.*?)(\?.*)?$/,
      ];
      const pattern = patterns.find((e) => e.exec(this.content));
      return this.content && pattern ? this.content.replace(pattern, (m, code) => code) : false;
    },
  },
};
</script>

<style lang="stylus" scoped></style>
