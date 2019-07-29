import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import Login from "./views/Login.vue";
import About from './views/About';
import Events from './views/events/Events';
import Event from './views/events/Event';
import Participant from './views/participants/Participants'
import SetParticipants from './views/participants/SetParticipants'
import SetCriteria from './views/Criteria'
import Tally from './views/Tally'
import Settings from './views/Settings'

Vue.use(Router);

const $router = new Router({
    mode: "history",
    base: process.env.BASE_URL,
    routes: [
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
        {
            path: "/events",
            name: "Events",
            component: Events,
        },
        {
            path: "/event",
            name: "Event",
            component: Event,
        },
        {
            path: "/set-participants",
            name: "Set Participants",
            component: SetParticipants,
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
            beforeRouteEnter (to, from, next) {
                console.log(localStorage.event);
                // if (JSON.parse(localStorage.event)) {
                //     next('/events');
                // } else {
                //     next();
                // }
            }
        },
        {
            path: "/set-criteria",
            name: "Set Criteria",
            component: SetCriteria,
        },
        {
            path: "/settings",
            name: "Settings",
            component: Settings
        }
    ]
});

$router.beforeEach((to, from, next) => {
    if (to.fullPath != '/login' && !localStorage.loginToken) {
        next('/login')
        return;
    }
    
    // console.log(to, localStorage);
    if (to.fullPath == '/participants' && localStorage.event == '{}') {
        next('/events');
        return;
    }

    next();
})

export default $router;