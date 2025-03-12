import {UserConfig} from "vite";
import * as path from "path";

import {buildPlugins} from "./plugins/buildPlugins";
import {devServerConfig} from "./server/devServerConfig";
import {BuildViteOptions} from "./types/types";

export function buildViteConfig(options: BuildViteOptions): UserConfig {
    const { mode, isDev } = options;

    console.log("BUILD OPTIONS: ", options);

    return {
        plugins: buildPlugins(),
        assetsInclude: ["*.ttf"],
        server: isDev ? devServerConfig : {
            port: 8080,
        },
        define: {
            __IS_DEV__: isDev,
            ...(mode === "development" ? { global: "window" } : {}),
        },
        resolve: {
            alias: {
                store: path.resolve(__dirname, "../../../src/store"),
                api: path.resolve(__dirname, '../../../src/api'),
                helpers: path.resolve(__dirname, "../../../src/helpers"),
                shared: path.resolve(__dirname, "../../../src/shared"),
                pages: path.resolve(__dirname, "../../../src/pages"),
            },
        },
        build: {
            sourcemap: isDev ? "inline" : undefined,
            outDir: "./build",
            modulePreload: false,
            rollupOptions: {
                treeshake: true,
                output: {
                    entryFileNames: `main.js`,
                    chunkFileNames: `[name].js`,
                    assetFileNames: `[name].[ext]`,
                },
            },
        },
    };
}