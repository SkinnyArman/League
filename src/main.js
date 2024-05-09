import { createApp } from 'vue';
import { router } from './router'
import App from './App.vue';
import './index.css'

const app = createApp(App);

app.use(router)
console.log(router.options.routes)
app.mount('#app');