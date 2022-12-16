import { createApp } from 'vue'
import store from '@/stores/pkmnStore' // short for @/store/index
import App from '@/App'
import vuetify from './plugins/vuetify'
import { loadFonts } from './plugins/webfontloader'
import Grade from 'grade-js'

loadFonts('Montserrat', 'Raleway')

window.Grade = Grade

const app = createApp(App).use(store);

app.use(store)
app.use(vuetify)

app.mount('#app')

