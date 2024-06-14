import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from 'tailwindcss'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  css:{
    postcss:{
      plugin:[tailwindcss()]
    },
  },
  server: {
    
    port: 3000,
     
    cors:true,
    
    proxy: {
      "/api":{
        
        target: "http://127.0.0.1:5000",
        changeOrigin:true,
        secure: false,
        rewrite: (path)=>path.replace(/^\/api/,"")
      }
    }
  }
})
