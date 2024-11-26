import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/sb1-tpr97f/', // تحديد المسار الأساسي للمستودع
});
