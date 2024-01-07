// vite.config.ts
import { defineConfig } from "vite";

import typescript from "@rollup/plugin-typescript";
import path from "path";

export default defineConfig({
	plugins: [],
	resolve: {
		alias: [
			{
				find: "~",
				replacement: path.resolve(__dirname, "./src"),
			},
		],
	},
	server: {
		port: 3000,
	},
	build: {
		manifest: true,
		minify: true,
		reportCompressedSize: true,
		lib: {
			entry: path.resolve(__dirname, "src/entry.ts"),
			fileName: "entry",
			formats: ["es", "cjs"],
		},
		rollupOptions: {
			external: [],
			plugins: [typescript],
		},
	},
});
