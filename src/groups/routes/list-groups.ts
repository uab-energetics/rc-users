import {Route} from "../../core/routing/Route";
import {Group} from "../Group";

export const listGroupsRoute = ({ dbConn }): Route => ({

    path: '/projects/:pid/groups',

    method: 'get',

    mapper: req => ({projectID: req.params.pid}),

    controller: async ({ projectID }) => {
        return await dbConn.manager.find(Group, { projectID })
    }
})