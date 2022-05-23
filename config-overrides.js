const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const FileManagerPlugin = require("filemanager-webpack-plugin");

// Adds a manifest file to the build according to the current context,
// and deletes files from the build that are not needed in the current context
const getFileManagerPlugin = () => {
  const extensionBuildFiles = ["index.html"];

  return new FileManagerPlugin({
    events: {
      onEnd: {
        // remove index.html which will have reference scripts of all [entry].js instead we will use ui.html from public folder to have our ui refernce to single main.js only
        delete: extensionBuildFiles.map((filename) => `build/${filename}`),
      },
    },
  });
};

module.exports = {
  webpack: function (config) {
    const environment = process.env.REACT_APP_ENVIRONMENT;

    // Disable bundle splitting,
    config.optimization.splitChunks = {
      cacheGroups: {
        default: false,
      },
    };
    // Code build files minimize - disable for dev
    config.optimization.minimize = environment === "dev" ? true : false;

    // `false`: each entry chunk embeds runtime.
    config.optimization.runtimeChunk = false;

    config.entry = {
      main: "./src/index.tsx",
      background: "./src/background/index.js",
      content: "./src/content/index.js",
    };

    // The `[name]` is taken from `config.entry` properties, so if we have `main` , 'content' and `background` as properties, we get 3 output files - main.js, content.js and background.js.
    config.output.filename = "[name].js";

    // `MiniCssExtractPlugin` is used by the default CRA webpack configuration for
    // extracting CSS into separate files. The plugin has to be removed because it
    // uses `[contenthash]` in filenames of the separate CSS files.
    config.plugins = config.plugins
      .filter((plugin) => !(plugin instanceof MiniCssExtractPlugin))
      .concat(
        // `MiniCssExtractPlugin` is used with its default config instead,
        // which doesn't contain `[contenthash]`.
        new MiniCssExtractPlugin(),
        getFileManagerPlugin()
      );

    return config;
  },
};
