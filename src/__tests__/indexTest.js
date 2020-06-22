const request = require('supertest')
const app = require('../server/index')

describe('GET Endpoints', () => {

    it('should route to index.html', async() => {
        const res = await request(app)
            .get('/')
            .send('./dist/index.html')
        expect(res.statusCode).toEqual(200);
    })
})
