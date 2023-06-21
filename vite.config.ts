import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import viteTsconfigPaths from 'vite-tsconfig-paths';
import svgrPlugin from 'vite-plugin-svgr';

import path from "node:path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), viteTsconfigPaths(), svgrPlugin()],
  build: {
    outDir: "build",
  },
  base: "",
  server: {
    watch: {
      usePolling: true
    },
    open: true,
    host: true, // Need for docker container port mapping
    strictPort: true,
    port: 3173
  },
  preview: {
    port: 3173
  }
});
