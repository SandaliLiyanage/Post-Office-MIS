import { defineConfig } from 'cypress'

export default defineConfig({
  e2e: {
    baseUrl: 'http://152.42.182.120:3000',
    // baseUrl: 'http://localhost:5174',
  }
})