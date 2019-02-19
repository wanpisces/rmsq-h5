"use strict";
// Template version: 1.3.1
// see http://vuejs-templates.github.io/webpack for documentation.

const path = require("path");

module.exports = {
    dev: {
        // Paths
        assetsSubDirectory: "static",
        assetsPublicPath: "/",
        proxyTable: {
            "/api": {
                target: "http://api.sqydt.easysq.cn",
                // target: "http://api.sqydt.darongshutech.com",
                changeOrigin: true,
                pathRewrite: {
                    "/api": ""
                }
            },
            "/newsApi": {
                target: "http://h5.sqydt.easysq.cn",
                changeOrigin: true,
                pathRewrite: {
                    "/newsApi": ""
                }
            },
            "/public": {
                target: "http://api.sqydt.easysq.cn/public",
                changeOrigin: true,
                pathRewrite: {
                    "/public": ""
                }
            },
            "/weixin": {
                target: "https://open.weixin.qq.com/connect/oauth2",
                changeOrigin: true,
                pathRewrite: {
                    "/weixin": ""
                }
            },
            "/bszn": {
                target: "https://api.sqydt.easysq.cn/bszn",
                changeOrigin: true,
                pathRewrite: {
                    "/bszn": ""
                }
            },
            "/zwgk": {
                target: "http://api.sqydt.easysq.cn/zwgk",
                // target: 'https://api.sqydt.darongshutech.com/zwgk',
                changeOrigin: true,
                pathRewrite: {
                    "/zwgk": ""
                }
            },
            "/ssp": {
                target: "http://api.sqydt.easysq.cn/ssp",
                // target: 'https://api.sqydt.darongshutech.com/zwgk',
                changeOrigin: true,
                pathRewrite: {
                    "/ssp": ""
                }
            },
            "/activity": {
                target: "http://api.sqydt.easysq.cn/activity",
                // target: 'https://api.sqydt.darongshutech.com/zwgk',
                changeOrigin: true,
                pathRewrite: {
                    "/activity": ""
                }
            }
        },

        // Various Dev Server settings
        host: "localhost", // can be overwritten by process.env.HOST
        port: 3000, // can be overwritten by process.env.PORT, if port is in use, a free one will be determined
        autoOpenBrowser: false,
        errorOverlay: true,
        notifyOnErrors: true,
        poll: false, // https://webpack.js.org/configuration/dev-server/#devserver-watchoptions-

        /**
         * Source Maps
         */

        // https://webpack.js.org/configuration/devtool/#development
        devtool: "cheap-module-eval-source-map",

        // If you have problems debugging vue-files in devtools,
        // set this to false - it *may* help
        // https://vue-loader.vuejs.org/en/options.html#cachebusting
        cacheBusting: true,

        cssSourceMap: true
    },

    build: {
        // Template for index.html
        index: path.resolve(__dirname, "../dist/index.html"),

        // Paths
        assetsRoot: path.resolve(__dirname, "../dist"),
        assetsSubDirectory: "static",
        assetsPublicPath: "/",

        /**
         * Source Maps
         */

        productionSourceMap: true,
        // https://webpack.js.org/configuration/devtool/#production
        devtool: "#source-map",

        // Gzip off by default as many popular static hosts such as
        // Surge or Netlify already gzip all static assets for you.
        // Before setting to `true`, make sure to:
        // npm install --save-dev compression-webpack-plugin
        productionGzip: false,
        productionGzipExtensions: ["js", "css"],

        // Run the build command with an extra argument to
        // View the bundle analyzer report after build finishes:
        // `npm run build --report`
        // Set to `true` or `false` to always turn it on or off
        bundleAnalyzerReport: process.env.npm_config_report
    }
};