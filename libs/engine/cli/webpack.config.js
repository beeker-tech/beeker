const { composePlugins, withNx } = require('@nx/webpack');
const webpack = require('webpack');

// Nx plugins for webpack.
module.exports = composePlugins(withNx(), (config) => {
  config.plugins.push(new webpack.BannerPlugin({ banner: "#!/usr/bin/env node", raw: true }))

  return config;
});
