import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export const defaults = {
  page: {
    dark: false,
    settings: {
      component: "PageSettings",
      display: false,
    },
  },
  are: {
    host: {
      secure: "https://127.0.0.1:8083",
      default: "http://127.0.0.1:8081",
    },
  },
  webacs: {
    host: {
      default: "http://webacs.asterics.eu/",
    },
  },
  grid: {
    host: {
      default: "https://grid.asterics.eu/#grid",
    },
  },
};

export const store = new Vuex.Store({
  state: {
    settings: {
      page: { ...defaults.page },
      are: {
        host: defaults.are.host.default,
      },
      webacs: {
        host: defaults.webacs.host.default,
      },
      grid: {
        host: defaults.grid.host.default,
      },
    },
    search: {
      plugins: "",
      filter: "",
    },
  },
  mutations: {
    load(state) {
      if (!localStorage) return;
      state.settings = Object.assign(
        state.settings,
        JSON.parse(localStorage.getItem("asterics-docs-settings"))
      ) || {
        ...settingsDefaults,
      };
      state.settings.page.settings.display = false;
    },

    save(state) {
      if (!localStorage) return;
      localStorage.setItem("asterics-docs-settings", JSON.stringify(state.settings));
    },

    toggleDarkMode(state) {
      state.settings.page.dark = !state.settings.page.dark;
    },

    showSettings(state) {
      state.settings.page.settings.display = true;
    },
    hideSettings(state) {
      state.settings.page.settings.display = false;
    },
    setSettingsView(state, component) {
      state.settings.page.settings.component = component;
    },

    updateARE(state, host) {
      state.settings.are.host = host;
    },

    updateWebACS(state, host) {
      state.settings.webacs.host = host;
    },

    updateGrid(state, host) {
      state.settings.grid.host = host;
    },

    updatePluginSearch(state, input) {
      state.search.plugins = input;
    },
    updatePluginFilter(state, selection) {
      state.search.filter = selection;
    },
  },
});
