import { createApp } from 'vue'
import store from '@/stores/pkmnStore' // short for @/store/index
import App from '@/App'

const app = createApp(App);

app.use(store)

app.mount('#app')
