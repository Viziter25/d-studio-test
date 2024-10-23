const path = require("path");

const nextConfig = {
    webpack(config) {
        config.resolve.alias["@"] = path.join(__dirname, "src");
        config.module.rules.push({
            test: /\.svg$/,
            use: ["@svgr/webpack"],
        });
        config.resolve.fallback = {
            ...config.resolve.fallback,

            fs: false, // the solution
        };
        return config;
    },
    reactStrictMode: true,
    images: {
        unoptimized: true,
    },
    sassOptions: {
        includePaths: [path.join(__dirname, "styles")],
        prependData: `@import "src/assets/styles/services.scss";`,
    },
};
module.exports = nextConfig;