import {Route} from "../../core/routing/Route";
import {Group} from "../Group";

export const createGroupRoute = ({ dbConn }): Route => ({

    path: '/groups',

    method: 'post',

    mapper: req => req.body,

    controller: async ({ name }) => {
        return await dbConn.manager.create(Group, { name })
    }
})