import { resolve } from "path";
import { defineConfig } from "vite";

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        login: resolve(__dirname, "auth", "login.html"),
        register: resolve(__dirname, "auth", "register.html"),
        profile: resolve(__dirname, "auth", "profile.html"),
      },
    },
  },
});
