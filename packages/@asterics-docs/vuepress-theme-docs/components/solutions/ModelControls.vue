<template>
  <div class="model-controls-wrapper">
    <div
      title="Edit the AsTeRICS model"
      class="control model"
      :class="{ disabled: !model }"
    >
      <Linker :to="modelURL" :tab="Boolean(model)">
        <div class="icon-background small external">
          <div class="icon small">
            <!-- <Logo back="white" /> -->
            <font-awesome-icon
              icon="draw-polygon"
              style="transform: rotate(-45deg);"
            ></font-awesome-icon>
            <!-- <font-awesome-icon icon="pencil-ruler"></font-awesome-icon> -->
            <!-- <font-awesome-icon icon="drafting-compass"></font-awesome-icon> -->
          </div>
        </div>
      </Linker>
    </div>
    <div
      title="Open the web app to customize the solution"
      class="control webapp"
      :class="{ disabled: !webapp }"
    >
      <Linker :to="webappURL" :tab="Boolean(webapp)">
        <div class="icon-background small external">
          <div class="icon small">
            <!-- <font-awesome-icon icon="tools"></font-awesome-icon> -->
            <font-awesome-icon icon="rocket"></font-awesome-icon>
          </div>
        </div>
      </Linker>
    </div>
    <div title="Start the AsTeRICS Model" class="control start">
      <div class="icon-background" @click="onStart" @keydown.enter="onStart" tabindex="0">
        <div class="icon">
          <font-awesome-icon icon="play"></font-awesome-icon>
        </div>
      </div>
    </div>
    <div title="Open the solution settings" class="control settings">
      <div
        class="icon-background small dark"
        @click="openSolutionSettings"
        @keydown.enter="openSolutionSettings"
        tabindex="0"
      >
        <div class="icon small">
          <font-awesome-icon icon="cog"></font-awesome-icon>
        </div>
      </div>
    </div>
    <div
      title="Open the plugin documentation"
      class="control docs"
      :class="{ disabled: !docs }"
    >
      <Linker :to="docs" :tab="Boolean(docs)">
        <div class="icon-background small dark">
          <div class="icon small">
            <font-awesome-icon :icon="['fab', 'readme']"></font-awesome-icon>
          </div>
        </div>
      </Linker>
    </div>
  </div>
</template>

<script>
import eventBus from "@theme/utils/event-bus.js";
import { mapState } from "vuex";

import Logo from "@theme/components/general/Logo.vue";
import Linker from "@theme/components/general/Linker.vue";

export default {
  name: "ModelControls",
  components: { Logo, Linker },
  props: {
    os: {
      type: String,
      default: "",
    },
    model: {
      type: String,
      default: null,
    },
    webapp: {
      type: String,
      default: null,
    },
    docs: {
      type: String,
      default: null,
    },
    active: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      deploy: null,
      setURI: null,
    };
  },
  methods: {
    openSolutionSettings() {
      this.$store.commit("setSettingsView", "SolutionSettings");
      this.$store.commit("showSettings");
    },
    // FIXME: Encoded URL parameters are not supported by ARE/WebACS currently.
    //        But should be probably used in future.
    encode(component) {
      return typeof encodeURIComponent === "undefined"
        ? component
        : encodeURIComponent(component);
    },
    onStart() {
      if (this.model) {
        this.setURI(this.settings.are.host + "/rest/");
        try {
          this.deploy(
            this.model,
            {},
            (data, status) => {
              console.log(data, status);
              console.log("Model deployed to " + this.settings.are.host);
            },
            (status, error) => {
              console.log(status, error);

              if (error === "Internal Server Error") {
                eventBus.$emit("toaster-push", {
                  message: error,
                  supportedOS: this.os,
                  component: "InternalServerError",
                });
              }

              if (error === "Network Error") {
                eventBus.$emit("toaster-push", {
                  message: error,
                  host: this.settings.are.host,
                  component: "NetworkError",
                });
              }
            }
          );
        } catch (e) {
          console.log("DEBUG", e);
        }
      }
    },
  },
  computed: {
    ...mapState(["settings"]),
    webappSettingsUrl() {
      const { host } = this.$themeConfig;
      const { base } = this.$site;
      const hostDomain = host.replace(/\/$/, "") + base;
      return this.webapp
        ? this.webapp.replace(host, hostDomain) + `?areBaseURI=${this.settings.are.host}`
        : this.webapp;
    },
    webappURL() {
      return this.webapp ? this.webapp : false;
    },
    modelURL() {
      return this.model
        ? this.settings.webacs.host +
            "?" +
            `areBaseURI=${this.settings.are.host}` +
            "&" +
            `openFile=${this.model}`
        : false;
    },
  },
  mounted() {
    import("@asterics/web-app-utils").then(
      ({ deployModelFromWebserverApplySettingsAndStartModel, setBaseURI }) => {
        this.deploy = deployModelFromWebserverApplySettingsAndStartModel;
        this.setURI = setBaseURI;
      }
    );
  },
};
</script>

<style lang="stylus" scoped>
@import "./controls.styl"
</style>
