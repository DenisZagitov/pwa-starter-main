import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  base: "/pwa-starter-main/", // Change this to your repo name for GitHub Pages
  build: {
    sourcemap: true,
    assetsDir: "code",
    target: ["esnext"],
    cssMinify: true,
    lib: false
  },
  plugins: [
    VitePWA({
      strategies: "injectManifest",
      injectManifest: {
        swSrc: 'public/sw.js',
        swDest: 'dist/sw.js',
        globDirectory: 'dist',
        globPatterns: [
          '**/*.{html,js,css,json,png}',
        ],
      },
      injectRegister: false,
      manifest: {
        name: 'Wealth Push',
        short_name: 'WealthPush',
        description: 'PWA для отправки уведомлений и отслеживания аффирмаций',
        start_url: '/pwa-starter-main/', // Start URL for GitHub Pages
        display: 'standalone',
        background_color: '#E1477E',
        theme_color: '#E1477E',
        icons: [
          {
            src: 'assets/icons/192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'assets/icons/512x512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      },
      devOptions: {
        enabled: true
      }
    })
  ]
})