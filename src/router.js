import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import Login from "./views/Login.vue";
import About from './views/About';
import Events from './views/events/Events';

import AdminRoutes from "./routes/admin_routes";
import Participant from './views/participants/Participants'
import Tally from './views/Tally'
import Event from './views/events/Event';
import Leaderboard from './views/leaderboard/Leaderboard'
import Reports from './views/Reports'

import  _concat  from 'lodash/concat';
import AuthService from './services/AuthService';

import store from './store'

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
        path: "/events",
        name: "Events",
        component: Events
    },
    {
        path: "/event",
        name: "Event",
        component: Event,
        
    },
    {
        path: "/participants",
        name: "Participants",
        component: Participant,
        
    },
    {
        path: "/participants/:id/tally",
        name: "Tally",
        component: Tally,
        
    },
    {
        path: '/leaderboard',
        name: "Leaderboard",
        component: Leaderboard
    },
    {
        path: '/reports',
        name: "Reports",
        component: Reports
    }
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

    if(to.name === 'Leaderboard' && ! store.getters.event.id){
        next('/events')
    }

    if (to.meta.requireRole) {
        AuthService.validateRoute(to, isAuthorized => {
            next(isAuthorized)
        })    
    } else {
        next()
    }
})

export default $router;