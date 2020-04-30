<template>
  <div class="video-container">
    <div style="width: 100%; height: 100%;" class="yt-player" :id="id"></div>
  </div>
</template>

<script>
import ytPlayer from "youtube-player";
export default {
  name: "Video",
  props: {
    code: {
      type: String,
      required: true,
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
    }
  },
};
</script>

<style lang="stylus" scoped>
.yt-player
  width 100%
div.video-container
  height ($contentWidth*9/16)px
  box-shadow 1px 1px 3px 1px darken($borderColor,40%)
@media (max-width: $contentWidth)
  div.video-container
    height $contentWidth
    width 100%
    max-height ($contentWidth/2)px
</style>
