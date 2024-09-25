import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react-swc";
import svgr from "@svgr/rollup";

// Use a function to load environment variables based on mode (development/production)
export default ({ mode }) => {
  // Load environment variables based on the mode (production/development)
  // eslint-disable-next-line no-undef
  const env = loadEnv(mode, process.cwd());

  return defineConfig({
    plugins: [react(), svgr()],
    define: {
      global: {},
    },
    server: {
      proxy: {
        "/api": {
          target: env.VITE_API_BASE_URL || "http://localhost:3300",
          changeOrigin: true,
          secure: false, // Allows insecure connections
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
};
