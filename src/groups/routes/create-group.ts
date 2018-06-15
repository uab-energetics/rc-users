import {Route} from "../../core/routing/Route";
import {Group} from "../Group";

export const createGroupRoute = ({ dbConn }): Route => ({

    path: '/groups',

    method: 'post',

    mapper: req => req.body,

    controller: async ({ groups }) => {
        let groupEntities: Group[] = groups.map( G => dbConn.manager.create(Group, G))
        await dbConn.manager.save(groupEntities)
        return groupEntities
    }
})