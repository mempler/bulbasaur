/** @type {import('vite').UserConfig} */
export default {
    build: {
        outDir: 'out',
        sourcemap: true,
        lib: {
            entry: "./src/extension.ts",
            formats: ["cjs"],
            fileName: "extension",
        },
        rollupOptions: {
            external: ["vscode"],
        },
    }
};
