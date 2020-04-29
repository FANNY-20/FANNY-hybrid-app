if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

import colors from "vuetify/lib/util/colors";

module.exports = {
  mode: "spa",
  env: {
    BASE_URL: process.env.BASE_URL,
    API_HOST: process.env.API_HOST,
  },
  loading: {
    color: colors.blue.base,
  },
  build: {
    extend(config, { isDev, isClient }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: "pre",
          test: /\.(js|vue)$/,
          loader: "eslint-loader",
          exclude: /(node_modules)/,
          options: { formatter: require("eslint-friendly-formatter") },
        });
      }
      config.node = {
        net: "empty",
        tls: "empty",
        dns: "empty",
      };
      config.performance.maxAssetSize = 350000;
      config.module.rules.push({
        test: /\.svgi$/,
        use: ["html-loader"],
      });
    },
    loaders: { vue: { transformAssetUrls: { "svg-img": "src" } } },
    babel: { plugins: ["@babel/plugin-proposal-export-default-from"] },
    postcss: require("./config/build/postcss"),
    transpile: [],
    publicPath: "/nuxt/",
  },
  watch: ["@/config/**/*.js"],
  buildModules: ["@nuxtjs/vuetify"],
  modules: [
    "@nuxtjs/style-resources",
    [
      "@nuxtjs/dotenv",
      require("./config/dotenv"),
    ],
    "@nuxtjs/axios",
  ],
  plugins: [
    "@/plugins/svg-img",
    "@/plugins/joi",
  ],
  css: [
    "@/assets/styles/bases/index.scss",
    "@/assets/styles/vendors/index.scss",
  ],
  head: require("./config/head"),
  styleResources: require("./config/style-resources"),
  router: require("./config/router"),
  vuetify: require("./config/vuetify"),
  axios: require("./config/axios"),
};
