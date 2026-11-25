import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';
import svgr from 'vite-plugin-svgr';

export default defineConfig({
  plugins: [
    react(),
    svgr(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['fav.webp'],
      workbox: {
        globPatterns: ['**/*.{html,css,js,png,svg}'],
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/rickandmortyapi\.com\/.*$/,
            handler: 'NetworkFirst',
            options: {
              cacheName: 'api-cache'
            }
          }
        ]
      },
      manifest: {
        name: 'Rick&Morty PWA App',
        short_name: 'R&M_PWA',
        description:
          'PWA приложение со списком персонажей вселенной Рика и Морти',
        theme_color: '#ffffff',
        background_color: '#ffffff',
        display: 'standalone',
        start_url: process.env.NODE_ENV === 'production' ? '/rim/' : '/',
        scope: process.env.NODE_ENV === 'production' ? '/rim/' : '/',
        orientation: 'portrait',
        lang: 'ru-RU',
        screenshots: [
          {
            src: 'screenshots/desktop.png',
            type: 'image/png',
            sizes: '1812x1132',
            form_factor: 'wide'
          },
          {
            src: 'screenshots/mobile.png',
            type: 'image/png',
            sizes: '357x735',
            form_factor: 'narrow'
          }
        ],
        icons: [
          {
            src: 'pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }
    })
  ],
  base: '/rim/',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  }
});
