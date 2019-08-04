import Vue from "vue";
import Router from "vue-router";
import _concat from 'lodash/concat'
import _find from 'lodash/find'

import Home from "./views/Home.vue";
import Login from "./views/Login.vue";
import About from './views/About';

import AdminRoutes from './routes/admin_routes'

import store from './store';

Vue.use(Router);
let routes = [
    {
        path: "/",
        name: "Home ",
        component: Home,
    },
    {
        path: "/login",
        name: "Login",
        component: Login
    },
    {
        path: "/about",
        name: "About",
        component: About,
    }
]

// concat routes
routes = _concat(routes, AdminRoutes)

console.log(routes)
const $router = new Router({
    mode: "history",
    base: process.env.BASE_URL,
    routes
});

$router.beforeEach((to, from, next) => {
    if (to.fullPath != '/login' && !localStorage.loginToken) {
        next('/login')
        return;
    }

    if (to.meta.requireRole) {
       if (!store.getters.user.roles.includes(to.meta.role)) {
          next('/') 
       }
    }
    
    next();
})

export default $router;