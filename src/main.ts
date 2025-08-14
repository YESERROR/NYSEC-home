import { createApp } from 'vue'
import App from './App.vue'
import './styles.css'
import router from './router'
import { createTerminal } from 'vue-web-terminal'
createApp(App).use(router).use(createTerminal()).mount('#app')
