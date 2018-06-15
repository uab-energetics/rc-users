import {AppEvent} from "../../core/events/AppEvent";

export const MEMBERS_REMOVED = 'rc-users.groups.member-removed'

export interface MembersRemoved {
    groupID: string
    members: string[]
}

export const membersRemoved = ({ groupID, members }): AppEvent<MembersRemoved> => ({
    type: MEMBERS_REMOVED,
    payload: { groupID, members }
})
