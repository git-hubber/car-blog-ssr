const autoprefixer = require("autoprefixer");
const webpack = require("webpack");
const CaseSensitivePathsPlugin = require("case-sensitive-paths-webpack-plugin");
const LodashModuleReplacementPlugin = require("lodash-webpack-plugin");
const { ReactLoadablePlugin } = require("react-loadable/webpack");
const ErrorOverlayPlugin = require("error-overlay-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const ManifestPlugin = require("webpack-manifest-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");

const { getAppEnv: getAppEnv2 } = require("./env");
const path = require("path");

const env = getAppEnv2();
const { PUBLIC_URL = "" } = env.raw;

const resolvePath = (relativePath: string) =>
  path.resolve(__dirname, relativePath);

/**
 * This function generates a webpack config object for the client-side bundle.
 */
export default (envType: any) => {
  const IS_DEV = envType === "development";
  const IS_PROD = envType === "production";
  const config: any = {};

  config.mode = envType;

  config.devtool = IS_DEV ? "cheap-module-source-map" : "source-map";

  config.entry = IS_DEV
    ? [
        "webpack-hot-middleware/client?path=/__webpack_hmr&reload=true",
        resolvePath("../src/index.tsx")
      ]
    : {
        polyfills: resolvePath("../src/polyfills.js"),
        main: resolvePath("../src/index.tsx")
      };

  config.output = IS_DEV
    ? {
        path: resolvePath("../build"),
        filename: "[name].bundle.js",
        chunkFilename: "[name].chunk.js",
        publicPath: PUBLIC_URL + "/"
      }
    : {
        path: resolvePath("../build"),
        filename: "static/js/[name].[chunkhash:8].js",
        chunkFilename: "static/js/[name].[chunkhash:8].chunk.js",
        publicPath: PUBLIC_URL + "/"
      };

  config.resolve = {
    extensions: [".tsx", ".ts", ".js", ".jsx"]
  };

  config.module = {
    rules: [
      // TS
      {
        test: /\.ts(x?)$/,
        include: resolvePath("../src"),
        loader: "babel-loader",
        options: {
          cacheDirectory: IS_DEV,
          compact: IS_PROD
        }
      },
      {
        test: /\.(jpg|jpeg|png|gif)$/,
        use: {
          loader: "file-loader",
          options: {
            // limit: 2000, // if 2kb, reference file by url else base64 inline file.
            name: "[name].[ext]",
            outputPath: resolvePath("./images")
          }
        }
      }
    ].filter(Boolean)
  };

  config.optimization = IS_DEV
    ? {
        // splitChunks: {
        //   cacheGroups: {
        //     commons: {
        //       test: /[\\/]node_modules[\\/]/,
        //       name: "vendors",
        //       chunks: "all"
        //     }
        //   }
        // }
      }
    : {
        minimizer: [new OptimizeCSSAssetsPlugin({})]
      };

  config.plugins = [
    new webpack.DefinePlugin(env.forWebpackDefinePlugin),
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    new LodashModuleReplacementPlugin(),
    IS_DEV && new webpack.HotModuleReplacementPlugin(),
    IS_DEV && new CaseSensitivePathsPlugin(),
    IS_DEV && new ErrorOverlayPlugin(),
    IS_PROD &&
      new MiniCssExtractPlugin({
        filename: "static/css/[name].[contenthash:8].css"
      }),
    IS_PROD &&
      new ManifestPlugin({
        fileName: "asset-manifest.json"
      }),
    new ReactLoadablePlugin({
      filename: "build/react-loadable.json"
    })
  ].filter(Boolean);

  config.node = {
    dgram: "empty",
    fs: "empty",
    net: "empty",
    tls: "empty"
  };

  return config;
};
