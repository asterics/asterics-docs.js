<template>
  <BasicLayout>
    <div slot="content">
      <Jumbo class="jumbotron" />
      <div class="theme-default-content">
        <Content />
      </div>
    </div>
  </BasicLayout>
</template>

<script>
import BasicLayout from "@theme/layouts/BasicLayout.vue";
import Jumbo from "@theme/components/Jumbo.vue";
export default {
  components: {
    BasicLayout,
    Jumbo
  }
};
</script>

<style lang="scss" scoped>
.theme-default-content {
  max-width: 1400px;

  &:not(.custom) > *:first-child {
    margin-top: 0;
  }
}
</style>