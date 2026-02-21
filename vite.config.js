import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";
import { VitePWA } from "vite-plugin-pwa";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 5173,
  },
  plugins: [
    react(),
    svgr({
      exportAs: "ReactComponent",
    }),
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: [
        "**/*.{png,jpg,jpeg,gif,webp,svg,ico}", // Cache all images
        "**/*.{woff,woff2,ttf,eot}", // Cache all fonts
        "**/*.{js,css,html}" // Cache other static assets
      ],
      workbox: {
        globPatterns: ["**/*.{js,css,html,ico,png,jpg,jpeg,svg,webp,woff,woff2,ttf,eot}"],
        maximumFileSizeToCacheInBytes: 10000000, // 7 MB
        runtimeCaching: [
          {
            // CACHE STRATEGY 1: Images (CacheFirst - 30 days)
            urlPattern: /\.(?:png|jpg|jpeg|svg|gif|webp|ico)$/i,
            handler: "CacheFirst",
            options: {
              cacheName: "images-cache",
              expiration: {
                maxEntries: 100,
                maxAgeSeconds: 60 * 60 * 24 * 30, // 30 days
              },
              cacheableResponse: {
                statuses: [0, 200],
              },
            },
          },
          {
            // CACHE STRATEGY 2: Fonts (CacheFirst - 1 year)
            urlPattern: /\.(?:woff|woff2|ttf|eot)$/i,
            handler: "CacheFirst",
            options: {
              cacheName: "fonts-cache",
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 60 * 60 * 24 * 365, // 1 year
              },
              cacheableResponse: {
                statuses: [0, 200],
              },
            },
          },
          {
            // CACHE STRATEGY 3: SVGR components (CacheFirst)
            urlPattern: /\/src\/assets\/.*\.svg$/i,
            handler: "CacheFirst",
            options: {
              cacheName: "svgr-cache",
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 60 * 60 * 24 * 30, // 30 days
              },
            },
          },
          {
            // CACHE STRATEGY 4: CDN/External images (StaleWhileRevalidate)
            urlPattern: /^https:\/\/.*\.(?:png|jpg|jpeg|gif|webp)$/i,
            handler: "StaleWhileRevalidate",
            options: {
              cacheName: "external-images-cache",
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 60 * 60 * 24 * 7, // 7 days
              },
              cacheableResponse: {
                statuses: [0, 200],
              },
            },
          },
        ],
        navigateFallback: "/index.html",
        cleanupOutdatedCaches: true,
        sourcemap: false,
      },
      manifest: {
        name: "dimpified-frontend-new",
        short_name: "Dimpified",
        description: "Dimpified",
        theme_color: "#ffffff",
        background_color: "#ffffff",
        display: "standalone",
        scope: "/",
        start_url: "/",
        icons: [
          {
            src: "/icons/icon-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "/icons/icon-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
          {
            src: "/icons/icon-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any maskable",
          },
        ],
      },
    }),
  ],
  optimizeDeps: {
    include: ["react-apexcharts", "apexcharts"],
  },
});