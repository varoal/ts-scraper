import { defineConfig } from 'vite';
import viteTsConfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [viteTsConfigPaths()],
  server: {
    port: 4200,
    host: 'localhost',
  },
});
