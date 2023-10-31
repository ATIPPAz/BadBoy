/**
 * main.ts
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Components
import App from './App.vue'

// Composables
import { createApp } from 'vue'

// Plugins
import { registerPlugins } from '@/plugins'

import './registerServiceWorker'

const app = createApp(App)

registerPlugins(app)

if ('serviceWorker' in navigator && process.env.NODE_ENV === 'production') {
    // Register the service worker
    navigator.serviceWorker
        .register('/service-worker.js')
        .then((registration) => {
            console.log(
                'Service Worker registered with scope:',
                registration.scope
            )
        })
        .catch((error) => {
            console.error('Service Worker registration failed:', error)
        })
}
app.mount('#app')
