<template>
  <div class="version-links">
    <NavLink v-if="!hasVersions" :item="versions" />
    <DropdownLink v-else :item="versions" />
  </div>
</template>

<script>
import NavLink from "@parent-theme/components/NavLink.vue";
import DropdownLink from "@theme/components/DropdownLink.vue";
export default {
  name: "VersionLinks",
  components: { NavLink, DropdownLink },
  data() {
    return {
      versions: null,
      selected: null,
    };
  },
  watch: {
    $route(/*to, from*/) {
      this.versions = loadVersionPaths(this);
    },
  },
  computed: {
    hasVersions() {
      return isVersioned(this);
    },
  },
  created() {
    this.versions = loadVersionPaths(this);
  },
};

function isVersioned(pageCtx) {
  const items = getVersions(pageCtx);
  return items.length > 1;
}

function loadVersionPaths(pageCtx) {
  const text = getCurrentVersion(pageCtx);
  const items = getVersions(pageCtx);
  return isVersioned(pageCtx) ? { text, items } : { link: items[0].link, text, type: "link" };
}

function getCurrentVersion({ $themeConfig, $route }) {
  const { versions } = $themeConfig;
  return versions.reduce(
    (current, version) => ($route.path.startsWith("/" + version) ? version : current),
    versions[0] || "latest"
  );
}

function getVersions(pageCtx) {
  const { $themeConfig, $site } = pageCtx;
  const pages = $site.pages.map(({ path }) => path);
  const path = getUnversionedPath(pageCtx);
  return $themeConfig.versions
    .map((version, index) => {
      return index === 0
        ? { text: version, link: path }
        : { text: version, link: "/" + version + path };
    })
    .filter(({ link }) => pages.includes(link));
}

function getUnversionedPath({ $themeConfig, $route }) {
  const { versions } = $themeConfig;
  const { path } = $route;
  const cut =
    "/" + (versions.find((version, index) => index !== 0 && path.startsWith("/" + version)) || "");
  return cut === "/" ? path : path.replace(new RegExp(`^${cut}`), "");
}
</script>

<style lang="stylus"></style>
