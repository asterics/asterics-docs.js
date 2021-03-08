<template>
  <li>
    <Linker v-if="media && !isYoutube" :to="href" class="partner">
      <Figure :src="media" :zoom="false" :alt="alt" :scale="Number(scale)" />
    </Linker>
  </li>
</template>

<script>
import Figure from "@theme/components/general/Figure.vue";
import Linker from "@theme/components/general/Linker.vue";
export default {
  name: "Partner",
  components: { Figure, Linker },
  props: {
    media: {
      type: String,
      default: "",
    },
    alt: {
      type: String,
      default: "",
    },
    href: {
      type: String,
      default: "",
    },
    scale: {
      type: String,
      default: "1",
    },
  },
  computed: {
    isYoutube() {
      const patterns = [/https:\/\/.*youtube\.com.*v=(.*?)(&.*)?$/, /https?:\/\/.*youtu\.be\/(.*?)(\?.*)?$/];
      const pattern = patterns.find((e) => e.exec(this.media));
      return this.media && pattern ? this.media.replace(pattern, (m, code) => code) : false;
    },
  },
};
</script>

<style lang="stylus" scoped>
li
  margin auto 18px
.partner
  min-width 80px
</style>
<style lang="stylus">
@media (max-width: $MQMobileNarrow)
  .partner
    .container img
      max-height 150px
      object-fit contain
</style>
