import {AppEvent} from "../../core/events/AppEvent";

export const MEMBERS_ADDED = 'rc-users.groups.members-added'

export interface MembersAdded {
    groupID: string
    members: string[]
}

export const membersAdded = ({ groupID, members }): AppEvent<MembersAdded> => ({
    type: MEMBERS_ADDED,
    payload: { groupID, members }
})