const path = require("path");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");

module.exports = {
  mode: "development",
  // entry: "./src/index.js",
  entry: "./src/index.ts",
  watch: true,
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "dist"),
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
      // {
      //   test: /\.js$/,
      //   exclude: (modulePath) =>
      //     /node_modules/.test(modulePath) && !/reduxjs/.test(modulePath),
      //   use: {
      //     loader: "babel-loader",
      //     options: {
      //       presets: [["@babel/preset-env", { modules: false }]],
      //       plugins: [
      //         "@babel/plugin-syntax-dynamic-import",
      //         "@babel/plugin-proposal-object-rest-spread",
      //         "@babel/plugin-proposal-class-properties",
      //         "@babel/plugin-transform-runtime",
      //       ],
      //       sourceType: "unambiguous",
      //     },
      //   },
      // },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
    modules: ["./src", "node_modules"],
    alias: {
      "@src": path.resolve(__dirname, "src"),
    },
  },
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        sourceMap: true, // set to true if you want JS source maps
      }),
    ],
  },
};
