require('./bootstrap');

window.Vue = require('vue');

import VueRouter from 'vue-router'
import router from './routes'
import store from './store/index'
import jwtToken from "./helpers/jwt";
import App from "./components/App"
import './css/main.css'
import loading from './components/utils/loading'


/*
检查是否存在jwtToken，若存在添加headers:Authorization
以后请求自动带上该headers
 */
axios.interceptors.request.use(function (config) {
    if (jwtToken.getToken()) {
        config.headers['Authorization'] = 'Bearer ' + jwtToken.getToken();
    }
    return config;
}, function (error) {
    console.log(error.response.data);
});

Vue.use(VueRouter);
Vue.component('app',App);

Vue.use(loading);

new Vue({
    el: '#app',
    router,
    store,
});
