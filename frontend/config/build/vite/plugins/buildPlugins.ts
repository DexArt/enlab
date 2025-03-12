import {Plugin, PluginOption} from "vite";
import react from "@vitejs/plugin-react";

export function buildPlugins(): (Plugin | Plugin[] | Promise<Plugin | Plugin[]> | PluginOption[])[] {
    return [
        react(),
    ];
}