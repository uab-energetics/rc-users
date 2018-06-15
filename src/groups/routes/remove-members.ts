import {Route} from "../../core/routing/Route";
import {Member} from "../Member";
import {membersRemoved} from "../events/MembersRemoved";
import {Group} from "../Group";


export const removeMembersRoute = ({ dbConn, event }): Route => ({

    path: '/groups/:gid/members/remove',

    method: 'post',

    mapper: req => ({
        groupID: req.params.gid,
        emails: req.body.emails
    }),

    controller: async ({ groupID, emails }) => {
        return { msg: 'todo' }
        // event(membersRemoved({ groupID, members: emails }))
        // return {}
    }
})