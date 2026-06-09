/*eslint-env node*/
/** @type {import('next').NextConfig} */

module.exports = {
  webpack: (config, { isServer }) => {
    // Fixes npm packages that depend on `fs` module
    if (!isServer) {
      config.resolve.fallback.fs = false;
    }

    // Add markdown file handling (asset/source is built into webpack 5)
    config.module.rules.push({
      test: /\.md$/,
      type: "asset/source",
    });

    return config;
  },
  output: "export",
};
