const { relative, resolve, join } = require("path");

const twemoji = require("twemoji");
const loadConfig = require("@asterics-docs/tool/cli/util/config.js");

// FIXME: Configuration missmatch with @asterics-docs/tool possible (--config parameter)
const config = loadConfig();
let index = require(join(process.cwd(), config.source, ".vuepress/index.json"));

module.exports = (themeConfig, ctx) => {
  const plugins = [
    [
      "@vuepress/medium-zoom",
      {
        selector: ".theme-default-content :not(a) > img :not(.no-zoom)",
      },
    ],
    [
      "directory-classifier",
      {
        directories: [
          {
            dirname: "plugins",
            subdirlevel: 2,
          },
        ],
      },
    ],
    [
      "@studyathome-internationally/vuepress-plugin-searchbox",
      {
        appId: "JSPRUOOKS2",
        apiKey: "f413d292a844662b729ae6896d3037e9",
        indexName: "asterics.eu",
        disableUserPersonalization: true,
      },
    ],
    ["@studyathome-internationally/vuepress-plugin-pwa-autoload"],
    [
      "@vuepress/pwa",
      {
        serviceWorker: true,
        updatePopup: true,
        popupComponent: "AutoSWUpdatePopup",
        generateSWConfig: {
          globPatterns: [],
          globIgnores: [],
        },
      },
    ],
    // [
    //   "@vuepress/search",
    //   {
    //     searchMaxSuggestions: 10,
    //     test: ["/", ...themeConfig.versions.slice(1, themeConfig.versions.length).map((version) => `/${version}/`)],
    //   },
    // ],
  ];
  const globalUIComponents = ["SettingsView", "BackToTop", "ToastsView"];

  const config = {
    extend: "@vuepress/theme-default",
    extendMarkdown: configureMarkdown,
    async extendPageData($page) {
      await loadPageExtraData($page, themeConfig);
    },
    globalUIComponents,
    enhanceAppFiles: [resolve(__dirname, "enhanceApp.js")],
    plugins,
  };
  return config;
};

function configureMarkdown(md) {
  // md.set({ false: true, typographer: true, linkify: true });
  md.set({ xhtmlOut: true, typographer: true });
  md.use(require("markdown-it-sub"));
  md.use(require("markdown-it-sup"));
  md.use(require("markdown-it-footnote"));
  md.use(require("markdown-it-deflist"));
  md.use(require("markdown-it-abbr"));
  md.use(require("markdown-it-emoji"));
  md.use(require("markdown-it-checkbox"));
  md.use(require("markdown-it-imsize"), { autofill: true });
  md.use(require("markdown-it-kbd"));
  md.use(require("markdown-it-attrs"));
  md.use(require("markdown-it-fontawesome"));
  md.renderer.rules.emoji = function (token, idx) {
    return twemoji.parse(token[idx].content, {
      base: "https://twemoji.maxcdn.com/2/",
      ext: ".svg",
      folder: "svg",
    });
  };
}

async function loadPageExtraData($page, { editLinks }) {
  const {
    _filePath, // file's absolute path
    _computed, // access the client global computed mixins at build time, e.g _computed.$localePath.
    _content, // file's raw content string
    _strippedContent, // file's content string without frontmatter
    key, // page's unique hash key
    frontmatter, // page's frontmatter object
    regularPath, // current page's default link (follow the file hierarchy)
    path, // current page's real link (use regularPath when permalink does not exist)
  } = $page;
  if (typeof _filePath === "undefined") return;
  if (typeof _filePath !== "string" || !editLinks) return;

  const indexPath = relative(join(process.cwd(), config.source), _filePath);
  if (typeof index[indexPath] === "undefined") return;

  $page.editLink = index[indexPath].editLink;
}
