<template>
  <div
    class="theme-container ssr"
    :class="pageClasses"
    @touchstart="onTouchStart"
    @touchend="onTouchEnd"
  >
    <Navbar v-if="shouldShowNavbar" @toggle-sidebar="toggleSidebarFromNavbar" />

    <div class="sidebar-mask" @click="toggleSidebar(false)" />

    <Sidebar
      :items="sidebarItems"
      @toggle-sidebar="toggleSidebar"
      v-show="!settings.page.settings.display"
    >
      <template #top>
        <slot name="sidebar-top" />
      </template>
      <template #bottom>
        <slot name="sidebar-bottom" />
      </template>
    </Sidebar>

    <perfect-scrollbar
      ref="scrollbar"
      tag="main"
      class="page"
      @ps-scroll-y="onScroll"
      v-show="!settings.page.settings.display"
    >
      <JumboTron id="home-jumbotron" :class="{ mounted: isMounted, lock: lockJumbotron }">
        <Content slot-key="jumbotron" />
      </JumboTron>
      <div class="theme-default-content">
        <Content slot-key="slideshow" />
      </div>
      <Content class="theme-default-content" />
      <PageEdit />

      <PageNav v-bind="{ sidebarItems }" />
    </perfect-scrollbar>
  </div>
</template>

<script>
import eventBus from "@theme/utils/event-bus.js";
import { mapState } from "vuex";

import Navbar from "@theme/components/Navbar.vue";
import Sidebar from "@theme/components/Sidebar.vue";
import PageEdit from "@theme/components/PageEdit.vue";
import PageNav from "@parent-theme/components/PageNav.vue";
import { resolveSidebarItems } from "@parent-theme/util";

import JumboTron from "@theme/components/home/JumboTron.vue";

export default {
  name: "Home",

  components: {
    Sidebar,
    Navbar,
    PageEdit,
    PageNav,
    JumboTron,
  },

  data() {
    return {
      isSidebarOpen: false,
      isMounted: false,
      lockJumbotron: false,
    };
  },

  computed: {
    ...mapState(["settings"]),
    shouldShowNavbar() {
      const { themeConfig } = this.$site;
      const { frontmatter } = this.$page;
      if (frontmatter.navbar === false || themeConfig.navbar === false) {
        return false;
      }
      return (
        this.$title ||
        themeConfig.logo ||
        themeConfig.repo ||
        themeConfig.nav ||
        this.$themeLocaleConfig.nav
      );
    },

    shouldShowSidebar() {
      const { frontmatter } = this.$page;
      return !frontmatter.home && frontmatter.sidebar !== false && this.sidebarItems.length;
    },

    sidebarItems() {
      return resolveSidebarItems(this.$page, this.$page.regularPath, this.$site, this.$localePath);
    },

    pageClasses() {
      const userPageClass = this.$page.frontmatter.pageClass;
      return [
        {
          "no-navbar": !this.shouldShowNavbar,
          "sidebar-open": this.isSidebarOpen,
          "no-sidebar": !this.shouldShowSidebar,
        },
        userPageClass,
      ];
    },
  },

  mounted() {
    if (typeof setTimeout !== "undefined") {
      setTimeout(() => {
        this.isMounted = true;
      }, 500);
    }
    this.$router.afterEach(() => {
      this.isSidebarOpen = false;
    });
  },

  beforeMount() {
    this.isMounted = false;
  },

  methods: {
    toggleSidebar(to) {
      this.isSidebarOpen = typeof to === "boolean" ? to : !this.isSidebarOpen;
      this.$emit("toggle-sidebar", this.isSidebarOpen);
    },

    toggleSidebarFromNavbar(to) {
      this.toggleSidebar(to);
      if (this.settings.page.settings.display) {
        this.$store.commit("hideSettings");
      }
    },

    // side swipe
    onTouchStart(e) {
      this.touchStart = {
        x: e.changedTouches[0].clientX,
        y: e.changedTouches[0].clientY,
      };
    },

    onTouchEnd(e) {
      const dx = e.changedTouches[0].clientX - this.touchStart.x;
      const dy = e.changedTouches[0].clientY - this.touchStart.y;
      if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 40) {
        if (dx > 0 && this.touchStart.x <= 80) {
          this.toggleSidebar(true);
        } else {
          this.toggleSidebar(false);
        }
      }
    },

    onScroll() {
      if (!this.lockJumbotron && this.$refs.scrollbar.ps.scrollbarYTop > 20) {
        this.lockJumbotron = true;
      }
      eventBus.$emit("scroll-y", this.$refs.scrollbar);
    },
  },
};
</script>

<style lang="stylus" scoped>
// .page
//   .theme-default-content:nth-child(2)
//     padding-bottom 1px
//     // padding-top -40px
//   .theme-default-content:nth-child(3)
//     padding-top 1px

$paddingHeight = 6vh

.ps
  margin-top $navbarHeight
  // screenHeight - $paddingHeight - $navbarHeight
  height calc(100vh - 6vh - 3.6rem)
  padding-bottom $paddingHeight !important
  .ssr-rendered &
    height unset

// .page
//   display block

#home-jumbotron
  // margin-top $navbarHeight
  background radial-gradient(white 0%,darken($borderColor,5%) 80%)
  .dark-mode &
    // background radial-gradient(black 0%, $darkModeBg 80%, darken($darkModeTextColor,5%) 150%)
    background unset
    background-color darken($darkModeTextColor,70%)
    box-shadow 1px 1px 0px 2px darken($darkModeTextColor,40%)
    border-bottom 1px solid darken($darkModeTextColor,80%) !important
  .dark-mode &.lock
    box-shadow 1px 1px 14px 2px darken($darkModeTextColor,40%) !important
  display flex
  flex-flow column nowrap
  box-shadow 1px 1px 0px 2px darken($borderColor,40%)
  transition box-shadow 1.5s ease-out
  &.mounted
    box-shadow 1px 1px 2rem 2px darken($borderColor,40%)
    border-bottom 1px solid darken($borderColor,20%)
    .dark-mode &
      box-shadow 1px 1px 14px 2px darken($darkModeTextColor,40%) !important
  border-top 1px solid darken($borderColor,40%)
  & > div
    flex 1 1 100%
    margin 10rem 6rem
    transition margin 1s ease-out
  &.lock
    &
      transition-duration 3s
      box-shadow 1px 1px 4px 2px darken($borderColor,40%)
    & > div
      margin 4rem 6rem
      & > div
        padding 8px 0px

@media (max-width: $MQMobileNarrow)
  #home-jumbotron
    & > div
      margin 6rem 1rem
    &.lock > div
      margin 1rem
</style>
