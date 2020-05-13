if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const colors = require("vuetify/lib/util/colors").default;
module.exports = {
  mode: "spa",
  env: {
    BASE_URL: process.env.BASE_URL,
    API_HOST: process.env.API_HOST,
    AUTHORIZATION_TOKEN: process.env.AUTHORIZATION_TOKEN,
    PEER_SERVER_HOST: process.env.PEER_SERVER_HOST || "0.peerjs.com",
    PEER_SERVER_PORT: process.env.PEER_SERVER_PORT ? JSON.parse(process.env.PEER_SERVER_PORT) : 443,
    PEER_SERVER_KEY: process.env.PEER_SERVER_KEY || "peerjs",
  },
  loading: { color: colors.blue.base },
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
    "@/plugins/axios",
    "@/plugins/svg-img",
    "@/plugins/joi",
    "@/plugins/geolocation.client",
    "@/plugins/vuetify-toast.client",
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
