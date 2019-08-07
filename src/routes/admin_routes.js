import SetParticipants from '../views/participants/SetParticipants'
import SetCriteria from '../views/Criteria'
import Judges from '../views/Judges'
import SetJudges from '../views/events/SetJudges'

const META = {
    requireRole: true,
    role: 'admin'
}

const AdminRoutes = [
    {
        path: "/set-participants",
        name: "Set Participants",
        component: SetParticipants,
        meta: META
    },
    {
        path: "/set-criteria",
        name: "Set Criteria",
        component: SetCriteria,
        meta: META
    },
    {
        path: "/judges",
        name: "Judges",
        component: Judges,
        meta: META
    },
    {
        path: "/set-judges",
        name: "Set Judges",
        component: SetJudges,
        meta: META
    }
]

export default AdminRoutes