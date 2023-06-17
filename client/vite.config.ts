// import * as dns from 'dns';
import * as path from 'path';
import { defineConfig, loadEnv } from 'vite'
import liveReload from 'vite-plugin-live-reload'

// dns.setDefaultResultOrder('verbatim')

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
    plugins: [react({
      include: "**/*.tsx",
    }), liveReload('**/*.tsx')],
    resolve: {
      alias: {
        '~': path.resolve(__dirname, './src')
      }
    },
    server: {
      open: true,
      port: Number(env.VITE_PORT),
      // host: 'localhost',
      // hmr: {
      //   host: 'localhost'
      // },
      // watch: {
      //   usePolling: true,
      // }
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
