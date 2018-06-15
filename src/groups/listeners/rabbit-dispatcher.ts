import {GROUPS_CREATED} from "../events/GroupCreated"
import {GROUP_REMOVED} from "../events/GroupRemoved"
import {MEMBERS_ADDED} from "../events/MembersAdded"
import {MEMBERS_REMOVED} from "../events/MembersRemoved"

export const registerRabbitDispatcherListeners = ({ eventEmitter }) => {

    eventEmitter.on(GROUPS_CREATED, console.log)
    eventEmitter.on(GROUP_REMOVED, console.log)
    eventEmitter.on(MEMBERS_ADDED, console.log)
    eventEmitter.on(MEMBERS_REMOVED, console.log)

}
