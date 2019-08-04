import Events from '../views/events/Events';
import Event from '../views/events/Event';
import Participant from '../views/participants/Participants'
import SetParticipants from '../views/participants/SetParticipants'
import SetCriteria from '../views/Criteria'
import Tally from '../views/Tally'
import Settings from '../views/Settings'

const META = {
    requireRole: true,
    role: 'admin'
}

const AdminRoutes = [
    {
        path: '/admin',
        name: 'Admin',
        component: Events,
        children: [
            {
                path: "events",
                name: "Events",
                component: Events,
                meta: META
            },
            {
                path: "/event",
                name: "Event",
                component: Event,
                meta: META
            },
            {
                path: "/set-participants",
                name: "Set Participants",
                component: SetParticipants,
                meta: META
            },
            {
                path: "/participants",
                name: "Participants",
                component: Participant,
                meta: META
            },
            {
                path: "/participants/:id/tally",
                name: "Tally",
                component: Tally,
                meta: META,
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
    }
]

export default AdminRoutes