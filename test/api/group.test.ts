import {getApp} from "../../src/app";

const request = require('supertest')

test("Groups Test", async () => {

    let app = await getApp()

    /* Create a Group */
    let create_group_res = await request(app)
        .post('/groups')
        .send({
            groups: [
                {
                    name: 'test group',
                    projectID: '12'
                }
            ]
        })

    /* Add a Member */
    let add_member_res = await request(app)
        .post(`/groups/${create_group_res.body[0].id}/members`)
        .send({
            emails: [
                'chris.rocco7@gmail.com'
            ]
        })

    /* List Members */
    let list_members_res = await request(app)
        .get(`/groups/${create_group_res.body[0].id}/members`)

    /* List Groups */
    let list_groups_res = await request(app)
        .get(`/projects/12/groups`)

    console.log(create_group_res.body)
    console.log(add_member_res.body)
    console.log(list_members_res.body)
    console.log(list_groups_res.body)
})
