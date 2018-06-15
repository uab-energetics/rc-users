import {Route} from "../../core/routing/Route";
import {Group} from "../Group";

export const listMembersRoute = ({ dbConn }): Route => ({

    path: '/groups/:gid/members',

    method: 'get',

    mapper: req => req.params.gid,

    controller: async (group_id) => {
        let group: Group = await dbConn.manager
            .findOneOrFail(Group, group_id, { relations: ['members']})
        return { members: group.members }
    }
})