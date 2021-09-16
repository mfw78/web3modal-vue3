import type { UserConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Banner from 'vite-plugin-banner'
import pkg from './package.json'
const path = require('path')

const resolvePath = (str: string) => path.resolve(__dirname, str)

const config: UserConfig = {
  resolve: {
    alias: [
      {
        find: '@',
        replacement: resolvePath('src'),
      },
    ],
  },
  plugins: [
    vue(),
    Banner(
      `/**
 * name: ${pkg.name}
 * version: v${pkg.version}
 * description: ${pkg.description}
 * author: ${pkg.author.name} <${pkg.author.email}>
 * homepage: ${pkg.homepage}
 */`)
  ],
  build: {
    lib: {
      entry: resolvePath('src/index.ts'),
      name: 'Web3Modal',
    },
    rollupOptions: {
      // make sure to externalize deps that shouldn't be bundled
      // into your library
      external: ['vue', 'ethers', 'web3'],
      output: {
        // Provide global variables to use in the UMD build
        // for externalized deps
        globals: {
          vue: 'Vue',
          ethers: 'Ethers',
          web3: 'Web3'
        },
      }
    },
  },
}

export default config