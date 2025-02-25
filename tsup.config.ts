import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/logger.ts"],
  format: ["esm"],
  outDir: "logger",
  minify: true,
  dts: true,
  sourcemap: false,
  clean: true,
});
