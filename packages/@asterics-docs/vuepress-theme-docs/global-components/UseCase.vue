<template>
  <swiper-slide>
    <div class="slide" ref="slide">
      <Media :content="media" :stop="stop" :active="active" />
      <div class="content">
        <Description :title="title"><slot>Use Case</slot></Description>
      </div>
    </div>
  </swiper-slide>
</template>

<script>
import eventBus from "@theme/utils/event-bus.js";

import Media from "@theme/components/general/Media.vue";
import Description from "@theme/components/home/Description.vue";

export default {
  name: "UseCase",
  components: { Media, Description },
  props: {
    link: {
      type: String,
      default: "#",
    },
    media: {
      type: String,
      default: null,
    },
    title: {
      type: String,
      default: "",
    },
    stop: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      active: false,
    };
  },
  methods: {
    classes() {
      return Array.from(this.$refs.slide.parentNode.classList) || [];
    },
    onSlideChangeTransitionStart() {
      this.active = true;
    },
    onSlideChangeTransitionEnd() {
      this.active = this.classes().includes("swiper-slide-active");
    },
  },
  created() {
    eventBus.$on("slide-change-transition-start", this.onSlideChangeTransitionStart);
    eventBus.$on("slide-change-transition-end", this.onSlideChangeTransitionEnd);
  },
  beforeDestroy() {
    eventBus.$off("slide-change-transition-start", this.onSlideChangeTransitionStart);
    eventBus.$off("slide-change-transition-end", this.onSlideChangeTransitionEnd);
  },
};
</script>

<style lang="stylus" scoped></style>

<style lang="stylus">
@media (max-width: $MQMobile)
  .swiper-button-prev, .swiper-button-next
    display none
</style>
