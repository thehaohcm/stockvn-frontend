import { createApp } from 'vue'
import App from './App.vue'
import router from './router' // Import the router
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import Notifications from '@kyvg/vue3-notification'

async function loadConfig() {
    const res = await fetch('/config.json');
    const config = await res.json();
    window.__APP_CONFIG__ = config;
}

loadConfig().then(() => {
    const app = createApp(App);
    app.config.globalProperties.$apiUrl = window.__APP_CONFIG__.apiUrl; // Make apiUrl globally available
    app.use(router); // Use the router
    app.use(Notifications);
    app.mount('#app');
}).catch(error => {
    console.error('Error loading configuration:', error);
    // Optionally display an error message to the user or handle the error
});
