import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import Login from "./views/Login.vue";
import About from './views/About';
import AdminRoutes from "./routes/admin_routes";

import  _concat  from 'lodash/concat';
import AuthService from './services/AuthService';

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
    },
]

routes = _concat(routes, AdminRoutes)

const $router = new Router({
    mode: "history",
    base: process.env.BASE_URL,
    routes: routes 
});

$router.beforeEach((to, from, next) => {
    if (to.fullPath != '/login' && !localStorage.loginToken) {
        next('/login')
        return;
    }

    if (to.meta.requireRole) {
        AuthService.validateRoute(to, isAuthorized => {
            next(isAuthorized)
        })    
    } else {
        next()
    }
   
    
    // next();
})

export default $router;