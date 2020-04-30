<template>
  <Toast v-on:delete-toast="$emit('delete-toast')">
    <div slot="title">Internal Server Error</div>
    <div class="internal-server-error">
      Make sure to run the <abbr title="AsTeRICS Runtime Environment">ARE</abbr> on a supported
      platform:
      <span v-for="(o, i) of os" :key="i">{{ `${o}${i === os.length - 1 ? "." : ", "}` }}</span>
    </div>
  </Toast>
</template>

<script>
import Toast from "@theme/components/toasts/Toast.vue";
export default {
  name: "InternalServerError",
  components: { Toast },
  props: {
    supportedOS: {
      type: String,
      default: "",
    },
  },
  computed: {
    os() {
      return this.supportedOS.split(",");
    },
  },
};
</script>

<style lang="stylus" scoped>
ul
  list-style initial
</style>
