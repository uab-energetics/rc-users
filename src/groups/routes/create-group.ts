import {Route} from "../../core/routing/Route";
import {Group} from "../Group";
import {groupsCreated} from "../events/GroupCreated";

export const createGroupRoute = ({ dbConn, event }): Route => ({

    path: '/groups',

    method: 'post',

    mapper: req => req.body,

    controller: async ({ groups }) => {
        let groupEntities: Group[] = groups.map( G => dbConn.manager.create(Group, G))
        await dbConn.manager.save(groupEntities)
        event(groupsCreated({ groups }))
        return groupEntities
    }
})