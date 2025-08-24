import { defineConfig } from 'vite';
// @ts-ignore
import path from 'path';

export default defineConfig({
    plugins: [],
    build: {
        minify: false,
        cssCodeSplit: false,
        rollupOptions: {
            input: {
                index: path.resolve(__dirname, 'src/index.ts'),
                embed: path.resolve(__dirname, 'src/embed.ts'),
            },
            output: {

                assetFileNames: (assetInfo) => {
                    if (assetInfo.name && assetInfo.name.endsWith('.css')) {
                        return '[name][extname]';
                    }
                    return '[name][extname]';
                },
                entryFileNames: '[name].js',
                dir: 'docs/assets/dist',
            },
        },
    },
});
