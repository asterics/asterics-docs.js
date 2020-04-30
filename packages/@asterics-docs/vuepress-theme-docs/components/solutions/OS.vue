<template>
  <div class="badge os-badge">
    <font-awesome-icon class="icon" :icon="['fab', icon]"></font-awesome-icon>
    <span class="label">{{ label }}</span>
  </div>
</template>

<script>
export default {
  name: "OS",
  props: {
    type: {
      validator: (value) => {
        return /(lin|win|mac|apple|android|ios)/i.exec(value) || false;
      },
      required: true,
    },
  },
  data() {
    return {
      patterns: [
        [/lin/i, "linux", "Linux"],
        [/win/i, "windows", "Windows"],
        [/(mac|apple)/i, "apple", "macOS"],
        [/android/i, "android", "Android"],
        [/ios/i, "apple", "iOS"],
      ],
    };
  },
  computed: {
    icon() {
      return this.patterns.find(([r]) => r.exec(this.type))[1];
    },
    label() {
      return this.patterns.find(([r]) => r.exec(this.type))[2];
    },
  },
};
</script>

<style lang="stylus" scoped>
.os-badge
  & > *
    padding-right 4px
  .icon
    width 1.2rem
    color darken($accentColor,70%)
</style>
