import { createApp } from 'vue';
import Toast from 'vue-toastification';
import 'vue-toastification/dist/index.css';
import './assets/style.css';
import App from './App.vue';

// Create the Vue application instance
const app = createApp(App);
app.use(Toast);
app.mount('#app');
