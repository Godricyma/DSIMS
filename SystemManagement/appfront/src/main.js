import { createApp } from 'vue'
// import ElementPlus from 'element-plus'
// import 'element-plus/lib/theme-chalk/index.css'
import App from './App.vue'
import router from './router'
import store from '@/store/index'

import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'
//import ElementUI from 'element-ui'
//import 'element-ui/lib/theme-chalk/index.css';
//import ElementUI from "element-ui";

const app = createApp(App)

// app.use(ElementPlus)
app.use(router)
app.use(store)
//app.use(ElementUI)

app.mount('#app')
