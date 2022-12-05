import {createApp} from 'vue'
import App from './App.vue'
import "./assets/style/iconfont.css";
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import router from './router/index'
import store from './store/index'
import './permission'
// import 'animate.css'
// import { setupStore } from "./store";


const app = createApp(App)
// app.config.globalProperties.http = $http;
app.use(ElementPlus)
app.use(router)
app.use(store)
// setupStore(app);
app.mount('#app')
