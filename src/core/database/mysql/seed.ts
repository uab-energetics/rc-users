import {getConfig} from "../../../_config";
import {DATABASE} from "./_seeds";
import {getConfigHelper} from "../../config/config";
import {attemptRun} from "../../supervisor/attemptRun";
import {DBConnectionError} from "../errors/DBConnectionError";
import {connectToDB} from "./connect";
import * as dotenv from "dotenv";
import program from 'commander'

declare let Object: any

export const seedDatabase = async ({ config, dbConn, clearTables, database }) => {
    let ops = Object.entries(database).map(async ([table, rows]) => {
        let repo = dbConn.getRepository(table)
        if(clearTables) await repo.clear()
        await repo.save(rows)
    })
    await Promise.all(ops)
    await dbConn.close()
}

const runDatabaseSeed = async () => {
    // Load environment and config
    dotenv.config({ path: ".env" })
    const config = getConfigHelper(getConfig(process.env))

    // Connect to database
    let dbConn = await connectToDB({ config })

    // Setup command line parsing
    program
        .version('1.0.0')
        .option('-c, --clear-tables <shouldClear>', 'Will truncate tables first if set to true')
        .parse(process.argv)

    let clearTables = (program.clearTables == 'true')
    if(clearTables) console.log("truncating tables..")

    // Run script
    seedDatabase({ config, dbConn, clearTables, database: DATABASE }).then( _ => {
        console.log("seeded database", DATABASE)
    })
}

attemptRun({
    func: runDatabaseSeed,
    whitelistErrors: [
        DBConnectionError
    ]
})