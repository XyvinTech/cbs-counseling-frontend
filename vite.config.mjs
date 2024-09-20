import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import svgr from "@svgr/rollup";

export default defineConfig({
  plugins: [react(), svgr()],
  define: {
    global: {},
  },
  server: {
    proxy: {
      "/api": {
        target: "http://52.66.173.34:3000",
        changeOrigin: true,
        secure: false, // Note: This allows insecure connections
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
  build: {
    outDir: "dist",
  },
  resolve: {
    alias: {
      "./runtimeConfig": "./runtimeConfig.browser",
    },
  },
});
