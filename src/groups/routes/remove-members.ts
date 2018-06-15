import {Route} from "../../core/routing/Route";
import {Member} from "../Member";

export const removeMembersRoute = ({ dbConn }): Route => ({

    path: '/groups/:gid/members/remove',

    method: 'post',

    mapper: req => ({
        groupID: req.params.gid,
        memberIDs: req.body.memberIDs
    }),

    controller: async ({ groupID, memberIDs }) => {
        return await dbConn.manager.delete(Member, memberIDs)
    }
})