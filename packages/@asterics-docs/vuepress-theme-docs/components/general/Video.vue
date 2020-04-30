<template>
  <div v-show="active">
    <div style="width: 100%; height: 100%;" class="player" :id="id"></div>
  </div>
</template>

<script>
import eventBus from "@theme/utils/event-bus.js";
import ytPlayer from "youtube-player";

export default {
  name: "Video",
  props: {
    code: {
      type: String,
      required: true,
    },
    nocookie: {
      type: Boolean,
      default: false,
    },
    stop: {
      type: Boolean,
      default: false,
    },
    active: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      player: null,
      ready: false,
    };
  },
  computed: {
    id() {
      return `youtube-player-${this.code}`;
    },
  },
  methods: {
    onSlideChangeTransitionStart() {
      if (this.player && this.ready) {
        if (this.stop) this.player.stopVideo();
        else this.player.pauseVideo();
      }
    },
  },
  mounted() {
    if (!this.player) {
      this.player = ytPlayer(this.id, {
        wmode: "transparent",
        host: "https://www.youtube-nocookie.com",
        videoId: this.code,
        playerVars: {
          wmode: "transparent",
          showinfo: 0,
          autohide: 1,
          color: "white",
          origin: window ? window.location.origin : this.$themeConfig.host,
        },
      });
      this.player.on("ready", (event) => {
        this.ready = true;
      });
      eventBus.$on("slide-change-transition-start", this.onSlideChangeTransitionStart);
    }
  },
  beforeDestroy() {
    eventBus.$off("slide-change-transition-start", this.onSlideChangeTransitionStart);
  },
};
</script>

<style lang="stylus" scoped>
div, iframe, .player
  height 100% !important
  width 100% !important
</style>
