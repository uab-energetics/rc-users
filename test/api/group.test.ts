import {getApp} from "../../src/app"

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

    /* Remove Members */
    let remove_members_res = await request(app)
        .post(`/groups/${create_group_res.body[0].id}/members/remove`)
        .send({
            emails: [add_member_res.body.members[0].email]
        })
    expect(remove_members_res.statusCode).toEqual(200)


    let list_users_post_remove_res = await request(app)
        .get(`/groups/${create_group_res.body[0].id}/members`)

    console.log('list_users_post_remove_res', add_member_res.body.members[0].email, list_users_post_remove_res.body)


    expect(list_users_post_remove_res.body.members.length).toEqual(list_members_res.body.members.length - 1)

    /* Remove Group */
    let remove_group_res = await request(app)
        .delete(`/groups/${create_group_res.body[0].id}`)

    console.log('create_group_res', create_group_res.body)
    console.log('add_member_res', add_member_res.body)
    console.log('list_members_res', list_members_res.body)
    console.log('list_groups_res', list_groups_res.body)
    console.log('remove_members_res', remove_members_res.body)
    console.log('remove_group_res', remove_group_res.body)
})
