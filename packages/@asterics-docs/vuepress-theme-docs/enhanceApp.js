import "./plugins/icons";
import "./plugins/scroll";
import "./plugins/carousel";

import { store } from "./plugins/store";

import SettingsView from "@theme/components/settings/SettingsView.vue";
import ToastsView from "@theme/components/toasts/ToastsView.vue";
import SSRSettingsView from "@theme/components/settings/SSRSettingsView.vue";
import BackToTop from "@theme/components/BackToTop.vue";
import SSRBackToTop from "@theme/components/SSRBackToTop.vue";
import SSRLayout from "@theme/layouts/SSRLayout.vue";
import SSRHome from "@theme/layouts/SSRHome.vue";

// async function is also supported, too
export default async ({
  Vue, // the version of Vue being used in the VuePress app
  options, // the options for the root Vue instance
  router, // the router instance for the app
  siteData, // site metadata
  isServer, // is this enhancement applied in server-rendering or client
}) => {
  // const { store } = await import("./plugins/store");
  Vue.prototype.$store = store;
  if (!isServer) {
    Vue.component("SettingsView", SettingsView);
    Vue.component("BackToTop", BackToTop);
  } else {
    Vue.component("BackToTop", SSRBackToTop);
    Vue.component("SettingsView", SSRSettingsView);
    Vue.component("Layout", SSRLayout);
    Vue.component("Home", SSRHome);
  }

  Vue.component("ToastsView", ToastsView);
  // Vue.component("SettingsView", isServer ? { template: "" } : SettingsView);
  // Vue.component("SettingsView", { template: "" });
};
