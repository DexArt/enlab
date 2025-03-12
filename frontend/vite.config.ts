import {ConfigEnv, defineConfig, UserConfig} from "vite";
import {buildViteConfig} from "./config/build/vite/buildViteConfig";
import {BuildViteMode} from "./config/build/vite/types/types";

export default defineConfig((config: ConfigEnv): UserConfig => {
  const isDev =
      (config.mode as BuildViteMode) === ("development" as BuildViteMode);
  const modeEnv =
      (config.mode as BuildViteMode) || ("development" as BuildViteMode);
  return buildViteConfig({ mode: modeEnv, isDev });
});