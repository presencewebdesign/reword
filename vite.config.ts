import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import tsConfigPaths from 'vite-tsconfig-paths';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());

  console.log('env.VITE_API_URL :>> ', env.VITE_API_URL);

  return {
    plugins: [react(), tsConfigPaths()],
    server: {
      host: '0.0.0.0',
      proxy: {
        '/api': {
          target: env.VITE_API_URL || '',
          changeOrigin: true,
          rewrite: path =>
            path.replace(mode !== 'production' ? /^\/api/ : '', ''),
        },
      },
    },
  };
});
