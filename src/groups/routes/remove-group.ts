import {Route} from "../../core/routing/Route";
import {Group} from "../Group";

export const removeGroupRoute = ({ dbConn }): Route => ({

    path: '/groups/:id',

    method: 'delete',

    mapper: req => req.params.id,

    controller: async (groupID) => {
        return await dbConn.manager.delete(Group, groupID)
    }
})