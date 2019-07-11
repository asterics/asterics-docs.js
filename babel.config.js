module.exports = api => {
  api.cache(true);

  const presets = [
    [
      "@babel/env",
      {
        targets: "maintained node versions",
        debug: true
      }
    ],
    "@babel/typescript"
  ];
  const plugins = ["@babel/proposal-class-properties", "@babel/proposal-object-rest-spread"];

  return {
    presets,
    plugins
  };
};
