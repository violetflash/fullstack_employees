import * as path from 'path';
// import { defineConfig } from "vitest/config"
import { defineConfig, loadEnv } from 'vite'

import react from "@vitejs/plugin-react"

// https://vitejs.dev/config/

export default defineConfig(({ command, mode }) => {
  // Load env file based on `mode` in the current working directory.
  // Set the third parameter to '' to load all env regardless of the `VITE_` prefix.
  const env = loadEnv(mode, process.cwd())
  return {
    // vite config
    // define: {
    //   __APP_ENV__: env.APP_ENV,
    // },
    plugins: [react()],
    resolve: {
      alias: {
        '~': path.resolve(__dirname, './src')
      }
    },
    server: {
      open: true,
      port: Number(env.VITE_PORT)
    },
    build: {
      outDir: "build",
      sourcemap: true,
    },
    test: {
      globals: true,
      environment: "jsdom",
      setupFiles: "src/setupTests",
      mockReset: true,
    },
  }
})
