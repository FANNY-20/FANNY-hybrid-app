const SELENIUM_HOST = "localhost";
const SELENIUM_PORT = 4444;

module.exports = {
  src_folders: ["test/e2e/specs"],
  output_folder: "test/e2e/reports",
  page_objects_path: ["test/e2e/page-objects"],
  live_output: false,
  selenium: {
    start_process: true,
    server_path: require("selenium-server-standalone-jar").path,
    host: SELENIUM_HOST,
    port: SELENIUM_PORT,
    cli_args: {
      "webdriver.chrome.driver": require("chromedriver").path,
      "webdriver.gecko.driver": require("geckodriver").path,
    },
  },
  test_settings: {
    default: {
      desiredCapabilities: {
        browserName: "chrome",
      },
      launch_url: "http://localhost:3001",
      selenium_host: SELENIUM_HOST,
      selenium_port: SELENIUM_PORT,
      silent: true,
      screenshots: {
        enabled: false,
        on_failure: true,
        on_error: false,
        path: "test/e2e/screenshots",
      },
    },
    chrome: {
      desiredCapabilities: {
        browserName: "chrome",
        javascriptEnabled: true,
        acceptSslCerts: true,
        chromeOptions: {
          w3c: false, /** @see https://github.com/nightwatchjs/nightwatch/releases/tag/v1.1.12 */
        },
      },
    },
    firefox: {
      desiredCapabilities: {
        browserName: "firefox",
        javascriptEnabled: true,
        acceptSslCerts: true,
      },
    },
    "chrome-headless": {
      desiredCapabilities: {
        browserName: "chrome",
        javascriptEnabled: true,
        acceptSslCerts: true,
        chromeOptions: {
          w3c: false, /** @see https://github.com/nightwatchjs/nightwatch/releases/tag/v1.1.12 */
          args: ["--headless"],
        },
      },
    },
    "firefox-headless": {
      desiredCapabilities: {
        browserName: "firefox",
        javascriptEnabled: true,
        acceptSslCerts: true,
        "moz:firefoxOptions": {
          args: ["--headless"],
        },
      },
    },
  },
};
