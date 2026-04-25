import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'

// Math Components
import M from './components/math/M.vue'
import Vec from './components/math/Vec.vue'
import Eq from './components/math/Eq.vue'
import Mat from './components/math/Mat.vue'

const app = createApp(App)

app.component('M', M)
app.component('Vec', Vec)
app.component('Eq', Eq)
app.component('Mat', Mat)

app.use(router)
app.mount('#app')
