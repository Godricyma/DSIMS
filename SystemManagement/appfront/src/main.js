import { createApp } from 'vue'
// import ElementPlus from 'element-plus'
// import 'element-plus/lib/theme-chalk/index.css'
import App from './App.vue'
import router from './router'
//import ElementUI from 'element-ui'
//import 'element-ui/lib/theme-chalk/index.css';
//import ElementUI from "element-ui";

const app = createApp(App)

// app.use(ElementPlus)
app.use(router)
//app.use(ElementUI)

app.mount('#app')
