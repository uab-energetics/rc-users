import {Route} from "../../core/routing/Route";
import {Group} from "../Group";
import {groupRemoved} from "../events/GroupRemoved";

export const removeGroupRoute = ({ dbConn, event }): Route => ({

    path: '/groups/:id',

    method: 'delete',

    mapper: req => req.params.id,

    controller: async (groupID) => {
        await dbConn.manager.delete(Group, groupID)
        event(groupRemoved({ groupID }))
        return { msg: 'ok' }
    }
})