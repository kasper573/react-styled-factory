import * as path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { recipeClassName } from "./test/fixtures";
import { vanillaExtractPlugin } from "@vanilla-extract/vite-plugin";

export default defineConfig({
  plugins: [
    react(),
    vanillaExtractPlugin({
      // When a debugId is missing it's not technically always a recipe, but in our test suite it is.
      // This is a bit of a hack to be able to somewhat gracefully test recipe outputs.
      identifiers: ({ debugId }) => debugId ?? recipeClassName,
    }),
  ],
  test: {
    environment: "jsdom",
    globals: false,
    include: ["**/test/**/*.test.{js,jsx,ts,tsx}"],
    typecheck: {
      tsconfig: path.resolve(__dirname, "test/tsconfig.json"),
    },
  },
});
