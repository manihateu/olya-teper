/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        turbo: {
            resolveAlias: {
                canvas: "./empty-module.js"
            }
        },
        esmExternals: "loose",
    },
};

export default nextConfig;
