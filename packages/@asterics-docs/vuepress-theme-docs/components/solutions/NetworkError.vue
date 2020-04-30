<template>
  <Toast v-on:delete-toast="$emit('delete-toast')">
    <div slot="title">Network Error</div>
    <div class="network-error">
      <div v-if="!secure">
        Your browser cannot access the <abbr title="AsTeRICS Runtime Environment">ARE</abbr> at
        <a :href="host" rel="noopener" target="_blank">{{ host }} <OutboundLink /></a>. Make sure it
        is running and available at the configured domain.
      </div>
      <div v-else>
        Your browser cannot access the <abbr title="AsTeRICS Runtime Environment">ARE</abbr> at
        <a :href="host" rel="noopener" target="_blank">{{ host }} <OutboundLink /></a>. To grant
        access, execute following steps:
        <ol>
          <li>
            Open link <a :href="host" rel="noopener" target="_blank">{{ host }} <OutboundLink /></a>
          </li>
          <li>Add exception</li>
        </ol>
      </div>
    </div>
  </Toast>
</template>

<script>
import Toast from "@theme/components/toasts/Toast.vue";

export default {
  name: "NetworkError",
  components: { Toast },
  props: {
    host: {
      type: String,
      required: true,
    },
  },
  computed: {
    secure() {
      return this.host.startsWith("https://");
    },
  },
};
</script>

<style lang="stylus" scoped>
ol
  padding-top 0.25rem
  padding-left 1.5rem
</style>
