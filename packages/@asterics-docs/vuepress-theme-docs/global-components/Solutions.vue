<template>
  <swiper
    ref="swiper"
    class="swiper"
    :options="options"
    @slide-change-transition-start="onSlideChangeStart"
    @slide-change-transition-end="onSlideChangeEnd"
  >
    <slot></slot>
    <div
      ref="previous"
      class="swiper-button-prev"
      slot="button-prev"
      @keydown.space.prevent="onPrevious"
    ></div>
    <div
      ref="next"
      class="swiper-button-next"
      slot="button-next"
      @keydown.space.prevent="onNext"
    ></div>
    <div class="swiper-pagination" slot="pagination"></div>
  </swiper>
</template>

<script>
import eventBus from "@theme/utils/event-bus.js";

export default {
  name: "Solutions",
  methods: {
    onSlideChangeStart() {
      eventBus.$emit("slide-change-transition-start");
    },
    onSlideChangeEnd() {
      eventBus.$emit("slide-change-transition-end");
    },
    onPrevious() {
      this.$refs.previous.click();
    },
    onNext() {
      this.$refs.next.click();
    },
  },
  data() {
    return {
      options: {
        a11y: true,
        loop: false,
        grabCursor: true,
        mode: "horizontal",
        keyboard: { enabled: true },
        autoplay: { delay: 7000, disableOnInteraction: true },
        pagination: { el: ".swiper-pagination", dynamicBullets: true, clickable: false },
        navigation: { nextEl: ".swiper-button-next", prevEl: ".swiper-button-prev" },
      },
    };
  },
};
</script>

<style lang="stylus" scoped>
.swiper-button-prev, .swiper-button-next
  // top ($mediaHeight * 3 / 4) + ($contentHeight / 2) + ($slideMarginBottom / 2) + 10px
  top ($mediaHeight * 3 / 4) + ($contentHeight / 2) + ($slideMarginBottom / 2)
</style>
<style lang="stylus">
.swiper-container
  .swiper-slide
    border unset !important
    margin unset !important
    box-shadow unset !important
</style>
