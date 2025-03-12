import { defineConfig } from '@kubb/core'
import {pluginClient} from "@kubb/plugin-client";
import {pluginTs} from "@kubb/plugin-ts";
import {pluginOas} from "@kubb/plugin-oas";

export default defineConfig(() => {
    return {
        root: '.',
        input: {
            path: './target/api-list.json',
        },
        output: {
            path: './src/api',
            clean: true
        },
        plugins: [
            pluginOas({
                validate: false
            }),
            pluginTs(
                {
                    output: {
                        path: 'models',
                    },
                },
            ),
            pluginClient(
                {
                    output: {
                        path: './axiosQuery',
                        barrelType: 'named',
                    },
                    baseURL: 'http://localhost:8443',
                }
            ),
        ],
    }
})