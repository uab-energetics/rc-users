import {getApp} from "../../src/app";

const request = require('supertest')

test("Example Test", async () => {

    let app = await getApp()

    expect(app).toBeTruthy()

})
