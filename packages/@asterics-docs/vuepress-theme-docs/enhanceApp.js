import "./plugins/icons";
import "./plugins/carousel";

import { store } from "./plugins/store";

import SettingsView from "@theme/components/settings/SettingsView.vue";
import ToastsView from "@theme/components/toasts/ToastsView.vue";
import SSRSettingsView from "@theme/components/settings/SSRSettingsView.vue";
import BackToTop from "@theme/components/BackToTop.vue";
import SSRBackToTop from "@theme/components/SSRBackToTop.vue";

// async function is also supported, too
export default async ({
  Vue, // the version of Vue being used in the VuePress app
  options, // the options for the root Vue instance
  router, // the router instance for the app
  siteData, // site metadata
  isServer, // is this enhancement applied in server-rendering or client
}) => {
  Vue.prototype.$store = store;
  if (!isServer) {
    Vue.component("SettingsView", SettingsView);
    Vue.component("BackToTop", BackToTop);
  } else {
    Vue.component("BackToTop", SSRBackToTop);
    Vue.component("SettingsView", SSRSettingsView);
  }

  Vue.component("ToastsView", ToastsView);
};
