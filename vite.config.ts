
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    mode === 'development' &&
    componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    // Optimize bundle splitting
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          supabase: ['@supabase/supabase-js'],
          ui: ['@radix-ui/react-dialog', '@radix-ui/react-progress', '@radix-ui/react-toast'],
          utils: ['class-variance-authority', 'clsx', 'tailwind-merge']
        }
      }
    },
    // Use esbuild for minification (faster than terser and included with Vite)
    minify: 'esbuild',
    // Optimize chunk size
    chunkSizeWarningLimit: 500,
    // Enable source maps in development
    sourcemap: mode === 'development'
  },
  // Enable tree shaking
  optimizeDeps: {
    include: ['react', 'react-dom', '@supabase/supabase-js'],
    exclude: ['lucide-react']
  }
}));
