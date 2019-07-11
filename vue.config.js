const path = require("path");

function resolve(dir) {
  return path.join(__dirname, dir);
}

module.exports = {
  chainWebpack: config => {
    config.resolve.alias
      .set("@src", resolve("src"))
      .set("@css", resolve("src/assets/css"))
      .set("@images", resolve("src/assets/images"))
      .set("@components", resolve("src/components"))
      .set("@libs", resolve("src/libs"))
      .set("@mock", resolve("src/mock"))
      .set("@modules", resolve("src/modules"))
      .set("@pages", resolve("src/pages"))
      .set("@plugins", resolve("src/plugins"))
      .set("@views", resolve("src/views"))
      .set("@config", resolve("src/config"));
  }
};
