import './assets/main.css'

import App from './App.vue'
import { ViteSSG } from 'vite-ssg'

export const createApp = ViteSSG(App, {})
