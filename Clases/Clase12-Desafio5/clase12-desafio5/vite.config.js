import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
      mimeTypes: {
      'text/javascript': ['jsx'] // Set the correct MIME type for .jsx files
    }
})

