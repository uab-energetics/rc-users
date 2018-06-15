import {Route} from "../../core/routing/Route";
import {Member} from "../Member";
import {Group} from "../Group";
import {membersAdded} from "../events/MembersAdded";

export const addMemberRoute = ({ dbConn, event }): Route => ({
    path: '/groups/:id/members',
    method: 'post',
    mapper: req => ({ gid: req.params.id, emails: req.body.emails }),
    controller: async ({ gid, emails }) => {
        let members = emails.map( E => dbConn.manager.create(Member, { email: E }))
        await dbConn.manager.save(members)

        await dbConn.createQueryBuilder()
            .relation(Group, 'members')
            .of(gid)
            .add(members)

        event(membersAdded({ groupID: gid, members: emails }))
        return await dbConn.manager.findOneOrFail(Group, gid, {relations: ['members']})
    }
})

