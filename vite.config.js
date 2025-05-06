import { defineConfig } from 'vite';
export default defineConfig({
    build: {
        rollupOptions: {
            input: {
                plugin: "src/plugin.ts"
            },
            output: {
                entryFileNames: "[name].js",
                dir: "dist"
            }
        }
    },
    preview: {
        port: 3000,
    },
});
