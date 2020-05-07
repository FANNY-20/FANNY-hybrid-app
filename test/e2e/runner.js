process.env.NODE_ENV = "testing";

const { resolve } = require("path");
const { Nuxt, Builder } = require("nuxt");
const spawn = require("cross-spawn");
const express = require("express");

async function exec() {
  let config = {};
  let server = null;

  try {
    const rootDir = resolve(__dirname, "../..");
    config = require(resolve(rootDir, "nuxt.config.js"));
  } catch (e) {
    console.error("Error while loading nuxt config file", e);
  }

  const nuxt = new Nuxt(config);
  await nuxt.ready();

  let opts = process.argv.slice(2);

  if (opts.indexOf("--no-build") === -1) {
    await new Builder(nuxt)
      .build();
  }

  if (opts.indexOf("--config") === -1) {
    opts = opts.concat(["--config", "nightwatch.config.js"]);
  }

  if (opts.indexOf("--env") === -1) {
    opts = opts.concat(["--env", "chrome"]);
  }

  const app = express();

  app.use(nuxt.render);
  server = app.listen(3001);

  const runner = spawn("./node_modules/.bin/nightwatch", opts, {
    stdio: "inherit",
  });

  runner.on("exit", () => {
    server.close();
    process.exit(0);
  });

  runner.on("error", () => {
    server.close();
    process.exit(0);
  });
}

exec();
