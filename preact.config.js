require('dotenv').config();
const path = require('path');
const { DefinePlugin } = require('webpack');

/**
 * Function that mutates original webpack config.
 * Supports asynchronous changes when promise is returned.
 *
 * @param {object} config - original webpack config.
 * @param {object} env - options passed to CLI.
 * @param {WebpackConfigHelpers} helpers - object with useful helpers when working with config.
 **/
export default function(config, env, helpers) {
  config.resolve.alias = Object.assign(config.resolve.alias, {
    '~': path.resolve(__dirname, 'src'),
  });

  config.plugins.push(
    new DefinePlugin({
      RADYS_API_URL: JSON.stringify(process.env.RADYS_API_URL),
    })
  );

  return config;
}
