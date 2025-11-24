import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const repoName = 'taskLite'

export default defineConfig({
plugins: [react()],
base: `/${repoName}/`,
})