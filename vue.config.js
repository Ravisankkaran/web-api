const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true
})
const webpack = require('webpack');

module.exports = {
  configureWebpack: {
    resolve: {
      fallback: {
        "http": require.resolve("stream-http"),
        "https": require.resolve("https-browserify"),
        "stream": require.resolve("stream-browserify"),
        "assert": require.resolve("assert"),
        "url": require.resolve("url"),
        "zlib": require.resolve("browserify-zlib"),
        "util": require.resolve("util")
      }
    },
    plugins: [
      new webpack.ProvidePlugin({
        process: 'process/browser',
        Buffer: ['buffer', 'Buffer']
      })
    ]
  }
};
