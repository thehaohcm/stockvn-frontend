import { createApp } from 'vue'
import App from './App.vue'
import router from './router' // Import the router
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import Notifications from '@kyvg/vue3-notification'

const app = createApp(App);
// Use window.env if available, otherwise fallback to process.env
app.config.globalProperties.$apiUrl = window.env?.VUE_APP_API_URL || process.env.VUE_APP_API_URL;
app.use(router); // Use the router
app.use(Notifications);
app.mount('#app');
