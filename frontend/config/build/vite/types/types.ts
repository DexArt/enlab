export type BuildViteMode = "production" | "development";

export interface BuildViteOptions {
    mode: BuildViteMode;
    isDev: boolean;
}