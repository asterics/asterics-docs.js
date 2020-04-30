<template>
  <swiper-slide>
    <div class="slide" ref="solution">
      <div class="solution-media">
        <Description :title="title" :category="category" :os="os" :badges="badges" :media="media"
          ><slot></slot
        ></Description>
      </div>
      <div class="controls">
        <Controls
          :model="model"
          :grid="grid"
          :os="os"
          :webapp="webapp"
          :docs="docs"
          :active="active"
        />
      </div>
    </div>
  </swiper-slide>
</template>

<script>
import eventBus from "@theme/utils/event-bus.js";

import Description from "@theme/components/solutions/Description.vue";
import Controls from "@theme/components/solutions/Controls.vue";

export default {
  name: "Solution",
  components: { Description, Controls },
  props: {
    category: {
      type: String,
      default: "",
    },
    title: {
      type: String,
      default: "",
    },
    os: {
      type: String,
      default: "",
    },
    badges: {
      type: String,
      default: null,
    },
    media: {
      type: String,
      default: null,
    },
    model: {
      type: String,
      default: null,
    },
    grid: {
      type: String,
      default: null,
    },
    webapp: {
      type: String,
      default: null,
    },
    docs: {
      type: String,
      default: null,
    },
  },
  data() {
    return {
      active: true,
    };
  },
  methods: {
    classes() {
      return Array.from(this.$refs.solution.parentNode.classList) || [];
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

<style lang="stylus" scoped>
.swiper-slide
  margin 1rem 0
  box-shadow 1px 1px 3px 1px darken($borderColor,20%)
  .dark-mode &
    box-shadow 1px 1px 3px 1px darken($darkModeTextColor,20%)

.solution-media
  width 100%
</style>

<style lang="stylus">
@media (max-width: $MQMobile)
  .swiper-button-prev, .swiper-button-next
    display none
@media (max-width: $MQMobileNarrow)
  .slide .controls
    min-height unset !important
</style>
