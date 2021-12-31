import Vue from 'vue';
import VueRouter from 'vue-router';
Vue.use(VueRouter);
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);


import App from './views/App'
import Hello from './views/Hello'
import Home from './views/Home'
const router = new VueRouter({
    mode: 'history',
    routes: [{
            path: '/',
            name: 'home',
            component: Home
        },
        {
            path: '/hello',
            name: 'hello',
            component: Hello,
        },
    ],
});
const app = new Vue({
    el: '#app',
    components: { App },
    router,
});