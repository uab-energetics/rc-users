import {AppEvent} from "../../core/events/AppEvent";

export const GROUP_REMOVED = 'rc-users.groups.removed'

export interface GroupRemoved {
    groupID: string
}

export const groupRemoved = ({ groupID }): AppEvent<GroupRemoved> => ({
    type: GROUP_REMOVED,
    payload: { groupID }
})