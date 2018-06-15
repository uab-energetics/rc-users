import express from 'express'
import bodyParser from 'body-parser'
import morgan from 'morgan'
import * as dotenv from 'dotenv'
import cors from 'cors'
import {getConfigHelper} from "./core/config/config"
import {getConfig} from "./_config"
import {connectToRabbitMQ} from "./core/messaging/connect"
import {httpErrorHandler} from "./core/errors/httpErrorHandler"
import {connectToDB} from "./core/database/mysql/connect"
import {useRoute} from "./core/routing/route-builder"
import {RouteNotFound} from "./core/errors/RouteNotFound"
import {getEventHelper} from "./core/events/event"
import {createGroupRoute} from "./groups/routes/create-group";
import {addMemberRoute} from "./groups/routes/add-members";
import {listMembersRoute} from "./groups/routes/list-members";
import {listGroupsRoute} from "./groups/routes/list-groups";
import {removeGroupRoute} from "./groups/routes/remove-group";
import {removeMembersRoute} from "./groups/routes/remove-members";

/**
 * COMPOSITION ROOT
 * ========================
 */
export const getApp = async () => {

    // load environment and config
    dotenv.config({ path: ".env" })
    const config = getConfigHelper(getConfig(process.env))

    // connect to message broker
    let { channel, connection } = await connectToRabbitMQ({ config })

    // connect to mysql database
    const dbConn = await connectToDB({ config })

    // bootstrap express application
    const app = express()
    app.set('port', config('port'))

    // event helper
    const event = getEventHelper({ eventEmitter: app })

    app.use(cors())
    app.use(bodyParser.json())
    app.use(bodyParser.urlencoded({ extended: true }))
    app.use(morgan('dev'))


    useRoute(app, createGroupRoute({ dbConn }))
    useRoute(app, addMemberRoute({ dbConn, event }))
    useRoute(app, listMembersRoute({ dbConn }))
    useRoute(app, listGroupsRoute({ dbConn }))
    useRoute(app, removeGroupRoute({ dbConn }))
    useRoute(app, removeMembersRoute({ dbConn }))


    app.use((req, res, next) => next(new RouteNotFound()))

    app.use(httpErrorHandler)

    return app
}
