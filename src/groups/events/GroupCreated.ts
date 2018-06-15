import {AppEvent} from "../../core/events/AppEvent";

export const GROUPS_CREATED = 'rc-users.groups.created'

export interface GroupsCreated {
    groups: {
        id: string,
        name: string
    }[]
}

export const groupsCreated = ({ groups }): AppEvent<GroupsCreated> => ({
    type: GROUPS_CREATED,
    payload: { groups }
})
