import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

const apiProxy = {
  target: "http://127.0.0.1:8000",
  changeOrigin: true,
};

export default defineConfig({
  plugins: [react()],
  server: {
    host: "0.0.0.0",
    port: 3000,
    allowedHosts: ["quick-platform.cloudpub.ru, china.hochuvseznat.club"],
    proxy: {
      "/api": apiProxy,
    },
  },
  preview: {
    host: "0.0.0.0",
    port: 3000,
    allowedHosts: ["quick-platform.cloudpub.ru, china.hochuvseznat.club"],
    proxy: {
      "/api": apiProxy,
    },
  },
});
