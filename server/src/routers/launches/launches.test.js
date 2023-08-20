const requests = require('supertest')
const app = require('../../app.js')
describe('Test get /launches ',()=>
{

    test('It should respond with 200 success ',async()=>{
        const response = await requests(app)
        .get('/launches')
        .expect('Content-type', /json/)
        .expect(200)

        expect (response.statusCode).toBe(200)
    })
})
describe('Test post / launches ',()=>{
    const completeLaunchData = {
        mission: 'USS ENTERPRISE',
        rocket : 'NCC 1701-D',
        target : 'Kepler-186 f',
        launchDate : ' January 4 , 2028 '

    }
    const launchDataWithoutDate = {
        mission: 'USS ENTERPRISE',
        rocket : 'NCC 1701-D',
        target : 'Kepler-186 f',
        

    }
    const launchDataWithInvaild = {
        mission: 'USS ENTERPRISE',
        rocket : 'NCC 1701-D',
        target : 'Kepler-186 f',
        launchDate: 'zoot'

    }
    test('It should respond with 201 created  ',async()=>{
        const response = await requests(app)
        .post('/launches')
        .send(completeLaunchData)
        .expect('Content-type', /json/)
        .expect(201)

    const requestsDate = new Date(completeLaunchData.launchDate).valueOf()
    const responseDate = new Date (response.body.launchDate).valueOf()
    expect (responseDate).toBe(requestsDate)
    expect(response.body).toMatchObject(launchDataWithoutDate)
       
    })
    test('It should be catch missing required properties ', async()=>{
        const response = await requests(app)
        .post('/launches')
        .send(launchDataWithoutDate)
        .expect('Content-type', /json/)
        .expect(404)

        expect(response.body).toStrictEqual({
            error: 'Missing required launch property  '
        })

    })
    test ('It should catch invaild date ',async()=>{
        const response = await requests(app)
        .post('/launches')
        .send(launchDataWithInvaild)
        .expect('Content-type', /json/)
        .expect(400)

        expect(response.body).toStrictEqual({
            error: 'Invaild  launch date '
        })



    })
})
