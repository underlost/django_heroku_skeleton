/*jshint esversion: 6 */

import Vue from 'vue';
import VueRouter from 'vue-router';
import VueResource from 'vue-resource';

Vue.use(VueRouter);
Vue.use(VueResource);
Vue.use(require('vue-moment'));

// CSRF Stuff
function getCookie(name) {
    var cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = jQuery.trim(cookies[i]);
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

Vue.http.interceptors.push(function (request, next) {
    request.headers.set('X-CSRFToken', getCookie('csrftoken'));
    next();
});

// require a *.vue component
import App from '../../vue/app.vue';

// router
const routes = [
    { path: '/', component: Home, name: 'Home' },
    { path: '/404', component: NotFound, name: 'Error404' },
];
const router = new VueRouter({
    routes, // short for routes: routes
    mode: 'history',
    linkActiveClass: 'active',
    base: '/',
});

const app = new Vue({
    router,
    render: (h) => h(App)
}).$mount('#app');
